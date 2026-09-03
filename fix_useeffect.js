const fs = require('fs');
let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

code = code.replace(/  \/\/ Initialize from URL params if present[\s\S]*?\}, \[\]\);/m, `  // Initialize from URL params if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('v');
      const s = params.get('s');
      const e = params.get('e');
      if (v && VEHICLES[v]) {
        setTimeout(() => setSelectedVehicleId(v), 0);
      }
      if (s) {
        setTimeout(() => setStartSoc(Math.max(0, Math.min(parseInt(s, 10), 99))), 0);
      }
      if (e) {
        setTimeout(() => setEndSoc(Math.max(1, Math.min(parseInt(e, 10), 100))), 0);
      }
    }
  }, []);`);

code = code.replace(/  \/\/ Sync range slider bounds strictly[\s\S]*?\}, \[startSoc, endSoc\]\);/m, `  // Sync range slider bounds strictly
  useEffect(() => {
    if (startSoc >= endSoc) {
      setTimeout(() => setStartSoc(Math.max(0, endSoc - 1)), 0);
    }
  }, [startSoc, endSoc]);`);

fs.writeFileSync('components/DcSimulator.tsx', code);
