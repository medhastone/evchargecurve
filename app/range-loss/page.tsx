import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import RangeLossTool from '@/components/RangeLossTool';
import { 
  ThermometerSnowflake, 
  Wind, 
  Truck, 
  BatteryWarning, 
  Flame, 
  Gauge, 
  Layers 
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Cold Weather Range Loss Calculator & Towing Estimator',
  description: 'Estimate winter highway drop with our EV cold weather range loss calculator. Model sub-zero temperatures, aerodynamic drag, and EV towing weight vs range.',
  alternates: {
    canonical: 'https://evchargecurve.com/range-loss',
  },
};

export default function RangeLossPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "EV Cold Weather Range Loss Calculator",
        "applicationCategory": "Utility",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate EV Range Loss",
        "description": "Calculate exact highway range drop for winter temperatures, aerodynamic drag, and towing.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Input thermodynamic variables",
            "text": "Select ambient temperature and HVAC settings to run the heat pump vs ptc heater ev range calculator."
          },
          {
            "@type": "HowToStep",
            "name": "Configure speed and aero drag",
            "text": "Set your highway cruising speed to allow the ev winter range calculator to compute air density drag."
          },
          {
            "@type": "HowToStep",
            "name": "Add towing payload",
            "text": "Attach a trailer profile to the ev towing weight vs range calculator to estimate high-speed drag."
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 relative z-10 leading-tight">
          EV Cold Weather Range Loss Calculator &amp; Highway Towing Estimator
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-4xl mx-auto mb-10 relative z-10">
          Official EPA window stickers assume warm, flat conditions. Use our <strong>ev cold weather range loss calculator</strong> and <strong>ev towing weight vs range calculator</strong> to project actual real-world highway stops.
        </p>
      </section>

      {/* Main Simulator Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-4 mb-20">
        <RangeLossTool />
      </div>

      {/* Section 1: How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            How Our EV Winter Range Calculator Projects Efficiency Losses
          </h2>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed">
            Highway range loss is driven by thermodynamics and aerodynamics. Here is how our calculations work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(245,158,11,0.2)]">
                <ThermometerSnowflake className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Thermodynamic HVAC Draw</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our <strong>ev cold weather range loss calculator</strong> evaluates cabin heating draw, running our <strong>heat pump vs ptc heater ev range calculator</strong> logic to determine continuous parasitic battery drain.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)]">
                <Wind className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quadratic Aerodynamic Drag</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cold air is denser than warm air. This <strong>ev winter range calculator</strong> factors in ambient air density alongside speed (scaling with v&sup2;) to compute highway consumption at 65, 70, and 75+ mph.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative overflow-hidden bg-[#131B2A] border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-[#0B0F17] select-none group-hover:text-slate-900/50 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)]">
                <Truck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Trailer Towing &amp; Cargo Drag</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Using our <strong>ev towing weight vs range calculator</strong>, the system computes the aerodynamic profile of trailers and rooftop boxes, modeling true highway range drop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Technical Specifications & Competitor Comparison */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Seasonal Highway Degradation
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Comparing real consumption benchmarks calculated by our <strong>ev cold weather range loss calculator</strong>.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Mild Summer Highway (70&deg;F)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/30 bg-emerald-950/10 relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                  <div className="flex flex-col">
                    <span className="text-lg">Freezing Winter Highway (15&deg;F)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Minimal A/C load</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Modeled by our <strong>heat pump vs ptc heater ev range calculator</strong> as a 2&ndash;5 kW drain</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Baseline EPA achieved</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Evaluated by our <strong>ev winter range calculator</strong> at 25%&ndash;40% loss</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Standard trailer consumption</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Calculated by our <strong>ev towing weight vs range calculator</strong> with aerodynamic drag penalties</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">100% full regen available</td>
                <td className="p-5 border-l border-slate-800/60 text-emerald-300 font-medium bg-emerald-950/5">Severely limited until battery pack is conditioned</td>
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
              <BatteryWarning className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
              Why is an ev cold weather range loss calculator necessary for winter road trips?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Winter severely affects battery physics. Electrolyte viscosity increases, denser cold air exponentially increases aerodynamic resistance, and continuous cabin heating draws massive power. This calculator models those exact variables to prevent you from being stranded.
            </p>
          </div>

          {/* FAQ Card 2 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Flame className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              How does the heat pump vs ptc heater ev range calculator evaluate cabin heating?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Standard resistive (PTC) heaters have a Coefficient of Performance (COP) of 1.0, meaning 1kW of battery yields 1kW of heat. Vapor-injection heat pumps can achieve a COP of 2.5+, pulling heat from the ambient air or motors, drastically saving highway range.
            </p>
          </div>

          {/* FAQ Card 3 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Truck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              Why does our ev towing weight vs range calculator prioritize aerodynamics over trailer weight?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              At highway speeds, aerodynamic drag accounts for the vast majority of energy consumption. A lightweight but boxy travel trailer will ruin efficiency far worse than a low-profile, heavy flatbed. We model the frontal trailer profile to simulate high-speed drag accurately.
            </p>
          </div>

          {/* FAQ Card 4 */}
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
            <h3 className="text-lg font-bold text-white mb-4 flex items-start gap-4">
              <Wind className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
              Can an ev winter range calculator account for battery preconditioning?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. Warming the battery pack while the vehicle is still plugged into grid power (preconditioning) prevents the vehicle from using its own energy to heat the cells upon departure. This significantly mitigates early-trip efficiency losses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
