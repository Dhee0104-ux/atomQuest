# AquaMind Deterministic Simulation & Prognostic Model Specification
**atomQUEST 2026 (Atomberg) — Round 2**
*Independent student concept; not affiliated with or endorsed by Atomberg.*

This document details the mathematical and physical equations driving the deterministic simulation engine in AquaMind. All formulas are transparently verifiable and unit-tested in `src/services/modelEngine.test.ts`.

---

## 1. Remaining Useful Life (RUL) Baseline Formula

Conventional water purifiers utilize naive elapsed-time counters (e.g. fixed 365-day timers) which trigger premature replacements in clean water or catastrophic membrane failure in high-TDS/high-sediment municipal supply.

AquaMind uses a deterministic, physics-grounded condition model:

$$\text{Remaining Life (\%)} = \max\left(0, \min\left(100, 100 \times \left(1 - \frac{\text{Usage}_{\text{effective}}}{\text{Rated Capacity}}\right)\right)\right)$$

Where:
- $\text{Rated Capacity}$ is the nominal manufacturer rated volume in Liters ($L$) under standard conditions ($300\text{ ppm TDS}$, $1.0\text{ NTU turbidity}$, $20\text{ psi inlet}$).
- $\text{Usage}_{\text{effective}}$ is the condition-weighted cumulative consumption in Liters ($L$).

### Effective Usage Accumulation:
$$\text{Usage}_{\text{effective}} = \sum_{t=1}^{T} \Delta V_t \cdot C_f(t)$$

Where:
- $\Delta V_t$ is the volume consumed in interval $t$ ($L$).
- $C_f(t)$ is the dimensionless **Condition Factor** at interval $t$.

---

## 2. Condition Factor ($C_f$) Multiplier Equations

The condition factor reflects localized water quality stress on individual filtration media:

$$C_f = 1.0 + w_{\text{TDS}} \cdot \Phi_{\text{TDS}} + w_{\text{turb}} \cdot \Phi_{\text{turb}} + w_{\text{press}} \cdot \Phi_{\text{press}}$$

Where:
1. **TDS Stress Term ($\Phi_{\text{TDS}}$)**:
   $$\Phi_{\text{TDS}} = \max\left(0, \frac{\text{TDS}_{\text{inlet}} - \text{TDS}_{\text{baseline}}}{\text{TDS}_{\text{baseline}}}\right)$$
   - $\text{TDS}_{\text{baseline}} = 300\text{ ppm}$
   - Weights: $w_{\text{TDS}} = 0.65$ for RO membrane; $w_{\text{TDS}} = 0.05$ for pre-sediment.

2. **Turbidity / Colloidal Stress Term ($\Phi_{\text{turb}}$)**:
   $$\Phi_{\text{turb}} = \max\left(0, \frac{\text{Turbidity} - \text{Turbidity}_{\text{baseline}}}{\text{Turbidity}_{\text{baseline}}}\right)$$
   - $\text{Turbidity}_{\text{baseline}} = 1.0\text{ NTU}$
   - Weights: $w_{\text{turb}} = 0.80$ for Pre-Filter & Sediment; $w_{\text{turb}} = 0.10$ for RO.

3. **Differential Pressure ($\Delta P$) Stress Term ($\Phi_{\text{press}}$)**:
   $$\Phi_{\text{press}} = \max\left(0, \frac{\Delta P - \Delta P_{\text{nominal}}}{\Delta P_{\text{nominal}}}\right)$$
   - $\Delta P_{\text{nominal}} = 4.0\text{ psi}$
   - Weights: $w_{\text{press}} = 0.50$ across mechanical stages.

### Stage-Specific Coefficients Table:

| Stage Name | Rated Capacity ($L$) | $w_{\text{TDS}}$ | $w_{\text{turb}}$ | $w_{\text{press}}$ | Primary Degradation Mode |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Stage 1: Pre-Filter** | 3,000 | 0.02 | 0.90 | 0.60 | Surface cake filtration / sediment blinding |
| **Stage 2: Sediment Filter** | 4,500 | 0.05 | 0.75 | 0.40 | Depth fouling of micron pores |
| **Stage 3: Pre-Carbon** | 6,000 | 0.20 | 0.25 | 0.15 | Chlorine saturation & organics exhaustion |
| **Stage 4: Membrane Protector**| 6,000 | 0.40 | 0.20 | 0.10 | Anti-scalant depletion |
| **Stage 5: Ultrafiltration (UF)** | 8,000 | 0.10 | 0.50 | 0.30 | Biofilm & micro-particulate fouling |
| **Stage 6: RO Membrane** | 7,500 | 0.75 | 0.15 | 0.35 | Concentration polarization & scale crystallization |
| **Stage 7: Post-Carbon Polisher** | 4,000 | 0.10 | 0.05 | 0.05 | Residual VOC breakthrough |

---

## 3. Real-Time Anomaly Scoring Engine

AquaMind calculates an instantaneous composite anomaly score $S_{\text{anomaly}} \in [0, 100]$:

$$S_{\text{anomaly}} = \min\left(100, 100 \times \sqrt{\sum_{k} \left(\frac{z_k}{\theta_k}\right)^2}\right)$$

Where $z_k$ is the normalized deviation of sensor feature $k$:
$$z_k = \frac{|x_k - \mu_k|}{\sigma_k}$$
And $\theta_k$ is the alerting threshold in units of standard deviation ($\theta = 3.0$ by default).

### Monitored Feature Vectors:
1. **RO Salt Rejection Ratio ($R_{\text{salt}}$)**:
   $$R_{\text{salt}} = 1.0 - \frac{\text{TDS}_{\text{outlet}}}{\text{TDS}_{\text{inlet}}}$$
   - Nominal: $R_{\text{salt}} \ge 0.90$ ($90\%$ rejection).
   - Anomaly flag: $R_{\text{salt}} < 0.82$ indicates membrane breach or seal bypass.
2. **Permeate Flow Recovery ($Q_{\text{perm}} / Q_{\text{in}}$)**:
   - Sudden drop indicates booster failure or severe feed plugging.
3. **$\Delta P$ Surge Rate**:
   $$\frac{d(\Delta P)}{dt} > 2.5\text{ psi/day}$$
   - Flags sudden municipal main disturbance or sediment surge.

---

## 4. DIY Replacement Verification Engine

When a filter cartridge is replaced, AquaMind triggers a stateful verification engine with three deterministic outcomes:

### Outcome 1: "Verified in Simulation" (Success)
Triggered when all three validation conditions pass:
1. **Flushed Volume ($V_{\text{flush}}$)**: $V_{\text{flush}} \ge 5.0\text{ Liters}$ passed through new cartridge.
2. **Pressure Delta Settling ($\Delta P_{\text{settled}}$)**:
   $$|\Delta P_{\text{measured}} - \Delta P_{\text{new\_nominal}}| \le 1.5\text{ psi}$$
3. **TDS Rejection Stability**:
   $$R_{\text{salt}} \ge 0.90 \quad \text{for } \ge 3 \text{ consecutive readings}$$

### Outcome 2: "Pending Flush" (Waiting)
Triggered when:
- $V_{\text{flush}} < 5.0\text{ Liters}$ (e.g. user ran only 1.2L of flush water).
- The system prevents premature certification and displays progress: *"Flush required: 3.8 L remaining before verification"*.

### Outcome 3: "Verification Failed" (Error / Defect)
Triggered when any failure signature is detected:
1. **Cartridge Bypass**: $R_{\text{salt}} < 0.70$ on RO stage (O-ring misaligned or housing cross-threaded).
2. **Severe Flow Restriction**: Flow rate $< 0.3\text{ LPM}$ under standard $75\text{ psi}$ booster pressure (protective transport end-caps left on cartridge).
3. **Reverse Flow / High Backpressure**: Inlet-to-outlet delta reversed or exceeding $18\text{ psi}$.

---

## 5. Seeded PRNG Specification

To ensure total repeatability across client sessions, demo runs, and automated tests, synthetic telemetry is generated using a linear congruential generator (LCG) initialized with seed `0x41515541` ("AQUA"):

$$X_{n+1} = (a \cdot X_n + c) \pmod m$$
Where:
- $a = 1664525$
- $c = 1013904223$
- $m = 2^{32}$

Resetting the simulation restores all device histories, stage wear, alerts, and verification logs to their canonical initial state.
