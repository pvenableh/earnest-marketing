// Records the live demo (app.earnest.guru/try-demo?persona=solo) headless:
// Home → Invoices → an overdue invoice → ask Earnest "Why is this invoice
// overdue?" → the reply. One ask per run, nothing approved, nothing sent.
// Output: rec-<scheme>.webm (+ frames via cut.sh). Run from this folder:
//   PLAYWRIGHT_MODULE=<app repo>/node_modules/playwright node record.mjs dark
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
import fs from 'node:fs';
import path from 'node:path';

const scheme = process.argv[2] || 'dark';
const W = 1440, H = 900;
const dir = path.resolve('raw-' + scheme);
fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ channel: 'chromium' });
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: scheme, recordVideo: { dir, size: { width: W, height: H } } });
const page = await ctx.newPage();
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const shot = (n) => page.screenshot({ path: path.join(dir, n + '.png') });

await page.goto('https://app.earnest.guru/try-demo?persona=solo', { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(3500);
const done = page.getByRole('button', { name: /^Done/ });
if (await done.count()) { await done.first().click(); log('tour dismissed'); await page.waitForTimeout(800); }
await shot('01-home'); log('home', page.url());
await page.mouse.wheel(0, 500); await page.waitForTimeout(1500);
await page.mouse.wheel(0, -500); await page.waitForTimeout(800);

await page.goto('https://app.earnest.guru/invoices', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500); await shot('02-invoices'); log('invoices');

// The one invoice with money on it: $12,000, Meridian Law, 144 days past due.
// Clicking the row opens its panel (the slide-over); the composer follows it
// in. `/invoices/<id>` is the printable view with no shell, so if a click
// lands there, come back and ask from the floor instead.
const cell = page.getByText('$12,000.00').first();
if (await cell.count()) { await cell.click(); log('clicked the $12,000 row'); }
await page.waitForTimeout(3000);
if (/\/invoices\/[0-9a-f-]{20,}/.test(page.url())) { log('printable view — going back'); await page.goBack({ waitUntil: 'networkidle' }); await page.waitForTimeout(2000); }
await shot('03-invoice'); log('url', page.url());

const box = page.getByLabel('Ask Earnest').last();
await box.waitFor({ state: 'visible', timeout: 15000 });
await box.click(); await page.waitForTimeout(600);
await box.pressSequentially('Why is invoice 0007 overdue?', { delay: 45 });
await page.waitForTimeout(900); await shot('04-typed');
await box.press('Enter'); log('sent');
// Wait for a reply: the composer idles again, or 25s.
for (let i = 0; i < 25; i++) { await page.waitForTimeout(1000); const busy = await page.locator('.composer--busy').count(); if (i > 6 && !busy) break; }
await page.waitForTimeout(2500); await shot('05-reply'); log('reply');
await page.waitForTimeout(2000);
await ctx.close(); await browser.close();
const v = fs.readdirSync(dir).find((f) => f.endsWith('.webm'));
fs.renameSync(path.join(dir, v), path.resolve('rec-' + scheme + '.webm'));
log('wrote rec-' + scheme + '.webm');
