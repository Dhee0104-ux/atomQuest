# AquaMind: Video Storyboard (90 Seconds)
**Project:** AquaMind — Water Event Intelligence  
**Competition:** atomQUEST 2026 (Atomberg) — Round 2  
**Format:** 1920x1080 (16:9), 30 fps, Full HD  
**Narration Word Count:** 157 words (strict <= 195 words budget)  
**Tone:** Engineering rigor, crisp clarity, ethical transparency  
**Mandatory Disclosure:** *"Prototype demonstration using simulated data. Hardware integrations and real-world validation are future work."*

---

## Scene Timeline & Visual Architecture

### Scene 1: Introduction & System Baseline (00:00 – 00:12 | 12s)
* **Route:** `/?video=1&step=1`
* **On-Screen Headline:** `AquaMind — Water Event Intelligence`
* **Visual Action:**
  * Clean 1920x1080 presentation layout without dev UI or cursor jitter.
  * In-app vector SVG illustration of the home purifier with live animated water flow pulses across the generic 7-stage chain (Pre-filter, Sediment, Pre-carbon, Membrane protector, UF, RO, Polisher).
  * Prominent disclaimers visible: *"Independent concept; not affiliated with or endorsed by Atomberg"* and *"SIMULATED DATA"*.
  * Primary purifier metrics: Flow (1.8 L/min), Inlet TDS (580 ppm), Outlet TDS (42 ppm, 92.8% rejection), Pressure (45 psi).
* **Narration (24 words):**
  > "Water purifiers should not run on blind timers. AquaMind combines transparent condition-aware prognostics with neighborhood telemetry to make filter maintenance predictable and self-verifiable."
* **Audio / Sound:** Subtle ambient water flow tone fading into crisp technical narration.

---

### Scene 2: Localized Anomaly Detection & Investigation (00:12 – 00:25 | 13s)
* **Route:** `/alerts?video=1&step=2`
* **On-Screen Headline:** `Correlating Upstream Water Stress`
* **Visual Action:**
  * Alerts Center loads with active incidents filtered by severity.
  * Highlight on critical alert: `RO Membrane Reaching End of Useful Life (Salt rejection degraded to 92.8%)` and warning: `High Pre-Filter Differential Pressure (ΔP = 18.2 psi)`.
  * Context badge highlights: *"Simulated Upstream Disturbance: Indiranagar Ward 4 Main Pipeline Flush"*.
  * Operator clicks "Acknowledge" — status badge transitions to `ACKNOWLEDGED`.
* **Narration (29 words):**
  > "When a municipal pipe repair stirs sediment in Ward 4, purifiers detect elevated differential pressure and rising inlet TDS. Rather than blaming the consumer, AquaMind alerts on real upstream stress."
* **Audio / Sound:** Clean UI click sound; subtle low-frequency alert pulse.

---

### Scene 3: Offline Vector Water Event Map & Privacy (00:25 – 00:38 | 13s)
* **Route:** `/map?video=1&step=3`
* **On-Screen Headline:** `Neighborhood Anomaly Clustering`
* **Visual Action:**
  * 100% offline local vector SVG neighborhood map of Indiranagar wards renders without external tile dependencies.
  * Ward 4 pulses in amber/red alert boundary.
  * Cluster inspection panel displays Ward 4 metrics: 18 total purifiers, 14 reporting active turbidity spikes, Mean TDS = 790 ppm, Mean Turbidity = 3.6 NTU.
  * Privacy verification badge prominently highlighted: `k-Anonymity Verified (N = 18 ≥ 10)` — zero individual household telemetry or GPS leaks.
* **Narration (26 words):**
  > "On our vector map, 14 reporting purifiers in Ward 4 cluster an identical turbidity spike. With privacy-preserving k-anonymity, households see the root cause without sharing private telemetry."
* **Audio / Sound:** Spatial ping indicating neighborhood cluster aggregation.

---

### Scene 4: Cause-Aware Prognostics (00:38 – 00:52 | 14s)
* **Route:** `/prognostics?video=1&step=4`
* **On-Screen Headline:** `Transparent Physics Baseline`
* **Visual Action:**
  * Governing formula banner displayed in monospace code:
    `Remaining Life (%) = [ (Rated Capacity - Effective Liters) / Rated Capacity ] × 100%`
    `Effective Usage = Liters × Condition Factor (Cf)`
  * Interactive stress sliders demonstrate live physics recalculation:
    * Consumption adjusted from 16 L/day to 32 L/day.
    * Inlet TDS shifted from 580 ppm to 850 ppm.
  * Interactive 180-day degradation curve (Recharts) dynamically bends forward, moving replacement date from Day 142 to Day 78.
  * Clearly labeled: *"Prototype Estimate: Auditable Baseline, not black-box ML"*.
* **Narration (24 words):**
  > "Unlike opaque AI black boxes, our prognostic formula is open: Remaining life equals rated capacity minus usage, multiplied by an audited water quality condition factor."
* **Audio / Sound:** Smooth parametric adjustment tone as the curve recalculates.

---

### Scene 5: Guided DIY Filter Replacement Flow (00:52 – 01:07 | 15s)
* **Route:** `/replace?video=1&step=5`
* **On-Screen Headline:** `Guided Maintenance with 3 Outcomes`
* **Visual Action:**
  * Step-by-step DIY filter replacement wizard for Stage 6 (RO Membrane Cartridge).
  * 4 guided steps shown: Prepare & Isolate, Swap Cartridge, Mandatory Flush Cycle, Verification Test.
  * Quick demonstration of all 3 deterministic outcomes:
    1. *Pending Flush:* Flush volume at 2.5 L (< 5.0 L threshold) -> Outcome 2: Pending Flush Requirement.
    2. *Defect Detection:* Defective cartridge / unseated O-ring -> Outcome 3: Verification Failed (Pressure drop detected).
    3. *Clean Installation:* Flushed 6.0 L, seated firmly -> Outcome 1: Verified in Simulation.
* **Narration (27 words):**
  > "A user replaces their RO cartridge at home. AquaMind monitors flush volume and differential pressure. An incomplete flush is held pending; an O-ring defect is flagged immediately."
* **Audio / Sound:** Step progression chime, confirmation tone upon verified seating.

---

### Scene 6: Closed-Loop Verification & Evaluator Guide (01:07 – 01:20 | 13s)
* **Route:** `/evaluate?video=1&step=6`
* **On-Screen Headline:** `Verified Record & Evaluator Guide`
* **Visual Action:**
  * Maintenance audit trail logs the verified RO replacement event with timestamp, cartridge ID `RO-M-88319`, and status `VERIFIED_IN_SIMULATION`.
  * Dashboard alert automatically clears as salt rejection is restored to 95.2%.
  * Evaluator Guide page displays:
    * 60-Second Architecture Overview.
    * Requirements Traceability Matrix (100% verified).
    * What Works Today vs. Future Work Matrix.
    * FastAPI `/api/readings` endpoint and ESP32 hardware firmware availability.
  * Closing card with final disclosure and GitHub repository link.
* **Narration (27 words):**
  > "With 6 liters flushed and 93% salt rejection restored, the maintenance record is verified in simulation and the alert clears. AquaMind turns connected water into trusted intelligence."
* **Audio / Sound:** Uplifting resolution chord fading out smoothly.

---

## Technical Specifications
* **Screen Dimensions:** 1920 × 1080 (Full HD)
* **Aspect Ratio:** 16:9
* **Frame Rate:** 30.00 fps
* **Video Codec:** H.264 (libx264, profile high, pix_fmt yuv420p)
* **Audio Codec:** AAC (128 kbps, 44.1 kHz, stereo)
* **Captions:** CEA-608 / SubRip UTF-8 (`AquaMind_Captions.srt`)
