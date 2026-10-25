import { describe, it, expect } from 'vitest';
import {
  SeededRNG,
  calculateConditionFactor,
  calculateRemainingLife,
  calculateSaltRejection,
  calculateAnomalyScore,
  evaluateReplacementVerification,
  generatePrognosticCurve,
  BASELINES,
} from './modelEngine';
import { FilterStage } from '../types';

describe('AquaMind Model Engine Deterministic Formulas', () => {
  it('reproduces exact PRNG sequences with seed 0x41515541', () => {
    const rng1 = new SeededRNG(0x41515541);
    const rng2 = new SeededRNG(0x41515541);

    const sequence1 = [rng1.next(), rng1.next(), rng1.next()];
    const sequence2 = [rng2.next(), rng2.next(), rng2.next()];

    expect(sequence1).toEqual(sequence2);
    expect(sequence1[0]).toBeGreaterThanOrEqual(0);
    expect(sequence1[0]).toBeLessThan(1);
  });

  it('calculates condition factor (Cf) equal to 1.0 at nominal baseline conditions', () => {
    // Stage 1 at baseline: 300 ppm TDS, 1.0 NTU turbidity, 4.0 psi Delta-P
    const cf = calculateConditionFactor(1, 300, 1.0, 4.0);
    expect(cf).toBe(1.0);
  });

  it('amplifies condition factor on high stress inputs (e.g. RO membrane under high TDS)', () => {
    // Stage 6 (RO): 750 ppm TDS (2.5x baseline), 2.0 NTU, 6.0 psi
    const cfNominal = calculateConditionFactor(6, 300, 1.0, 4.0);
    const cfHighTds = calculateConditionFactor(6, 750, 1.0, 4.0);

    expect(cfNominal).toBe(1.0);
    expect(cfHighTds).toBeGreaterThan(1.5); // RO weight is 0.75 for TDS
  });

  it('calculates remaining life correctly and flags warning / danger status', () => {
    const nominal = 6000;

    // Nominal 50% usage
    const res50 = calculateRemainingLife(nominal, 3000, 1.0);
    expect(res50.remainingPercent).toBe(50);
    expect(res50.status).toBe('good');

    // 70% usage with 1.2 Cf -> effective 84% usage -> 16% remaining (warning)
    const resWarning = calculateRemainingLife(nominal, 4200, 1.2);
    expect(resWarning.remainingPercent).toBe(16);
    expect(resWarning.status).toBe('warning');

    // 85% usage with 1.1 Cf -> effective 93.5% usage -> 6.5% (~6%) remaining (danger)
    const resDanger = calculateRemainingLife(nominal, 5100, 1.1);
    expect(resDanger.remainingPercent).toBe(6);
    expect(resDanger.status).toBe('danger');
  });

  it('calculates salt rejection ratio accurately', () => {
    // Inlet 400 ppm, Outlet 20 ppm -> 95% rejection
    const rejGood = calculateSaltRejection(400, 20);
    expect(rejGood).toBe(95.0);

    // Inlet 500 ppm, Outlet 100 ppm -> 80% rejection
    const rejLow = calculateSaltRejection(500, 100);
    expect(rejLow).toBe(80.0);
  });

  it('evaluates anomaly scores properly across normal and stressed telemetry', () => {
    const normalTelemetry = {
      inletTdsPpm: 350,
      outletTdsPpm: 25, // 92.8% rejection
      deltaPPsi: 4.5,
      turbidityNtu: 0.8,
      flowRateLpm: 1.2,
    };
    const scoreNormal = calculateAnomalyScore(normalTelemetry);
    expect(scoreNormal).toBe(0);

    const breachedTelemetry = {
      inletTdsPpm: 500,
      outletTdsPpm: 120, // 76% rejection (< 85%)
      deltaPPsi: 11.0, // High Delta-P (> 8 psi)
      turbidityNtu: 3.5, // High turbidity (> 2 NTU)
      flowRateLpm: 0.6,
    };
    const scoreBreached = calculateAnomalyScore(breachedTelemetry);
    expect(scoreBreached).toBeGreaterThan(30);
  });

  describe('DIY Replacement Verification Engine', () => {
    const mockStage: FilterStage = {
      id: 'stage-6-ro',
      stageNumber: 6,
      name: 'RO Membrane',
      technology: 'Thin-Film Composite Reverse Osmosis',
      nominalLifeLiters: 7500,
      usedLiters: 7000,
      remainingLifePercent: 7,
      conditionFactor: 1.1,
      status: 'danger',
      replacementStatus: 'nominal',
      lastReplacedDate: '2025-03-10',
      description: 'Primary demineralization barrier',
      primaryStressMetric: 'Inlet TDS & Osmotic Pressure',
      currentStressValue: '680 ppm',
    };

    it('returns "pending" when flush volume is less than 5.0 Liters', () => {
      const result = evaluateReplacementVerification(
        mockStage,
        2.5, // only 2.5L flushed
        3.5, // nominal delta-P
        30,  // good outlet TDS
        400  // inlet TDS
      );
      expect(result.outcome).toBe('pending');
      expect(result.flushVolumePassed).toBe(false);
      expect(result.pressureDeltaPassed).toBe(true);
    });

    it('returns "verified" when flush volume is >= 5.0L and hydraulic/chemical checks pass', () => {
      const result = evaluateReplacementVerification(
        mockStage,
        6.0, // 6.0L flushed
        3.2, // nominal delta-P
        28,  // good outlet TDS (93% rejection)
        400
      );
      expect(result.outcome).toBe('verified');
      expect(result.flushVolumePassed).toBe(true);
      expect(result.pressureDeltaPassed).toBe(true);
      expect(result.rejectionPassed).toBe(true);
    });

    it('returns "failed" when a simulated defect / bypass leak is detected', () => {
      const result = evaluateReplacementVerification(
        mockStage,
        6.0,
        3.2,
        280, // high outlet TDS (only 30% rejection -> membrane leak)
        400,
        true // force defect mode
      );
      expect(result.outcome).toBe('failed');
      expect(result.rejectionPassed).toBe(false);
      expect(result.details.some(d => d.includes('Simulated Cartridge Fault'))).toBe(true);
    });
  });

  it('generates 180-day prognostic projections showing divergence between naive and cause-aware models', () => {
    const mockStage: FilterStage = {
      id: 'stage-1',
      stageNumber: 1,
      name: 'Pre-Filter',
      technology: 'Sediment Depth Filter',
      nominalLifeLiters: 3000,
      usedLiters: 1500,
      remainingLifePercent: 50,
      conditionFactor: 1.45,
      status: 'good',
      replacementStatus: 'nominal',
      lastReplacedDate: '2025-06-15',
      description: 'Pre-filtration',
      primaryStressMetric: 'Turbidity',
      currentStressValue: '2.8 NTU',
    };

    const curve = generatePrognosticCurve(mockStage, 15, 1.45);
    expect(curve.length).toBeGreaterThan(5);

    // At Day 0, both start at 50%
    expect(curve[0].naiveRemainingPercent).toBe(50);
    expect(curve[0].causeAwareRemainingPercent).toBe(50);

    // Later days: cause-aware degrades significantly faster due to Cf = 1.45
    const day60 = curve.find(p => p.day === 60);
    expect(day60).toBeDefined();
    if (day60) {
      expect(day60.causeAwareRemainingPercent).toBeLessThan(day60.naiveRemainingPercent);
    }
  });
});
