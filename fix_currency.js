const fs = require('fs');
const file = 'components/PreconditioningTool.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/\{currency\}/g, '{currency.symbol}');

fs.writeFileSync(file, content);
console.log("Fixed!");
