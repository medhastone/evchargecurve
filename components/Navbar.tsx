'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings, CURRENCIES } from '@/components/providers/SettingsProvider';

const MAIN_LINKS = [
  { name: 'Vehicles', path: '/curve' },
  { name: 'Methodology', path: '/methodology' },
  { name: 'How It Works', path: '/how-it-works' },
];

const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Compare EVs', path: '/compare' },
  { name: 'Battery Health', path: '/battery-health' },
  { name: 'Winter & Towing', path: '/range-loss' },
  { name: 'Home Charging', path: '/home-charging' },
  { name: 'Carbon Offset', path: '/carbon-offset' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(true);
  
  const { currency, setCurrency, unit, setUnit } = useSettings();

  // Check if any tool is active
  const isToolActive = TOOL_LINKS.some(link => pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path)));

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-[#0B0F17]/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Image src="/logo.png" alt="Logo" width={24} height={24} className="rounded object-contain" referrerPolicy="no-referrer" />
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
            <div className="relative group">
              <button className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                isToolActive ? "text-emerald-400" : "text-slate-300 hover:text-emerald-400"
              )}>
                Tools <ChevronDown className="w-4 h-4 opacity-70" />
              </button>
              <div className="absolute top-full left-0 mt-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="bg-[#0F141E] border border-slate-700 rounded-lg shadow-xl py-2">
                  {TOOL_LINKS.map(link => {
                    const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                    return (
                      <Link 
                        key={link.path} 
                        href={link.path} 
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors",
                          isActive ? "text-emerald-400 bg-slate-800/50" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {MAIN_LINKS.map((link) => {
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

          {/* Right Section: Settings & Mobile Toggle */}
          <div className="flex items-center gap-4">
            
            {/* Unit Toggle (Desktop) */}
            <div className="hidden sm:flex bg-slate-800/50 p-1 rounded-lg border border-slate-700">
              <button
                onClick={() => setUnit('mi')}
                className={cn(
                  "px-2.5 py-1 text-xs font-bold rounded-md transition-all",
                  unit === 'mi' ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                )}
              >
                MI
              </button>
              <button
                onClick={() => setUnit('km')}
                className={cn(
                  "px-2.5 py-1 text-xs font-bold rounded-md transition-all",
                  unit === 'km' ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                )}
              >
                KM
              </button>
            </div>

            {/* Currency Selector (Desktop) */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600"
              >
                <span>{currency.label}</span>
                <span className="text-slate-500">{currency.symbol}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              {isCurrencyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCurrencyDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-32 bg-[#0F141E] border border-slate-700 rounded-lg shadow-xl py-1 z-50">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.label}
                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex justify-between items-center"
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyDropdownOpen(false);
                        }}
                      >
                        <span>{c.label}</span>
                        <span className="text-slate-500">{c.symbol}</span>
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
        <div className="md:hidden bg-[#0F141E] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 shadow-2xl h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Mobile Tools Accordion */}
          <div className="mb-2">
            <button 
              onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
              className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span className={cn(isToolActive && "text-emerald-400")}>Tools</span>
              <ChevronDown className={cn("w-5 h-5 transition-transform", isMobileToolsOpen && "rotate-180")} />
            </button>
            
            {isMobileToolsOpen && (
              <div className="mt-1 pl-4 space-y-1 border-l-2 border-slate-800 ml-3">
                {TOOL_LINKS.map((link) => {
                  const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                  return (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      )}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {MAIN_LINKS.map((link) => {
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
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Distance Unit</p>
            <div className="flex gap-2 px-3 mb-4">
              <button
                onClick={() => setUnit('mi')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md border transition-colors",
                  unit === 'mi' ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-slate-800/50 border-slate-700 text-slate-300"
                )}
              >
                Miles (mi)
              </button>
              <button
                onClick={() => setUnit('km')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md border transition-colors",
                  unit === 'km' ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-slate-800/50 border-slate-700 text-slate-300"
                )}
              >
                Kilometers (km)
              </button>
            </div>

            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Currency</p>
            <div className="grid grid-cols-3 gap-2 px-3">
              {CURRENCIES.map((c) => (
                <button
                  key={c.label}
                  onClick={() => {
                    setCurrency(c);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "py-2 text-sm font-medium rounded-md border transition-colors",
                    currency.label === c.label
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700"
                  )}
                >
                  {c.label} {c.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
