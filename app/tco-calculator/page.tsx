import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorComponent from './Calculator';
import {
  ShieldCheck,
  TrendingDown,
  Zap,
  Wrench,
  Fuel,
  ArrowRight,
  Calculator,
  ChevronRight,
  CheckCircle2,
  DollarSign,
  Layers,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV vs Gas TCO Calculator & 5-Year Break-Even Tool',
  description:
    'Calculate the 5-year Total Cost of Ownership (TCO) of an EV vs gas vehicle. Factors purchase price, tax credits, fuel savings, tire wear, and depreciation.',
  alternates: {
    canonical: 'https://evchargecurve.com/tco-calculator',
  },
  openGraph: {
    title: 'EV vs Gas 5-Year TCO Calculator & Financial Break-Even Sizer',
    description:
      'Compare true 5-year ownership costs: financing, fuel vs electric rates, regenerative braking savings, tire replacement, and resale depreciation.',
    url: 'https://evchargecurve.com/tco-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV vs Gas 5-Year TCO Calculator & Financial Break-Even Sizer',
    description:
      'Compare true 5-year ownership costs: financing, fuel vs electric rates, regenerative braking savings, tire replacement, and resale depreciation.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "EV vs Gas Total Cost of Ownership (TCO) Calculator",
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Comprehensive 5-year EV vs gas vehicle total cost of ownership, break-even mileage, and financial lifecycle modeling tool."
    },
    {
      "@type": "HowTo",
      "name": "How to Calculate EV vs Gas 5-Year Total Cost of Ownership & Break-Even Point",
      "description": "Step-by-step methodology for calculating 5-year vehicle TCO factoring financing, electricity vs gas fuel economics, maintenance differentials, and vehicle resale depreciation.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Define Capital Outlay & Tax Incentives",
          "text": "Input the EV and ICE vehicle MSRPs, down payments, loan terms, interest APR, and eligible federal or regional clean-vehicle tax credits."
        },
        {
          "@type": "HowToStep",
          "name": "Configure Energy, Fuel & Mileage Parameters",
          "text": "Set your expected annual mileage, home Time-of-Use electricity rates, public DC fast charging ratio, and local pump gas prices."
        },
        {
          "@type": "HowToStep",
          "name": "Model Consumables & Maintenance Divergence",
          "text": "Factor in the elimination of oil changes and regenerative brake pad longevity against accelerated EV tire tread wear."
        },
        {
          "@type": "HowToStep",
          "name": "Evaluate 5-Year Resale Equity & Break-Even Month",
          "text": "Review the cumulative monthly cost curve to determine the exact month and mileage where total operational savings surpass initial capital expense."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many years or miles does it take for an electric car to break even with a gas car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "On average, an electric vehicle reaches financial break-even with an equivalent gas vehicle between 2 and 3.5 years, or approximately 30,000 to 45,000 miles. If the EV qualifies for a point-of-sale federal or regional tax credit (such as the $7,500 IRC 30D rebate), the break-even milestone is often achieved immediately on Day 1 or within the first 12 to 18 months of driving."
          }
        },
        {
          "@type": "Question",
          "name": "Are maintenance costs really lower for an EV than a traditional gas vehicle?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, scheduled maintenance for an electric vehicle is 40% to 60% lower than a combustion engine vehicle. EVs completely eliminate engine oil and filter changes, spark plugs, timing belts, transmission fluid flushes, catalytic converters, and oxygen sensors. Furthermore, regenerative braking handles up to 90% of deceleration forces, extending physical brake rotor and pad life past 100,000 miles."
          }
        },
        {
          "@type": "Question",
          "name": "Do electric cars go through tires faster than gas cars?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Due to the substantial mass of high-density battery packs (increasing overall vehicle curb weight by 15% to 25%) combined with immediate 100% motor torque delivery from zero RPM, electric vehicles typically consume tire tread 20% faster than internal combustion cars. Our TCO calculator specifically accounts for this by integrating an EV tire replacement surcharge of approximately $250 every 35,000 miles."
          }
        },
        {
          "@type": "Question",
          "name": "How does EV depreciation compare to gasoline vehicles over 5 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Empirical automotive retention studies show modern mainstream EVs retain approximately 45% to 50% of their original MSRP over 5 years, compared to 48% to 53% for mainstream gasoline crossovers. Battery warranty coverage (typically 8 years / 100,000 miles minimum) and over-the-air software enhancements have stabilized long-term EV residual values across premium and mass-market segments."
          }
        },
        {
          "@type": "Question",
          "name": "What happens to the 5-year TCO if I only use public DC fast chargers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Relying exclusively on commercial DC fast charging networks (which charge $0.35 to $0.55 per kWh) significantly reduces the operational fuel cost advantage over gasoline. While home charging costs roughly 3.5 to 4.5 cents per mile, public DC fast charging costs 11 to 14 cents per mile—comparable to a 32 MPG gasoline vehicle. Drivers without home or workplace Level 2 charging access will see their break-even horizon extend to 4 to 5+ years."
          }
        },
        {
          "@type": "Question",
          "name": "Is insurance more expensive for an electric vehicle than a gas car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EV insurance premiums are typically 10% to 15% higher than comparable gas cars. This disparity stems from specialized technician labor rates, proprietary structural aluminum castings, and replacement costs for high-voltage battery enclosures in post-collision repairs. However, annual fuel savings ($1,000 to $1,800/yr) consistently exceed the $150 to $250 annual insurance variance."
          }
        }
      ]
    }
  ]
};

export default function TcoCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#0B0F17] pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-300 font-semibold">TCO Calculator</span>
            </nav>

            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                EV vs Gas Total Cost of Ownership (TCO) Calculator
              </span>{' '}
              <span className="text-white">&amp; 5-Year Break-Even Sizer</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Evaluate true 5-year electric car economics beyond the dealership window sticker. Our <strong>ev vs gas cost calculator 5 years</strong> models real-world fuel cost deltas, federal tax credits, scheduled maintenance savings, tire replacement intervals, and residual depreciation curves to reveal the exact month and mileage where an electric vehicle becomes cheaper than gasoline.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Empirical 5-Year Depreciation Modeling
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Regenerative Braking vs Tire Wear Accounting
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Home TOU vs Public DCFC Ratio Factored
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side Financial Simulation
              </span>
            </div>
          </div>

          {/* Interactive Calculator Engine Component */}
          <div className="mt-10">
            <CalculatorComponent />
          </div>
        </section>

        {/* Detailed Content Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content Area (2 cols) */}
            <div className="lg:col-span-2 space-y-14">
              {/* Step-by-Step Methodology Workflow */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  How Our Electric Car Break Even Calculator Computes 5-Year TCO
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Most consumers look solely at vehicle purchase sticker prices when debating <em>is an ev cheaper than gas over 5 years</em>. In reality, automotive cost of ownership is an ongoing dynamic system governed by upfront financing, thermodynamic energy conversion efficiency, consumables wear divergence, and 60-month resale equity. Our <strong>electric car break even calculator</strong> isolates each vector:
                </p>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/20 select-none">1</span>
                    <h3 className="text-base font-bold text-white mb-2 relative z-10">
                      Capital Outlay &amp; Tax Incentives
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10">
                      Deducts point-of-sale federal clean-vehicle tax credits and regional rebates directly from the EV purchase price, calculating exact amortized monthly payments and loan APR interest over a 60-month horizon.
                    </p>
                  </div>

                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/20 select-none">2</span>
                    <h3 className="text-base font-bold text-white mb-2 relative z-10">
                      Operational Energy Disparity
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10">
                      Models home AC Level 2 overnight Time-of-Use tariffs ($0.08–$0.15/kWh) balanced against highway DC fast charging versus real pump gas prices across 60,000 to 100,000 driving miles.
                    </p>
                  </div>

                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/20 select-none">3</span>
                    <h3 className="text-base font-bold text-white mb-2 relative z-10">
                      Maintenance &amp; Residual Equity
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed relative z-10">
                      Quantifies the total elimination of oil changes, transmission services, and brake pad wear from regenerative deceleration, balanced against accelerated EV tire wear and 5-year trade-in equity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rigorous Mathematical Engineering Derivation */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  EV Total Cost of Ownership Calculator: The Complete Lifecycle Equation
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Financial analysts evaluate vehicle lifecycle economics through a standardized 5-year discounted cash flow framework. In our <strong>ev total cost of ownership calculator</strong>, the cumulative 5-year expenditure is expressed as:
                </p>

                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 md:p-8 font-mono text-xs sm:text-sm text-slate-300 space-y-5">
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">1. The Master 5-Year TCO Accounting Equation:</p>
                    <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 overflow-x-auto text-emerald-300">
                      TCO_5yr = (C_purchase - I_tax_credits + C_interest) + Sum(y=1 to 5) [ E_fuel(y) + M_service(y) + C_insurance(y) ] - V_resale_5yr
                    </div>
                  </div>

                  <div>
                    <p className="text-emerald-400 font-bold mb-2">2. Electric Fuel Cost Function (with Grid Inverter Losses):</p>
                    <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 overflow-x-auto text-cyan-300">
                      E_fuel_EV = [ (Miles_annual x Wh_mi) / (1,000 x eta_charging) ] x [ (f_home x R_home) + (f_public x R_public) ]
                    </div>
                    <p className="text-slate-400 text-xs mt-2">
                      Where <code className="text-cyan-400">eta_charging = 0.90</code> accounts for AC-to-DC rectification and battery cooling parasitics. For detailed per-mile energy rates, visit our <Link href="/ev-charging-cost" className="text-emerald-400 underline hover:text-emerald-300">EV charging cost calculator &amp; cost per mile estimator</Link>.
                    </p>
                  </div>

                  <div>
                    <p className="text-emerald-400 font-bold mb-2">3. Maintenance Consumables Divergence &amp; Tire Weight Penalties:</p>
                    <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 overflow-x-auto text-amber-300">
                      M_service_EV = (5 x C_routine_EV) + [ (Miles_5yr / 35,000) x Premium_tire_EV ]
                    </div>
                    <p className="text-slate-400 text-xs mt-2">
                      Our <strong>ev vs gas maintenance cost calculator</strong> strips away combustion lubricants, mufflers, and friction brakes, but incorporates a 20% faster tread wear coefficient due to the vehicle&apos;s instant torque and high mass.
                    </p>
                  </div>

                  <div>
                    <p className="text-emerald-400 font-bold mb-2">4. Empirical 5-Year Residual Equity:</p>
                    <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 overflow-x-auto text-slate-300">
                      V_resale_5yr = MSRP x Retained_value_pct (Typically 48% EV vs 50% ICE)
                    </div>
                    <p className="text-slate-400 text-xs mt-2">
                      Net vehicle depreciation represents <code className="text-slate-200">MSRP - V_resale_5yr</code>. Learn how battery degradation affects resale values with our <Link href="/battery-health" className="text-emerald-400 underline hover:text-emerald-300">EV battery degradation calculator &amp; State of Health estimator</Link>.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Year TCO Benchmark Matrix Table */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  EV vs Gas Cost Calculator 5 Years: Real-World Vehicle Matchups Compared
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Based on standard national driving averages of <strong>13,500 miles per year</strong> (67,500 miles over 5 years), home charging at $0.13/kWh (85% share), public fast charging at $0.42/kWh (15% share), and gasoline at $3.60/gallon. Includes federal incentives ($7,500), scheduled servicing, and empirical 5-year depreciation:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead>
                      <tr className="bg-slate-800/60">
                        <th scope="col" className="p-3.5 text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700 rounded-tl-xl">
                          Vehicle Matchup
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-slate-200 uppercase tracking-wider border-b border-slate-700">
                          MSRP Delta
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-700">
                          5-Yr Fuel Saved
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-700">
                          Maint. Saved
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-rose-300 uppercase tracking-wider border-b border-slate-700">
                          Deprec. Loss Delta
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-slate-700">
                          Net 5-Yr Savings
                        </th>
                        <th scope="col" className="p-3.5 text-xs font-bold text-cyan-400 uppercase tracking-wider border-b border-slate-700 rounded-tr-xl">
                          Break-Even
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-[#131B2A] text-xs sm:text-sm">
                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Tesla Model Y LR vs. Toyota RAV4 AWD
                        </td>
                        <td className="p-3.5 text-slate-300">+$12,000</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$5,140</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,760</td>
                        <td className="p-3.5 text-rose-400">-$6,960</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$7,440</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Month 18</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Tesla Model 3 RWD vs. Honda Accord EX-L
                        </td>
                        <td className="p-3.5 text-slate-300">+$5,000</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$4,220</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,820</td>
                        <td className="p-3.5 text-rose-400">-$3,280</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$10,260</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Day 1 (Tax Credit)</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Hyundai Ioniq 5 AWD vs. Tucson Ultimate
                        </td>
                        <td className="p-3.5 text-slate-300">+$11,500</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$4,920</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,710</td>
                        <td className="p-3.5 text-rose-400">-$6,600</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$7,530</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Month 24</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Ford F-150 Lightning vs. F-150 EcoBoost
                        </td>
                        <td className="p-3.5 text-slate-300">+$7,000</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$6,480</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,650</td>
                        <td className="p-3.5 text-rose-400">-$4,600</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$11,030</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Month 11</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          BMW i4 eDrive40 vs. BMW 430i Gran Coupe
                        </td>
                        <td className="p-3.5 text-slate-300">+$7,500</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$5,390</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$2,250</td>
                        <td className="p-3.5 text-rose-400">-$5,100</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$9,940</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Month 16</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Chevrolet Equinox EV vs. Equinox LT Gas
                        </td>
                        <td className="p-3.5 text-slate-300">+$4,500</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$4,650</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,780</td>
                        <td className="p-3.5 text-rose-400">-$2,900</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$11,030</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Day 1 (Tax Credit)</td>
                      </tr>

                      <tr className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          Rivian R1S Dual Max vs. Grand Cherokee Summit
                        </td>
                        <td className="p-3.5 text-slate-300">+$14,000</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$5,820</td>
                        <td className="p-3.5 text-emerald-400 font-bold">+$1,840</td>
                        <td className="p-3.5 text-rose-400">-$8,200</td>
                        <td className="p-3.5 text-emerald-400 font-extrabold">+$6,960</td>
                        <td className="p-3.5 text-cyan-400 font-semibold">Month 29</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500 italic">
                  Note: EV incentives and local electricity prices vary. When evaluating the <em>cost to own an ev vs hybrid calculator</em>, hybrid fuel expenditures sit intermediate between pure ICE and full BEV models.
                </p>
              </div>

              {/* Comprehensive Buyer's Financial Playbook */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  The Buyer&apos;s Financial Playbook: 4 Levers to Accelerate Your Break-Even Date
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Drivers wondering <em>is an ev cheaper than gas over 5 years</em> hold significant tactical control over their payback velocity. Implementing these four strategies compresses the electric vehicle amortization curve:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                        1
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Maximize Home Level 2 TOU Charging
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Charging at home during super off-peak hours ($0.08–$0.12/kWh) rather than highway fast chargers cuts annual fueling costs by 70%, shortening your break-even horizon by up to 14 months. Check charge speeds with our <Link href="/home-charging" className="text-emerald-400 hover:underline">EV home charging time calculator 240V</Link>.
                    </p>
                  </div>

                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                        2
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Target Vehicles with Transferable Tax Credits
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Taking advantage of point-of-sale federal or regional clean-vehicle credits ($7,500+) instantly closes the MSRP gap on day one, dramatically shifting the <em>electric car depreciation vs gas calculator</em> calculation in your favor.
                    </p>
                  </div>

                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                        3
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Optimize Regenerative Braking Settings
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Utilizing single-pedal drive reclaims up to 90% of kinetic deceleration energy while extending physical brake rotor and pad life past 100,000 miles, widening the delta in any <em>ev vs gas maintenance cost calculator</em>.
                    </p>
                  </div>

                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-5 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/20">
                        4
                      </span>
                      <h3 className="text-sm font-bold text-white">
                        Select EV-Specific Low-Rolling-Resistance Tires
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Choosing OEM-spec EV tires engineered with reinforced center ribs, acoustic foam liners, and specialized tread compounds prevents premature tread scrub from high motor torque while preserving wh/mi range.
                    </p>
                  </div>
                </div>
              </div>

              {/* Authoritative FAQ Accordion */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Frequently Asked Questions About EV vs Gas 5-Year Ownership
                </h2>
                <div className="space-y-3">
                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>How many years or miles does it take for an electric car to break even with a gas car?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      On average, an electric vehicle reaches financial break-even with an equivalent gas vehicle between <strong>2 and 3.5 years</strong>, or approximately <strong>30,000 to 45,000 miles</strong>. If the EV qualifies for a point-of-sale federal or regional tax credit (such as the $7,500 IRC 30D rebate), the break-even milestone is often achieved immediately on Day 1 or within the first 12 to 18 months of ownership.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>Are maintenance costs really lower for an EV than a traditional gas vehicle?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      Yes. Independent tests and our <em>ev vs gas maintenance cost calculator</em> show EV scheduled servicing is 40% to 60% cheaper over 5 years. EVs have no internal combustion engine, meaning zero motor oil, oil filters, spark plugs, timing belts, alternators, catalytic converters, or transmission fluid changes. Furthermore, regenerative braking handles the vast majority of stops, preserving physical brake pads well past 100,000 miles.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>Do electric cars go through tires faster than gas cars?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      Yes. Heavy high-voltage battery packs increase vehicle curb weight by 15% to 25%, while electric motors deliver maximum torque instantly at 0 RPM. As a result, tires on electric cars wear approximately 20% faster than those on internal combustion vehicles. Our model addresses this directly by factoring in an extra tire surcharge of ~$250 every 35,000 miles.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>How does EV depreciation compare to gasoline vehicles over 5 years?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      Across mainstream models, 5-year EV depreciation closely mirrors gasoline crossovers, with electric vehicles retaining approximately 45% to 50% of original MSRP versus 48% to 52% for internal combustion vehicles. To protect residual value, monitor cell health using our <Link href="/battery-health" className="text-emerald-400 underline hover:text-emerald-300">EV battery degradation calculator &amp; State of Health estimator</Link>.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>What happens to the 5-year TCO if I only use public DC fast chargers?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      Public DC fast chargers (charging $0.35 to $0.55/kWh) cost significantly more than residential Level 2 rates ($0.10 to $0.16/kWh). Drivers who rely 100% on commercial DC fast chargers pay roughly 12 to 15 cents per mile—near parity with a 30+ MPG gasoline car. If you rely exclusively on public charging, your financial break-even will be delayed to 4 to 5+ years.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm sm:text-base text-white hover:text-emerald-400 transition-colors">
                      <span>Is insurance more expensive for an electric vehicle than a gas car?</span>
                      <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-emerald-400">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                      Yes, EV auto insurance is usually 10% to 15% higher due to expensive battery packs and certified high-voltage collision repair requirements. However, annual fuel savings of $1,000 to $1,800 easily outweigh the modest $150 to $250 annual insurance difference.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* Sidebar Tools & Cross-Navigation (1 col) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Strategic Ecosystem Link Card */}
              <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 sticky top-6 space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Scale className="w-4 h-4" /> Comprehensive Tool Suite
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  Optimize Every Factor of Your EV Ownership
                </h3>

                <p className="text-slate-400 text-xs leading-relaxed">
                  Fuel savings and vehicle TCO are directly tied to charging speeds, home electrical capacity, and battery degradation curves. Explore our companion calculators:
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <Link href="/ev-charging-cost" className="text-sm font-bold text-white hover:text-emerald-400 flex items-center justify-between">
                      <span>Charging Cost &amp; Per Mile</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Our <Link href="/ev-charging-cost" className="text-emerald-400 hover:underline">EV charging cost calculator &amp; cost per mile estimator</Link> computes session expenses.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <Link href="/home-charging" className="text-sm font-bold text-white hover:text-emerald-400 flex items-center justify-between">
                      <span>Home Charging Times</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Utilize our <Link href="/home-charging" className="text-emerald-400 hover:underline">EV home charging time calculator 240V</Link> to size overnight replenishment.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <Link href="/panel-capacity" className="text-sm font-bold text-white hover:text-emerald-400 flex items-center justify-between">
                      <span>Panel Capacity Sizer</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Verify service with our <Link href="/panel-capacity" className="text-emerald-400 hover:underline">EV charger breaker size calculator &amp; 100A panel capacity tool</Link>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <Link href="/battery-health" className="text-sm font-bold text-white hover:text-emerald-400 flex items-center justify-between">
                      <span>Battery Health SOH</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Assess cycle life with our <Link href="/battery-health" className="text-emerald-400 hover:underline">EV battery degradation calculator &amp; State of Health estimator</Link>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 hover:border-emerald-500/40 transition-colors">
                    <Link href="/solar-to-ev" className="text-sm font-bold text-white hover:text-emerald-400 flex items-center justify-between">
                      <span>Solar Array Sizer</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Charge at $0.00/kWh with our <Link href="/solar-to-ev" className="text-emerald-400 hover:underline">solar panels to charge an EV calculator</Link>.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs text-slate-400">
                    Need fast charging curve simulations? Visit our <Link href="/" className="text-emerald-400 font-semibold hover:underline">DC Fast Charge Simulator</Link> to inspect piecewise taper drop-offs.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
