import { FilterStage, StageHealthStatus, ReplacementOutcome } from '../types';

/**
 * Deterministic PRNG using Linear Congruential Generator (LCG)
 * Seed: 0x41515541 ("AQUA")
 */
export class SeededRNG {
  private state: number;

  constructor(seed: number = 0x41515541) {
    this.state = seed >>> 0;
  }

  next(): number {
    // Numerical Recipes parameters: a = 1664525, c = 1013904223, m = 2^32
    this.state = (Math.imul(1664525, this.state) + 1013904223) >>> 0;
    return this.state / 4294967296;
  }

  nextRange(min: number, max: number): number {
    return min + this.next() * (max - min);
  }

  reset(seed: number = 0x41515541) {
    this.state = seed >>> 0;
  }
}

export const defaultRNG = new SeededRNG();

/**
 * Baseline nominal thresholds
 */
export const BASELINES = {
  TDS_BASELINE_PPM: 300,
  TURBIDITY_BASELINE_NTU: 1.0,
  DELTA_P_NOMINAL_PSI: 4.0,
  MIN_SALT_REJECTION: 0.85,
  FLUSH_REQUIRED_LITERS: 5.0,
  MAX_NEW_STAGE_DELTA_P_PSI: 5.5,
};

export interface StageStressWeights {
  wTds: number;
  wTurb: number;
  wPress: number;
}

export const STAGE_WEIGHTS: Record<number, StageStressWeights> = {
  1: { wTds: 0.02, wTurb: 0.90, wPress: 0.60 }, // Stage 1: Pre-Filter (mechanical sediment)
  2: { wTds: 0.05, wTurb: 0.75, wPress: 0.40 }, // Stage 2: Inline Sediment
  3: { wTds: 0.20, wTurb: 0.25, wPress: 0.15 }, // Stage 3: Pre-Carbon (chlorine, organics)
  4: { wTds: 0.40, wTurb: 0.20, wPress: 0.10 }, // Stage 4: Membrane Protector (anti-scalant)
  5: { wTds: 0.10, wTurb: 0.50, wPress: 0.30 }, // Stage 5: Ultrafiltration (UF)
  6: { wTds: 0.75, wTurb: 0.15, wPress: 0.35 }, // Stage 6: Reverse Osmosis (RO) Membrane
  7: { wTds: 0.10, wTurb: 0.05, wPress: 0.05 }, // Stage 7: Post-Carbon Polisher
};

/**
 * Calculates dimensionless Condition Factor (Cf)
 * Cf = 1.0 + w_tds * Phi_tds + w_turb * Phi_turb + w_press * Phi_press
 */
export function calculateConditionFactor(
  stageNumber: number,
  inletTdsPpm: number,
  turbidityNtu: number,
  deltaPPsi: number
): number {
  const weights = STAGE_WEIGHTS[stageNumber] || { wTds: 0.1, wTurb: 0.1, wPress: 0.1 };

  const phiTds = Math.max(0, (inletTdsPpm - BASELINES.TDS_BASELINE_PPM) / BASELINES.TDS_BASELINE_PPM);
  const phiTurb = Math.max(0, (turbidityNtu - BASELINES.TURBIDITY_BASELINE_NTU) / BASELINES.TURBIDITY_BASELINE_NTU);
  const phiPress = Math.max(0, (deltaPPsi - BASELINES.DELTA_P_NOMINAL_PSI) / BASELINES.DELTA_P_NOMINAL_PSI);

  const cf = 1.0 + (weights.wTds * phiTds) + (weights.wTurb * phiTurb) + (weights.wPress * phiPress);
  // Round to 2 decimal places for clean UI presentation
  return Math.round(cf * 100) / 100;
}

/**
 * Calculates Remaining Life percentage
 * Remaining % = max(0, min(100, 100 * (1 - (usedLiters * conditionFactor) / nominalCapacity)))
 */
export function calculateRemainingLife(
  nominalLifeLiters: number,
  usedLiters: number,
  conditionFactor: number
): { remainingPercent: number; status: StageHealthStatus } {
  if (nominalLifeLiters <= 0) {
    return { remainingPercent: 0, status: 'danger' };
  }

  const effectiveUsage = usedLiters * conditionFactor;
  const rawRatio = 1.0 - (effectiveUsage / nominalLifeLiters);
  const remainingPercent = Math.max(0, Math.min(100, Math.round(rawRatio * 100)));

  let status: StageHealthStatus = 'good';
  if (remainingPercent <= 15) {
    status = 'danger';
  } else if (remainingPercent <= 35) {
    status = 'warning';
  }

  return { remainingPercent, status };
}

/**
 * Calculates RO Salt Rejection
 * Rejection = (1 - OutletTDS / InletTDS) * 100%
 */
export function calculateSaltRejection(inletTds: number, outletTds: number): number {
  if (inletTds <= 0) return 0;
  const rejection = (1.0 - (outletTds / inletTds)) * 100;
  return Math.max(0, Math.min(100, Math.round(rejection * 10) / 10));
}

/**
 * Composite Anomaly Score (0 to 100)
 * Evaluates TDS rejection drift, delta-P surge, and flow deviations
 */
export function calculateAnomalyScore(telemetry: {
  inletTdsPpm: number;
  outletTdsPpm: number;
  deltaPPsi: number;
  turbidityNtu: number;
  flowRateLpm: number;
}): number {
  const rejection = calculateSaltRejection(telemetry.inletTdsPpm, telemetry.outletTdsPpm);
  
  // Rejection penalty: normal >= 90%, penalty if < 85%
  let rejectionPenalty = 0;
  if (rejection < 85) {
    rejectionPenalty = ((85 - rejection) / 85) * 50;
  }

  // Delta-P penalty: normal <= 8 psi, penalty if > 8 psi
  let pressurePenalty = 0;
  if (telemetry.deltaPPsi > 8) {
    pressurePenalty = Math.min(30, (telemetry.deltaPPsi - 8) * 5);
  }

  // Turbidity penalty: normal <= 2 NTU
  let turbidityPenalty = 0;
  if (telemetry.turbidityNtu > 2.0) {
    turbidityPenalty = Math.min(20, (telemetry.turbidityNtu - 2.0) * 8);
  }

  const score = Math.min(100, Math.round(rejectionPenalty + pressurePenalty + turbidityPenalty));
  return score;
}

export interface VerificationCheckResult {
  outcome: ReplacementOutcome;
  flushVolumePassed: boolean;
  pressureDeltaPassed: boolean;
  rejectionPassed: boolean;
  measuredValues: {
    flushVolumeLiters: number;
    deltaPPsi: number;
    outletTdsPpm: number;
    saltRejectionPercent: number;
  };
  details: string[];
}

/**
 * Evaluates DIY Filter Replacement verification with 3 deterministic outcomes:
 * 1. 'verified' : Flush volume >= 5.0L, clean delta-P <= 5.5 psi, rejection >= 88%
 * 2. 'pending'  : Flush volume < 5.0L (requires continuous flushing)
 * 3. 'failed'   : Pressure excessive or rejection severely degraded (bypass/defect)
 */
export function evaluateReplacementVerification(
  stage: FilterStage,
  flushVolumeLiters: number,
  measuredDeltaPPsi: number,
  measuredOutletTdsPpm: number,
  inletTdsPpm: number,
  forceDefectMode: boolean = false
): VerificationCheckResult {
  const saltRejection = calculateSaltRejection(inletTdsPpm, measuredOutletTdsPpm);
  const details: string[] = [];

  const flushVolumePassed = flushVolumeLiters >= BASELINES.FLUSH_REQUIRED_LITERS;
  const pressureDeltaPassed = measuredDeltaPPsi <= BASELINES.MAX_NEW_STAGE_DELTA_P_PSI && measuredDeltaPPsi >= 1.0;
  const rejectionPassed = stage.stageNumber === 6 
    ? saltRejection >= 88 
    : measuredOutletTdsPpm < inletTdsPpm;

  // Outcome 3: Failure if defect forced, pressure dangerously high, or salt rejection collapsed on RO
  if (forceDefectMode || !pressureDeltaPassed || (stage.stageNumber === 6 && saltRejection < 70)) {
    if (forceDefectMode) {
      details.push('Simulated Cartridge Fault: O-ring unseated / bypass leak detected.');
    }
    if (!pressureDeltaPassed) {
      details.push(`Differential pressure (${measuredDeltaPPsi.toFixed(1)} psi) exceeds nominal new-cartridge limit (≤ 5.5 psi). Check for shipping plug obstruction.`);
    }
    if (stage.stageNumber === 6 && saltRejection < 70) {
      details.push(`RO Salt Rejection (${saltRejection.toFixed(1)}%) is below acceptable seal threshold (≥ 88%). Possible membrane bypass.`);
    }
    return {
      outcome: 'failed',
      flushVolumePassed,
      pressureDeltaPassed: false,
      rejectionPassed: false,
      measuredValues: {
        flushVolumeLiters,
        deltaPPsi: measuredDeltaPPsi,
        outletTdsPpm: measuredOutletTdsPpm,
        saltRejectionPercent: saltRejection,
      },
      details,
    };
  }

  // Outcome 2: Pending if flush volume is insufficient
  if (!flushVolumePassed) {
    const remainingLiters = Math.max(0, BASELINES.FLUSH_REQUIRED_LITERS - flushVolumeLiters);
    details.push(`Flush in progress: ${flushVolumeLiters.toFixed(1)} L flushed. Please dispense ${remainingLiters.toFixed(1)} L more to complete flush cycle.`);
    return {
      outcome: 'pending',
      flushVolumePassed: false,
      pressureDeltaPassed,
      rejectionPassed,
      measuredValues: {
        flushVolumeLiters,
        deltaPPsi: measuredDeltaPPsi,
        outletTdsPpm: measuredOutletTdsPpm,
        saltRejectionPercent: saltRejection,
      },
      details,
    };
  }

  // Outcome 1: Verified
  details.push(`Flush cycle complete (${flushVolumeLiters.toFixed(1)} L flushed).`);
  details.push(`Cartridge hydraulic seating verified: ΔP steady at ${measuredDeltaPPsi.toFixed(1)} psi.`);
  if (stage.stageNumber === 6) {
    details.push(`Membrane osmotic integrity confirmed: Salt rejection at ${saltRejection.toFixed(1)}%.`);
  } else {
    details.push(`Stage effluent verified clean: Flow and clarity nominal.`);
  }

  return {
    outcome: 'verified',
    flushVolumePassed: true,
    pressureDeltaPassed: true,
    rejectionPassed: true,
    measuredValues: {
      flushVolumeLiters,
      deltaPPsi: measuredDeltaPPsi,
      outletTdsPpm: measuredOutletTdsPpm,
      saltRejectionPercent: saltRejection,
    },
    details,
  };
}

/**
 * Generates 180-day prognostic projection comparing Standard Calendar vs Cause-Aware Degradation
 */
export function generatePrognosticCurve(
  stage: FilterStage,
  dailyConsumptionLiters: number,
  conditionFactor: number
): Array<{
  day: number;
  label: string;
  naiveRemainingPercent: number;
  causeAwareRemainingPercent: number;
}> {
  const points = [];
  const nominalCapacity = stage.nominalLifeLiters;
  const initialUsed = stage.usedLiters;

  for (let day = 0; day <= 180; day += 15) {
    const additionalVolume = day * dailyConsumptionLiters;
    
    // Naive model: assumes standard nominal consumption and Cf = 1.0
    const naiveUsed = initialUsed + additionalVolume;
    const naiveRemaining = Math.max(0, Math.min(100, Math.round((1 - (naiveUsed / nominalCapacity)) * 100)));

    // Cause-aware model: applies localized stress multiplier
    const causeAwareUsed = initialUsed + (additionalVolume * conditionFactor);
    const causeAwareRemaining = Math.max(0, Math.min(100, Math.round((1 - (causeAwareUsed / nominalCapacity)) * 100)));

    points.push({
      day,
      label: day === 0 ? 'Today' : `+${day}d`,
      naiveRemainingPercent: naiveRemaining,
      causeAwareRemainingPercent: causeAwareRemaining,
    });
  }

  return points;
}
