import React from 'react';
import { useData } from '../context/DataContext';
import { PurifierSchematic } from '../components/PurifierSchematic';
import {
  Activity,
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Play,
  Wrench,
  TrendingDown,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Radio,
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    activeDevice,
    alerts,
    navigateTo,
    startDemo,
    acknowledgeAlert,
  } = useData();

  const activeAlerts = alerts.filter(a => a.status === 'active');
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
  const tel = activeDevice.telemetry;

  return (
    <div className="space-y-6">
      {/* Top Banner: Device Header & Status Summary */}
      <div className="card-premium p-6 bg-gradient-to-r from-slate-900 to-navy-950 text-white border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                {activeDevice.onlineStatus} • {activeDevice.isBenchDevice ? 'HARDWARE BENCH' : 'SIMULATED PURIFIER'}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">{activeDevice.location}</span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1 tracking-tight">
              {activeDevice.name}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Serial: <span className="font-mono text-slate-200">{activeDevice.serialNumber}</span> • Total Filtered: <span className="font-bold text-cyan-300">{tel.totalLitersFiltered.toLocaleString()} L</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={startDemo}
              className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
            >
              <Play className="w-4 h-4 fill-current" />
              Run Guided Scenario
            </button>
            <button
              onClick={() => navigateTo('/replace')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition"
            >
              <Wrench className="w-4 h-4" />
              DIY Maintenance
            </button>
          </div>
        </div>

        {/* Telemetry Quick Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Flow Rate</span>
              <span className="text-[9px] text-slate-400 font-mono">assumed</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {tel.flowRateLpm.toFixed(2)} <span className="text-xs font-normal text-slate-400">LPM</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Nominal delivery
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Inlet TDS</span>
              <span className="text-[9px] text-slate-400 font-mono">assumed</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {tel.inletTdsPpm} <span className="text-xs font-normal text-slate-400">ppm</span>
            </div>
            <div className="text-[10px] text-amber-400 mt-0.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Elevated stress
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Pure Outlet TDS</span>
              <span className="text-[9px] text-slate-400 font-mono">assumed</span>
            </div>
            <div className="text-lg font-bold text-cyan-300 mt-1">
              {tel.outletTdsPpm} <span className="text-xs font-normal text-slate-400">ppm</span>
            </div>
            <div className="text-[10px] text-cyan-300 mt-0.5">
              Sweet & potability tuned
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>RO Salt Rejection</span>
              <span className="text-[9px] text-slate-400 font-mono">assumed</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {tel.saltRejectionPercent}%
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              Nominal barrier (≥ 90%)
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Pre-Filter ΔP</span>
              <span className="text-[9px] text-slate-400 font-mono">assumed</span>
            </div>
            <div className="text-lg font-bold text-amber-400 mt-1">
              {tel.deltaPPsi} <span className="text-xs font-normal text-slate-400">psi</span>
            </div>
            <div className="text-[10px] text-amber-400 mt-0.5">
              Sediment load elevated
            </div>
          </div>

          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/60">
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Anomaly Score</span>
              <span className="text-[9px] text-slate-400 font-mono">z-score</span>
            </div>
            <div className={`text-lg font-bold mt-1 ${tel.anomalyScore > 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {tel.anomalyScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              {tel.anomalyScore > 35 ? 'Attention advised' : 'Normal parameters'}
            </div>
          </div>
        </div>
      </div>

      {/* Critical Anomaly Callout Banner (if any) */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="badge-status badge-danger">CRITICAL ACTION</span>
                <h3 className="font-bold text-rose-900 text-sm">{criticalAlerts[0].title}</h3>
              </div>
              <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                {criticalAlerts[0].description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <button
              onClick={() => acknowledgeAlert(criticalAlerts[0].id)}
              className="px-3 py-1.5 rounded-lg bg-white border border-rose-300 text-rose-800 text-xs font-semibold hover:bg-rose-100 transition"
            >
              Acknowledge
            </button>
            <button
              onClick={() => navigateTo('/replace')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center gap-1"
            >
              Replace Filter <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Generic Purifier 7-Stage Schematic Diagram */}
      <PurifierSchematic
        stages={activeDevice.stages}
        onSelectStage={() => navigateTo('/device')}
        inletTds={tel.inletTdsPpm}
        outletTds={tel.outletTdsPpm}
        pumpPressure={tel.pumpPressurePsi}
      />

      {/* Grid: Filter Stages Summary & Neighborhood Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stages Health Overview */}
        <div className="lg:col-span-2 card-premium p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-navy-900">7-Stage Filter RUL Degradation Tracker</h2>
              <p className="text-xs text-slate-500">
                Formula: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">RUL = Capacity - (Usage × Cf)</code>
              </p>
            </div>
            <button
              onClick={() => navigateTo('/prognostics')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1"
            >
              Interactive Curves <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {activeDevice.stages.map(stage => {
              const isDanger = stage.status === 'danger';
              const isWarning = stage.status === 'warning';

              return (
                <div key={stage.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {stage.stageNumber}
                    </span>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800 text-xs truncate">{stage.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                          ({stage.nominalLifeLiters.toLocaleString()} L nominal)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        Stress: {stage.currentStressValue} • Cf: <span className="font-semibold text-slate-700">{stage.conditionFactor}x</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="w-24 sm:w-32 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className={`text-xs font-bold font-mono ${
                          isDanger ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'
                        }`}>
                          {stage.remainingLifePercent}% Life
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            isDanger ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${stage.remainingLifePercent}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('/replace')}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      DIY
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Neighborhood Anomaly Intelligence Card */}
        <div className="card-premium p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                <h3 className="font-bold text-navy-900 text-sm">Neighborhood Cluster Intel</h3>
              </div>
              <span className="badge-status badge-warning text-[10px]">
                Ward 4 Alert
              </span>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
              <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                Indiranagar Municipal Main Surge
              </div>
              <p className="text-amber-800 leading-relaxed text-[11px]">
                14 purifiers in your 500m cluster detected concurrent 45% turbidity spikes. Cause identified as municipal pipe scour. AquaMind has automatically throttled pre-filter RUL calculations.
              </p>
              <div className="mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-amber-700 font-medium">
                <span>Cluster Density: 14 Nodes</span>
                <span>k-Anonymity Verified (≥ 10)</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Cluster Mean TDS:</span>
                <span className="font-bold text-slate-800">605 ppm</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Cluster Mean Turbidity:</span>
                <span className="font-bold text-slate-800">2.1 NTU</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Privacy Status:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Anonymized Hash
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigateTo('/map')}
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition"
            >
              Open Offline Event Map <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
