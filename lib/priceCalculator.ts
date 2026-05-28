// lib/priceCalculator.ts

export function calculatePrice(params: {
  weightGrams: number;
  material: string;
  isMulticolor: boolean;
  settings: {
    materialPricePerKg: number;    // ₹1300
    electricityCostPerHr: number;  // ₹8
    machinePrice: number;          // ₹100000
    machineLifeYears: number;      // 2
    workingDaysPerYear: number;    // 300
    profitPercent: number;         // 15
    multicolorExtra: number;       // ₹50
  };
  // Estimate print hours based on weight
  // Rule of thumb: ~1 hour per 5 grams at 50mm/s on 0.4mm nozzle
  estimatedHours?: number;
}) {
  const {
    weightGrams,
    material,
    isMulticolor,
    settings,
    estimatedHours = weightGrams / 5, // Default: 1 hour per 5 grams
  } = params;

  // === YOUR EXACT FORMULA ===
  
  // Depreciation rate per hour
  // Machine cost spread over: years × working days × 8 hours/day
  const totalLifeHours =
    settings.machineLifeYears * settings.workingDaysPerYear * 8;
  const deprPerHr = settings.machinePrice / totalLifeHours;

  // Material cost
  const materialCost = (weightGrams / 1000) * settings.materialPricePerKg;

  // Electricity cost
  const electricityCost = estimatedHours * settings.electricityCostPerHr;

  // Depreciation cost
  const depreciationCost = estimatedHours * deprPerHr;

  // Subtotal
  const subtotal = materialCost + electricityCost + depreciationCost;

  // Profit (15%)
  const profitAmount = subtotal * (settings.profitPercent / 100);

  // Multicolor surcharge (if applicable)
  const multicolorCharge = isMulticolor ? settings.multicolorExtra : 0;

  // Final price
  const basePrice = subtotal + profitAmount + multicolorCharge;
  const finalPrice = Math.round(basePrice);

  return {
    weightGrams: parseFloat(weightGrams.toFixed(2)),
    estimatedHours: parseFloat(estimatedHours.toFixed(2)),
    
    costs: {
      material: parseFloat(materialCost.toFixed(2)),
      electricity: parseFloat(electricityCost.toFixed(2)),
      depreciation: parseFloat(depreciationCost.toFixed(2)),
    },
    
    subtotal: parseFloat(subtotal.toFixed(2)),
    profitAmount: parseFloat(profitAmount.toFixed(2)),
    multicolorCharge,
    
    finalPrice,
    
    // For display
    breakdown: {
      materialCost,
      electricityCost,
      depreciationCost,
      deprPerHr,
    },
  };
}
