const fs = require('fs');
let code = fs.readFileSync('/app/applet/lib/evCalculations.ts', 'utf8');

code = code.replace(
  /export function calculateRealWorldRange\([\s\S]*?return \{\n[\s\S]*?adjustedRangeMiles,\n[\s\S]*?percentageLoss,\n[\s\S]*?whPerMile,\n[\s\S]*?recommendedExtraStops\n  \};\n\}/,
  `export function calculateRealWorldRange(
  baseEpaRange: number,
  tempF: number,
  speedMph: number,
  climateMode: 'heat_pump' | 'resistive' | 'ac' | 'off',
  towingWeightLbs: number,
  accessory: 'none' | 'roof_box' | 'bike_rack',
  packKwh: number = 75
): RealWorldRangeResult {
  if (baseEpaRange <= 0 || speedMph < 0 || towingWeightLbs < 0) {
    throw new Error("Invalid parameters for range calculation.");
  }

  let adjustedRangeMiles = baseEpaRange;

  if (speedMph > 55) {
    const aeroLoss = Math.pow(speedMph / 55, 2) - 1;
    adjustedRangeMiles *= (1 - Math.min(aeroLoss * 0.4, 0.6));
  } else if (speedMph < 45 && speedMph > 0) {
    adjustedRangeMiles *= 1.05;
  }

  if (tempF < 70 && climateMode !== 'off') {
    const tempDiff = 70 - tempF;
    let tempLossPercent = climateMode === 'heat_pump' ? (tempDiff * 0.3) : (tempDiff * 0.6);
    if (climateMode === 'heat_pump' && tempLossPercent > 20) tempLossPercent = 20;
    if (climateMode === 'resistive' && tempLossPercent > 35) tempLossPercent = 35;
    adjustedRangeMiles *= (1 - (tempLossPercent / 100));
  } else if (tempF > 85 && (climateMode === 'ac' || climateMode === 'heat_pump')) {
    const tempDiff = tempF - 85;
    const acLossPercent = Math.min(tempDiff * 0.4, 15);
    adjustedRangeMiles *= (1 - (acLossPercent / 100));
  }

  if (accessory === 'roof_box') {
    adjustedRangeMiles *= 0.88;
  } else if (accessory === 'bike_rack') {
    adjustedRangeMiles *= 0.93;
  }
  
  if (towingWeightLbs > 0) {
    const weightLossPercent = Math.min((towingWeightLbs / 1000) * 8, 50); 
    adjustedRangeMiles *= (1 - (weightLossPercent / 100));
  }

  const percentageLoss = ((baseEpaRange - adjustedRangeMiles) / baseEpaRange) * 100;
  const whPerMile = (packKwh * 1000) / adjustedRangeMiles;
  const milesPerCharge = adjustedRangeMiles * 0.7; // assuming 10-80% 
  const totalTripMiles = 300;
  const recommendedExtraStops = Math.max(0, Math.ceil((totalTripMiles - adjustedRangeMiles) / milesPerCharge));

  return {
    adjustedRangeMiles,
    percentageLoss,
    whPerMile,
    recommendedExtraStops
  };
}`
);

fs.writeFileSync('/app/applet/lib/evCalculations.ts', code);
