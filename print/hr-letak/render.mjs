// Pravi PDF letka za štampu i PNG preglede.
// Upotreba: node print/hr-letak/render.mjs [izlazni-folder] [firma] [osoba]
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// playwright se učitava preko require (radi i kad je instaliran globalno)
const { chromium } = createRequire(import.meta.url)('playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(process.argv[2] || path.join(dir, 'out'));
const firma = process.argv[3] || '';
const osoba = process.argv[4] || '';
fs.mkdirSync(out, { recursive: true });

const slugify = (s) =>
  s.toLowerCase().replace(/đ/g, 'dj').normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slug = firma ? '-' + slugify(firma) : '';

const browser = await chromium.launch();
for (const bleed of [false, true]) {
  const page = await browser.newPage();
  const params = {};
  if (bleed) params.bleed = '1';
  if (firma) params.firma = firma;
  if (osoba) params.osoba = osoba;
  const url = 'file://' + path.join(dir, 'letak.html') + '?' + new URLSearchParams(params);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const name = `lumi-kids-letak-hr${slug}${bleed ? '-bleed-3mm' : ''}.pdf`;
  await page.pdf({ path: path.join(out, name), preferCSSPageSize: true, printBackground: true });
  console.log('PDF', name);
  if (!bleed && !firma) {
    await page.setViewportSize({ width: 794, height: 1123 });
    await page.emulateMedia({ media: 'print' });
    const pages = await page.$$('.page');
    for (let i = 0; i < pages.length; i++) {
      await pages[i].screenshot({ path: path.join(out, `pregled-strana-${i + 1}.png`) });
    }
  }
  await page.close();
}
await browser.close();
