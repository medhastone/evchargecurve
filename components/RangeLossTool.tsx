'use client';

import React, { useState, useMemo } from 'react';
import { VEHICLES } from '@/data/evModels';
import { 
  ThermometerSnowflake, ThermometerSun, Wind, 
  Car, Briefcase, Zap, AlertTriangle, Route, MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { useSettings } from '@/components/providers/SettingsProvider';

type ClimateMode = 'heat_pump' | 'resistive' | 'ac' | 'off';
type Accessory = 'none' | 'roof_box' | 'bike_rack';

export default function RangeLossTool() {
  const { unit, distanceLabel, speedLabel } = useSettings();
  const isMetric = unit === 'km';
  const evModels = Object.values(VEHICLES);
  const [vehicleId, setVehicleId] = useState(evModels[0].id);
  
  const [tempF, setTempF] = useState(70);
  
  
  const [speedMph, setSpeedMph] = useState(65);
  const [climateMode, setClimateMode] = useState<ClimateMode>('heat_pump');
  const [payloadLbs, setPayloadLbs] = useState(0);
  const [accessory, setAccessory] = useState<Accessory>('none');

  const vehicle = useMemo(() => evModels.find(v => v.id === vehicleId) || evModels[0], [vehicleId, evModels]);

  const applyPreset = (preset: 'winter' | 'towing' | 'normal') => {
    if (preset === 'winter') {
      setTempF(10);
      setSpeedMph(70);
      setClimateMode('resistive');
      setPayloadLbs(0);
      setAccessory('none');
    } else if (preset === 'towing') {
      setTempF(85);
      setSpeedMph(65);
      setClimateMode('ac');
      setPayloadLbs(4000);
      setAccessory('none');
    } else if (preset === 'normal') {
      setTempF(70);
      setSpeedMph(55);
      setClimateMode('heat_pump');
      setPayloadLbs(0);
      setAccessory('none');
    }
  };

  const calcResult = useMemo(() => {
    const baseEpaRange = vehicle.epaRangeMiles || 300;
    const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;
    
    let adjustedRange = baseEpaRange;

    // Aero loss from speed (baseline 55mph)
    if (speedMph > 55) {
      const aeroLoss = Math.pow(speedMph / 55, 2) - 1;
      adjustedRange *= (1 - Math.min(aeroLoss * 0.4, 0.6));
    } else if (speedMph < 45 && speedMph > 0) {
      adjustedRange *= 1.05;
    }

    // Temp & Climate
    if (tempF < 70 && climateMode !== 'off') {
      const tempDiff = 70 - tempF;
      let tempLossPercent = climateMode === 'heat_pump' ? (tempDiff * 0.3) : (tempDiff * 0.6);
      if (climateMode === 'heat_pump' && tempLossPercent > 20) tempLossPercent = 20;
      if (climateMode === 'resistive' && tempLossPercent > 35) tempLossPercent = 35;
      adjustedRange *= (1 - (tempLossPercent / 100));
    } else if (tempF > 85 && (climateMode === 'ac' || climateMode === 'heat_pump')) {
      const tempDiff = tempF - 85;
      const acLossPercent = Math.min(tempDiff * 0.4, 15);
      adjustedRange *= (1 - (acLossPercent / 100));
    }

    // Accessories
    if (accessory === 'roof_box') {
      adjustedRange *= 0.88;
    } else if (accessory === 'bike_rack') {
      adjustedRange *= 0.93;
    }
    
    // Towing/Payload
    if (payloadLbs > 0) {
      const weightLossPercent = Math.min((payloadLbs / 1000) * 8, 50); 
      adjustedRange *= (1 - (weightLossPercent / 100));
    }

    const percentageLoss = ((baseEpaRange - adjustedRange) / baseEpaRange) * 100;
    const whPerMi = (packKwh * 1000) / adjustedRange;
    const miPerKwh = adjustedRange / packKwh;

    // Additional stops for 300mi road trip
    // Assuming 10-80% charge usable per stop = 70% of max adjusted range
    const milesPerCharge = adjustedRange * 0.7; 
    const extraStops = Math.max(0, Math.ceil((300 - adjustedRange) / milesPerCharge));

    return {
      adjustedRange,
      percentageLoss,
      whPerMi,
      miPerKwh,
      extraStops,
      baseEpaRange
    };
  }, [vehicle, tempF, speedMph, climateMode, payloadLbs, accessory]);

  const displayTemp = isMetric ? Math.round((tempF - 32) * (5/9)) : tempF;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* PRESETS */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => applyPreset('winter')} className="bg-blue-500/10 border border-blue-500/30 hover:border-blue-500 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left">
          <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><ThermometerSnowflake className="w-5 h-5"/></div>
          <div>
            <h4 className="font-bold text-blue-400">Sub-Zero Road Trip</h4>
            <p className="text-xs text-blue-300/70">10°F, {isMetric ? "112 km/h" : "70 mph"}, Resistive Max</p>
          </div>
        </button>
        <button onClick={() => applyPreset('towing')} className="bg-orange-500/10 border border-orange-500/30 hover:border-orange-500 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left">
          <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><Car className="w-5 h-5"/></div>
          <div>
            <h4 className="font-bold text-orange-400">Summer Boat Towing</h4>
            <p className="text-xs text-orange-300/70">85°F, {isMetric ? "105 km/h" : "65 mph"}, 4000 lbs</p>
          </div>
        </button>
        <button onClick={() => applyPreset('normal')} className="bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 p-4 rounded-2xl flex items-center gap-3 transition-colors text-left">
          <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400"><Route className="w-5 h-5"/></div>
          <div>
            <h4 className="font-bold text-emerald-400">Normal Commute</h4>
            <p className="text-xs text-emerald-300/70">70°F, {isMetric ? "88 km/h" : "55 mph"}, Heat Pump</p>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS */}
        <div className="xl:col-span-6 space-y-6">
          
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Select EV Model</label>
            <select 
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors appearance-none"
            >
              {evModels.map((v: any) => (
                <option key={v.id} value={v.id}>{v.name} (EPA: {Math.round(isMetric ? v.epaRangeMiles * 1.609 : v.epaRangeMiles)} {distanceLabel})</option>
              ))}
            </select>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl space-y-8">
            
            {/* Temp */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  {tempF < 50 ? <ThermometerSnowflake className="w-4 h-4 text-blue-400"/> : <ThermometerSun className="w-4 h-4 text-orange-400"/>}
                  Ambient Temp
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-400">{displayTemp}°{isMetric ? "C" : "F"}</span>
                  
                </div>
              </div>
              <input 
                type="range" min="-20" max="105" step="1"
                value={tempF} onChange={(e) => setTempF(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Speed */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-300 flex items-center gap-2"><Wind className="w-4 h-4"/> Cruising Speed</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[55, 65, 70, 75, 80].map(s => (
                  <button
                    key={s} onClick={() => setSpeedMph(s)}
                    className={cn(
                      "flex-1 py-2 text-sm font-bold rounded-xl border transition-all",
                      speedMph === s ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    )}
                  >
                    {isMetric ? Math.round(s * 1.609) : s} <span className="text-xs font-normal">{speedLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Climate */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-300">Climate Control</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'heat_pump', label: 'Heat Pump Auto' },
                  { id: 'resistive', label: 'Resistive Max' },
                  { id: 'ac', label: 'AC Cooling' },
                  { id: 'off', label: 'Off' }
                ].map(c => (
                  <button
                    key={c.id} onClick={() => setClimateMode(c.id as ClimateMode)}
                    className={cn(
                      "py-2 text-xs font-semibold rounded-xl border transition-all",
                      climateMode === c.id ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payload / Towing */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Briefcase className="w-4 h-4"/> Towing / Payload
                </span>
                <span className="text-sm font-bold text-emerald-400">{payloadLbs.toLocaleString()} lbs</span>
              </div>
              <input 
                type="range" min="0" max="7500" step="100"
                value={payloadLbs} onChange={(e) => setPayloadLbs(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Accessories */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-300">Aero Accessories</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'roof_box', label: 'Roof Box (-12%)' },
                  { id: 'bike_rack', label: 'Rear Bike Rack (-7%)' }
                ].map(a => (
                  <button
                    key={a.id} onClick={() => setAccessory(a.id as Accessory)}
                    className={cn(
                      "flex-1 py-2 text-xs font-semibold rounded-xl border transition-all",
                      accessory === a.id ? "bg-purple-500/20 border-purple-500/50 text-purple-400" : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500"
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: RESULTS */}
        <div className="xl:col-span-6 space-y-6">
          
          {/* Main Visualizer */}
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <Zap className="w-32 h-32 text-emerald-500" />
            </div>

            <h3 className="text-lg font-bold text-white mb-6">Real-World Range Estimation</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Factory EPA Rating</span>
                  <span className="text-white font-bold">{Math.round(isMetric ? calcResult.baseEpaRange * 1.609 : calcResult.baseEpaRange)} {distanceLabel}</span>
                </div>
                <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-emerald-400 font-bold">Calculated Highway Range</span>
                  <span className="text-emerald-400 font-black text-xl">{Math.round(isMetric ? calcResult.adjustedRange * 1.609 : calcResult.adjustedRange)} {distanceLabel}</span>
                </div>
                <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden flex">
                  <div 
                    className={cn(
                      "h-full transition-all duration-500",
                      calcResult.percentageLoss > 30 ? "bg-orange-500" : calcResult.percentageLoss > 15 ? "bg-amber-400" : "bg-emerald-500"
                    )} 
                    style={{ width: `${Math.max(0, (calcResult.adjustedRange / calcResult.baseEpaRange) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {calcResult.percentageLoss > 0 ? (
              <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-bold text-sm">
                    -{Math.round(calcResult.percentageLoss)}% Range Penalty
                  </span>
                </div>
              </div>
            ) : calcResult.percentageLoss < 0 ? (
               <div className="mt-8 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold text-sm">
                    +{Math.abs(Math.round(calcResult.percentageLoss))}% Range Bonus
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">Efficiency</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-black text-white">{Math.round(calcResult.whPerMi)}</p>
                <p className="text-sm font-normal text-slate-400 mb-1">Wh/{distanceLabel}</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">{(isMetric ? calcResult.miPerKwh / 1.609 : calcResult.miPerKwh).toFixed(2)} {distanceLabel}/kWh</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">{isMetric ? "500-km" : "300-Mile"} Trip</p>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-black text-cyan-400">+{calcResult.extraStops}</p>
                <p className="text-sm font-normal text-slate-400 mb-1">DC stops</p>
              </div>
              <p className="text-xs text-slate-500 mt-2">Assuming 10-80% charges</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Trip Planning Insight</h4>
              <p className="text-sm text-blue-200/80 leading-relaxed">
                A {isMetric ? "500-km" : "300-mile"} highway journey in these exact conditions will require charging stops to break up the drive. Relying on your vehicle&apos;s built-in navigation is highly recommended, as it will precondition the battery pack before arrival at the DC fast charger, ensuring you get optimal charging speeds upon plug-in.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
