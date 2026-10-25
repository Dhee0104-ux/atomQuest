# AquaMind Criteria Traceability Matrix
**atomQUEST 2026 (Atomberg) — Round 2 Prototype Submission**
* **Team:** AtoMaaN | **Solo Lead & Developer:** Dheeraj Chilla
* **Institution:** SRM Institute of Science and Technology (SRMIST)
* **Track:** Track 2 — Connected Purification, Edge Telemetry & Predictive Prognostics
* **Official Video Deliverable:** `atomQUEST2026_AtoMaaN_SRMIST_Track2_Video.mp4` (87s, 4.5 MB, Full HD 1080p)
* **Official Progress Report Deliverable:** `atomQUEST2026_AtoMaaN_SRMIST_Track2_Report.pdf` (2 Pages, A4)

This matrix maps core functional themes, competition problem statement criteria, and technical execution requirements to the corresponding system screens, services, and implementation status.

| ID | Requirement / Scope Item | Feature / Screen | System Component | Status | Implementation Details |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | **Independent Concept & Brand Safety** | Landing Banner, System Footer, Feasibility Page | `AppShell.tsx`, `Header.tsx` | **Working** | Prominent disclaimer on all pages: *"Independent concept; not affiliated with or endorsed by Atomberg."* Custom generic purifier SVG schematic. |
| **REQ-02** | **Centralized Seeded Simulation Engine** | All views | `dataService.ts`, `dataContext.tsx` | **Working** | Deterministic PRNG seed `0x41515541`. Stores devices, filter stages, telemetry history, active alerts, and verification records. |
| **REQ-03** | **Generic 7-Stage Filter Model** | Device Detail Page (`/device`), Dashboard (`/`) | `FilterHealthCard.tsx`, `PurifierSchematic.tsx` | **Working** | Models Pre-Filter, Sediment, Pre-Carbon, Membrane Protector, UF, RO, Polisher with explicit "assumed" telemetry fields. |
| **REQ-04** | **Cause-Aware Prognostics with Sliders** | Prognostics Page (`/prognostics`), Dashboard | `PrognosticsView.tsx`, `PrognosticsChart.tsx` | **Working** | Formula: $\text{Life} = \text{Cap} - (\text{Usage} \times C_f)$. Interactive sliders for daily consumption, inlet TDS stress, and sediment spikes with live recalculation. |
| **REQ-05** | **Alerts & Investigation Workflow** | Alerts Center (`/alerts`) | `AlertsView.tsx`, `AlertItem.tsx` | **Working** | Filterable by severity (Critical, Warning, Info), search bar, one-click Acknowledge and Resolve actions with audit timestamps. |
| **REQ-06** | **Local SVG Water Event Map** | Event Intelligence Map (`/map`) | `NeighborhoodMap.tsx` | **Working** | 100% offline SVG vector map of simulated municipal wards. Clustered telemetry spikes (e.g., Ward 4 pipe intrusion) with $k$-anonymity cluster overlays. |
| **REQ-07** | **DIY Filter Replacement Verification** | DIY Maintenance (`/replace`), Device View | `ReplacementWizard.tsx` | **Working** | 3 deterministic simulation outcomes: (1) Verified in simulation, (2) Pending flush requirement, (3) Failed / bypass detected. |
| **REQ-08** | **Guided Scenario: RUN AQUAMIND DEMO** | Universal overlay & Demo Controller | `DemoController.tsx`, `demoScript.ts` | **Working** | Deterministic multi-step guided walkthrough: *"From an Unusual Reading to a Verified Maintenance Record"*. Pause, resume, restart, and step caption overlay. |
| **REQ-09** | **Video Capture Mode (`?video=1`)** | Any page with `?video=1` | `AppShell.tsx`, `DemoController.tsx` | **Working** | 1920x1080 fixed aspect ratio layout, suppresses development UI, automated script timing, presenter speaker notes toggle. |
| **REQ-10** | **System Feasibility & Architecture** | Feasibility Page (`/feasibility`), Architecture (`/architecture`) | `FeasibilityView.tsx`, `ArchitectureView.tsx` | **Working** | Sensor suite specs, edge MCU vs cloud split, privacy consent model ($N \ge 10$ threshold), failure modes, validation experiments, and BOM estimate. |
| **REQ-11** | **Evaluator Guide & Fast Review** | Evaluator Guide (`/evaluate`) | `EvaluatorView.tsx` | **Working** | 60-second summary, traceability matrix, Working vs Future table, and 2-minute step-by-step evaluation script. |
| **REQ-12** | **Live Bench Telemetry Ingestion Path** | FastAPI Backend (`/api/readings`), Bench Card | `backend/main.py`, `LiveBenchCard.tsx` | **Working (Backend) / Ready** | Validated FastAPI endpoint `POST /api/readings`. "Live bench device" card renders ONLY when real telemetry packets are received. |
| **REQ-13** | **Hardware Firmware Reference Sketch** | Hardware repository (`/hardware/esp32`) | `AquaMind_ESP32.ino` | **Working** | Production-ready Arduino/ESP32 sketch with flow pulse interrupt, analog TDS ADC sampling, moving average filter, and JSON HTTP POST. |
| **REQ-14** | **Accessibility & Design Tokens** | App-wide | `tailwind.config.js`, `index.css` | **Working** | Strict navy/cyan palette, icon + text + color status indicators, visible keyboard focus rings, reduced-motion media query handling, axe-core clean. |
| **REQ-15** | **Video & Script Package** | Artifacts / root | `AquaMind_Narration.txt`, `AquaMind_Captions.srt`, `AquaMind_Storyboard.md` | **Working** | 90-second voiceover narration (under 195 words), timestamped SRT subtitles, verified MP4 video render with animated SVG purifier intro. |
