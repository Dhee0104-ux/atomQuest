import React from 'react';
import { useData } from '../context/DataContext';
import { ShieldAlert, BookOpen, Cpu, Sparkles, FileCheck, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useData();

  return (
    <footer className="mt-16 bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Concept Identity */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-navy-900 text-sm">AquaMind Water Event Intelligence</span>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                Round 2 Submission
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs max-w-lg">
              AquaMind is an independent student concept submitted for atomQUEST 2026. It explores transparent cause-aware filter prognostics, privacy-preserving neighborhood water quality correlation, and closed-loop DIY maintenance verification.
            </p>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-700">Official Disclaimer:</strong> Independent concept; not affiliated with or endorsed by Atomberg Technologies Pvt. Ltd. All telemetry parameters, filter stages, and hardware models are generic prototype representations.
              </div>
            </div>
          </div>

          {/* Column 2: System Specifications */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Engineering Specs</h4>
            <ul className="space-y-1.5 text-slate-500">
              <li>• PRNG Seed: <code className="text-slate-700 font-mono">0x41515541</code></li>
              <li>• Prognostic Model: Transparent Physics ($C_f$)</li>
              <li>• Anomaly Threshold: Mahalanobis / $z$-Score</li>
              <li>• Verification Rule: 5.0L Flush + $\Delta P$ Settled</li>
              <li>• Map Engine: 100% Vector SVG (Zero Tile Dep)</li>
            </ul>
          </div>

          {/* Column 3: Evaluator Fast Access */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Evaluation Quick Links</h4>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => navigateTo('/evaluate')}
                className="text-left text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <FileCheck className="w-3.5 h-3.5" />
                Evaluator Guide (60s Overview)
              </button>
              <button
                onClick={() => navigateTo('/architecture')}
                className="text-left text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <Cpu className="w-3.5 h-3.5" />
                System & Cloud Architecture
              </button>
              <button
                onClick={() => navigateTo('/feasibility')}
                className="text-left text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Feasibility & BOM Analysis
              </button>
              <button
                onClick={() => navigateTo('/map')}
                className="text-left text-brand-600 hover:text-brand-800 font-medium flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Offline Water Event Map
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>© 2026 AquaMind Engineering Team. Released for atomQUEST 2026 Round 2 evaluation.</div>
          <div className="font-mono">React • TypeScript • Tailwind • Vitest • Playwright • FastAPI</div>
        </div>
      </div>
    </footer>
  );
};
