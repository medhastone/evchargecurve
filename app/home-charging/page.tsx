import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HomeChargingTool from '@/components/HomeChargingTool';
import Breadcrumb from '@/components/Breadcrumb';
import { getToolMetadata } from '@/lib/seoConfig';
import { 
  PlugZap, 
  Clock, 
  PiggyBank, 
  BatteryWarning, 
  ShieldCheck, 
  Zap, 
  Calculator,
  Flame,
  Gauge,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Info,
  Scale,
  Wrench,
  FileText,
  Lightbulb,
  Car,
  Compass,
  Cpu
} from 'lucide-react';

export const metadata: Metadata = getToolMetadata('homeCharging');

export default function HomeChargingPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'EV Home Charging Time Calculator 240V & Level 2 Cost Estimator',
        operatingSystem: 'Any',
        applicationCategory: 'UtilitiesApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Calculate 240V Level 2 EV home charging speed, circuit breaker sizing (NEC 80% continuous rule), AC-to-DC onboard inverter efficiency, and overnight Time-of-Use (TOU) electricity costs across all electric vehicles.',
        url: 'https://evchargecurve.com/home-charging',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How long does a 240V Level 2 charger take to charge an EV from 10% to 80%?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A standard 240V 32A (7.7 kW / NEMA 14-50) home charger adds 25 to 30 miles of range per hour, charging a typical 75 kWh battery from 10% to 80% in 6.5 to 7.5 hours. A 48A (11.5 kW) hardwired station completes the same session in 4.5 to 5 hours.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the NEC 80% continuous load rule for EV home chargers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under National Electrical Code (NEC Article 625), electric vehicle charging is classified as a continuous load (lasting over 3 hours). The continuous current draw must never exceed 80% of the circuit breaker rating. A 50A breaker allows a maximum 40A continuous draw, a 40A breaker allows 32A, and a 60A breaker allows 48A.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is 240V Level 2 charging more energy-efficient than 120V Level 1 charging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Level 2 charging achieves 88% to 93% AC-to-DC conversion efficiency compared to only 74% to 82% on 120V Level 1. At 120V (1.4 kW), fixed parasitic loads (BMS computers, coolant pumps, inverter overhead) consume 250W to 350W continuously—wasting up to 25% of supplied power as heat.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the difference between a NEMA 14-50 plug-in charger and a hardwired 48A EVSE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Plug-in NEMA 14-50 chargers plug into a 240V wall receptacle and are capped at 40A continuous (9.6 kW) on a 50A breaker. Hardwired chargers connect directly to conduit and can draw 48A continuous (11.5 kW) on a 60A breaker, providing 20% faster charging without nuisance GFCI tripping.',
            },
          },
          {
            '@type': 'Question',
            name: 'How much money does off-peak Time-of-Use (TOU) home charging save per year?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Switching to a dedicated utility EV Time-of-Use (TOU) tariff (typically $0.07 to $0.14/kWh overnight vs $0.35 to $0.50/kWh peak) lowers the cost to fully recharge a 75 kWh battery to $6–$10, saving $1,200 to $2,200 annually compared to gasoline fueling.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does my EV charge slower than the maximum kW rating of my home charger?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Charging speed is determined by the vehicle onboard AC-to-DC charger (OBC) bottleneck. If your vehicle has a 7.7 kW or 9.6 kW onboard inverter, it will draw a maximum of 32A or 40A, regardless of whether your wall EVSE is rated for 48A or 80A.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Search Engine Pre-rendered JSON-LD Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none" aria-hidden="true"></div>

        {/* Visual Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'Home Charging Time Calculator' }]} />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_15px_-3px_rgba(59,130,246,0.2)] relative z-10">
          <PlugZap className="w-4 h-4" />
          <span>NEC Article 625 Continuous Load &amp; Inverter Efficiency Model</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            EV Home Charging Time Calculator 240V
          </span>{' '}
          &amp; Level 2 Cost Estimator
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8 relative z-10">
          Calculate overnight replenishment hours, electrical panel amperage requirements, and Time-of-Use (TOU) off-peak utility savings with our <strong>ev home charging time calculator 240v</strong>.
        </p>

        {/* Engineering Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium relative z-10 mb-4">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NEC 80% Continuous Load Rule</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>AC-to-DC Inverter Efficiency (88%&ndash;93%)</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <PiggyBank className="w-4 h-4 text-amber-400" />
            <span>Time-of-Use (TOU) Tariff Schedulers</span>
          </div>
        </div>
      </section>

      {/* Main Simulator Component Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <HomeChargingTool />

        {/* Trust Banner & Contextual Guidance */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Calculations comply with National Electrical Code (NEC 625.42), vehicle onboard AC charger (OBC) kW bottlenecks, and utility off-peak tariff tiers.</span>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm">
            <BatteryWarning className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>In the Daily Session Target section, setting routine limits to 80% protects battery longevity—forecast cell health with our{' '}
              <Link href="/battery-health" className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300 font-semibold">
                EV battery degradation calculator
              </Link>.
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: How It Works - 3 Sizing Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Our EV Level 2 Charging Calculator Works
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Residential charging performance depends on your service panel voltage, breaker continuous load limits, and vehicle onboard inverter rectification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              1
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <PlugZap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Circuit Amperage Sizing</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Choose between standard 120V Level 1 (12A) or 240V circuits (NEMA 14-50 32A vs hardwired 48A). Our <strong>ev home charging time calculator 240v</strong> applies the NEC 80% continuous breaker limit.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              2
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Onboard Inverter Efficiency</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                Acting as an <strong>ev level 2 charging calculator</strong>, our engine models 88%&ndash;93% AC-to-DC conversion efficiency and vehicle OBC limits (7.7 kW to 11.5 kW) to project true hours to full.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#0F172A] border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors shadow-lg">
            <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 select-none group-hover:text-slate-800/30 transition-colors" aria-hidden="true">
              3
            </div>
            <div className="relative z-10">
              <div className="bg-[#1E293B] w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <PiggyBank className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Time-of-Use Cost Savings</h3>
              <p className="text-slate-300 leading-relaxed text-sm mb-3">
                Using an integrated <strong>electric car charge cost per kwh calculator</strong>, our system simulates off-peak utility tariffs ($0.08&ndash;$0.14/kWh) to calculate exact annual savings over gasoline.
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                In our annual economics breakdown, compare domestic utility rates against highway public DC fast charging rates with our{' '}
                <Link href="/" className="text-cyan-400 underline underline-offset-4 hover:text-cyan-300 font-semibold">
                  DC fast charging curve calculator
                </Link>.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Electrical Engineering Analysis (Deep Technical Content) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Electrical Engineering &amp; NEC Guidelines
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
              The Electrical Science of 240V Level 2 Home EV Charging
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Why does an electric vehicle draw power differently from a home dryer or stove, and why is AC-to-DC conversion efficiency critical for calculating home charging costs?
            </p>
          </div>

          {/* NEC 80% Continuous Load Rule Table */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              NEC Article 625.42: Circuit Breaker Sizing &amp; Continuous Load Capacity
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Under the National Electrical Code, EV charging is defined as a <strong className="text-slate-200">continuous load</strong> (any electrical load operating continuously for 3 hours or more). As a result, the continuous current draw cannot exceed <strong className="text-emerald-400">80% of the overcurrent protection device (breaker) rating</strong>:
            </p>

            <div className="overflow-x-auto bg-[#0B0F17] border border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <caption className="sr-only">
                  NEC Article 625.42 Circuit Breaker Sizing and Continuous Load Capacity Guidelines
                </caption>
                <thead className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-900/60">
                  <tr>
                    <th scope="col" className="p-3.5">Breaker Rating</th>
                    <th scope="col" className="p-3.5 text-emerald-400">Continuous Draw (80%)</th>
                    <th scope="col" className="p-3.5 text-cyan-400">Voltage &amp; kW Output</th>
                    <th scope="col" className="p-3.5">Connection Type</th>
                    <th scope="col" className="p-3.5">Minimum Copper Wire Gauge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3.5 font-bold text-white">15A (120V)</td>
                    <td className="p-3.5 font-mono text-emerald-400">12 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300">1.44 kW (Level 1)</td>
                    <td className="p-3.5">NEMA 5-15 (Standard Outlet)</td>
                    <td className="p-3.5 font-mono">14 AWG Romex / THHN</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">20A (120V / 240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400">16 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300">1.92 kW / 3.84 kW</td>
                    <td className="p-3.5">NEMA 5-20 / NEMA 6-20</td>
                    <td className="p-3.5 font-mono">12 AWG Romex / THHN</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">30A (240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400">24 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300">5.76 kW (Level 2)</td>
                    <td className="p-3.5">NEMA 14-30 (Dryer Plug)</td>
                    <td className="p-3.5 font-mono">10 AWG Romex / THHN</td>
                  </tr>
                  <tr className="bg-slate-800/20">
                    <td className="p-3.5 font-bold text-white">40A (240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400">32 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300">7.68 kW (Level 2)</td>
                    <td className="p-3.5">NEMA 14-50 Plug-In EVSE</td>
                    <td className="p-3.5 font-mono">8 AWG THHN (in Conduit)</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="p-3.5 font-bold text-emerald-300">50A (240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">40 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300 font-bold">9.60 kW (Level 2)</td>
                    <td className="p-3.5">NEMA 14-50 (Max Plug-In)</td>
                    <td className="p-3.5 font-mono">6 AWG NM-B / 8 AWG THHN</td>
                  </tr>
                  <tr className="bg-blue-950/20">
                    <td className="p-3.5 font-bold text-blue-300">60A (240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">48 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300 font-bold">11.52 kW (Fastest L2)</td>
                    <td className="p-3.5 font-semibold text-white">Hardwired Dedicated EVSE</td>
                    <td className="p-3.5 font-mono">6 AWG THHN (75&deg;C+ Conduit)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-purple-300">100A (240V)</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">80 Amps</td>
                    <td className="p-3.5 font-mono text-cyan-300 font-bold">19.20 kW (Commercial/Dual)</td>
                    <td className="p-3.5">Ford Charge Station Pro / Dual</td>
                    <td className="p-3.5 font-mono">3 AWG / 2 AWG Copper</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Box 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                The AC-to-DC Inverter Efficiency Equation
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                When plugged into a home 240V AC wall unit, electricity flows through the vehicle&apos;s internal Onboard Charger (OBC) to be rectified into high-voltage DC. Energy consumed from your meter includes conversion and thermal management losses:
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-center font-mono text-blue-300 text-sm font-bold border border-slate-800 mb-3">
                E<sub>meter</sub> = ( &Delta;SoC &times; C<sub>battery</sub> ) / &eta;<sub>OBC</sub> + ( P<sub>parasitic</sub> &times; t<sub>hours</sub> )
              </div>
              <p className="text-xs text-slate-400">
                Level 1 charging suffers from <strong className="text-slate-300">18%&ndash;26% wasted energy</strong> because vehicle BMS computers and coolant pumps (~300W) run for 40+ continuous hours. Level 2 finishes in 6 hours, delivering <strong className="text-emerald-400">89%&ndash;93% net grid efficiency</strong>.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                NEMA 14-50 Charging Speed Calculator: Plug-In Outlet Limits vs Direct Hardwiring
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Standard $10 builder-grade residential NEMA 14-50 receptacles (e.g. Leviton) are designed for stove use (drawing intermittent power once or twice a day).
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-left font-mono text-amber-300 text-xs font-semibold border border-slate-800 mb-3 space-y-1">
                <div>&bull; Thermal Stress: 32A continuous for 8 hours creates intense lug heat</div>
                <div>&bull; Industrial Grade: Use Hubbell 9450A or Bryant heavy-duty brass contacts</div>
                <div>&bull; Best Practice: Hardwire 48A EVSE directly to avoid GFCI breaker nuisance tripping</div>
              </div>
              <p className="text-xs text-slate-400">
                Under NEC 2020 / 2023, 240V garage receptacles require GFCI breakers. Because EVSEs have built-in GFCI self-tests, &quot;double GFCI&quot; can cause false trips. Hardwiring eliminates this hazard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Production EV Home Charging Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            EV Level 2 Charging Calculator Benchmarks: 240V Speeds &amp; Overnight Cost by Model
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Compare battery pack sizes, onboard AC inverter limits (OBC), 240V Level 2 charging speeds, and overnight off-peak charging costs ($0.11/kWh) across popular electric vehicles.
          </p>
        </div>

        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">
                EV Level 2 Charging Benchmarks: 240V Speeds and Overnight Cost by Model
              </caption>
              <thead className="bg-[#0B0F17] border-b border-slate-800">
                <tr>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Vehicle Model</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-slate-300">Battery (Usable)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-blue-400">Onboard Charger (OBC)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-cyan-400">NEMA 14-50 (32A / 7.7 kW)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-emerald-400">Hardwired 48A (11.5 kW)</th>
                  <th scope="col" className="p-4 sm:p-5 font-semibold text-amber-400">Overnight Cost (10&ndash;80%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Tesla Model Y Long Range</td>
                  <td className="p-4 sm:p-5 text-slate-400">75 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">11.5 kW (48A)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">6.8 hrs (30 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.6 hrs (44 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$6.35</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Tesla Model 3 RWD (LFP)</td>
                  <td className="p-4 sm:p-5 text-slate-400">60 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">7.7 kW (32A max)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">5.5 hrs (30 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-slate-400">5.5 hrs (Capped at 32A)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$5.08</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Hyundai Ioniq 5 / Kia EV6</td>
                  <td className="p-4 sm:p-5 text-slate-400">77.4 / 84 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">10.9 kW (45.4A)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">7.2 hrs (28 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">5.0 hrs (38 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$6.55</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Ford F-150 Lightning ER</td>
                  <td className="p-4 sm:p-5 text-slate-400">131 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">19.2 kW (Dual 80A)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">12.0 hrs (14 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">8.0 hrs (21 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$11.10</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Rivian R1T / R1S Large Pack</td>
                  <td className="p-4 sm:p-5 text-slate-400">135 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">11.5 kW (48A)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">12.5 hrs (16 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">8.2 hrs (25 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$11.44</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">BMW i4 eDrive40</td>
                  <td className="p-4 sm:p-5 text-slate-400">81.5 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">11.0 kW (46A)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">7.4 hrs (28 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">5.2 hrs (40 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$6.90</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Chevrolet Equinox EV</td>
                  <td className="p-4 sm:p-5 text-slate-400">85 kWh</td>
                  <td className="p-4 sm:p-5 font-mono text-blue-400 font-bold">11.5 kW / Opt. 19.2 kW</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300">7.8 hrs (27 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">5.2 hrs (40 mph)</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-bold">$7.20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: The Homeowner's EVSE Installation Playbook */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Electrical Installation Playbook
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              The Homeowner&apos;s EVSE Installation Playbook: 4 Critical Steps
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Before calling an electrician or purchasing a Level 2 wall connector, follow this engineering checklist to ensure safe installation and avoid costly electrical panel upgrades. While traveling away from home, estimate overnight hospitality charging with our{' '}
              <Link href="/destination-charging" className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300 font-medium">
                hotel EV charger speed calculator
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase mb-3">
                <FileText className="w-4 h-4" /> Step 1: NEC 220 Panel Load Calculation
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Verify 100A vs 200A Main Service Capacity
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Calculate existing household continuous and non-continuous loads (HVAC compressor, electric range, water heater, dryer). A 100A main service may not support an additional 50A breaker without an expensive service upgrade. Evaluate panel breaker capacity with our{' '}
                <Link href="/panel-capacity" className="text-emerald-400 underline underline-offset-4 hover:text-emerald-300 font-semibold">
                  EV charger breaker size &amp; 100A panel capacity calculator
                </Link>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase mb-3">
                <Wrench className="w-4 h-4" /> Step 2: Hardwire vs Plug-in NEMA 14-50
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Hardwire for Max 48A Speed &amp; No GFCI Trips
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Plug-in chargers cap out at 40A on a 50A breaker and require expensive industrial GFCI breakers. Hardwiring directly to a 60A breaker unlocks full 48A (11.5 kW) output, runs cooler, and eliminates plug-connection failure points.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase mb-3">
                <Cpu className="w-4 h-4" /> Step 3: Smart EVEMS Load Shedders
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Avoid $4,000+ Panel Upgrades with Energy Management
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If your 100A panel is near capacity, install an Electric Vehicle Energy Management System (EVEMS) such as DCC-12, Wallbox Power Boost, or Emporia Vue. These devices throttle or pause EV charging when central A/C or electric ovens engage.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase mb-3">
                <PiggyBank className="w-4 h-4" /> Time-of-Use Tariff Schedulers
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Step 4: EV TOU Savings Calculator: Automate Super Off-Peak Charging Windows
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Enroll in your utility&apos;s special EV rate plan (such as PG&amp;E EV2-A, Duke Energy Off-Peak, or ConEd SmartCharge). Configure your vehicle or EVSE app to begin charging automatically during super off-peak hours to slash fueling costs by 65%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Technical Comparison Level 1 vs Level 2 */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Level 1 (120V) vs Level 2 (240V) Charging
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Comprehensive electrical, efficiency, and operational comparison between standard residential outlets and dedicated 240V circuits.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <caption className="sr-only">
              Technical Specifications: Level 1 120V vs Level 2 240V Charging Comparison
            </caption>
            <thead className="bg-[#0B0F17]">
              <tr>
                <th scope="col" className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Level 1 (Standard 120V Outlet)</span>
                  </div>
                </th>
                <th scope="col" className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/30 bg-emerald-950/10 relative">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                  <div className="flex flex-col">
                    <span className="text-lg">Level 2 (240V Dedicated Circuit)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">120V Single-Phase / 12A continuous (1.44 kW)</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">240V Split-Phase / 32A to 48A dedicated (7.7 to 11.5 kW)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Slow trickle (3 to 4 miles of range per hour)</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Rapid overnight replenishment (25 to 44 miles per hour)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Full charge: 36 to 60+ hours</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Full charge: 5 to 8 hours (Overnight complete)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Net Inverter Efficiency: 74% to 82% (High parasitic loss)</td>
                <td className="p-5 border-l border-slate-800/60 text-white font-medium bg-emerald-950/5">Net Inverter Efficiency: 89% to 94% (Minimal parasitic loss)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5 text-slate-400">Cannot complete session within off-peak windows</td>
                <td className="p-5 border-l border-slate-800/60 text-emerald-300 font-medium bg-emerald-950/5">
                  Easily fits 100% of charging in 12 AM&ndash;6 AM TOU super off-peak rate tiers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 6: Frequently Asked Questions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Authoritative guidance on residential 240V Level 2 EV charging, NEC breaker sizing, AC conversion efficiency, and Time-of-Use rate economics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                <PlugZap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How long does a 240V Level 2 charger take to charge an EV from 10% to 80%?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A standard 240V 32A (7.7 kW / NEMA 14-50) home charger adds 25 to 30 miles of range per hour, charging a typical 75 kWh battery from 10% to 80% in 6.5 to 7.5 hours. A 48A (11.5 kW) hardwired station completes the same session in 4.5 to 5 hours.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <ShieldCheck className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is the NEC 80% continuous load rule for EV home chargers?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Under National Electrical Code (NEC Article 625), electric vehicle charging is classified as a continuous load (lasting over 3 hours). The continuous current draw must never exceed 80% of the circuit breaker rating. A 50A breaker allows a maximum 40A continuous draw, a 40A breaker allows 32A, and a 60A breaker allows 48A.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Cpu className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why is 240V Level 2 charging more energy-efficient than 120V Level 1 charging?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Level 2 charging achieves 88% to 93% AC-to-DC conversion efficiency compared to only 74% to 82% on 120V Level 1. At 120V (1.4 kW), fixed parasitic loads (BMS computers, coolant pumps, inverter overhead) consume 250W to 350W continuously—wasting up to 25% of supplied power as heat.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <Wrench className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is the difference between a NEMA 14-50 plug-in charger and a hardwired 48A EVSE?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Plug-in NEMA 14-50 chargers plug into a 240V wall receptacle and are capped at 40A continuous (9.6 kW) on a 50A breaker. Hardwired chargers connect directly to conduit and can draw 48A continuous (11.5 kW) on a 60A breaker, providing 20% faster charging without nuisance GFCI tripping.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <PiggyBank className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How much money does off-peak Time-of-Use (TOU) home charging save per year?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Switching to a dedicated utility EV Time-of-Use (TOU) tariff (typically $0.07 to $0.14/kWh overnight vs $0.35 to $0.50/kWh peak) lowers the cost to fully recharge a 75 kWh battery to $6&ndash;$10, saving $1,200 to $2,200 annually compared to gasoline fueling.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 mt-0.5">
                <AlertTriangle className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why does my EV charge slower than the maximum kW rating of my home charger?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Charging speed is determined by the vehicle onboard AC-to-DC charger (OBC) bottleneck. If your vehicle has a 7.7 kW or 9.6 kW onboard inverter, it will draw a maximum of 32A or 40A, regardless of whether your wall EVSE is rated for 48A or 80A.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
