# AquaMind Engineering Assumptions & Boundary Registry
**atomQUEST 2026 (Atomberg) — Round 2**
*Independent student concept; not affiliated with or endorsed by Atomberg.*

---

## 1. Official Documentation Audit & Resolution

* **Rules Audit:** The official guidelines document (`atomQUEST 2026 - Stage 2 details.pdf`) was uploaded by the team and transcribed to [spec/ROUND2_RULES.md](file:///d:/atomQuest/spec/ROUND2_RULES.md).
* **Key Guidelines & Constraints Recorded:**
  1. **Video Limits:** Max 90 seconds, $\le 50\text{ MB}$.
  2. **Mandatory Video Content:** Team details, problem identified & solution, prototype progress so far, core function demonstration, what is done vs pending, safety / fail-safe mechanism status.
  3. **Progress Report:** 1–2 page PDF covering team details, problem/solution, completed components/sourcing risks, amount spent vs abstract estimate, abstract changes/delays, safety/fail-safe status, Round 3 roadmap, with prototype photos/screenshots.
  4. **Strict Naming Convention:**
     * Video: `atomQUEST2026_[TeamName]_[CollegeName]_Track[No]_Video`
     * Report: `atomQUEST2026_[TeamName]_[CollegeName]_Track[No]_Report`
  5. **Hardware Focus:** Hardware prototype emphasis; software prototypes must deliver immense value. AquaMind addresses this via physical ESP32 firmware ([hardware/esp32/AquaMind_ESP32.ino](file:///d:/atomQuest/hardware/esp32/AquaMind_ESP32.ino)), live telemetry ingestion path (`POST /api/readings`), and hardware BOM feasibility design.

---

## 2. Atomberg Brand & Device Context Boundaries

1. **Independent Concept**: AquaMind is designed strictly as an independent student concept demonstrating intelligent telemetry, cause-aware filter prognostics, neighborhood anomaly intelligence, and verified DIY maintenance.
2. **No Proprietary Data**: No confidential Atomberg telemetry, firmware, internal APIs, or product photos are used.
3. **Generic Purifier Illustration**: All device representations use an original custom SVG schematic and clean architectural graphics.
4. **Generic Filtration Stages**: The modeled filtration sequence uses standard, public water purification stages:
   1. Sediment Pre-Filter (5–10 micron)
   2. Inline Sediment Filter (1–5 micron)
   3. Pre-Carbon Adsorption (granular/block activated carbon)
   4. Membrane Protector / Anti-Scalant Layer
   5. Ultrafiltration (UF) / Microfiltration Barrier
   6. Reverse Osmosis (RO) Membrane (semi-permeable thin-film composite)
   7. Post-Carbon / Alkaline Mineralizer Polisher

---

## 3. Telemetry & Sensor Suite Assumptions

Every telemetry attribute in AquaMind is explicitly designated as **"Assumed"** unless received through the live bench device API:

| Telemetry Field | Unit | Assumed Sensor Type | Normal Range | Failure / Anomaly Trigger |
| :--- | :--- | :--- | :--- | :--- |
| **Flow Rate** | LPM (L/min) | Hall-effect turbine / optical rotor | 0.8 – 1.8 LPM | < 0.3 LPM (severe clogging) or > 2.5 LPM (channeling) |
| **Inlet TDS** | ppm (mg/L) | Dual-pin AC electrical conductivity (EC) | 150 – 800 ppm | > 1,200 ppm (saline spike / groundwater shift) |
| **Outlet TDS** | ppm (mg/L) | Dual-pin AC electrical conductivity (EC) | 20 – 75 ppm | > 120 ppm or Rejection < 85% (membrane breach) |
| **Inlet Pressure** | psi | Piezoresistive pressure transducer | 10 – 35 psi | < 5 psi (booster cavitation) or > 45 psi (line surge) |
| **Pump / Booster Pressure** | psi | Piezoresistive pressure transducer | 60 – 95 psi | < 50 psi (pump degradation) or > 110 psi (downstream stall) |
| **Differential Pressure ($\Delta P$)** | psi | Calculated ($P_{in} - P_{post-prefilter}$) | 2 – 8 psi | > 14 psi (sediment blind-off) |
| **Turbidity (Optional)** | NTU | Nephelometric 90° optical scatter | 0.2 – 2.0 NTU | > 5.0 NTU (colloidal mud / pipeline repair intrusion) |
| **Cumulative Volume** | Liters | Integrated flow meter pulses | Monotonic | Exceeds nominal filter rated capacity (L) |

---

## 4. Prognostic Model Assumptions

1. **Deterministic Baseline**: Prognostics follow an open, auditable physics-and-chemistry baseline:
   $$\text{Remaining Life (\%)} = \max\left(0, 100 \times \left(1 - \frac{\text{Usage}_{\text{effective}}}{\text{Rated Capacity}}\right)\right)$$
2. **Condition Factor ($C_f$) Multiplier**: Water stress accelerates degradation:
   $$\text{Usage}_{\text{effective}} = \sum_{t} \Delta V_t \times C_f(t)$$
   where $C_f = f(\text{TDS}_{\text{inlet}}, \text{Turbidity}, \Delta P)$. When inlet TDS is 800 ppm (vs standard 300 ppm baseline), $C_f \approx 1.45$, depleting RO membrane life faster in proportion to osmotic backpressure and scaling velocity.
3. **Prototype Estimate Labeling**: Every prognostic projection is clearly identified in the UI as a *“Prototype estimate based on simulated deterministic condition modeling”*.

---

## 5. Verification & Privacy Assumptions

1. **Simulation-Only Maintenance Verification**: DIY filter replacements are verified through mathematical flush-volume analysis, pressure settling, and post-flush TDS rejection stabilization. In this app, verification is labeled **“Verified in simulation”**.
2. **Neighborhood Privacy & Minimum Density**:
   - Sharing is strictly opt-in.
   - Anonymized spatial hashing ($k$-anonymity cluster radius: 500m).
   - Minimum threshold: At least 10 reporting nodes ($N \ge 10$) required before a neighborhood cluster status is surfaced to prevent single-household re-identification.
   - No individual addresses or personal accounts are broadcast.
