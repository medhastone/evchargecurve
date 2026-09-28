'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Menu,
  X,
  ChevronDown,
  PlusCircle,
  Zap,
  Activity,
  Flame,
  Hotel,
  BatteryCharging,
  Gauge,
  Snowflake,
  Timer,
  Home,
  CircuitBoard,
  Radio,
  SunMedium,
  DollarSign,
  PiggyBank,
  RefreshCw,
  Leaf,
  Search,
  BookOpen,
  FlaskConical,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSettings, CURRENCIES } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';

// Primary top-level links for maximum cleanliness
const TOP_LINKS = [
  { name: 'EV Curves', path: '/curve', icon: Activity },
  { name: 'Research', path: '/research', icon: FlaskConical },
  { name: 'Topic Hubs', path: '/topics', icon: Layers },
];

// 4 distinct categorical columns for all 16 interactive tools
export const TOOL_CATEGORIES = [
  {
    id: 'fast-charge',
    name: 'DC Fast & Highway',
    description: 'High-power charging curves, road-trip speeds, and thermal behavior',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    bgColor: 'bg-emerald-500/10',
    tools: [
      {
        name: 'DC Fast Simulator',
        path: '/',
        shortDesc: 'Calculate 10–80% charging curve & dwell time',
        icon: Zap,
        badge: 'Core',
      },
      {
        name: 'Compare EV Charging',
        path: '/compare',
        shortDesc: 'Side-by-side multi-EV curve & speed comparison',
        icon: Activity,
      },
      {
        name: 'Cold-Gate vs Precond',
        path: '/preconditioning',
        shortDesc: 'Thermal kinetics & preconditioning ROI',
        icon: Flame,
      },
      {
        name: 'Destination & Hotel Sizer',
        path: '/destination-charging',
        shortDesc: 'Overnight Level 2 and destination dwell calculator',
        icon: Hotel,
      },
    ],
  },
  {
    id: 'battery-physics',
    name: 'Battery & Physics',
    description: 'Electrochemical degradation, range penalties, and power speeds',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/10',
    tools: [
      {
        name: 'Battery Health & SOH',
        path: '/battery-health',
        shortDesc: 'Cycle degradation & lifetime retention curve',
        icon: BatteryCharging,
      },
      {
        name: 'Winter & Towing Range',
        path: '/range-loss',
        shortDesc: 'Sub-zero temperature & aero drag range penalty',
        icon: Snowflake,
      },
      {
        name: 'kW to Miles Speed',
        path: '/kw-to-miles',
        shortDesc: 'Convert charging power into real miles/min',
        icon: Gauge,
      },
      {
        name: 'Phantom & Idle Drain',
        path: '/idle-drain',
        shortDesc: 'Vampire BMS drain during parking & storage',
        icon: Timer,
      },
    ],
  },
  {
    id: 'home-grid',
    name: 'Home & Grid Power',
    description: 'Electrical panel loading, solar pairing, and V2H backup',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/20',
    bgColor: 'bg-amber-500/10',
    tools: [
      {
        name: 'Home Charging Economics',
        path: '/home-charging',
        shortDesc: 'Level 1 vs Level 2 breaker sizing & hourly cost',
        icon: Home,
      },
      {
        name: 'Home Panel Capacity',
        path: '/panel-capacity',
        shortDesc: 'NEC 220 load calculation for 100A/200A panels',
        icon: CircuitBoard,
      },
      {
        name: 'V2H Power Outage Backup',
        path: '/v2h-backup',
        shortDesc: 'Bidirectional vehicle-to-home emergency backup',
        icon: Radio,
      },
      {
        name: 'Solar Array to EV Sizer',
        path: '/solar-to-ev',
        shortDesc: 'Rooftop PV solar panels needed per mile driven',
        icon: SunMedium,
      },
    ],
  },
  {
    id: 'cost-sustainability',
    name: 'Cost & TCO Analysis',
    description: 'Total cost of ownership, replacement pack costs, and carbon offset',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/20',
    bgColor: 'bg-indigo-500/10',
    tools: [
      {
        name: 'EV vs Gas 5-Yr TCO',
        path: '/tco-calculator',
        shortDesc: 'Total cost of ownership vs gasoline vehicle',
        icon: DollarSign,
      },
      {
        name: 'EV Charging Cost',
        path: '/ev-charging-cost',
        shortDesc: 'Residential TOU vs Public DCFC electricity bills',
        icon: PiggyBank,
      },
      {
        name: 'Battery Replacement Cost',
        path: '/battery-replacement',
        shortDesc: 'Out-of-warranty pack replacement estimates',
        icon: RefreshCw,
      },
      {
        name: 'Carbon Offset Matrix',
        path: '/carbon-offset',
        shortDesc: 'Regional grid emission vs tailpipe emissions',
        icon: Leaf,
      },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'fast-charge': true,
    'battery-physics': true,
    'home-grid': true,
    'cost-sustainability': true,
  });

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const { currency, setCurrency, unit, setUnit } = useSettings();
  const { openStudio } = useVehicles();

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsCurrencyDropdownOpen(false);
    setMobileSearch('');
  }, [pathname]);

  // Handle outside clicks for desktop mega-menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if any tool route is active
  const isAnyToolActive = TOOL_CATEGORIES.some((cat) =>
    cat.tools.some((t) => (t.path === '/' ? pathname === '/' : pathname?.startsWith(t.path)))
  );

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Filter tools on mobile
  const getFilteredCategories = () => {
    if (!mobileSearch.trim()) return TOOL_CATEGORIES;
    const term = mobileSearch.toLowerCase();
    return TOOL_CATEGORIES.map((cat) => ({
      ...cat,
      tools: cat.tools.filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.shortDesc.toLowerCase().includes(term) ||
          cat.name.toLowerCase().includes(term)
      ),
    })).filter((cat) => cat.tools.length > 0);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0B0F17]/90 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 group select-none"
              aria-label="EVChargeCurve Home"
            >
              <div className="bg-emerald-500/10 p-1.5 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all group-hover:scale-105 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="EVChargeCurve Logo"
                  width={32}
                  height={32}
                  priority
                  className="rounded-lg object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-0.5">
                EVCharge<span className="text-emerald-400 font-extrabold">Curve</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-3" aria-label="Main Navigation">
              {/* Calculators & Tools Mega-Menu Trigger */}
              <div className="relative" ref={megaMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  aria-expanded={isMegaMenuOpen}
                  aria-haspopup="true"
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 select-none',
                    isMegaMenuOpen || isAnyToolActive
                      ? 'bg-slate-800/80 text-emerald-400 border border-slate-700/80 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  )}
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Calculators</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 text-slate-400 transition-transform duration-200',
                      isMegaMenuOpen && 'rotate-180 text-emerald-400'
                    )}
                  />
                </button>

                {/* 4-Column Desktop Mega-Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                    className="absolute top-full -left-20 lg:-left-12 mt-2 w-[850px] lg:w-[940px] bg-[#0C111D] border border-slate-700/90 rounded-2xl shadow-2xl p-6 z-50 backdrop-blur-2xl animate-fade-in"
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                          <CircuitBoard className="w-3.5 h-3.5" />
                          <span>16 Interactive EV Engineering Calculators</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Select a physics simulation, degradation model, or financial calculator
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => openStudio()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Custom Vehicle Studio</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {TOOL_CATEGORIES.map((cat) => (
                        <div key={cat.id} className="space-y-2">
                          <div className="pb-1.5 border-b border-slate-800/80">
                            <span className={cn('text-xs font-bold tracking-tight block', cat.accentColor)}>
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-slate-500 line-clamp-1">
                              {cat.description}
                            </span>
                          </div>

                          <div className="space-y-1">
                            {cat.tools.map((tool) => {
                              const isActive =
                                tool.path === '/'
                                  ? pathname === '/'
                                  : pathname?.startsWith(tool.path);
                              const IconComponent = tool.icon;

                              return (
                                <Link
                                  key={tool.path}
                                  href={tool.path}
                                  className={cn(
                                    'group flex items-start gap-2.5 p-2 rounded-xl text-left transition-all',
                                    isActive
                                      ? 'bg-slate-800/90 border border-slate-700 text-white'
                                      : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
                                  )}
                                >
                                  <div
                                    className={cn(
                                      'p-1.5 rounded-lg flex-shrink-0 transition-colors mt-0.5',
                                      cat.bgColor,
                                      cat.accentColor
                                    )}
                                  >
                                    <IconComponent className="w-3.5 h-3.5" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs font-semibold truncate group-hover:text-emerald-300 transition-colors">
                                        {tool.name}
                                      </span>
                                      {tool.badge && (
                                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                          {tool.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10px] text-slate-400 line-clamp-1 leading-tight mt-0.5">
                                      {tool.shortDesc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                        <span>All models run 100% client-side with zero server latency</span>
                      </span>
                      <Link
                        href="/methodology"
                        className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                      >
                        <span>View Thermodynamic Methodology</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Clean Top-Level Links */}
              {TOP_LINKS.map((link) => {
                const isActive = pathname === link.path || pathname?.startsWith(link.path);
                const IconComp = link.icon;

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all',
                      isActive
                        ? 'bg-slate-800/80 text-emerald-400 border border-slate-700/80 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    )}
                  >
                    <IconComp className="w-4 h-4 opacity-80" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Section: Units, Currency, Custom EV Button, Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Custom EV Studio Button (Desktop) */}
            <button
              type="button"
              onClick={() => openStudio()}
              aria-label="Open Custom Electric Vehicle Studio"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all active:scale-95 shadow-sm"
              title="Add custom vehicle or test curve"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Custom EV</span>
            </button>

            {/* Unit Toggle (Desktop) */}
            <div
              className="hidden sm:flex bg-slate-800/60 p-1 rounded-xl border border-slate-700/80"
              role="group"
              aria-label="Distance unit selection"
            >
              <button
                type="button"
                onClick={() => setUnit('mi')}
                aria-label="Set distance unit to miles"
                aria-pressed={unit === 'mi'}
                className={cn(
                  'px-2.5 py-1 text-xs font-bold rounded-lg transition-all',
                  unit === 'mi'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
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
                  'px-2.5 py-1 text-xs font-bold rounded-lg transition-all',
                  unit === 'km'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
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
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-slate-800/60 px-3 py-1.5 rounded-xl border border-slate-700/80 hover:border-slate-600"
              >
                <span>{currency.label}</span>
                <span className="text-slate-400 font-normal">{currency.symbol}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              </button>
              {isCurrencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute right-0 mt-2 w-36 bg-[#0F141E] border border-slate-700 rounded-xl shadow-2xl py-1 z-50 animate-fade-in"
                    role="menu"
                  >
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.label}
                        type="button"
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyDropdownOpen(false);
                        }}
                        role="menuitem"
                        className={cn(
                          'w-full text-left px-3 py-1.5 text-xs flex justify-between items-center transition-colors',
                          currency.label === curr.label
                            ? 'bg-slate-800 text-emerald-400 font-bold'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                        )}
                      >
                        <span>{curr.label}</span>
                        <span className="text-slate-400 font-mono">{curr.symbol}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Mobile Drawer Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden p-2 rounded-xl bg-slate-800/70 text-slate-300 hover:text-white border border-slate-700/80 active:scale-95"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Categorized Accordion + Instant Search) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0B0F17]/98 px-4 pt-4 pb-8 space-y-4 max-h-[85vh] overflow-y-auto backdrop-blur-2xl shadow-2xl">
          {/* Quick Filter Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search all 16 calculators & tools..."
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
            {mobileSearch && (
              <button
                type="button"
                onClick={() => setMobileSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400"
              >
                Clear
              </button>
            )}
          </div>

          {/* Primary Mobile Navigation Links */}
          <div className="grid grid-cols-3 gap-2 pt-1 pb-2 border-b border-slate-800">
            {TOP_LINKS.map((link) => {
              const isActive = pathname === link.path || pathname?.startsWith(link.path);
              const IconComp = link.icon;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex flex-col items-center justify-center p-2.5 rounded-xl text-center text-xs font-semibold transition-all border',
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:text-white'
                  )}
                >
                  <IconComp className="w-4 h-4 mb-1 text-emerald-400" />
                  <span className="text-[11px] truncate">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Custom EV Studio Launch Button on Mobile */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              openStudio();
            }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Custom EV Studio</span>
          </button>

          {/* Categorized Tools Accordions */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 px-1">
              <span>Interactive Calculators ({filteredCategories.reduce((acc, c) => acc + c.tools.length, 0)})</span>
            </div>

            {filteredCategories.map((cat) => {
              const isExpanded = expandedCategories[cat.id] ?? true;

              return (
                <div
                  key={cat.id}
                  className="bg-slate-900/70 border border-slate-800/80 rounded-2xl overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors hover:bg-slate-800/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs font-bold tracking-tight', cat.accentColor)}>
                        {cat.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400 font-mono">
                        {cat.tools.length}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 text-slate-400 transition-transform duration-200',
                        isExpanded && 'rotate-180 text-white'
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-2 pb-2 space-y-1 divide-y divide-slate-800/50">
                      {cat.tools.map((tool) => {
                        const isActive =
                          tool.path === '/'
                            ? pathname === '/'
                            : pathname?.startsWith(tool.path);
                        const ToolIcon = tool.icon;

                        return (
                          <Link
                            key={tool.path}
                            href={tool.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'flex items-center gap-3 p-2.5 rounded-xl transition-all',
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-300 font-bold'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            )}
                          >
                            <div className={cn('p-1.5 rounded-lg flex-shrink-0', cat.bgColor, cat.accentColor)}>
                              <ToolIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold truncate">
                                  {tool.name}
                                </span>
                                {tool.badge && (
                                  <span className="px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 line-clamp-1">
                                {tool.shortDesc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Settings Drawer Footer (Units & Currency) */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Unit:</span>
              <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setUnit('mi')}
                  className={cn(
                    'px-2.5 py-1 text-xs font-bold rounded-md',
                    unit === 'mi' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                  )}
                >
                  MI
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('km')}
                  className={cn(
                    'px-2.5 py-1 text-xs font-bold rounded-md',
                    unit === 'km' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
                  )}
                >
                  KM
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Currency:</span>
              <select
                value={currency.label}
                onChange={(e) => {
                  const c = CURRENCIES.find((x) => x.label === e.target.value);
                  if (c) setCurrency(c);
                }}
                className="bg-slate-900 text-xs font-bold text-slate-200 border border-slate-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                {CURRENCIES.map((curr) => (
                  <option key={curr.label} value={curr.label}>
                    {curr.label} ({curr.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
