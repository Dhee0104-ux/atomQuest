import { DemoStep } from '../types';

/**
 * Scripted Scenario: "From an Unusual Reading to a Verified Maintenance Record"
 * Total narration word count is strictly trimmed to ~185 words to fit cleanly within 90 seconds.
 */
export const DEMO_STEPS: DemoStep[] = [
  {
    stepIndex: 1,
    title: 'Scene 1: Introduction & System Baseline',
    route: '/',
    headline: 'AquaMind — Water Event Intelligence',
    narration: 'Water purifiers should not run on blind timers. AquaMind combines transparent condition-aware prognostics with neighborhood telemetry to make filter maintenance predictable and self-verifiable.',
    speakerNotes: 'Highlight the independent concept disclaimer and the live 7-stage baseline dashboard. Point to the deterministic simulation indicator.',
    durationMs: 12000,
    actionTrigger: 'none',
  },
  {
    stepIndex: 2,
    title: 'Scene 2: Localized Anomaly Detection',
    route: '/alerts',
    headline: 'Correlating Upstream Water Stress',
    narration: 'When a municipal pipe repair stirs sediment in Ward 4, purifiers detect elevated differential pressure and rising inlet TDS. Rather than blaming the consumer, AquaMind alerts on real upstream stress.',
    speakerNotes: 'Filter by critical alerts. Show the RO membrane exhaustion alert and the pre-filter delta-P warning. Demonstrate one-click Acknowledge.',
    durationMs: 13000,
    actionTrigger: 'none',
  },
  {
    stepIndex: 3,
    title: 'Scene 3: Offline Water Event Map',
    route: '/map',
    headline: 'Neighborhood Anomaly Clustering',
    narration: 'On our vector map, 14 reporting purifiers in Ward 4 cluster an identical turbidity spike. With privacy-preserving k-anonymity, households see the root cause without sharing private telemetry.',
    speakerNotes: 'Click on Ward 4 to show active node density (14 purifiers) exceeding the N >= 10 privacy threshold. Emphasize zero-dependency SVG resilience.',
    durationMs: 13000,
    actionTrigger: 'view_map',
  },
  {
    stepIndex: 4,
    title: 'Scene 4: Cause-Aware Prognostics',
    route: '/prognostics',
    headline: 'Transparent Physics Baseline',
    narration: 'Unlike opaque AI black boxes, our prognostic formula is open: Remaining life equals rated capacity minus usage, multiplied by an audited water quality condition factor.',
    speakerNotes: 'Slide the daily usage and inlet TDS sliders. Show the prognostic degradation curve recalculating in real-time.',
    durationMs: 14000,
    actionTrigger: 'adjust_slider',
  },
  {
    stepIndex: 5,
    title: 'Scene 5: DIY Filter Replacement Flow',
    route: '/replace',
    headline: 'Guided Maintenance with 3 Outcomes',
    narration: 'A user replaces their RO cartridge at home. AquaMind monitors flush volume and differential pressure. An incomplete flush is held pending; an O-ring defect is flagged immediately.',
    speakerNotes: 'Select Stage 6 (RO Membrane). Test the flush volume requirement (5.0L) and demonstrate the "Verified in simulation" pass.',
    durationMs: 15000,
    actionTrigger: 'run_diy',
  },
  {
    stepIndex: 6,
    title: 'Scene 6: Closed-Loop Verification & Summary',
    route: '/evaluate',
    headline: 'Verified Record & Evaluator Guide',
    narration: 'With 6 liters flushed and 93% salt rejection restored, the maintenance record is verified in simulation and the alert clears. AquaMind turns connected water into trusted intelligence.',
    speakerNotes: 'Review the Evaluator Guide traceability table and the 2-minute review matrix. Conclude the demonstration.',
    durationMs: 13000,
    actionTrigger: 'resolve_alert',
  },
];
