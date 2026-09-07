'use client';

import React, { useState, useMemo } from 'react';
import { useSettings } from '@/components/providers/SettingsProvider';
import { cn } from '@/lib/utils';
import { 
  ThermometerSnowflake, 
  BatteryWarning, 
  Timer, 
  Zap, 
  Info,
  Flame,
  Snowflake,
  Banknote
} from 'lucide-react';

export default function PreconditioningTool() {
  const { unit, distanceLabel, currency } = useSettings();

  const [temperatureF, setTemperatureF] = useState<number>(30); // 30F default
  const [distanceToCharger, setDistanceToCharger] = useState<number>(20); // 20 miles
  const [chargingCost, setChargingCost] = useState<number>(0.48); // $0.48/kWh
  const [carPlatform, setCarPlatform] = useState<'egmp' | 'tesla' | 'standard'>('egmp');

  const calc = useMemo(() => {
    // 1. Calculate time spent driving to charger (assumes 60 mph average = 1 mile/min)
    const driveTimeMins = distanceToCharger;
    const driveTimeHours = driveTimeMins / 60;

    // 2. Calculate preconditioning energy consumed (Heater usually draws 5-7kW)
    // Capped at around 5-6 kWh total for a session
    const heaterPowerKw = 6.0; 
    let precondEnergyKwh = heaterPowerKw * driveTimeHours;
    if (precondEnergyKwh > 5.5) precondEnergyKwh = 5.5; // Battery gets warm eventually

    // Base ideal charge time (10-80%)
    const idealChargeTime = carPlatform === 'egmp' ? 18 : carPlatform === 'tesla' ? 25 : 32;

    // 3. Calculate Cold-Gate Penalty
    // If you arrive cold, the BMS throttles charging until battery warms up.
    // Temps below 60F cause penalty, linearly increasing down to 0F.
    let penaltyMins = 0;
    if (temperatureF < 60) {
      // Rough model: max 25 mins penalty at 0F.
      const tempDiff = 60 - temperatureF;
      
      let platformMultiplier = 1.0;
      if (carPlatform === 'egmp') platformMultiplier = 1.3; // E-GMP notorious for cold-gate (drops to 40kW)
      if (carPlatform === 'tesla') platformMultiplier = 0.9; // Tesla warms slightly faster on stall
      
      penaltyMins = (tempDiff * 0.4) * platformMultiplier; 
    }

    // Cost of the energy burned for preconditioning
    const costOfPreconditioning = precondEnergyKwh * chargingCost;

    // Mileage equivalent burned (assuming 3 miles/kWh)
    const rangeBurnedMiles = Math.round(precondEnergyKwh * 3);

    // Final trade-off
    const netTimeSaved = Math.max(0, penaltyMins);
    
    // Total times
    const precondTotalTime = idealChargeTime; // Only tracking station time for comparison
    const coldTotalTime = idealChargeTime + penaltyMins;

    return {
      precondEnergyKwh,
      costOfPreconditioning,
      rangeBurnedMiles,
      penaltyMins,
      idealChargeTime,
      precondTotalTime,
      coldTotalTime,
      netTimeSaved
    };
  }, [temperatureF, distanceToCharger, chargingCost, carPlatform]);

  // Conversions for UI
  const displayDistance = unit === 'mi' ? distanceToCharger : Math.round(distanceToCharger * 1.60934);
  const displayRangeBurned = unit === 'mi' ? calc.rangeBurnedMiles : Math.round(calc.rangeBurnedMiles * 1.60934);
  const displayTemp = unit === 'mi' ? temperatureF : Math.round((temperatureF - 32) * (5/9));
  const tempLabel = unit === 'mi' ? '°F' : '°C';

  const handleDistanceChange = (val: number) => {
    if (unit === 'km') {
      setDistanceToCharger(val / 1.60934);
    } else {
      setDistanceToCharger(val);
    }
  };

  const handleTempChange = (val: number) => {
    if (unit === 'km') {
      setTemperatureF((val * 9/5) + 32);
    } else {
      setTemperatureF(val);
    }
  };

  return (
    <div className="bg-[#0F141E] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column - Inputs */}
        <div className="lg:col-span-4 p-6 lg:p-8 bg-slate-900/50 border-r border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-cyan-400" />
            Trip Variables
          </h2>
          
          <div className="space-y-8">
            
            {/* Architecture / Car Type */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">
                Vehicle Platform
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setCarPlatform('egmp')}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left",
                    carPlatform === 'egmp' 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="font-bold">E-GMP (Hyundai/Kia/Genesis)</div>
                  <div className="text-xs opacity-70 mt-1">Severe cold-gate, drops to ~40kW if cold.</div>
                </button>
                <button
                  onClick={() => setCarPlatform('tesla')}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left",
                    carPlatform === 'tesla' 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="font-bold">Tesla (Model 3/Y/S/X)</div>
                  <div className="text-xs opacity-70 mt-1">Excellent battery heating, moderate cold-gate.</div>
                </button>
                <button
                  onClick={() => setCarPlatform('standard')}
                  className={cn(
                    "px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left",
                    carPlatform === 'standard' 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <div className="font-bold">Standard EV (400V)</div>
                  <div className="text-xs opacity-70 mt-1">Average 30+ min charge times.</div>
                </button>
              </div>
            </div>

            {/* Outside Temperature */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Snowflake className="w-3 h-3" /> Outside Temp
                </label>
                <span className="text-white font-bold">{displayTemp}{tempLabel}</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min={unit === 'mi' ? 0 : -18} max={unit === 'mi' ? 60 : 15} step="1"
                value={displayTemp}
                onChange={(e) => handleTempChange(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Distance to Charger */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Distance to Charger</label>
                <span className="text-white font-bold">{displayDistance} {distanceLabel}</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="5" max={unit === 'mi' ? 60 : 100} step="1"
                value={displayDistance}
                onChange={(e) => handleDistanceChange(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Charging Cost */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fast Charge Cost</label>
                <span className="text-emerald-400 font-bold">{currency.symbol}{chargingCost.toFixed(2)} / kWh</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="0.10" max="0.90" step="0.01"
                value={chargingCost}
                onChange={(e) => setChargingCost(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-8 p-6 lg:p-10 flex flex-col">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white">The Preconditioning Trade-off</h3>
              <p className="text-sm text-slate-400 mt-1">Comparing 10% to 80% charge time with and without battery heating.</p>
            </div>
            {calc.netTimeSaved > 0 && (
              <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-0.5">Verdict</div>
                <div className="text-lg font-black text-emerald-400 flex items-center gap-2">
                  <Timer className="w-5 h-5" /> Saves {Math.round(calc.netTimeSaved)} mins
                </div>
              </div>
            )}
          </div>

          {/* Visual Race Track / Timeline */}
          <div className="space-y-6 mb-10">
            {/* Path A: Preconditioned */}
            <div className="relative">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-emerald-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Path A: Preconditioned
                </span>
                <span className="text-white font-bold">{Math.round(calc.precondTotalTime)} min at charger</span>
              </div>
              <div className="w-full h-10 bg-slate-800 rounded-xl overflow-hidden flex relative">
                {/* Visual bar */}
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"
                  style={{ width: `${(calc.precondTotalTime / Math.max(calc.precondTotalTime, calc.coldTotalTime)) * 100}%` }}
                >
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:40px_40px]"></div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Arrives warm. Hits peak speeds immediately.
              </div>
            </div>

            {/* Path B: Cold-Gated */}
            <div className="relative">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-cyan-400 flex items-center gap-2">
                  <Snowflake className="w-4 h-4" /> Path B: Arrives Cold (No Preconditioning)
                </span>
                <span className="text-white font-bold">{Math.round(calc.coldTotalTime)} min at charger</span>
              </div>
              <div className="w-full h-10 bg-slate-800 rounded-xl overflow-hidden flex relative">
                <div 
                  className="h-full bg-cyan-900/50 relative border-r border-cyan-500/30 flex items-center"
                  style={{ width: `${(calc.penaltyMins / Math.max(calc.precondTotalTime, calc.coldTotalTime)) * 100}%` }}
                >
                  <div className="w-full text-center text-[10px] font-bold text-cyan-300/50 uppercase tracking-widest whitespace-nowrap overflow-hidden px-2">
                    {Math.round(calc.penaltyMins)}m Throttle
                  </div>
                </div>
                <div 
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 relative"
                  style={{ width: `${(calc.idealChargeTime / Math.max(calc.precondTotalTime, calc.coldTotalTime)) * 100}%` }}
                >
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Throttled to ~40kW while BMS heats battery. Hits peak speeds much later.
              </div>
            </div>
          </div>

          {/* The Hidden Cost Section */}
          <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-slate-400 mb-4">
                <Zap className="w-4 h-4" />
                <h4 className="text-sm font-semibold uppercase tracking-wider">Energy Burned</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{calc.precondEnergyKwh.toFixed(1)}</span>
                <span className="text-slate-500 font-medium">kWh lost on route</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Your screen will show range dropping faster. You burned about <strong>{displayRangeBurned} {distanceLabel}</strong> of range just to heat the pack.
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-slate-400 mb-4">
                <Banknote className="w-4 h-4" />
                <h4 className="text-sm font-semibold uppercase tracking-wider">Financial Cost</h4>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-rose-400">{currency.symbol}{calc.costOfPreconditioning.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Based on {currency.symbol}{chargingCost.toFixed(2)}/kWh. 
                <br />
                <span className="text-white mt-1 block">Is paying {currency.symbol}{calc.costOfPreconditioning.toFixed(2)} worth saving {Math.round(calc.netTimeSaved)} minutes of your life at the charger?</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
