// Build-time prerenderer.
//
// The site is a client-rendered Vite SPA, so crawlers (GPTBot, ClaudeBot,
// PerplexityBot, Google AI Overviews) that don't execute JS see an empty
// <div id="root">. This snapshots the *rendered* DOM of each content route into
// static HTML so the real prose, headings, and JSON-LD are in the raw response.
//
// Mechanism: boot `vite preview` (serves dist/ with SPA fallback), drive a
// headless Chrome over each route, wait for the app to signal readiness, capture
// document HTML, and write dist/<route>/index.html. Also emits sitemap.xml.
//
// Runs on the local machine during `netlify deploy --build` (private repo, no CI),
// so it uses system Chrome and needs no cloud browser.

import { preview } from 'vite';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import { existsSync, readdirSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const SITE = 'https://naqeebali.me';

// Auto-discover MDX case studies so adding a `<slug>.mdx` needs no edit here.
const contentDir = path.resolve(__dirname, '..', 'src', 'content', 'case-studies');
const mdxSlugs = existsSync(contentDir)
  ? readdirSync(contentDir)
      .filter((f) => f.endsWith('.mdx') && !f.startsWith('_')) // skip drafts/fixtures (e.g. _smoketest)
      .map((f) => f.replace(/\.mdx$/, ''))
      .filter((s) => s !== 'nomadcrew') // nomadcrew has its own bespoke route below
  : [];

// Auto-discover blog posts the same way. Drafts/fixtures prefixed `_` are skipped.
const blogContentDir = path.resolve(__dirname, '..', 'src', 'content', 'blog');
const blogSlugs = existsSync(blogContentDir)
  ? readdirSync(blogContentDir)
      .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
      .map((f) => f.replace(/\.mdx$/, ''))
  : [];

// Single source of truth for prerendered routes + the sitemap.
const ROUTES = [
  { path: '/case-studies', priority: '0.9', changefreq: 'monthly' },
  { path: '/case-study/nomadcrew', priority: '0.9', changefreq: 'monthly' },
  ...mdxSlugs.map((s) => ({ path: `/case-study/${s}`, priority: '0.8', changefreq: 'monthly' })),
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'monthly' },
  { path: '/license', priority: '0.3', changefreq: 'yearly' },
  ...blogSlugs.map((s) => ({ path: `/blog/${s}`, priority: '0.7', changefreq: 'monthly' })),
  { path: '/', priority: '1.0', changefreq: 'monthly' }, // homepage last (overwrites the shell dist/index.html)
];

function findChrome() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  return undefined; // fall back to puppeteer's bundled Chromium (e.g. on Linux CI)
}

async function main() {
  if (!existsSync(distDir)) {
    console.error('[prerender] dist/ not found — run `vite build` first.');
    process.exit(1);
  }

  const server = await preview({ preview: { port: 0 }, logLevel: 'silent' });
  const base = (server.resolvedUrls.local[0] || `http://localhost:${server.config.preview.port}`).replace(/\/$/, '');
  console.log(`[prerender] preview server: ${base}`);

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, executablePath: findChrome(), args: ['--no-sandbox'] });
  } catch (err) {
    console.error('[prerender] could not launch Chrome:', err.message);
    await server.httpServer.close();
    process.exit(1);
  }

  // Capture everything into memory first, THEN write — so overwriting dist/index.html
  // mid-run can't affect the SPA fallback used by later routes.
  const captures = [];
  let guardMisses = 0;
  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      await page.goto(base + route.path, { waitUntil: 'networkidle0', timeout: 60000 });
      await page
        .waitForFunction(
          () =>
            document.documentElement.getAttribute('data-prerender-ready') === 'true' ||
            (document.querySelector('#root')?.innerText || '').length > 800,
          { timeout: 30000 }
        )
        .catch(() => console.warn(`[prerender] readiness wait timed out for ${route.path} — capturing anyway`));
      await new Promise((r) => setTimeout(r, 700)); // let head writes + first paint settle

      let html = await page.content();
      if (!html.startsWith('<!')) html = '<!doctype html>\n' + html;

      // Provenance guard: the self-canonical is the anti-theft weapon — a verbatim copy
      // keeps it and gets de-ranked below the original. Article pages should also carry
      // the copyright JSON-LD. Warn loudly (don't fail the deploy) on a miss.
      if (!/<link[^>]+rel=["']canonical["']/i.test(html)) {
        console.warn(`[prerender] ⚠ missing canonical: ${route.path}`);
        guardMisses++;
      }
      if (/^\/(blog|case-study)\/.+/.test(route.path) && !/"creditText"|"copyrightNotice"/.test(html)) {
        console.warn(`[prerender] ⚠ missing copyright JSON-LD: ${route.path}`);
        guardMisses++;
      }

      const outDir = route.path === '/' ? distDir : path.join(distDir, route.path);
      captures.push({ outDir, html, route: route.path });
    } catch (err) {
      console.warn(`[prerender] FAILED ${route.path}: ${err.message} — leaving SPA fallback for this route`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await server.httpServer.close();

  for (const c of captures) {
    await fs.mkdir(c.outDir, { recursive: true });
    await fs.writeFile(path.join(c.outDir, 'index.html'), c.html, 'utf8');
    console.log(`[prerender] wrote ${path.relative(distDir, path.join(c.outDir, 'index.html'))} (${c.html.length} bytes)`);
  }

  // sitemap.xml
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = ROUTES.map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  ).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log('[prerender] wrote sitemap.xml');
  if (guardMisses) console.warn(`[prerender] ⚠ provenance guard: ${guardMisses} miss(es) above — check canonical/copyright on those routes.`);
  console.log(`[prerender] done — ${captures.length}/${ROUTES.length} routes prerendered.`);
}

main().catch((err) => {
  console.error('[prerender] FATAL:', err);
  process.exit(1);
});
