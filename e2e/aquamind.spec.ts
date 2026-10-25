import { test, expect } from '@playwright/test';

test.describe('AquaMind Water Event Intelligence E2E Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('1. Baseline Dashboard, Generic Schematic, and Independent Brand Disclaimer', async ({ page }) => {
    // Check mandatory brand disclaimer
    await expect(page.getByText('Independent concept; not affiliated with or endorsed by Atomberg').first()).toBeVisible();

    // Check SIMULATED DATA pill
    await expect(page.getByText('SIMULATED DATA').first()).toBeVisible();

    // Check Generic Purifier Schematic SVG
    const schematicSvg = page.locator('svg[aria-label="Water purifier filter architecture diagram"]');
    await expect(schematicSvg).toBeVisible();

    // Verify filter stages are rendered inside schematic
    await expect(schematicSvg.locator('text=1').first()).toBeVisible();
    await expect(schematicSvg.locator('text=6').first()).toBeVisible();

    // Verify assumed telemetry cards
    await expect(page.getByText('580 ppm').first()).toBeVisible(); // Inlet TDS
    await expect(page.getByText('38 ppm').first()).toBeVisible();  // Outlet TDS
    await expect(page.getByText('93.4%').first()).toBeVisible();   // Salt Rejection
  });

  test('2. Device Switching Consistency', async ({ page }) => {
    // Switch to Studio Workstation SmartAqua
    const deviceSelect = page.locator('select#device-selector');
    await deviceSelect.selectOption({ label: 'Studio Workstation SmartAqua ' });

    // Verify telemetry updates to Studio device values (320 ppm inlet TDS, 22 ppm outlet TDS)
    await expect(page.locator('h1:has-text("Studio Workstation SmartAqua")')).toBeVisible();
    await expect(page.getByText('320 ppm').first()).toBeVisible();
    await expect(page.getByText('22 ppm').first()).toBeVisible();

    // Switch back to Primary Home Purifier
    await deviceSelect.selectOption({ label: 'Home PurePro 7X (Primary) ' });
    await expect(page.locator('h1:has-text("Home PurePro 7X (Primary)")')).toBeVisible();
    await expect(page.getByText('580 ppm').first()).toBeVisible();
  });

  test('3. Alerts & Investigation Center (Filter, Search, Acknowledge, Resolve)', async ({ page }) => {
    await page.goto('/alerts');

    // Verify critical alert for RO Membrane is present
    await expect(page.getByText('RO Membrane Reaching End of Useful Life')).toBeVisible();

    // Test search filter
    const searchInput = page.locator('input#alerts-search-input');
    await searchInput.fill('Pre-Filter');
    await expect(page.getByText('Pre-Filter Differential Pressure (ΔP) Elevated')).toBeVisible();
    await expect(page.getByText('RO Membrane Reaching End of Useful Life')).not.toBeVisible();

    // Clear search
    await searchInput.fill('');
    await expect(page.getByText('RO Membrane Reaching End of Useful Life')).toBeVisible();

    // Test Acknowledge action
    const ackButton = page.locator('button:has-text("Acknowledge")').first();
    await ackButton.click();

    // Switch to 'all' or 'acknowledged' tab to verify status change
    await page.locator('button:has-text("all")').click();
    await expect(page.getByText('ACKNOWLEDGED').first()).toBeVisible();

    // Test Resolve action
    const resolveButton = page.locator('button:has-text("Resolve")').first();
    await resolveButton.click();
    await expect(page.getByText('RESOLVED').first()).toBeVisible();
  });

  test('4. Cause-Aware Prognostics with Live Interactive Sliders', async ({ page }) => {
    await page.goto('/prognostics');

    // Verify formula banner is visible
    await expect(page.getByText('Governing Degradation Formula')).toBeVisible();
    await expect(page.getByText('Remaining Life (%) =')).toBeVisible();
    await expect(page.getByText('Prototype Estimate: Auditable Baseline')).toBeVisible();

    // Verify Recharts LineChart surface
    await expect(page.locator('.recharts-surface').first()).toBeVisible();

    // Adjust Daily Consumption via preset
    await page.locator('#preset-consumption-32').click();
    await expect(page.getByText('32 L / day')).toBeVisible();

    // Adjust Raw Inlet TDS via preset
    await page.locator('#preset-tds-850').click();
    await expect(page.getByText('850 ppm', { exact: true })).toBeVisible();
  });

  test('5. DIY Filter Replacement Wizard with All 3 Outcomes', async ({ page }) => {
    await page.goto('/replace');

    const verifyButton = page.locator('button#run-verification-btn');
    const resultPanel = page.locator('#verification-result-panel');

    // --- Outcome 2: Pending (Flush < 5.0L) ---
    await page.locator('#preset-pending-btn').click();
    await verifyButton.click();
    await expect(resultPanel.getByText('Outcome 2: Pending Flush Requirement')).toBeVisible();
    await expect(resultPanel.getByText('Flush in progress: 2.5 L flushed')).toBeVisible();

    // --- Outcome 3: Verification Failed (Simulated Defect) ---
    await page.locator('#preset-defect-btn').click();
    await verifyButton.click();
    await expect(resultPanel.getByText('Outcome 3: Verification Failed')).toBeVisible();
    await expect(resultPanel.getByText('Simulated Cartridge Fault: O-ring unseated')).toBeVisible();

    // --- Outcome 1: Verified in Simulation (Flush >= 5.0L, Clean Seating) ---
    await page.locator('#preset-verified-btn').click();
    await verifyButton.click();
    await expect(resultPanel.getByText('Outcome 1: Verified in Simulation')).toBeVisible();
    await expect(resultPanel.getByText('Flush cycle complete (6.0 L flushed)')).toBeVisible();

    // Verify that maintenance audit trail logged the record
    await expect(page.getByText('Maintenance Audit Trail')).toBeVisible();
  });

  test('6. Offline Vector SVG Map & Privacy k-Anonymity Validation', async ({ page }) => {
    await page.goto('/map');

    // Verify SVG vector map is present
    const mapSvg = page.locator('svg[aria-label="Neighborhood water event vector map"]');
    await expect(mapSvg).toBeVisible();

    // Check Ward 4 alert status
    await expect(page.getByText('Ward 4: Indiranagar Central')).toBeVisible();
    await expect(page.getByText('Cluster Mean TDS')).toBeVisible();

    // Verify k-Anonymity check is passed (N >= 10)
    await expect(page.getByText('k-Anonymity Verified')).toBeVisible();
    await expect(page.getByText('N = 18 ≥ 10 (PASSED)')).toBeVisible();
  });

  test('7. Full Guided Demo Scenario Playback & Controls', async ({ page }) => {
    // Launch demo from header
    const runDemoBtn = page.locator('button:has-text("RUN AQUAMIND DEMO")');
    await runDemoBtn.click();

    // Verify docked controller appears
    const demoController = page.locator('aside[aria-label="AquaMind Guided Demo Controller"]');
    await expect(demoController).toBeVisible();
    await expect(demoController.locator('text=Step 1/6')).toBeVisible();

    // Test Pause and Resume
    const pauseBtn = demoController.locator('button[aria-label="Pause guided scenario"]');
    await pauseBtn.click();
    await expect(demoController.locator('text=Resume')).toBeVisible();

    const resumeBtn = demoController.locator('button[aria-label="Resume guided scenario"]');
    await resumeBtn.click();
    await expect(demoController.locator('text=Pause')).toBeVisible();

    // Test Step Forward
    const nextBtn = demoController.locator('button[aria-label="Next step"]');
    await nextBtn.click();
    await expect(demoController.locator('text=Step 2/6')).toBeVisible();

    // Close Demo
    const closeBtn = demoController.locator('button[aria-label="Close demo"]');
    await closeBtn.click();
    await expect(demoController).not.toBeVisible();
  });

  test('8. Reset State Restores Canonical Seed Values', async ({ page }) => {
    await page.goto('/alerts');

    // Trigger Reset from header
    const resetTriggerBtn = page.locator('button[aria-label="Reset simulation"]');
    await resetTriggerBtn.click();
    const resetConfirmBtn = page.locator('button:has-text("Reset Now")');
    await resetConfirmBtn.click();

    // Verify critical alert returns to active
    await expect(page.getByText('RO Membrane Reaching End of Useful Life')).toBeVisible();
  });

  test('9. Responsive Viewport Check at 375px, 768px, and 1440px', async ({ page }) => {
    // Mobile Viewport (375px)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();

    // Tablet Viewport (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();

    // Desktop Viewport (1440px)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
