const fs = require('fs');

let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

if (!code.includes('useSettings')) {
  code = code.replace(
    "import { VEHICLES } from \"@/data/evModels\";",
    "import { VEHICLES } from \"@/data/evModels\";\nimport { useSettings } from '@/components/providers/SettingsProvider';"
  );
}

// Remove local currency states and constants
code = code.replace(/const CURRENCIES[^;]+;/, '');
code = code.replace(/const \[currency, setCurrency\] = useState\('USD'\);/, '');
code = code.replace(/const \[currency, setCurrency\] = useState\([^)]+\);/, '');

// Add useSettings
code = code.replace(
  "export default function DcSimulator({ initialVehicleId }: { initialVehicleId?: string }) {",
  "export default function DcSimulator({ initialVehicleId }: { initialVehicleId?: string }) {\n  const { currency: globalCurrency, unit, distanceLabel } = useSettings();"
);

// Replace local currency usages with globalCurrency
code = code.replace(/CURRENCIES\[currency\]/g, 'globalCurrency.symbol');
code = code.replace(/setCurrency\([^)]+\)/g, ''); // Remove setters if there are any select dropdowns

// If there's a UI for selecting currency in DcSimulator, we should remove it.
// Let's remove the currency dropdown if it exists.
code = code.replace(/<div className="mb-4">[\s\S]*?<label className="block text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">Currency<\/label>[\s\S]*?<\/select>[\s\S]*?<\/div>/, '');

// Also miles replacements
code = code.replace(/>\+\{Math\.round\(metrics\.milesAdded\)\} mi</g, '>+{Math.round(metrics.milesAdded)} {distanceLabel}<');
code = code.replace(/>\{Math\.round\(metrics\.avgSpeedMiHr\)\} mi\/hr</g, '>{Math.round(metrics.avgSpeedMiHr)} {distanceLabel}/hr<');

fs.writeFileSync('components/DcSimulator.tsx', code);
