import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FloatingShareBar from '@/components/blog/FloatingShareBar';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { BreakerContinuousLoadSvg } from '@/components/blog/ChargingInfographics';
import { 
  Zap, 
  ShieldAlert, 
  Plug, 
  Home, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  BatteryCharging,
  Info,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker',
  description: 'A complete guide to electrical panel capacity for EV charging. Learn about the NEC 80% rule, NEMA 14-50 vs hardwired, and how to size a continuous load breaker.',
  keywords: [
    'Level 2 Charging',
    '32A vs 40A vs 48A EV charger',
    'continuous load breaker',
    'NEMA 14-50 vs hardwired',
    'NEC 80% rule EV charging',
    'residential EV charger installation',
    'electrical panel capacity EV',
    '50A breaker wire size',
    'EVEMS load shedding'
  ],
  openGraph: {
    title: 'Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker',
    description: 'Learn about the NEC 80% rule, NEMA 14-50 vs hardwired, and how to properly size a continuous load breaker for your residential EV charger.',
    type: 'article',
    url: 'https://evchargecurve.com/blog/level-2-breaker-sizing-economics',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker',
    description: 'Demystifying the NEC 80% rule and residential EV charger installation.',
  }
};

const ARTICLE_TAGS = [
  'Level 2 Charging',
  'Panel Capacity',
  'NEC 80% Rule',
  'Home Electrical',
  'Installation'
];

export default function Level2BreakerGuidePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "headline": "Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker Sizing",
        "description": "An authoritative engineering guide on NEC 80% rules, sizing breakers for Level 2 EV chargers, continuous loads, NEMA 14-50 vs hardwired setups, and avoiding expensive electrical panel upgrades.",
        "author": {
          "@type": "Person",
          "name": "EV Charge Curve Editorial Team",
          "jobTitle": "EV Infrastructure Experts"
        },
        "publisher": {
          "@type": "Organization",
          "name": "EV Charge Curve",
          "logo": {
            "@type": "ImageObject",
            "url": "https://evchargecurve.com/logo.png"
          }
        },
        "datePublished": "2026-09-11",
        "dateModified": "2026-09-11",
        "mainEntityOfPage": "https://evchargecurve.com/blog/level-2-breaker-sizing-economics"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] selection:bg-cyan-500/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-[#0A0D14] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Breadcrumb 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: 'Level 2 Breaker Sizing' }
            ]}
          />
          
          <div className="mt-6 flex flex-wrap gap-2 mb-6">
            {ARTICLE_TAGS.map(tag => (
              <span key={tag} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-[#131B2A] border border-slate-800 text-slate-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
            Residential Level 2 Charging: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">32A vs. 40A vs. 48A</span> Continuous Load Breaker Sizing
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl mb-8">
            Navigating the National Electrical Code (NEC) rules for residential EV charger installation. Master the 80% continuous load breaker rule, compare NEMA 14-50 receptacles against direct hardwiring, and learn how to maximize your electrical panel capacity.
          </p>

          <div className="flex items-center gap-4 py-4 border-t border-slate-800/80">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-xl border border-slate-600">
              EV
            </div>
            <div>
              <div className="text-white font-bold">EV Charge Curve Editorial Team</div>
              <div className="text-slate-400 text-sm">EV Infrastructure Experts &bull; September 11, 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <TableOfContents 
            items={[
              { id: 'nec-80-rule', label: '1. The NEC 80% Rule for EV Charging', level: 2 },
              { id: '32a-vs-40a-vs-48a', label: '2. Comparing 32A vs 40A vs 48A EV Chargers', level: 2 },
              { id: 'nema-14-50-vs-hardwired', label: '3. NEMA 14-50 vs. Hardwired Installations', level: 2 },
              { id: 'electrical-panel-capacity', label: '4. Electrical Panel Capacity & Load Calcs', level: 2 },
              { id: 'evems-load-shedding', label: '5. Avoiding Panel Upgrades with EVEMS', level: 2 },
              { id: 'faqs', label: '6. Common Installation FAQs', level: 2 }
            ]}
          />
        </div>

        <article className="prose prose-invert prose-slate max-w-none">
          
          <section className="mt-12">
            <h2 id="nec-80-rule" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <Scale className="w-7 h-7 text-cyan-400" />
              1. The NEC 80% Rule for EV Charging
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              When planning a <strong>residential EV charger installation</strong>, the most critical regulation you must understand is the National Electrical Code (NEC) <a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Article 625</a> mandate regarding continuous loads. 
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              According to the NEC, an EV charger is classified as a <strong>continuous load</strong> because it runs at maximum capacity for three hours or more. Continuous loads generate sustained heat in the wiring, the terminals, and the circuit breaker itself. To prevent thermal accumulation and fire risks, the NEC dictates that a continuous load can only draw a maximum of <strong>80% of the circuit breaker's rated capacity</strong>. This means you must install a <strong>continuous load breaker</strong> that is significantly larger than your charger's max output.
            </p>
            
            <BreakerContinuousLoadSvg />

            <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-5 my-6">
              <h4 className="text-white font-bold mb-3">Standard EV Breaker Math:</h4>
              <ul className="space-y-2 text-slate-300 m-0">
                <li><strong>20A Breaker:</strong> Max 16A continuous draw (3.8 kW)</li>
                <li><strong>30A Breaker:</strong> Max 24A continuous draw (5.7 kW)</li>
                <li><strong>40A Breaker:</strong> Max 32A continuous draw (7.6 kW)</li>
                <li><strong>50A Breaker:</strong> Max 40A continuous draw (9.6 kW)</li>
                <li><strong>60A Breaker:</strong> Max 48A continuous draw (11.5 kW)</li>
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 id="32a-vs-40a-vs-48a" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <Zap className="w-7 h-7 text-emerald-400" />
              2. Comparing 32A vs 40A vs 48A EV Chargers
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Choosing between a <strong>32A vs 40A vs 48A EV charger</strong> comes down to a balance of charging speed, wiring costs, and your home's <strong>electrical panel capacity EV</strong> headroom.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-slate-700 bg-slate-800/50">
                    <th className="p-4 text-slate-200 font-bold">Charger Output</th>
                    <th className="p-4 text-slate-200 font-bold">Breaker Req.</th>
                    <th className="p-4 text-slate-200 font-bold">Power (240V)</th>
                    <th className="p-4 text-slate-200 font-bold">Miles Added / Hour</th>
                    <th className="p-4 text-slate-200 font-bold">Optimal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-[#0B0F19]">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-300 font-medium">32 Amps</td>
                    <td className="p-4 text-slate-400">40 Amp</td>
                    <td className="p-4 text-slate-400 font-mono">7.6 kW</td>
                    <td className="p-4 text-cyan-400 font-medium">~25 miles</td>
                    <td className="p-4 text-slate-400">PHEVs & Standard Commutes</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-300 font-medium">40 Amps</td>
                    <td className="p-4 text-slate-400">50 Amp</td>
                    <td className="p-4 text-slate-400 font-mono">9.6 kW</td>
                    <td className="p-4 text-cyan-400 font-medium">~30 miles</td>
                    <td className="p-4 text-slate-400">Long-range EVs & Trucks</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 text-slate-300 font-medium">48 Amps</td>
                    <td className="p-4 text-slate-400">60 Amp</td>
                    <td className="p-4 text-slate-400 font-mono">11.5 kW</td>
                    <td className="p-4 text-emerald-400 font-medium">~36 miles</td>
                    <td className="p-4 text-slate-400">Dual-EV homes, large batteries</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 text-sm">
              * Note: Many vehicles (like the older <a href="https://www.tesla.com/model3" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">Tesla Model 3</a> Standard Range) max out at 32A onboard AC chargers. Buying a 48A wallbox will not charge these vehicles any faster. Always check your vehicle's maximum AC acceptance rate.
            </p>
          </section>

          <section className="mt-12">
            <h2 id="nema-14-50-vs-hardwired" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <Plug className="w-7 h-7 text-blue-400" />
              3. NEMA 14-50 vs. Hardwired Installations
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              When installing a Level 2 charger, you face a major architectural choice: plugging a unit into a <strong>NEMA 14-50</strong> 240V receptacle, or having an electrician perform a <strong>hardwired</strong> installation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-[#131B2A] border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mt-0 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">🔌</span>
                  NEMA 14-50 Receptacle
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm m-0 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    Max output limited to 40 Amps (on a 50A breaker).
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    Requires an expensive GFCI breaker per NEC 2020+, which often causes nuisance tripping.
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                    Cheap builder-grade receptacles ($15) can melt under sustained EV loads. Industrial <a href="https://hubbell.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Hubbell</a> or Bryant outlets ($80+) are strictly required.
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mt-0 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">⚡</span>
                  Direct Hardwired
                </h3>
                <ul className="space-y-3 text-slate-400 text-sm m-0 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    Required for 48A continuous charging (60A breaker).
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    Eliminates the GFCI breaker requirement, saving $100+ on hardware and avoiding nuisance trips.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                    Safer. Removes the physical plug/receptacle connection, eliminating the most common point of electrical resistance and melting.
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              <Link href="/blog/nema-14-50-ev-charging-guide" className="text-cyan-400 font-bold hover:underline">Read our complete deep-dive into NEMA 14-50 vs hardwired installations here.</Link>
            </p>
          </section>

          <section className="mt-12">
            <h2 id="electrical-panel-capacity" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <Home className="w-7 h-7 text-purple-400" />
              4. Electrical Panel Capacity & Load Calcs
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Before adding a 50A or 60A breaker, an electrician must perform an NEC Article 220 Load Calculation to verify your <strong>electrical panel capacity EV</strong> load threshold. If you live in an older home with a 100-Amp main service, adding a standard 48A charger is mathematically impossible without exceeding the main breaker rating when the HVAC and electric dryer are running.
            </p>
            
            <div className="my-10 bg-[#0B0F19] border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-indigo-500/30">
                <Home className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Not Sure If Your Panel Can Handle It?</h3>
              <p className="text-slate-400 max-w-xl mx-auto mb-6">
                Use our interactive NEC continuous load calculator to tally up your home's major appliances and see exactly how much EV charging capacity you have left on your main breaker.
              </p>
              <Link 
                href="/panel-capacity" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-base shadow-lg shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Launch Panel Capacity Calculator</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-[#131B2A] border border-slate-800 text-slate-300 my-6">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                The 50A Breaker Wire Size Constraint
              </h4>
              <p className="text-sm m-0">
                Adding a massive new circuit requires thick copper. <strong>50A breaker wire size</strong> demands 6 AWG copper conductor wire. For a 60A breaker (48A charging), you must use 4 AWG copper NM-B (Romex) or 6 AWG THHN copper wire in conduit. Never allow an installer to run undersized wire or aluminum for a continuous load.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 id="evems-load-shedding" className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-6 flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              5. Avoiding Panel Upgrades with EVEMS Load Shedding
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              If your load calculation fails, you do <strong>not</strong> necessarily need a $4,000 service upgrade to a 200A panel. The NEC allows for an <strong>EVEMS (Electric Vehicle Energy Management System)</strong>, also known as dynamic load shedding.
            </p>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Systems like the DCC-12, SimpleSwitch, or a smart wallbox with CT clamps (like the <a href="https://wallbox.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Wallbox Pulsar Plus</a> with Power Meter or <a href="https://enphase.com/ev-chargers" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Enphase ClipperCreek</a> tech) read your home's total live amperage draw. If you turn on the AC and the electric oven simultaneously, the EVEMS instantly throttles the EV charger down (or pauses it) to keep the house under its 100A limit. At 2 AM when the house is asleep, it restores full 40A charging to the car.
            </p>
          </section>

          {/* Section 6: FAQs */}
          <section className="mt-16 border-t border-slate-800 pt-12">
            <h2 id="faqs" className="text-2xl sm:text-3xl font-bold text-white mt-0 mb-8 flex items-center gap-3">
              <HelpCircle className="w-7 h-7 text-cyan-400" />
              6. Common Installation FAQs
            </h2>

            <div className="space-y-6">
              
              <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mt-0 mb-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  Is a 32A charger fast enough for a daily commute?
                </h3>
                <p className="text-slate-300 text-base leading-relaxed m-0 mb-4">
                  Absolutely. A 32A charger (on a 40A breaker) delivers 7.6 kW. In a typical 10-hour overnight charging window, it pumps 76 kWh into your battery—enough to completely fill most EVs from 0 to 100%, adding roughly 250 miles of range every single night.
                </p>
              </div>

              <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mt-0 mb-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  Why is my EV pulling 32A on a 50A circuit?
                </h3>
                <p className="text-slate-300 text-base leading-relaxed m-0 mb-4">
                  Either your vehicle's onboard AC inverter is physically capped at 32 amps, or the wallbox itself is internally dip-switched/software-configured to max out at 32A. Check the manufacturer app (e.g., Tesla app or ChargePoint app) to verify the max current limit.
                </p>
                <Link href="/blog/how-long-to-charge-an-electric-car" className="text-cyan-400 font-medium hover:underline text-sm flex items-center gap-1"><ArrowRight className="w-4 h-4"/> See our full Charging Speed Math Guide</Link>
              </div>

              <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mt-0 mb-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  Can I put a 50 amp EV charger on a 100 amp panel?
                </h3>
                <p className="text-slate-300 text-base leading-relaxed m-0">
                  It depends entirely on your home's existing load. If your home utilizes gas appliances (gas heating, gas water heater, gas dryer), a 100A panel often has sufficient headroom. If your home is fully electric, a 50A breaker will likely fail an NEC load calculation. In that scenario, you must either upgrade the panel or use an EVEMS (load shedding) device.
                </p>
              </div>

              <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mt-0 mb-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  Does a NEMA 14-50 EV outlet require a GFCI breaker?
                </h3>
                <p className="text-slate-300 text-base leading-relaxed m-0">
                  Yes. Under NEC 2020 and NEC 2023, all 240-volt receptacles in garages, outdoors, or basements must be GFCI protected at the circuit breaker. Because the EV charger unit also has built-in GFCI protection, this often leads to "nuisance tripping." This is a primary reason why many electricians highly recommend hardwiring your charger instead, which legally bypasses the GFCI breaker requirement.
                </p>
              </div>

              <div className="bg-[#0B0F19] border border-slate-800 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mt-0 mb-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  What wire size is required for a 60-amp EV breaker (48A charging)?
                </h3>
                <p className="text-slate-300 text-base leading-relaxed m-0">
                  For a 60-amp continuous load circuit, you typically must use <strong>6 AWG THHN copper wire</strong> inside conduit, or <strong>4 AWG NM-B (Romex)</strong>. A common code violation is using 6 AWG Romex, which is only rated for 55 amps at its 60°C temperature rating and therefore cannot legally be used on a 60-amp breaker. Always use copper, never aluminum, for EV loads.
                </p>
              </div>

            </div>
          </section>

        </article>
      </main>
      
      {/* Floating Share Bar */}
      <FloatingShareBar 
        url="https://evchargecurve.com/blog/level-2-breaker-sizing-economics" 
        title="Residential Level 2 Charging: 32A vs. 40A vs. 48A Continuous Load Breaker Sizing" 
      />
    </div>
  );
}
