const fs = require('fs');

function addKeyToSymbol(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  
  // Replace <span ...>{globalCurrency.symbol}
  // With <span key={globalCurrency.symbol} ...>{globalCurrency.symbol}
  code = code.replace(/<span([^>]*)>(\{globalCurrency\.symbol\})/g, '<span key={globalCurrency.symbol}$1>$2');
  code = code.replace(/<span([^>]*)>(\{currency\.symbol\})/g, '<span key={currency.symbol}$1>$2');
  
  fs.writeFileSync(filePath, code);
}

addKeyToSymbol('components/DcSimulator.tsx');
addKeyToSymbol('components/HomeCharging.tsx');
addKeyToSymbol('components/HomeChargingTool.tsx');

