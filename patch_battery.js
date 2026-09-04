const fs = require('fs');
let code = fs.readFileSync('components/BatteryHealthTool.tsx', 'utf8');

if (!code.includes('useSettings')) {
  code = code.replace(
    "import { cn } from '@/lib/utils';",
    "import { cn } from '@/lib/utils';\nimport { useSettings } from '@/components/providers/SettingsProvider';"
  );
}

code = code.replace(
  "export default function BatteryHealthTool() {",
  "export default function BatteryHealthTool() {\n  const { unit, distanceLabel } = useSettings();\n  const isKm = unit === 'km';"
);

// Remove local `isKm` state
code = code.replace(/const \[isKm, setIsKm\] = useState\(false\);/, '');

// Fix 'mi' label output
code = code.replace(
  /<span className="text-xs font-normal text-slate-400">mi<\/span>/g,
  '<span className="text-xs font-normal text-slate-400">{distanceLabel}</span>'
);

// There might be a toggle UI for isKm. Let's remove it.
code = code.replace(/<button[^>]+onClick=\{[^)]+setIsKm[^}]+\}[^>]*>[\s\S]*?<\/button>/g, '');
// Wait, maybe there's a div containing the toggle? Let's check.
fs.writeFileSync('components/BatteryHealthTool.tsx', code);
