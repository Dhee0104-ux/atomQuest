import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PurifierSchematic } from '../components/PurifierSchematic';
import { FilterStage } from '../types';
import {
  Layers,
  Wrench,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Droplets,
  Gauge,
  Calendar,
  Shield,
  ArrowRight,
  Info,
} from 'lucide-react';

export const DeviceView: React.FC = () => {
  const { activeDevice, navigateTo } = useData();
  const [selectedStage, setSelectedStage] = useState<FilterStage>(activeDevice.stages[5]); // Default to RO Membrane (stage 6)

  const tel = activeDevice.telemetry;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" />
            Purifier 7-Stage Architecture & Diagnostics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generic multi-barrier filtration sequence. Click any stage to inspect mechanical degradation and stress metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Device:</span>
          <span className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
            {activeDevice.name}
          </span>
        </div>
      </div>

      {/* Interactive Purifier Schematic */}
      <PurifierSchematic
        stages={activeDevice.stages}
        onSelectStage={(st) => setSelectedStage(st)}
        selectedStageId={selectedStage.id}
        inletTds={tel.inletTdsPpm}
        outletTds={tel.outletTdsPpm}
        pumpPressure={tel.pumpPressurePsi}
      />

      {/* Selected Stage Comprehensive Diagnostic Card */}
      <div className="card-premium p-6 border-brand-200 bg-gradient-to-br from-white to-brand-50/20">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold flex items-center justify-center text-sm shadow">
                {selectedStage.stageNumber}
              </span>
              <div>
                <h3 className="text-lg font-bold text-navy-900">{selectedStage.name}</h3>
                <p className="text-xs text-slate-500 font-mono">
                  Technology: <span className="text-slate-700 font-medium">{selectedStage.technology}</span>
                </p>
              </div>
              <span className={`badge-status text-xs ml-auto sm:ml-0 ${
                selectedStage.status === 'danger'
                  ? 'badge-danger'
                  : selectedStage.status === 'warning'
                  ? 'badge-warning'
                  : 'badge-good'
              }`}>
                {selectedStage.status === 'danger' ? (
                  <AlertCircle className="w-3.5 h-3.5" />
                ) : selectedStage.status === 'warning' ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                {selectedStage.remainingLifePercent}% RUL
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedStage.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Nominal Capacity</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  {selectedStage.nominalLifeLiters.toLocaleString()} L
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Effective Usage</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  {Math.round(selectedStage.usedLiters * selectedStage.conditionFactor).toLocaleString()} L
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Condition Factor (Cf)</div>
                <div className="text-sm font-bold text-brand-700 mt-0.5">
                  {selectedStage.conditionFactor}x
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Last Service Date</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">
                  {selectedStage.lastReplacedDate}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-100/80 border border-slate-200 text-xs">
              <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                Degradation Mode & Monitored Stress
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Primary Stressor:</strong> {selectedStage.primaryStressMetric}. Current value: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-slate-800">{selectedStage.currentStressValue}</code>. Elevated inlet mineral content and silt speed up physical pore clogging and scale crystallization.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 shrink-0 lg:w-64">
            <div className="card-premium p-4 bg-white text-xs space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-brand-600" />
                DIY Maintenance Wizard
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Replace this cartridge with self-verifiable hydraulic flush testing.
              </p>
              <button
                onClick={() => navigateTo('/replace')}
                className="w-full py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition mt-2"
              >
                Launch DIY Flow <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Notice:</span> Maintenance verification in AquaMind is strictly <strong className="text-slate-800">verified in simulation</strong> based on pressure delta and flush volume.
            </div>
          </div>
        </div>
      </div>

      {/* All 7 Stages Tabular Overview */}
      <div className="card-premium p-6">
        <h3 className="text-base font-bold text-navy-900 mb-4">Complete 7-Stage Filtration Audit</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Stage #</th>
                <th className="py-3 px-3">Name & Technology</th>
                <th className="py-3 px-3">Remaining RUL</th>
                <th className="py-3 px-3">Condition Factor (Cf)</th>
                <th className="py-3 px-3">Primary Stress</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeDevice.stages.map(st => (
                <tr
                  key={st.id}
                  onClick={() => setSelectedStage(st)}
                  className={`cursor-pointer hover:bg-slate-50/80 transition ${
                    selectedStage.id === st.id ? 'bg-brand-50/40' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-bold text-slate-800">
                    Stage {st.stageNumber}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{st.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{st.technology}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`badge-status text-[11px] ${
                      st.status === 'danger'
                        ? 'badge-danger'
                        : st.status === 'warning'
                        ? 'badge-warning'
                        : 'badge-good'
                    }`}>
                      {st.remainingLifePercent}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-700">
                    {st.conditionFactor}x
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {st.currentStressValue}
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('/replace');
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                    >
                      Replace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
