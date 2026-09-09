import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#080B10] border-t border-slate-800 pt-16 pb-8 mt-auto" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4 w-max" aria-label="EVChargeCurve Home">
              <Image src="/logo.png" alt="EVChargeCurve Logo" width={40} height={40} className="rounded object-contain" referrerPolicy="no-referrer" />
              <span className="font-bold text-xl tracking-tight text-white">
                EVCharge<span className="text-emerald-400">Curve</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              High-performance platform for EV battery diagnostics, DC fast-charging taper curves, 
              winter range degradation, and home charging economics. Built for data-driven drivers.
            </p>
          </div>

          {/* Tools Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Core Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  DC Fast Simulator
                </Link>
              </li>
              <li>
                <Link href="/battery-health" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Battery Health &amp; Degradation
                </Link>
              </li>
              <li>
                <Link href="/range-loss" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Winter &amp; Towing Range
                </Link>
              </li>
              <li>
                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Home Charging Economics
                </Link>
              </li>
              <li>
                <Link href="/panel-capacity" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Panel Capacity
                </Link>
              </li>
              <li>
                <Link href="/v2h-backup" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  V2H Backup Simulator
                </Link>
              </li>
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">More Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/idle-drain" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Vampire Drain Calculator
                </Link>
              </li>
              <li>
                <Link href="/destination-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Destination Charging
                </Link>
              </li>
              <li>
                <Link href="/preconditioning" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Preconditioning Energy
                </Link>
              </li>
              <li>
                <Link href="/carbon-offset" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Carbon Offset Matrix
                </Link>
              </li>
              <li>
                <Link href="/betting-ev-calculator" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Betting EV Calculator
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs text-center md:text-left max-w-2xl">
            <strong className="text-slate-300">Disclaimer:</strong> Charging curves, range calculations, and battery health projections are estimates based on physical modeling and aggregated real-world data. Actual vehicle performance varies based on exact BMS software versions, environmental conditions, and individual usage patterns.
          </p>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-4 text-slate-400 text-xs">
              <Link href="/about" className="hover:text-slate-200 transition-colors">About Us</Link>
              <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms of Use</Link>
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
