'use client';

import React, { useState } from 'react';
import { Battery, Clock, Zap, Car, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useVehicles } from '@/components/providers/VehicleContext';

const CHARGER_LEVELS = [
  { id: '16a', label: '16A (3.8 kW)', kw: 3.8, desc: 'Basic 208V/240V' },
  { id: '24a', label: '24A (5.7 kW)', kw: 5.7, desc: 'Shared Commercial' },
  { id: '32a', label: '32A (7.6 kW)', kw: 7.6, desc: 'Standard Level 2' },
  { id: '40a', label: '40A (9.6 kW)', kw: 9.6, desc: 'Fast Level 2' },
  { id: '48a', label: '48A (11.5 kW)', kw: 11.5, desc: 'Max Level 2' },
];

export default function DestinationChargingTool() {
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();
  const [vehicleId, setVehicleId] = useState<string>(allVehicles[0]?.id || 'tesla-model-y-lr');
  const [arrivalSoc, setArrivalSoc] = useState<number>(20);
  const [arrivalTime, setArrivalTime] = useState<string>('21:00');
  const [departureTime, setDepartureTime] = useState<string>('07:30');
  const [chargerKw, setChargerKw] = useState<number>(6.6); // Custom or preset

  const vehicle = vehiclesMap[vehicleId] || allVehicles[0];
  if (!vehicle) return null;

  const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;

  // Calculate Duration
  const getDurationHours = () => {
    const [arrH, arrM] = arrivalTime.split(':').map(Number);
    const [depH, depM] = departureTime.split(':').map(Number);
    
    let arrDec = arrH + (arrM || 0) / 60;
    let depDec = depH + (depM || 0) / 60;
    
    if (depDec <= arrDec) {
      depDec += 24; // Crosses midnight
    }
    return depDec - arrDec;
  };

  const durationHours = getDurationHours();
  const AC_TO_DC_EFFICIENCY = 0.90; // Typical onboard charger efficiency
  const startingKwh = packKwh * (arrivalSoc / 100);
  const energyAddedKwh = chargerKw * durationHours * AC_TO_DC_EFFICIENCY;
  
  const rawFinalKwh = startingKwh + energyAddedKwh;
  const finalKwh = Math.min(packKwh, rawFinalKwh);
  const finalSoc = (finalKwh / packKwh) * 100;
  
  const kwhNeededForFull = packKwh - startingKwh;
  const hoursToFull = kwhNeededForFull / (chargerKw * AC_TO_DC_EFFICIENCY);
  const reachedFull = durationHours >= hoursToFull;
  
  const dcFastChargeTimeSavedMinutes = Math.round(energyAddedKwh / 2.0); // Rough estimate: 2kWh per minute at typical DC fast charger
  
  // Format completion time
  const getCompletionTime = () => {
    if (!reachedFull) return null;
    const [arrH, arrM] = arrivalTime.split(':').map(Number);
    const totalMinutes = (arrH * 60 + arrM) + Math.round(hoursToFull * 60);
    const completionH = Math.floor(totalMinutes / 60) % 24;
    const completionM = totalMinutes % 60;
    return `${completionH.toString().padStart(2, '0')}:${completionM.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto" role="region" aria-label="Hotel Overnight EV Charging Sizer Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-amber-400" />
              Trip &amp; Charging Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="destination-vehicle-select" className="block text-sm font-medium text-slate-300">
                    Vehicle Model
                  </label>
                  <button
                    type="button"
                    onClick={() => openStudio()}
                    aria-label="Open Custom Electric Vehicle Studio"
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    + Custom EV
                  </button>
                </div>
                <select
                  id="destination-vehicle-select"
                  aria-label="Select Electric Vehicle Model"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all text-sm font-medium"
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

              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="arrival-soc-slider" className="text-sm font-medium text-slate-300">
                    Arrival Battery (SoC)
                  </label>
                  <span className="text-amber-400 font-bold">{arrivalSoc}%</span>
                </div>
                <input
                  id="arrival-soc-slider"
                  aria-label="Arrival Battery State of Charge percentage slider"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={arrivalSoc}
                  onChange={(e) => setArrivalSoc(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="arrival-time-input" className="block text-sm font-medium text-slate-300 mb-2">
                    Arrival Time
                  </label>
                  <input
                    id="arrival-time-input"
                    aria-label="Hotel arrival check-in time"
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label htmlFor="departure-time-input" className="block text-sm font-medium text-slate-300 mb-2">
                    Departure Time
                  </label>
                  <input
                    id="departure-time-input"
                    aria-label="Morning departure checkout time"
                    type="time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="charger-kw-input" className="block text-sm font-medium text-slate-300 mb-2">
                  Hotel Charger Power (kW)
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3" role="group" aria-label="Common Hotel Level 2 Charger Power Tiers">
                  {CHARGER_LEVELS.map(level => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setChargerKw(level.kw)}
                      aria-label={`Set charger power to ${level.kw} kilowatts (${level.label})`}
                      aria-pressed={chargerKw === level.kw}
                      className={cn(
                        "px-3 py-2 rounded-xl text-sm font-medium border text-left transition-all",
                        chargerKw === level.kw 
                          ? "bg-amber-500/20 border-amber-500 text-amber-400" 
                          : "bg-[#0B0F17] border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"
                      )}
                    >
                      <div className="font-bold">{level.kw} kW</div>
                      <div className="text-xs opacity-80 font-normal">{level.label}</div>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    id="charger-kw-input"
                    aria-label="Custom hotel charger power rating in kilowatts"
                    type="number"
                    min="1"
                    max="22"
                    step="0.1"
                    value={chargerKw}
                    onChange={(e) => setChargerKw(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all pr-12 font-mono"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold" aria-hidden="true">kW</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
              <div className="flex items-center gap-3 mb-4 text-slate-300">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Sleep Window</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{durationHours.toFixed(1)} <span className="text-xl text-slate-400 font-normal">hrs</span></div>
              <p className="text-sm text-slate-400">Total stationary dwell time</p>
            </div>

            <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
              <div className="flex items-center gap-3 mb-4 text-slate-300">
                <Zap className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">Energy Added</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{energyAddedKwh.toFixed(1)} <span className="text-xl text-slate-400 font-normal">kWh</span></div>
              <p className="text-sm text-slate-400">After 10% AC-to-DC loss</p>
            </div>

            <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
              <div className="flex items-center gap-3 mb-4 text-slate-300">
                <Clock className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">Time Saved</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">~{dcFastChargeTimeSavedMinutes} <span className="text-xl text-slate-400 font-normal">min</span></div>
              <p className="text-sm text-slate-400">Highway DC stops eliminated</p>
            </div>
          </div>

          <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Battery className="w-5 h-5 text-amber-400" />
                Morning Departure State
              </h3>
              
              {reachedFull ? (
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3.5 py-1.5 rounded-full text-sm font-semibold border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  Full at {getCompletionTime()}
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3.5 py-1.5 rounded-full text-sm font-semibold border border-amber-500/20">
                  <AlertCircle className="w-4 h-4" />
                  Partial Charge ({Math.round(finalSoc)}%)
                </div>
              )}
            </div>

            <div className="relative pt-4 pb-4">
              {/* Battery Visualization */}
              <div 
                role="progressbar"
                aria-label="Overnight battery recharge progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(finalSoc)}
                className="h-24 w-full bg-[#0B0F17] rounded-2xl border border-slate-700 relative overflow-hidden"
              >
                {/* Initial Charge */}
                <div 
                  className="absolute top-0 left-0 h-full bg-slate-700 transition-all duration-500 ease-out"
                  style={{ width: `${arrivalSoc}%` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" aria-hidden="true"></div>
                </div>
                
                {/* Added Charge */}
                <div 
                  className={cn(
                    "absolute top-0 h-full transition-all duration-500 ease-out",
                    reachedFull ? "bg-emerald-500" : "bg-amber-500"
                  )}
                  style={{ 
                    left: `${arrivalSoc}%`,
                    width: `${finalSoc - arrivalSoc}%` 
                  }}
                >
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:20px_20px]" aria-hidden="true"></div>
                </div>

                {/* Percentage Text overlays */}
                <div className="absolute inset-0 flex items-center px-6">
                  <div 
                    className="absolute font-bold text-white/70 text-lg transition-all duration-500"
                    style={{ left: `max(20px, ${arrivalSoc / 2}%)`, transform: 'translateX(-50%)' }}
                  >
                    {arrivalSoc}%
                  </div>
                  {finalSoc - arrivalSoc > 5 && (
                    <div 
                      className="absolute font-bold text-white drop-shadow-md text-3xl transition-all duration-500"
                      style={{ 
                        left: `min(85%, ${arrivalSoc + ((finalSoc - arrivalSoc) / 2)}%)`, 
                        transform: 'translateX(-50%)' 
                      }}
                    >
                      {Math.round(finalSoc)}%
                    </div>
                  )}
                </div>
              </div>

              {/* Markers */}
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-1" aria-hidden="true">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-8 bg-[#0B0F17] rounded-2xl p-6 border border-slate-800" aria-live="polite">
              <h4 className="text-white font-bold mb-3">Simulation Summary</h4>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Plugging your <strong className="text-white">{vehicle.name}</strong> into a <strong className="text-white">{chargerKw} kW</strong> hotel charger from <strong className="text-white">{arrivalTime}</strong> to <strong className="text-white">{departureTime}</strong> ({durationHours.toFixed(1)} hours) will add approximately <strong className="text-white">{Math.round((finalSoc - arrivalSoc) * packKwh / 100)} kWh</strong> of net energy to the battery pack. 
              </p>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base mt-3">
                You will wake up with <strong className={reachedFull ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>{Math.round(finalSoc)}%</strong> charge, effectively saving approximately <strong className="text-white font-bold">{dcFastChargeTimeSavedMinutes} minutes</strong> that you would have otherwise spent at a highway fast charger the next morning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
