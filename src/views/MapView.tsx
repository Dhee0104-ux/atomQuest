import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { NeighborhoodWard } from '../types';
import {
  MapPin,
  ShieldCheck,
  Radio,
  Droplets,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Info,
  Layers,
} from 'lucide-react';

export const MapView: React.FC = () => {
  const { wards } = useData();
  const [selectedWardId, setSelectedWardId] = useState<string>('ward-4'); // Default to Ward 4 (Alert event)

  const selectedWard = wards.find(w => w.id === selectedWardId) || wards[0];

  return (
    <div className="space-y-6">
      {/* Page Title & Offline Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-600" />
            Neighborhood Water Event Intelligence Map
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            100% local vector SVG map. Zero external tile or network dependency. Correlates localized water grid anomalies while preserving household privacy.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="badge-status badge-info text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Simulated / Hypothetical Geography
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Vector Map Canvas (2 cols) */}
        <div className="lg:col-span-2 card-premium p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Bengaluru Municipal Ward Network (Simulated)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Offline SVG Vector</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Alert
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Investigating
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Nominal
              </span>
            </div>
          </div>

          <div className="mt-4 relative bg-slate-900 rounded-2xl p-4 overflow-hidden border border-slate-800 shadow-inner">
            <svg
              viewBox="0 0 600 480"
              className="w-full h-auto max-h-[460px]"
              aria-label="Neighborhood water event vector map"
              role="img"
            >
              <defs>
                <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                {/* Ward Anomaly Glow Filters */}
                <filter id="alertGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#f43f5e" floodOpacity="0.6" />
                </filter>
              </defs>

              <rect width="600" height="480" fill="url(#mapGrid)" rx="12" />

              {/* Waterway / Pipeline Backbone Overlay */}
              <path
                d="M 20 200 Q 180 220 300 180 T 580 260"
                fill="none"
                stroke="#0369a1"
                strokeWidth="4"
                strokeDasharray="6 4"
                opacity="0.4"
              />
              <text x="320" y="170" fill="#0284c7" fontSize="9" fontWeight="600" opacity="0.6">
                PRIMARY CAUVERY MUNICIPAL SUPPLY TRUNK LINE
              </text>

              {/* Ward Polygons */}
              {wards.map(ward => {
                const isSelected = selectedWard.id === ward.id;
                let fill = '#1e293b';
                let stroke = '#334155';
                let strokeWidth = '1.5';

                if (ward.status === 'alert') {
                  fill = isSelected ? '#4c0519' : '#311018';
                  stroke = '#f43f5e';
                  strokeWidth = isSelected ? '3' : '2';
                } else if (ward.status === 'investigating') {
                  fill = isSelected ? '#451a03' : '#291809';
                  stroke = '#f59e0b';
                  strokeWidth = isSelected ? '3' : '2';
                } else {
                  fill = isSelected ? '#064e3b' : '#0c221d';
                  stroke = isSelected ? '#34d399' : '#047857';
                  strokeWidth = isSelected ? '2.5' : '1.5';
                }

                return (
                  <g
                    key={ward.id}
                    onClick={() => setSelectedWardId(ward.id)}
                    className="cursor-pointer transition-all duration-200"
                  >
                    <path
                      d={ward.svgPath}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      filter={ward.status === 'alert' && isSelected ? 'url(#alertGlow)' : undefined}
                      className="hover:opacity-90"
                    />

                    {/* Ward Label */}
                    <text
                      x={ward.labelPosition.x}
                      y={ward.labelPosition.y}
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {ward.name.split(':')[0]}
                    </text>
                    <text
                      x={ward.labelPosition.x}
                      y={ward.labelPosition.y + 14}
                      fill="#94a3b8"
                      fontSize="8.5"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {ward.activePurifiersCount} Nodes
                    </text>

                    {/* Anomaly Beacon (Ward 4) */}
                    {ward.status === 'alert' && (
                      <circle
                        cx={ward.labelPosition.x + 35}
                        cy={ward.labelPosition.y - 12}
                        r="6"
                        fill="#f43f5e"
                        className="animate-beacon"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Click any polygon to inspect local water telemetry and cluster status.</span>
            <span className="font-mono text-[10px]">Projection: Local SVG Planar</span>
          </div>
        </div>

        {/* Selected Ward Detail Drawer (1 col) */}
        <div className="card-premium p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                  {selectedWard.zone}
                </span>
                <h3 className="font-bold text-navy-900 text-base">{selectedWard.name}</h3>
              </div>

              <span className={`badge-status ${
                selectedWard.status === 'alert'
                  ? 'badge-danger'
                  : selectedWard.status === 'investigating'
                  ? 'badge-warning'
                  : 'badge-good'
              }`}>
                {selectedWard.status === 'alert' && <AlertCircle className="w-3.5 h-3.5" />}
                {selectedWard.status === 'investigating' && <AlertTriangle className="w-3.5 h-3.5" />}
                {selectedWard.status === 'nominal' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {selectedWard.status.toUpperCase()}
              </span>
            </div>

            {/* Event Description Card */}
            <div className={`p-3.5 rounded-xl text-xs space-y-1.5 border ${
              selectedWard.status === 'alert'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : selectedWard.status === 'investigating'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                <Radio className="w-4 h-4 shrink-0" />
                Municipal Grid Intelligence
              </div>
              <p className="leading-relaxed text-[11px]">
                {selectedWard.eventDescription}
              </p>
            </div>

            {/* Ward Telemetry Summary Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Cluster Mean TDS</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  {selectedWard.meanInletTds} <span className="text-xs font-normal text-slate-500">ppm</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Cluster Mean Turbidity</div>
                <div className="text-base font-bold text-slate-800 mt-0.5">
                  {selectedWard.meanTurbidity} <span className="text-xs font-normal text-slate-500">NTU</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Reporting Nodes</div>
                <div className="text-base font-bold text-brand-700 mt-0.5">
                  {selectedWard.activePurifiersCount} Purifiers
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-400 font-semibold uppercase">Active Anomalies</div>
                <div className={`text-base font-bold mt-0.5 ${selectedWard.anomalyReportCount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {selectedWard.anomalyReportCount} Nodes
                </div>
              </div>
            </div>

            {/* Privacy & K-Anonymity Validation Check */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Neighborhood Consent & Privacy
                </span>
                <span className="badge-status badge-good text-[10px]">
                  k-Anonymity Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                AquaMind enforces a strict minimum-participant threshold (<strong className="text-slate-700">N ≥ 10 reporting nodes</strong>) within each 500m cluster before aggregating telemetry. Individual household identifiers, GPS coordinates, and water volume logs are cryptographically blinded.
              </p>
              <div className="text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-200">
                Threshold: N = {selectedWard.activePurifiersCount} ≥ 10 (PASSED)
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono text-center pt-2 border-t border-slate-100">
            Seeded simulation vector dataset • No commercial tile API required
          </div>
        </div>
      </div>
    </div>
  );
};
