const fs = require('fs');

let code = fs.readFileSync('components/RangeLossTool.tsx', 'utf8');

// (EPA: {v.epaRangeMiles} mi) -> (EPA: {Math.round(isMetric ? v.epaRangeMiles * 1.609 : v.epaRangeMiles)} {distanceLabel})
code = code.replace(/\(EPA: \{v\.epaRangeMiles\} mi\)/g, '(EPA: {Math.round(isMetric ? v.epaRangeMiles * 1.609 : v.epaRangeMiles)} {distanceLabel})');

// {s} <span className="text-xs font-normal">mph</span> -> {isMetric ? Math.round(s * 1.609) : s} <span className="text-xs font-normal">{speedLabel}</span>
code = code.replace(/\{s\} <span className="text-xs font-normal">mph<\/span>/g, '{isMetric ? Math.round(s * 1.609) : s} <span className="text-xs font-normal">{speedLabel}</span>');

// {calcResult.baseEpaRange} mi -> {Math.round(isMetric ? calcResult.baseEpaRange * 1.609 : calcResult.baseEpaRange)} {distanceLabel}
code = code.replace(/\{calcResult\.baseEpaRange\} mi/g, '{Math.round(isMetric ? calcResult.baseEpaRange * 1.609 : calcResult.baseEpaRange)} {distanceLabel}');

// {Math.round(calcResult.adjustedRange)} mi -> {Math.round(isMetric ? calcResult.adjustedRange * 1.609 : calcResult.adjustedRange)} {distanceLabel}
code = code.replace(/\{Math\.round\(calcResult\.adjustedRange\)\} mi/g, '{Math.round(isMetric ? calcResult.adjustedRange * 1.609 : calcResult.adjustedRange)} {distanceLabel}');

// Wh/mi -> Wh/{distanceLabel}
code = code.replace(/>Wh\/mi</g, '>Wh/{distanceLabel}<');

// {calcResult.miPerKwh.toFixed(2)} mi/kWh -> {(isMetric ? calcResult.miPerKwh / 1.609 : calcResult.miPerKwh).toFixed(2)} {distanceLabel}/kWh
code = code.replace(/\{calcResult\.miPerKwh\.toFixed\(2\)\} mi\/kWh/g, '{(isMetric ? calcResult.miPerKwh / 1.609 : calcResult.miPerKwh).toFixed(2)} {distanceLabel}/kWh');

// 300-Mile Trip -> {isMetric ? "500-km" : "300-Mile"} Trip
code = code.replace(/300-Mile Trip/g, '{isMetric ? "500-km" : "300-Mile"} Trip');
code = code.replace(/A 300-mile highway journey/g, 'A {isMetric ? "500-km" : "300-mile"} highway journey');

// 70 mph -> 70 mph / 112 km/h? Just leave the presets labels for now or convert
code = code.replace(/70 mph/g, '{isMetric ? "112 km/h" : "70 mph"}');
code = code.replace(/65 mph/g, '{isMetric ? "105 km/h" : "65 mph"}');
code = code.replace(/55 mph/g, '{isMetric ? "88 km/h" : "55 mph"}');

fs.writeFileSync('components/RangeLossTool.tsx', code);
