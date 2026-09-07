'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Zap, Search, Filter, PlusCircle, Edit3, Trash2, Sparkles, Battery, Clock, ArrowRight, Check 
} from 'lucide-react';
import { useVehicles } from '@/components/providers/VehicleContext';
import { computeQuickBenchmarks } from '@/lib/curveSynthesizer';
import Breadcrumb from '@/components/Breadcrumb';

export default function VehicleDirectoryView() {
  const { allVehicles, customVehicles, openStudio, deleteCustomVehicle, isCustomVehicle } = useVehicles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedArch, setSelectedArch] = useState('all');
  const [activeTab, setActiveTab] = useState<'all' | 'custom' | '800v' | '400v'>('all');

  // Extract all unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    allVehicles.forEach(v => {
      if (v.brand) set.add(v.brand);
    });
    return Array.from(set).sort();
  }, [allVehicles]);

  const filteredVehicles = useMemo(() => {
    return allVehicles.filter(v => {
      // Tab filter
      if (activeTab === 'custom' && !isCustomVehicle(v.id)) return false;
      if (activeTab === '800v' && v.architecture !== '800V') return false;
      if (activeTab === '400v' && v.architecture !== '400V') return false;

      // Brand filter
      if (selectedBrand !== 'all' && v.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;

      // Architecture filter
      if (selectedArch !== 'all' && v.architecture !== selectedArch) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = v.name.toLowerCase().includes(query);
        const matchBrand = v.brand.toLowerCase().includes(query);
        const matchModel = (v.model || '').toLowerCase().includes(query);
        const matchChem = (v.chemistry || '').toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchModel && !matchChem) return false;
      }

      return true;
    });
  }, [allVehicles, activeTab, selectedBrand, selectedArch, searchQuery, isCustomVehicle]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Breadcrumb items={[{ label: 'EV Charging Curves' }]} />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Zap className="w-3.5 h-3.5" /> Comprehensive Global Database &amp; Pro Studio
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          EV Fast-Charging Curve Directory
        </h1>
        <p className="text-base sm:text-lg text-slate-300">
          Explore lab-tested &amp; real-world DC fast-charging taper curves across production EVs, or build custom BMS curves for any vehicle worldwide.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openStudio()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02]"
          >
            <PlusCircle className="w-5 h-5" />
            <span>+ Add / Synthesize Custom Vehicle</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 sm:p-6 rounded-2xl mb-8 space-y-4 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vehicle make, model, chemistry (e.g. Tesla, 800V, LFP, Ioniq)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* Brand select */}
          <div className="w-full md:w-48">
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Brands ({brands.length})</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Architecture select */}
          <div className="w-full md:w-44">
            <select
              value={selectedArch}
              onChange={(e) => setSelectedArch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Voltages</option>
              <option value="800V">800V High Voltage</option>
              <option value="400V">400V Standard</option>
            </select>
          </div>
        </div>

        {/* Quick Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
          {[
            { id: 'all', label: `All Vehicles (${allVehicles.length})` },
            { id: 'custom', label: `My Custom EVs (${customVehicles.length})` },
            { id: '800v', label: '800V Ultra-Fast Fleet' },
            { id: '400v', label: '400V Standard Fleet' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Vehicles */}
      {filteredVehicles.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center max-w-xl mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <Battery className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No matching vehicles found</h3>
          <p className="text-sm text-slate-400 mb-6">
            Can&apos;t find your specific vehicle or trim in the directory? Build a custom profile with full BMS taper synthesis in seconds.
          </p>
          <button
            onClick={() => openStudio()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all text-sm"
          >
            <PlusCircle className="w-4 h-4" />
            + Create Custom EV Profile
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((v) => {
            const isCustom = isCustomVehicle(v.id);
            const curve = v.curve || v.curvePoints || [];
            const benchmarks = computeQuickBenchmarks({
              curve,
              usablePackKwh: v.usablePackKwh,
              batteryCapacity: v.batteryCapacity,
              epaRangeMiles: v.epaRangeMiles
            });

            return (
              <div
                key={v.id}
                className={`group relative bg-slate-900/50 border rounded-2xl p-6 transition-all flex flex-col justify-between hover:shadow-2xl ${
                  isCustom 
                    ? 'border-emerald-500/40 hover:border-emerald-500 bg-emerald-950/10' 
                    : 'border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  {/* Top Bar: Brand & Architecture Badges */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        {v.brand}
                      </span>
                      {isCustom && (
                        <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Custom Mod
                        </span>
                      )}
                    </div>
                    <span className={`text-xs px-2.5 py-0.5 rounded-md font-black border ${
                      v.architecture === '800V' 
                        ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {v.architecture}
                    </span>
                  </div>

                  {/* Vehicle Name */}
                  <h2 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors mb-2 leading-snug">
                    {v.name}
                  </h2>

                  {/* Chemistry & Release Year */}
                  <p className="text-xs text-slate-400 mb-5">
                    {v.chemistry} Chemistry &bull; {v.usablePackKwh || v.batteryCapacity} kWh Usable &bull; {v.year || 2024}
                  </p>

                  {/* Benchmark Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-5 text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Peak Power</p>
                      <p className="text-sm font-black text-emerald-400">{v.maxChargeKw} kW</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">10-80% Dwell</p>
                      <p className="text-sm font-black text-white">{benchmarks.time10to80Minutes} min</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">15-Min Gain</p>
                      <p className="text-sm font-black text-amber-400">+{benchmarks.milesAdded15Min} mi</p>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  {isCustom ? (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => openStudio(v)}
                        className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Curve
                      </button>
                      <Link
                        href={`/simulator?vid=${v.id}`}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        Simulate
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${v.name}?`)) {
                            deleteCustomVehicle(v.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/30 transition-colors"
                        title="Delete custom vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between w-full">
                      <Link 
                        href={`/curve/${v.id}`}
                        className="text-xs font-bold text-slate-300 group-hover:text-emerald-400 flex items-center gap-1 hover:underline"
                      >
                        <span>View BMS Curve</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => openStudio(v)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-colors border border-slate-700"
                          title="Clone into Custom Studio"
                        >
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>Clone</span>
                        </button>
                        <Link
                          href={`/simulator?vid=${v.id}`}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1 transition-colors"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Simulate</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
