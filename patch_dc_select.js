const fs = require('fs');

let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');
code = code.replace(/<select[\s\S]*?value=\{currency\}[\s\S]*?<\/select>/, '');

fs.writeFileSync('components/DcSimulator.tsx', code);
