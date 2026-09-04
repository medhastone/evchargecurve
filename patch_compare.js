const fs = require('fs');

let code = fs.readFileSync('components/CompareVehicles.tsx', 'utf8');

if (!code.includes('useSettings')) {
  code = code.replace(
    "import { Battery, Zap, Clock, DollarSign, ArrowRight, Activity, Cpu } from 'lucide-react';",
    "import { Battery, Zap, Clock, DollarSign, ArrowRight, Activity, Cpu } from 'lucide-react';\nimport { useSettings } from '@/components/providers/SettingsProvider';"
  );
}

if (code.includes('export default function CompareVehicles() {')) {
  code = code.replace(
    "export default function CompareVehicles() {",
    "export default function CompareVehicles() {\n  const { currency, unit, distanceLabel, speedLabel } = useSettings();\n  const isKm = unit === 'km';"
  );
}

// 310 mi EPA Range -> 310 {distanceLabel} EPA Range
code = code.replace(/310 mi EPA Range/g, '310 {distanceLabel} EPA Range');
code = code.replace(/260 mi EPA Range/g, '260 {distanceLabel} EPA Range');

// +8.0 mi / min -> +8.0 {distanceLabel} / min
code = code.replace(/\+8\.0 <span className=" text-slate-500">mi \/ min<\/span>/g, '+8.0 <span className=" text-slate-500">{distanceLabel} / min</span>');
code = code.replace(/\+10\.1 <span className=" text-cyan-400">mi \/ min<\/span>/g, '+10.1 <span className=" text-cyan-400">{distanceLabel} / min</span>');
code = code.replace(/\+2\.1 miles added per minute/g, '+2.1 {distanceLabel} added per minute');

// $22.05 -> {currency.symbol}22.05
code = code.replace(/\$22\.05/g, '{currency.symbol}22.05');
code = code.replace(/\$22\.75/g, '{currency.symbol}22.75');
code = code.replace(/\$0\.70 cheaper session/g, '{currency.symbol}0.70 cheaper session');
code = code.replace(/>\$</g, '>{currency.symbol}<');

code = code.replace(/yields 180 mi added/g, 'yields 180 {distanceLabel} added');

fs.writeFileSync('components/CompareVehicles.tsx', code);
