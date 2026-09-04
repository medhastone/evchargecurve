const fs = require('fs');
let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

const replacement = `
<select
  value={selectedVehicleId}
  onChange={(e) => setSelectedVehicleId(e.target.value)}
  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-2 mt-1 focus:outline-none focus:border-emerald-500"
>
  {Object.values(VEHICLES).filter(v => brand === 'others' ? !['tesla', 'hyundai', 'ford', 'rivian', 'porsche'].includes(v.brand) : v.brand === brand).map(v => (
    <option key={v.id} value={v.id} className="bg-slate-900">{v.name}</option>
  ))}
</select>
</div>

{/* Dispenser Power */}
<div className="flex flex-col gap-1 mt-4">
  <span className="uppercase tracking-widest text-[10px] text-slate-500">DC Dispenser Power</span>
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
      <span className="uppercase tracking-widest text-[10px] text-slate-500">Arrival SOC</span>
      <span className="font-mono text-[11px] text-emerald-400">{startSoc}%</span>
    </div>
    <input type="range" min="1" max="99" value={startSoc} onChange={(e) => {
      const val = parseInt(e.target.value);
      setStartSoc(val);
      if (val >= endSoc) setEndSoc(Math.min(100, val + 10));
    }} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
  </div>
  <div>
    <div className="flex justify-between mb-1">
      <span className="uppercase tracking-widest text-[10px] text-slate-500">Target SOC</span>
      <span className="font-mono text-[11px] text-cyan-400">{endSoc}%</span>
    </div>
    <input type="range" min={startSoc + 1} max="100" value={endSoc} onChange={(e) => setEndSoc(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
  </div>
</div>

{/* Temp & Cost */}
<div className="flex items-center gap-4 mt-4">
  <div className="flex-1 flex flex-col gap-1">
    <span className="uppercase tracking-widest text-[10px] text-slate-500">Ambient Temp</span>
    <button type="button" onClick={() => setIsColdWeather(!isColdWeather)} className={\`py-2 rounded-lg font-mono text-[11px] flex justify-center items-center gap-1 \${isColdWeather ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-orange-500/20 text-orange-400 border border-orange-500/50'}\`}>
      <span className="material-symbols-outlined text-[14px]">{isColdWeather ? 'ac_unit' : 'thermostat'}</span>
      {isColdWeather ? 'Cold Pack' : 'Optimal'}
    </button>
  </div>
  <div className="flex-1 flex flex-col gap-1">
    <span className="uppercase tracking-widest text-[10px] text-slate-500">Local Energy Rate</span>
    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2">
      <span className="text-slate-400">{globalCurrency.symbol}</span>
      <input
`;

code = code.replace(
  '<div className="relative group">\n <input',
  replacement + ' <input'
);

fs.writeFileSync('components/DcSimulator.tsx', code);
