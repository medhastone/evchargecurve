const fs = require('fs');
let code = fs.readFileSync('components/DcSimulator.tsx', 'utf8');

code = code.replace(
  /<span className="text-slate-300 pl-2">\/kWh<\/span>\n <\/div>\n <\/div>/,
  '<span className="text-slate-300 pl-2">/kWh</span>\n </div>\n </div>\n</div>'
);

fs.writeFileSync('components/DcSimulator.tsx', code);
