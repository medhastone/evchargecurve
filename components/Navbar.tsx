'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
 { name: 'DC Fast Simulator', path: '/' },
 { name: 'Battery Health', path: '/battery-health' },
 { name: 'Winter & Towing', path: '/range-loss' },
 { name: 'Home Charging', path: '/home-charging' },
 { name: 'Vehicles', path: '/curve' },
];

const CURRENCIES = [
 { label: 'USD', symbol: '$' },
 { label: 'GBP', symbol: '£' },
 { label: 'EUR', symbol: '€' },
 { label: 'CAD', symbol: '$' },
 { label: 'AUD', symbol: '$' },
];

export default function Navbar() {
 const pathname = usePathname();
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
 const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);

 return (
 <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-[#0B0F17]/80 border-b border-slate-800">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-16">
 {/* Logo Section */}
 <div className="flex-shrink-0 flex items-center gap-2">
 <Link href="/" className="flex items-center gap-2 group">
 <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
 <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
 </div>
 <span className="font-bold text-lg tracking-tight text-white">
 EVCharge<span className="text-emerald-400">Curve</span>
 </span>
 </Link>
 <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
 PRO
 </span>
 </div>

 {/* Desktop Navigation */}
 <nav className="hidden md:flex items-center gap-6">
 {NAV_LINKS.map((link) => {
 const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
 return (
 <Link
 key={link.path}
 href={link.path}
 className={cn(
 "text-sm font-medium transition-colors hover:text-emerald-400",
 isActive ? "text-emerald-400" : "text-slate-300"
 )}
 >
 {link.name}
 </Link>
 );
 })}
 </nav>

 {/* Right Section: Currency & Mobile Toggle */}
 <div className="flex items-center gap-4">
 {/* Currency Selector */}
 <div className="relative hidden sm:block">
 <button
 onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
 className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600"
 >
 <span>{selectedCurrency.label}</span>
 <span className="text-slate-500">{selectedCurrency.symbol}</span>
 <ChevronDown className="w-4 h-4 text-slate-400" />
 </button>

 {isCurrencyDropdownOpen && (
 <>
 <div className="fixed inset-0 z-40" onClick={() => setIsCurrencyDropdownOpen(false)} />
 <div className="absolute right-0 mt-2 w-32 bg-[#0F141E] border border-slate-700 rounded-lg shadow-xl py-1 z-50">
 {CURRENCIES.map((currency) => (
 <button
 key={currency.label}
 className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex justify-between items-center"
 onClick={() => {
 setSelectedCurrency(currency);
 setIsCurrencyDropdownOpen(false);
 }}
 >
 <span>{currency.label}</span>
 <span className="text-slate-500">{currency.symbol}</span>
 </button>
 ))}
 </div>
 </>
 )}
 </div>

 {/* Mobile Menu Toggle */}
 <button
 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
 className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
 >
 {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
 </button>
 </div>
 </div>
 </div>

 {/* Mobile Menu */}
 {isMobileMenuOpen && (
 <div className="md:hidden bg-[#0F141E] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-2xl">
 {NAV_LINKS.map((link) => {
 const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
 return (
 <Link
 key={link.path}
 href={link.path}
 onClick={() => setIsMobileMenuOpen(false)}
 className={cn(
 "block px-3 py-2 rounded-md text-base font-medium transition-colors",
 isActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-300 hover:bg-slate-800 hover:text-white"
 )}
 >
 {link.name}
 </Link>
 );
 })}
 <div className="pt-4 mt-4 border-t border-slate-800">
 <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Currency</p>
 <div className="grid grid-cols-3 gap-2 px-3">
 {CURRENCIES.map((currency) => (
 <button
 key={currency.label}
 onClick={() => {
 setSelectedCurrency(currency);
 setIsMobileMenuOpen(false);
 }}
 className={cn(
 "py-2 text-sm font-medium rounded-md border transition-colors",
 selectedCurrency.label === currency.label
 ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
 : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
 )}
 >
 {currency.label} {currency.symbol}
 </button>
 ))}
 </div>
 </div>
 </div>
 )}
 </header>
 );
}
