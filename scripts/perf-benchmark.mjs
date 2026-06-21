/**
 * Cold-start / first-load benchmark harness.
 *
 * Loads a URL in a real headless Chrome with cold cache, captures Web Vitals
 * (LCP/FCP/CLS), accurate over-the-wire bytes per resource type (via CDP), and
 * main-thread blocking (long tasks → Total Blocking Time). Runs N iterations
 * per profile and reports the median.
 *
 * Usage:
 *   node scripts/perf-benchmark.mjs [url] [profile] [runs]
 *   profile: "desktop" (cold cache, no throttle) | "mobile" (Slow-4G + 4x CPU)
 *
 * Examples:
 *   node scripts/perf-benchmark.mjs https://naqeebali.me mobile 3
 *   node scripts/perf-benchmark.mjs http://localhost:4173 desktop 3
 */
import puppeteer from 'puppeteer';

const URL = process.argv[2] || 'https://naqeebali.me';
const PROFILE = process.argv[3] || 'mobile';
const RUNS = Number(process.argv[4] || 3);

const PROFILES = {
  desktop: { label: 'Desktop, cold cache, no throttle', cpu: 1, net: null },
  mobile: {
    label: 'Mid-tier mobile: Slow 4G (~1.6 Mbps, 150ms RTT) + 4x CPU slowdown',
    cpu: 4,
    net: {
      offline: false,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
      latency: 150,
    },
  },
};

const PERF_INIT = () => {
  window.__perf = { lcp: 0, fcp: 0, cls: 0, longTasks: [] };
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__perf.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__perf.fcp = e.startTime;
    }).observe({ type: 'paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__perf.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__perf.longTasks.push(e.duration);
    }).observe({ type: 'longtask', buffered: true });
  } catch (e) {
    /* observer type unsupported */
  }
};

const median = (arr) => {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

async function runOnce(browser, profile) {
  const page = await browser.newPage();
  const client = await page.target().createCDPSession();
  await client.send('Network.enable');
  await client.send('Page.enable');

  // Per-resource over-the-wire bytes, keyed by requestId.
  const reqType = new Map();
  const reqUrl = new Map();
  const bytes = new Map();
  client.on('Network.requestWillBeSent', (e) => {
    reqType.set(e.requestId, e.type);
    reqUrl.set(e.requestId, e.request.url);
  });
  client.on('Network.responseReceived', (e) => reqType.set(e.requestId, e.type));
  client.on('Network.loadingFinished', (e) => bytes.set(e.requestId, e.encodedDataLength));

  await page.setCacheEnabled(false);
  await client.send('Emulation.setCPUThrottlingRate', { rate: profile.cpu });
  if (profile.net) await client.send('Network.emulateNetworkConditions', { ...profile.net });

  await page.evaluateOnNewDocument(PERF_INIT);

  const t0 = Date.now();
  await page.goto(URL, { waitUntil: 'load', timeout: 120000 });
  // Let LCP / late resources settle.
  await new Promise((r) => setTimeout(r, 4000));
  const wall = Date.now() - t0;

  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0] || {};
    return {
      ttfb: n.responseStart || 0,
      domContentLoaded: n.domContentLoadedEventEnd || 0,
      domInteractive: n.domInteractive || 0,
      load: n.loadEventEnd || 0,
    };
  });
  const perf = await page.evaluate(() => window.__perf);

  // Aggregate bytes by resource type.
  const byType = {};
  let total = 0;
  const resources = [];
  for (const [id, n] of bytes) {
    const type = reqType.get(id) || 'other';
    byType[type] = (byType[type] || 0) + n;
    total += n;
    resources.push({ url: reqUrl.get(id) || '', type, bytes: n });
  }
  resources.sort((a, b) => b.bytes - a.bytes);

  const tbt = perf.longTasks.reduce((s, d) => s + Math.max(0, d - 50), 0);

  await page.close();
  return {
    wall,
    ttfb: nav.ttfb,
    fcp: perf.fcp,
    lcp: perf.lcp,
    cls: perf.cls,
    dcl: nav.domContentLoaded,
    load: nav.load,
    tbt,
    longTaskCount: perf.longTasks.length,
    totalBytes: total,
    byType,
    topResources: resources.slice(0, 12),
  };
}

(async () => {
  const profile = PROFILES[PROFILE] || PROFILES.mobile;
  console.log(`\n=== Cold-start benchmark ===`);
  console.log(`URL:     ${URL}`);
  console.log(`Profile: ${profile.label}`);
  console.log(`Runs:    ${RUNS}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  const runs = [];
  for (let i = 0; i < RUNS; i++) {
    process.stdout.write(`  run ${i + 1}/${RUNS}... `);
    try {
      const r = await runOnce(browser, profile);
      runs.push(r);
      console.log(`LCP ${Math.round(r.lcp)}ms  FCP ${Math.round(r.fcp)}ms  TBT ${Math.round(r.tbt)}ms  ${(r.totalBytes / 1024 / 1024).toFixed(2)}MB`);
    } catch (e) {
      console.log(`FAILED: ${e.message}`);
    }
  }
  await browser.close();
  if (!runs.length) { console.log('No successful runs.'); process.exit(1); }

  const pick = (k) => median(runs.map((r) => r[k]));
  const fmt = (ms) => `${Math.round(ms)} ms`;
  console.log(`\n--- MEDIAN (n=${runs.length}) ---`);
  console.log(`TTFB:                 ${fmt(pick('ttfb'))}`);
  console.log(`First Contentful Paint:${fmt(pick('fcp'))}`);
  console.log(`Largest Contentful Paint:${fmt(pick('lcp'))}   <- key cold-start metric`);
  console.log(`DOMContentLoaded:     ${fmt(pick('dcl'))}`);
  console.log(`Load event:           ${fmt(pick('load'))}`);
  console.log(`Total Blocking Time:  ${fmt(pick('tbt'))}   (long tasks: ${pick('longTaskCount')})`);
  console.log(`Cumulative Layout Shift:${pick('cls').toFixed(3)}`);
  console.log(`Wall-clock to settle: ${fmt(pick('wall'))}`);
  console.log(`Total transferred:    ${(pick('totalBytes') / 1024 / 1024).toFixed(2)} MB`);

  // Byte breakdown by type (from the median-ish last run for stability of shape).
  const ref = runs[runs.length - 1];
  console.log(`\n--- Bytes by resource type (run ${runs.length}) ---`);
  Object.entries(ref.byType).sort((a, b) => b[1] - a[1]).forEach(([t, b]) => {
    console.log(`  ${t.padEnd(12)} ${(b / 1024).toFixed(0).padStart(7)} KB`);
  });
  console.log(`\n--- Heaviest resources (run ${runs.length}) ---`);
  ref.topResources.forEach((r) => {
    const name = r.url.replace(/^https?:\/\/[^/]+/, '').slice(0, 60) || r.url;
    console.log(`  ${(r.bytes / 1024).toFixed(0).padStart(7)} KB  ${r.type.padEnd(8)} ${name}`);
  });
  console.log('');
})();
