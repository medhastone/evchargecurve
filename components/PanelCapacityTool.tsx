'use client';

import React, { useState, useMemo } from 'react';
import { useSettings } from '@/components/providers/SettingsProvider';
import { cn } from '@/lib/utils';
import { 
  Zap, 
  Home,
  Wind,
  Flame,
  ThermometerSnowflake,
  Bath,
  Car,
  AlertTriangle,
  CheckCircle2,
  Info
} from 'lucide-react';

const APPLIANCES = [
  { id: 'ac', name: 'Central A/C or Heat Pump', loadAmps: 20, icon: ThermometerSnowflake },
  { id: 'dryer', name: 'Electric Clothes Dryer', loadAmps: 20, icon: Wind },
  { id: 'oven', name: 'Electric Range / Oven', loadAmps: 16, icon: Flame },
  { id: 'water_heater', name: 'Electric Water Heater', loadAmps: 16, icon: Zap },
  { id: 'hot_tub', name: 'Hot Tub / Spa', loadAmps: 24, icon: Bath },
];

const PANEL_SIZES = [100, 125, 150, 200];

export default function PanelCapacityTool() {
  const { unit, distanceLabel, formatDistance } = useSettings();
  
  const [panelSize, setPanelSize] = useState<number>(100);
  const [activeAppliances, setActiveAppliances] = useState<Record<string, boolean>>({});
  const [dailyCommuteMiles, setDailyCommuteMiles] = useState<number>(40);

  const toggleAppliance = (id: string) => {
    setActiveAppliances(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calc = useMemo(() => {
    // 1. Calculate max continuous load allowed (NEC 80% Rule)
    const maxContinuousAmps = panelSize * 0.8;

    // 2. Base load for lighting and standard 120V receptacles (estimation)
    const baseLoadAmps = 15; 

    // 3. Sum of selected appliances (using estimated continuous load equivalents)
    let appliancesLoadAmps = 0;
    APPLIANCES.forEach(app => {
      if (activeAppliances[app.id]) {
        appliancesLoadAmps += app.loadAmps;
      }
    });

    const totalExistingContinuousLoad = baseLoadAmps + appliancesLoadAmps;
    
    // 4. Available continuous amps for EV
    const availableContinuousAmps = Math.max(0, maxContinuousAmps - totalExistingContinuousLoad);

    // 5. Determine recommended EV charging current
    let recommendedEvAmps = 0;
    let requiredBreaker = 0;
    
    if (availableContinuousAmps >= 48) { recommendedEvAmps = 48; requiredBreaker = 60; }
    else if (availableContinuousAmps >= 40) { recommendedEvAmps = 40; requiredBreaker = 50; }
    else if (availableContinuousAmps >= 32) { recommendedEvAmps = 32; requiredBreaker = 40; }
    else if (availableContinuousAmps >= 24) { recommendedEvAmps = 24; requiredBreaker = 30; }
    else if (availableContinuousAmps >= 16) { recommendedEvAmps = 16; requiredBreaker = 20; }
    
    const needsUpgrade = recommendedEvAmps === 0;

    // 6. Calculate overnight recovery (10 hours, 240V)
    const chargingKw = (recommendedEvAmps * 240) / 1000;
    const hours = 10;
    const kwhAddedOvernight = chargingKw * hours;
    const milesAddedOvernight = Math.round(kwhAddedOvernight * 3.0); // Avg 3 miles per kWh

    // Safety checks
    const loadPercent = (totalExistingContinuousLoad / maxContinuousAmps) * 100;
    const isDangerouslyHigh = loadPercent >= 90;

    return {
      maxContinuousAmps,
      totalExistingContinuousLoad,
      availableContinuousAmps,
      recommendedEvAmps,
      requiredBreaker,
      needsUpgrade,
      milesAddedOvernight,
      loadPercent,
      isDangerouslyHigh
    };
  }, [panelSize, activeAppliances]);

  // Convert distance for display
  const displayCommute = unit === 'mi' ? dailyCommuteMiles : Math.round(dailyCommuteMiles * 1.60934);
  const displayAddedOvernight = unit === 'mi' ? calc.milesAddedOvernight : Math.round(calc.milesAddedOvernight * 1.60934);

  const handleCommuteChange = (val: number) => {
    if (unit === 'km') {
      setDailyCommuteMiles(val / 1.60934);
    } else {
      setDailyCommuteMiles(val);
    }
  };

  return (
    <div className="bg-[#0F141E] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        
        {/* Left Column - Inputs */}
        <div className="xl:col-span-5 p-6 lg:p-8 bg-slate-900/50 border-r border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-slate-400" />
            Home Electrical Profile
          </h2>
          
          <div className="space-y-8">
            
            {/* Panel Size */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
                Main Electrical Panel Size
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PANEL_SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setPanelSize(size)}
                    className={cn(
                      "py-3 rounded-xl border font-bold text-sm transition-all",
                      panelSize === size 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400" 
                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    {size}A
                  </button>
                ))}
              </div>
            </div>

            {/* Appliances */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                Select Major 240V Appliances
                <div className="group relative">
                  <Info className="w-4 h-4 text-slate-500 cursor-help" />
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-2 bg-slate-800 text-xs text-slate-300 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-10 border border-slate-700 shadow-xl">
                    Select appliances that run on 240V (double breakers). Gas appliances do not draw significant continuous electrical load.
                  </div>
                </div>
              </label>
              <div className="space-y-2">
                {APPLIANCES.map(app => {
                  const Icon = app.icon;
                  const isActive = !!activeAppliances[app.id];
                  return (
                    <button
                      key={app.id}
                      onClick={() => toggleAppliance(app.id)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left",
                        isActive 
                          ? "bg-slate-800 border-slate-600 text-white" 
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/80"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("p-1.5 rounded-md", isActive ? "bg-slate-700 text-white" : "bg-slate-800")}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{app.name}</span>
                      </div>
                      <div className={cn(
                        "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        isActive ? "bg-emerald-500 border-emerald-500" : "border-slate-600"
                      )}>
                        {isActive && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Commute */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Driving Need</label>
                <span className="text-cyan-400 font-bold">{Math.round(displayCommute)} {distanceLabel}</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="5" max={unit === 'mi' ? 150 : 240} step="5"
                value={displayCommute}
                onChange={(e) => handleCommuteChange(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-slate-500 mt-2">How far you drive on an average day.</p>
            </div>

          </div>
        </div>

        {/* Right Column - Results */}
        <div className="xl:col-span-7 p-6 lg:p-10 relative overflow-hidden flex flex-col">
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">NEC Load Calculation</h3>
            <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 font-medium">
              80% Continuous Rule Applied
            </div>
          </div>

          {/* Current Panel Status */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Current Continuous Load</span>
              <span className="text-white font-medium">{calc.totalExistingContinuousLoad}A / {calc.maxContinuousAmps}A Limit</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div 
                className={cn(
                  "h-full transition-all duration-500",
                  calc.isDangerouslyHigh ? "bg-orange-500" : "bg-emerald-500"
                )}
                style={{ width: `${Math.min(100, calc.loadPercent)}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Includes 15A base house load + selected appliances. Max limit is 80% of {panelSize}A.
            </p>
          </div>

          {/* Result Cards */}
          {calc.needsUpgrade ? (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-500 text-xl">Panel Upgrade Required</h4>
                <p className="text-red-400/80 text-sm mt-2 leading-relaxed">
                  Your current {panelSize}A panel is heavily loaded. Adding an EV charger directly would violate NEC continuous load safety rules and likely trip your main breaker.
                </p>
                <div className="mt-4 p-3 bg-red-500/20 rounded-xl text-sm text-red-200">
                  <strong>Solution:</strong> Look into a "Smart Splitter" (like NeoCharge), a load management device (like DCC-9), or contact an electrician for a main panel upgrade.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider block mb-2">Safe Recommended Charger</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black text-white">{calc.recommendedEvAmps}A</span>
                  <span className="text-slate-400 font-medium">Charger</span>
                </div>
                <p className="text-sm text-slate-400 mt-2">Requires a <strong>{calc.requiredBreaker}A</strong> dedicated breaker.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Available Headroom</span>
                  <span className="text-xl font-bold text-white">{calc.availableContinuousAmps}A</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Charging Speed</span>
                  <span className="text-xl font-bold text-cyan-400">~{((calc.recommendedEvAmps * 240) / 1000).toFixed(1)} kW</span>
                </div>
              </div>
            </div>
          )}

          {/* Overnight Recovery Reality Check */}
          {!calc.needsUpgrade && (
            <div className="mt-auto bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400" />
                Overnight Recovery (10 Hours)
              </h4>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="text-2xl font-black text-emerald-400">{displayAddedOvernight} {distanceLabel}</div>
                  <div className="text-xs text-slate-500">Range Added</div>
                </div>
                <div className="px-4 py-2 bg-slate-800 rounded-lg text-center border border-slate-700">
                  <div className="text-sm font-bold text-slate-300">vs</div>
                </div>
                <div className="flex-1 text-right">
                  <div className="text-2xl font-black text-white">{Math.round(displayCommute)} {distanceLabel}</div>
                  <div className="text-xs text-slate-500">Daily Commute</div>
                </div>
              </div>

              {displayAddedOvernight >= displayCommute ? (
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-sm text-emerald-400/90 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    A {calc.recommendedEvAmps}A charger easily covers your daily driving needs overnight. 
                    <strong> You do NOT need to pay thousands to upgrade your panel to get a 50A/60A charger!</strong>
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20 text-sm text-orange-400/90 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    This safe {calc.recommendedEvAmps}A limit won't fully recover your {Math.round(displayCommute)} {distanceLabel} commute overnight. You may need to rely on public DC fast chargers occasionally or look into a smart load management system.
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
