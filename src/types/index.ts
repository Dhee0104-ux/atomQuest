export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  deviceId: string;
  timestamp: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  metric: string;
  metricValue: number | string;
  threshold: number | string;
  status: AlertStatus;
  suggestedAction: string;
  neighborhoodCorrelated: boolean;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export type StageHealthStatus = 'good' | 'warning' | 'danger';
export type ReplacementOutcome = 'verified' | 'pending' | 'failed';

export interface FilterStage {
  id: string;
  stageNumber: number;
  name: string;
  technology: string;
  nominalLifeLiters: number;
  usedLiters: number;
  remainingLifePercent: number;
  conditionFactor: number;
  status: StageHealthStatus;
  replacementStatus: 'nominal' | ReplacementOutcome;
  lastReplacedDate: string;
  description: string;
  primaryStressMetric: string;
  currentStressValue: string;
}

export interface DeviceTelemetry {
  flowRateLpm: number;
  inletTdsPpm: number;
  outletTdsPpm: number;
  inletPressurePsi: number;
  pumpPressurePsi: number;
  deltaPPsi: number;
  turbidityNtu: number;
  totalLitersFiltered: number;
  dailyUsageLiters: number;
  saltRejectionPercent: number;
  anomalyScore: number;
}

export interface PurifierDevice {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  location: string;
  wardId: string;
  isBenchDevice: boolean;
  onlineStatus: 'online' | 'offline' | 'degraded';
  telemetry: DeviceTelemetry;
  stages: FilterStage[];
  installDate: string;
  lastServiceDate: string;
}

export interface NeighborhoodWard {
  id: string;
  name: string;
  zone: string;
  activePurifiersCount: number;
  anomalyReportCount: number;
  meanInletTds: number;
  meanTurbidity: number;
  status: 'nominal' | 'alert' | 'investigating';
  eventDescription?: string;
  svgPath: string;
  labelPosition: { x: number; y: number };
}

export interface ReplacementRecord {
  id: string;
  deviceId: string;
  stageId: string;
  stageName: string;
  timestamp: string;
  outcome: ReplacementOutcome;
  flushVolumeLiters: number;
  deltaPMeasured: number;
  outletTdsMeasured: number;
  saltRejectionCalculated: number;
  notes: string;
}

export interface SimulationConfig {
  dailyConsumptionLiters: number;
  inletTdsStressPpm: number;
  turbiditySpikeNtu: number;
  deltaPStressMultiplier: number;
  forceDefectMode: boolean;
}

export interface DemoStep {
  stepIndex: number;
  title: string;
  route: string;
  headline: string;
  narration: string;
  speakerNotes: string;
  durationMs: number;
  highlightSelector?: string;
  actionTrigger?: 'none' | 'inspect_filter' | 'adjust_slider' | 'run_diy' | 'view_map' | 'resolve_alert';
}
