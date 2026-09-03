const fs = require('fs');
let code = fs.readFileSync('/app/applet/components/FastChargeSimulator.tsx', 'utf8');

code = code.replace(
  'export default function FastChargeSimulator() {',
  'export default function FastChargeSimulator({ defaultVehicleId }: { defaultVehicleId?: string }) {'
);

code = code.replace(
  'const [vehicleId, setVehicleId] = useState(evModels[0].id);',
  'const [vehicleId, setVehicleId] = useState(defaultVehicleId || evModels[0].id);'
);

fs.writeFileSync('/app/applet/components/FastChargeSimulator.tsx', code);
