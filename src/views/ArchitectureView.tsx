import React from 'react';
import {
  Cpu,
  Server,
  Database,
  Layout,
  ArrowDown,
  Shield,
  Wifi,
  Radio,
  FileCode,
  CheckCircle2,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-brand-600" />
            End-to-End System & Cloud Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Decoupled edge-to-cloud architecture designed to scale with connected IoT purifiers like the Atomberg Home App ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-status badge-info text-[11px]">
            <Server className="w-3.5 h-3.5" />
            FastAPI + React Ecosystem
          </span>
        </div>
      </div>

      {/* Layered Interactive Architectural Diagram */}
      <div className="card-premium p-6 space-y-6">
        <h2 className="text-base font-bold text-navy-900">4-Tier Technical Stack Architecture</h2>

        {/* Tier 1: Edge MCU */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-950 text-white border border-slate-800 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-brand-500 text-white flex items-center justify-center text-xs font-bold font-mono">
                T1
              </span>
              <div>
                <h3 className="font-bold text-sm text-cyan-200">Edge Sensing & Microcontroller Tier</h3>
                <p className="text-[11px] text-slate-400">ESP32 / Cortex-M0+ IoT Purifier Controller Node</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              C++ / FreeRTOS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="font-bold text-slate-200">Flow Meter ISR</div>
              <div className="text-[11px] text-slate-400 mt-1">Hall-effect pulse counter via hardware interrupt; updates continuous volume accumulator.</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="font-bold text-slate-200">Dual-Pin EC ADC</div>
              <div className="text-[11px] text-slate-400 mt-1">10-bit analog electrical conductivity sampling with temperature compensation polynomial.</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="font-bold text-slate-200">Piezoresistive ΔP</div>
              <div className="text-[11px] text-slate-400 mt-1">Monitors booster inlet (10-35 psi) and pump output (60-95 psi) to detect media compaction.</div>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <div className="font-bold text-slate-200">Local Ring Buffer</div>
              <div className="text-[11px] text-slate-400 mt-1">Circular SPI flash storage (64 KB) prevents data loss during Wi-Fi backhaul dropouts.</div>
            </div>
          </div>
        </div>

        {/* Downward flow indicator */}
        <div className="flex justify-center -my-3">
          <div className="p-1.5 rounded-full bg-slate-100 text-brand-600 border border-slate-300 shadow-sm">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 2: Transport & API Ingestion */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-navy-800 text-white flex items-center justify-center text-xs font-bold font-mono">
                T2
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Ingestion & Telemetry Transport Gateway</h3>
                <p className="text-[11px] text-slate-500">FastAPI Telemetry Microservice (`backend/main.py`)</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
              POST /api/readings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Pydantic Payload Validation</div>
              <div className="text-[11px] text-slate-500 mt-1">Strict schema verification for flow rate, inlet TDS, outlet TDS, and pressure bounds.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Bench Device Dispatcher</div>
              <div className="text-[11px] text-slate-500 mt-1">Dynamically instantiates and updates the "Live Bench Device" card upon receiving valid HTTP packets.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Transport Security</div>
              <div className="text-[11px] text-slate-500 mt-1">Mutual TLS authentication with token authorization for production fleet devices.</div>
            </div>
          </div>
        </div>

        {/* Downward flow indicator */}
        <div className="flex justify-center -my-3">
          <div className="p-1.5 rounded-full bg-slate-100 text-brand-600 border border-slate-300 shadow-sm">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 3: Prognostic & Correlation Engine */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-brand-900/10 border border-brand-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-brand-200/60">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-cyan-700 text-white flex items-center justify-center text-xs font-bold font-mono">
                T3
              </span>
              <div>
                <h3 className="font-bold text-sm text-navy-900">Analytics & Spatial Intelligence Engine</h3>
                <p className="text-[11px] text-slate-500">Deterministic Condition Modeling & k-Anonymity Cluster Filter</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-100 text-brand-800 font-bold">
              0x41515541 Seed PRNG
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs text-slate-600">
            <div className="p-3 bg-white rounded-xl border border-brand-200">
              <div className="font-bold text-slate-800">Condition Factor (Cf) Modeling</div>
              <div className="text-[11px] text-slate-500 mt-1">Computes water stress modifiers per stage: Cf = 1.0 + w_tds·Φ_tds + w_turb·Φ_turb + w_press·Φ_press.</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-brand-200">
              <div className="font-bold text-slate-800">k-Anonymity Grid Clustering</div>
              <div className="text-[11px] text-slate-500 mt-1">Spatial hashing within 500m geohash cells; suppresses cluster publishing unless reporting nodes N ≥ 10.</div>
            </div>
            <div className="p-3 bg-white rounded-xl border border-brand-200">
              <div className="font-bold text-slate-800">DIY Verification Engine</div>
              <div className="text-[11px] text-slate-500 mt-1">Evaluates flush volume, differential pressure settling, and salt rejection stabilization.</div>
            </div>
          </div>
        </div>

        {/* Downward flow indicator */}
        <div className="flex justify-center -my-3">
          <div className="p-1.5 rounded-full bg-slate-100 text-brand-600 border border-slate-300 shadow-sm">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>

        {/* Tier 4: Presentation & User Experience */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold font-mono">
                T4
              </span>
              <div>
                <h3 className="font-bold text-sm text-slate-900">User Presentation & Maintenance Portal</h3>
                <p className="text-[11px] text-slate-500">React + TypeScript + Tailwind + Recharts Single-Page Application</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
              Desktop & Mobile Responsive
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Interactive SVG Schematic</div>
              <div className="text-[11px] text-slate-500 mt-1">Original 7-stage hydraulic vector diagram with flow animation and stage inspection.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Prognostic Curves</div>
              <div className="text-[11px] text-slate-500 mt-1">Live Recharts visualization comparing naive calendar wear against cause-aware degradation.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Self-Verification Wizard</div>
              <div className="text-[11px] text-slate-500 mt-1">3 deterministic maintenance outcomes: verified in simulation, pending, and failed.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800">Demo Director & Broadcast</div>
              <div className="text-[11px] text-slate-500 mt-1">Automated 1080p scenario playback with presenter speaker notes and timed captions.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
