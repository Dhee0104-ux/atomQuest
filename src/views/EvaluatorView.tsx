import React from 'react';
import { useData } from '../context/DataContext';
import {
  FileCheck,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const EvaluatorView: React.FC = () => {
  const { startDemo, resetToSeedState, navigateTo } = useData();

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-brand-600" />
            AquaMind Evaluator Guide & Criteria Verification
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            atomQUEST 2026 (Atomberg) — Round 2 • 60-second summary, criteria traceability, working-vs-future matrix, and 2-minute review script.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={startDemo}
            className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Launch 2-Min Demo
          </button>
        </div>
      </div>

      {/* 60-Second Overview Card */}
      <div className="card-premium p-6 bg-gradient-to-r from-navy-900 to-slate-900 text-white border-slate-800">
        <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider font-mono mb-2">
          <Clock className="w-4 h-4" />
          60-Second Executive Overview
        </div>
        <h2 className="text-xl font-black text-white tracking-tight">
          Transforming Water Purifiers from Dumb Timers into Trusted Water Intelligence
        </h2>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-3xl">
          Today's residential purifiers force cartridge replacements based on arbitrary 365-day timers regardless of whether the incoming water was 150 ppm Cauvery river supply or 800 ppm high-silt borewell. When filters fail prematurely, consumers blame the appliance.
        </p>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-3xl">
          <strong>AquaMind solves this with three verifiable innovations:</strong>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <strong className="text-cyan-200 block mb-1">1. Cause-Aware Prognostics</strong>
            <span className="text-slate-300 text-[11px]">
              Open mathematical condition modeling ($C_f$) dynamically adjusts remaining useful life based on actual TDS stress, turbidity, and differential pressure.
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <strong className="text-cyan-200 block mb-1">2. Offline Water Event Map</strong>
            <span className="text-slate-300 text-[11px]">
              Correlates municipal supply pipe bursts using privacy-preserving $k$-anonymity ($N \ge 10$ nodes) with zero external map tile dependencies.
            </span>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80">
            <strong className="text-cyan-200 block mb-1">3. Closed-Loop DIY Maintenance</strong>
            <span className="text-slate-300 text-[11px]">
              Self-verifiable replacement testing with 3 deterministic outcomes: verified in simulation, pending flush (5.0L requirement), or defect detected.
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Brand Context: Independent student concept; not affiliated with or endorsed by Atomberg.</span>
          <span className="font-mono text-cyan-300">Seed: 0x41515541</span>
        </div>
      </div>

      {/* 2-Minute Step-by-Step Evaluation Script */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-bold text-navy-900 text-base">2-Minute Step-by-Step Evaluation Walkthrough</h3>
            <p className="text-xs text-slate-500">
              Follow these exact interactive steps to verify all competition requirements within 120 seconds.
            </p>
          </div>
          <button
            onClick={resetToSeedState}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
            title="Reset to seed state before running"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset State First
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>Start at Dashboard (/) — Review Baseline & Purifier Schematic</span>
                <button onClick={() => navigateTo('/')} className="text-brand-600 hover:underline font-normal text-[11px]">Go to page →</button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Observe the live telemetry cards (Flow rate, inlet TDS 580 ppm, outlet TDS 38 ppm, pre-filter ΔP 6.2 psi) — all labeled "assumed". Notice the interactive generic 7-stage purifier SVG illustration with animated flow pulses.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>Inspect Anomaly Alerts (/alerts) — Investigate & Acknowledge</span>
                <button onClick={() => navigateTo('/alerts')} className="text-brand-600 hover:underline font-normal text-[11px]">Go to page →</button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                See the critical RO Membrane exhaustion alert and pre-filter ΔP warning. Click <strong className="text-slate-800">"Acknowledge"</strong> on the critical alert; note how the status updates with an exact timestamp.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>Water Event Map (/map) — Check Offline Vector Map & k-Anonymity</span>
                <button onClick={() => navigateTo('/map')} className="text-brand-600 hover:underline font-normal text-[11px]">Go to page →</button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Click on <strong className="text-slate-800">Ward 4: Indiranagar</strong>. Verify that 14 connected purifiers cluster an identical turbidity surge, and confirm the <strong className="text-emerald-700">k-Anonymity check (N = 14 ≥ 10)</strong> passes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>Cause-Aware Prognostics (/prognostics) — Test Interactive Sliders</span>
                <button onClick={() => navigateTo('/prognostics')} className="text-brand-600 hover:underline font-normal text-[11px]">Go to page →</button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Drag the <strong className="text-slate-800">Daily Consumption</strong> and <strong className="text-slate-800">Inlet TDS Stress</strong> sliders. Watch the 180-day Recharts curve dynamically recalculate showing the divergence between the naive static timer and AquaMind's condition model.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center shrink-0">5</span>
            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-2">
                <span>DIY Replacement Flow (/replace) — Test All 3 Outcomes</span>
                <button onClick={() => navigateTo('/replace')} className="text-brand-600 hover:underline font-normal text-[11px]">Go to page →</button>
              </div>
              <p className="text-slate-600 leading-relaxed">
                1) Set flush slider to <strong className="text-amber-700">2.5 L</strong> → Click Run → See <strong className="text-amber-700">Outcome 2: Pending</strong>.<br/>
                2) Check <strong className="text-rose-700">"Simulate Cartridge Fault"</strong> → Click Run → See <strong className="text-rose-700">Outcome 3: Verification Failed</strong>.<br/>
                3) Uncheck fault, set flush to <strong className="text-emerald-700">6.0 L</strong> → Click Run → See <strong className="text-emerald-700">Outcome 1: Verified in Simulation</strong>. Notice Stage 6 resets to 100% life and the active critical alert auto-resolves!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Criteria Traceability Table (REQ-01 to REQ-15) */}
      <div className="card-premium p-6">
        <h3 className="font-bold text-navy-900 text-base mb-1">Official Criteria Traceability Matrix</h3>
        <p className="text-xs text-slate-500 mb-4">
          Complete mapping of prompt requirements to code implementations and operational status (docs/CRITERIA_TRACEABILITY.md).
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Req ID</th>
                <th className="py-2.5 px-3">Requirement & Scope Item</th>
                <th className="py-2.5 px-3">Screen / View</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Verification Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-01</td>
                <td className="py-2.5 px-3">Independent Concept & Brand Safety Disclaimer</td>
                <td className="py-2.5 px-3 font-mono">Header, Footer, Landing</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Explicit text rendered on all screens; generic purifier SVG.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-02</td>
                <td className="py-2.5 px-3">Deterministic Seeded Simulation Engine</td>
                <td className="py-2.5 px-3 font-mono">App-wide (dataService.ts)</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Seeded LCG 0x41515541; reset button restores exact state.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-03</td>
                <td className="py-2.5 px-3">Generic 7-Stage Filter Model & "Assumed" Telemetry</td>
                <td className="py-2.5 px-3 font-mono">/device, /</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Pre-filter, sediment, carbon, protector, UF, RO, polisher modeled.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-04</td>
                <td className="py-2.5 px-3">Cause-Aware Prognostics with Sliders</td>
                <td className="py-2.5 px-3 font-mono">/prognostics</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">RUL = Cap - (Usage × Cf); Recharts interactive live curve.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-05</td>
                <td className="py-2.5 px-3">Alerts & Investigations (Filter, Search, Acknowledge, Resolve)</td>
                <td className="py-2.5 px-3 font-mono">/alerts</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Stateful action buttons with persistent audit timestamps.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-06</td>
                <td className="py-2.5 px-3">Offline Local SVG Water Event Map</td>
                <td className="py-2.5 px-3 font-mono">/map</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Zero external tile dependencies; k-anonymity N ≥ 10 check.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-07</td>
                <td className="py-2.5 px-3">DIY Filter Replacement with 3 Deterministic Outcomes</td>
                <td className="py-2.5 px-3 font-mono">/replace</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Verified in simulation (≥5L), Pending (&lt;5L), Failed (defect).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-08</td>
                <td className="py-2.5 px-3">Guided Demo Scenario: RUN AQUAMIND DEMO</td>
                <td className="py-2.5 px-3 font-mono">Header / Overlay</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Scripted 6-step walkthrough with pause, resume, captions.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-09</td>
                <td className="py-2.5 px-3">Broadcast Video Mode (?video=1) & Presenter Mode</td>
                <td className="py-2.5 px-3 font-mono">?video=1, ?presenter=1</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">1920x1080 fixed bounds, auto-playback, speaker notes toggle.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-10</td>
                <td className="py-2.5 px-3">Feasibility, Sensor Specs & Privacy Architecture</td>
                <td className="py-2.5 px-3 font-mono">/feasibility, /architecture</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">Sensors, edge/cloud split, BOM cost estimate, failure modes.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-11</td>
                <td className="py-2.5 px-3">Evaluator Guide Page</td>
                <td className="py-2.5 px-3 font-mono">/evaluate</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working</span></td>
                <td className="py-2.5 px-3">60s overview, traceability table, 2-minute review script.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-mono font-bold">REQ-12</td>
                <td className="py-2.5 px-3">Real Telemetry Path (POST /api/readings) & Live Bench Card</td>
                <td className="py-2.5 px-3 font-mono">FastAPI / Header</td>
                <td className="py-2.5 px-3"><span className="badge-status badge-good">Working (Backend)</span></td>
                <td className="py-2.5 px-3">FastAPI backend validates schema; card appears ONLY when real telemetry received.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "What Works Today vs Future Work" Matrix */}
      <div className="card-premium p-6">
        <h3 className="font-bold text-navy-900 text-base mb-1">What Works Today vs Future Work Matrix</h3>
        <p className="text-xs text-slate-500 mb-4">
          Strict honesty disclosure in accordance with Round 2 rules.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Fully Implemented & Working Today
            </div>
            <ul className="space-y-1.5 text-emerald-800 text-[11px] leading-relaxed">
              <li>• Deterministic PRNG simulation engine (seed <code className="font-mono font-bold">0x41515541</code>)</li>
              <li>• Complete 7-stage generic filter modeling with interactive SVG schematic</li>
              <li>• Cause-aware prognostics engine ($C_f$) with live recalculation sliders</li>
              <li>• Alerts center with severity filters, search, acknowledge, and resolve</li>
              <li>• 100% offline SVG neighborhood map with $k$-anonymity cluster verification</li>
              <li>• DIY replacement wizard with 3 deterministic outcomes (verified/pending/failed)</li>
              <li>• Guided demo director with pause, resume, captions, and speaker notes</li>
              <li>• Broadcast video mode (<code className="font-mono font-bold">?video=1</code>) at 1920x1080</li>
              <li>• Python FastAPI backend with Pydantic schema validation (<code className="font-mono">POST /api/readings</code>)</li>
              <li>• Arduino/ESP32 reference firmware sketch with interrupt flow counting</li>
              <li>• Unit test suite (Vitest) verifying all mathematical degradation formulas</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-brand-600" />
              Future Work (Post-Hackathon Roadmap)
            </div>
            <ul className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
              <li>• Physical hardware connected to plumbed hydraulic test bench</li>
              <li>• Live municipal water authority SCADA telemetry API integrations</li>
              <li>• Certified drinking water potability / microbiological laboratory testing</li>
              <li>• Mass-production molded plastic manifold tooling and automotive-grade wiring harness</li>
              <li>• Commercial cloud multi-tenant deployment with AWS IoT Core / GCP IoT Core</li>
              <li>• Real-world consumer mobile app packaging (React Native / Flutter)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
