import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.resolve(__dirname, '..', 'public', 'og-image.png');

const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: #FAFAF5;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 80px 100px;
      font-family: 'Space Grotesk', sans-serif;
    }
    .name {
      font-size: 72px;
      font-weight: 700;
      color: #32292F;
      letter-spacing: -2px;
      line-height: 1;
      margin-bottom: 24px;
    }
    .subtitle {
      font-size: 28px;
      font-weight: 700;
      color: #705D56;
      letter-spacing: 0.5px;
    }
    .line {
      width: 80px;
      height: 4px;
      background: #32292F;
      margin-bottom: 32px;
    }
    .url {
      position: absolute;
      bottom: 50px;
      right: 100px;
      font-size: 20px;
      color: #A89B94;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="line"></div>
  <div class="name">NAQEEBALI<br>SHAMSI</div>
  <div class="subtitle">Full Stack Developer | Cloud Architect</div>
  <div class="url">naqeebali.me</div>
</body>
</html>`;

async function generate() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();
  console.log(`OG image generated at: ${outputPath}`);
}

generate().catch((err) => {
  console.error('Failed to generate OG image:', err);
  process.exit(1);
});
