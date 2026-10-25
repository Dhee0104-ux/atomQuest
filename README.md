# AquaMind: Water Event Intelligence

> **atomQUEST 2026 (Atomberg) — Round 2 Technical Submission**  
> **Mandatory Disclaimer:** *AquaMind is an independent student concept that could extend a connected-purifier app such as the Atomberg Home App. Not affiliated with or endorsed by Atomberg. Prototype demonstration using simulated data. Hardware integrations, validated water-quality laboratory analysis, and production deployment are future work.*

---

## 1. Executive Summary & Problem Context
Modern domestic reverse osmosis (RO) water purifiers currently operate on **blind time-based intervals** (e.g., replace filter every 6 or 12 months) or simple linear flow counters. This introduces two severe failure modes:
1. **Premature Filter Discard:** Households connected to clean municipal supplies (e.g., Cauvery water, $< 200\text{ ppm TDS}$) discard cartridges that still retain $30\text{--}40\%$ active membrane life, generating unnecessary electronic/plastic waste and consumer expense.
2. **Unseen Cartridge Exhaustion:** Households facing sudden upstream water quality shocks (e.g., municipal water main bursts, pipe repairs, borewell salinity spikes $> 1,000\text{ ppm}$) experience rapid membrane scaling and premature silt fouling, exposing families to poor filtration without warning.
3. **Unverified DIY Maintenance:** Consumers attempting self-replacement lack closed-loop verification, risking unseated O-rings, bypass leaks, or skipped mandatory flush cycles that release carbon fines.

**AquaMind** introduces an auditable, physics-grounded prognostic baseline correlated with privacy-preserving neighborhood cluster intelligence to transform water purification into transparent, verified event intelligence.

---

## 2. Key Features

### 🔬 1. Transparent Cause-Aware Prognostics (Auditable Baseline)
* **No Black-Box AI:** Filter degradation is computed via an open, transparent formula rather than an opaque ML model:
  $$\text{Remaining Useful Life (RUL \%)} = \left[ \frac{\text{Rated Capacity (L)} - \text{Effective Liters}}{\text{Rated Capacity (L)}} \right] \times 100\%$$
  $$\text{Effective Liters} = \text{Cumulative Liters} \times C_f$$
  $$\text{Condition Factor } C_f = \text{clamp}\left(0.5 + 0.35 \times \frac{\text{Inlet TDS}}{500} + 0.15 \times \frac{\text{Turbidity}}{1.0}, 0.6, 2.5\right)$$
* **Interactive Live Simulation Controls:** Adjust daily consumption ($5\text{--}40\text{ L/day}$) and inlet TDS ($150\text{--}1,200\text{ ppm}$) to see the 180-day prognostic curve recalculate in real-time.

### 🛡️ 2. Offline Vector Water Event Map & $k$-Anonymity Privacy
* **100% Vector SVG Architecture:** Renders neighborhood ward maps locally without external tile servers or internet dependencies, guaranteeing offline resilience.
* **Neighborhood Spatial Clustering:** Identifies shared upstream events (e.g., Ward 4 pipe repair causing 14 purifiers to report simultaneous turbidity spikes).
* **Strict $k$-Anonymity Privacy Model ($N \ge 10$):** Telemetry is clustered at the municipal feeder ward level. Individual GPS coordinates, street addresses, and household telemetry are never exposed or shared.

### 🔧 3. Guided DIY Filter Replacement Flow with 3 Outcomes
Guided 4-step wizard for self-maintenance with deterministic outcome verification:
1. **Outcome 1: Verified in Simulation** — Flush volume $\ge 5.0\text{ L}$ and stable differential pressure. Maintenance record logged to immutable audit trail.
2. **Outcome 2: Pending Flush Requirement** — Incomplete flush ($< 5.0\text{ L}$); system prompts user to complete flush cycle before clearing warnings.
3. **Outcome 3: Verification Failed (Defect Flagged)** — Detects simulated unseated O-rings or cartridge bypass; halts operation to protect membrane.

### 🚨 4. Alerts & Investigation Center
* Severity-graded incident filtering (`critical`, `warning`, `info`).
* Contextual root-cause attribution linking household sensor spikes to confirmed neighborhood municipal repairs.
* Operator workflows: Acknowledge and Resolve with status auditing.

### 🎬 5. Automated Demo Director & Presenter Mode
* One-click **"RUN AQUAMIND DEMO"** automated walkthrough: *"From an Unusual Reading to a Verified Maintenance Record"*.
* Docked playback controls: Pause, Resume, Step Forward, and Close.
* **`?video=1` Presentation Mode:** Optimized 1920x1080 Full HD layout, hides development UI and cursor jitter, displays synchronized narration captions and presenter speaker notes.

### 🔌 6. Real Telemetry Ingestion (FastAPI Backend & ESP32 Firmware)
* **REST API:** `POST /api/readings` with Pydantic schema validation, real-time salt rejection calculation, and anomaly detection.
* **ESP32 Firmware Sketch:** (`hardware/esp32/AquaMind_ESP32.ino`) demonstrates hardware-in-the-loop integration for Hall-effect flow sensors and analog TDS probes.
* **Live Bench Card:** Dynamically appears in the UI *only* when live HTTP telemetry is received from a physical bench or mock runner.

---

## 3. Technology Stack & Architectural Integrity
* **Frontend:** React 18, TypeScript 5, Vite 5, Tailwind CSS, Lucide Icons, Recharts.
* **Testing:** Vitest (unit tests for math engine), Playwright (end-to-end browser automation and video capture).
* **Backend:** FastAPI, Pydantic, Uvicorn, Python 3.12.
* **Firmware:** C++ Arduino sketch for Espressif ESP32 SoC.
* **Design System:** Navy/cyan palette, glassmorphic cards, accessible contrast ratios, visible focus outlines, and `prefers-reduced-motion` compliance.

---

## 4. Quick Start & Setup

### Prerequisites
* Node.js v18+ (tested on v24.19.0)
* npm v9+ (tested on v12.2.1)
* Python 3.10+ (for optional backend, tested on v3.12.10)

### 1. Launch Frontend Application
```bash
# Clone and enter the repository
cd atomQuest

# Install dependencies
npm install

# Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Test Suites
```bash
# Run Model Engine Unit Tests (Vitest)
npx vitest run

# Run Full Playwright End-to-End Suite
npx playwright test
```

### 3. Optional: Run FastAPI Backend Server
```bash
# Start backend server on port 8000
python backend/main.py

# Run backend unit tests
python -m unittest backend/test_backend.py
```

---

## 5. Deployment Guide (Vercel & Netlify Ready)
* **Vercel:** Configured via `vercel.json` with static build and SPA route rewrites.
* **Netlify:** Configured via `netlify.toml` and `public/_redirects`.
* **Build Command:** `npm run build`  
* **Publish Directory:** `dist`

---

## 6. Project Documentation & Traceability
* [CRITERIA_TRACEABILITY.md](file:///d:/atomQuest/docs/CRITERIA_TRACEABILITY.md) — 100% mapping of competition requirements to features.
* [MODEL.md](file:///d:/atomQuest/docs/MODEL.md) — Mathematical formulas and deterministic PRNG specification.
* [FEATURE_STATUS.md](file:///d:/atomQuest/docs/FEATURE_STATUS.md) — Implementation status matrix.
* [ASSUMPTIONS.md](file:///d:/atomQuest/docs/ASSUMPTIONS.md) — Sensor suite assumptions, privacy constraints, and boundaries.
* [TEST_REPORT.md](file:///d:/atomQuest/docs/TEST_REPORT.md) — Test execution evidence.
* [AquaMind_Storyboard.md](file:///d:/atomQuest/AquaMind_Storyboard.md) — 90-second video storyboard and visual cues.
* [AquaMind_Narration.txt](file:///d:/atomQuest/AquaMind_Narration.txt) — 157-word timed voiceover script.
* [AquaMind_Captions.srt](file:///d:/atomQuest/AquaMind_Captions.srt) — Timed SubRip captions.
