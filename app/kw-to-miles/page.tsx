import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import KwToMilesCalculator from './Calculator';
import Breadcrumb from '@/components/Breadcrumb';
import { 
  ShieldCheck, 
  Zap, 
  Gauge, 
  Clock, 
  Flame, 
  ArrowRight, 
  Layers, 
  Cpu, 
  BatteryCharging, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Car,
  Compass,
  Scale,
  ThermometerSnowflake,
  Fuel
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'EV Charging Speed Calculator: kW to Miles & Km per Hour',
  description: 'Convert EV charging power (kW) to driving range added per hour. Calculate exact miles per hour (mph) and km/h across AC Level 1, Level 2, and DC fast chargers.',
  alternates: {
    canonical: 'https://evchargecurve.com/kw-to-miles',
  },
  openGraph: {
    title: 'EV Charging Speed Calculator – kW to Miles & Km/hr',
    description: 'Calculate true range replenishment rates from 1.4 kW trickle outlets to 350 kW ultra-fast chargers. Factors onboard inverter efficiency and vehicle drag.',
    url: 'https://evchargecurve.com/kw-to-miles',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EV Charging Speed Calculator – kW to Miles & Km/hr',
    description: 'Calculate true range replenishment rates from 1.4 kW trickle outlets to 350 kW ultra-fast chargers. Factors onboard inverter efficiency and vehicle drag.',
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "EV Charging Speed Calculator",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All (Web Browser)",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Physics-grounded EV charging speed calculator converting kilowatts (kW) into real-world miles and kilometers recovered per hour."
    },
    {
      "@type": "HowTo",
      "name": "How to calculate EV range added per hour from charging kW",
      "description": "Step-by-step process to convert electric vehicle charging station kilowatts into miles or kilometers per hour of driving range.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Identify Effective Charging Power",
          "text": "Determine station power output (kW) and clamp it to the vehicle's onboard charger (OBC) maximum rating for AC Level 2 charging."
        },
        {
          "@type": "HowToStep",
          "name": "Deduct Thermal and Inverter Conversion Losses",
          "text": "Apply real-world rectification efficiency factors (88% to 92% for AC charging, or 96% for direct-to-pack DC fast charging) to find net kilowatt-hours delivered to the battery cells."
        },
        {
          "@type": "HowToStep",
          "name": "Divide Net Energy by Aerodynamic Consumption",
          "text": "Divide net kilowatt-hours delivered per hour by the vehicle consumption rate (Wh/mi or Wh/km) to reveal true miles per hour (mph) or km/h recovered."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many miles per hour does a 7kW charger add to an electric car?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 7.7 kW (240V, 32A) Level 2 home charger adds approximately 22 to 32 miles of driving range per hour of charging. Highly aerodynamic sedans like the Tesla Model 3 RWD gain around 29 to 32 miles per hour, compact electric SUVs like the Model Y and Ioniq 5 recover 24 to 28 miles per hour, while heavier electric pickups like the Rivian R1T and Ford F-150 Lightning add roughly 15 to 17 miles per hour due to higher rolling resistance and aerodynamic drag."
          }
        },
        {
          "@type": "Question",
          "name": "How many miles per hour does an 11kW charger add?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An 11.5 kW (240V, 48A hardwired) Level 2 home wallbox adds between 34 and 48 miles of range per hour, provided your vehicle's onboard charger (OBC) supports 11.5 kW or higher (such as the Tesla Model Y, BMW i4, or Porsche Taycan). If plugged into an EV with an OBC limited to 7.7 kW (such as a standard single-phase Model 3 or Chevy Bolt), the car will automatically clamp intake to 7.7 kW, recovering around 28 miles per hour."
          }
        },
        {
          "@type": "Question",
          "name": "Why does my EV charge slower than the maximum kW advertised on the charging station?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There are three primary reasons for charging speeds below advertised station nameplates: 1) Vehicle Hardware Ceilings: For AC charging, the vehicle's onboard inverter (OBC) caps power intake regardless of station capability (e.g., an 11 kW car on a 22 kW post only charges at 11 kW). 2) Commercial Line Voltage Drops: Commercial and hotel Level 2 chargers typically run on 208V three-phase commercial power rather than 240V residential split-phase, cutting a 32A charger from 7.7 kW to 6.6 kW. 3) DCFC Thermal Tapering & Cold Pack: DC fast chargers taper current as the battery state of charge (SoC) exceeds 50% to prevent lithium plating, and cold batteries charge significantly slower until preconditioned."
          }
        },
        {
          "@type": "Question",
          "name": "How fast does a 50kW vs 150kW vs 350kW DC fast charger add range?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 50 kW urban DC fast charger adds roughly 2.8 to 3.5 miles of range per minute (around 28 to 35 miles in a 10-minute rest stop). A 150 kW highway charger delivers 8.5 to 11.0 miles per minute (85 to 110 miles in 10 minutes) during its 10% to 50% SoC peak window. A 350 kW ultra-fast 800V charger (compatible with Hyundai E-GMP, Porsche Taycan, and Lucid Air) delivers 16 to 22 miles per minute at peak, recovering 160 to 220 miles in just 10 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Does cold weather reduce the miles added per hour of charging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, through two distinct mechanisms. First, cold temperatures increase internal cell impedance; if the battery is not preconditioned, the vehicle Battery Management System (BMS) severely throttles DC charge current while diverting up to 5 kW to 7 kW of incoming electrical power purely to activate high-voltage PTC or heat pump pack heaters. Second, winter driving consumes 20% to 35% more energy per mile due to cold air density and cabin heating, meaning every net kilowatt-hour recovered yields fewer real-world miles."
          }
        },
        {
          "@type": "Question",
          "name": "How do I convert kW to kWh when calculating EV charging time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Kilowatts (kW) represent the instantaneous rate of electrical power flow (speed), while kilowatt-hours (kWh) represent the total volume of energy stored in the battery pack (capacity). The conversion equation is Energy (kWh) = Power (kW) × Time (hours) × Efficiency (η). To calculate charging duration, divide the energy needed in kWh by the effective charging power in kW."
          }
        }
      ]
    }
  ]
};

export default function KwToMilesPage() {
  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#0B0F17] pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="max-w-4xl">
            {/* Breadcrumb navigation */}
            <Breadcrumb
              items={[
                { label: 'Calculators', href: '/' },
                { label: 'kW to Miles Charging Speed Calculator' }
              ]}
              className="justify-start mb-4"
            />

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.15]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                EV Charging Speed Calculator
              </span>{' '}
              <span className="text-white">: kW to Miles &amp; Km Per Hour Estimator</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Convert charging station power output into real-world driving range. Our{' '}
              <strong>ev charging speed calculator kw to miles</strong> models onboard AC-to-DC conversion efficiency, vehicle aerodynamic consumption (Wh/mi or Wh/km), and battery thermal limits to calculate exact miles and kilometers recovered per hour across Level 1, Level 2, and high-speed DC fast chargers.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AC-to-DC Rectification Loss Adjusted (88%–93%)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Onboard Charger (OBC) Bottleneck Detection
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                <Gauge className="w-3.5 h-3.5 text-amber-400" /> Dual Imperial (mph) &amp; Metric (km/h) Precision
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Client-Side Physics Simulation
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Tool Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <KwToMilesCalculator />
        </section>

        {/* Section B: Step-by-Step Workflow (3 Cards with Watermark Numbers) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How Our kW to Miles Per Hour Charging Calculator Computes Range
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Unlike generic calculators that multiply kW by an arbitrary number, our telemetry physics engine models the three-stage electrical transformation from the electrical grid to the highway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="absolute top-3 right-4 text-6xl font-black text-slate-800/40 select-none font-mono group-hover:text-emerald-500/10 transition-colors">
                01
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Gross Power to Net Pack Energy
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                When plugged into AC power, alternating current must pass through the vehicle onboard charger (OBC) to become direct current (DC). This conversion produces thermal dissipation and powers parasitic cooling loops, causing an 8% to 12% loss:
              </p>
              <div className="mt-4 p-2.5 bg-[#0B0F17] rounded-lg border border-slate-800 font-mono text-xs text-emerald-400">
                P_net = P_charger × η_conversion
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="absolute top-3 right-4 text-6xl font-black text-slate-800/40 select-none font-mono group-hover:text-cyan-500/10 transition-colors">
                02
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Hardware Bottleneck Clamping
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                An EV cannot take in more AC power than its physical OBC silicon is rated for. Connecting a car with an 11.0 kW inverter to a 22 kW European commercial destination post clamps throughput to 11.0 kW. Our engine automatically checks vehicle hardware ceilings:
              </p>
              <div className="mt-4 p-2.5 bg-[#0B0F17] rounded-lg border border-slate-800 font-mono text-xs text-cyan-400">
                P_effective = min(P_charger, OBC_cap)
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
              <div className="absolute top-3 right-4 text-6xl font-black text-slate-800/40 select-none font-mono group-hover:text-amber-500/10 transition-colors">
                03
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Aerodynamic Range Translation
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A kilowatt-hour provides vastly different distances across vehicle shapes. By dividing net delivered electrical energy by the real-world consumption rate (Wh/mi or Wh/km), our <strong>kw to miles per hour charging calculator</strong> outputs exact range replenishment velocity:
              </p>
              <div className="mt-4 p-2.5 bg-[#0B0F17] rounded-lg border border-slate-800 font-mono text-xs text-amber-400">
                Miles/hr = (P_effective × 1000 × η) / Wh_per_mile
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Electrical Engineering & Mathematical Formulations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Scale className="w-3.5 h-3.5 text-emerald-400" /> Engineering Specifications
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Charging Rate kW to Km Per Hour: The Mathematical Formulation
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Use these first-principles equations to calculate precise range replenishment rates across any charging station power level.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Formula 1: Imperial mph */}
              <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  1. Range Added per Hour (Imperial)
                </div>
                <div className="bg-[#131B2A] p-3.5 rounded-lg font-mono text-sm text-white border border-slate-800 mb-3 overflow-x-auto">
                  Range Rate (mph) = <span className="text-emerald-400">(P_eff × 1,000 × η)</span> / Wh_per_mile
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Where <code className="text-slate-200 font-mono">P_eff</code> is effective power in kW, <code className="text-slate-200 font-mono">η ≈ 0.90</code> for Level 2 AC (or 0.80 for Level 1), and <code className="text-slate-200 font-mono">Wh_per_mile</code> represents total vehicle driving energy consumption.
                </p>
              </div>

              {/* Formula 2: Metric km/h */}
              <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  2. Range Added per Hour (Metric)
                </div>
                <div className="bg-[#131B2A] p-3.5 rounded-lg font-mono text-sm text-white border border-slate-800 mb-3 overflow-x-auto">
                  Range Rate (km/h) = <span className="text-cyan-400">(P_eff × 1,000 × η)</span> / Wh_per_km
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Alternatively, when using <code className="text-slate-200 font-mono">kWh/100km</code>, the formula becomes <code className="text-slate-200 font-mono">(P_eff × 100 × η) / (kWh_per_100km)</code>, providing rapid conversion for European and Australian drivers.
                </p>
              </div>

              {/* Formula 3: DC Fast Charging Pace */}
              <div className="bg-[#0B0F17] border border-slate-800 rounded-xl p-5">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  3. DC Fast Charger kW to Miles per Minute
                </div>
                <div className="bg-[#131B2A] p-3.5 rounded-lg font-mono text-sm text-white border border-slate-800 mb-3 overflow-x-auto">
                  DC Rate (mi/min) = <span className="text-amber-400">(P_DCFC × 1,000 × η_DC)</span> / (60 × Wh/mi)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct current fast charging bypasses the onboard inverter (<code className="text-slate-200 font-mono">η_DC ≈ 0.96</code>). A 150 kW charger powering a 270 Wh/mi vehicle adds ~8.9 miles for every single minute plugged in.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section D: Production EV kW to Range Benchmark Matrix */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  EV Charging Speed kW to Range Calculator: Popular EVs Compared
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Theoretical and net range added per hour across standardized residential and commercial charging hardware tiers.
                </p>
              </div>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 shrink-0">
                AC Level 2 @ 90% η | DCFC @ 96% η
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" aria-label="EV charging speed benchmark matrix">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0B0F17]/70 text-xs font-bold uppercase tracking-wider text-slate-300">
                    <th scope="col" className="p-4 rounded-tl-xl">Vehicle Model</th>
                    <th scope="col" className="p-4">Efficiency</th>
                    <th scope="col" className="p-4 text-emerald-400">7.7 kW (32A Home)</th>
                    <th scope="col" className="p-4 text-teal-300">11.5 kW (48A Home)</th>
                    <th scope="col" className="p-4 text-cyan-400">22 kW (Commercial AC)</th>
                    <th scope="col" className="p-4 text-amber-400">150 kW (DC Fast)</th>
                    <th scope="col" className="p-4 text-purple-400 rounded-tr-xl">350 kW (800V Peak)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {/* Row 1: Model 3 */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Tesla Model 3 RWD</td>
                    <td className="p-4 text-slate-400 font-mono">240 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+29 mph (46 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">
                      +29 mph <span className="text-[10px] text-amber-400 font-normal">(7.7kW cap)*</span>
                    </td>
                    <td className="p-4 text-cyan-400">
                      +29 mph <span className="text-[10px] text-amber-400 font-normal">(OBC cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+510 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+570 mph (170 kW cap)</td>
                  </tr>

                  {/* Row 2: Model Y */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Tesla Model Y Long Range</td>
                    <td className="p-4 text-slate-400 font-mono">270 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+26 mph (41 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">+38 mph (62 km/h)</td>
                    <td className="p-4 text-cyan-400">
                      +38 mph <span className="text-[10px] text-amber-400 font-normal">(11.5kW cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+450 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+750 mph (250 kW cap)</td>
                  </tr>

                  {/* Row 3: Ioniq 5 / EV6 */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Hyundai Ioniq 5 / Kia EV6</td>
                    <td className="p-4 text-slate-400 font-mono">300 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+23 mph (37 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">
                      +33 mph <span className="text-[10px] text-amber-400 font-normal">(10.9kW cap)*</span>
                    </td>
                    <td className="p-4 text-cyan-400">
                      +33 mph <span className="text-[10px] text-amber-400 font-normal">(10.9kW cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+410 mph</td>
                    <td className="p-4 text-purple-400 font-bold text-emerald-400">+720 mph (235 kW peak)</td>
                  </tr>

                  {/* Row 4: BMW i4 */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">BMW i4 eDrive40</td>
                    <td className="p-4 text-slate-400 font-mono">280 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+25 mph (40 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">+37 mph (60 km/h)</td>
                    <td className="p-4 text-cyan-400">
                      +37 mph <span className="text-[10px] text-amber-400 font-normal">(11kW cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+440 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+600 mph (205 kW cap)</td>
                  </tr>

                  {/* Row 5: Mach-E */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Ford Mustang Mach-E ER</td>
                    <td className="p-4 text-slate-400 font-mono">340 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+20 mph (33 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">
                      +28 mph <span className="text-[10px] text-amber-400 font-normal">(10.5kW cap)*</span>
                    </td>
                    <td className="p-4 text-cyan-400">
                      +28 mph <span className="text-[10px] text-amber-400 font-normal">(10.5kW cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+360 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+360 mph (150 kW cap)</td>
                  </tr>

                  {/* Row 6: Rivian R1T */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Rivian R1T Dual-Motor</td>
                    <td className="p-4 text-slate-400 font-mono">440 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+16 mph (25 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">+24 mph (38 km/h)</td>
                    <td className="p-4 text-cyan-400">
                      +24 mph <span className="text-[10px] text-amber-400 font-normal">(11.5kW cap)*</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+280 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+410 mph (220 kW cap)</td>
                  </tr>

                  {/* Row 7: F-150 Lightning */}
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4 font-bold text-white">Ford F-150 Lightning Extended</td>
                    <td className="p-4 text-slate-400 font-mono">480 Wh/mi</td>
                    <td className="p-4 text-emerald-400 font-bold">+14 mph (23 km/h)</td>
                    <td className="p-4 text-teal-300 font-bold">+22 mph (35 km/h)</td>
                    <td className="p-4 text-cyan-400">
                      +36 mph <span className="text-[10px] text-emerald-400 font-normal">(19.2kW dual OBC)</span>
                    </td>
                    <td className="p-4 text-amber-400 font-semibold">+260 mph</td>
                    <td className="p-4 text-purple-400 font-semibold">+330 mph (180 kW cap)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
              * Note: Values marked with OBC cap indicate that the vehicle onboard inverter acts as a bottleneck, rejecting power above its rated capacity. For high-speed DC fast charging, theoretical hourly velocities assume peak intake; in practice, the vehicle BMS tapers power significantly above 50% State of Charge.
            </p>
          </div>
        </section>

        {/* Section E: Charging Velocity Playbook: 4 Key Truths Behind Real-World Speeds */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Charging Velocity Playbook: 4 Key Truths Behind Real-World Speeds
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Why your electric car frequently charges at different speeds than advertised on public chargers or window stickers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Truth 1 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-bold text-white">The Onboard Charger (OBC) Ceiling</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Every electric car carries an onboard AC-to-DC inverter. When you plug into an AC Level 2 charger, the charging post is essentially a smart safety relay—the actual charger lives inside your car. If you plug a vehicle equipped with an 11 kW inverter into a 22 kW destination post, your car will strictly consume 11 kW. Only rare EVs (such as the Lucid Air or Ford Charge Station Pro on the F-150 Lightning) support 19.2 kW residential AC.
              </p>
              <div className="text-xs text-slate-400 bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                Compare your home setup with our{' '}
                <Link href="/home-charging" className="text-emerald-400 hover:text-emerald-300 underline font-semibold">
                  EV home charging time calculator 240V
                </Link>
                .
              </div>
            </div>

            {/* Truth 2 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-bold text-white">The 208V Commercial Penalty</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                While North American residential electrical panels deliver 240V split-phase power, commercial parking garages, hotels, and retail centers operate on 208V three-phase electrical supply. At the same 32-amp current, residential charging yields <strong>7.68 kW (240V × 32A)</strong>, whereas commercial destination charging only produces <strong>6.65 kW (208V × 32A)</strong>—a 13.5% drop in range added per hour.
              </p>
              <div className="text-xs text-slate-400 bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                Planning an overnight trip? Use our{' '}
                <Link href="/destination-charging" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">
                  hotel EV charger speed calculator
                </Link>{' '}
                to account for commercial line voltage drops.
              </div>
            </div>

            {/* Truth 3 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  3
                </div>
                <h3 className="text-lg font-bold text-white">DCFC Thermal Curve Tapering</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                No electric car sustains its peak advertised DC fast-charging rate for an entire session. An EV rated for 250 kW typically achieves peak speed only between 10% and 35% SoC. As cell voltages near 4.2V and internal pack temperatures rise, the BMS gradually throttles current down to 75 kW at 70% SoC and 35 kW at 85% SoC to prevent dendritic lithium plating.
              </p>
              <div className="text-xs text-slate-400 bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                Simulate real vehicle-specific BMS drop-off curves with our interactive{' '}
                <Link href="/" className="text-emerald-400 hover:text-emerald-300 underline font-semibold">
                  DC fast charging curve calculator
                </Link>
                .
              </div>
            </div>

            {/* Truth 4 */}
            <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-sm">
                  4
                </div>
                <h3 className="text-lg font-bold text-white">Highway Speed vs. Charging Range</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Charging speed (kW) measures energy flow, but real range recovery depends on driving velocity. Aerodynamic drag scales quadratically with speed: driving at 75 mph consumes 18% to 25% more Wh/mi than driving at 65 mph. Consequently, an hour on an 11 kW charger adds 38 miles of 65 mph driving, but only 31 miles of 80 mph interstate cruising.
              </p>
              <div className="text-xs text-slate-400 bg-[#0B0F17] p-3 rounded-lg border border-slate-800">
                Model real winter drag and high-speed energy penalties with our{' '}
                <Link href="/range-loss" className="text-purple-400 hover:text-purple-300 underline font-semibold">
                  cold weather range loss &amp; highway towing estimator
                </Link>
                .
              </div>
            </div>
          </div>
        </section>

        {/* Section F: Contextual Cross-Tool Hub */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-r from-slate-900 via-[#131B2A] to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Explore Our Comprehensive EV Telemetry &amp; Physics Suite
            </h2>
            <p className="text-slate-400 text-sm mb-6 max-w-2xl">
              Cross-reference charging power, electrical panel sizing, degradation forecasting, and real-world ownership economics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/home-charging"
                className="p-4 rounded-xl bg-[#0B0F17]/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  Home Charging Speed
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Calculate 240V Level 2 charge time, NEMA outlets, and TOU savings.
                </p>
              </Link>

              <Link
                href="/panel-capacity"
                className="p-4 rounded-xl bg-[#0B0F17]/80 border border-slate-800 hover:border-cyan-500/40 transition-all group"
              >
                <div className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                  Breaker &amp; Panel Sizer
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  NEC 80% continuous load rules &amp; 100A vs 200A main service checks.
                </p>
              </Link>

              <Link
                href="/ev-charging-cost"
                className="p-4 rounded-xl bg-[#0B0F17]/80 border border-slate-800 hover:border-teal-500/40 transition-all group"
              >
                <div className="font-bold text-white text-sm group-hover:text-teal-400 transition-colors flex items-center justify-between">
                  Cost Per Mile Estimator
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Universal session cost and gas displacement calculator across 6 currencies.
                </p>
              </Link>

              <Link
                href="/tco-calculator"
                className="p-4 rounded-xl bg-[#0B0F17]/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                  EV vs Gas 5-Year TCO
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Model purchase financing, tire wear, tax credits, and break-even miles.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Section G: Authoritative FAQ Accordion (6 High-Intent Questions) */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions: kW to Miles &amp; Km Charging
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Engineering answers to the most common questions regarding charging speed, inverter caps, and range recovery.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                How many miles per hour does a 7kW charger add to an electric car?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                A 7.7 kW (240V, 32A) Level 2 charger adds between <strong>22 and 32 miles of range per hour</strong>. Highly aerodynamic electric sedans like the Tesla Model 3 RWD gain approximately 29 to 32 miles per hour. Popular crossover SUVs like the Tesla Model Y and Hyundai Ioniq 5 gain 24 to 28 miles per hour. Heavy electric pickup trucks (such as the Rivian R1T and Ford F-150 Lightning) recover roughly 15 to 17 miles per hour due to higher aerodynamic drag and rolling resistance.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                How many miles per hour does an 11kW charger add?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                An 11.5 kW (240V, 48A hardwired) home wallbox adds between <strong>34 and 48 miles of range per hour</strong>, provided your vehicle is equipped with an onboard charger (OBC) rated for 11.5 kW or higher (standard on the Tesla Model Y Long Range, BMW i4, and Porsche Taycan). If your vehicle is limited to a 7.7 kW OBC (such as the single-phase Model 3 or Chevy Bolt EV), the car automatically caps power intake to 7.7 kW, recovering around 28 miles per hour.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                Why does my EV charge slower than the maximum kW advertised on the charging station?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                Three physical factors limit real-world charging speed:
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                  <li><strong>Vehicle Onboard Charger Limits:</strong> On AC chargers, your vehicle internal inverter dictates the maximum power intake (e.g. plugging an 11 kW vehicle into a 22 kW commercial post delivers only 11 kW).</li>
                  <li><strong>Commercial Line Voltage:</strong> Hotels and commercial facilities use 208V three-phase lines instead of residential 240V, reducing a 32A charger from 7.7 kW down to 6.6 kW.</li>
                  <li><strong>Battery State of Charge &amp; Temperature:</strong> On DC fast chargers, the BMS restricts current to protect cell chemistry once the pack exceeds 50% to 60% SoC, or when the pack is too cold.</li>
                </ul>
              </div>
            </details>

            {/* FAQ 4 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                How fast does a 50kW vs 150kW vs 350kW DC fast charger add range?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                During optimal 10% to 50% State of Charge charging conditions:
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
                  <li><strong>50 kW DC Fast:</strong> Adds approximately <strong>2.8 to 3.5 miles per minute</strong> (~30 miles in a 10-minute stop).</li>
                  <li><strong>150 kW DC Fast:</strong> Adds approximately <strong>8.5 to 11 miles per minute</strong> (~85 to 110 miles in 10 minutes).</li>
                  <li><strong>350 kW 800V DC Fast:</strong> On compatible 800V architectures (Hyundai Ioniq 5, Kia EV6, Porsche Taycan, Lucid Air), adds <strong>16 to 22 miles per minute</strong>, recovering up to 200 miles in just 10 minutes.</li>
                </ul>
              </div>
            </details>

            {/* FAQ 5 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                Does cold weather reduce the miles added per hour of charging?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                Yes. Below 40°F (5°C), battery electrolyte viscosity increases, creating higher internal resistance. The BMS severely restricts fast-charging current until cells warm up, diverting 4 to 7 kW of incoming power to high-voltage battery heaters. Furthermore, winter driving requires 20% to 35% more energy per mile due to dense air and cabin climate control, meaning each kilowatt-hour stored yields fewer driving miles. Precondition your battery using your navigation system before arriving at high-speed chargers.
              </div>
            </details>

            {/* FAQ 6 */}
            <details className="group bg-[#131B2A] border border-slate-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-white text-base">
                How do I convert kW to kWh when calculating EV charging time?
                <span className="text-emerald-400 transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                Kilowatts (kW) indicate instantaneous electrical power (how fast energy moves), whereas kilowatt-hours (kWh) denote volume (the battery tank size). To calculate total energy delivered:
                <div className="my-2 p-3 bg-[#0B0F17] rounded font-mono text-xs text-emerald-400 border border-slate-800">
                  Energy Stored (kWh) = Charging Power (kW) × Time (hours) × Efficiency (η)
                </div>
                For example, charging at 7.7 kW for 5 hours at 90% AC efficiency delivers: 7.7 × 5 × 0.90 = <strong>34.65 kWh</strong>.
              </div>
            </details>
          </div>
        </section>

        {/* Section H: Bottom Action Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-950/60 via-[#131B2A] to-slate-900 border border-emerald-500/30 rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Master Your EV Charging Speeds &amp; Travel Economics
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Accurate range calculations empower you to plan faster road trips, optimize home charging schedules, and eliminate range anxiety across every highway stop.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-900/40"
                >
                  Simulate DC Fast Charging Curves
                </Link>
                <Link
                  href="/home-charging"
                  className="px-5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-200 font-bold text-sm hover:bg-slate-700 transition-all"
                >
                  Size 240V Home Breakers
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
