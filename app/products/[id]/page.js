"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Check, ChevronLeft, ChevronRight, Layers, Weight, Ruler, Package, Truck, Star, RotateCcw, ChevronDown, ChevronUp, ShieldCheck, Zap, Award, Sparkles, FileCode, Printer, PackageCheck, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';


const getProductImages = (product) => {
  if (!product) return [];
  const all = [product.image, ...(product.images || [])].filter(Boolean);
  return [...new Set(all)];
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [zoom, setZoom] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState('');
  const [singleColor, setSingleColor] = useState('Black');
  const colors = useStore((state) => state.colors);
  const fetchColors = useStore((state) => state.fetchColors);
  const addDirectItemToCart = useStore((state) => state.addDirectItemToCart);
  const openCart = useStore((state) => state.openCart);

  const productColors = colors.filter(c => c.material === product?.material);
  const activeColors = productColors.length > 0 ? productColors : [
    { name: 'Black', hex: '#111111' },
    { name: 'Gray', hex: '#6b7280' },
    { name: 'Beige', hex: '#d6c4a8' },
    { name: 'Latte Brown', hex: '#8b6b4a' },
    { name: 'Ivory White', hex: '#f8f5e9' },
  ];

  useEffect(() => {
    fetchColors();
  }, [fetchColors]);

  useEffect(() => {
    if (activeColors.length > 0) {
      const names = activeColors.map(c => c.name);
      if (!names.includes(singleColor)) {
        setSingleColor(activeColors[0].name);
      }
    }
  }, [activeColors, singleColor]);

  const images = getProductImages(product);
  const currentImageIndex = images.indexOf(selectedImage);

  const handleNextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (currentImageIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  useEffect(() => {
    const loadProduct = async () => {
      setIsLoading(true);
      setNotFound(false);
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) { setNotFound(true); setIsLoading(false); return; }
        const data = await response.json();
        setProduct(data);
        const imgs = getProductImages(data);
        setSelectedImage(imgs[0] || '');

        const productsResponse = await fetch('/api/products?includeOutOfStock=1');
        const allProducts = await productsResponse.json().catch(() => []);
        if (Array.isArray(allProducts)) {
          // Prefer same-category products, fall back to random
          const sameCategory = allProducts.filter(
            (item) => item.slug !== data.slug && item.type === data.type
          );
          const others = allProducts.filter(
            (item) => item.slug !== data.slug && item.type !== data.type
          );
          const pool = [...sameCategory.sort(() => 0.5 - Math.random()), ...others.sort(() => 0.5 - Math.random())];
          setRelatedProducts(pool.slice(0, 6));
        }
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (params.id) loadProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addDirectItemToCart({
        fileName: product.name,
        config: {
          material: product.material,
          quality: 'Pre-printed',
          colorMode: 'Single Color',
          color: singleColor,
          strength: 20
        },
        price: product.price
      });
      setAddedToCart(true);
      openCart();
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleImageMouseMove = (e) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-bg">
        <Navbar />
        <CartDrawer />
        <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <div className="h-5 w-36 bg-surface-muted animate-pulse rounded-sm mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <div className="w-full max-w-xl aspect-[4/3] bg-surface-muted animate-pulse rounded-sm border border-surface-border" />
              <div className="flex gap-2 justify-center">
                {[...Array(4)].map((_, i) => <div key={i} className="w-16 h-16 bg-surface-muted animate-pulse rounded-sm border border-surface-border" />)}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="h-7 w-24 bg-surface-muted animate-pulse rounded-sm" />
              <div className="h-10 w-3/4 bg-surface-muted animate-pulse rounded-sm" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-surface-muted/70 animate-pulse rounded-sm" />
                <div className="h-4 w-5/6 bg-surface-muted/70 animate-pulse rounded-sm" />
                <div className="h-4 w-4/6 bg-surface-muted/70 animate-pulse rounded-sm" />
              </div>
              <div className="rounded-sm border border-surface-border bg-surface-card/80 p-6">
                <div className="h-4 w-28 bg-surface-muted animate-pulse rounded-sm mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-surface-muted animate-pulse rounded-sm flex-shrink-0" />
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="h-3 w-16 bg-surface-muted animate-pulse rounded-sm" />
                        <div className="h-4 w-20 bg-surface-muted/70 animate-pulse rounded-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-sm border border-surface-border bg-surface-card/80 p-6">
                <div className="h-12 w-28 bg-surface-muted animate-pulse rounded-sm mb-5" />
                <div className="h-14 w-full bg-surface-muted animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-surface-bg">
        <Navbar />
        <CartDrawer />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="w-20 h-20 rounded-sm bg-surface-muted border border-surface-border flex items-center justify-center">
            <Layers className="w-10 h-10 text-fg-subtle" />
          </div>
          <h2 className="text-2xl font-black text-fg">Product Not Found</h2>
          <p className="text-fg-muted">This product doesn't exist or has been removed.</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-2 px-6 py-3 bg-primary-500 text-[var(--app-cta-contrast)] font-black rounded-sm hover:bg-primary-600 transition-colors"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = [
    { icon: <Weight className="w-4 h-4" />, label: 'Weight', value: product.weight ? `${product.weight} grams` : null },
    { icon: <Layers className="w-4 h-4" />, label: 'Material', value: product.material },
    { icon: <Ruler className="w-4 h-4" />, label: 'Dimensions', value: product.dimensions },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/6 rounded-sm blur-3xl pointer-events-none" />

      <Navbar />
      <CartDrawer />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative"
      >
        {/* Back */}
        <motion.button
          onClick={() => router.back()}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors mb-8 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Images */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-center relative overflow-visible w-full group">
              <motion.div
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => { setImageHovered(false); setZoom({ x: 0, y: 0 }); }}
                onMouseMove={handleImageMouseMove}
                className="w-full max-w-xl aspect-[4/3] rounded-sm relative overflow-hidden cursor-zoom-in border border-surface-border bg-surface-card shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full relative"
                  >
                    {selectedImage ? (
                      <Image
                        src={selectedImage}
                        alt={product.name}
                        fill
                        className="object-contain w-full h-full"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-muted animate-pulse" />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-surface-bg/80 p-3 rounded-sm text-fg hover:bg-primary-500 hover:text-[var(--app-cta-contrast)] transition-all opacity-0 group-hover:opacity-100 shadow-md border border-surface-border z-20"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-surface-bg/80 p-3 rounded-sm text-fg hover:bg-primary-500 hover:text-[var(--app-cta-contrast)] transition-all opacity-0 group-hover:opacity-100 shadow-md border border-surface-border z-20"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {!imageHovered && (
                  <div className="absolute inset-0 flex items-end justify-center pb-5 z-10">
                    <span className="text-[var(--app-cta-contrast)]/70 text-xs font-bold bg-black/40 backdrop-blur-md px-5 py-2 rounded-sm border border-white/10">
                      Hover to zoom
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Zoom panel */}
              {imageHovered && selectedImage && (
                <div
                  className="absolute top-0 rounded-sm shadow-xl overflow-hidden border-2 border-primary-500/30 pointer-events-none z-50 w-[700px] h-[500px] hidden lg:block bg-surface-bg"
                  style={{ left: 'calc(100% + 3rem)' }}
                >
                  <Image
                    src={selectedImage}
                    alt={`${product.name} zoomed`}
                    fill
                    className="object-cover"
                    style={{
                      transform: 'scale(2.5)',
                      transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      transition: 'transform 0.05s ease-out'
                    }}
                    sizes="700px"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-[var(--app-cta-contrast)] text-xs font-black px-3 py-1.5 rounded-sm shadow-md">
                    2.5x Zoom
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {getProductImages(product).length > 1 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {getProductImages(product).map((imageUrl) => (
                  <motion.button
                    key={imageUrl}
                    type="button"
                    onClick={() => setSelectedImage(imageUrl)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-16 h-16 rounded-sm border-2 overflow-hidden relative transition-all ${selectedImage === imageUrl
                      ? 'border-primary-500 shadow-md'
                      : 'border-surface-border opacity-60 hover:opacity-100 hover:border-primary-500/50'
                      }`}
                  >
                    <Image src={imageUrl} alt="Product thumbnail" fill className="object-cover" sizes="64px" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-0">

            {/* Type badge + Name */}
            <div className="mb-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-primary-500/10 text-fg rounded-sm text-sm font-black border border-primary-500/20">
                  {product.type}
                </span>
                {!product.inStock && (
                  <span className="px-3 py-1 rounded-sm text-sm font-black bg-red-500/15 text-red-500 border border-red-500/30">
                    Currently out of stock
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-fg">{product.name}</h1>
            </div>

            {/* ── 1. PRICE ── */}
            <div className="mb-4 pb-4 border-b border-surface-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-4 rounded-sm" style={{ background: '#C2A56D' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#C2A56D' }}>Price</span>
              </div>
              <p className="text-5xl font-black text-fg mb-2">₹{product.price}</p>
              <div className="flex items-center gap-2 text-fg-subtle">
                <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <p className="text-xs sm:text-sm font-semibold">Shipping charges additional at checkout</p>
              </div>
            </div>

            {/* ── 2. COLOUR OPTIONS & ADD TO CART (Combined Box) ── */}
            <div className="mb-4 pb-4 border-b border-surface-border">
              <div className="rounded-sm border border-surface-border bg-surface-card/80 p-4 space-y-4 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500/60" />

                {/* Colour Options */}
                {activeColors.length > 0 && (
                  <div className="pb-3 border-b border-surface-border/60">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1.5 h-3.5 rounded-sm bg-fg" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fg">Colour Options</span>
                    </div>
                    <div className="flex gap-2 flex-wrap mb-2">
                      {activeColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          title={color.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSingleColor(color.name);
                          }}
                          className={`w-8 h-8 rounded-sm border-2 transition-all hover:scale-110 ${singleColor === color.name
                            ? 'border-fg scale-110 shadow-md'
                            : 'border-surface-border hover:border-fg/60'
                            }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-fg-subtle font-semibold">Selected: {singleColor || 'None'}</p>
                  </div>
                )}

                {/* Add to Cart */}
                <div>
                  {product.inStock && (
                    <div className="flex items-center w-max gap-1.5 px-3 py-1.5 mb-3 rounded-sm bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-black">
                      <motion.span
                        className="w-2 h-2 rounded-sm bg-green-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      In Stock
                    </div>
                  )}
                  <motion.button
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                    whileHover={product.inStock ? { scale: 1.02 } : {}}
                    whileTap={product.inStock ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-sm font-black text-lg flex items-center justify-center gap-3 transition-all ${!product.inStock
                      ? 'bg-surface-muted text-fg-subtle border border-surface-border cursor-not-allowed'
                      : addedToCart
                        ? 'bg-accent-500/15 text-accent-500 border border-accent-500/30'
                        : 'btn-glow bg-primary-500 hover:bg-primary-600 text-[var(--app-cta-contrast)]'
                      }`}
                  >
                    {!product.inStock ? (
                      'Out of Stock'
                    ) : addedToCart ? (
                      <>
                        <Check className="w-5 h-5" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ── 5. NOTE ── */}
            {product.note && (
              <div className="mb-4 pb-4 border-b border-surface-border">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-4 rounded-sm bg-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Note</span>
                </div>
                <div className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-amber-500/10 border border-amber-500/25">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold leading-relaxed">{product.note}</p>
                </div>
              </div>
            )}

            {/* ── 6. SPECIFICATIONS ── */}
            <div className="mb-4 pb-4 border-b border-surface-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 rounded-sm bg-teal-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-500">Specifications</span>
              </div>
              <div className="rounded-sm border border-teal-500/20 bg-teal-500/5 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-teal-500/40" />
                <div className="grid grid-cols-2 gap-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-sm bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0 text-teal-600 mt-0.5">
                        {spec.icon}
                      </div>
                      <div>
                        <p className="text-fg-subtle text-xs font-bold uppercase tracking-wider">{spec.label}</p>
                        <p className="text-fg font-bold text-sm mt-0.5">{spec.value || '—'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 7. ABOUT ── */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-4 rounded-sm bg-slate-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">About</span>
              </div>
              <p className="text-fg-muted text-base leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Policy Accordions */}
            <ProductAccordions />
          </div>
        </div>

        {/* ── Feature Highlights (Materials & Precision) ── */}
        <ProductFeatureHighlights />

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-surface-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Collections</span>
            </div>
            <h2 className="text-2xl font-black text-fg mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="rounded-sm border border-surface-border bg-surface-card/80 overflow-hidden cursor-pointer group transition-all hover:shadow-lg"
                >
                  <Link href={`/products/${p.slug}`} className="block">
                    <div className="w-full aspect-[3/4] relative bg-surface-muted overflow-hidden">
                      {(p.image || p.images?.[0]) ? (
                        <Image
                          src={p.image || p.images?.[0]}
                          alt={p.name}
                          fill
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary-50">
                          <Layers className="w-8 h-8 text-primary-500/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 border-t border-surface-border/50">
                      <h3 className="text-fg font-bold text-xs mb-1 group-hover:text-primary-500 transition-colors line-clamp-2 leading-snug">{p.name}</h3>
                      <p className="text-primary-500 font-black text-sm">₹{p.price}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── How It's Made ── */}
        <HowItsMade />

        {/* ── FAQs ── */}
        <ProductFAQ />
      </motion.div>

      <Footer />
    </div>
  );
}

function ProductAccordions() {
  const [openIndex, setOpenIndex] = useState(1);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-6 border-t border-b border-surface-border divide-y divide-surface-border/60">
      {/* 100% Breakage Insurance */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggle(0)}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-fg hover:text-primary-500 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-fg group-hover:text-primary-500">100% Breakage Insurance</span>
          </div>
          {openIndex === 0 ? <ChevronUp className="w-4 h-4 text-fg-muted" /> : <ChevronDown className="w-4 h-4 text-fg-muted" />}
        </button>
        {openIndex === 0 && (
          <div className="pt-2 pb-1 text-xs text-fg-muted leading-relaxed pl-6">
            All our orders come with 100% breakage insurance during transit. If your item arrives damaged or broken, we will replace it free of charge.
          </div>
        )}
      </div>

      {/* Shipping Information */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggle(1)}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-fg hover:text-primary-500 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-fg group-hover:text-primary-500">Shipping Information:</span>
          </div>
          {openIndex === 1 ? <ChevronUp className="w-4 h-4 text-fg-muted" /> : <ChevronDown className="w-4 h-4 text-fg-muted" />}
        </button>
        {openIndex === 1 && (
          <div className="pt-2 pb-1 text-xs text-fg-muted leading-relaxed pl-6 space-y-2">
            <ul className="list-disc pl-4 space-y-1.5">
              <li>
                <strong className="text-fg font-semibold">Dispatch Time:</strong> Orders are normally processed and dispatched within 24 hours. However, during peak seasons or sale events, please allow 3-4 business days for your order to be dispatched due to high volumes.
              </li>
              <li>
                <strong className="text-fg font-semibold">Estimated Delivery:</strong> Expect delivery within 6 to 7 business days.
              </li>
              <li>
                See our{' '}
                <a href="/contact" className="underline font-bold text-fg hover:text-primary-500 transition-colors">
                  Shipping Policy
                </a>{' '}
                for more details.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Return and Exchange Policy */}
      <div className="py-3">
        <button
          type="button"
          onClick={() => toggle(2)}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-fg hover:text-primary-500 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-bold text-fg group-hover:text-primary-500">Return and Exchange Policy:</span>
          </div>
          {openIndex === 2 ? <ChevronUp className="w-4 h-4 text-fg-muted" /> : <ChevronDown className="w-4 h-4 text-fg-muted" />}
        </button>
        {openIndex === 2 && (
          <div className="pt-2 pb-1 text-xs text-fg-muted leading-relaxed pl-6">
            We inspect all products before dispatch. Returns or exchanges are supported within 36 hours of receipt for defective or incorrectly fulfilled items.
          </div>
        )}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   MATERIALS & PRECISION SHOWCASE
───────────────────────────────────────────── */
function ProductFeatureHighlights() {
  return (
    <div className="mt-20 pt-12 border-t border-surface-border/50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Card 1 — Materials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col rounded-sm border border-surface-border bg-surface-card/80 overflow-hidden shadow-sm hover:border-primary-500/30 transition-all duration-300"
        >
          {/* Image Container */}
          <div className="w-full relative aspect-[4/3] sm:aspect-[16/10] bg-black/60 overflow-hidden border-b border-surface-border flex items-center justify-center">
            <Image
              src="/pics/materials_showcase.jpg"
              alt="Premium Printing Materials"
              fill
              className="object-contain w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div className="p-6 flex flex-col justify-between flex-1 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-fg mb-2 tracking-tight">
                Premium Printing Materials
              </h3>
              <p className="text-fg-muted text-sm sm:text-base leading-relaxed">
                “We use high-quality 3D printing filaments from trusted brands to deliver strong, durable and visually refined products.”
              </p>
            </div>

            {/* Supporting Line */}
            <div className="pt-3 border-t border-surface-border/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-sm bg-primary-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-primary-500 tracking-wide">
                Quality Materials • Vibrant Finishes • Reliable Results
              </p>
            </div>
          </div>
        </motion.div>

        {/* Card 2 — Precision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col rounded-sm border border-surface-border bg-surface-card/80 overflow-hidden shadow-sm hover:border-primary-500/30 transition-all duration-300"
        >
          {/* Image Container */}
          <div className="w-full relative aspect-[4/3] sm:aspect-[16/10] bg-black/60 overflow-hidden border-b border-surface-border flex items-center justify-center">
            <Image
              src="/pics/precision_printing.jpg"
              alt="High-Precision 3D Printing"
              fill
              className="object-contain w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div className="p-6 flex flex-col justify-between flex-1 gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-fg mb-2 tracking-tight">
                High-Precision 3D Printing
              </h3>
              <p className="text-fg-muted text-sm sm:text-base leading-relaxed">
                “Every product is printed with precision to achieve clean details, accurate dimensions and a smooth professional finish.”
              </p>
            </div>

            {/* Supporting Line */}
            <div className="pt-3 border-t border-surface-border/60 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-sm bg-primary-500 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-primary-500 tracking-wide">
                Sharp Details • Accurate Dimensions • Consistent Quality
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HOW IT'S MADE
───────────────────────────────────────────── */
function HowItsMade() {
  const steps = [
    { icon: <FileCode className="w-6 h-6" />, step: '01', title: 'Design', desc: 'Your idea is translated into a precise 3D model using CAD or STL files.' },
    { icon: <Printer className="w-6 h-6" />, step: '02', title: '3D Printing', desc: 'Printed layer-by-layer on professional FDM machines with premium filaments.' },
    { icon: <Sparkles className="w-6 h-6" />, step: '03', title: 'Finishing & QC', desc: 'Sanded, cleaned, and quality-checked to ensure a flawless final product.' },
    { icon: <PackageCheck className="w-6 h-6" />, step: '04', title: 'Packaging & Delivery', desc: 'Securely packed with breakage protection and delivered across India.' },
  ];

  return (
    <div className="mt-20 pt-12 border-t border-surface-border/50">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px w-8 bg-primary-500" />
        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Process</span>
      </div>
      <h2 className="text-2xl font-black text-fg mb-10">How It's Made</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative flex flex-col gap-4 p-6 border border-surface-border bg-surface-card/60 hover:bg-surface-card transition-colors duration-300"
          >
            {/* Step connector line */}
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute top-9 right-0 translate-x-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-primary-500/50" />
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-sm bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-500 flex-shrink-0">
                {s.icon}
              </div>
              <span className="text-4xl font-black text-surface-border leading-none select-none">{s.step}</span>
            </div>
            <div>
              <p className="text-fg font-black text-sm mb-1.5">{s.title}</p>
              <p className="text-fg-muted text-xs leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT FAQs
───────────────────────────────────────────── */
function ProductFAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'What materials are used in 3D printing?',
      a: 'We use premium-grade filaments including PLA, PETG, ABS, and TPU — each chosen based on product requirements. All materials are safe, durable, and quality-certified.'
    },
    {
      q: 'How long does delivery take?',
      a: 'Orders are dispatched within 24 hours (or 3-4 days during peak seasons). Estimated delivery is 6-7 business days across India.'
    },
    {
      q: 'Is the product fragile? How is it packed?',
      a: 'All products are individually inspected and bubble-wrapped in sturdy boxes. We offer 100% breakage insurance — if it arrives damaged, we replace it free of charge.'
    },
    {
      q: 'Can I customise this product?',
      a: 'Yes! We offer custom colours, sizes, and design modifications. Use the Custom Order page or contact us directly to discuss your requirements.'
    },
    {
      q: 'Do you offer returns or replacements?',
      a: 'Returns and exchanges are accepted within 36 hours of delivery for defective or incorrectly fulfilled orders. Contact our support team with photos of the issue.'
    },
    {
      q: 'Are the products food-safe or child-safe?',
      a: 'Our PLA products are generally non-toxic and safe for display. However, 3D printed items are not certified food-safe unless specified. Keep small parts away from young children.'
    },
  ];

  return (
    <div className="mt-20 pt-12 border-t border-surface-border/50 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-px w-8 bg-primary-500" />
        <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">FAQs</span>
      </div>
      <h2 className="text-2xl font-black text-fg mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl divide-y divide-surface-border border border-surface-border rounded-sm overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-surface-muted/40 transition-colors duration-200 group"
            >
              <span className="text-fg font-bold text-sm group-hover:text-primary-500 transition-colors leading-snug">{faq.q}</span>
              <span className="flex-shrink-0 w-6 h-6 rounded-sm border border-surface-border flex items-center justify-center text-fg-muted group-hover:border-primary-500/40 group-hover:text-primary-500 transition-all">
                {openIdx === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIdx === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pt-1">
                    <div className="h-px w-full bg-surface-border/60 mb-4" />
                    <p className="text-fg-muted text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
