import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Database,
  Cpu,
  Layers,
  MapPin,
  Wrench,
  TrendingDown,
  Info,
  BookOpen,
  FileCheck,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    activeDevice,
    devices,
    setActiveDevice,
    startDemo,
    resetToSeedState,
    demoState,
    alerts,
    isVideoMode,
  } = useData();

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const activeAlertsCount = alerts.filter(a => a.status === 'active').length;
  const liveBenchDevice = devices.find(d => d.isBenchDevice);

  const navLinks = [
    { route: '/', label: 'Dashboard', icon: Activity },
    { route: '/device', label: 'Purifier Stages', icon: Layers },
    { route: '/prognostics', label: 'Prognostics', icon: TrendingDown },
    { route: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: activeAlertsCount },
    { route: '/map', label: 'Event Map', icon: MapPin },
    { route: '/replace', label: 'DIY Maintenance', icon: Wrench },
    { route: '/architecture', label: 'Architecture', icon: Cpu },
    { route: '/feasibility', label: 'Feasibility', icon: Sparkles },
    { route: '/evaluate', label: 'Evaluator Guide', icon: FileCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      {/* Required Brand & Independence Disclaimer Banner */}
      <div className="bg-navy-950 text-slate-300 px-4 py-1.5 text-xs border-b border-navy-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-white">AquaMind</span>
            <span className="text-slate-400">|</span>
            <span className="text-cyan-300 font-bold">Team: AtoMaaN • SRMIST • Track 2</span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline">atomQUEST 2026 Round 2 Prototype</span>
          </div>
          <div className="text-[11px] text-slate-300 font-medium">
            Independent student concept; not affiliated with or endorsed by Atomberg.
          </div>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 text-left group transition focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-0.5"
            aria-label="AquaMind Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-navy-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-navy-900 font-sans">AquaMind</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-900 border border-cyan-300 font-mono">
                  PROTOTYPE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Water Event Intelligence</p>
            </div>
          </button>

          {/* Always Visible Simulated Data Pill */}
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
            title="Seeded deterministic linear congruential engine (Seed 0x41515541). Zero invented metrics."
          >
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span>SIMULATED DATA</span>
            <span className="text-[10px] text-slate-400 font-mono">(0x41515541)</span>
          </div>

          {/* Live Bench Device Indicator (Appears ONLY if real telemetry received) */}
          {liveBenchDevice && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold animate-pulse">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>LIVE BENCH CONNECTED</span>
            </div>
          )}
        </div>

        {/* Global Controls: Device Selector, Demo Launcher & Reset */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Device Switcher */}
          <div className="hidden sm:block">
            <label htmlFor="device-selector" className="sr-only">Select Connected Purifier</label>
            <select
              id="device-selector"
              value={activeDevice.id}
              onChange={(e) => setActiveDevice(e.target.value)}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 text-slate-700 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              {devices.map(dev => (
                <option key={dev.id} value={dev.id}>
                  {dev.name} {dev.isBenchDevice ? '★ [LIVE BENCH]' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* RUN AQUAMIND DEMO Guided Scenario Button */}
          {!isVideoMode && (
            <button
              onClick={startDemo}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
                demoState.isRunning
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-brand-600 hover:bg-brand-500 text-white hover:shadow-md'
              }`}
              title="Start the scripted end-to-end scenario: From an Unusual Reading to a Verified Maintenance Record"
              aria-label="Run AquaMind Demo"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{demoState.isRunning ? 'SCENARIO ACTIVE' : 'RUN AQUAMIND DEMO'}</span>
            </button>
          )}

          {/* Reset Simulation State Button */}
          {!isVideoMode && (
            <div className="relative">
              <button
                onClick={() => setConfirmResetOpen(!confirmResetOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                title="Reset simulation to initial seeded state"
                aria-label="Reset simulation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {confirmResetOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs">
                  <div className="font-bold text-slate-800 mb-1">Reset to Seed State?</div>
                  <p className="text-slate-500 text-[11px] mb-3 leading-relaxed">
                    This restores all telemetry, alert acknowledgments, and DIY replacement logs to the canonical initial seed state.
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setConfirmResetOpen(false)}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        resetToSeedState();
                        setConfirmResetOpen(false);
                      }}
                      className="px-2.5 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold"
                    >
                      Reset Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav aria-label="Main Navigation" className="border-t border-slate-100 bg-slate-50/70 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center space-x-1 sm:space-x-2 py-1.5 text-xs">
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => navigateTo(link.route)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-brand-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
