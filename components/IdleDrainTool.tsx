'use client';

import React, { useState, useMemo } from 'react';
import { useSettings } from '@/components/providers/SettingsProvider';
import { useVehicles } from '@/components/providers/VehicleContext';
import { cn } from '@/lib/utils';
import { 
  ShieldAlert, 
  Snowflake, 
  ThermometerSun, 
  Thermometer, 
  BatteryWarning, 
  BatteryMedium,
  Plane,
  AlertTriangle,
  ZapOff,
  PlusCircle
} from 'lucide-react';

export default function IdleDrainTool() {
  const { unit, distanceLabel, formatDistance } = useSettings();
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();
  
  // States
  const [vehicleId, setVehicleId] = useState(allVehicles[0]?.id || 'tesla-model-y-lr');
  const [days, setDays] = useState(7);
  const [startSoc, setStartSoc] = useState(60);
  const [temperature, setTemperature] = useState<'mild' | 'hot' | 'freezing'>('mild');
  const [sentryEnabled, setSentryEnabled] = useState(false);
  const [bufferDistanceMiles, setBufferDistanceMiles] = useState(30);

  const vehicle = vehiclesMap[vehicleId] || allVehicles[0];
  
  const packKwh = vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75;
  const rangeMiles = vehicle?.epaRangeMiles || 300;
  
  // Calculate drains
  const calculations = useMemo(() => {
    // Base drain depending on temp
    let baseDrainPctPerDay = 0.5; // Mild (Deep sleep)
    if (temperature === 'hot') baseDrainPctPerDay = 1.0; // Cooling BMS loops
    if (temperature === 'freezing') baseDrainPctPerDay = 1.5; // Heating BMS loops

    // Sentry / Gear Guard drain (assume 250W continuous)
    const sentryKwhPerDay = sentryEnabled ? 6.0 : 0; 
    const sentryPctPerDay = (sentryKwhPerDay / packKwh) * 100;

    const totalPctPerDay = baseDrainPctPerDay + sentryPctPerDay;
    const totalLostPct = Math.min(startSoc, totalPctPerDay * days);
    const endSoc = Math.max(0, startSoc - totalLostPct);
    
    // Calculate distance capacity left
    const rangeAtEnd = (endSoc / 100) * rangeMiles;
    
    // Warning thresholds
    const isDead = endSoc === 0;
    const daysUntilDead = startSoc / totalPctPerDay;
    const cannotReachCharger = !isDead && rangeAtEnd < bufferDistanceMiles;

    return {
      baseDrainPctPerDay,
      sentryPctPerDay,
      totalPctPerDay,
      totalLostPct,
      endSoc,
      rangeAtEnd,
      isDead,
      daysUntilDead,
      cannotReachCharger
    };
  }, [temperature, sentryEnabled, packKwh, days, startSoc, rangeMiles, bufferDistanceMiles]);

  // Convert buffer distance to user unit for display
  const displayBufferDistance = unit === 'mi' ? bufferDistanceMiles : Math.round(bufferDistanceMiles * 1.60934);

  const handleBufferChange = (val: number) => {
    // Save as miles internally
    if (unit === 'km') {
      setBufferDistanceMiles(val / 1.60934);
    } else {
      setBufferDistanceMiles(val);
    }
  };

  if (!vehicle) return null;

  return (
    <div className="bg-[#0F141E] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 xl:grid-cols-12">
        
        {/* Left Column - Controls */}
        <div className="xl:col-span-5 p-6 lg:p-8 bg-slate-900/50 border-r border-slate-800">
          <h2 className="text-xl font-bold text-white mb-6">Parking Scenario</h2>
          
          <div className="space-y-6">
            {/* Vehicle Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Select Vehicle
                </label>
                <button
                  type="button"
                  onClick={() => openStudio()}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  + Custom EV
                </button>
              </div>
              <select aria-label="Select option" 
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-emerald-500 font-medium text-sm"
              >
                {customVehicles.length > 0 && (
                  <optgroup label="⭐ My Custom Vehicles">
                    {customVehicles.map(v => (
                      <option key={v.id} value={v.id}>[Custom] {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)</option>
                    ))}
                  </optgroup>
                )}
                <optgroup label="🚘 Production Vehicles">
                  {allVehicles.filter(v => !isCustomVehicle(v.id)).map(v => (
                    <option key={v.id} value={v.id}>{v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Days Parked */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Days Parked</label>
                <span className="text-emerald-400 font-bold">{days} Days</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="1" max="45" step="1"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Starting SOC */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Arrival Battery (SOC)</label>
                <span className="text-cyan-400 font-bold">{startSoc}%</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="5" max="100" step="1"
                value={startSoc}
                onChange={(e) => setStartSoc(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Environment Temperature
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTemperature('freezing')}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-medium gap-1",
                    temperature === 'freezing' 
                      ? "bg-blue-500/10 border-blue-500/50 text-blue-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                  )}
                >
                  <Snowflake className="w-5 h-5" />
                  Freezing
                </button>
                <button
                  onClick={() => setTemperature('mild')}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-medium gap-1",
                    temperature === 'mild' 
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                  )}
                >
                  <Thermometer className="w-5 h-5" />
                  Mild
                </button>
                <button
                  onClick={() => setTemperature('hot')}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-xs font-medium gap-1",
                    temperature === 'hot' 
                      ? "bg-orange-500/10 border-orange-500/50 text-orange-400" 
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                  )}
                >
                  <ThermometerSun className="w-5 h-5" />
                  Hot
                </button>
              </div>
            </div>

            {/* Sentry Mode */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
                Surveillance Features
              </label>
              <button
                onClick={() => setSentryEnabled(!sentryEnabled)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border transition-all",
                  sentryEnabled 
                    ? "bg-red-500/10 border-red-500/50 text-red-400" 
                    : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"
                )}
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold text-sm">Sentry Mode / Gear Guard</div>
                    <div className="text-xs opacity-70 mt-0.5">Continuous ~250W power draw</div>
                  </div>
                </div>
                <div className={cn(
                  "w-10 h-5 rounded-full relative transition-colors",
                  sentryEnabled ? "bg-red-500" : "bg-slate-600"
                )}>
                  <div className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full transition-all",
                    sentryEnabled ? "left-5" : "left-1"
                  )} />
                </div>
              </button>
            </div>

            {/* Nearest Charger Buffer */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Distance to Charger</label>
                <span className="text-slate-300 font-bold">{Math.round(displayBufferDistance)} {distanceLabel}</span>
              </div>
              <input 
                aria-label="Adjust slider" type="range" min="5" max={unit === 'mi' ? 100 : 160} step="1"
                value={displayBufferDistance}
                onChange={(e) => handleBufferChange(Number(e.target.value))}
                className="w-full accent-slate-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="xl:col-span-7 p-6 lg:p-10 relative overflow-hidden flex flex-col justify-center">
          
          <h3 className="text-xl font-bold text-white mb-8">Return Day Projection</h3>

          {/* Top KPI row */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Battery Upon Return</span>
              <div className="flex items-center justify-center gap-2">
                {calculations.isDead ? (
                  <ZapOff className="w-8 h-8 text-red-500" />
                ) : calculations.endSoc < 10 ? (
                  <BatteryWarning className="w-8 h-8 text-orange-500" />
                ) : (
                  <BatteryMedium className="w-8 h-8 text-emerald-400" />
                )}
                <span className={cn(
                  "text-4xl font-black",
                  calculations.isDead ? "text-red-500" : (calculations.endSoc < 10 ? "text-orange-500" : "text-white")
                )}>
                  {calculations.endSoc.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Total Drain Lost</span>
              <span className="text-4xl font-black text-slate-300 block">
                -{calculations.totalLostPct.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Warning Banner */}
          {calculations.isDead && (
            <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-500 text-lg">Vehicle Dead!</h4>
                <p className="text-red-400/80 text-sm mt-1">
                  Your {vehicle.name} will completely die in approximately <strong>{Math.floor(calculations.daysUntilDead)} days</strong>. You will not be able to unlock the doors or drive without a 12V jump and flatbed tow. 
                </p>
              </div>
            </div>
          )}

          {!calculations.isDead && calculations.cannotReachCharger && (
            <div className="mb-8 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-orange-500 text-lg">Stranded Warning</h4>
                <p className="text-orange-400/80 text-sm mt-1">
                  You will return with {calculations.endSoc.toFixed(1)}% ({Math.round(formatDistance(calculations.rangeAtEnd))} {distanceLabel} range). You need to drive {Math.round(displayBufferDistance)} {distanceLabel} to the nearest charger. <strong>You will not make it.</strong> 
                </p>
              </div>
            </div>
          )}

          {!calculations.isDead && !calculations.cannotReachCharger && calculations.endSoc < 20 && (
            <div className="mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-500 text-lg">Low Buffer</h4>
                <p className="text-yellow-400/80 text-sm mt-1">
                  You will make it to the nearest charger, but arriving at {calculations.endSoc.toFixed(1)}% leaves very little margin for error (cold weather driving, detours).
                </p>
              </div>
            </div>
          )}

          {/* Detailed Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-white mb-4">Daily Drain Breakdown</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <span className="text-slate-300 font-medium block">Deep Sleep BMS</span>
                  <span className="text-xs text-slate-500">Normal computer idle</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold">{calculations.baseDrainPctPerDay.toFixed(1)}% / day</span>
                </div>
              </div>

              {sentryEnabled && (
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-slate-300 font-medium block">Surveillance Systems</span>
                    <span className="text-xs text-slate-500">Sentry Mode / Gear Guard active</span>
                  </div>
                  <div className="text-right">
                    <span className="text-red-400 font-bold">+{calculations.sentryPctPerDay.toFixed(1)}% / day</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-white font-bold block text-lg">Total Daily Drain</span>
                </div>
                <div className="text-right">
                  <span className="text-cyan-400 font-bold text-lg">{calculations.totalPctPerDay.toFixed(1)}% / day</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
