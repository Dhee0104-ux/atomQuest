import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { VerificationCheckResult } from '../services/modelEngine';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Clock,
  RotateCcw,
  Droplets,
  Gauge,
  ShieldCheck,
  FileText,
  Sliders,
  ChevronRight,
} from 'lucide-react';

export const ReplacementView: React.FC = () => {
  const { activeDevice, executeReplacement, replacements, navigateTo } = useData();

  // Selected stage for replacement (default to Stage 6: RO Membrane)
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-6');
  
  // Interactive test inputs
  const [flushVolume, setFlushVolume] = useState<number>(6.0); // Default to 6.0L (which passes verification)
  const [forceDefect, setForceDefect] = useState<boolean>(false);
  
  // Verification test result state
  const [testResult, setTestResult] = useState<VerificationCheckResult | null>(null);
  const [isFlushing, setIsFlushing] = useState<boolean>(false);

  const selectedStage = activeDevice.stages.find(s => s.id === selectedStageId) || activeDevice.stages[5];

  const handleRunVerification = () => {
    setIsFlushing(true);
    setTimeout(() => {
      const res = executeReplacement(selectedStage.id, flushVolume, forceDefect);
      setTestResult(res);
      setIsFlushing(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-brand-600" />
            DIY Filter Replacement & Self-Verification Wizard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Closed-loop maintenance protocol. Replace cartridge and verify hydraulic and chemical integrity in simulation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-status badge-info text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified in Simulation Only
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stage Selector & Replacement Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Select Cartridge */}
          <div className="card-premium p-6">
            <div className="flex items-center gap-2 mb-4 font-bold text-slate-800 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">1</span>
              Select Filter Cartridge to Replace
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {activeDevice.stages.map(stage => {
                const isSelected = stage.id === selectedStageId;
                const isDanger = stage.status === 'danger';
                const isWarning = stage.status === 'warning';

                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      setSelectedStageId(stage.id);
                      setTestResult(null);
                    }}
                    className={`p-3 rounded-xl border text-left transition relative ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/50 ring-2 ring-brand-500/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        STAGE {stage.stageNumber}
                      </span>
                      <span className={`badge-status text-[10px] ${
                        isDanger ? 'badge-danger' : isWarning ? 'badge-warning' : 'badge-good'
                      }`}>
                        {stage.remainingLifePercent}% RUL
                      </span>
                    </div>

                    <div className="font-bold text-slate-800 text-xs mt-1.5 truncate">
                      {stage.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">
                      {stage.technology}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Physical Replacement Protocol */}
          <div className="card-premium p-6">
            <div className="flex items-center gap-2 mb-4 font-bold text-slate-800 text-sm">
              <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">2</span>
              Physical Replacement Safety Protocol — {selectedStage.name}
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-brand-700">01</span>
                <div>
                  <strong className="text-slate-800">Isolate Raw Water Feed:</strong> Close the blue inlet ball valve on the angle cock stopcock to isolate municipal supply pressure.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-brand-700">02</span>
                <div>
                  <strong className="text-slate-800">Relieve Internal Pressure:</strong> Open the dispense lever on the front panel for 5 seconds to discharge residual booster backpressure.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-brand-700">03</span>
                <div>
                  <strong className="text-slate-800">Extract Spent Filter & Lube O-Rings:</strong> Unscrew Stage {selectedStage.stageNumber} canister counter-clockwise. Lubricate dual EPDM sealing rings with food-grade silicone grease.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="font-mono font-bold text-brand-700">04</span>
                <div>
                  <strong className="text-slate-800">Insert Cartridge & Hand Tighten:</strong> Insert genuine OEM-spec cartridge firmly into central spigot. Hand tighten housing until firmly seated against stop.
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Hydraulic Flush & Simulation Verification */}
          <div className="card-premium p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                <span className="w-6 h-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center">3</span>
                Verification Telemetry Test Controls
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Required Flush: ≥ 5.0 Liters
              </span>
            </div>

            {/* Interactive Test Sliders */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <label htmlFor="flush-slider" className="flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-brand-600" />
                    Simulated Flush Volume:
                  </label>
                  <span className="font-bold text-brand-700 text-sm font-mono">
                    {flushVolume.toFixed(1)} Liters
                  </span>
                </div>
                <input
                  id="flush-slider"
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={flushVolume}
                  onChange={(e) => {
                    setFlushVolume(parseFloat(e.target.value));
                    setTestResult(null);
                  }}
                  className="w-full accent-brand-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0.0 L (No flush)</span>
                  <span className="text-amber-600 font-bold">2.5 L (Pending)</span>
                  <span className="text-emerald-600 font-bold">5.0 L (Pass Threshold)</span>
                  <span>10.0 L (Full Flush)</span>
                </div>
              </div>

              {/* Quick test preset buttons for Evaluator & Automated Testing */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500">Quick Test Presets:</span>
                <button
                  type="button"
                  id="preset-pending-btn"
                  onClick={() => {
                    setFlushVolume(2.5);
                    setForceDefect(false);
                    setTestResult(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition ${
                    flushVolume === 2.5 && !forceDefect
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Pending Flush (2.5 L)
                </button>
                <button
                  type="button"
                  id="preset-verified-btn"
                  onClick={() => {
                    setFlushVolume(6.0);
                    setForceDefect(false);
                    setTestResult(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition ${
                    flushVolume === 6.0 && !forceDefect
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Verified Pass (6.0 L)
                </button>
                <button
                  type="button"
                  id="preset-defect-btn"
                  onClick={() => {
                    setFlushVolume(6.0);
                    setForceDefect(true);
                    setTestResult(null);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition ${
                    forceDefect
                      ? 'bg-rose-100 border-rose-300 text-rose-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cartridge Defect (Failed)
                </button>
              </div>

              {/* Defect injection checkbox */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <label htmlFor="defect-toggle" className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    id="defect-toggle"
                    type="checkbox"
                    checked={forceDefect}
                    onChange={(e) => {
                      setForceDefect(e.target.checked);
                      setTestResult(null);
                    }}
                    className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                  />
                  <span>Simulate Cartridge Fault (O-ring unseated / bypass leak / high ΔP)</span>
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Triggers Outcome 3</span>
              </div>
            </div>

            {/* Run Verification Button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                id="run-verification-btn"
                onClick={handleRunVerification}
                disabled={isFlushing}
                className="flex-1 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition disabled:opacity-50"
              >
                {isFlushing ? (
                  <>
                    <Droplets className="w-4 h-4 animate-bounce" />
                    <span>Analyzing Flush Telemetry...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Run Simulation Verification ({flushVolume}L Flush)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setFlushVolume(6.0);
                  setForceDefect(false);
                  setTestResult(null);
                }}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                title="Reset test inputs"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Outcome Display Panel */}
            {testResult && (
              <div
                id="verification-result-panel"
                className={`mt-4 p-4 rounded-xl border transition-all ${
                  testResult.outcome === 'verified'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : testResult.outcome === 'pending'
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/20">
                  <div className="flex items-center gap-2">
                    {testResult.outcome === 'verified' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : testResult.outcome === 'pending' ? (
                      <Clock className="w-5 h-5 text-amber-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                    )}
                    <span className="font-black text-sm uppercase tracking-wide">
                      {testResult.outcome === 'verified' && 'Outcome 1: Verified in Simulation'}
                      {testResult.outcome === 'pending' && 'Outcome 2: Pending Flush Requirement'}
                      {testResult.outcome === 'failed' && 'Outcome 3: Verification Failed'}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 font-bold">
                    {testResult.outcome.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {testResult.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Telemetry Summary Metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-current/20 text-center text-xs">
                  <div className="bg-white/60 rounded p-1.5">
                    <div className="text-[10px] text-slate-500">Flush Volume</div>
                    <div className="font-bold">{testResult.measuredValues.flushVolumeLiters.toFixed(1)} L</div>
                  </div>
                  <div className="bg-white/60 rounded p-1.5">
                    <div className="text-[10px] text-slate-500">Hydraulic ΔP</div>
                    <div className="font-bold">{testResult.measuredValues.deltaPPsi.toFixed(1)} psi</div>
                  </div>
                  <div className="bg-white/60 rounded p-1.5">
                    <div className="text-[10px] text-slate-500">RO Rejection</div>
                    <div className="font-bold">{testResult.measuredValues.saltRejectionPercent.toFixed(1)}%</div>
                  </div>
                </div>

                {testResult.outcome === 'verified' && (
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => navigateTo('/')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs"
                    >
                      Return to Dashboard →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Maintenance History Audit Log */}
        <div className="space-y-6">
          <div className="card-premium p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-navy-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-brand-600" />
                Maintenance Audit Trail
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {replacements.length} Records
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {replacements.map(rec => (
                <div
                  key={rec.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{rec.stageName}</span>
                    <span className={`badge-status text-[10px] ${
                      rec.outcome === 'verified' ? 'badge-good' : rec.outcome === 'pending' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {rec.outcome === 'verified' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {rec.outcome === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                      {rec.outcome === 'failed' && <AlertCircle className="w-3 h-3 text-rose-600" />}
                      {rec.outcome}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {rec.notes}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/60 font-mono">
                    <span>{new Date(rec.timestamp).toLocaleString()}</span>
                    <span>{rec.flushVolumeLiters.toFixed(1)} L Flush</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 text-xs text-brand-900 space-y-2">
            <h4 className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-700" />
              Why Closed-Loop Verification Matters
            </h4>
            <p className="text-[11px] leading-relaxed text-brand-800">
              Traditional filter replacements rely on user honor systems or unverified timer resets. AquaMind verifies hydraulic seating and membrane salt rejection before updating the digital twin maintenance ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
