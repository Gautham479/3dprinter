// app/api/calculate-price/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { parseSTL } from '@/lib/stlParser';
import { calculatePrice } from '@/lib/priceCalculator';

// Your settings - can move to database/env later
const SETTINGS = {
  materialPricePerKg: 1300,
  electricityCostPerHr: 8,
  machinePrice: 100000,
  machineLifeYears: 2,
  workingDaysPerYear: 300,
  profitPercent: 15,
  multicolorExtra: 50,
  
  // Material densities (g/cm³)
  materials: {
    PLA: { density: 1.24, name: 'PLA' },
    PETG: { density: 1.27, name: 'PETG' },
    ABS: { density: 1.04, name: 'ABS' },
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const stlFile = formData.get('stl') as File;
    const material = (formData.get('material') as string) || 'PLA';
    const infill = parseFloat((formData.get('infill') as string) || '20');
    const isMulticolor = formData.get('multicolor') === 'true';

    // Validate
    if (!stlFile) {
      return NextResponse.json(
        { error: 'Please upload an STL file' },
        { status: 400 }
      );
    }

    // Parse STL
    const metrics = await parseSTL(stlFile);

    // Get material density
    const matConfig =
      SETTINGS.materials[material as keyof typeof SETTINGS.materials] ||
      SETTINGS.materials.PLA;

    // === CALCULATE WEIGHT ===
    // Account for infill: only inner volume is partially filled
    // Outer shell (walls) is always 100% solid
    
    // Rough estimate: shell is 30% of surface area × wall thickness
    // Inner volume filled with infill%
    const shellVolumeCm3 = metrics.volumeCm3 * 0.3; // 30% is shell/walls
    const innerVolumeCm3 = metrics.volumeCm3 * 0.7; // 70% is inner
    
    const actualVolumeToPrint =
      shellVolumeCm3 + innerVolumeCm3 * (infill / 100);
    
    const weightGrams = actualVolumeToPrint * matConfig.density;

    // === CALCULATE PRICE ===
    const result = calculatePrice({
      weightGrams,
      material,
      isMulticolor,
      settings: SETTINGS,
      // Estimate: 1 hour per 5 grams (standard 50mm/s, 0.4mm nozzle)
      estimatedHours: weightGrams / 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        // Model info
        volumeCm3: parseFloat(metrics.volumeCm3.toFixed(2)),
        boundingBox: {
          x: parseFloat(metrics.boundingBox.x.toFixed(1)),
          y: parseFloat(metrics.boundingBox.y.toFixed(1)),
          z: parseFloat(metrics.boundingBox.z.toFixed(1)),
        },
        triangles: metrics.triangleCount,

        // Print settings
        material,
        infillPercent: infill,
        density: matConfig.density,
        weight: result.weightGrams,

        // Final price
        finalPrice: result.finalPrice,
        
        // Breakdown for display
        costs: {
          material: result.costs.material,
          electricity: result.costs.electricity,
          depreciation: result.costs.depreciation,
        },
        subtotal: result.subtotal,
        profit: result.profitAmount,
        multicolorCharge: result.multicolorCharge,
      },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to calculate price' },
      { status: 500 }
    );
  }
}
