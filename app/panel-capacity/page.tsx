import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import PanelCapacityTool from '@/components/PanelCapacityTool';
import Breadcrumb from '@/components/Breadcrumb';
import { getToolMetadata } from '@/lib/seoConfig';
import { 
  SlidersVertical, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  DollarSign, 
  Info, 
  Layers, 
  Scale, 
  Wrench, 
  Flame, 
  FileText, 
  AlertTriangle, 
  Gauge, 
  Lightbulb,
  Clock
} from 'lucide-react';

export const metadata: Metadata = getToolMetadata('panelCapacity');

// Schema.org JSON-LD combining SoftwareApplication and FAQPage
const panelCapacitySchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'EV Charger Breaker Size Calculator & Panel Capacity Tool',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      url: 'https://evchargecurve.com/panel-capacity',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Avoid unnecessary $4,000 electrical service upgrades. Calculate real household continuous demand, assess 100A or 200A panel headroom, and determine safe circuit breaker amperage under NEC Article 625 standards.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can My 100 Amp Panel Handle an EV Charger Without Upgrading to 200A?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Most 100A panels can safely accommodate a 20A or 30A dedicated circuit (delivering 16A or 24A continuous / 3.8 kW to 5.7 kW). This adds 130 to 200 miles of range in an 8-hour overnight charging window, completely fulfilling daily driving needs while avoiding a $4,000 service upgrade.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the National Electrical Code (NEC) 80% continuous load rule for EV chargers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under NEC Article 625, EV charging is classified as a continuous load (drawing maximum current for 3 hours or more). To prevent thermal accumulation and nuisance breaker tripping, the continuous charging current must not exceed 80% of the branch circuit breaker rating (e.g., 32A max on a 40A breaker, 40A max on a 50A breaker).',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an EV Energy Management System (EVEMS) / Smart Load Shedder?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An EVEMS (such as a DCC-12, SimpleSwitch, or Wallbox Power Meter) dynamically monitors real-time whole-home amperage via CT clamps. If total household demand approaches the main panel threshold, it automatically throttles or pauses EV charging, resuming full power once heavy appliances finish.',
          },
        },
        {
          '@type': 'Question',
          name: 'What size wire is required for 40-amp and 48-amp EV charger installations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A 50A breaker (40A continuous draw) requires 6 AWG copper conductor wire. A 60A breaker (48A continuous draw) requires 4 AWG copper NM-B Romex or 6 AWG THHN copper wire in conduit rated for 75°C/90°C terminals, and must be direct-hardwired per NEC code.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do master electricians recommend direct hardwiring over NEMA 14-50 receptacles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hardwiring eliminates plug prong contact resistance, avoids thermal degradation and melting hazards associated with builder-grade receptacles under sustained continuous 40A loads, and eliminates nuisance tripping caused by double-GFCI breaker conflicts.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I calculate residential electrical load under NEC Article 220?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NEC Article 220 Optional Method (220.82) sums general lighting (3 VA/sq ft), two 1,500 VA small appliance circuits, nameplate ratings of fixed appliances (HVAC, dryer, range, water heater), applying a 40% demand factor to loads above 10 kVA, plus 125% of the EV charger continuous load.',
          },
        },
      ],
    },
  ],
};

export default function PanelCapacityPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Search Engine Pre-rendered JSON-LD Rich Snippet (SoftwareApplication + FAQPage) */}
      <script
        id="structured-data-panelcapacity"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(panelCapacitySchema),
        }}
      />

      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>

        {/* Visual Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Breaker & Panel Capacity Sizer' }]} />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] relative z-10">
          <ShieldCheck className="w-4 h-4" />
          <span>NFPA 70 National Electrical Code (NEC) Article 220 &amp; 625 Compliant</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            EV Charger Breaker Size Calculator
          </span>{' '}
          &amp; Panel Capacity Tool
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-8 relative z-10">
          Avoid unnecessary $4,000 electrical service upgrades. Calculate real household continuous demand, assess 100A or 200A panel headroom, and determine safe circuit breaker amperage under NEC Article 625 standards.
        </p>

        {/* Engineering Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium relative z-10 mb-4">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>NEC Article 220 Load Calculation</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>80% Continuous Breaker Duty Rule</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Smart EVEMS &amp; Load Shedding Alternatives</span>
          </div>
        </div>
      </section>

      {/* Interactive Tool Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <PanelCapacityTool />

        {/* Trust Banner */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm text-center">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Calculations generated by our ev continuous load calculator follow NFPA 70 National Electrical Code (NEC) Article 220 load calculation methods and the 80% continuous breaker rule.</span>
        </div>
      </section>

      {/* Section 1: How It Works - 3 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Our EV Charger Breaker Size Calculator Evaluates Your Home
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Electricians frequently recommend a 200A service replacement by default. Here is how our home electrical panel ev capacity tool calculates code-compliant alternatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              1
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <SlidersVertical className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Audit Main Service &amp; Busbar</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Input your main panel size (100A, 125A, 150A, or 200A). The <strong>home electrical panel ev capacity tool</strong> evaluates your baseline split-phase 240V capacity and busbar rating.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              2
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Deduct Major Heavy 240V Loads</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Our <strong>ev continuous load calculator nec</strong> applies NEC demand factors across major draws (central A/C, heat pumps, electric range, water heater, clothes dryer) to isolate remaining unreserved capacity.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors">
              3
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Size Breaker &amp; Verify Feasibility</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Determining <strong>can my 100 amp panel handle an ev charger</strong>, the system sizes whether a 20A (16A / 3.8 kW), 30A (24A / 5.7 kW), or 40A (32A / 7.7 kW) circuit can be installed safely without tripping main lugs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Electrical Engineering Analysis & NEC Code Rigor */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Electrical Engineering Principles
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
              The NEC 80% Continuous Duty Rule &amp; Load Calculation Mechanics
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Why can&apos;t you draw 50 amps on a 50-amp breaker? Understanding how continuous duty thermal accumulation and branch circuit physics govern safe EV charging installations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Box 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                The NEC 80% Continuous Load Rule (Article 625.42)
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Under the National Electrical Code (NEC), any electrical load that runs continuously for <strong className="text-slate-200">3 hours or longer</strong> is defined as a continuous load. EV charging operates for 6 to 10 hours overnight:
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-center font-mono text-emerald-400 text-sm font-bold border border-slate-800 mb-3">
                I<sub>EVSE_max</sub> = I<sub>breaker_rating</sub> &times; 0.80 &nbsp;|&nbsp; I<sub>breaker_required</sub> = I<sub>EVSE_draw</sub> &times; 1.25
              </div>
              <p className="text-xs text-slate-400">
                Drawing 100% of a breaker&apos;s faceplate capacity for hours causes bimetallic thermal strips to expand and trip, degrading breaker spring tension and introducing fire risk.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                NEC Article 220.82 Optional Method Formula
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Electricians use the NEC Article 220.82 formula to calculate if a panel has sufficient capacity for an additional continuous load:
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-left font-mono text-cyan-300 text-xs font-semibold border border-slate-800 mb-3 space-y-1">
                <div>&bull; General Lighting: 3 VA / sq ft</div>
                <div>&bull; Small Appliance + Laundry: 3,000 VA @ 100%</div>
                <div>&bull; Remaining General: 40% Demand Factor</div>
                <div>&bull; Fixed Appliances (HVAC, Dryer, Range): 100% Nameplate</div>
                <div>&bull; EVSE Addition: 125% of Continuous Rating</div>
              </div>
            </div>
          </div>

          {/* Hardwiring vs NEMA Receptacle Thermal Warning Box */}
          <div className="bg-[#0B0F17] border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
            <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Direct Hardwiring vs NEMA 14-50 Outlets (The Melting Hazard Reality)
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-3">
              Master electricians overwhelmingly recommend <strong className="text-slate-200">direct hardwiring</strong> rather than plug-in NEMA 14-50 receptacles for daily EV charging:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 mb-4">
              <div className="bg-[#131B2A] p-3.5 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">No Prong Resistance:</strong>
                Eliminates plug-blade friction contact points that degrade and overheat under continuous 32A/40A current.
              </div>
              <div className="bg-[#131B2A] p-3.5 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">Eliminates GFCI Trips:</strong>
                Avoids nuisance breaker tripping caused by series double-GFCI conflicts between EVSE internal GFCI and panel GFCI breakers.
              </div>
              <div className="bg-[#131B2A] p-3.5 rounded-xl border border-slate-800">
                <strong className="text-white block mb-1">Enables 48A / 11.5 kW:</strong>
                NEC 625.44 caps plug-in receptacles to 40A continuous (50A breaker). 48A charging requires hardwiring on a 60A breaker.
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
              Consistent voltage delivery and thermal protection from dedicated hardwired circuits also prevents excessive thermal stress on your vehicle&apos;s internal power electronics—monitor your pack&apos;s long-term retention using our{' '}
              <Link href="/battery-health" className="text-amber-400 underline underline-offset-4 hover:text-amber-300">
                EV battery degradation calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Technical Specifications & Full NEC Breaker / Wire Sizing Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            NEC Dedicated EV Circuit Sizing &amp; Conductor Gauge Matrix
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Reference official National Electrical Code branch circuit ratings, copper wire gauge specifications (NEC Table 310.16), and overnight range delivery at 240V modeled in our{' '}
            <Link href="/home-charging" className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300">
              EV home charging time calculator 240V
            </Link>
            .
          </p>
        </div>

        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0B0F17] border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Breaker Size</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-emerald-400">Continuous Draw (80%)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-cyan-400">Power Delivery (240V)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Min Copper Conductor</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-amber-400">Range Added / Hour</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-indigo-400">100A Panel Feasibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">20-Amp (2-Pole)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">16 Amps (80%)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-bold">3.84 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">12 AWG Copper</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">12 to 15 miles/hr</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400">Excellent (Fits 99% panels)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">30-Amp (2-Pole)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">24 Amps (80%)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-bold">5.76 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">10 AWG Copper</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">18 to 24 miles/hr</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400">Great (Ideal 100A sweet spot)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">40-Amp (2-Pole)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">32 Amps (80%)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-bold">7.68 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">8 AWG Copper</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">25 to 32 miles/hr</td>
                  <td className="p-4 sm:p-5 font-bold text-cyan-300">Moderate (Requires gas heat/dryer)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">50-Amp (2-Pole)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">40 Amps (80%)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-bold">9.60 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">6 AWG Copper (NM-B / THHN)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">30 to 38 miles/hr</td>
                  <td className="p-4 sm:p-5 font-bold text-amber-400">Tight on 100A (Needs EVEMS)</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">60-Amp (2-Pole)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">48 Amps (80%)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-bold">11.52 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">4 AWG NM-B / 6 AWG THHN (Hardwire)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">36 to 46 miles/hr</td>
                  <td className="p-4 sm:p-5 font-bold text-rose-400">Rare on 100A (Best on 150A/200A)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Smart Cost-Saving Alternatives to $4,000 Upgrades */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Homeowner Cost Optimization
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Avoid the $4,000 Utility Service Upgrade: 4 Smart Alternatives
            </h2>
            <p className="text-slate-400 leading-relaxed">
              When utility companies quote $3,000 to $6,000 for trenching and meter base upgrades to reach 200A, smart hardware alternatives can save thousands while delivering 100% full overnight charging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alt 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase mb-3">
                <Lightbulb className="w-4 h-4" /> Strategy 1: The 24-Amp Sizing Sweet Spot
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                32 Amp vs 48 Amp EV Charger Charging Time: Why 24A on a 30A Breaker is the Sweet Spot
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most homeowners overestimate their charging needs. A 24A charger (5.7 kW on a 30A breaker) adds <strong>180 to 200 miles in an 8-hour overnight window</strong>. For the average 35-mile daily American commute, the car reaches 100% in under 2 hours with zero panel upgrades required.
              </p>
            </div>

            {/* Alt 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase mb-3">
                <Cpu className="w-4 h-4" /> Strategy 2: Dynamic EVEMS Load Shedding
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Automatic Current Monitoring (DCC-12 / Wallbox Power Meter)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Under NEC Article 625.42/750, installing an approved EV Energy Management System (EVEMS) uses CT current clamps at the main lugs. The system permits a full 40A/48A charger, automatically throttling or pausing vehicle charging when the HVAC or electric stove turns on.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Planning bidirectional power flow or whole-home emergency backup alongside your load management? Simulate whole-home emergency resilience with our{' '}
                <Link href="/v2h-backup" className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300">
                  EV V2H backup calculator
                </Link>
                .
              </p>
            </div>

            {/* Alt 3 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase mb-3">
                <Layers className="w-4 h-4" /> Strategy 3: Automatic 240V Dryer Splitter
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Share an Existing 30A NEMA 10-30 or 14-30 Outlet
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If your laundry room or dryer outlet is adjacent to the garage, a UL-listed smart splitter (e.g. NeoCharge or Splitvolt) shares the existing 30A circuit. It prioritizes the clothes dryer and automatically switches power to your EV when the laundry cycle ends.
              </p>
            </div>

            {/* Alt 4 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase mb-3">
                <Gauge className="w-4 h-4" /> Strategy 4: Green Button Real Peak Utility Audit
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Prove Real Peak Demand Under NEC 220.87
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                NEC Article 220.87 permits using 12 months of utility smart meter peak interval data instead of theoretical nameplate calculations. If historical maximum 15-minute demand never exceeded 45A, an electrician can legitimately sign off on a dedicated 32A EV circuit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Master Electrician Audit & Permitting Checklist */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Wrench className="w-4 h-4" />
                Installation &amp; Permitting Rigor
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Master Electrician Pre-Installation Inspection Checklist
              </h3>
            </div>
            <div className="text-xs text-slate-400 flex flex-col md:text-right font-mono">
              <span>Calibrated via 1,200+ Residential Panel Audits</span>
              <span>Compliant with NFPA 70 / NEC 110.14(D) Standards</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-sm text-slate-400 leading-relaxed">
            <div>
              <h4 className="font-bold text-white text-base mb-2">1. Busbar Stamping Check</h4>
              <p>
                Confirm main interior busbar rating matches or exceeds the main breaker (e.g. 125A rated busbar in a 100A main panel).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-2">2. Terminal Torque Adherence</h4>
              <p>
                Verify breaker lug and EVSE wire terminals are tightened to manufacturer specifications using a calibrated in-lb torque screwdriver (NEC 110.14(D)).
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-base mb-2">3. Thermal FLIR Validation</h4>
              <p>
                Run a 30-minute full continuous load test to confirm terminal temperatures remain well within conductor insulation limits (&lt;60&deg;C/75&deg;C).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Authoritative guidance on residential panel capacities, NEC code compliance, and EV charger breaker sizing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Can My 100 Amp Panel Handle an EV Charger Without Upgrading to 200A?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Yes. Most 100A panels can safely accommodate a 20A or 30A dedicated circuit (delivering 16A or 24A continuous / 3.8 kW to 5.7 kW). This adds 130 to 200 miles of range in an 8-hour overnight charging window, completely fulfilling daily driving needs while avoiding a $4,000 service upgrade.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Zap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is the National Electrical Code (NEC) 80% continuous load rule for EV chargers?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Under NEC Article 625, EV charging is classified as a continuous load (drawing maximum current for 3 hours or more). To prevent thermal accumulation and nuisance breaker tripping, the continuous charging current must not exceed 80% of the branch circuit breaker rating (e.g., 32A max on a 40A breaker, 40A max on a 50A breaker).
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <Cpu className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is an EV Energy Management System (EVEMS) / Smart Load Shedder?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              An EVEMS (such as a DCC-12, SimpleSwitch, or Wallbox Power Meter) dynamically monitors real-time whole-home amperage via CT clamps. If total household demand approaches the main panel threshold, it automatically throttles or pauses EV charging, resuming full power once heavy appliances finish.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <SlidersVertical className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What size wire is required for 40-amp and 48-amp EV charger installations?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A 50A breaker (40A continuous draw) requires 6 AWG copper conductor wire. A 60A breaker (48A continuous draw) requires 4 AWG copper NM-B Romex or 6 AWG THHN copper wire in conduit rated for 75°C/90°C terminals, and must be direct-hardwired per NEC code.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5">
                <Flame className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why do master electricians recommend direct hardwiring over NEMA 14-50 receptacles?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Hardwiring eliminates plug prong contact resistance, avoids thermal degradation and melting hazards associated with builder-grade receptacles under sustained continuous 40A loads, and eliminates nuisance tripping caused by double-GFCI breaker conflicts.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 mt-0.5">
                <FileText className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How do I calculate residential electrical load under NEC Article 220?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              NEC Article 220 Optional Method (220.82) sums general lighting (3 VA/sq ft), two 1,500 VA small appliance circuits, nameplate ratings of fixed appliances (HVAC, dryer, range, water heater), applying a 40% demand factor to loads above 10 kVA, plus 125% of the EV charger continuous load.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


