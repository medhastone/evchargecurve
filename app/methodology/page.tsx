import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ChevronRight, 
  Calculator, 
  ThermometerSnowflake, 
  BatteryWarning, 
  Database, 
  ShieldCheck,
  Scale
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculation Methodology & Battery Testing Standards',
  description: 'How EVChargeCurve calculates piecewise charging curves, winter range degradation, and lithium-ion cycle fade without marketing bias.',
};

export default function MethodologyPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen">
      {/* Header / Hero */}
      <div className="bg-slate-900 border-b border-slate-800 pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B0F17]/0 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-300">Methodology</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <Scale className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Methodology & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Standards</span>
            </h1>
          </div>
          <p className="text-xl text-slate-400 leading-relaxed">
            How we calculate piecewise charging curves, winter range degradation, and lithium-ion cycle fade without marketing bias.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Section 1: DC Fast Charge Numerical Step Integration */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Calculator className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. DC Fast Charge Numerical Step Integration</h2>
          </header>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-slate-300 leading-relaxed mb-6">
              Automaker marketing frequently advertises a "peak charging speed" (e.g., 250 kW) or a flat "10% to 80% in X minutes." These figures are often achieved under idealized conditions and fail to represent the physical realities of thermal throttling and voltage step-downs. Flat average kW ratings are fundamentally misleading due to strict C-rate caps and internal cell impedance rise that occurs past 80% State of Charge (SoC).
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              To provide accurate, real-world estimates, EVChargeCurve utilizes a piecewise numerical step integration across the vehicle's established empirical charge curve. We calculate the theoretical session duration ($\Delta t$) by discretizing the charge session into granular state-of-charge intervals ($\Delta s_i$):
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6 flex justify-center overflow-x-auto text-lg font-serif tracking-wider text-slate-200">
              <div className="whitespace-nowrap">
                Δt = Σ [ (C · Δsᵢ) / min(P(sᵢ), P<sub className="text-sm">charger</sub>) ]
              </div>
            </div>
            <ul className="text-slate-400 space-y-2 list-disc pl-5">
              <li><strong>C</strong>: Nominal usable battery capacity (kWh).</li>
              <li><strong>Δsᵢ</strong>: Fractional step in state of charge (e.g., 1%).</li>
              <li><strong>P(sᵢ)</strong>: The vehicle's maximum accepted power at SoC step <em>i</em> based on its empirical curve.</li>
              <li><strong>P<sub className="text-sm">charger</sub></strong>: The hardware limit of the DC fast charging station.</li>
            </ul>
          </div>
        </section>

        {/* Section 2: Low-Temperature Throttling & Preconditioning Modeling */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <ThermometerSnowflake className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. Low-Temperature Throttling & Preconditioning Modeling</h2>
          </header>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-slate-300 leading-relaxed mb-6">
              Charging a cold lithium-ion battery at high C-rates presents a severe chemical risk: <strong>lithium plating</strong>. When the electrolyte is cold, lithium ions cannot intercalate into the graphite anode fast enough. Instead, they deposit as metallic lithium on the anode surface, permanently destroying capacity and creating dangerous dendrites.
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              To protect the pack, Battery Management Systems (BMS) strictly throttle charge acceptance until the pack reaches optimal operating temperatures (typically ~25°C to 35°C). For our "Cold / No Preconditioning" simulations, we apply a dynamic thermal penalty model:
            </p>
            <div className="bg-slate-800/30 border border-cyan-500/20 rounded-xl p-5 mb-6">
              <p className="text-cyan-100/80 m-0">
                <strong>The Cold-Gate Penalty:</strong> A 40–45% power throttle is applied over the initial 10% to 15% charge interval. This mathematically models the time required for the vehicle's thermal management system (or the ohmic heat of charging itself) to ramp the cell temperatures up to a safe threshold where the nominal charging curve can resume.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Battery State of Health (SoH) Decay Algorithm */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <BatteryWarning className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. Battery State of Health (SoH) Decay Algorithm</h2>
          </header>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-slate-300 leading-relaxed mb-6">
              Battery degradation is not strictly linear. It is a combination of chronological time (calendar aging) and physical throughput (cycle aging). We calculate estimated degradation utilizing a generalized semi-empirical decay algorithm:
            </p>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6 flex justify-center overflow-x-auto text-lg font-serif tracking-wider text-slate-200">
              <div className="whitespace-nowrap">
                SoH(t, m) = 100 - ( α√t + β·m + γ<sub className="text-sm">habit</sub> )
              </div>
            </div>
            <ul className="text-slate-400 space-y-2 list-disc pl-5 mb-6">
              <li><strong>t</strong>: Time (calendar age in years). Driven by the square-root of time (α√t).</li>
              <li><strong>m</strong>: Mileage (cycle throughput).</li>
              <li><strong>γ<sub className="text-sm">habit</sub></strong>: A penalty factor for high-stress habits (e.g., leaving the car at 100% SoC frequently, heavy fast-charging reliance without thermal management).</li>
            </ul>
            <h3 className="text-xl font-semibold text-white mt-8 mb-4">LFP vs. NMC Chemistry</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Our models adjust the α and β coefficients based on cathode chemistry. <strong>Lithium Iron Phosphate (LFP)</strong> packs exhibit significantly higher cycle endurance and lower calendar aging at high states of charge, allowing for daily 100% charges. Conversely, <strong>Nickel Manganese Cobalt (NMC)</strong> and NCA packs experience accelerated structural degradation if held near maximum voltage, which is why 80% daily limits are recommended.
            </p>
            <p className="text-slate-400 text-sm italic">
              Note: Industry standard warranties guarantee 70% capacity retention over 8 years or 100,000 miles. Our decay models align with aggregated fleet telemetry showing most modern packs easily exceed these baselines.
            </p>
          </div>
        </section>

        {/* Section 4: Telemetry Sources & Peer Verification */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Telemetry Sources & Peer Verification</h2>
          </header>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-slate-300 leading-relaxed mb-6">
              Theoretical physics must be grounded in empirical observation. Our datasets are continually refined through a matrix of recognized industry inputs and real-world telemetry:
            </p>
            <ul className="text-slate-400 space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <p className="m-0"><strong>Real-World OBD2 CAN Bus Logs:</strong> Anonymized charging telemetry capturing true pack voltage, current request, and cell temperatures.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <p className="m-0"><strong>Standardized Range Cycles:</strong> Baseline efficiency data normalized from EPA and WLTP testing procedures.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <p className="m-0"><strong>Manufacturer Technical Bulletins:</strong> Publicly released charging curves and BMS logic updates.</p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></div>
                <p className="m-0"><strong>DC Fast-Charger Station Logs:</strong> Session data from CCS1, NACS, and CHAdeMO public infrastructure to verify real-world hardware limits and dispenser throttling.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Editorial Independence & Disclaimers */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <header className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-slate-700/50 rounded-lg border border-slate-600/50">
              <ShieldCheck className="w-6 h-6 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">5. Editorial Independence & Disclaimers</h2>
          </header>
          <div className="prose prose-invert prose-emerald max-w-none">
            <p className="text-slate-300 leading-relaxed mb-4">
              <strong>EVChargeCurve operates with strict editorial and technical independence.</strong> We do not accept payment from automakers to alter charging curves, inflate range estimates, or suppress degradation models. Our mandate is to provide transparent, unbiased engineering benchmarks for the EV community.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed bg-slate-950 p-4 rounded-lg border border-slate-800">
              <em>Disclaimer:</em> All outputs from our calculators and simulators represent mathematical engineering benchmarks. Real-world results will vary based on ambient weather, exact battery temperature at plug-in, BMS firmware versions, battery aging, terrain, driving style, and station-level factors like grid congestion or cabinet load-sharing.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
