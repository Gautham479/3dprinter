"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Layers } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCT_TYPES } from '@/lib/catalog';

const getCategoryTagline = (type) => {
  if (!type || type === 'All') return null;
  const t = type.toLowerCase();
  if (t.includes('kit card')) return "Not just a card — a masterpiece in your hands.";
  if (t.includes('playable')) return "Crafted for curious minds.";
  if (t.includes('collect')) return "Crafted to be admired, shaped with precision.";
  if (t.includes('home decor')) return "Where style meets everyday function.";
  return null;
};

function ProductCard({ product, handleAddToCart, updateProductColorOption, productColorOptions, activeColors }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);
  const uniqueImages = [...new Set(allImages)];

  useEffect(() => {
    let interval;
    if (isHovered && uniqueImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % uniqueImages.length);
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, uniqueImages.length]);

  const displayImage = uniqueImages[currentImageIndex] || '';

  return (
    <div className="flex flex-col h-full group">
      <Link href={`/products/${product.slug}`} className="flex-grow flex flex-col cursor-pointer">
        <motion.div
          className="relative rounded-sm border border-surface-border bg-surface-card overflow-hidden flex flex-col h-full transition-all duration-300"
          whileHover={{ y: -4 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            boxShadow: isHovered ? '0 12px 30px rgba(92,74,66,0.12)' : 'none',
          }}
        >
          {/* Hover border */}
          <div className={`absolute inset-0 rounded-sm border border-primary-500/0 transition-all duration-300 pointer-events-none ${isHovered ? 'border-primary-500/30' : ''}`} />

          {/* Image */}
          <div className="w-full aspect-[4/3] relative bg-surface-muted overflow-hidden">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={product.name}
                fill
                className={`object-cover w-full h-full transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                <span className="text-primary-500/60 font-bold tracking-widest uppercase text-sm">3D Model</span>
              </div>
            )}

            {/* Image dots */}
            {uniqueImages.length > 1 && isHovered && (
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {uniqueImages.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-sm transition-all ${i === currentImageIndex ? 'bg-primary-500 w-4' : 'bg-surface-border w-1.5'}`} />
                ))}
              </div>
            )}

            {/* Out of stock overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-surface-bg/60 flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-sm bg-red-500/20 border border-red-500/40 text-red-500 text-xs font-black uppercase tracking-wider">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-4 gap-2 flex-grow">
              <h3 className="text-fg font-bold text-base group-hover:text-primary-500 transition-colors break-words flex-1">{product.name}</h3>
              <span className="text-primary-500 font-black text-sm whitespace-nowrap flex-shrink-0">₹{product.price}</span>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-2 py-1 bg-primary-500/10 rounded-sm text-xs text-primary-500 font-bold border border-primary-500/20">
                {product.material}
              </span>
              <span className="px-2 py-1 bg-surface-muted rounded-sm text-xs text-fg-muted font-bold border border-surface-border">
                {product.type}
              </span>
              {product.dimensions && (
                <span className="px-2 py-1 bg-surface-muted rounded-sm text-xs text-fg-muted font-bold border border-surface-border">
                  {product.dimensions}
                </span>
              )}
            </div>

            {/* Color options */}
            <div className="space-y-2 mt-auto">
              <select
                value={productColorOptions[product.id]?.color || activeColors[0]?.name}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onChange={(e) => updateProductColorOption(product.id, { colorMode: 'Single Color', color: e.target.value }, activeColors[0]?.name)}
                className="w-full bg-surface-muted/60 border border-surface-border rounded-sm px-2 py-1.5 text-xs text-fg focus:outline-none focus:border-primary-500/50 transition-colors"
              >
                {activeColors.map((color) => (
                  <option key={color.name} value={color.name}>{color.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Add to Cart */}
      <motion.button
        disabled={!product.inStock}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(product); }}
        whileHover={product.inStock ? { scale: 1.02 } : {}}
        whileTap={product.inStock ? { scale: 0.98 } : {}}
        className={`w-full py-2.5 rounded-sm font-bold transition-all flex items-center justify-center gap-2 text-sm mt-3 ${product.inStock
          ? 'btn-glow bg-primary-500 hover:bg-primary-600 text-[var(--app-cta-contrast)]'
          : 'bg-surface-muted text-fg-subtle border border-surface-border cursor-not-allowed'
          }`}
      >
        <ShoppingCart className="w-4 h-4" />
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </motion.button>
    </div>
  );
}

export default function ProductsGrid({ featuredOnly = false, hideFilters = false, initialCategory = 'All' }) {
  const [selectedType, setSelectedType] = useState(initialCategory);

  useEffect(() => {
    // If the prop changes dynamically via router, update the selected type
    setSelectedType(initialCategory);
  }, [initialCategory]);

  const [productColorOptions, setProductColorOptions] = useState({});
  const setProducts = useStore((state) => state.setProducts);
  const [localProducts, setLocalProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const addDirectItemToCart = useStore((state) => state.addDirectItemToCart);
  const openCart = useStore((state) => state.openCart);
  const searchQuery = useStore((state) => state.searchQuery);
  const filters = ['All', ...PRODUCT_TYPES];

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const url = featuredOnly
        ? '/api/products?includeOutOfStock=1&featured=1'
        : '/api/products?includeOutOfStock=1';
      const response = await fetch(url);
      const data = await response.json().catch(() => []);
      const productsArray = Array.isArray(data) ? data : [];

      // Randomize the product order on every page load
      for (let i = productsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsArray[i], productsArray[j]] = [productsArray[j], productsArray[i]];
      }

      setLocalProducts(productsArray);
      if (!featuredOnly) {
        setProducts(productsArray);
      }
      setLoading(false);
    };
    loadProducts();
  }, [featuredOnly, setProducts]);

  const activeType = searchQuery.trim() ? 'All' : selectedType;

  const filteredProducts = (localProducts || []).filter((product) => {
    // Treat 'Idols' as an alias for 'Action Figures' (merged categories)
    const productTags = (product.tags && product.tags.length > 0 ? product.tags : [product.type])
      .map(t => t === 'Idols' ? 'Action Figures' : t);
    const tagMatches = activeType === 'All' || productTags.includes(activeType);
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const queryMatches =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      (product.fullDescription?.toLowerCase() || '').includes(normalizedQuery) ||
      (product.tags || []).some(t => t.toLowerCase().includes(normalizedQuery)) ||
      product.type.toLowerCase().includes(normalizedQuery);
    return tagMatches && queryMatches;
  });

  const colors = useStore((state) => state.colors);
  const fetchColors = useStore((state) => state.fetchColors);

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  const getProductColors = (product) => {
    const productColors = colors.filter(c => c.material === product.material);
    return productColors.length > 0 ? productColors : [
      { name: 'Black', hex: '#111111' },
      { name: 'Gray', hex: '#6b7280' },
      { name: 'Beige', hex: '#d6c4a8' },
      { name: 'Latte Brown', hex: '#8b6b4a' },
      { name: 'Ivory White', hex: '#f8f5e9' },
    ];
  };

  const handleAddToCart = (product) => {
    const activeColors = getProductColors(product);
    const defaultColor = activeColors[0]?.name || 'Black';
    const productOption = productColorOptions[product.id] || {
      colorMode: 'Single Color',
      color: defaultColor,
    };
    addDirectItemToCart({
      fileName: product.name,
      config: {
        material: product.material,
        quality: 'Pre-printed',
        colorMode: productOption.colorMode,
        color: productOption.colorMode === 'Multicolor' ? 'Multicolor' : productOption.color,
        strength: 20
      },
      price: product.price
    });
    openCart();
  };

  const updateProductColorOption = (productId, updates, defaultColor) => {
    setProductColorOptions((prev) => {
      const current = prev[productId] || { colorMode: 'Single Color', color: defaultColor };
      return { ...prev, [productId]: { ...current, ...updates } };
    });
  };

  return (
    <div>
      {/* Filter tabs */}
      {!hideFilters && (
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {filters.map((type) => (
              <motion.button
                key={type}
                onClick={() => setSelectedType(type)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-sm font-bold whitespace-nowrap transition-all text-sm ${activeType === type
                  ? 'bg-primary-500 text-[var(--app-cta-contrast)] shadow-md'
                  : 'bg-surface-card text-fg-muted hover:text-fg border border-surface-border hover:border-primary-500/30'
                  }`}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full aspect-[3/4] bg-surface-muted/60 animate-pulse rounded-sm border border-surface-border/40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const activeColors = getProductColors(product);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    handleAddToCart={handleAddToCart}
                    updateProductColorOption={updateProductColorOption}
                    productColorOptions={productColorOptions}
                    activeColors={activeColors}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredProducts.length === 0 && !loading && (
            <div className="col-span-full py-16 text-center">
              <div className="w-16 h-16 rounded-sm bg-surface-muted/60 border border-surface-border flex items-center justify-center mx-auto mb-4">
                <Layers className="w-8 h-8 text-fg-subtle" />
              </div>
              <p className="text-fg-muted text-lg font-semibold">No matches found</p>
              <button
                onClick={() => { setSelectedType('All'); useStore.getState().setSearchQuery(''); }}
                className="mt-4 px-5 py-2 bg-primary-500/10 border border-primary-500/30 rounded-sm text-primary-500 font-bold hover:bg-primary-500/20 transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
