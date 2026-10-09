// Renders thumbs/<concept>.png at 1440×900 (and full-page, and phone) from
// each mockup, over file://. Run from this folder: `node make-thumbs.mjs`.
// `PLAYWRIGHT_MODULE` points at a playwright install when none is on the path
// (this repo does not depend on it; the app repo does).
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const pages = ['concept-g', 'concept-h', 'index'];
const browser = await chromium.launch({ channel: 'chromium' });
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('file://' + path.join(here, p + '.html'));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(here, 'thumbs', p + '.png') });
  await page.screenshot({ path: path.join(here, 'thumbs', p + '-full.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(here, 'thumbs', p + '-phone.png'), fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(p, 'errors:', errors.length ? errors : 'none', 'phone overflow px:', overflow);
  await page.close();
}
await browser.close();
