import { create } from 'zustand';

const MOCK_BASE_PRICE = 499;

export const useStore = create((set) => ({
  selectedFile: null,
  config: {
    material: 'PLA',
    color: 'Black',
    colorMode: 'Single Color',
    quality: 'Standard (0.2mm)',
    strength: 20,
  },
  mockPrice: null,
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
        // Only override defaults if database actually returns some colors
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
    // If a file is selected, update mock price based on current config
    const price = file ? calculateMockPrice(state.config) : null;
    return { selectedFile: file, mockPrice: price };
  }),

  setConfig: (newConfig) => set((state) => {
    const updatedConfig = { ...state.config, ...newConfig };
    const price = state.selectedFile ? calculateMockPrice(updatedConfig) : null;
    return { config: updatedConfig, mockPrice: price };
  }),

  clearFile: () => set({ selectedFile: null, mockPrice: null }),

  addToCart: () => set((state) => {
    if (!state.selectedFile || !state.mockPrice) return state;

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      fileName: state.selectedFile.name,
      file: state.selectedFile, // Keep the raw File object for upload
      type: 'custom',
      config: state.config,
      price: state.mockPrice
    };

    return {
      cart: [...state.cart, newItem],
      selectedFile: null,
      mockPrice: null
    };
  }),

  addDirectItemToCart: (item) => set((state) => ({
    cart: [...state.cart, { id: Math.random().toString(36).substr(2, 9), ...item }]
  })),
}));

// A simple mock pricing calculator based on selections
function calculateMockPrice(config) {
  // Temporary: Set default price to 1 Rupee for custom orders as requested
  return 1;
}
