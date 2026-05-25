import { create } from 'zustand';

// Pricing settings based on your spreadsheet
export const PRICING_SETTINGS = {
  materialPricePerKg: 1300, // Rs
  electricityCostPerHour: 8, // Rs
  machinePrice: 100000, // Rs
  machineLifeYears: 2,
  workingDaysPerYear: 300,
  averagePrintsPerDay: 2,
  fixedProfitPercentage: 15, // %
  packingCharge: 20, // Rs
  shippingCharge: 40, // Rs
  multicolorExtraCharge: 50, // Rs
};

function calculatePrice(config, fileStats) {
  if (!fileStats) return 0;

  // 1. Material Cost
  const materialPricePerGram = PRICING_SETTINGS.materialPricePerKg / 1000;
  const materialCost = fileStats.weight * materialPricePerGram;

  // 2. Electricity Cost
  const electricityCost = fileStats.printTime * PRICING_SETTINGS.electricityCostPerHour;

  // 3. Machine Depreciation Cost: Flat rate per print
  const totalMachinePrintsLife = PRICING_SETTINGS.machineLifeYears * PRICING_SETTINGS.workingDaysPerYear * PRICING_SETTINGS.averagePrintsPerDay;
  const machineDepreciationCost = PRICING_SETTINGS.machinePrice / totalMachinePrintsLife;

  // 4. Multicolor surcharge if selected
  const multicolorCharge = config.colorMode === 'Multicolor' ? PRICING_SETTINGS.multicolorExtraCharge : 0;

  // 5. Total Manufacturing Cost (Excludes shipping, which is added at checkout)
  const manufacturingCost = materialCost + electricityCost + machineDepreciationCost + PRICING_SETTINGS.packingCharge + multicolorCharge;

  // 6. Apply Fixed Profit Percentage
  const costWithProfit = manufacturingCost * (1 + PRICING_SETTINGS.fixedProfitPercentage / 100);

  // 7. Final Price (Round up)
  const finalPrice = Math.ceil(costWithProfit);

  return finalPrice;
}

export const useStore = create((set) => ({
  selectedFile: null,
  config: {
    material: 'PLA',
    plaFinish: 'Basic',
    color: 'Black',
    colorMode: 'Single Color',
    quality: 'Standard (0.2mm)',
    strength: 20,
  },
  mockPrice: null,
  fileStats: null, // { volume, x, y, z, weight, printTime }
  cart: [],
  isCartOpen: false,
  searchQuery: '',
  products: [],
  colors: [
    { id: 'default-1', name: 'Black', hex: '#111111', material: 'PETG' },
    { id: 'default-2', name: 'Grey', hex: '#6b7280', material: 'PETG' },
    { id: 'default-3', name: 'Black', hex: '#111111', material: 'ABS' },
    { id: 'default-4', name: 'Black', hex: '#111111', material: 'TPU' },
    { id: 'default-5', name: 'Black', hex: '#111111', material: 'PLA' },
    { id: 'default-6', name: 'Grey', hex: '#6b7280', material: 'PLA' },
    { id: 'default-7', name: 'White', hex: '#ffffff', material: 'PLA' },
    { id: 'default-8', name: 'Brown', hex: '#8b4513', material: 'PLA' },
    { id: 'default-9', name: 'Cream', hex: '#fffdd0', material: 'PLA' },
  ],
  scrollPosition: 0,
  activeTab: 'products',

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setProducts: (products) => set({ products }),
  fetchColors: async () => {
    try {
      const res = await fetch('/api/colors');
      if (res.ok) {
        const colors = await res.json();
        if (colors && colors.length > 0) {
          set({ colors });
        }
      }
    } catch (e) {
      console.error('Failed to fetch colors', e);
    }
  },
  setScrollPosition: (pos) => set({ scrollPosition: pos }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  clearCart: () => set({ cart: [] }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),

  setSelectedFile: (file) => set((state) => {
    // Reset fileStats and price when a new file is uploaded
    return { selectedFile: file, mockPrice: null, fileStats: null };
  }),

  setFileStats: (rawStats) => set((state) => {
    if (!rawStats) return { fileStats: null, mockPrice: null };

    const { volume, x, y, z } = rawStats;

    // Density of selected material
    let density = 1.24;
    if (state.config.material === 'PETG') density = 1.27;
    else if (state.config.material === 'ABS') density = 1.04;
    else if (state.config.material === 'TPU') density = 1.21;

    // Weight calculation — calibrated from real slicer data (9 products)
    // 0.435 = shell/walls/top-bottom base, 0.565 = infill-variable portion
    const volumeCm3 = volume / 1000;
    const infillFactor = 0.435 + 0.565 * (state.config.strength / 100);
    const weight = Math.max(0.01, Math.round(volumeCm3 * density * infillFactor * 100) / 100);

    // Print Time calculation — calibrated avg ~6 g/h from real prints
    const baseSpeedGramsPerHour = 6;
    let qualityMultiplier = 1.0;
    if (state.config.quality.includes('Draft')) qualityMultiplier = 0.7;
    else if (state.config.quality.includes('High')) qualityMultiplier = 1.8;

    let printTime = (weight / baseSpeedGramsPerHour) * qualityMultiplier;
    if (printTime < 0.1) printTime = 0.1;
    printTime = Math.round(printTime * 100) / 100;

    const fileStats = {
      volume,
      x,
      y,
      z,
      weight,
      printTime
    };

    const price = calculatePrice(state.config, fileStats);
    return { fileStats, mockPrice: price };
  }),

  setConfig: (newConfig) => set((state) => {
    const updatedConfig = { ...state.config, ...newConfig };

    let updatedFileStats = state.fileStats;
    if (state.fileStats) {
      let density = 1.24;
      if (updatedConfig.material === 'PETG') density = 1.27;
      else if (updatedConfig.material === 'ABS') density = 1.04;
      else if (updatedConfig.material === 'TPU') density = 1.21;

      const volumeCm3 = state.fileStats.volume / 1000;
      const infillFactor = 0.435 + 0.565 * (updatedConfig.strength / 100);
      const weight = Math.max(0.01, Math.round(volumeCm3 * density * infillFactor * 100) / 100);

      const baseSpeedGramsPerHour = 6;
      let qualityMultiplier = 1.0;
      if (updatedConfig.quality.includes('Draft')) qualityMultiplier = 0.7;
      else if (updatedConfig.quality.includes('High')) qualityMultiplier = 1.8;

      let printTime = (weight / baseSpeedGramsPerHour) * qualityMultiplier;
      if (printTime < 0.1) printTime = 0.1;
      printTime = Math.round(printTime * 100) / 100;

      updatedFileStats = {
        ...state.fileStats,
        weight,
        printTime
      };
    }

    const price = state.selectedFile && updatedFileStats ? calculatePrice(updatedConfig, updatedFileStats) : null;
    return { config: updatedConfig, mockPrice: price, fileStats: updatedFileStats };
  }),

  clearFile: () => set({ selectedFile: null, mockPrice: null, fileStats: null }),

  addToCart: () => set((state) => {
    if (!state.selectedFile || !state.mockPrice) return state;

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      fileName: state.selectedFile.name,
      file: state.selectedFile,
      type: 'custom',
      config: {
        ...state.config,
        weight: state.fileStats?.weight,
        printTime: state.fileStats?.printTime,
        dimensions: state.fileStats ? `${state.fileStats.x}x${state.fileStats.y}x${state.fileStats.z}mm` : null
      },
      price: state.mockPrice
    };

    return {
      cart: [...state.cart, newItem],
      selectedFile: null,
      mockPrice: null,
      fileStats: null
    };
  }),

  addDirectItemToCart: (item) => set((state) => ({
    cart: [...state.cart, { id: Math.random().toString(36).substr(2, 9), ...item }]
  })),
}));
