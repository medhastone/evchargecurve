const fs = require('fs');
let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

const tooltipStart = code.indexOf('// Recharts custom tooltip');
const tooltipEnd = code.indexOf('  };', tooltipStart) + 4;
const tooltipCode = code.substring(tooltipStart, tooltipEnd);

code = code.substring(0, tooltipStart) + code.substring(tooltipEnd);

// find export default function DcSimulator() {
const compStart = code.indexOf('export default function DcSimulator() {');
code = code.substring(0, compStart) + tooltipCode + '\n\n' + code.substring(compStart);

fs.writeFileSync('components/DcSimulator.tsx', code);
