'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Home, 
  Battery, 
  Clock,
  Settings2,
  Car,
  CheckCircle2,
  AlertTriangle,
  Snowflake,
  Wifi,
  Flame,
  Droplets,
  Tv,
  Thermometer,
  Coffee
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

const EVS = [
  { id: 'f150-sr', name: 'Ford F-150 Lightning (SR)', capacity: 98, brand: 'Ford' },
  { id: 'f150-er', name: 'Ford F-150 Lightning (ER)', capacity: 131, brand: 'Ford' },
  { id: 'cybertruck', name: 'Cybertruck (AWD)', capacity: 123, brand: 'Tesla' },
  { id: 'ioniq5', name: 'Hyundai Ioniq 5', capacity: 77.4, brand: 'Hyundai' },
  { id: 'ev6', name: 'Kia EV6 (LR)', capacity: 77.4, brand: 'Kia' },
  { id: 'blazer', name: 'Chevy Blazer EV', capacity: 85, brand: 'Chevrolet' },
  { id: 'silverado', name: 'Chevy Silverado EV', capacity: 205, brand: 'Chevrolet' },
  { id: 'leaf', name: 'Nissan Leaf (Plus)', capacity: 60, brand: 'Nissan' }
];

const APPLIANCES = [
  { id: 'fridge', name: 'Refrigerator', dailyKwh: 1.5, icon: Snowflake, defaultChecked: true },
  { id: 'internet', name: 'Internet & LED Lights', dailyKwh: 0.8, icon: Wifi, defaultChecked: true },
  { id: 'sump', name: 'Sump Pump', dailyKwh: 1.2, icon: Droplets, defaultChecked: false },
  { id: 'well', name: 'Well Pump', dailyKwh: 1.5, icon: Droplets, defaultChecked: false },
  { id: 'tv', name: 'TV & Entertainment', dailyKwh: 0.5, icon: Tv, defaultChecked: true },
  { id: 'microwave', name: 'Microwave (15 mins/day)', dailyKwh: 0.4, icon: Coffee, defaultChecked: true },
  { id: 'space-heater', name: 'Portable Space Heater', dailyKwh: 12.0, icon: Flame, defaultChecked: false },
  { id: 'mini-split', name: 'Mini-Split A/C & Heat', dailyKwh: 8.0, icon: Thermometer, defaultChecked: false },
  { id: 'water-heater', name: 'Electric Water Heater', dailyKwh: 14.0, icon: Flame, defaultChecked: false }
];

export default function V2HBackupTool() {
  const [selectedEvId, setSelectedEvId] = useState(EVS[1].id);
  const [reserveBuffer, setReserveBuffer] = useState(20);
  const [activeAppliances, setActiveAppliances] = useState<Record<string, boolean>>(
    APPLIANCES.reduce((acc, app) => ({ ...acc, [app.id]: app.defaultChecked }), {})
  );

  const selectedEv = EVS.find(ev => ev.id === selectedEvId) || EVS[0];
  const usableCapacity = selectedEv.capacity * (1 - reserveBuffer / 100);
  
  const dailyLoad = useMemo(() => {
    return APPLIANCES.reduce((total, app) => {
      if (activeAppliances[app.id]) {
        return total + app.dailyKwh;
      }
      return total;
    }, 0);
  }, [activeAppliances]);

  const durationDays = dailyLoad > 0 ? usableCapacity / dailyLoad : 0;
  const fullDays = Math.floor(durationDays);
  const remainingHours = Math.round((durationDays - fullDays) * 24);

  const chartData = useMemo(() => {
    const data = [];
    let currentEnergy = usableCapacity;
    const hourlyLoad = dailyLoad / 24;
    
    if (dailyLoad === 0) return [];

    let hour = 0;
    while (currentEnergy > 0 && hour <= 24 * 30) {
      data.push({
        hour,
        displayTime: hour < 24 ? `${hour}h` : `Day ${Math.floor(hour / 24)}`,
        energy: Number(Math.max(0, currentEnergy).toFixed(1)),
      });
      currentEnergy -= (hourlyLoad * 6); // Step by 6 hours for chart clarity
      hour += 6;
    }
    
    // Ensure final point hits 0 precisely
    data.push({
      hour: durationDays * 24,
      displayTime: 'Empty',
      energy: 0
    });
    
    return data;
  }, [usableCapacity, dailyLoad, durationDays]);

  const toggleAppliance = (id: string) => {
    setActiveAppliances(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isHighLoad = dailyLoad > 20;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-sm font-medium">
            <Home className="w-4 h-4" />
            Vehicle-to-Home (V2H) Sizer
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Power Outage Survival Calculator
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Calculate exactly how many days your EV can keep your home running during a blackout.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* EV Selection & Buffer */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-500" />
              Vehicle Configuration
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Select Your EV
                </label>
                <select aria-label="Select option" 
                  value={selectedEvId}
                  onChange={(e) => setSelectedEvId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {EVS.map(ev => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name} ({ev.capacity} kWh)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Reserve Driving Buffer
                  </label>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {reserveBuffer}%
                  </span>
                </div>
                <input 
                  aria-label="Adjust slider" type="range" 
                  min="0" 
                  max="50" 
                  step="5"
                  value={reserveBuffer}
                  onChange={(e) => setReserveBuffer(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Keep some energy reserved so you can still drive to safety or a charging station after the outage.
                </p>
              </div>
            </div>
          </div>

          {/* Appliances */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  Essential Appliances
                </h3>
                <span className="text-sm font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                  {dailyLoad.toFixed(1)} kWh / day
                </span>
             </div>

             <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {APPLIANCES.map((app) => {
                  const Icon = app.icon;
                  const isActive = activeAppliances[app.id];
                  return (
                    <button
                      key={app.id}
                      onClick={() => toggleAppliance(app.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        isActive 
                          ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className={`font-medium ${isActive ? 'text-blue-900 dark:text-blue-100' : 'text-slate-700 dark:text-slate-300'}`}>
                            {app.name}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {app.dailyKwh} kWh/day
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isActive 
                          ? 'bg-blue-500 border-blue-500 text-white' 
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </button>
                  );
                })}
             </div>
             
             {isHighLoad && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl flex gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">High Energy Load</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                      Heating and cooling appliances drain batteries rapidly. Consider running them only intermittently to extend your survival time.
                    </p>
                  </div>
                </motion.div>
             )}
          </div>
        </div>

        {/* Right Column: Results & Graph */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Top Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Clock className="w-24 h-24" />
              </div>
              <div className="relative z-10">
                <p className="text-blue-100 font-medium mb-2">Estimated Runtime</p>
                <div className="flex items-baseline gap-2">
                  {fullDays > 0 && (
                    <>
                      <span className="text-5xl font-bold tracking-tight">{fullDays}</span>
                      <span className="text-xl font-medium text-blue-200">days</span>
                    </>
                  )}
                  {remainingHours > 0 && (
                    <>
                      <span className="text-4xl font-bold tracking-tight ml-1">{remainingHours}</span>
                      <span className="text-lg font-medium text-blue-200">hrs</span>
                    </>
                  )}
                  {fullDays === 0 && remainingHours === 0 && (
                    <span className="text-4xl font-bold tracking-tight">0 hrs</span>
                  )}
                </div>
                <p className="text-blue-200 text-sm mt-4">
                  Based on {dailyLoad.toFixed(1)} kWh daily consumption.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm flex flex-col justify-center">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-600 dark:text-slate-400 font-medium">Usable Battery</p>
                <Battery className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {usableCapacity.toFixed(1)}
                </span>
                <span className="text-lg font-medium text-slate-500 dark:text-slate-400">kWh</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${100 - reserveBuffer}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 w-10 text-right">
                  {100 - reserveBuffer}%
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {reserveBuffer}% reserved for driving.
              </p>
            </div>
          </div>

          {/* Graph */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Battery Discharge Curve
            </h3>
            
            {dailyLoad > 0 ? (
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.2} />
                    <XAxis 
                      dataKey="displayTime" 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={30}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                        border: 'none',
                        borderRadius: '12px',
                        color: '#fff',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      itemStyle={{ color: '#bae6fd' }}
                      formatter={(value: any) => [`${value} kWh`, 'Remaining Energy']}
                      labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorEnergy)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[350px] w-full flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <Settings2 className="w-12 h-12 mb-4 opacity-20" />
                <p>Select at least one appliance to see the discharge curve.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
