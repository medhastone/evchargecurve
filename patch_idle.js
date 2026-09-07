const fs = require('fs');
const file = 'components/IdleDrainTool.tsx';
let content = fs.readFileSync(file, 'utf8');

const target = `  const vehicle = VEHICLES[vehicleId];
  if (!vehicle) return null;

  const packKwh = vehicle.usablePackKwh || vehicle.batteryCapacity || 75;
  const rangeMiles = vehicle.range || 300;`;
const replacement = `  const vehicle = VEHICLES[vehicleId];
  
  const packKwh = vehicle?.usablePackKwh || vehicle?.batteryCapacity || 75;
  const rangeMiles = vehicle?.range || 300;`;

content = content.replace(target, replacement);

const target2 = `  return (
    <div className="bg-[#0F141E] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">`;
const replacement2 = `  if (!vehicle) return null;

  return (
    <div className="bg-[#0F141E] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">`;

content = content.replace(target2, replacement2);
fs.writeFileSync(file, content);
console.log("Patched!");
