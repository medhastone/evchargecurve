const fs = require('fs');

let lines = fs.readFileSync('components/DcSimulator.tsx', 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('{/* Vehicle Model Selector Dropdown */}'));
const endIdx = lines.findIndex(l => l.includes('{/* RIGHT COLUMN: Chart & Results (7 Cols) */}'));

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `
{/* Vehicle Model Selector Dropdown */}
<div className="flex flex-col gap-1">
  <div className="flex items-center justify-between">
    <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Calibrated Vehicle Model</span>
    <span className="font-mono text-[11px] text-cyan-400 flex items-center gap-1">
      <span className="material-symbols-outlined text-[14px]">electric_bolt</span>
      {vehicle.architecture} Pack Architecture
    </span>
  </div>
  <select
    value={selectedVehicleId}
    onChange={(e) => setSelectedVehicleId(e.target.value)}
    className="bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:outline-none focus:border-emerald-500 appearance-none font-bold"
  >
    {Object.values(VEHICLES).filter(v => brand === 'others' ? !['tesla', 'hyundai', 'ford', 'rivian', 'porsche'].includes(v.brand) : v.brand === brand).map(v => (
      <option key={v.id} value={v.id}>{v.name} ({v.usablePackKwh} kWh)</option>
    ))}
  </select>
</div>

{/* Dispenser Power */}
<div className="flex flex-col gap-1 mt-4">
  <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">DC Dispenser Power</span>
  <div className="grid grid-cols-4 gap-2">
    {CHARGER_TIERS.map(kw => (
      <button
        key={kw} type="button"
        onClick={() => setChargerCapKw(kw)}
        className={\`py-2 rounded-lg font-mono text-[11px] \${chargerCapKw === kw ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-slate-800 text-slate-300 border border-transparent hover:bg-slate-700'}\`}
      >
        {kw} kW
      </button>
    ))}
  </div>
</div>

{/* SOC Sliders */}
<div className="flex flex-col gap-4 mt-4">
  <div>
    <div className="flex justify-between mb-1">
      <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Arrival SOC</span>
      <span className="font-mono text-[11px] text-emerald-400 font-bold">{startSoc}%</span>
    </div>
    <input type="range" min="1" max="99" value={startSoc} onChange={(e) => {
      const val = parseInt(e.target.value);
      setStartSoc(val);
      if (val >= endSoc) setEndSoc(Math.min(100, val + 10));
    }} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Target SOC</span>
      <span className="font-mono text-[11px] text-cyan-400 font-bold">{endSoc}%</span>
    </div>
    <input type="range" min={startSoc + 1} max="100" value={endSoc} onChange={(e) => setEndSoc(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
  </div>
</div>

{/* Temp & Cost */}
<div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
  <div className="flex-1 w-full flex flex-col gap-1">
    <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Ambient Temp</span>
    <button type="button" onClick={() => setIsColdWeather(!isColdWeather)} className={\`py-2 rounded-lg font-mono text-[11px] flex justify-center items-center gap-1 \${isColdWeather ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-orange-500/20 text-orange-400 border border-orange-500/50'}\`}>
      <span className="material-symbols-outlined text-[14px]">{isColdWeather ? 'ac_unit' : 'device_thermostat'}</span>
      {isColdWeather ? 'Cold Pack' : 'Optimal'}
    </button>
  </div>
  <div className="flex-1 w-full flex flex-col gap-1">
    <span className="uppercase tracking-widest text-[10px] text-slate-500 uppercase tracking-wider">Local Energy Rate</span>
    <div className="flex items-center bg-slate-600 rounded-lg px-3 focus-within:ring-1 ring-primary transition-all">
      <span className="text-emerald-400 font-bold">{globalCurrency.symbol}</span>
      <input type="number" step="0.01" value={kwhCost} onChange={(e) => setKwhCost(parseFloat(e.target.value))} className="bg-transparent text-slate-100 w-full py-2 pl-2 focus:outline-none font-mono text-[11px]" title="Cost per kWh" />
      <span className="text-slate-300">/kWh</span>
    </div>
  </div>
</div>
</div>
</div>
`;
  
  lines.splice(startIdx, endIdx - startIdx, replacement);
  fs.writeFileSync('components/DcSimulator.tsx', lines.join('\n'));
} else {
  console.log("Could not find start/end indices.");
}
