const fs = require('fs');

let code = fs.readFileSync('components/RangeLossTool.tsx', 'utf8');

if (!code.includes('useSettings')) {
  code = code.replace(
    "import { cn } from '@/lib/utils';",
    "import { cn } from '@/lib/utils';\nimport { useSettings } from '@/components/providers/SettingsProvider';"
  );
}

code = code.replace(
  "export default function RangeLossTool() {",
  "export default function RangeLossTool() {\n  const { unit, distanceLabel, speedLabel } = useSettings();\n  const isMetric = unit === 'km';"
);

// Remove local `isMetric`
code = code.replace(/const \[isMetric, setIsMetric\] = useState\(false\);/, '');

// Remove toggle UI
code = code.replace(/<button[^>]+onClick=\{[^)]+setIsMetric[^}]+\}[^>]*>[\s\S]*?<\/button>/g, '');
code = code.replace(/setIsMetric\(!isMetric\)/g, '');
code = code.replace(/\{isMetric \? '°C' : '°F'\}/g, '{isMetric ? "°C" : "°F"}');

// Distance Labels
code = code.replace(/<span className="text-sm font-normal text-slate-400">mi<\/span>/g, '<span className="text-sm font-normal text-slate-400">{distanceLabel}</span>');
code = code.replace(/<span className="text-sm font-normal text-slate-400">mph<\/span>/g, '<span className="text-sm font-normal text-slate-400">{speedLabel}</span>');
code = code.replace(/<span className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Speed \(mph\)<\/label>/, '<label className="text-xs text-slate-400 uppercase tracking-wider mb-2 block font-semibold">Speed ({speedLabel})</label>');

fs.writeFileSync('components/RangeLossTool.tsx', code);
