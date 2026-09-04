const fs = require('fs');
let code = fs.readFileSync('components/HomeChargingTool.tsx', 'utf8');

code = code.replace(/Off-Peak \(\$\/kWh\)/g, 'Off-Peak Rate');
code = code.replace(/Peak \(\$\/kWh\)/g, 'Peak Rate');
code = code.replace(/Approx \$0\.45\/kWh/g, 'Approx 0.45/kWh');

fs.writeFileSync('components/HomeChargingTool.tsx', code);
