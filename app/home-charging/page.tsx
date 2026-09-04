import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import HomeChargingTool from '@/components/HomeChargingTool';
import { 
  PlugZap, 
  Clock, 
  PiggyBank, 
  BatteryWarning, 
  ShieldCheck, 
  Zap, 
  Calculator 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Home Charging Time Calculator 240V | Level 2 & TOU Cost',
  description: 'Calculate overnight charging with our EV home charging time calculator 240V. Compare Level 2 charging speeds, off-peak rates, and annual electric car savings.',
  alternates: {
    canonical: 'https://evchargecurve.com/home-charging',
  },
};

export default function HomeChargingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV Home Charging Time Calculator",
        "applicationCategory": "Utility",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Why do I need a dedicated ev home charging time calculator 240v?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dividing your battery pack size by the circuit kW rating is inaccurate because it ignores onboard AC-to-DC conversion losses. A dedicated calculator factors in the ~10% energy loss that occurs as heat during the conversion process."
            }
          },
          {
            "@type": "Question",
            "name": "How does this ev level 2 charging calculator account for circuit breaker sizing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This ev level 2 charging calculator applies the National Electrical Code (NEC) 80% continuous load safety rule. For example, a 32A draw requires a 40A breaker, and a 48A hardwired draw requires a 60A breaker."
            }
          },
          {
            "@type": "Question",
            "name": "How does the electric car charge cost per kwh calculator compare to gasoline costs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The electric car charge cost per kwh calculator compares your utility kWh rates to equivalent gallons of fuel, factoring in e-gallons and MPGe to provide a direct 1-to-1 financial comparison against combustion engine vehicles."
            }
          },
          {
            "@type": "Question",
            "name": "Can I save money using an ev tou savings calculator?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, absolutely. By using an ev tou savings calculator, you can map out the precise financial benefits of scheduling your vehicle to charge between midnight and 6 AM when utility off-peak tariffs are at their absolute lowest."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24">
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 relative z-10 leading-tight">
          EV Home Charging Time Calculator 240V &amp; Level 2 Cost Estimator
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-10 relative z-10">
          Calculate overnight replenishment hours, electrical panel amperage requirements, and Time-of-Use savings with our <strong>ev home charging time calculator 240v</strong>.
        </p>
      </section>

      {/* Main Simulator Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4 mb-20">
        <HomeChargingTool />
      </div>

      {/* Section 1: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Our EV Level 2 Charging Calculator Works
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Plan your home charging setup and estimate electric utility costs accurately.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)]">
                <PlugZap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Select Electrical Voltage</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose between standard 120V Level 1 or 240V circuits (NEMA 14-50 32A vs hardwired 48A). Our <strong>ev home charging time calculator 240v</strong> matches your onboard charger limits.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Calculate Replenishment Time</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Acting as an <strong>ev level 2 charging calculator</strong>, our engine incorporates an 88%&ndash;92% AC-to-DC conversion efficiency factor to determine true hours required to reach your target SOC.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                <PiggyBank className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Optimize Utility Tariffs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Using an integrated <strong>electric car charge cost per kwh calculator</strong>, the tool acts as an <strong>ev tou savings calculator</strong> to project annual savings over petrol vehicles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Competitor Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Level 1 vs Level 2 Charging
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Compare performance figures using our <strong>ev level 2 charging calculator</strong>.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Level 1 (Standard 120V Outlet)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/30 bg-emerald-950/10 relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                  <div className="flex flex-col">
                    <span className="text-lg">Level 2 (240V Dedicated Circuit)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">120V Single-Phase / 12A continuous</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">240V Split-Phase / 32A to 48A dedicated</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Slow trickle</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Accurately calculated by our <strong>ev home charging time calculator 240v</strong> at 5&ndash;8 hours</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">3 to 4 miles per hour</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Modeled in our <strong>ev level 2 charging calculator</strong> at 25 to 44 miles per hour</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Higher parasitic run losses</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Optimized with an <strong>electric car charge cost per kwh calculator</strong> during off-peak hours</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5 text-slate-400">Cannot finish in off-peak windows</td>
                <td className="p-5 border-l border-slate-800/60 text-emerald-300 font-medium bg-emerald-950/5">
                  Maximizes off-peak hours via our <strong>ev tou savings calculator</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Frequently Asked Questions */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ Card 1 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <PlugZap className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
              Why do I need a dedicated ev home charging time calculator 240v?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Dividing your battery pack size by the circuit kW rating is inaccurate because it ignores onboard AC-to-DC conversion losses. A dedicated calculator factors in the ~10% energy loss that occurs as heat during the conversion process.
            </p>
          </div>

          {/* FAQ Card 2 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              How does this ev level 2 charging calculator account for circuit breaker sizing?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              This ev level 2 charging calculator applies the National Electrical Code (NEC) 80% continuous load safety rule. For example, a 32A draw requires a 40A breaker, and a 48A hardwired draw requires a 60A breaker.
            </p>
          </div>

          {/* FAQ Card 3 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Calculator className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              How does the electric car charge cost per kwh calculator compare to gasoline costs?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              The electric car charge cost per kwh calculator compares your utility kWh rates to equivalent gallons of fuel, factoring in e-gallons and MPGe to provide a direct 1-to-1 financial comparison against combustion engine vehicles.
            </p>
          </div>

          {/* FAQ Card 4 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <PiggyBank className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
              Can I save money using an ev tou savings calculator?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes, absolutely. By using an ev tou savings calculator, you can map out the precise financial benefits of scheduling your vehicle to charge between midnight and 6 AM when utility off-peak tariffs are at their absolute lowest.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
