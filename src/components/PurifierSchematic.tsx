import React from 'react';
import { FilterStage } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Droplets, Gauge } from 'lucide-react';

interface PurifierSchematicProps {
  stages: FilterStage[];
  onSelectStage?: (stage: FilterStage) => void;
  selectedStageId?: string;
  inletTds: number;
  outletTds: number;
  pumpPressure: number;
}

export const PurifierSchematic: React.FC<PurifierSchematicProps> = ({
  stages,
  onSelectStage,
  selectedStageId,
  inletTds,
  outletTds,
  pumpPressure,
}) => {
  return (
    <div className="card-premium p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-navy-900">Purifier Hydraulic & Filtration Architecture</h2>
            <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              Generic Schematic
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Original engineering illustration. 7-stage sequential purification flow with real-time condition tracking.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200">
            <Droplets className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-slate-500">Inlet TDS:</span>
            <span className="font-semibold text-slate-800">{inletTds} ppm</span>
            <span className="text-[10px] text-slate-400 font-mono">(assumed)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 border border-slate-200">
            <Gauge className="w-3.5 h-3.5 text-brand-500" />
            <span className="text-slate-500">Booster:</span>
            <span className="font-semibold text-slate-800">{pumpPressure} psi</span>
            <span className="text-[10px] text-slate-400 font-mono">(assumed)</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
            <span className="text-emerald-600">Pure Outlet:</span>
            <span className="font-bold">{outletTds} ppm</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="mt-4 relative bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-inner border border-slate-800">
        <svg
          viewBox="0 0 1100 380"
          className="w-full min-w-[900px] h-auto"
          aria-label="Water purifier filter architecture diagram"
          role="img"
        >
          {/* Background Grid Pattern */}
          <defs>
            <pattern id="schematicGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="chassisGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>
            <linearGradient id="waterFlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>

          <rect width="1100" height="380" fill="url(#schematicGrid)" rx="10" />

          {/* Purifier Outer Outline Enclosure */}
          <rect
            x="30"
            y="30"
            width="1040"
            height="320"
            rx="20"
            fill="url(#chassisGrad)"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Header Banner Inside Purifier */}
          <rect x="50" y="45" width="1000" height="36" rx="8" fill="#1e293b" opacity="0.6" />
          <text x="70" y="68" fill="#94a3b8" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            AQUAMIND GENERIC 7-STAGE PURIFICATION MANIFOLD • SEED REPRODUCIBLE STAGE MODEL
          </text>
          <text x="960" y="68" fill="#38bdf8" fontSize="11" fontWeight="500" fontFamily="sans-serif" textAnchor="end">
            STATUS: ACTIVE MONITORING
          </text>

          {/* Water Inflow Pipe (Left) */}
          <path
            d="M 10 190 L 80 190"
            stroke="#0284c7"
            strokeWidth="5"
            strokeDasharray="6 3"
            className="animate-flow"
          />
          <circle cx="15" cy="190" r="5" fill="#38bdf8" />
          <text x="15" y="175" fill="#bae6fd" fontSize="10" fontWeight="bold">Raw Feed In ({inletTds} ppm)</text>

          {/* Hydraulic Manifold Interconnecting Pipe Segments */}
          <path
            d="M 80 190 L 120 190 L 120 140 L 230 140 L 230 190 L 370 190 L 370 140 L 510 140 L 510 190 L 650 190 L 650 140 L 790 140 L 790 190 L 930 190 L 980 190"
            fill="none"
            stroke="#0284c7"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="animate-flow"
          />

          {/* Water Pure Outflow Pipe (Right) */}
          <path
            d="M 980 190 L 1090 190"
            stroke="#10b981"
            strokeWidth="5"
            strokeDasharray="6 3"
            className="animate-flow"
          />
          <circle cx="1085" cy="190" r="5" fill="#34d399" />
          <text x="1085" y="175" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="end">Pure Outlet ({outletTds} ppm)</text>

          {/* 7 Filter Stage Canisters */}
          {stages.map((stage, idx) => {
            const x = 75 + idx * 135;
            const y = 110;
            const isSelected = selectedStageId === stage.id;

            let fillColor = '#1e293b';
            let strokeColor = '#475569';
            let statusTextColor = '#10b981';

            if (stage.status === 'danger') {
              fillColor = '#3f1519';
              strokeColor = '#f43f5e';
              statusTextColor = '#f43f5e';
            } else if (stage.status === 'warning') {
              fillColor = '#362413';
              strokeColor = '#f59e0b';
              statusTextColor = '#f59e0b';
            } else {
              fillColor = isSelected ? '#0c4a6e' : '#1e293b';
              strokeColor = isSelected ? '#38bdf8' : '#334155';
            }

            return (
              <g
                key={stage.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectStage && onSelectStage(stage)}
                className="cursor-pointer transition-transform hover:scale-105"
                style={{ transformOrigin: `${x + 55}px ${y + 80}px` }}
              >
                {/* Canister Outer Shell */}
                <rect
                  width="110"
                  height="160"
                  rx="14"
                  fill={fillColor}
                  stroke={isSelected ? '#38bdf8' : strokeColor}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                />

                {/* Stage Number Badge */}
                <circle cx="24" cy="24" r="12" fill="#0f172a" stroke={strokeColor} strokeWidth="1.2" />
                <text
                  x="24"
                  y="28"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {stage.stageNumber}
                </text>

                {/* Status Indicator Icon Dot */}
                <circle
                  cx="88"
                  cy="24"
                  r="6"
                  fill={statusTextColor}
                  className={stage.status === 'danger' ? 'animate-beacon' : ''}
                />

                {/* Filter Media Pattern Graphic */}
                <rect x="18" y="44" width="74" height="42" rx="4" fill="#0f172a" opacity="0.6" />
                <line x1="24" y1="52" x2="86" y2="52" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />
                <line x1="24" y1="62" x2="86" y2="62" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" />
                <line x1="24" y1="72" x2="86" y2="72" stroke={strokeColor} strokeWidth="1" strokeDasharray="2 2" />

                {/* Stage Name */}
                <text
                  x="55"
                  y="102"
                  fill="#f1f5f9"
                  fontSize="9.5"
                  fontWeight="600"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  {stage.name.length > 15 ? stage.name.slice(0, 14) + '…' : stage.name}
                </text>

                {/* Life Progress Bar Track */}
                <rect x="18" y="112" width="74" height="6" rx="3" fill="#334155" />
                <rect
                  x="18"
                  y="112"
                  width={Math.max(4, Math.round(74 * (stage.remainingLifePercent / 100)))}
                  height="6"
                  rx="3"
                  fill={statusTextColor}
                />

                {/* Remaining % Text */}
                <text
                  x="55"
                  y="132"
                  fill={statusTextColor}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {stage.remainingLifePercent}% Life
                </text>

                {/* Condition Factor Pill */}
                <text
                  x="55"
                  y="146"
                  fill="#94a3b8"
                  fontSize="8.5"
                  textAnchor="middle"
                  fontFamily="sans-serif"
                >
                  Cf: {stage.conditionFactor}x
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Stage Detail Drawer / Preview */}
      {selectedStageId && (
        <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {(() => {
            const st = stages.find(s => s.id === selectedStageId);
            if (!st) return null;
            return (
              <>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      {st.stageNumber}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">{st.name}</h4>
                    <span className={`badge-status text-[11px] ${
                      st.status === 'danger' ? 'badge-danger' : st.status === 'warning' ? 'badge-warning' : 'badge-good'
                    }`}>
                      {st.status === 'danger' ? (
                        <AlertCircle className="w-3 h-3 text-rose-600" />
                      ) : st.status === 'warning' ? (
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      )}
                      {st.remainingLifePercent}% Remaining
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{st.description}</p>
                  <p className="text-[11px] text-slate-500 font-mono">
                    Technology: <span className="text-slate-700 font-medium">{st.technology}</span> • Rated Capacity: <span className="text-slate-700 font-medium">{st.nominalLifeLiters.toLocaleString()} L</span>
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs border-t md:border-t-0 md:border-l border-slate-200 pt-2 md:pt-0 md:pl-6">
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Primary Stress</div>
                    <div className="font-medium text-slate-800">{st.currentStressValue}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Condition Factor</div>
                    <div className="font-bold text-brand-700">{st.conditionFactor}x</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">Last Replaced</div>
                    <div className="text-slate-700">{st.lastReplacedDate}</div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};
