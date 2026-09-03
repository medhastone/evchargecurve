import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { VEHICLES } from '@/data/evModels';

export default function Footer() {
 const currentYear = new Date().getFullYear();
 
 // Extract a few popular vehicles for the footer links
 const popularVehicles = Object.values(VEHICLES).slice(0, 5);

 return (
 <footer className="bg-[#080B10] border-t border-slate-800 pt-16 pb-8 mt-auto">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
 {/* Brand & Description */}
 <div className="col-span-1 md:col-span-2">
 <Link href="/" className="flex items-center gap-2 group mb-4 w-max">
 <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
 <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
 </div>
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
 Battery Health & Degradation
 </Link>
 </li>
 <li>
 <Link href="/range-loss" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
 Winter & Towing Range
 </Link>
 </li>
 <li>
 <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
 Home Charging Economics
 </Link>
 </li>
 </ul>
 </div>

 {/* Popular Vehicles Links */}
 <div>
 <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Popular Curves</h3>
 <ul className="space-y-3">
 {popularVehicles.map((vehicle) => (
 <li key={vehicle.id}>
 <Link href={`/curve/${vehicle.id}`} className="text-slate-400 hover:text-emerald-400 text-sm transition-colors truncate block">
 {vehicle.name}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 </div>

 {/* Disclaimer & Copyright */}
 <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
 <p className="text-slate-500 text-xs text-center md:text-left max-w-2xl">
 <strong>Disclaimer:</strong> Charging curves, range calculations, and battery health projections are estimates based on physical modeling and aggregated real-world data. Actual vehicle performance varies based on exact BMS software versions, environmental conditions, and individual usage patterns.
 </p>
 <p className="text-slate-500 text-xs font-medium whitespace-nowrap">
 &copy; {currentYear} EVChargeCurve. All rights reserved.
 </p>
 </div>
 </div>
 </footer>
 );
}
