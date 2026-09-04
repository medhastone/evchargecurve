const fs = require('fs');

let code = fs.readFileSync('components/HomeCharging.tsx', 'utf8');

// Check if useSettings is imported
if (!code.includes('useSettings')) {
  code = code.replace(
    /import React, { useState, useMemo } from 'react';/,
    "import React, { useState, useMemo } from 'react';\nimport { useSettings } from '@/components/providers/SettingsProvider';"
  );
}

// Add inside component
if (!code.includes('const { currency: globalCurrency } = useSettings();')) {
  code = code.replace(
    /export default function HomeCharging\(\) {/,
    "export default function HomeCharging() {\n  const { currency: globalCurrency } = useSettings();"
  );
}

fs.writeFileSync('components/HomeCharging.tsx', code);
