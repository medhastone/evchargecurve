import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap, BookOpen, Layers, Users, Database } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#080B10] border-t border-slate-800 pt-16 pb-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Description (Col 1 & 2 on mobile, Col 1 on large) */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4 w-max" aria-label="EVChargeCurve Home">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Image src="/logo.png" alt="EVChargeCurve Logo" width={32} height={32} className="rounded object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                EVCharge<span className="text-emerald-400">Curve</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Open-source telemetry data and thermodynamic modeling for electric vehicle fast-charging curves, battery degradation, and home charging economics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 w-max">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side Physics</span>
            </div>
          </div>

          {/* Core Calculators (Col 2) */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Core Calculators
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  DC Fast Charge Simulator
                </Link>
              </li>
              <li>
                <Link href="/curve" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  EV Charging Curve Directory
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Compare EV Charging Speed
                </Link>
              </li>
              <li>
                <Link href="/battery-health" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Battery Health &amp; Degradation
                </Link>
              </li>
              <li>
                <Link href="/range-loss" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Winter &amp; Towing Range Loss
                </Link>
              </li>
              <li>
                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  Home Charging Economics
                </Link>
              </li>
              <li>
                <Link href="/tco-calculator" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  EV vs Gas 5-Yr TCO
                </Link>
              </li>
              <li>
                <Link href="/ev-charging-cost" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  EV Charging Cost &amp; Savings
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialized Tools (Col 3) */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Specialized Tools
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/preconditioning" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Preconditioning vs Cold-Gate
                </Link>
              </li>
              <li>
                <Link href="/kw-to-miles" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  kW to Miles Speed Sizer
                </Link>
              </li>
              <li>
                <Link href="/panel-capacity" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Home Panel Capacity Sizer
                </Link>
              </li>
              <li>
                <Link href="/v2h-backup" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  V2H Power Outage Backup
                </Link>
              </li>
              <li>
                <Link href="/destination-charging" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Destination &amp; Hotel Sizer
                </Link>
              </li>
              <li>
                <Link href="/idle-drain" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Vampire &amp; Idle Drain Sizer
                </Link>
              </li>
              <li>
                <Link href="/battery-replacement" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Battery Replacement Cost
                </Link>
              </li>
              <li>
                <Link href="/solar-to-ev" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Solar Array to EV Sizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Topic Pillars (Col 4) */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Topic Hubs &amp; Guides
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/topics" className="text-emerald-400 font-semibold hover:underline block pb-0.5">
                  12 Knowledge Pillars &rarr;
                </Link>
              </li>
              <li>
                <Link href="/topics/400v-vs-800v" className="text-slate-400 hover:text-amber-400 transition-colors">
                  400V vs 800V Architecture
                </Link>
              </li>
              <li>
                <Link href="/topics/ev-charging-curves" className="text-slate-400 hover:text-amber-400 transition-colors">
                  EV Charging Curves &amp; BMS
                </Link>
              </li>
              <li>
                <Link href="/topics/10-80-charging" className="text-slate-400 hover:text-amber-400 transition-colors">
                  10–80% Charging Window
                </Link>
              </li>
              <li>
                <Link href="/topics/battery-preconditioning" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Battery Preconditioning
                </Link>
              </li>
              <li>
                <Link href="/topics/cold-weather-charging" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Cold Weather Charging
                </Link>
              </li>
              <li>
                <Link href="/topics/home-charging" className="text-slate-400 hover:text-amber-400 transition-colors">
                  Level 2 Home Charging
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-amber-400 font-semibold hover:underline block pt-1">
                  Read Engineering Blog &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Authority & Governance (Col 5) */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-wider uppercase mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Data Governance
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/research" className="text-emerald-400 font-semibold hover:underline block pb-0.5">
                  Research Observatory &rarr;
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-slate-400 hover:text-white transition-colors">
                  Authors &amp; Contributors
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="text-slate-400 hover:text-white transition-colors">
                  Testing Methodology
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="text-slate-400 hover:text-white transition-colors">
                  Data Sources Catalog
                </Link>
              </li>
              <li>
                <Link href="/testing" className="text-slate-400 hover:text-white transition-colors">
                  Testing Protocol &amp; Equipment
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-slate-400 hover:text-white transition-colors">
                  Editorial &amp; Data Policy
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="text-slate-400 hover:text-white transition-colors">
                  Corrections &amp; Changelog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact &amp; Telemetry Errata
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left max-w-3xl leading-relaxed">
            <strong className="text-slate-300">Data Disclosure:</strong> Charging curves, dwell times, range calculations, and battery health trajectories on EVChargeCurve are derived from empirical OBD2 telemetry logs, OEM homologation certificates, and discrete thermodynamic numerical modeling. Real-world results will vary based on ambient temperature, state of health, dispenser current limits, and individual BMS firmware versions.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2 flex-shrink-0">
            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms of Use</Link>
              <Link href="/contact" className="hover:text-slate-200 transition-colors">Contact</Link>
            </div>
            <p className="text-slate-400 text-xs font-medium whitespace-nowrap">
              &copy; {currentYear} EVChargeCurve. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
