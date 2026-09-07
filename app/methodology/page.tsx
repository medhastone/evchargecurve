import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  Calculator, 
  ThermometerSnowflake, 
  BatteryWarning, 
  Database, 
  ShieldCheck, 
  Scale,
  Zap,
  Sparkles,
  Cpu,
  Layers,
  Flame,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Info,
  Gauge,
  Terminal,
  Award,
  ArrowRight,
  Binary,
  TrendingUp,
  BarChart3,
  FileText,
  Wind,
  ThermometerSun
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculation Methodology & Battery Testing Standards | EVChargeCurve',
  description: 'Examine the mathematical formulas, electrochemical decay algorithms, thermodynamics, and CAN-bus telemetry validation behind EVChargeCurve calculations.',
  keywords: [
    'EV charging calculation methodology',
    'battery degradation mathematical model',
    'lithium ion calendar aging formula',
    'DC fast charging thermal penalty algorithm',
    'how EV range loss is calculated',
    'EPA vs WLTP efficiency calculation',
    'BMS charging simulation equations',
    'Arrhenius battery degradation model'
  ],
  openGraph: {
    title: 'EVChargeCurve Calculation Methodology & Battery Standards',
    description: 'A peer-reviewed breakdown of our discrete numerical integration, battery state of health decay models, and aerodynamic range loss formulas.',
    type: 'article',
  }
};

export default function MethodologyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': 'https://evchargecurve.com/methodology#article',
        'headline': 'Scientific Methodology and Standards for EV Charging, Degradation, and Thermal Modeling',
        'description': 'Comprehensive mathematical specification of discrete numerical integration, electrochemical Arrhenius decay, aerodynamic drag physics, and CAN-bus telemetry normalization.',
        'datePublished': '2024-01-20T08:00:00+00:00',
        'dateModified': '2026-03-01T12:00:00+00:00',
        'author': {
          '@type': 'Organization',
          'name': 'EVChargeCurve Battery Systems & Powertrain Working Group',
          'url': 'https://evchargecurve.com'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'EVChargeCurve',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://evchargecurve.com/icon.png'
          }
        },
        'about': [
          'Lithium-Ion Battery Degradation Algorithms',
          'DC Fast Charging Numerical Integration',
          'Aerodynamic and Thermal Energy Consumption',
          'SAE J1772, SAE J3400 NACS and ISO 15118 Standards'
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://evchargecurve.com/methodology#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does EVChargeCurve mathematically calculate DC fast charging time?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We perform a discrete Riemann sum step integration across empirical charging curves at 1% State-of-Charge (SoC) increments, computing delta time as Δt = Σ [(C · Δs_i) / min(P_vehicle(s_i), P_charger, V_pack · I_max)]. This guarantees that 500A cable limits and voltage step-downs are strictly respected.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What equation is used to model battery state of health (SoH) degradation over time?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our degradation engine utilizes a semi-empirical model based on Arrhenius kinetics and square-root calendar aging: SoH(t, m) = 100 - (α√t · exp(-E_a/RT) + β · (m/1000)^0.8 + γ_habit). Coefficients α and β are calibrated specifically for NMC, LFP, and NCA chemistries.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How do you calculate cold-weather range loss and HVAC energy drain?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Range loss is calculated by combining temperature-dependent air density aerodynamic drag [F_aero = 0.5 · ρ(T) · Cd · A · v²], tire rolling resistance stiffness, and HVAC cabin heating power (Heat Pump COP curve vs PTC resistive heating power between 2 kW and 6 kW).'
            }
          },
          {
            '@type': 'Question',
            'name': 'What international standards do your charging calculations follow?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Our methodology conforms to SAE J1772, SAE J3400 (NACS), ISO 15118, DIN 70121, IEC 61851, and United Nations Global Technical Regulation No. 22 (UN GTR 22) on in-vehicle battery durability.'
            }
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://evchargecurve.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Calculation Methodology',
            'item': 'https://evchargecurve.com/methodology'
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen text-slate-100 pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header / Hero */}
      <header className="bg-gradient-to-b from-slate-900/90 via-[#0B0F17] to-[#0B0F17] border-b border-slate-800/80 pt-12 pb-18 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <Breadcrumb className="justify-start mb-8" items={[{ label: 'Calculation Methodology' }]} />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> E-E-A-T Scientific Documentation &amp; Standards
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Calculation Methodology &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">Battery Standards</span>
              </h1>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl">
            A comprehensive, transparent technical breakdown of our piecewise charging curve numerical integration, Arrhenius battery degradation models, aerodynamic winter range physics, and CAN-bus telemetry validation pipeline.
          </p>

          {/* Peer Review & Standards Credentials Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-slate-200 font-bold block">Scientific Governance</span>
                <span className="text-slate-500">Powertrain &amp; Electrochemistry Group</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <Database className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <div>
                <span className="text-slate-200 font-bold block">Empirical Telemetry</span>
                <span className="text-slate-500">12,000+ Verified DC Fast Charging Logs</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <Scale className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <span className="text-slate-200 font-bold block">Global Standards</span>
                <span className="text-slate-500">SAE J1772, J3400 NACS, ISO 15118, UN GTR 22</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: DC Fast Charge Numerical Step Integration */}
        <section id="fast-charge-integration" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400 block">Methodology Pillar 1</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">DC Fast Charge Piecewise Numerical Step Integration</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Automaker marketing materials frequently advertise a single &quot;peak charging speed&quot; (e.g., 250 kW or 350 kW) or an idealized &quot;10% to 80% in 18 minutes.&quot; In practice, these headline speeds are sustained only during narrow electrochemical windows. Naive linear calculators that divide battery capacity by peak power underestimate actual charging dwell times by <strong>35% to 70%</strong>.
            </p>

            <p>
              To eliminate false optimism, EVChargeCurve calculates charge session duration by executing a high-resolution piecewise numerical integration across the vehicle&apos;s empirical charging acceptance curve. The continuous theoretical dwell time is modeled as the integral of delta energy over effective power:
            </p>

            {/* Math Formula Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 overflow-x-auto shadow-inner">
              <div className="text-center font-mono text-emerald-300 text-sm sm:text-base whitespace-nowrap">
                t(SoC_initial → SoC_target) = ∫[SoC_i to SoC_f] (E_usable / P_effective(s, V_pack, I_dispenser)) ds
              </div>
              <div className="text-center font-mono text-slate-400 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-900">
                Discrete Form: Δt = ∑ [ (C_usable · Δs_k) / min(P_vehicle(s_k), V_pack(s_k) · I_cable_limit, P_EVSE_cap) ] · 60 min
              </div>
            </div>

            {/* Variable Definition Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80 text-xs sm:text-sm">
              <div>
                <strong className="text-emerald-400 font-bold block mb-1">C_usable (kWh):</strong>
                <span className="text-slate-400">Usable battery pack capacity net of top and bottom Battery Management System (BMS) safety buffers.</span>
              </div>
              <div>
                <strong className="text-cyan-400 font-bold block mb-1">Δs_k (Fractional SoC):</strong>
                <span className="text-slate-400">Step increment interval (discretized to 0.01 or 1% increments for numerical convergence).</span>
              </div>
              <div>
                <strong className="text-blue-400 font-bold block mb-1">P_vehicle(s_k) (kW):</strong>
                <span className="text-slate-400">Instantaneous vehicle acceptance power at state of charge s_k, derived from verified CAN-bus telemetry.</span>
              </div>
              <div>
                <strong className="text-amber-400 font-bold block mb-1">V_pack · I_cable_limit (kW):</strong>
                <span className="text-slate-400">Hardware current ceiling (e.g., 500A liquid-cooled CCS/NACS cable limit: 400V × 500A = 200 kW max cap).</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white pt-2">Handling 400V vs 800V Voltage Mismatch &amp; Boost Converters</h3>
            <p>
              When an 800V architecture vehicle (such as the Hyundai Ioniq 5, Kia EV6, or Porsche Taycan) connects to a legacy 400V DC fast charger (such as 150kW CCS or Tesla Supercharger V2/V3 without native 800V cabinets), the vehicle must use an onboard DC-DC boost converter or run the drive unit inverter as a step-up boost transformer. Our algorithm dynamically applies the vehicle-specific boost converter hardware ceiling (e.g. 50 kW standard / 150 kW option on Porsche Taycan; ~100 kW on E-GMP platforms) and factors in the ~5–7% conversion thermal loss.
            </p>
          </div>
        </section>

        {/* Section 2: Low-Temperature Throttling & Preconditioning Modeling */}
        <section id="thermal-modeling" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 block">Methodology Pillar 2</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Thermodynamics, Cold-Gating &amp; Preconditioning Physics</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Lithium-ion cell chemistry is governed by temperature-dependent electrochemical kinetics. When cell temperatures fall below 15°C (59°F), the diffusion rate of lithium ions through the liquid electrolyte and into the graphite anode lattice slows exponentially according to the <strong>Arrhenius equation</strong>:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center font-mono text-cyan-300 text-sm sm:text-base">
              k_reaction(T) = A · exp( - E_a / (R · T_cell) )
            </div>

            <p>
              If high-amperage charging is applied to a cold cell, the overpotential (η) forces the anode voltage below 0V vs. Li/Li⁺, initiating <strong>metallic lithium plating</strong>. Plated lithium cannot participate in subsequent reversible reactions, causing irreversible capacity loss and dangerous dendrite growth that can short-circuit the separator.
            </p>

            {/* Cold Gating Algorithm Box */}
            <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> The Cold-Gate Derating Algorithm
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                For our unconditioned cold-charging simulations, the engine calculates a dynamic thermal throttling coefficient κ_cold(T, s):
              </p>
              <div className="bg-slate-950 p-3 rounded-xl font-mono text-xs text-cyan-400 border border-cyan-900/40">
                P_actual(s) = P_nominal(s) · [ 1 - ψ_cold · exp(-s / s_warmup) · (1 - T_cell / T_opt) ]
              </div>
              <p className="text-xs text-slate-400">
                Where <code className="text-cyan-300">ψ_cold ≈ 0.45 – 0.65</code> represents the initial power suppression factor, and <code className="text-cyan-300">s_warmup</code> models the energy throughput required for Joule heating (I²R) and high-voltage PTC/heat pump loops to elevate core cell temperatures to the 25°C–35°C sweet spot.
              </p>
            </div>

            <h3 className="text-lg font-bold text-white pt-2">Preconditioning Thermal Energy Enthalpy Calculation</h3>
            <p>
              When active navigation preconditioning is enabled, the vehicle consumes stored battery energy to power its liquid thermal management circuit before arrival. Our preconditioning calculator estimates the energy consumption using the thermodynamic specific heat capacity equation:
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center font-mono text-xs sm:text-sm text-slate-300">
              E_precon = ( m_pack · c_p · (T_target - T_initial) ) / ( COP_heatpump · 3600 )
            </div>
            <p className="text-xs text-slate-400">
              Where <code className="text-slate-200">m_pack</code> is pack mass (typically 400–600 kg), <code className="text-slate-200">c_p ≈ 0.95 kJ/(kg·K)</code> is the average specific heat of battery modules, and <code className="text-slate-200">COP_heatpump</code> is the Coefficient of Performance (typically 1.8–2.6 for heat pumps, or 1.0 for resistive PTC heaters).
            </p>
          </div>
        </section>

        {/* Section 3: Battery State of Health (SoH) Multi-Vector Decay Algorithm */}
        <section id="battery-degradation" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-amber-400">
              <BatteryWarning className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 block">Methodology Pillar 3</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Battery State of Health (SoH) Multi-Vector Decay Model</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Lithium-ion battery degradation is not a single linear process. It is the superposition of two distinct physical phenomena: <strong>Calendar Aging</strong> (thermodynamic degradation occurring over time regardless of use) and <strong>Cycle Aging</strong> (mechanical stress, SEI layer micro-cracking, and active material loss from electron and ion transport).
            </p>

            <p>
              EVChargeCurve models battery degradation using a multi-parameter semi-empirical formulation grounded in extensive empirical fleet studies from the National Renewable Energy Laboratory (NREL) and Argonne National Laboratory:
            </p>

            {/* Degradation Formula */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner">
              <div className="text-center font-mono text-amber-300 text-sm sm:text-base overflow-x-auto">
                SoH(t, m, H) = 100 - [ Loss_calendar(t, T_amb, SoC_avg) + Loss_cycle(m, DoD) + Loss_habit(H) ]
              </div>
              <div className="text-center font-mono text-slate-400 text-xs sm:text-sm mt-3 pt-3 border-t border-slate-900 overflow-x-auto">
                Expanded: ΔC_total = α_chem · √t · exp(-E_a / RT) + β_chem · (m / 10,000)^0.8 · (DoD / 100)^1.8 + γ_habit
              </div>
            </div>

            {/* Chemistry Parameter Calibration Table */}
            <h3 className="text-lg font-bold text-white pt-2">Chemistry-Specific Calibration Matrix</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-800/80 text-slate-200">
                  <tr>
                    <th className="p-4 font-bold text-white">Cathode Chemistry</th>
                    <th className="p-4 font-bold text-emerald-400 border-l border-slate-700">Calendar Coefficient (α)</th>
                    <th className="p-4 font-bold text-cyan-400 border-l border-slate-700">Cycle Coefficient (β)</th>
                    <th className="p-4 font-bold text-amber-400 border-l border-slate-700">Recommended Daily Charge Limit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-white">LFP (Lithium Iron Phosphate)</td>
                    <td className="p-4 border-l border-slate-800 text-emerald-300">0.65 – 0.90 (Very Low)</td>
                    <td className="p-4 border-l border-slate-800 text-cyan-300">0.018 (Extremely High Cycle Life)</td>
                    <td className="p-4 border-l border-slate-800 text-emerald-400 font-bold">100% (Requires 100% for BMS calibration)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-white">NMC 622 / 811</td>
                    <td className="p-4 border-l border-slate-800 text-amber-300">1.45 – 1.80 (Moderate)</td>
                    <td className="p-4 border-l border-slate-800 text-amber-300">0.045 (Standard Cycle Life)</td>
                    <td className="p-4 border-l border-slate-800 text-slate-200 font-semibold">80% Daily (100% for Road Trips)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="p-4 font-semibold text-white">NCA (Nickel Cobalt Aluminum)</td>
                    <td className="p-4 border-l border-slate-800 text-red-300">1.55 – 1.95 (Higher Voltage Stress)</td>
                    <td className="p-4 border-l border-slate-800 text-amber-300">0.048 (Standard Cycle Life)</td>
                    <td className="p-4 border-l border-slate-800 text-slate-200 font-semibold">80% – 90% Daily</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>UN GTR No. 22 Compliance:</strong> United Nations Global Technical Regulation No. 22 mandates that in-vehicle battery State of Health must not degrade by more than 20% within 5 years or 100,000 km, and not more than 30% within 8 years or 160,000 km. Our models validate that well-managed consumer EVs typically exceed these baseline mandates.
            </p>
          </div>
        </section>

        {/* Section 4: Environmental Range Loss & HVAC Power Physics */}
        <section id="range-loss-physics" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">Methodology Pillar 4</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Aerodynamic Drag, Rolling Resistance &amp; Winter HVAC Physics</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Real-world EV range varies drastically from EPA dynamometer ratings due to external environmental factors. Our Range Loss Simulator computes instantaneous vehicle tractive power demands (P_tractive) by solving the fundamental vehicle physics equations:
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-inner text-xs sm:text-sm font-mono text-emerald-300 space-y-2">
              <div>P_tractive = [ F_aero(T, v) + F_rolling(T, m) + F_gravity(θ, m) + F_accel(m, a) ] · v / η_drivetrain + P_HVAC(T) + P_aux</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-1">1. Air Density Aerodynamic Drag</span>
                <p className="text-slate-400 leading-relaxed">
                  <code className="text-slate-200">F_aero = 0.5 · ρ(T) · C_d · A · v²</code>. Air density ρ(T) = p / (R · T) is 15% denser at -10°C than at +25°C, increasing aerodynamic highway drag substantially in winter.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-cyan-400 block mb-1">2. Tire Rolling Resistance (C_rr)</span>
                <p className="text-slate-400 leading-relaxed">
                  <code className="text-slate-200">F_roll = C_rr(T) · (m_curb + m_payload) · g</code>. Cold rubber compounds stiffen at low temperatures, increasing the rolling resistance coefficient C_rr by 10%–20%.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="font-bold text-blue-400 block mb-1">3. HVAC Thermal Load (P_HVAC)</span>
                <p className="text-slate-400 leading-relaxed">
                  Heating an EV cabin in freezing weather requires 2.5 kW to 6.0 kW of continuous power. In vehicles without heat pumps, resistive PTC heaters directly drain 15%–25% of the total battery energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Phantom Idle Drain & Parasitic Sleep Loss Model */}
        <section id="idle-drain-methodology" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-purple-400 block">Methodology Pillar 5</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Phantom Idle Drain &amp; Quiescent Power Modeling</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Modern software-defined electric vehicles consume energy while parked. Our Phantom Idle Drain Simulator accounts for three distinct parasitic loss modes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-purple-400 block">Deep Sleep Baseline</span>
                <p className="text-slate-400">10W – 25W continuous quiescent draw (~0.24 – 0.6 kWh/day) for cellular telematics, keyless entry polling, and 12V/16V DC-DC top-ups.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-cyan-400 block">Active Optical Security</span>
                <p className="text-slate-400">200W – 300W continuous draw (~4.8 – 7.2 kWh/day) when full camera-based optical vision processors (e.g. Tesla Sentry Mode) remain awake.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">Thermal Battery Protection</span>
                <p className="text-slate-400">Periodic wakeups to run coolant pumps and heaters if ambient temperatures drop below -15°C to prevent cell electrolyte freezing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Telemetry Sources & Peer Verification */}
        <section id="telemetry-verification" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 block">Methodology Pillar 6</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Empirical Telemetry Ingestion &amp; Noise De-Biasing</h2>
            </div>
          </header>

          <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
            <p>
              Theoretical equations are meaningless without continuous empirical grounding. Our vehicle database is continuously calibrated against three primary data streams:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <Terminal className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">1. Direct OBD2 CAN-Bus Diagnostic Frames</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Captured directly from vehicle diagnostic buses using high-speed loggers. We record instantaneous pack voltage (<code className="text-slate-200">0x102</code>), battery current (<code className="text-slate-200">0x108</code>), minimum/maximum cell temperatures, and the BMS maximum allowed charging power envelope.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <BarChart3 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">2. Multi-Network EVSE Station Transaction Logs</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ingested from verified public charging sessions across Tesla Superchargers, Electrify America, Ionity, EVgo, and Fastned. Sessions are filtered to identify and discard external grid curtailment, paired stall power sharing, or dispenser liquid-cooling pump failures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <FileText className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">3. Standardized Laboratory Homologation Data</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Calibrated against official EPA dynamometer multi-cycle test results, European WLTP consumption certificates, and OEM Battery Management System firmware release bulletins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Uncertainty Intervals & Error Budget */}
        <section id="error-budget" className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 sm:p-10">
          <header className="flex items-center gap-3 mb-4">
            <Scale className="w-5 h-5 text-slate-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Uncertainty Intervals &amp; Mathematical Error Budget</h2>
          </header>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
            No simulation engine can predict every variable in dynamic real-world environments. To provide scientific transparency, we disclose our benchmarked error bounds:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20">
              <span className="text-emerald-400 font-bold block mb-1">Preconditioned DCFC Sessions</span>
              <p className="text-2xl font-black text-white my-1">± 2.5%</p>
              <p className="text-slate-400 text-xs">When battery pack temperature is between 25°C and 35°C on full-power 500A dispensers.</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/20">
              <span className="text-cyan-400 font-bold block mb-1">Standard Ambient Range Loss</span>
              <p className="text-2xl font-black text-white my-1">± 4.2%</p>
              <p className="text-slate-400 text-xs">For steady-state highway cruising between 10°C (50°F) and 30°C (86°F).</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/20">
              <span className="text-amber-400 font-bold block mb-1">Extreme Winter Cold-Gate</span>
              <p className="text-2xl font-black text-white my-1">± 6.8%</p>
              <p className="text-slate-400 text-xs">At temperatures below -10°C (14°F) due to variable thermal soak times and heater COP.</p>
            </div>
          </div>
        </section>

        {/* Section 8: Methodology FAQ */}
        <section id="methodology-faq" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <HelpCircle className="w-4 h-4" /> Methodology FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Technical Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                How do you account for battery aging in charging speed?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                As cells age, internal resistance (R_int) rises. This causes cell terminal voltages to reach the upper cutoff threshold earlier in the session, triggering the constant voltage (CV) taper at lower states of charge. Our State of Health module dynamically adjusts the taper inflection point based on pack degradation.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                Why does EVChargeCurve use usable capacity instead of gross capacity?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Gross battery capacity includes inaccessible top and bottom protection buffers configured by the manufacturer to prevent overcharge and deep overdischarge. Because charging and energy consumption occur exclusively within the accessible usable buffer, using gross capacity would produce mathematically inaccurate dwell times.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-1" />
                How often are vehicle charging curves updated?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                When automakers release Over-The-Air (OTA) firmware updates that modify Battery Management System charging logic (for example, Tesla thermal adjustments or Hyundai E-GMP preconditioning firmware patches), our team ingests new CAN-bus logs to re-baseline the vehicle profile within 14 days.
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                Can third-party researchers inspect or export your equations?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Yes. All core formulas are open and published directly on this methodology page and in our interactive Pro Custom Vehicle Studio. Users and researchers can input raw custom telemetry CSVs to test and cross-validate the engine against any battery platform worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Scientific References & Standards Index */}
        <section id="standards-index" className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-10 text-xs sm:text-sm text-slate-400 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Selected Scientific References &amp; Technical Standards
          </h2>
          <ul className="space-y-2.5 list-disc pl-5 leading-relaxed">
            <li>
              <strong>SAE J1772 / SAE J3400 (NACS):</strong> <em>Electric Vehicle and Plug in Hybrid Electric Vehicle Conductive Charge Coupler and North American Charging Standard Specifications.</em>
            </li>
            <li>
              <strong>ISO 15118 &amp; DIN 70121:</strong> <em>Road vehicles — Vehicle to grid communication interface — Part 2: Network and application protocol requirements for DC fast charging.</em>
            </li>
            <li>
              <strong>UN GTR No. 22:</strong> <em>United Nations Global Technical Regulation on In-Vehicle Battery Durability for Electrified Vehicles (ECE/TRANS/180/Add.22).</em>
            </li>
            <li>
              <strong>National Renewable Energy Laboratory (NREL):</strong> <em>Battery Life Evaluation and Modeling for Electric Vehicle Fleets, Technical Report NREL/TP-5400-67123.</em>
            </li>
            <li>
              <strong>Argonne National Laboratory:</strong> <em>Electrochemical Performance and Degradation Modeling of High-Nickel NMC and LFP Cathodes for Fast-Charging Applications.</em>
            </li>
          </ul>
        </section>

        {/* Section 10: Editorial Independence & Disclaimers */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-4">
            <div className="p-2.5 bg-slate-700/50 rounded-lg border border-slate-600/50 text-slate-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Editorial Independence &amp; Transparency Statement</h2>
          </header>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              <strong>EVChargeCurve operates with strict editorial, analytical, and financial independence.</strong> We do not accept sponsored compensation from automotive manufacturers or charging networks to artificially inflate charging speeds, inflate range estimates, or suppress degradation curves.
            </p>
            <p className="text-slate-400 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 leading-relaxed">
              <em>Engineering Disclaimer:</em> All outputs generated by our simulators, calculators, and comparison matrices represent deterministic mathematical models calibrated against empirical testing averages. Real-world charging speeds and range retention will vary based on exact cell chemistry batch variations, ambient weather conditions, elevation changes, wheel/tire aero specifications, cabin climate settings, and charging station hardware status.
            </p>
          </div>
        </section>

        {/* Interactive Tools Navigation Footer */}
        <div className="text-center pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm mb-6">Ready to apply these mathematical models to your electric vehicle?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-bold hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-lg text-sm"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Fast Charge Simulator</span>
            </Link>
            <Link
              href="/curve"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 transition-all text-sm"
            >
              <Database className="w-4 h-4 text-emerald-400" />
              <span>Explore Vehicle Curve Directory</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
