import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Settings2, 
  Activity, 
  Zap, 
  ChevronRight,
  Database,
  BatteryWarning
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works | EV Charging Curve Simulator Engine',
  description: 'Understand the math and physics behind our DC fast charging curve simulator. Learn how we model 400V vs 800V architectures and thermal throttling.',
};

export default function HowItWorksPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 font-medium">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-300">How It Works</span>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            How It Works
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Most generic EV charging calculators just divide battery capacity by the station's peak speed, giving you wildly inaccurate road trip times. We completely rebuilt the math. By leveraging real-world CAN bus telemetry and battery physics, our engine runs a piecewise numerical integration across the exact taper curve of your specific vehicle. 
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mt-4">
            The result? Pinpoint accurate charge times that account for thermal throttling, hardware caps, and voltage step-downs. Here is exactly how our simulation pipeline operates.
          </p>
        </div>
      </div>

      {/* 3-Step Process Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/30 select-none group-hover:text-slate-800/50 transition-colors">1</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
                <Settings2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Select & Parse</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose your EV model, starting state of charge (SoC), and the DC fast charger hardware limit (e.g., 150kW or 350kW). Our database instantly loads the specific battery chemistry, thermal limits, and voltage architecture for your exact trim level without waiting for server-side processing.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/30 select-none group-hover:text-slate-800/50 transition-colors">2</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Curve Integration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                This is where the physics engine takes over. The simulator performs a discrete mathematical integration across the vehicle's empirical charging curve. It dynamically caps power delivery based on the station's amperage limits and the rising internal impedance of the battery cells as they fill.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl p-8 group hover:border-slate-700 transition-colors">
            <div className="absolute -right-4 -bottom-8 text-[12rem] font-black text-slate-800/30 select-none group-hover:text-slate-800/50 transition-colors">3</div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Actionable Output</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Once the calculation finishes, the engine renders a precise time-to-charge, the average sustained power (kW), and the miles added in a 15-minute quick stop. Stop guessing if you will make it to the next charger—know exactly how long you will be plugged in based on real-world telemetry.
              </p>
            </div>
          </div>

        </div>
      </div>

            {/* Real World Problem & Competitor Comparison Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Zap className="w-64 h-64 text-emerald-400" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Solving the Road-Trip Range Anxiety Problem
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-3xl">
              When planning a long EV road trip, drivers often rely on automaker claims ("10-80% in 30 minutes") or simple math (Dividing Battery Size by Charger Power). In the real world, this causes drivers to be stranded at chargers far longer than expected, missing appointments and suffering road-trip fatigue. Here is how our engineering-grade tool compares to generic calculators:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Competitors */}
              <div className="bg-slate-900/50 border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs font-bold">✕</span>
                  Generic Calculators
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Assume a flat charging speed (e.g., holding 150kW the entire session).</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Ignore 400V cable amperage limits on 350kW chargers.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 mt-1 flex-shrink-0">✕</span>
                    <p className="text-sm text-slate-400 m-0">Result in highly optimistic, mathematically impossible wait times.</p>
                  </li>
                </ul>
              </div>

              {/* Our Tool */}
              <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-2xl p-6 shadow-[0_0_30px_-5px_rgba(16,185,129,0.1)]">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">✓</span>
                  EVChargeCurve Engine
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Integrates step-by-step through the vehicle's exact thermal taper curve.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Automatically caps power based on real-world 400V/800V hardware limits.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1 flex-shrink-0">✓</span>
                    <p className="text-sm text-slate-300 m-0">Delivers pinpoint-accurate wait times to eliminate road-trip surprises.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Architecture Specifications</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl mx-auto">
            Battery architecture dictates charging speed. Whether you are plugging in a standard 400V crossover or a high-performance 800V sports sedan, our tool accurately caps the power based on the station's hard physical limits. Compare the fundamental engineering differences between 400V and 800V platforms below.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/80">
              <tr>
                <th className="p-5 font-semibold text-white w-1/3">System Feature</th>
                <th className="p-5 font-semibold text-emerald-400 border-l border-slate-700 w-1/3">
                  <div className="flex flex-col">
                    <span className="text-lg">400V Architecture</span>
                    <span className="text-xs text-slate-400 font-normal mt-1">Standard Industry Platform</span>
                  </div>
                </th>
                <th className="p-5 font-semibold text-cyan-400 border-l border-slate-700 w-1/3">
                  <div className="flex flex-col">
                    <span className="text-lg">800V Architecture</span>
                    <span className="text-xs text-slate-400 font-normal mt-1">Advanced Performance Platform</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-5 font-medium text-white">Peak Power on 350kW Station</td>
                <td className="p-5 border-l border-slate-800">~200 kW (Hard-capped by 500A cable limits)</td>
                <td className="p-5 border-l border-slate-800 text-cyan-200">Up to 350 kW (Utilizes full voltage)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-5 font-medium text-white">Cable Heat Generation</td>
                <td className="p-5 border-l border-slate-800">High (Requires heavy liquid cooling)</td>
                <td className="p-5 border-l border-slate-800">Low (More efficient power transfer at lower amps)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-5 font-medium text-white">Average 10% to 80% Charge Time</td>
                <td className="p-5 border-l border-slate-800">28 - 45 minutes</td>
                <td className="p-5 border-l border-slate-800 text-emerald-200">15 - 22 minutes</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-5 font-medium text-white">Example Vehicles</td>
                <td className="p-5 border-l border-slate-800 text-slate-400">Tesla Model Y, Ford Mustang Mach-E, VW ID.4</td>
                <td className="p-5 border-l border-slate-800 text-slate-400">Hyundai Ioniq 5, Porsche Taycan, Kia EV6</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequently Asked Questions Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Have questions about how we calculate EV charging speeds? Read through our detailed answers regarding data sourcing, telemetry, and hardware limitations below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
              <Database className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              Where do you source your charging curve data?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our charging curves are mathematically aggregated from real-world OBD2 CAN bus telemetry, verified public DC fast charging station logs, and official manufacturer technical bulletins. We do not rely on idealized marketing numbers; our database reflects the actual power delivery vehicles experience in real-world conditions.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
              <BatteryWarning className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              Why is the simulator slower than advertised peak speeds?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automakers heavily advertise "peak" speeds, but the reality of battery physics dictates that a vehicle can only hold that peak for a few minutes. As the battery fills, the Battery Management System (BMS) intentionally tapers the power to prevent thermal runaway and lithium plating. Our simulator calculates the average sustained power, which dictates your true wait time.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
