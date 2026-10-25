import {
  PurifierDevice,
  FilterStage,
  Alert,
  NeighborhoodWard,
  ReplacementRecord,
  SimulationConfig,
} from '../types';
import {
  calculateConditionFactor,
  calculateRemainingLife,
  calculateSaltRejection,
  calculateAnomalyScore,
  evaluateReplacementVerification,
  VerificationCheckResult,
} from './modelEngine';

export const INITIAL_SIMULATION_CONFIG: SimulationConfig = {
  dailyConsumptionLiters: 16,
  inletTdsStressPpm: 580,
  turbiditySpikeNtu: 1.8,
  deltaPStressMultiplier: 1.3,
  forceDefectMode: false,
};

export const INITIAL_STAGES: FilterStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    name: 'Sediment Pre-Filter',
    technology: 'Spun Polypropylene (5 Micron)',
    nominalLifeLiters: 3000,
    usedLiters: 2650,
    remainingLifePercent: 12,
    conditionFactor: 1.42,
    status: 'warning',
    replacementStatus: 'nominal',
    lastReplacedDate: '2026-04-12',
    description: 'Catches coarse silt, sand, rust, and macro particles before the booster pump.',
    primaryStressMetric: 'Turbidity & Differential Pressure (ΔP)',
    currentStressValue: '1.8 NTU / 6.2 psi ΔP',
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    name: 'Inline Sediment Filter',
    technology: 'Wound Polypropylene (1 Micron)',
    nominalLifeLiters: 4500,
    usedLiters: 2800,
    remainingLifePercent: 38,
    conditionFactor: 1.15,
    status: 'good',
    replacementStatus: 'nominal',
    lastReplacedDate: '2026-02-18',
    description: 'Deep micro-particulate capture to protect the activated carbon blocks.',
    primaryStressMetric: 'Fine Particle Silt Density Index (SDI)',
    currentStressValue: '0.4 NTU',
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    name: 'Pre-Carbon Adsorption Block',
    technology: 'Extruded Coconut Shell Carbon Block',
    nominalLifeLiters: 6000,
    usedLiters: 3900,
    remainingLifePercent: 35,
    conditionFactor: 1.08,
    status: 'warning',
    replacementStatus: 'nominal',
    lastReplacedDate: '2025-11-20',
    description: 'Adsorbs free chlorine, trihalomethanes, pesticide residues, and volatile organics.',
    primaryStressMetric: 'Free Chlorine Adsorption Capacity',
    currentStressValue: '0.8 ppm Chlorine',
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    name: 'Membrane Protector Layer',
    technology: 'Anti-Scalant Polyphosphate Matrix',
    nominalLifeLiters: 6000,
    usedLiters: 2400,
    remainingLifePercent: 60,
    conditionFactor: 1.12,
    status: 'good',
    replacementStatus: 'nominal',
    lastReplacedDate: '2026-03-01',
    description: 'Sequestering calcium and magnesium ions to prevent calcite scale crystallization on the RO sheet.',
    primaryStressMetric: 'Inlet Hardness & Calcium Carbonate Index',
    currentStressValue: '260 ppm Hardness',
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    name: 'Ultrafiltration (UF) Module',
    technology: 'Hollow Fiber Micro-Capillary (0.01 Micron)',
    nominalLifeLiters: 8000,
    usedLiters: 3200,
    remainingLifePercent: 60,
    conditionFactor: 1.05,
    status: 'good',
    replacementStatus: 'nominal',
    lastReplacedDate: '2025-12-10',
    description: 'Physically strains bacterial cysts, suspended endotoxins, and colloidal matter.',
    primaryStressMetric: 'Hydraulic Flux & Bio-fouling Resistance',
    currentStressValue: '1.2 LPM Flux',
  },
  {
    id: 'stage-6',
    stageNumber: 6,
    name: 'Reverse Osmosis (RO) Membrane',
    technology: 'Thin-Film Polyamide Composite (0.0001 Micron)',
    nominalLifeLiters: 7500,
    usedLiters: 6900,
    remainingLifePercent: 8,
    conditionFactor: 1.35,
    status: 'danger',
    replacementStatus: 'nominal',
    lastReplacedDate: '2025-05-15',
    description: 'High-pressure semi-permeable membrane separating dissolved salts, heavy metals, arsenic, and nitrates.',
    primaryStressMetric: 'Osmotic Pressure & Salt Rejection Degradation',
    currentStressValue: '580 ppm Inlet TDS / 93.4% Rejection',
  },
  {
    id: 'stage-7',
    stageNumber: 7,
    name: 'Post-Carbon Mineralizer Polisher',
    technology: 'Bacteriostatic Silver-Impregnated Active Carbon + Calcite Minerals',
    nominalLifeLiters: 4000,
    usedLiters: 1600,
    remainingLifePercent: 60,
    conditionFactor: 1.02,
    status: 'good',
    replacementStatus: 'nominal',
    lastReplacedDate: '2026-03-25',
    description: 'Restores balanced pH (7.2 - 7.6), enriches essential minerals, and polishes mouthfeel.',
    primaryStressMetric: 'Mineral Dissolution Balance & Taste Index',
    currentStressValue: '38 ppm Outlet TDS / pH 7.4',
  },
];

export const INITIAL_DEVICES: PurifierDevice[] = [
  {
    id: 'device-home-1',
    name: 'Home PurePro 7X (Primary)',
    model: 'AquaMind PurePro 7X IoT (Generic Concept)',
    serialNumber: 'AM-7X-2026-0842',
    location: 'Kitchen — Indiranagar, Bengaluru',
    wardId: 'ward-4',
    isBenchDevice: false,
    onlineStatus: 'online',
    telemetry: {
      flowRateLpm: 1.25,
      inletTdsPpm: 580,
      outletTdsPpm: 38,
      inletPressurePsi: 22.0,
      pumpPressurePsi: 82.5,
      deltaPPsi: 6.2,
      turbidityNtu: 1.8,
      totalLitersFiltered: 4210,
      dailyUsageLiters: 16.0,
      saltRejectionPercent: 93.4,
      anomalyScore: 42,
    },
    stages: INITIAL_STAGES,
    installDate: '2025-05-15',
    lastServiceDate: '2026-04-12',
  },
  {
    id: 'device-office-2',
    name: 'Studio Workstation SmartAqua',
    model: 'AquaMind PurePro 5X Compact (Generic Concept)',
    serialNumber: 'AM-5X-2025-1109',
    location: 'Studio Pantry — Koramangala 4th Block',
    wardId: 'ward-2',
    isBenchDevice: false,
    onlineStatus: 'online',
    telemetry: {
      flowRateLpm: 1.45,
      inletTdsPpm: 320,
      outletTdsPpm: 22,
      inletPressurePsi: 26.0,
      pumpPressurePsi: 78.0,
      deltaPPsi: 3.8,
      turbidityNtu: 0.8,
      totalLitersFiltered: 8520,
      dailyUsageLiters: 28.0,
      saltRejectionPercent: 93.1,
      anomalyScore: 8,
    },
    stages: INITIAL_STAGES.map(s => ({
      ...s,
      usedLiters: Math.round(s.nominalLifeLiters * 0.45),
      remainingLifePercent: 55,
      status: 'good' as const,
    })),
    installDate: '2025-01-10',
    lastServiceDate: '2026-02-10',
  },
  {
    id: 'device-ward4-peer-3',
    name: 'Residency Heights Unit 12B (Peer)',
    model: 'AquaMind PurePro 7X IoT (Generic Concept)',
    serialNumber: 'AM-7X-2026-0914',
    location: '12th Floor — Indiranagar Ward 4',
    wardId: 'ward-4',
    isBenchDevice: false,
    onlineStatus: 'online',
    telemetry: {
      flowRateLpm: 0.95,
      inletTdsPpm: 615,
      outletTdsPpm: 48,
      inletPressurePsi: 18.0,
      pumpPressurePsi: 86.0,
      deltaPPsi: 7.4,
      turbidityNtu: 2.3,
      totalLitersFiltered: 3890,
      dailyUsageLiters: 14.5,
      saltRejectionPercent: 92.2,
      anomalyScore: 48,
    },
    stages: INITIAL_STAGES,
    installDate: '2025-06-20',
    lastServiceDate: '2026-03-15',
  },
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alert-ro-exhaustion',
    deviceId: 'device-home-1',
    timestamp: '2026-10-25T14:30:00Z',
    severity: 'critical',
    title: 'RO Membrane Reaching End of Useful Life',
    description: 'Cumulative effective usage has reached 92% of capacity. Condition-adjusted prognostic curve indicates depletion in 11 days under current 580 ppm inlet TDS stress.',
    metric: 'Remaining RUL',
    metricValue: '8% Remaining',
    threshold: '≤ 15% Trigger',
    status: 'active',
    suggestedAction: 'Order OEM-compatible RO membrane replacement or initiate guided DIY maintenance flow.',
    neighborhoodCorrelated: false,
  },
  {
    id: 'alert-prefilter-dp',
    deviceId: 'device-home-1',
    timestamp: '2026-10-25T11:15:00Z',
    severity: 'warning',
    title: 'Pre-Filter Differential Pressure (ΔP) Elevated',
    description: 'Sediment Pre-Filter ΔP measured at 6.2 psi (nominal 4.0 psi). Correlates with elevated turbidity event in Indiranagar Ward 4 municipal line.',
    metric: 'Differential Pressure (ΔP)',
    metricValue: '6.2 psi',
    threshold: '≥ 5.5 psi Threshold',
    status: 'active',
    suggestedAction: 'Inspect external bowl pre-filter cartridge for heavy sediment cake buildup; flush or replace.',
    neighborhoodCorrelated: true,
  },
  {
    id: 'alert-neighborhood-cluster',
    deviceId: 'device-home-1',
    timestamp: '2026-10-25T08:45:00Z',
    severity: 'info',
    title: 'Neighborhood Anomaly Correlated (Ward 4)',
    description: '14 connected purifiers within 500m cluster reported simultaneous 45% turbidity spike. Anonymized data points to municipal pipeline maintenance.',
    metric: 'Reporting Node Density',
    metricValue: '14 Purifiers (N ≥ 10 met)',
    threshold: 'k-Anonymity Threshold: 10',
    status: 'active',
    suggestedAction: 'Temporary municipal turbidity spike detected. Auto-adjusted prognostic condition factor to prevent premature membrane fouling.',
    neighborhoodCorrelated: true,
  },
];

export const INITIAL_WARDS: NeighborhoodWard[] = [
  {
    id: 'ward-4',
    name: 'Ward 4: Indiranagar Central',
    zone: 'East Zone',
    activePurifiersCount: 18,
    anomalyReportCount: 14,
    meanInletTds: 605,
    meanTurbidity: 2.1,
    status: 'alert',
    eventDescription: 'Municipal Pipe Maintenance: Sediment surge and turbidity elevation affecting local distribution lines.',
    svgPath: 'M 140 80 L 260 70 L 320 160 L 250 240 L 120 210 Z',
    labelPosition: { x: 200, y: 150 },
  },
  {
    id: 'ward-2',
    name: 'Ward 2: Koramangala 4th-6th Block',
    zone: 'South-East Zone',
    activePurifiersCount: 26,
    anomalyReportCount: 1,
    meanInletTds: 325,
    meanTurbidity: 0.8,
    status: 'nominal',
    eventDescription: 'Nominal water quality. Municipal reservoir supply stable.',
    svgPath: 'M 250 240 L 370 210 L 420 320 L 310 370 L 210 320 Z',
    labelPosition: { x: 310, y: 285 },
  },
  {
    id: 'ward-7',
    name: 'Ward 7: Whitefield Tech Corridor',
    zone: 'East Zone',
    activePurifiersCount: 34,
    anomalyReportCount: 2,
    meanInletTds: 410,
    meanTurbidity: 1.1,
    status: 'nominal',
    eventDescription: 'Borewell blend operational. Inlet TDS steady.',
    svgPath: 'M 320 160 L 460 130 L 520 220 L 440 280 L 370 210 Z',
    labelPosition: { x: 420, y: 195 },
  },
  {
    id: 'ward-9',
    name: 'Ward 9: HSR Layout Sector 1-4',
    zone: 'South Zone',
    activePurifiersCount: 22,
    anomalyReportCount: 4,
    meanInletTds: 535,
    meanTurbidity: 1.6,
    status: 'investigating',
    eventDescription: 'Minor pressure fluctuations detected during morning supply window.',
    svgPath: 'M 120 210 L 210 320 L 190 420 L 80 390 L 70 280 Z',
    labelPosition: { x: 135, y: 315 },
  },
  {
    id: 'ward-1',
    name: 'Ward 1: MG Road / CBD',
    zone: 'Central Zone',
    activePurifiersCount: 15,
    anomalyReportCount: 0,
    meanInletTds: 285,
    meanTurbidity: 0.7,
    status: 'nominal',
    eventDescription: 'Cauvery Water Supply steady. Optimal clarity.',
    svgPath: 'M 50 60 L 140 80 L 120 210 L 40 180 Z',
    labelPosition: { x: 85, y: 130 },
  },
];

export const INITIAL_REPLACEMENT_HISTORY: ReplacementRecord[] = [
  {
    id: 'rep-001',
    deviceId: 'device-home-1',
    stageId: 'stage-1',
    stageName: 'Sediment Pre-Filter',
    timestamp: '2026-04-12T10:30:00Z',
    outcome: 'verified',
    flushVolumeLiters: 6.2,
    deltaPMeasured: 3.4,
    outletTdsMeasured: 36,
    saltRejectionCalculated: 93.8,
    notes: 'Verified in simulation: 6.2 L flushed. Hydraulic seating nominal at 3.4 psi ΔP.',
  },
  {
    id: 'rep-002',
    deviceId: 'device-home-1',
    stageId: 'stage-3',
    stageName: 'Pre-Carbon Adsorption Block',
    timestamp: '2025-11-20T16:45:00Z',
    outcome: 'verified',
    flushVolumeLiters: 5.8,
    deltaPMeasured: 3.8,
    outletTdsMeasured: 32,
    saltRejectionCalculated: 94.2,
    notes: 'Verified in simulation: Carbon fines cleared after 5.8 L flush. Effluent turbidity < 0.3 NTU.',
  },
];

/**
 * In-memory state store with deterministic snapshotting
 */
class AquaMindDataStore {
  private devices: PurifierDevice[] = JSON.parse(JSON.stringify(INITIAL_DEVICES));
  private alerts: Alert[] = JSON.parse(JSON.stringify(INITIAL_ALERTS));
  private wards: NeighborhoodWard[] = JSON.parse(JSON.stringify(INITIAL_WARDS));
  private replacements: ReplacementRecord[] = JSON.parse(JSON.stringify(INITIAL_REPLACEMENT_HISTORY));
  private simulationConfig: SimulationConfig = { ...INITIAL_SIMULATION_CONFIG };
  private activeDeviceId: string = 'device-home-1';
  private listeners: Set<() => void> = new Set();

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  getState() {
    return {
      devices: this.devices,
      alerts: this.alerts,
      wards: this.wards,
      replacements: this.replacements,
      simulationConfig: this.simulationConfig,
      activeDeviceId: this.activeDeviceId,
      activeDevice: this.devices.find(d => d.id === this.activeDeviceId) || this.devices[0],
    };
  }

  setActiveDevice(deviceId: string) {
    if (this.devices.some(d => d.id === deviceId)) {
      this.activeDeviceId = deviceId;
      this.notify();
    }
  }

  acknowledgeAlert(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert && alert.status === 'active') {
      alert.status = 'acknowledged';
      alert.acknowledgedAt = new Date().toISOString();
      this.notify();
    }
  }

  resolveAlert(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert && alert.status !== 'resolved') {
      alert.status = 'resolved';
      alert.resolvedAt = new Date().toISOString();
      this.notify();
    }
  }

  updateSimulationConfig(newConfig: Partial<SimulationConfig>) {
    this.simulationConfig = { ...this.simulationConfig, ...newConfig };

    // Dynamically recalculate active device telemetry and stage prognostics based on updated config
    const activeDev = this.devices.find(d => d.id === this.activeDeviceId);
    if (activeDev) {
      activeDev.telemetry.inletTdsPpm = this.simulationConfig.inletTdsStressPpm;
      activeDev.telemetry.turbidityNtu = this.simulationConfig.turbiditySpikeNtu;
      activeDev.telemetry.dailyUsageLiters = this.simulationConfig.dailyConsumptionLiters;
      activeDev.telemetry.deltaPPsi = Math.round(4.0 * this.simulationConfig.deltaPStressMultiplier * 10) / 10;
      activeDev.telemetry.saltRejectionPercent = calculateSaltRejection(
        activeDev.telemetry.inletTdsPpm,
        activeDev.telemetry.outletTdsPpm
      );
      activeDev.telemetry.anomalyScore = calculateAnomalyScore(activeDev.telemetry);

      // Recalculate condition factors & remaining life for each stage
      activeDev.stages = activeDev.stages.map(stage => {
        const cf = calculateConditionFactor(
          stage.stageNumber,
          this.simulationConfig.inletTdsStressPpm,
          this.simulationConfig.turbiditySpikeNtu,
          activeDev.telemetry.deltaPPsi
        );
        const { remainingPercent, status } = calculateRemainingLife(
          stage.nominalLifeLiters,
          stage.usedLiters,
          cf
        );
        return {
          ...stage,
          conditionFactor: cf,
          remainingLifePercent: remainingPercent,
          status,
        };
      });
    }

    this.notify();
  }

  executeReplacement(
    stageId: string,
    flushVolumeLiters: number,
    forceDefectOverride?: boolean
  ): VerificationCheckResult {
    const activeDev = this.devices.find(d => d.id === this.activeDeviceId) || this.devices[0];
    const stage = activeDev.stages.find(s => s.id === stageId);
    if (!stage) {
      throw new Error(`Stage with id ${stageId} not found`);
    }

    const isDefect = forceDefectOverride !== undefined ? forceDefectOverride : this.simulationConfig.forceDefectMode;
    const measuredDeltaP = isDefect ? 7.8 : 3.2;
    const measuredOutletTds = isDefect ? 240 : 28;

    const result = evaluateReplacementVerification(
      stage,
      flushVolumeLiters,
      measuredDeltaP,
      measuredOutletTds,
      activeDev.telemetry.inletTdsPpm,
      isDefect
    );

    // Update stage status
    stage.replacementStatus = result.outcome;

    if (result.outcome === 'verified') {
      // Reset stage usage & wear
      stage.usedLiters = 0;
      stage.remainingLifePercent = 100;
      stage.status = 'good';
      stage.lastReplacedDate = new Date().toISOString().split('T')[0];
      stage.conditionFactor = 1.0;

      // Update device telemetry
      activeDev.telemetry.outletTdsPpm = measuredOutletTds;
      activeDev.telemetry.deltaPPsi = 3.2;
      activeDev.telemetry.saltRejectionPercent = calculateSaltRejection(
        activeDev.telemetry.inletTdsPpm,
        measuredOutletTds
      );
      activeDev.telemetry.anomalyScore = calculateAnomalyScore(activeDev.telemetry);

      // Auto-resolve any active alerts regarding this stage
      this.alerts.forEach(a => {
        if (
          (stage.stageNumber === 6 && a.id === 'alert-ro-exhaustion') ||
          (stage.stageNumber === 1 && a.id === 'alert-prefilter-dp')
        ) {
          a.status = 'resolved';
          a.resolvedAt = new Date().toISOString();
        }
      });
    }

    // Log the maintenance attempt in audit history
    const record: ReplacementRecord = {
      id: `rep-${Date.now()}`,
      deviceId: activeDev.id,
      stageId: stage.id,
      stageName: stage.name,
      timestamp: new Date().toISOString(),
      outcome: result.outcome,
      flushVolumeLiters,
      deltaPMeasured: measuredDeltaP,
      outletTdsMeasured: measuredOutletTds,
      saltRejectionCalculated: result.measuredValues.saltRejectionPercent,
      notes: result.details.join(' '),
    };
    this.replacements.unshift(record);

    this.notify();
    return result;
  }

  ingestBenchTelemetry(packet: {
    flowRateLpm: number;
    inletTdsPpm: number;
    outletTdsPpm: number;
    pressurePsi: number;
    sourceDevice?: string;
  }) {
    let bench = this.devices.find(d => d.isBenchDevice);
    if (!bench) {
      bench = {
        id: 'device-bench-live',
        name: 'Live Hardware Bench (ESP32 Node)',
        model: 'AquaMind Physical Test Rig',
        serialNumber: 'ESP32-HW-LIVE-01',
        location: 'Electronics Engineering Lab Bench #4',
        wardId: 'ward-4',
        isBenchDevice: true,
        onlineStatus: 'online',
        telemetry: {
          flowRateLpm: packet.flowRateLpm,
          inletTdsPpm: packet.inletTdsPpm,
          outletTdsPpm: packet.outletTdsPpm,
          inletPressurePsi: packet.pressurePsi,
          pumpPressurePsi: 75.0,
          deltaPPsi: 3.5,
          turbidityNtu: 0.6,
          totalLitersFiltered: 142.5,
          dailyUsageLiters: 12.0,
          saltRejectionPercent: calculateSaltRejection(packet.inletTdsPpm, packet.outletTdsPpm),
          anomalyScore: 4,
        },
        stages: JSON.parse(JSON.stringify(INITIAL_STAGES)),
        installDate: '2026-10-25',
        lastServiceDate: '2026-10-25',
      };
      this.devices.push(bench);
    } else {
      bench.onlineStatus = 'online';
      bench.telemetry.flowRateLpm = packet.flowRateLpm;
      bench.telemetry.inletTdsPpm = packet.inletTdsPpm;
      bench.telemetry.outletTdsPpm = packet.outletTdsPpm;
      bench.telemetry.inletPressurePsi = packet.pressurePsi;
      bench.telemetry.saltRejectionPercent = calculateSaltRejection(packet.inletTdsPpm, packet.outletTdsPpm);
      bench.telemetry.anomalyScore = calculateAnomalyScore(bench.telemetry);
    }

    this.notify();
  }

  resetToSeedState() {
    this.devices = JSON.parse(JSON.stringify(INITIAL_DEVICES));
    this.alerts = JSON.parse(JSON.stringify(INITIAL_ALERTS));
    this.wards = JSON.parse(JSON.stringify(INITIAL_WARDS));
    this.replacements = JSON.parse(JSON.stringify(INITIAL_REPLACEMENT_HISTORY));
    this.simulationConfig = { ...INITIAL_SIMULATION_CONFIG };
    this.activeDeviceId = 'device-home-1';
    this.notify();
  }
}

export const dataStore = new AquaMindDataStore();
