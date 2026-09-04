const fs = require('fs');

let code = fs.readFileSync('components/HomeCharging.tsx', 'utf8');

if (!code.includes('import { useSettings }')) {
  code = "import { useSettings } from '@/components/providers/SettingsProvider';\n" + code;
}

fs.writeFileSync('components/HomeCharging.tsx', code);
