import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import BatteryReplacementCalculator from './Calculator';
import FaqAccordion from './FaqAccordion';
import Breadcrumb from '@/components/Breadcrumb';
import {
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Wrench,
  DollarSign,
  Scale,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Info,
  Car,
  Calendar,
  Sliders,
  FileText,
  Lock,
  Flame,
  BatteryCharging
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Battery Replacement Cost Calculator & Warranty Tool',
  description: 'Calculate out-of-warranty EV battery replacement costs. Compare OEM full packs, refurbished modules, labor, and warranty expiration thresholds by model.',
  alternates: {
    canonical: 'https://evchargecurve.com/battery-replacement',
  },
  openGraph: {
    title: 'EV Battery Replacement Cost Calculator – Full Pack vs Module Repair',
    description: 'Estimate real out-of-warranty traction battery replacement and module repair costs across all major EV brands. Check warranty coverage limits instantly.',
    url: 'https://evchargecurve.com/battery-replacement',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Battery Replacement Cost Calculator – Full Pack vs Module Repair',
    description: 'Estimate real out-of-warranty traction battery replacement and module repair costs across all major EV brands. Check warranty coverage limits instantly.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "EV Battery Replacement Cost Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Out-of-warranty EV battery replacement and module repair cost calculator with warranty limit verification."
    },
    {
      "@type": "HowTo",
      "name": "How to Determine Out-of-Warranty EV Battery Replacement Cost",
      "description": "Step-by-step methodology to calculate high-voltage battery replacement expenses, module repair feasibility, and factory warranty status.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Verify Factory Warranty Eligibility",
          "text": "Check vehicle age against the 8-year/100,000-mile federal or 10-year/150,000-mile CARB standard. If battery capacity is below 70%, replacement is 100% free under automaker warranty.",
          "position": 1
        },
        {
          "@type": "HowToStep",
          "name": "Identify Traction Pack Capacity and Chemistry",
          "text": "Size battery pack kilowatt-hours (kWh) and chemistry. Modern LFP cells cost $105-$140/kWh retail replacement level, while high-density NMC/NCA cells range from $130-$175/kWh.",
          "position": 2
        },
        {
          "@type": "HowToStep",
          "name": "Select Service Pathway (OEM vs Refurbished vs Module)",
          "text": "Compare brand-new OEM dealer crates, certified remanufactured balanced packs, and isolated single module swapping (which resolves 80% of failures for 10% to 20% of full pack cost).",
          "position": 3
        },
        {
          "@type": "HowToStep",
          "name": "Deduct End-of-Life Core Scrap Credit",
          "text": "Offset the gross invoice with $1,200 to $2,500 in core scrap buyback value for decommissioned raw lithium and nickel materials.",
          "position": 4
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it really cost to replace an electric car battery out of warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Out-of-warranty EV battery replacement averages $10,000 to $18,500 for brand-new OEM packs, $4,800 to $8,500 for certified remanufactured packs, and $1,200 to $2,500 for single module-level repairs after deducting core scrap credits."
          }
        },
        {
          "@type": "Question",
          "name": "Do EV batteries really need to be replaced every 8 to 10 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Liquid-cooled EV batteries degrade at approximately 1.2% to 1.8% per year, typically retaining over 80% capacity past 150,000 miles (12 to 15+ years). Most vehicles reach mechanical end-of-life before the battery pack fails completely."
          }
        },
        {
          "@type": "Question",
          "name": "Can you replace just one bad cell or module instead of the whole battery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. In over 80% of premature pack failures, the issue is an isolated weak module with excessive cell voltage delta (>40mV). Certified high-voltage independent specialists can swap and balance that individual module for $1,200 to $2,500 instead of buying a $15,000 full pack."
          }
        },
        {
          "@type": "Question",
          "name": "Does auto insurance cover EV battery replacement if it gets damaged?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Auto insurance covers battery replacement under collision and comprehensive policies if caused by road debris punctures, underbody curb impacts, flood immersion, or accidents. Normal chemical degradation and wear are excluded."
          }
        },
        {
          "@type": "Question",
          "name": "Does an EV battery replacement come with a new warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Brand-new OEM packs typically include a 3-to-4-year or 50,000-mile warranty. Remanufactured packs provide a 1-to-2-year warranty, while module-level repairs warranty the swapped component for 6 to 12 months."
          }
        },
        {
          "@type": "Question",
          "name": "How do I check if my used EV battery is eligible for a free warranty replacement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Connect an OBD2 diagnostic scanner to read raw battery capacity and state of health. If your EV is under 8 years / 100,000 miles (or 10 years / 150,000 miles in CARB states) and capacity has dropped below 70%, the manufacturer must replace or restore the pack at zero cost."
          }
        }
      ]
    }
  ]
};

export default function BatteryReplacementPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Inject Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto mb-4">
        <Breadcrumb
          items={[
            { label: 'Tools', href: '/' },
            { label: 'EV Battery Replacement Cost Calculator' }
          ]}
        />
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto space-y-16">
        {/* Section A: Hero & Value Proposition */}
        <section className="text-center space-y-6 pt-4 pb-2">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131B2A] border border-slate-800 text-xs font-semibold text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>High-Voltage Traction Battery Sizing & Lifecycle Economics</span>
          </div>

          {/* Primary H1 */}
          <h1 id="battery-replacement-calculator-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              EV Battery Replacement Cost Calculator
            </span>{' '}
            <span className="text-white">&amp; Out-of-Warranty Lifespan Sizer</span>
          </h1>

          {/* Subtitle with High-Intent Natural Keywords */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Demystify high-voltage traction pack expenses. Our <strong className="font-semibold text-emerald-400">ev battery replacement cost calculator</strong> models real cell chemistry commodity rates, dealer labor book hours, end-of-life core recycling credits, and factory 8-year warranty limits to evaluate full pack replacements against modular repairs.
          </p>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#131B2A] border border-slate-800/80">
              <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">OEM vs Reman vs Module</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#131B2A] border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">8-Yr / 100k-Mi Verifier</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#131B2A] border border-slate-800/80">
              <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">Core Scrap Credit Derated</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#131B2A] border border-slate-800/80">
              <Lock className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-xs font-medium text-slate-300">100% Client-Side Math</span>
            </div>
          </div>
        </section>

        {/* Section B: Interactive Battery Replacement Calculator */}
        <section aria-label="Interactive EV Battery Replacement Calculator">
          <BatteryReplacementCalculator />
        </section>

        {/* Section C: Step-by-Step Workflow (3 Cards with Watermark Numbers) */}
        <section className="space-y-8 pt-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 id="how-calculator-works-heading" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How Our{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                EV Battery Replacement Cost Calculator
              </span>{' '}
              Works
            </h2>
            <p className="text-sm text-slate-400">
              A four-dimensional engineering model synthesizing vehicle telemetry, battery chemistry, warranty mandates, and modular repair options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="relative p-6 rounded-2xl bg-[#131B2A] border border-slate-800 overflow-hidden space-y-4">
              <div className="text-6xl font-black text-slate-800/40 absolute top-4 right-4 select-none pointer-events-none font-mono">
                01
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Warranty Threshold Verification
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Benchmarks vehicle in-service date and odometer against OEM federal (8-yr/100,000-mi) and CARB (10-yr/150,000-mi) standards to determine if replacement is legally covered for free under the 70% retention rule.
              </p>
            </div>

            {/* Card 2 */}
            <div className="relative p-6 rounded-2xl bg-[#131B2A] border border-slate-800 overflow-hidden space-y-4">
              <div className="text-6xl font-black text-slate-800/40 absolute top-4 right-4 select-none pointer-events-none font-mono">
                02
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Pack Chemistry & Capacity Sizing
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Applies retail replacement multipliers ($105–$140/kWh for thermal-resistant LFP blade cells vs. $130–$175/kWh for high-density NMC/NCA chemistry) to compute true cell module replacement costs.
              </p>
            </div>

            {/* Card 3 */}
            <div className="relative p-6 rounded-2xl bg-[#131B2A] border border-slate-800 overflow-hidden space-y-4">
              <div className="text-6xl font-black text-slate-800/40 absolute top-4 right-4 select-none pointer-events-none font-mono">
                03
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                Service Pathway Divergence
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Computes quotes across brand-new OEM dealer crates, third-party remanufactured packs with balanced cells, and isolated module-level repairs—offset by up to $2,500 in core scrap credits.
              </p>
            </div>
          </div>
        </section>

        {/* Section D: High-Voltage Engineering & Financial Formulas */}
        <section className="space-y-6 p-8 rounded-2xl bg-[#131B2A] border border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Scale className="w-4 h-4" />
              <span>Automotive Actuarial Science</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Cost to Replace Electric Car Battery: The Engineering Formulas
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              When calculating <strong>how much to replace ev battery out of warranty</strong>, automotive engineers do not rely on crude flat estimations. The total financial invoice breaks down into raw cell mass valuation, service pathway multipliers, book labor hours, and recycling offsets:
            </p>
          </div>

          {/* Formula 1 */}
          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3 font-mono">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Formula 1: Total Out-of-Warranty Replacement Cost</div>
            <div className="text-sm sm:text-base text-emerald-400 font-bold overflow-x-auto py-2">
              Cost_replacement = (C_battery_kWh × P_chemistry_kWh × F_service_tier) + (t_labor_hours × R_labor_rate) + C_coolant_firmware - B_core_credit
            </div>
            <div className="text-xs text-slate-400 font-sans grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
              <div>
                <strong className="text-slate-200">C_battery_kWh:</strong> Total nameplate pack capacity in kWh.
              </div>
              <div>
                <strong className="text-slate-200">P_chemistry_kWh:</strong> Raw replacement rate ($125/kWh LFP, $160/kWh NMC).
              </div>
              <div>
                <strong className="text-slate-200">F_service_tier:</strong> Tier multiplier (1.0 for OEM crate, 0.55 for Remanufactured).
              </div>
              <div>
                <strong className="text-slate-200">B_core_credit:</strong> Scrap credit buyback for raw lithium & nickel recovery ($1,200–$2,500).
              </div>
            </div>
          </div>

          {/* Formula 2 */}
          <div className="p-5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-3 font-mono">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Formula 2: Module-Level Repair Cost</div>
            <div className="text-sm sm:text-base text-cyan-400 font-bold overflow-x-auto py-2">
              Cost_module = ((C_battery_kWh / N_modules) × P_module_retail) + (t_bench_diagnostics × R_labor) + C_seals
            </div>
            <div className="text-xs text-slate-400 font-sans grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
              <div>
                <strong className="text-slate-200">N_modules:</strong> Total serviceable sub-modules inside the enclosure.
              </div>
              <div>
                <strong className="text-slate-200">P_module_retail:</strong> Unit cost multiplier for an isolated tested module (1.65× raw rate).
              </div>
              <div>
                <strong className="text-slate-200">t_bench_diagnostics:</strong> Labor for drop, cell balancing, and busbar re-torquing (7.5 hrs).
              </div>
              <div>
                <strong className="text-slate-200">Cell Delta Trigger:</strong> Swapping occurs when a single block exhibits ΔV &gt; 40 mV divergence.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            In our <strong>tesla battery replacement cost calculator</strong> module, Tesla Model Y Long Range packs utilize 4 large cylindrical modules, whereas Hyundai E-GMP vehicles contain 32 independent modules. Swapping 1 of 32 modules represents a fraction of the cost required to swap an entire 77.4 kWh assembly.
          </p>
        </section>

        {/* Section E: Production EV Battery Replacement Cost Benchmark Matrix */}
        <section className="space-y-6">
          <div className="space-y-2 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <Car className="w-3.5 h-3.5" />
              <span>Real Market Quotes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Electric Car Battery Replacement Cost by Model: OEM vs Refurbished
            </h2>
            <p className="text-sm text-slate-300">
              Comprehensive industry benchmark matrix evaluating out-of-warranty replacement pricing, module serviceability, and core scrap values across leading production EVs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#131B2A]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0B0F17]/70 text-slate-300">
                  <th scope="col" className="p-4 font-semibold">Vehicle & Pack Size</th>
                  <th scope="col" className="p-4 font-semibold">Chemistry</th>
                  <th scope="col" className="p-4 font-semibold">Factory Warranty</th>
                  <th scope="col" className="p-4 font-semibold">OEM Full Pack</th>
                  <th scope="col" className="p-4 font-semibold">Refurbished Pack</th>
                  <th scope="col" className="p-4 font-semibold">Module Swap</th>
                  <th scope="col" className="p-4 font-semibold">Scrap Core Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Tesla Model 3 RWD (60 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs">LFP</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$10,400</td>
                  <td className="p-4 text-cyan-400">$5,800</td>
                  <td className="p-4 text-amber-400">$1,650</td>
                  <td className="p-4 text-slate-400">-$1,200</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Tesla Model Y LR (75 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">NMC 2170</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 120k Mi</td>
                  <td className="p-4 font-semibold text-white">$13,800</td>
                  <td className="p-4 text-cyan-400">$7,400</td>
                  <td className="p-4 text-amber-400">$2,400</td>
                  <td className="p-4 text-slate-400">-$1,600</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Hyundai Ioniq 5 / EV6 (77.4 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">NMC Pouch</span></td>
                  <td className="p-4 text-slate-400">10 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$14,500</td>
                  <td className="p-4 text-cyan-400">$7,600</td>
                  <td className="p-4 text-amber-400">$1,350</td>
                  <td className="p-4 text-slate-400">-$1,500</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Ford Mustang Mach-E ER (91 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">NMC Pouch</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$16,800</td>
                  <td className="p-4 text-cyan-400">$8,900</td>
                  <td className="p-4 text-amber-400">$1,850</td>
                  <td className="p-4 text-slate-400">-$1,800</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Ford F-150 Lightning ER (131 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">NMC Large</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$22,400</td>
                  <td className="p-4 text-cyan-400">$11,800</td>
                  <td className="p-4 text-amber-400">$1,950</td>
                  <td className="p-4 text-slate-400">-$2,500</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Chevrolet Bolt EV (65 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">NMC Pouch</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$11,200</td>
                  <td className="p-4 text-cyan-400">$5,900</td>
                  <td className="p-4 text-amber-400">$1,450</td>
                  <td className="p-4 text-slate-400">-$1,300</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Nissan Leaf (40 kWh Passive)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-xs">LMO/NMC</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$8,500</td>
                  <td className="p-4 text-cyan-400">$4,200</td>
                  <td className="p-4 text-amber-400">$1,150</td>
                  <td className="p-4 text-slate-400">-$900</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <th scope="row" className="p-4 font-medium text-white">Porsche Taycan / e-tron GT (93.4 kWh)</th>
                  <td className="p-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-xs">800V NMC</span></td>
                  <td className="p-4 text-slate-400">8 Yr / 100k Mi</td>
                  <td className="p-4 font-semibold text-white">$24,500</td>
                  <td className="p-4 text-cyan-400">$13,200</td>
                  <td className="p-4 text-amber-400">$2,100</td>
                  <td className="p-4 text-slate-400">-$2,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section F: Owner's Mitigation Playbook (4 Strategies) */}
        <section className="space-y-6">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Financial Defense</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Owner&apos;s Mitigation Playbook: 4 Alternatives to a $15,000 Battery Bill
            </h2>
            <p className="text-sm text-slate-300">
              Actionable engineering workarounds to avoid paying full retail dealer quotes for out-of-warranty traction packs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strategy 1 */}
            <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400">
                <Layers className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Strategy 1: Module-Level Cell Balancing
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Over 75% of &quot;bricked&quot; packs suffer from a single defective module while remaining modules retain 90%+ State of Health. Independent EV specialists can swap just that module, match internal resistance, and balance cell delta voltages for <strong>10%–20% of full pack replacement cost</strong>.
              </p>
              <div className="pt-2 text-xs text-slate-400">
                Explore our <Link href="/battery-health" className="text-emerald-400 underline font-medium">EV battery degradation calculator & State of Health estimator</Link> to measure your pack&apos;s exact cell imbalance.
              </div>
            </div>

            {/* Strategy 2 */}
            <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Strategy 2: Asserting the 70% Factory Capacity Warranty
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                If your pack degrades below 70% capacity within 8 years or 100,000 miles (10 years / 150,000 miles in CARB states), automakers are federally mandated to replace or restore it to specification completely free of charge. Never pay dealer diagnostics until you confirm your in-service delivery date.
              </p>
              <div className="pt-2 text-xs text-slate-400">
                Check our <Link href="/tco-calculator" className="text-cyan-400 underline font-medium">5-year EV vs gas TCO & break-even calculator</Link> to factor warranty coverage into residual vehicle equity.
              </div>
            </div>

            {/* Strategy 3 */}
            <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-amber-400">
                <RefreshCw className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Strategy 3: High-Voltage Scrap Core Buybacks
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Decommissioned lithium battery packs have exceptionally high residual market value ($1,000–$2,500) for stationary solar grid storage systems and industrial hydrometallurgical recyclers (like Redwood Materials). Never forfeit your old core to a dealership without demanding a written scrap credit on your invoice.
              </p>
              <div className="pt-2 text-xs text-slate-400">
                Charging efficiency also impacts cell health; review the <Link href="/home-charging" className="text-amber-400 underline font-medium">EV home charging time calculator 240V</Link> to optimize residential battery conditioning.
              </div>
            </div>

            {/* Strategy 4 */}
            <div className="p-6 rounded-2xl bg-[#131B2A] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">
                  Strategy 4: Specialized EV Battery Insurance Endorsements
                </h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Does insurance cover EV battery replacement? Yes, for external physical damage. Confirm your insurance policy includes comprehensive battery coverage for road debris punctures and flood immersion without excessive depreciation clawbacks, shielding you from sudden five-figure invoices.
              </p>
              <div className="pt-2 text-xs text-slate-400">
                Prevent thermal strain using our <Link href="/preconditioning" className="text-purple-400 underline font-medium">battery preconditioning calculator</Link> and calculate range replenishment with our <Link href="/kw-to-miles" className="text-purple-400 underline font-medium">EV charging speed calculator kW to miles</Link>.
              </div>
            </div>
          </div>
        </section>

        {/* Section G: Authoritative FAQ Accordion */}
        <section className="space-y-6 pt-4">
          <div className="space-y-2 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Frequently Asked Questions About EV Battery Replacement
            </h2>
            <p className="text-sm text-slate-300">
              Clear, engineer-verified answers to high-intent questions on replacement costs, modular cell repairs, insurance claims, and warranty eligibility.
            </p>
          </div>

          <FaqAccordion />
        </section>
      </main>
    </div>
  );
}
