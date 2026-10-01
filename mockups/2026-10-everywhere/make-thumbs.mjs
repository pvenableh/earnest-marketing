// Renders thumbs/<concept>.png at 1440×900 from each mockup, over file://.
// Run from this folder: `node make-thumbs.mjs` (needs the globally installed
// playwright + the pre-installed Chromium; nothing from the Nuxt build).
import { createRequire } from 'node:module';
// `PLAYWRIGHT_MODULE` points at a playwright install when none is on the path
// (this repo does not depend on it; the app repo and global installs do).
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const pages = ['concept-d', 'concept-e', 'concept-f'];
const browser = await chromium.launch();
for (const p of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto('file://' + path.join(here, p + '.html'));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(here, 'thumbs', p + '.png') });
  // Phone width too, for the review page's mobile check.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(here, 'thumbs', p + '-phone.png') });
  await page.close();
}
await browser.close();
