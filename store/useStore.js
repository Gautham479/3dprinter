import { create } from 'zustand';

// Pricing settings
export const PRICING_SETTINGS = {
  materialPricePerKg: 1300,
  electricityCostPerHour: 8,
  machinePrice: 100000,
  machineLifeYears: 2,
  workingDaysPerYear: 300,
  profitPercent: 97,          // Matched to Blaster 3D pricing scale
  multicolorExtra: 50,
  setupFee: 0,                // Removed flat setup fee
  shippingCharge: 60,         // Rs — flat shipping fee
  freeShippingAbove: 999,     // Rs — free shipping threshold
  minimumPrice: 50,           // Lowered minimum price for small parts
  minimumOrderValue: 500,     // Rs — minimum order value to checkout
};

function calculatePrice(config, fileStats) {
  if (!fileStats) return 0;

  const totalLifeHours = PRICING_SETTINGS.machineLifeYears * PRICING_SETTINGS.workingDaysPerYear * 8;
  const deprPerHr = PRICING_SETTINGS.machinePrice / totalLifeHours;

  const materialCost = (fileStats.weight / 1000) * PRICING_SETTINGS.materialPricePerKg;
  const electricityCost = fileStats.printTime * PRICING_SETTINGS.electricityCostPerHour;
  const depreciationCost = fileStats.printTime * deprPerHr;

  const subtotal = materialCost + electricityCost + depreciationCost;
  const profitAmount = subtotal * (PRICING_SETTINGS.profitPercent / 100);

  const isMulticolor = config.colorMode === 'Multicolor' || config.colorMode === 'Multi Color';
  const multicolorCharge = isMulticolor ? PRICING_SETTINGS.multicolorExtra : 0;

  let materialMultiplier = 1.0;
  if (config.material === 'PETG') materialMultiplier = 1.2;
  else if (config.material === 'ABS') materialMultiplier = 1.4;
  else if (config.material === 'TPU') materialMultiplier = 1.8;

  const basePrice = (subtotal + profitAmount + multicolorCharge + PRICING_SETTINGS.setupFee) * materialMultiplier;
  return Math.max(PRICING_SETTINGS.minimumPrice, Math.round(basePrice));
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
  isTooBig: false,
  isCalculating: false,
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
    return { selectedFile: file, mockPrice: null, fileStats: null, isTooBig: false, isCalculating: false };
  }),

  setFileStats: async (rawStats, fileObject = null) => {
    if (!rawStats) {
      set({ fileStats: null, mockPrice: null, isTooBig: false, isCalculating: false });
      return;
    }

    set({ isCalculating: true });

    const { volume, x, y, z } = rawStats;
    const isTooBig = x > 256 || y > 256 || z > 256;

    let finalWeight = 0;
    let finalPrintTime = 0;

    // 1. TRY ORCA SLICER CLI BACKEND
    let slicerSuccess = false;
    const fileToSlice = fileObject || useStore.getState().selectedFile;
    if (fileToSlice) {
      try {
        const formData = new FormData();
        formData.append('file', fileToSlice);
        formData.append('material', useStore.getState().config.material);

        const res = await fetch('/api/slice', { method: 'POST', body: formData });
        if (res.ok) {
          const slicerData = await res.json();
          if (slicerData.success && slicerData.weight > 0) {
            finalWeight = slicerData.weight;
            finalPrintTime = slicerData.printTimeHours;
            slicerSuccess = true;
          }
        }
      } catch (err) {
        console.warn("OrcaSlicer backend not available or failed. Falling back to estimation.");
      }
    }

    // 2. FALLBACK TO ESTIMATION FORMULA
    if (!slicerSuccess) {
      let density = 1.24;
      const config = useStore.getState().config;
      if (config.material === 'PETG') density = 1.27;
      else if (config.material === 'ABS') density = 1.04;
      else if (config.material === 'TPU') density = 1.21;

      const volumeCm3 = volume / 1000;
      const infill = config.strength || 20;
      const shellVolumeCm3 = volumeCm3 * 0.3;
      const innerVolumeCm3 = volumeCm3 * 0.7;
      const actualVolumeToPrint = shellVolumeCm3 + innerVolumeCm3 * (infill / 100);
      
      finalWeight = Math.max(0.01, actualVolumeToPrint * density);
      
      // Bambu P2S prints fast, approx 1 hr per 20 grams
      finalPrintTime = finalWeight / 20;
      if (finalPrintTime < 0.1) finalPrintTime = 0.1;
      finalPrintTime = Math.round(finalPrintTime * 100) / 100;
    }

    const fileStats = {
      volume,
      x,
      y,
      z,
      weight: finalWeight,
      printTime: finalPrintTime,
      isExact: slicerSuccess
    };

    set((state) => {
      const price = calculatePrice(state.config, fileStats);
      return { fileStats, mockPrice: price, isTooBig, isCalculating: false };
    });
  },

  setConfig: (newConfig) => set((state) => {
    const updatedConfig = { ...state.config, ...newConfig };

    let updatedFileStats = state.fileStats;
    if (state.fileStats && !state.fileStats.isExact) {
      // Only use the estimation fallback if we don't have exact OrcaSlicer data
      let density = 1.24;
      if (updatedConfig.material === 'PETG') density = 1.27;
      else if (updatedConfig.material === 'ABS') density = 1.04;
      else if (updatedConfig.material === 'TPU') density = 1.21;

      const volumeCm3 = state.fileStats.volume / 1000;
      const infill = updatedConfig.strength || 20;
      const shellVolumeCm3 = volumeCm3 * 0.3;
      const innerVolumeCm3 = volumeCm3 * 0.7;
      const actualVolumeToPrint = shellVolumeCm3 + innerVolumeCm3 * (infill / 100);
      
      const weight = Math.max(0.01, actualVolumeToPrint * density);

      let printTime = weight / 20;
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

  clearFile: () => set({ selectedFile: null, mockPrice: null, fileStats: null, isTooBig: false, isCalculating: false }),

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
      fileStats: null,
      isTooBig: false
    };
  }),

  addDirectItemToCart: (item) => set((state) => ({
    cart: [...state.cart, { id: Math.random().toString(36).substr(2, 9), ...item }]
  })),
}));
