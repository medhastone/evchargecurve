const fs = require('fs');
let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

const tooltipRegex = /\s*\/\/ Recharts custom tooltip\s*const CustomTooltip = \(\{ active, payload, label \}: any\) => \{[\s\S]*?return null;\s*\};\s*/;
const match = code.match(tooltipRegex);

if (match) {
    const tooltipCode = match[0];
    code = code.replace(tooltipRegex, '\n');
    
    // Find the default export
    const exportRegex = /export default function DcSimulator\(\) \{/;
    code = code.replace(exportRegex, tooltipCode + '\n' + 'export default function DcSimulator() {');
    
    fs.writeFileSync('components/DcSimulator.tsx', code);
    console.log("Successfully patched CustomTooltip");
} else {
    console.log("Could not find CustomTooltip");
}
