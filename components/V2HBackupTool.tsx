'use client';

import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  Home, 
  Battery, 
  Clock,
  Car,
  CheckCircle2,
  AlertTriangle,
  Snowflake,
  Wifi,
  Flame,
  Droplets,
  Tv,
  Thermometer,
  Coffee,
  PlusCircle,
  ShieldCheck,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { useVehicles } from '@/components/providers/VehicleContext';

interface ApplianceItem {
  id: string;
  name: string;
  dailyKwh: number;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  defaultChecked: boolean;
}

const APPLIANCES: ApplianceItem[] = [
  { id: 'fridge', name: 'ENERGY STAR Refrigerator', dailyKwh: 1.5, icon: Snowflake, category: 'Essential', defaultChecked: true },
  { id: 'internet', name: 'Wi-Fi Router & LED Lighting', dailyKwh: 0.8, icon: Wifi, category: 'Essential', defaultChecked: true },
  { id: 'sump', name: 'Sump Pump (Intermittent)', dailyKwh: 1.2, icon: Droplets, category: 'Critical', defaultChecked: false },
  { id: 'well', name: 'Well Water Pump', dailyKwh: 1.5, icon: Droplets, category: 'Critical', defaultChecked: false },
  { id: 'tv', name: 'Smart TV & Home Workstation', dailyKwh: 0.6, icon: Tv, category: 'Comfort', defaultChecked: true },
  { id: 'microwave', name: 'Microwave & Induction (20m)', dailyKwh: 0.5, icon: Coffee, category: 'Comfort', defaultChecked: true },
  { id: 'furnace', name: 'Gas Furnace Blower Fan', dailyKwh: 2.4, icon: Flame, category: 'Critical', defaultChecked: false },
  { id: 'mini-split', name: 'Mini-Split Heat Pump (1 Zone)', dailyKwh: 7.5, icon: Thermometer, category: 'HVAC', defaultChecked: false },
  { id: 'water-heater', name: 'Electric Water Heater', dailyKwh: 12.0, icon: Flame, category: 'Heavy Load', defaultChecked: false }
];

export default function V2HBackupTool() {
  const { allVehicles, vehiclesMap, openStudio, customVehicles, isCustomVehicle } = useVehicles();

  // Pick default vehicle if available, or Ford F-150 Lightning
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(() => {
    const f150 = allVehicles.find(v => v.id.includes('f-150') || v.id.includes('lightning') || v.id.includes('cybertruck'));
    return f150 ? f150.id : (allVehicles[0]?.id || 'ford-f150-lightning-er');
  });

  const [reserveBuffer, setReserveBuffer] = useState<number>(20);
  const [activeAppliances, setActiveAppliances] = useState<Record<string, boolean>>(() =>
    APPLIANCES.reduce((acc, app) => ({ ...acc, [app.id]: app.defaultChecked }), {})
  );
  const [copied, setCopied] = useState(false);

  const vehicle = useMemo(() => {
    return vehiclesMap[selectedVehicleId] || allVehicles[0] || {
      id: 'custom',
      name: 'Ford F-150 Lightning Extended',
      usablePackKwh: 131,
      batteryCapacity: 131
    };
  }, [selectedVehicleId, vehiclesMap, allVehicles]);

  const totalBatteryCapacity = vehicle.usablePackKwh || vehicle.batteryCapacity || 100;
  // Apply reserve driving buffer & 88% roundtrip inverter efficiency
  const usableCapacityForHome = Math.max(0, (totalBatteryCapacity * (1 - reserveBuffer / 100)) * 0.88);
  const reservedForDrivingKwh = totalBatteryCapacity * (reserveBuffer / 100);

  const dailyLoad = useMemo(() => {
    return APPLIANCES.reduce((total, app) => {
      if (activeAppliances[app.id]) {
        return total + app.dailyKwh;
      }
      return total;
    }, 0);
  }, [activeAppliances]);

  const durationDays = dailyLoad > 0 ? usableCapacityForHome / dailyLoad : 0;
  const fullDays = Math.floor(durationDays);
  const remainingHours = Math.round((durationDays - fullDays) * 24);

  // Fast-rendering, lightweight timeline data
  const chartData = useMemo(() => {
    if (dailyLoad === 0) return [];
    const data = [];
    let currentEnergy = usableCapacityForHome;
    const hourlyLoad = dailyLoad / 24;
    
    let hour = 0;
    const maxHours = Math.min(24 * 30, Math.ceil(durationDays * 24));
    const step = Math.max(6, Math.floor(maxHours / 10));

    while (hour <= maxHours && currentEnergy >= 0) {
      data.push({
        hour,
        displayTime: hour < 24 ? `${hour}h` : `D${Math.floor(hour / 24)} +${hour % 24}h`,
        energy: Number(Math.max(0, currentEnergy).toFixed(1)),
      });
      currentEnergy -= (hourlyLoad * step);
      hour += step;
    }
    
    // Terminal point
    if (data.length > 0 && data[data.length - 1].energy > 0) {
      data.push({
        hour: Math.round(durationDays * 24),
        displayTime: '0 kWh (Reserve)',
        energy: 0
      });
    }
    
    return data;
  }, [usableCapacityForHome, dailyLoad, durationDays]);

  const toggleAppliance = (id: string) => {
    setActiveAppliances(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      const text = `⚡ EV V2H Outage Runtime: Driving a ${vehicle.name} (${totalBatteryCapacity} kWh) with ${reserveBuffer}% driving reserve provides ${fullDays} days, ${remainingHours} hours of whole-home emergency power at ${dailyLoad.toFixed(1)} kWh/day. Calculated via EVChargeCurve V2H Calculator.`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isHighLoad = dailyLoad > 18;

  return (
    <div className="bg-[#131B2A] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-7xl mx-auto" role="region" aria-label="EV V2H Home Power Outage Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs & Configuration */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* EV Selection & Reserve Buffer */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="v2h-vehicle-select" className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                Select EV Platform
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
              id="v2h-vehicle-select"
              aria-label="Select Electric Vehicle for V2H Home Backup"
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors font-medium text-sm appearance-none"
            >
              {customVehicles.length > 0 && (
                <optgroup label="⭐ My Custom Vehicles">
                  {customVehicles.map(v => (
                    <option key={v.id} value={v.id}>[Custom] {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)</option>
                  ))}
                </optgroup>
              )}
              <optgroup label="⚡ Bidirectional V2H & High Capacity EVs">
                {allVehicles.filter(v => !isCustomVehicle(v.id)).map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.usablePackKwh || v.batteryCapacity} kWh)
                  </option>
                ))}
              </optgroup>
            </select>

            {/* Reserve Slider */}
            <div className="mt-5 pt-4 border-t border-slate-800/80">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="reserve-buffer-slider" className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  Driving Evacuation Reserve
                </label>
                <span className="text-amber-400 font-bold text-sm">{reserveBuffer}% ({reservedForDrivingKwh.toFixed(1)} kWh)</span>
              </div>
              <input
                id="reserve-buffer-slider"
                aria-label="Driving evacuation reserve slider percentage"
                type="range"
                min="0"
                max="50"
                step="5"
                value={reserveBuffer}
                onChange={(e) => setReserveBuffer(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="text-[11px] text-slate-400 mt-2 leading-normal">
                Locks {reserveBuffer}% state-of-charge so you always retain ~{Math.round((reserveBuffer / 100) * 300)} miles of driving range for emergency evacuation.
              </p>
            </div>
          </div>

          {/* Active Appliances Checklist */}
          <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Outage Appliance Loads</span>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
                {dailyLoad.toFixed(1)} kWh / day
              </span>
            </div>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {APPLIANCES.map((app) => {
                const Icon = app.icon;
                const isActive = activeAppliances[app.id];
                return (
                  <button
                    key={app.id}
                    type="button"
                    role="switch"
                    aria-checked={isActive}
                    aria-label={`Toggle ${app.name} (${app.dailyKwh} kWh/day)`}
                    onClick={() => toggleAppliance(app.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-colors ${
                      isActive 
                        ? 'bg-amber-950/20 border-amber-500/50 text-white' 
                        : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                          {app.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {app.category} &bull; {app.dailyKwh} kWh/day
                        </div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      isActive 
                        ? 'bg-amber-500 border-amber-500 text-slate-950' 
                        : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {isHighLoad && (
              <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Heavy thermal loads (heat pumps, water heaters) consume high energy. Running them intermittently extends blackout autonomy by 3x.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Runtime Results & Battery Discharge Curve */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold flex items-center justify-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Emergency Runtime</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {fullDays} <span className="text-sm font-normal text-slate-300">days</span> {remainingHours > 0 ? `${remainingHours}h` : ''}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {dailyLoad > 0 ? `@ ${dailyLoad.toFixed(1)} kWh/day` : 'No loads selected'}
              </div>
            </div>

            <div className="bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold flex items-center justify-center gap-1">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                <span>Usable for Home</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {usableCapacityForHome.toFixed(1)} <span className="text-sm font-normal text-slate-300">kWh</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                After 88% inverter conversion
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Powerwall Equivalent</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">
                {(totalBatteryCapacity / 13.5).toFixed(1)}x
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                vs 13.5 kWh Powerwall units
              </div>
            </div>
          </div>

          {/* Discharge Curve Chart with isAnimationActive={false} for instant LCP/Speed Index */}
          <div className="h-[280px] w-full bg-[#0B0F17] border border-slate-800 rounded-2xl p-4 pt-6">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 px-1">
              Hourly Battery Depletion Curve (V2H Inverter Output)
            </div>
            {dailyLoad > 0 ? (
              <ResponsiveContainer width="100%" height="88%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="v2hEnergyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis 
                    dataKey="displayTime" 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tick={{ fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={11}
                    tick={{ fill: '#94a3b8' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}k`}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#131B2A', 
                      borderColor: '#334155', 
                      borderRadius: '12px', 
                      color: '#f8fafc',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#fbbf24', fontSize: '13px' }}
                    formatter={(value: any) => [`${value} kWh`, 'Remaining Usable Energy']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#f59e0b" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#v2hEnergyGrad)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm">
                Select at least one appliance load to calculate discharge curve.
              </div>
            )}
          </div>

          {/* Action / Share Slip */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button 
              type="button"
              onClick={handleCopy}
              aria-label="Copy V2H blackout survival calculation to clipboard"
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl border border-slate-700 transition-colors text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Calculation Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Emergency Plan Slip</span>
                </>
              )}
            </button>
            <button 
              type="button"
              onClick={() => {
                const text = `⚡ V2H Emergency Power: Driving a ${vehicle.name} provides ${fullDays} days, ${remainingHours} hours of blackout power for my home! Check your EV at EVChargeCurve.`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
              }}
              aria-label="Share V2H outage plan on WhatsApp"
              className="flex-1 flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-400 font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Plan on WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
