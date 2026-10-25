import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

async function generatePdf() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = path.resolve('./scripts/report_template.html').replace(/\\/g, '/');
  console.log(`Loading template: file:///${htmlPath}`);
  await page.goto(`file:///${htmlPath}`, { waitUntil: 'networkidle' });

  // Give images a moment to decode
  await page.waitForTimeout(1000);

  const outPath1 = path.resolve('./atomQUEST2026_AtoMaaN_SRMIST_Track2_Report.pdf');
  await page.pdf({
    path: outPath1,
    format: 'A4',
    printBackground: true,
    margin: { top: '8mm', bottom: '8mm', left: '10mm', right: '10mm' },
  });
  console.log(`PDF 1 generated successfully: ${outPath1}`);

  // Duplicate with full college name
  const outPath2 = path.resolve('./atomQUEST2026_AtoMaaN_SRMInstituteOfScienceAndTechnology_Track2_Report.pdf');
  fs.copyFileSync(outPath1, outPath2);
  console.log(`PDF 2 generated successfully: ${outPath2}`);

  await browser.close();
}

generatePdf().catch(err => {
  console.error(err);
  process.exit(1);
});
