const fs = require('fs');

let code = fs.readFileSync('components/RangeLossTool.tsx', 'utf8');

// replace the entire button
code = code.replace(/<button\s+onClick=\{\(\) => setTempF\(70\)\}[\s\S]*?<\/button>/, '');

// Also fix isMetric if still used
code = code.replace(/isMetric \? 'C' : 'F'/g, 'isMetric ? "C" : "F"');

fs.writeFileSync('components/RangeLossTool.tsx', code);
