import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { AlertSeverity, AlertStatus } from '../types';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Search,
  Filter,
  Clock,
  ShieldCheck,
  Radio,
  ArrowRight,
  Wrench,
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert, resolveAlert, navigateTo } = useData();

  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('active');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAlerts = alerts.filter(alert => {
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && alert.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        alert.title.toLowerCase().includes(q) ||
        alert.description.toLowerCase().includes(q) ||
        alert.metric.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-navy-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Alerts & Anomaly Investigation Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Root cause intelligence. Differentiates between localized municipal line disturbances and single-appliance cartridge wear.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Active Anomalies:</span>
          <span className="badge-status badge-danger text-xs font-mono">
            {alerts.filter(a => a.status === 'active').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-premium p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="alerts-search-input"
            type="text"
            placeholder="Search alerts by title, metric or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Severity & Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status buttons */}
          <div className="flex rounded-lg border border-slate-200 p-0.5 bg-slate-50 text-xs">
            {['active', 'acknowledged', 'resolved', 'all'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize transition ${
                  statusFilter === st
                    ? 'bg-white text-navy-900 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Severity selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Informational</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert Cards List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="card-premium p-12 text-center text-slate-500">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <div className="font-bold text-slate-800 text-sm">No Alerts Match Your Filters</div>
            <p className="text-xs text-slate-400 mt-1">
              All monitored water quality and hydraulic metrics are within nominal operating limits.
            </p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`card-premium p-5 border-l-4 transition ${
                  isCritical
                    ? 'border-l-rose-500'
                    : isWarning
                    ? 'border-l-amber-500'
                    : 'border-l-cyan-500'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`badge-status ${
                        isCritical ? 'badge-danger' : isWarning ? 'badge-warning' : 'badge-info'
                      }`}>
                        {isCritical && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
                        {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                        {!isCritical && !isWarning && <Info className="w-3.5 h-3.5 text-cyan-600" />}
                        {alert.severity.toUpperCase()}
                      </span>

                      <h3 className="font-bold text-navy-900 text-sm">{alert.title}</h3>

                      {alert.neighborhoodCorrelated && (
                        <span className="badge-status bg-purple-50 text-purple-700 border-purple-200 text-[10px]">
                          <Radio className="w-3 h-3 text-purple-600" />
                          Neighborhood Cluster Correlated
                        </span>
                      )}

                      <span className={`badge-status text-[10px] ml-auto md:ml-0 ${
                        alert.status === 'resolved'
                          ? 'badge-good'
                          : alert.status === 'acknowledged'
                          ? 'badge-info'
                          : 'bg-slate-100 text-slate-700 border-slate-300'
                      }`}>
                        Status: {alert.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">
                      {alert.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                      <div className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200">
                        <span className="text-slate-400 text-[10px] uppercase font-semibold">Metric: </span>
                        <strong className="text-slate-800">{alert.metric}: </strong>
                        <span className="text-brand-700 font-bold font-mono">{alert.metricValue}</span>
                        <span className="text-slate-400 text-[10px]"> (Threshold: {alert.threshold})</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(alert.timestamp).toLocaleTimeString()} ({new Date(alert.timestamp).toLocaleDateString()})</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                      <strong className="text-slate-800">Suggested Action: </strong>
                      {alert.suggestedAction}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-row md:flex-col items-center gap-2 shrink-0 self-end md:self-start">
                    {alert.status === 'active' && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
                      >
                        Acknowledge
                      </button>
                    )}

                    {alert.status !== 'resolved' && (
                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm transition"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Resolve
                      </button>
                    )}

                    {isCritical && (
                      <button
                        onClick={() => navigateTo('/replace')}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow transition"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        DIY Fix
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
