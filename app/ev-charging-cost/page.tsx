import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import CalculatorComponent from './Calculator';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charging Cost Calculator & Cost Per Mile Estimator',
  description: 'Calculate the exact cost to charge any EV at home or public DC fast chargers. Compare cost per mile, 100 km, and total savings over gas in real time.',
  alternates: {
    canonical: 'https://evchargecurve.com/ev-charging-cost',
  },
  openGraph: {
    title: 'EV Charging Cost Calculator - Cost Per Mile & 100km Estimator',
    description: 'Accurately compute home off-peak vs public DC fast charging session costs, AC-to-DC rectification losses, and annual fuel savings across all currencies.',
    url: 'https://evchargecurve.com/ev-charging-cost',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Cost Calculator - Cost Per Mile & 100km Estimator',
    description: 'Accurately compute home off-peak vs public DC fast charging session costs, AC-to-DC rectification losses, and annual fuel savings across all currencies.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "EV Charging Cost Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Universal electric vehicle charging cost and cost per mile calculator with global currencies and public vs home charging analysis."
    },
    {
      "@type": "HowTo",
      "name": "How to calculate EV charging cost per mile",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Vehicle and Battery Details",
          "text": "Select your EV model or input usable battery size and efficiency."
        },
        {
          "@type": "HowToStep",
          "name": "Input Electricity Rates",
          "text": "Provide your local home off-peak rate or public DCFC network fee."
        },
        {
          "@type": "HowToStep",
          "name": "Review Cost per Mile",
          "text": "Observe your session cost, cost per mile, and gasoline savings equivalent."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does it cost to fully charge an electric car at home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It typically costs $6 to $11 to fully charge a 60-80 kWh electric car battery at home using standard off-peak residential electricity rates."
          }
        },
        {
          "@type": "Question",
          "name": "Is charging an electric car cheaper than buying gasoline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, charging an EV at home typically results in a 60%-75% operational cost reduction compared to fueling an equivalent gasoline internal combustion engine (ICE) vehicle."
          }
        },
        {
          "@type": "Question",
          "name": "Why does public DC fast charging cost so much more than home charging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Public DC fast charging involves high-voltage infrastructure capital costs, commercial demand charges from utilities to support extreme power spikes, and network margin markups."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to charge a Tesla per mile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Charging a Tesla at home typically costs 3.5 to 4.5 cents per mile, whereas equivalent gasoline cars usually cost 12 to 15 cents per mile."
          }
        },
        {
          "@type": "Question",
          "name": "Does cold winter weather increase the cost of charging an EV?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, cold winter weather increases the cost of charging an EV by lowering battery efficiency and requiring cabin HVAC draw, leading to higher Wh/mi consumption."
          }
        },
        {
          "@type": "Question",
          "name": "How much does it cost to charge an EV at a hotel or destination charger?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Destination chargers at hotels can range from complimentary (free for guests) to flat daily fees or standard Level 2 per-kWh rates depending on the property."
          }
        }
      ]
    }
  ]
};

export default function EVChargingCostPage() {
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
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                EV Charging Cost Calculator
              </span>{' '}
              <span className="text-white">&amp; Cost Per Mile / 100 km Estimator</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Calculate the exact cost to charge any electric vehicle at home or public DC fast chargers. Our <strong>ev charging cost calculator</strong> models AC-to-DC rectification losses, Time-of-Use off-peak tariffs, and public network pricing to reveal your true cost per mile and net savings over gas.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Level 1/2 Inverter Loss Derated (88%-92%)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Global Multi-Currency & Metric Support
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Public DCFC Session & Idle Fee Profiling
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side Real-Time Math
              </span>
            </div>
          </div>
          
          <CalculatorComponent />
        </section>

        {/* Content Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Article Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Step by step */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  How Our Cost to Charge an EV Calculator Computes True Fuel Expenses
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">1</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Gross Energy Draw at the Meter</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Factors vehicle battery capacity and onboard inverter thermal conversion losses (~10% for L2, ~20% for L1) to calculate billable kWh.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">2</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Time-of-Use & Network Rate Simulation</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Evaluates residential off-peak tariffs ($0.08-$0.15/kWh) against high-speed highway DC charging ($0.35-$0.55/kWh).
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-8xl font-black text-slate-800/30 select-none">3</span>
                    <h3 className="text-lg font-bold text-white mb-3 relative z-10">Cost Per Mile & ICE Disruption Delta</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                      Computes metrics for our <Link href="/home-charging" className="text-emerald-400 hover:text-emerald-300">EV home charging time calculator 240V</Link>, cost per mile / 100 km, and benchmarks total annual expenditure against equivalent internal combustion vehicles.
                    </p>
                  </div>
                </div>
              </div>

              {/* Regional Cost Variations */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Global EV Charging Costs: Region by Region Guide
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Whether you are looking for a <strong>cost to charge an ev calculator</strong> in the US, UK, Europe, or Australia, regional electricity markets dramatically impact your cost per mile. Here is a brief snapshot of average residential off-peak rates globally:
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">🇺🇸 United States</p>
                    <p className="text-lg text-emerald-400 font-bold">$0.16 / kWh</p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">🇬🇧 United Kingdom</p>
                    <p className="text-lg text-emerald-400 font-bold">£0.24 / kWh</p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">🇪🇺 Europe (Avg)</p>
                    <p className="text-lg text-emerald-400 font-bold">€0.28 / kWh</p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">🇦🇺 Australia</p>
                    <p className="text-lg text-emerald-400 font-bold">$0.30 / kWh</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mt-4">
                  Using the Quick Setup dropdown in our <strong>electric car cost per mile calculator</strong> above, you can instantly preload standard tariffs, gas prices, and regional currency settings to get an accurate comparison for your local market.
                </p>
              </div>

              {/* Understanding Charging Levels */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Understanding the 3 Levels of EV Charging Costs
                </h2>
                <div className="space-y-4">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-emerald-400 mb-2">Level 1: Standard 120V Outlet</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The slowest method, utilizing a standard household outlet. While the base rate is your standard residential electricity tariff, Level 1 is the least efficient method due to high overhead losses (~20% to 25% of energy is lost to inverter heat).
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-emerald-400 mb-2">Level 2: 240V Home Charging</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The optimal daily setup. Requires a dedicated 240V circuit. Charging at 90% to 95% efficiency, Level 2 combined with an overnight Time-of-Use (TOU) utility rate is the absolute cheapest <strong>cost to charge ev at home vs public station</strong>.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-2">Level 3: DC Fast Charging (Public)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Highway superchargers (Electrify America, Tesla Superchargers). While extremely fast, these networks charge a massive premium—often $0.40 to $0.60 per kWh—making them 3 to 4 times more expensive than home charging. 
                    </p>
                  </div>
                </div>
              </div>

              {/* Math Formulas */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Electric Car Cost Per Mile Calculator: The Mathematical Formulation
                </h2>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 md:p-8 font-mono text-sm text-slate-300 space-y-6">
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">1. Billable Grid Energy:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      E_meter = (ΔSoC × C_battery) / η_charging
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">2. Total Charging Session Cost:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_session = (E_meter × Rate_electricity) + Fee_session
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">3. Cost Per Mile (or km):</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_mile = (Wh_mi / (1,000 × η_charging)) × Rate_electricity
                    </p>
                  </div>
                  <div>
                    <p className="text-emerald-400 font-bold mb-2">4. Gasoline Fuel Cost Per Mile Comparison:</p>
                    <p className="bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                      Cost_mile_ICE = Price_gallon / MPG
                    </p>
                  </div>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="space-y-6 pt-8 border-t border-slate-800 overflow-x-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  EV Charging Cost Per 100 Miles: Popular Electric Vehicles Compared
                </h2>
                <p className="text-slate-400 text-sm">Comparison based on driving 100 miles (160 km). Assumes standard 90% L2 and 95% DCFC efficiencies.</p>
                
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-800/50">
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 rounded-tl-xl">Vehicle & Battery</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700">Consumption</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-emerald-400">Home Off-Peak ($0.12)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-amber-400">Home Peak ($0.28)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 text-cyan-400">Public DCFC ($0.45)</th>
                      <th scope="col" className="p-4 text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700 rounded-tr-xl">Gas Car (28 MPG)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-[#131B2A]">
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Tesla Model 3 RWD (60 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">240 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$3.20</td>
                      <td className="p-4 text-sm text-amber-400">$7.47</td>
                      <td className="p-4 text-sm text-cyan-400">$11.37</td>
                      <td className="p-4 text-sm text-slate-300">$13.04 (at $3.65/gal)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Tesla Model Y LR (75 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">270 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$3.60</td>
                      <td className="p-4 text-sm text-amber-400">$8.40</td>
                      <td className="p-4 text-sm text-cyan-400">$12.79</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Hyundai Ioniq 5 (77.4 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">300 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.00</td>
                      <td className="p-4 text-sm text-amber-400">$9.33</td>
                      <td className="p-4 text-sm text-cyan-400">$14.21</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">BMW i4 eDrive40 (81.2 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">310 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.13</td>
                      <td className="p-4 text-sm text-amber-400">$9.64</td>
                      <td className="p-4 text-sm text-cyan-400">$14.68</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Ford Mustang Mach-E ER (91 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">330 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$4.40</td>
                      <td className="p-4 text-sm text-amber-400">$10.27</td>
                      <td className="p-4 text-sm text-cyan-400">$15.63</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-white">Rivian R1T Large Pack (135 kWh)</td>
                      <td className="p-4 text-sm text-slate-400">460 Wh/mi</td>
                      <td className="p-4 text-sm text-emerald-400 font-bold">$6.13</td>
                      <td className="p-4 text-sm text-amber-400">$14.31</td>
                      <td className="p-4 text-sm text-cyan-400">$21.79</td>
                      <td className="p-4 text-sm text-slate-300">$13.04</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  
                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to fully charge an electric car at home?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      It typically costs $6 to $11 to fully charge a 60-80 kWh electric car battery at home using standard off-peak residential electricity rates (assuming $0.10 to $0.15 per kWh).
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Is charging an electric car cheaper than buying gasoline?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Yes. When utilizing an <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">electric car vs gas cost per mile calculator</Link>, home charging typically results in a 60%-75% operational cost reduction compared to fueling an equivalent ICE vehicle.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Why does public DC fast charging cost so much more than home charging?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Comparing the <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">cost to charge ev at home vs public station</Link> reveals higher public fees due to high-voltage infrastructure capital costs, commercial demand charges from utilities, and network operator margin markups. View our <Link href="/" className="text-emerald-400 hover:text-emerald-300">DC fast charging curve calculator</Link> for optimal charging speeds.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to charge a Tesla per mile?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Using a <Link href="/ev-charging-cost" className="text-emerald-400 hover:text-emerald-300">how much to charge a tesla calculator</Link>, a Model 3 or Model Y at home typically costs 3.5 to 4.5 cents per mile, whereas equivalent gasoline cars usually cost 12 to 15 cents per mile.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Does cold winter weather increase the cost of charging an EV?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Yes. Cold weather increases consumption due to cabin HVAC heating and higher battery cell resistance. This increases your Wh/mi, directly raising your cost per mile. You can track this with our <Link href="/range-loss" className="text-emerald-400 hover:text-emerald-300">winter range degradation calculator</Link>.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much does it cost to charge an EV at a hotel or destination charger?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Destination chargers range from complimentary (free for guests) to flat daily fees or standard per-kWh rates. Plan road trips effectively using our <Link href="/destination-charging" className="text-emerald-400 hover:text-emerald-300">destination charging calculator</Link>.
                    </div>
                  </details>

                </div>
              </div>
            </div>

            {/* Sidebar content */}
            <div className="lg:col-span-1">
              <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sticky top-6">
                <h3 className="text-xl font-bold text-white mb-6">Driver Optimization Playbook: 4 Ways to Cut Costs</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">1. Automate Overnight TOU Schedules</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Align charging with 12:00 AM - 6:00 AM super off-peak windows to cut residential charging bills by up to 65%.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">2. Avoid 80% to 100% DC Fast Charging</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Charging above 80% on highway DC chargers slows down drastically due to BMS thermal tapering, increasing paid time-based plug fees.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">3. Rooftop Solar Diverting</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Pair your vehicle with a smart home solar EVSE to charge at an effective cost of $0.00/kWh. Use our <Link href="/solar-to-ev" className="text-emerald-400 hover:text-emerald-300">solar panels to charge an EV calculator</Link> to size your array.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-400 mb-2">4. Public Network Memberships</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Drivers taking frequent road trips can utilize network monthly subscriptions (e.g., Electrify America Pass+, Tesla Supercharger membership) to lower per-kWh rates by up to 25%. Ensure your home panel is ready with our <Link href="/panel-capacity" className="text-emerald-400 hover:text-emerald-300">EV charger breaker size calculator & 100A panel capacity tool</Link>.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800">
                  <h4 className="text-sm font-bold text-white mb-4">Track Your Green Impact</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    Every mile driven on electricity displaces fossil fuels. Calculate your exact emissions delta with our <Link href="/carbon-offset" className="text-emerald-400 font-medium hover:text-emerald-300">EV CO2 emissions saved calculator <ArrowRight className="w-3 h-3 inline" /></Link>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
