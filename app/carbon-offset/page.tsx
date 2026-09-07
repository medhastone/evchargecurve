import React from 'react';
import type { Metadata } from 'next';
import CarbonSavingsTool from '@/components/CarbonSavingsTool';
import StructuredData from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';
import { getToolMetadata } from '@/lib/seoConfig';
import { 
  Fuel, 
  Zap, 
  Leaf, 
  ShieldCheck, 
  TreePine, 
  Beaker, 
  Car,
  Factory,
  Globe2,
  Cpu,
  Sparkles,
  Info,
  Scale,
  Sun,
  Recycle,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';

export const metadata: Metadata = getToolMetadata('carbonOffset');

export default function CarbonOffsetPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Search Engine Pre-rendered JSON-LD Rich Snippet */}
      <StructuredData toolKey="carbonOffset" />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 md:pt-14 md:pb-10 text-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F17]/0 to-transparent pointer-events-none"></div>

        {/* Visual Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: 'CO2 Emissions Saved Calculator' }]} />

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-[0_0_15px_-3px_rgba(16,185,129,0.2)] relative z-10">
          <Leaf className="w-4 h-4" />
          <span>Argonne GREET &amp; EPA eGRID Well-to-Wheel (WTW) Lifecycle Accounting</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 relative z-10 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            EV CO2 Emissions Saved Calculator
          </span>{' '}
          &amp; Well-to-Wheel Offset
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed mb-8 relative z-10">
          Calculate real carbon dioxide reduction from switching to an electric vehicle using our <strong>electric car carbon footprint calculator</strong>. Models regional grid carbon intensity (g CO2/kWh), upstream petroleum extraction, and urban tree sequestration equivalents with our precise <strong>ev co2 emissions saved calculator</strong>.
        </p>

        {/* Engineering Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium relative z-10 mb-4">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Well-to-Wheel (WTW) Total Fuel Cycle</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <Factory className="w-4 h-4 text-cyan-400" />
            <span>Battery Manufacturing Carbon Payback</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
            <TreePine className="w-4 h-4 text-amber-400" />
            <span>EPA Urban Tree Sequestration Metrics</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Component Mounting */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-20">
        <CarbonSavingsTool />

        {/* Trust Banner */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm text-center">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Calculations incorporate EPA eGRID power plant emissions factors, 2,213 g/gal upstream petroleum refining overhead, and 12% AC-to-DC charging line losses.</span>
        </div>
      </section>

      {/* Section 1: How It Works - 3 Lifecycle Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Our Well-to-Wheel EV Emissions Tool Calculates Real Carbon Savings
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Generic green calculators falsely assume electric vehicles produce zero emissions while ignoring power grid generation. Our <strong>well to wheel ev emissions tool</strong> models the full lifecycle physics.
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
                <Fuel className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">1. Upstream Crude Refining</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Burning a gallon of gas emits 8,887g tailpipe CO2. Our <strong>ev vs gas co2 emissions calculator</strong> adds 2,213g/gal for drilling, flaring, pipeline transit, and refining (11,100g total WTW).
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
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">2. Power Grid Carbon Mix</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                An <strong>electric car carbon footprint calculator</strong> must localize where you charge. We model regional generation (hydro, nuclear, solar, gas, coal) plus 12% charging and line losses.
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
                <Leaf className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">3. Tangible Carbon Offsets</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                The <strong>ev co2 emissions saved calculator</strong> translates net atmospheric carbon reduction into real-world equivalents: avoided barrels of crude oil, urban tree-years, and coal burned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Deep Lifecycle Engineering & Climate Science Analysis */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Lifecycle Engineering &amp; Climate Science
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
              The Thermodynamic Science of EV Lifecycle Carbon Reduction
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Why does an electric vehicle consistently outperform an internal combustion vehicle in total lifecycle greenhouse gas emissions, even when charged on fossil-fueled electric grids?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Box 1: Thermodynamic Carnot Advantage */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                The Thermodynamic Efficiency Paradox
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Internal combustion engines (ICE) are strictly bounded by Carnot thermodynamic limits, wasting <strong className="text-rose-400">75% to 80% of fuel energy as radiant heat and friction</strong>. Only 20%–25% moves the vehicle forward.
              </p>
              <div className="bg-[#131B2A] rounded-xl p-3 text-center font-mono text-emerald-300 text-sm font-bold border border-slate-800 mb-3">
                &eta;<sub>EV Drivetrain</sub>: 85%&ndash;90% vs &eta;<sub>ICE Drivetrain</sub>: 20%&ndash;25%
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Even if electricity is produced by natural gas, large-scale industrial Combined-Cycle Gas Turbine (CCGT) power plants operate at <strong className="text-cyan-400">~60% thermal efficiency</strong>. Combining utility generation with electric motor efficiency results in far lower emissions per passenger-mile than thousands of small, inefficient car engines idling in traffic.
              </p>
            </div>

            {/* Box 2: Argonne GREET WTW Equation */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Beaker className="w-5 h-5 text-cyan-400" />
                Argonne GREET Mathematical Formulation
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">
                Our calculation engine implements the Argonne National Laboratory GREET (Greenhouse gases, Regulated Emissions, and Energy use in Technologies) lifecycle model:
              </p>
              <div className="space-y-2 bg-[#131B2A] rounded-xl p-3 font-mono text-xs border border-slate-800 mb-3">
                <div className="text-amber-300 font-semibold">
                  ICE WTW = ( 8,887g<sub>tailpipe</sub> + 2,213g<sub>upstream</sub> ) / MPG &times; Miles
                </div>
                <div className="text-cyan-300 font-semibold">
                  EV WTW = [ ( Wh/mi &times; Miles ) / ( &eta;<sub>charger</sub> &times; (1 - Loss<sub>grid</sub>) ) ] &times; CI<sub>grid</sub>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Where <code className="text-slate-300">CI<sub>grid</sub></code> is local power plant carbon intensity (g CO2/kWh), <code className="text-slate-300">&eta;<sub>charger</sub></code> is AC-to-DC conversion efficiency (88%), and <code className="text-slate-300">Loss<sub>grid</sub></code> accounts for 5.5% high-voltage transmission loss.
              </p>
            </div>
          </div>

          {/* Battery Manufacturing Debt & Payback Matrix */}
          <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Factory className="w-5 h-5 text-amber-400" />
              The Battery Manufacturing &quot;Carbon Debt&quot; Payback Equation
            </h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Manufacturing an EV battery creates an initial upfront &quot;embodied carbon debt&quot; from lithium mining, nickel/cobalt refining, and high-temperature cathode baking (typically <strong className="text-amber-300">65 to 90 kg CO2 per kWh of pack capacity</strong>). An average 75 kWh battery starts with ~5.0 metric tons of embodied carbon debt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">Clean Hydro/Solar Grid</div>
                <div className="text-emerald-400 font-bold text-base mb-1">7,000 &ndash; 9,500 Miles</div>
                <p className="text-slate-500 text-xs">Carbon debt paid off in under 8 months of average driving (e.g. Norway, Washington, California solar).</p>
              </div>
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">US National Average Grid</div>
                <div className="text-cyan-400 font-bold text-base mb-1">14,000 &ndash; 19,000 Miles</div>
                <p className="text-slate-500 text-xs">Carbon debt paid off in 13 to 16 months (e.g. mixed natural gas, nuclear, wind, and solar grid).</p>
              </div>
              <div className="bg-[#131B2A] border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 font-medium mb-1">Coal-Dominant Grid</div>
                <div className="text-amber-400 font-bold text-base mb-1">26,000 &ndash; 32,000 Miles</div>
                <p className="text-slate-500 text-xs">Carbon debt paid off in ~24 months. For the remaining 150,000+ miles of vehicle life, the EV produces net carbon savings.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Production EV vs Popular ICE Benchmark Matrix */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Production EV vs Popular ICE Lifecycle Carbon Benchmark Matrix
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            Annual greenhouse gas emissions comparison based on 15,000 annual driving miles and the average US electrical grid carbon intensity (370 g CO2/kWh).
          </p>
        </div>

        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0B0F17] border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-5 font-semibold text-slate-300">EV Model</th>
                  <th className="p-4 sm:p-5 font-semibold text-slate-300">Comparable ICE Vehicle (MPG)</th>
                  <th className="p-4 sm:p-5 font-semibold text-cyan-400">EV Annual Grid CO2</th>
                  <th className="p-4 sm:p-5 font-semibold text-amber-400">ICE WTW Annual CO2</th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-400">Net CO2 Saved / Year</th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-300">Trees Equivalent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Tesla Model Y Long Range</td>
                  <td className="p-4 sm:p-5 text-slate-400">Toyota RAV4 / Honda CR-V (28 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.68 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">5.95 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.27 Tons (72%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">194 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Tesla Model 3 RWD</td>
                  <td className="p-4 sm:p-5 text-slate-400">BMW 330i / Audi A4 (30 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.36 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">5.55 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.19 Tons (75%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">190 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Ford F-150 Lightning ER</td>
                  <td className="p-4 sm:p-5 text-slate-400">Ford F-150 V6 4WD EcoBoost (19 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">2.75 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">8.76 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">6.01 Tons (69%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">273 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Hyundai Ioniq 5 AWD</td>
                  <td className="p-4 sm:p-5 text-slate-400">Hyundai Tucson AWD (26 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.82 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">6.40 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.58 Tons (72%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">208 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Rivian R1T Dual-Motor</td>
                  <td className="p-4 sm:p-5 text-slate-400">Ram 1500 5.7L V8 Hemi (17 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">2.55 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">9.79 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">7.24 Tons (74%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">329 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">Chevrolet Equinox EV</td>
                  <td className="p-4 sm:p-5 text-slate-400">Chevy Equinox 1.5T AWD (27 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.75 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">6.17 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.42 Tons (72%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">201 Trees / yr</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">BMW i4 eDrive40</td>
                  <td className="p-4 sm:p-5 text-slate-400">BMW 430i Gran Coupe (28 MPG)</td>
                  <td className="p-4 sm:p-5 font-mono text-cyan-300 font-medium">1.62 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-amber-300 font-medium">5.95 Tons</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-400 font-bold">4.33 Tons (73%)</td>
                  <td className="p-4 sm:p-5 font-mono text-emerald-300 font-bold">197 Trees / yr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: The Clean Energy Driver's Decarbonization Playbook */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Decarbonization Driver Playbook
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              The Clean Energy Driver&apos;s Decarbonization Playbook: 4 Key Strategies
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Maximize your environmental impact and accelerate your vehicle&apos;s lifecycle carbon payback using these four proven operational strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strategy 1 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase mb-3">
                <Sun className="w-4 h-4" /> Strategy 1: Rooftop Solar Self-Consumption
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Zero-Carbon Home Generation
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your smart EVSE (such as Wallbox Pulsar with Eco-Smart or Tesla Solar Charging) to charge solely from excess daytime solar generation. This drops your operational footprint to <strong className="text-emerald-400">0.0 grams CO2/mile</strong>.
              </p>
            </div>

            {/* Strategy 2 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase mb-3">
                <Globe2 className="w-4 h-4" /> Strategy 2: Grid Clean-Hour Charging
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Automate Charging During Renewable Surpluses
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Use smart charging apps (like Optiwatt or Jedlix) that monitor real-time ISO grid carbon signals. In regions like Texas (ERCOT) or the Midwest (MISO), overnight wind generation drops grid emissions by up to 60% compared to evening peak hours.
              </p>
            </div>

            {/* Strategy 3 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase mb-3">
                <Scale className="w-4 h-4" /> Strategy 3: Right-Size Battery Capacity
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                Avoid Unnecessary Embodied Manufacturing Debt
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Purchasing an oversized 150+ kWh battery for a daily 30-mile commute increases upfront embodied manufacturing emissions by 5+ tons. Standard 60–80 kWh packs deliver optimal lifecycle balance for 95% of drivers.
              </p>
            </div>

            {/* Strategy 4 */}
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase mb-3">
                <Recycle className="w-4 h-4" /> Strategy 4: Closed-Loop Battery Recycling
              </div>
              <h4 className="font-bold text-white text-base mb-2">
                95%+ Mineral Recovery at End-of-Life
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Modern hydrometallurgical recycling facilities (like Redwood Materials and Li-Cycle) recover over 95% of lithium, cobalt, nickel, and copper from decommissioned packs, avoiding virgin mining emissions for subsequent EV generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Technical Comparison: Generic vs WTW Engine */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Technical Specifications: Full-Cycle Carbon Comparison
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Comparing standard generic online tools against our verified <strong>well to wheel ev emissions tool</strong>.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#131B2A] shadow-2xl">
          <table className="w-full text-left text-sm md:text-base">
            <thead className="bg-[#0B0F17]">
              <tr>
                <th className="p-5 font-semibold text-slate-400 w-1/2 border-b border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-300">Generic Online Calculators (Flawed)</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-emerald-400 w-1/2 border-b border-emerald-500/50 bg-emerald-950/10 relative shadow-[inset_0_2px_10px_-5px_rgba(16,185,129,0.3)] border-t border-t-emerald-500/30">
                  <div className="flex flex-col relative z-10">
                    <span className="text-lg text-emerald-400">EVChargeCurve Lifecycle Engine</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Tailpipe only (Falsely claims EV is 0 g CO2 everywhere)</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Full Well-to-Wheel (WTW) lifecycle fuel and electrical generation analysis</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Static national average with no regional grid options</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Selectable regional grid carbon intensities (0 to 650 g CO2/kWh)</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Ignores refinery energy (assumes 0 upstream emissions)</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Includes 2,213 g/gal upstream extraction and refining overhead via our <strong>ev vs gas co2 emissions calculator</strong></td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5">Assumes 100% charger efficiency and 0 transmission loss</td>
                <td className="p-5 border-l border-emerald-500/20 text-white font-medium bg-emerald-950/5">Models 12% thermal rectification losses and 5.5% high-voltage grid transmission drop</td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition-colors">
                <td className="p-5 text-slate-400">Uncited rough estimates</td>
                <td className="p-5 border-l border-emerald-500/20 text-emerald-300 font-medium bg-emerald-950/5">
                  Calibrated to EPA eGRID, Argonne GREET, DESNZ, and Ember climate datasets within this <strong>ev co2 emissions saved calculator</strong>
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
            Authoritative guidance on electric vehicle lifecycle emissions, Well-to-Wheel accounting, battery manufacturing payback periods, and grid decarbonization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ 1 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Zap className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                Why is an electric vehicle cleaner than gasoline even when charged on a coal or natural gas grid?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Electric drivetrains convert 85% to 90% of electrical energy into wheel propulsion, compared to internal combustion engines (ICE) which waste 75% to 80% of fuel energy as lost heat. Furthermore, large industrial combined-cycle power plants generate power at ~60% thermodynamic efficiency, making an EV 30% to 45% cleaner even on fossil-heavy grids.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <Fuel className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                What is the Well-to-Wheel (WTW) carbon footprint of burning a gallon of gasoline?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Burning a single gallon of gasoline emits 8,887 grams of tailpipe CO2 (Tank-to-Wheel). However, crude oil drilling, flaring, pipeline transit, distillation, and tanker distribution add an additional 2,213 grams of upstream emissions (Well-to-Tank), bringing the true Well-to-Wheel footprint to 11,100 grams (24.5 lbs) of CO2 per gallon.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                <Factory className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How many miles does it take for an EV to offset its battery manufacturing carbon debt?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Producing an EV battery emits approximately 65 to 90 kg of CO2 per kWh of pack capacity. On an average electrical grid, an EV completely repays its manufacturing carbon debt within 14,000 to 22,000 miles (12 to 18 months of driving). On clean renewable or solar grids, payback occurs in under 8,000 miles.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mt-0.5">
                <Globe2 className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How does regional electric grid carbon intensity (g CO2/kWh) affect EV lifecycle emissions?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Grid carbon intensity varies from under 25 g CO2/kWh in clean regions (Norway, France, Washington State) to ~370 g/kWh on the average US grid and over 600 g/kWh in coal-heavy regions. In clean-energy regions, driving an EV eliminates over 92% of operational lifecycle greenhouse gas emissions.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                <TreePine className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How many mature trees planted is equivalent to the annual CO2 savings of driving an EV?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Driving an EV 15,000 miles annually instead of a 28 mpg gasoline car prevents roughly 4.1 metric tons (9,040 lbs) of Well-to-Wheel CO2 from entering the atmosphere. Because an average mature tree absorbs approximately 48 lbs (22 kg) of CO2 per year, this is equivalent to planting 180 to 200 mature trees annually.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-0.5">
                <Sun className="w-5 h-5 shrink-0" />
              </div>
              <h3 className="font-semibold text-white text-lg">
                How does charging an EV from rooftop solar or off-peak green power affect carbon emissions?
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Charging directly from home rooftop solar or through a 100% certified green utility tariff reduces operational Well-to-Wheel emissions to 0 grams of CO2 per mile. This maximizes emissions reductions and accelerates the battery manufacturing payback period to under 10 months.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

