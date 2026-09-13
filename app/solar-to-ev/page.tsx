import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SolarCalculator from './Calculator';
import { ShieldCheck, Cpu, Globe, Zap, Settings, Sun, ArrowRight, CheckCircle2, PanelTop } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solar Panels to Charge an EV Calculator & Array Sizer',
  description: 'Calculate how many solar panels you need to charge your EV. Models solar irradiance, inverter loss, battery chemistry, and annual driving mileage.',
  alternates: {
    canonical: 'https://evchargecurve.com/solar-to-ev',
  },
  openGraph: {
    title: 'Solar Panels to Charge an EV Calculator – Zero-Carbon Rooftop Sizer',
    description: 'Size your rooftop solar array to offset 100% of your EV charging. Factor in regional sun-hours, inverter clipping, and AC-to-DC conversion efficiency.',
    url: 'https://evchargecurve.com/solar-to-ev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solar Panels to Charge an EV Calculator – Zero-Carbon Rooftop Sizer',
    description: 'Size your rooftop solar array to offset 100% of your EV charging. Factor in regional sun-hours, inverter clipping, and AC-to-DC conversion efficiency.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Solar Panels to Charge an EV Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Physics-based rooftop solar array sizing calculator for electric vehicles."
    },
    {
      "@type": "HowTo",
      "name": "How Our Solar to EV Charging Calculator Sizes Your Rooftop Array",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Calculate Annual Driving Energy Consumption",
          "text": "Calculates gross energy drawn at the wall by factoring vehicle consumption (Wh/mi) and AC-to-DC onboard rectification losses."
        },
        {
          "@type": "HowToStep",
          "name": "Apply Photovoltaic Derating & Peak Sun-Hours",
          "text": "Applies local solar irradiance and system losses using an 0.84 derate factor for inverter heat, dust/soiling, wiring resistance, and ambient temperature."
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Array Sizing & Panel Allocation",
          "text": "Divides gross annual kWh demand by single-panel DC harvest to output the exact solar panels needed to charge an electric car."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many solar panels does it take to charge an electric car for daily driving?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For a typical 35-mile daily commute, it takes roughly 5 to 9 solar panels (rated at 400W each) depending on your regional sun exposure and vehicle efficiency. Highly efficient EVs in sunny climates need fewer panels, while less efficient trucks in cloudy regions require more."
          }
        },
        {
          "@type": "Question",
          "name": "Can I charge my EV directly from solar panels without a home battery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Using a smart solar-diverting EVSE (like Wallbox Eco-Smart, Zappi, or Emporia), your charger can communicate with your solar inverter and throttle the charging speed in real time to perfectly match your excess solar production, sending zero energy to the grid."
          }
        },
        {
          "@type": "Question",
          "name": "How many kW of solar do I need to charge an EV completely off-grid?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To charge an EV off-grid, you generally need 2 kW to 4 kW of dedicated solar capacity just for the vehicle, plus a buffer battery (like a Tesla Powerwall) to store energy on days you are away from home during peak sun hours."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if it rains or is overcast for multiple consecutive days?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "During prolonged cloudy periods, solar production drops significantly. Unless you are completely off-grid, your system will automatically pull the shortfall from the utility grid seamlessly. If you have net metering (NEM), the excess energy you produced on sunny days will offset these grid costs."
          }
        },
        {
          "@type": "Question",
          "name": "Does charging an electric car with solar panels void the vehicle battery warranty?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Your vehicle only sees standard AC electricity coming from your Level 2 home charger. The vehicle's onboard charger (OBC) regulates the voltage and current, meaning charging from solar is indistinguishable from grid charging to the battery."
          }
        },
        {
          "@type": "Question",
          "name": "How much money does charging an EV with rooftop solar save per year compared to gasoline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Depending on your local gas prices and driving habits, charging a 12,000-mile/year EV with rooftop solar can save between $1,200 and $2,000 annually in fuel costs."
          }
        }
      ]
    }
  ]
};

export default function SolarToEVPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#0B0F17] text-slate-200 font-sans selection:bg-cyan-500/30">
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-[#0F172A] to-[#0B0F17]">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
              Solar Panels to Charge an EV <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Calculator & Rooftop Array Sizer
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mb-8">
              Stop guessing your residential solar needs. Our physics-grounded solar to ev charging calculator models NREL photovoltaic derate factors, regional peak sun-hours, and Level 2 AC-to-DC conversion efficiency to determine the exact number of solar panels needed to charge your electric car.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                NREL PVWatts System Derate Validated
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Level 2 AC-to-DC Conversion Accounting
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
                <Globe className="w-4 h-4 text-blue-400" />
                Imperial & Metric Global Support
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-2 text-sm text-slate-300">
                <Settings className="w-4 h-4 text-amber-400" />
                100% Client-Side Physics Execution
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Tool */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            
            {/* The Tool */}
            <SolarCalculator />

            <div className="max-w-4xl mx-auto space-y-16 mt-16">
              
              {/* Step-by-Step Workflow */}
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  How Our Solar to EV Charging Calculator Sizes Your Rooftop Array
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-8 text-8xl font-black text-slate-800/40 select-none group-hover:text-slate-700/40 transition-colors z-0">1</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        Annual Driving Energy Consumption (kWh)
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Calculates gross energy drawn at the wall by factoring vehicle consumption (Wh/mi) and AC-to-DC onboard rectification losses (~10% thermal overhead).
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-8 text-8xl font-black text-slate-800/40 select-none group-hover:text-slate-700/40 transition-colors z-0">2</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Sun className="w-5 h-5 text-amber-400" />
                        Photovoltaic Derating & Peak Sun-Hours
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Applies local solar irradiance and system losses (0.84 derate factor: inverter heat, dust/soiling, wiring resistance, and ambient temperature degradation).
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-8 text-8xl font-black text-slate-800/40 select-none group-hover:text-slate-700/40 transition-colors z-0">3</div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <PanelTop className="w-5 h-5 text-emerald-400" />
                        Array Sizing & Panel Allocation
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Divides gross annual kWh demand by single-panel DC harvest to output the exact solar panels needed to charge an electric car.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulas Section */}
              <div className="prose prose-invert prose-slate max-w-none">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Solar EV Charging System Sizing: The First-Principles Formulas
                </h2>
                <p className="text-slate-300">
                  To ensure accuracy without relying on crude dollar-based estimates, our solar ev charging system sizing calculator executes three core electrochemical and photovoltaic equations directly in your browser:
                </p>

                <div className="space-y-6 mt-8">
                  <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 font-mono text-sm sm:text-base text-cyan-300">
                    <div className="text-slate-500 mb-2 font-sans text-xs uppercase tracking-wider font-bold">1. Gross Charging Energy</div>
                    E_annual = (Daily Miles × 365 × Wh/mi) / (1,000 × η_obc)
                  </div>

                  <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 font-mono text-sm sm:text-base text-cyan-300">
                    <div className="text-slate-500 mb-2 font-sans text-xs uppercase tracking-wider font-bold">2. Single Panel Annual Energy Harvest</div>
                    E_panel = (P_panel_dc × PSH × 365 × Derate) / 1,000
                  </div>

                  <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 font-mono text-sm sm:text-base text-cyan-300">
                    <div className="text-slate-500 mb-2 font-sans text-xs uppercase tracking-wider font-bold">3. Total Panels Needed</div>
                    N_panels = ⌈ E_annual / E_panel ⌉
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-4 italic">
                  Where PSH = Peak Sun Hours, Derate = 0.84 NREL standard, and η_obc = 0.90 (typical onboard charger efficiency). To learn more about AC conversion losses, see our <Link href="/home-charging" className="text-emerald-400 hover:text-emerald-300">Level 2 EV home charging time calculator 240V</Link>.
                </p>
              </div>

              {/* Benchmarks Matrix */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  How Many Solar Panels to Charge an EV? Benchmarks Across Popular Models
                </h2>
                <p className="text-slate-300 mb-4">
                  Below is a benchmark matrix based on an average 12,000-mile (19,300 km) annual commute using standard 400W solar panels.
                </p>
                <div className="overflow-x-auto bg-[#131B2A] border border-slate-800 rounded-2xl">
                  <table className="w-full text-left border-collapse text-sm min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-900 border-b border-slate-800">
                        <th scope="col" className="p-4 font-semibold text-slate-300">Vehicle & Efficiency</th>
                        <th scope="col" className="p-4 font-semibold text-slate-300">Low Sun (3.0 PSH)</th>
                        <th scope="col" className="p-4 font-semibold text-slate-300">Mod Sun (4.0 PSH)</th>
                        <th scope="col" className="p-4 font-semibold text-slate-300">High Sun (5.5 PSH)</th>
                        <th scope="col" className="p-4 font-semibold text-slate-300">Array Size (kW)</th>
                        <th scope="col" className="p-4 font-semibold text-slate-300">Annual Grid Offset</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-400">
                      {[
                        { model: 'Tesla Model 3 RWD (240 Wh/mi)', low: 9, mod: 7, high: 5, kw: '2.8 kW', offset: '100%' },
                        { model: 'Tesla Model Y LR (270 Wh/mi)', low: 10, mod: 8, high: 6, kw: '3.2 kW', offset: '100%' },
                        { model: 'Hyundai Ioniq 5 (300 Wh/mi)', low: 11, mod: 8, high: 6, kw: '3.2 kW', offset: '100%' },
                        { model: 'BMW i4 eDrive40 (280 Wh/mi)', low: 10, mod: 8, high: 6, kw: '3.2 kW', offset: '100%' },
                        { model: 'Ford Mustang Mach-E (330 Wh/mi)', low: 12, mod: 9, high: 7, kw: '3.6 kW', offset: '100%' },
                        { model: 'Rivian R1T Large Pack (440 Wh/mi)', low: 16, mod: 12, high: 9, kw: '4.8 kW', offset: '100%' },
                        { model: 'Ford F-150 Lightning (480 Wh/mi)', low: 18, mod: 13, high: 10, kw: '5.2 kW', offset: '100%' },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-4 text-white font-medium">{row.model}</td>
                          <td className="p-4">{row.low} panels</td>
                          <td className="p-4">{row.mod} panels</td>
                          <td className="p-4">{row.high} panels</td>
                          <td className="p-4 text-emerald-400 font-medium">{row.kw}</td>
                          <td className="p-4">{row.offset}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Proven Strategies */}
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Rooftop Solar Charging Playbook: 4 Proven Strategies
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">1. Direct Solar EV Diverting (Zero-Grid Export)</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Smart EVSEs (like Wallbox Eco-Smart, Zappi, or Emporia) throttle charging in real time to match solar excess. This prevents low-value grid export. Before upgrading, verify your <Link href="/panel-capacity" className="text-emerald-400 hover:text-emerald-300">EV charger breaker size & 100A panel capacity</Link>.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">2. Buffer Battery Integration</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Sizing stationary storage (e.g. Tesla Powerwall) to store afternoon solar for night charging. If you plan to power your home from your EV instead, explore our <Link href="/v2h-backup" className="text-emerald-400 hover:text-emerald-300">EV V2H backup calculator</Link>.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">3. Bi-Facial & High-Tilt Winter Optimization</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Adjusting panel tilt angle to maximize solar generation during low-sun winter months, counteracting the natural efficiency drop in EV batteries when it gets cold.
                    </p>
                  </div>
                  <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">4. Net Metering (NEM 3.0) Tariff Economics</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Navigating export credit reductions by prioritizing 100% self-consumption inside the EV pack. This maximizes the <Link href="/carbon-offset" className="text-emerald-400 hover:text-emerald-300">EV CO2 emissions saved</Link> and accelerates payback periods.
                    </p>
                  </div>
                </div>
              </div>

                            {/* Trusted Resources */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Trusted & Related Resources
                </h2>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-emerald-400" /> External Authorities
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> NREL PVWatts Calculator</a></li>
                        <li><a href="https://www.epa.gov/greenvehicles" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> EPA Green Vehicle Guide</a></li>
                        <li><a href="https://www.energy.gov/eere/solar/homeowners-guide-going-solar" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> DOE Guide to Going Solar</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-400" /> Internal Tools
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/home-charging" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Home Charging Economics</Link></li>
                        <li><Link href="/battery-health" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Battery Health & Degradation</Link></li>
                        <li><Link href="/carbon-offset" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Carbon Offset Matrix</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  
                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How many solar panels does it take to charge an electric car for daily driving?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Typically 5 to 9 panels of 400W for a 35-mile daily commute. Highly efficient EVs in sunny climates need fewer panels, while less efficient trucks in cloudy regions require more.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Can I charge my EV directly from solar panels without a home battery?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Yes. Using smart solar-diverting EVSEs (like Wallbox Eco-Smart, Zappi, or Emporia), your charger communicates with your solar inverter and throttles the charging speed in real time to match solar excess.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How many kW of solar do I need to charge an EV completely off-grid?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      To charge an EV off-grid, you generally need 2 kW to 4 kW of dedicated solar capacity just for the vehicle, plus a large buffer battery to store energy for cloudy days or nighttime charging.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      What happens if it rains or is overcast for multiple consecutive days?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      During prolonged cloudy periods, solar production drops significantly. Unless you are completely off-grid, your system will automatically pull the shortfall from the utility grid seamlessly.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      Does charging an electric car with solar panels void the vehicle battery warranty?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      No. Your vehicle only sees standard AC electricity coming from your Level 2 home charger. The vehicle's onboard charger (OBC) regulates the voltage and current safely.
                    </div>
                  </details>

                  <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white">
                      How much money does charging an EV with rooftop solar save per year compared to gasoline?
                      <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed">
                      Depending on your local gas prices and driving habits, charging a 12,000-mile/year EV with rooftop solar can save between $1,200 and $2,000 annually in fuel costs.
                    </div>
                  </details>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
