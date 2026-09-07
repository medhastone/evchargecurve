'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, ChevronDown, Sun, Moon, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings, CURRENCIES } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';

const MAIN_LINKS = [
  { name: 'Vehicles', path: '/curve' },
  { name: 'Methodology', path: '/methodology' },
  { name: 'How It Works', path: '/how-it-works' },
];

const TOOL_LINKS = [
  { name: 'DC Fast Simulator', path: '/' },
  { name: 'Compare EVs', path: '/compare' },
  { name: 'Cold-Gate vs Precond', path: '/preconditioning' },
  { name: 'Phantom Drain', path: '/idle-drain' },
  { name: 'Hotel Charging Sizer', path: '/destination-charging' },
  { name: 'Panel Capacity Sizer', path: '/panel-capacity' },
  { name: 'Battery Health', path: '/battery-health' },
  { name: 'Winter & Towing', path: '/range-loss' },
  { name: 'Home Charging', path: '/home-charging' },
  { name: 'Carbon Offset', path: '/carbon-offset' },
  { name: 'V2H Power Outage', path: '/v2h-backup' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(true);
  
  const { currency, setCurrency, unit, setUnit, theme, setTheme, toggleTheme } = useSettings();
  const { openStudio } = useVehicles();

  // Check if any tool is active
  const isToolActive = TOOL_LINKS.some(link => pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path)));

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-[#0B0F17]/80 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group" aria-label="EVChargeCurve Home">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                <Image src="/logo.png" alt="EVChargeCurve Logo" width={40} height={40} priority className="rounded object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                EVCharge<span className="text-emerald-400">Curve</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
            <div className="relative group">
              <button 
                type="button"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Toggle Tools Menu"
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                  isToolActive ? "text-emerald-400" : "text-slate-300 hover:text-emerald-400"
                )}
              >
                Tools <ChevronDown className="w-4 h-4 opacity-70" aria-hidden="true" />
              </button>
              <div className="absolute top-full left-0 mt-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="bg-[#0F141E] border border-slate-700 rounded-lg shadow-xl py-2" role="menu" aria-label="Tools Navigation">
                  {TOOL_LINKS.map(link => {
                    const isActive = pathname === link.path || (link.path !== '/' && pathname?.startsWith(link.path));
                    return (
                      <Link 
                        key={link.path} 
                        href={link.path} 
                        role="menuitem"
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
          <div className="flex items-center gap-3">
            
            {/* Custom EV Studio Quick Button */}
            <button
              type="button"
              onClick={() => openStudio()}
              aria-label="Open Custom Electric Vehicle Studio"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
              title="Add any custom EV or upload telemetry"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Custom EV</span>
            </button>
            
            {/* Unit Toggle (Desktop) */}
            <div className="hidden sm:flex bg-slate-800/50 p-1 rounded-lg border border-slate-700" role="group" aria-label="Distance unit selection">
              <button
                type="button"
                onClick={() => setUnit('mi')}
                aria-label="Set distance unit to miles"
                aria-pressed={unit === 'mi'}
                className={cn(
                  "px-2.5 py-1 text-xs font-bold rounded-md transition-all",
                  unit === 'mi' ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                )}
              >
                MI
              </button>
              <button
                type="button"
                onClick={() => setUnit('km')}
                aria-label="Set distance unit to kilometers"
                aria-pressed={unit === 'km'}
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
                type="button"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                aria-label={`Select Currency. Currently ${currency.label} ${currency.symbol}`}
                aria-expanded={isCurrencyDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700 hover:border-slate-600"
              >
                <span>{currency.label}</span>
                <span className="text-slate-400">{currency.symbol}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </button>
              {isCurrencyDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCurrencyDropdownOpen(false)} aria-hidden="true" />
                  <div className="absolute right-0 mt-2 w-32 bg-[#0F141E] border border-slate-700 rounded-lg shadow-xl py-1 z-50" role="menu">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.label}
                        type="button"
                        role="menuitem"
                        aria-label={`Change currency to ${c.label} (${c.symbol})`}
                        className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex justify-between items-center"
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyDropdownOpen(false);
                        }}
                      >
                        <span>{c.label}</span>
                        <span className="text-slate-400">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Theme Toggle (Desktop) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:text-slate-900 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F141E] border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 shadow-2xl h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Custom Studio Mobile Action */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              openStudio();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm mb-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Custom EV Studio</span>
          </button>

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
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Appearance Theme</p>
            <div className="flex gap-2 px-3 mb-4">
              <button
                onClick={() => setTheme('light')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md border transition-colors flex items-center justify-center gap-2",
                  theme === 'light' 
                    ? "bg-amber-500/10 border-amber-500/50 text-amber-500 font-semibold" 
                    : "bg-slate-800/50 border-slate-700 text-slate-300"
                )}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md border transition-colors flex items-center justify-center gap-2",
                  theme === 'dark' 
                    ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-semibold" 
                    : "bg-slate-800/50 border-slate-700 text-slate-300"
                )}
              >
                <Moon className="w-4 h-4 text-emerald-400" />
                Dark
              </button>
            </div>

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
