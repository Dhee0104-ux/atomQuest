import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function capture() {
  const outDir = path.resolve('./docs/screenshots');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // 1. Dashboard & Schematic
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, '01_dashboard_schematic.png') });

  // 2. Cause-Aware Prognostics & Governing Formula
  await page.goto('http://localhost:5173/prognostics');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, '02_prognostics_formula.png') });

  // 3. Offline Vector Water Event Map & k-Anonymity
  await page.goto('http://localhost:5173/map');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(outDir, '03_vector_event_map.png') });

  // 4. DIY Replacement Flow with Outcome 1 (Verified)
  await page.goto('http://localhost:5173/replace');
  await page.waitForTimeout(1000);
  await page.locator('#preset-verified-btn').click();
  await page.locator('#run-verification-btn').click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(outDir, '04_diy_replacement_verified.png') });

  await browser.close();
  console.log('Screenshots captured successfully into ./docs/screenshots');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
