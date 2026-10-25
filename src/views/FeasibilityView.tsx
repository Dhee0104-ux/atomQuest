import React from 'react';
import {
  Sparkles,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Beaker,
  DollarSign,
  CheckCircle2,
  Sliders,
  Radio,
  FileCheck,
} from 'lucide-react';

export const FeasibilityView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-600" />
            Engineering Feasibility, Sensor Suite & Privacy Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hardware BOM feasibility, edge-vs-cloud partition, privacy-preserving neighborhood clustering, and empirical validation matrix.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-status badge-info text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            All Cost Figures: Estimate, Unverified
          </span>
        </div>
      </div>

      {/* Sensor Suite Feasibility */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-base font-bold text-navy-900">Proposed IoT Sensor Suite</h2>
            <p className="text-xs text-slate-500">
              Low-cost commercial transducers suitable for mass production integration in residential smart purifiers.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
            BOM Feasibility
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Sensor Parameter</th>
                <th className="py-2.5 px-3">Transducer Principle</th>
                <th className="py-2.5 px-3">Measurement Range</th>
                <th className="py-2.5 px-3">Interface to MCU</th>
                <th className="py-2.5 px-3">Estimated Unit BOM Cost</th>
                <th className="py-2.5 px-3">Monitored Stage & Function</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Volumetric Flow Rate
                </td>
                <td className="py-3 px-3">Hall-effect turbine rotor (POM food-grade)</td>
                <td className="py-3 px-3 font-mono">0.3 – 3.0 LPM (± 3%)</td>
                <td className="py-3 px-3 font-mono">GPIO Interrupt (Pulse/L)</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 180 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Cumulative flow accumulator across all stages</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Inlet TDS (Raw Feed)
                </td>
                <td className="py-3 px-3">Dual-pin AC conductivity probe (Titanium)</td>
                <td className="py-3 px-3 font-mono">50 – 2,000 ppm (± 5%)</td>
                <td className="py-3 px-3 font-mono">10-bit ADC + Op-Amp</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 140 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Raw water hardness & salinity stress calculation</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Outlet TDS (Permeate)
                </td>
                <td className="py-3 px-3">Dual-pin AC conductivity probe (Titanium)</td>
                <td className="py-3 px-3 font-mono">10 – 250 ppm (± 3%)</td>
                <td className="py-3 px-3 font-mono">10-bit ADC + Op-Amp</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 140 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Stage 6 (RO) salt rejection verification & taste tuning</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Inlet Pressure Transducer
                </td>
                <td className="py-3 px-3">Piezoresistive ceramic diaphragm</td>
                <td className="py-3 px-3 font-mono">0 – 50 psi (± 1 psi)</td>
                <td className="py-3 px-3 font-mono">I2C / 0.5-4.5V ADC</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 220 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Low-pressure pump cavitation prevention</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Booster Pump Pressure
                </td>
                <td className="py-3 px-3">Piezoresistive stainless steel core</td>
                <td className="py-3 px-3 font-mono">0 – 150 psi (± 2 psi)</td>
                <td className="py-3 px-3 font-mono">0.5-4.5V Analog</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 260 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Pre-filter differential pressure (ΔP) & RO feed pressure</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800">
                  Turbidity (Optional Tier)
                </td>
                <td className="py-3 px-3">90° nephelometric IR scatter (850nm LED)</td>
                <td className="py-3 px-3 font-mono">0.1 – 10.0 NTU (± 10%)</td>
                <td className="py-3 px-3 font-mono">Analog Photodiode</td>
                <td className="py-3 px-3 font-bold text-slate-900">
                  ₹ 310 <span className="text-[10px] text-slate-400 font-normal">(estimate, unverified)</span>
                </td>
                <td className="py-3 px-3">Sediment pre-filter blind-off & municipal line repair detection</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid: On-Device vs Cloud Split & Consent Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* On-Device vs Cloud Split */}
        <div className="card-premium p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Cpu className="w-5 h-5 text-brand-600" />
            <h3 className="font-bold text-navy-900 text-sm">Edge MCU vs Cloud Partition</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>On-Device Microcontroller (ESP32)</span>
                <span className="text-[10px] font-mono text-brand-600 font-bold">Real-Time Edge</span>
              </div>
              <ul className="mt-2 space-y-1 text-slate-600">
                <li>• Instantaneous flow pulse counting via hardware ISR</li>
                <li>• AC electrode excitation to prevent galvanic metal plating</li>
                <li>• Emergency dry-run shutdown if inlet pressure &lt; 5 psi</li>
                <li>• Ring-buffered batch uploads (every 60s during dispense)</li>
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-800 flex items-center justify-between">
                <span>Cloud Prognostic Service (FastAPI)</span>
                <span className="text-[10px] font-mono text-purple-600 font-bold">Fleet Intelligence</span>
              </div>
              <ul className="mt-2 space-y-1 text-slate-600">
                <li>• Multi-variable condition factor ($C_f$) longitudinal integration</li>
                <li>• Spatial geohash clustering for municipal line repair correlation</li>
                <li>• Verification ledger for DIY filter replacement audit trail</li>
                <li>• Replenishment order auto-generation before critical depletion</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Consent and Privacy Model for Neighborhood Sharing */}
        <div className="card-premium p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-navy-900 text-sm">Consent & Neighborhood Privacy Model</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
              <strong className="text-emerald-900 block mb-1">Strict Opt-In Participation</strong>
              Neighborhood water event sharing is 100% opt-in. Users who opt out continue to receive local on-device prognostics without broadcasting telemetry.
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">k-Anonymity Cluster Threshold (N ≥ 10)</strong>
              To prevent single-household re-identification, municipal grid events are only published when at least <strong className="text-brand-700">10 active reporting purifiers</strong> within a 500m geohash cell observe a concurrent anomaly.
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="text-slate-900 block mb-1">Zero PII Transmission</strong>
              Only aggregated metrics (mean cluster TDS, mean turbidity spike, active anomaly count) are shared. Consumer identities, serial numbers, and water consumption volumes remain strictly private.
            </div>
          </div>
        </div>
      </div>

      {/* Failure Modes & Mitigations */}
      <div className="card-premium p-6">
        <h3 className="font-bold text-navy-900 text-sm mb-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Hardware Failure Modes & Algorithmic Mitigations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 block">1. Electrode Scaling / Polarization Drift</strong>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              <strong>Risk:</strong> Mineral scale buildup on TDS probe pins causes false low conductivity readings.
            </p>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Mitigation:</strong> 1 kHz alternating current (AC) bipolar excitation reverses polarity on each measurement, preventing electro-deposition. Baseline auto-zeroing during zero-flow state.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 block">2. Air Bubbles in Turbine Flow Meter</strong>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              <strong>Risk:</strong> Cavitation or air slugs cause spurious high-frequency pulse bursts.
            </p>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Mitigation:</strong> Maximum hydraulic physical flow clamp (3.2 LPM upper bound). Low-pass FIR software filter discards non-physical pulse rate deviations.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <strong className="text-slate-800 block">3. Intermittent Wi-Fi Disconnection</strong>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              <strong>Risk:</strong> Telemetry loss during household broadband outages.
            </p>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              <strong>Mitigation:</strong> Flash SPI circular ring buffer stores up to 72 hours of compressed dispense logs; auto-replays upon MQTT reconnect with monotonically verified timestamps.
            </p>
          </div>
        </div>
      </div>

      {/* Empirical Validation Experiments Table */}
      <div className="card-premium p-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div>
            <h3 className="font-bold text-navy-900 text-sm flex items-center gap-2">
              <Beaker className="w-4 h-4 text-brand-600" />
              Proposed Empirical Validation Experiments
            </h3>
            <p className="text-xs text-slate-500">
              Rigorous laboratory protocols required to transition AquaMind from prototype to certified production.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
            Future Validation Roadmap
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Hypothesis / Engineering Claim</th>
                <th className="py-2.5 px-3">Experimental Setup & Methodology</th>
                <th className="py-2.5 px-3">Target Pass Criteria</th>
                <th className="py-2.5 px-3">Test Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  Condition factor ($C_f$) accurately tracks RO membrane salt rejection decline
                </td>
                <td className="py-3 px-3">
                  Accelerated fouling bench with synthetic saline feed (800 ppm NaCl + 250 ppm CaSO4) across 5 purifiers.
                </td>
                <td className="py-3 px-3 font-mono">
                  $R^2 \ge 0.88$ correlation between predicted and gravimetrically measured salt passage.
                </td>
                <td className="py-3 px-3">45 Days continuous</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  Pre-filter ΔP reliably predicts sediment clogging before booster pump cavitation
                </td>
                <td className="py-3 px-3">
                  Arizona Test Dust (ISO 12103-1 A2 Fine) dosed progressively at 5 NTU, 15 NTU, and 30 NTU.
                </td>
                <td className="py-3 px-3 font-mono">
                  Alert fires at least 150 Liters before pump inlet pressure drops below 5 psi.
                </td>
                <td className="py-3 px-3">14 Days</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  5.0L Flush requirement sufficiently clears post-installation carbon fines & O-ring leaks
                </td>
                <td className="py-3 px-3">
                  50 mock DIY replacements by non-expert users; intentional defect injection (loosened seals, inverted cartridges).
                </td>
                <td className="py-3 px-3 font-mono">
                  100% detection rate for bypass leaks (effluent TDS &gt; 120 ppm or flow &lt; 0.3 LPM).
                </td>
                <td className="py-3 px-3">10 Days</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  Neighborhood geohash clustering identifies municipal pipe intrusion with &lt; 5% false alarms
                </td>
                <td className="py-3 px-3">
                  Simulation testbed running 500 virtual nodes across 10 municipal wards with correlated sediment pulse injection.
                </td>
                <td className="py-3 px-3 font-mono">
                  True positive rate $\ge 95\%$, false positive rate $\le 3\%$ under $N \ge 10$ threshold.
                </td>
                <td className="py-3 px-3">7 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
