import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Activity, ShieldCheck, Cpu, Database, ThermometerSnowflake, Gauge, AlertTriangle, ArrowRight, CheckCircle2, FileCode2 } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Testing Procedures & Telemetry Protocol | EVChargeCurve',
  description: 'Examine our empirical DC fast charging testing protocols, OBD-II CAN bus hardware, logged session criteria, and real-world testing limitations.',
  alternates: {
    canonical: 'https://evchargecurve.com/testing',
  },
};

export default function TestingPage() {
  const publishedDate = '2024-01-28';
  const lastUpdated = '2026-03-15';
  const lastReviewed = '2026-03-20';

  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-100">
      {/* Header */}
      <section className="relative w-full pt-16 md:pt-24 pb-12 border-b border-slate-800/60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Activity className="w-4 h-4" />
            <span>Empirical Telemetry Standards</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Testing Procedures &amp; Protocol
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            How DC fast charging sessions are recorded, normalized, and validated using direct OBD-II CAN bus telemetry under documented thermal and electrical conditions.
          </p>

          {/* Date Transparency */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Published:</span>{' '}
              <time dateTime={publishedDate} className="text-slate-300 font-mono">Jan 28, 2024</time>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-slate-500">Last Updated:</span>{' '}
              <time dateTime={lastUpdated} className="text-slate-300 font-mono">Mar 15, 2026</time>
            </div>
            <span className="text-slate-700">|</span>
            <div>
              <span className="text-slate-500">Last Reviewed:</span>{' '}
              <time dateTime={lastReviewed} className="text-emerald-400 font-mono">Mar 20, 2026</time>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Testing Protocol', href: '/testing' }]} />

        {/* 1. Testing Session Criteria */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Standardized Test Session Criteria</h2>
              <p className="text-xs text-slate-400">Prerequisites for logging canonical charging curves</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              To ensure data comparability across vehicles, DC fast charging curve sessions adhere to strict testing parameters:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Starting State of Charge (SoC)</h3>
                <p className="text-xs text-slate-400">Sessions initiate at or below <strong>10% SoC</strong> (optimally 4–8% SoC) to observe the initial voltage ramp and peak power acquisition phase.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Thermal Preconditioning</h3>
                <p className="text-xs text-slate-400">Baseline canonical curves require an active preconditioning cycle reaching optimum battery pack temperature (typically <strong>25°C to 32°C</strong>).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Dispenser Headroom</h3>
                <p className="text-xs text-slate-400">Tested on DC fast chargers with rated output exceeding the vehicle&apos;s peak acceptance rate (e.g. 350 kW / 500A liquid-cooled dispensers for 800V vehicles).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">Continuous Uninterrupted Dwell</h3>
                <p className="text-xs text-slate-400">Single session recording without cabin HVAC changes, mid-session station reboots, or shared-cabinet power throttling.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Hardware & Logging Equipment */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Telemetry Equipment &amp; Software</h2>
              <p className="text-xs text-slate-400">Standard tools used by maintainers and community contributors</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              We record internal high-speed CAN-bus data rather than solely relying on the dispenser screen. This allows us to separate BMS limits from dispenser limits:
            </p>
            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">OBD-II Hardware Interfaces:</strong> OBDLink CX / MX+ Bluetooth 5.0 adapters, vLinker FD+ diagnostic interfaces, and direct CAN-logger harnesses configured for 500 kbps / 250 kbps vehicle bus baud rates.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">Telemetry Software:</strong> CarScanner Pro (custom PID profiles), ScanMyTesla, Torque Pro, and self-hosted TeslaMate streaming telemetry loggers.
                </div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                <div>
                  <strong className="text-white">External Environmental Logging:</strong> Ambient temperature sensors, station dispenser nameplate rating, and cooling fluid inlet/outlet observations.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sample Telemetry Data Schema */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FileCode2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Recorded Telemetry Parameters</h2>
              <p className="text-xs text-slate-400">Standard time-series parameters captured at 1 Hz resolution</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre>{`{
  "timestamp_iso": "2026-02-14T15:22:04Z",
  "soc_display_pct": 24.5,
  "soc_bms_actual_pct": 23.8,
  "pack_voltage_volts": 682.4,
  "pack_current_amps": 337.2,
  "calculated_power_kw": 230.1,
  "bms_requested_kw": 240.0,
  "battery_temp_min_c": 26.5,
  "battery_temp_max_c": 31.0,
  "ambient_temp_c": 18.0,
  "charger_type": "Alpitronic HYC300 (500A liquid-cooled)",
  "cumulative_kwh_added": 14.8
}`}</pre>
          </div>
        </section>

        {/* 4. Real-World Testing Limitations */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Known Limitations &amp; Real-World Variance</h2>
              <p className="text-xs text-slate-400">Why your charging session may differ from canonical curves</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              Even under instrumented conditions, electric vehicle charging speed is governed by complex real-world variables:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2 text-xs sm:text-sm">
              <li><strong>BMS Firmware Differences:</strong> Automakers regularly modify battery thermal management and charging aggressive curves via over-the-air updates.</li>
              <li><strong>Cell Supplier Variations:</strong> The same vehicle model year may contain battery cells from different suppliers (e.g. LG, CATL, Panasonic, SK On) with slightly different internal resistance profiles.</li>
              <li><strong>Dispenser Current Throttling:</strong> If a station&apos;s liquid cooling cable derates due to a clogged filter or high ambient heat, dispenser output drops to ~200A regardless of what the vehicle can accept.</li>
              <li><strong>Utility Grid Limitations:</strong> Some charging hubs dynamically share a limited transformer capacity across multiple active stalls.</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4">
            <Link href="/methodology" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              <span>Read Mathematical Formulas in Methodology</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/corrections" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
              <span>Submit Telemetry Logs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
