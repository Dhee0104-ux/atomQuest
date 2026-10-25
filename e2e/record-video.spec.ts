import { test } from '@playwright/test';
import * as path from 'path';

test.describe('AquaMind 1920x1080 Storyboard Video Recording', () => {
  test('Record Full 80s Guided Demo Walkthrough matching Audio Narration', async ({ browser }) => {
    // Allocate generous timeout for the scenario recording
    test.setTimeout(240000);

    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      recordVideo: {
        dir: path.resolve('./recordings'),
        size: { width: 1920, height: 1080 },
      },
    });

    const page = await context.newPage();

    // --- Scene 1: Introduction & System Baseline (11s) ---
    await page.goto('/?video=1&step=1');
    await page.waitForTimeout(11000);

    // --- Scene 2: Localized Anomaly Detection (12s) ---
    await page.goto('/alerts?video=1&step=2');
    await page.waitForTimeout(3000);
    // Operator acknowledges the upstream incident
    const ackBtn = page.locator('button:has-text("Acknowledge")').first();
    if (await ackBtn.isVisible()) {
      await ackBtn.click();
    }
    await page.waitForTimeout(9000);

    // --- Scene 3: Offline Water Event Map & Privacy (12s) ---
    await page.goto('/map?video=1&step=3');
    await page.waitForTimeout(12000);

    // --- Scene 4: Cause-Aware Prognostics (13s) ---
    await page.goto('/prognostics?video=1&step=4');
    await page.waitForTimeout(2000);
    // Interact with stress presets
    const consumptionPreset = page.locator('#preset-consumption-32');
    if (await consumptionPreset.isVisible()) {
      await consumptionPreset.click();
    }
    await page.waitForTimeout(2000);
    const tdsPreset = page.locator('#preset-tds-850');
    if (await tdsPreset.isVisible()) {
      await tdsPreset.click();
    }
    await page.waitForTimeout(9000);

    // --- Scene 5: Guided DIY Filter Replacement Flow (14s) ---
    await page.goto('/replace?video=1&step=5');
    await page.waitForTimeout(2000);
    const verifyBtn = page.locator('#run-verification-btn');

    // 1. Pending Flush outcome
    await page.locator('#preset-pending-btn').click();
    await verifyBtn.click();
    await page.waitForTimeout(2500);

    // 2. Defect outcome
    await page.locator('#preset-defect-btn').click();
    await verifyBtn.click();
    await page.waitForTimeout(2500);

    // 3. Verified in simulation outcome
    await page.locator('#preset-verified-btn').click();
    await verifyBtn.click();
    await page.waitForTimeout(7000);

    // --- Scene 6: Closed-Loop Verification & Evaluator Guide (12s) ---
    await page.goto('/evaluate?video=1&step=6');
    await page.waitForTimeout(12000);

    // Close page and context to flush recording
    await page.close();
    await context.close();
  });
});
