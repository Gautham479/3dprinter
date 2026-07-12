"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function StorefrontGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to load products for storefront", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // For collections, show a list of featured products
  const featured = products.filter(p => p.isFeatured).map(p => ({
    name: p.name,
    img: p.image || `https://placehold.co/400x400/111/333?text=${encodeURIComponent(p.name)}`,
    linkUrl: `/products/${p.slug}`
  }));

  // Fallback to recent products if no featured products are set
  const baseCollections = featured.length > 0
    ? featured
    : products.slice(0, 10).map(p => ({
      name: p.name,
      img: p.image || `https://placehold.co/400x400/111/333?text=${encodeURIComponent(p.name)}`,
      linkUrl: `/products/${p.slug}`
    }));

  // Shuffle array randomly
  const shuffle = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const displayCollections = shuffle(baseCollections);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // pixels to scroll
      if (direction === 'left') {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-surface-bg py-6 sm:py-8 font-sans">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 text-center">
          <div className="bg-surface-card border border-surface-border rounded-md shadow-sm p-5 flex flex-col items-center">
            <div className="flex items-center justify-between mb-4 w-full">
              <div className="h-6 w-40 bg-surface-muted animate-pulse rounded-md" />
              <div className="h-4 w-28 bg-surface-muted animate-pulse rounded-md hidden sm:block" />
            </div>
            <div className="flex justify-center gap-4 sm:gap-6 overflow-hidden w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center w-[180px] sm:w-[220px] flex-shrink-0">
                  <div className="w-full aspect-square rounded-md bg-surface-muted animate-pulse mb-2" />
                  <div className="h-4 w-3/4 bg-surface-muted animate-pulse rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show the section if there are no products
  }

  return (
    <section className="w-full bg-surface-bg py-6 sm:py-8 font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center">

        {/* Curated Collections Horizontal Scroll */}
        {displayCollections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-surface-card border border-surface-border rounded-md shadow-sm p-5 w-full flex flex-col items-center"
          >
            <div className="flex items-center justify-between w-full mb-6">
              <h2 className="text-[21px] leading-[27px] font-bold text-fg tracking-tight text-center w-full sm:text-left sm:w-auto">Featured Products</h2>
              <Link href="/products" className="text-primary-600 hover:text-primary-500 hover:underline text-[13px] font-medium hidden sm:block">
                See all products
              </Link>
            </div>

            <div className="relative w-full flex justify-center">
              {/* Left Arrow */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-surface-bg/80 hover:bg-surface-muted text-fg transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-surface-bg/80 hover:bg-surface-muted text-fg transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>

              <div ref={scrollContainerRef} className="overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full flex justify-center">
                <div className="flex gap-4 sm:gap-6">
                  {displayCollections.map((item, idx) => (
                    <Link href={item.linkUrl} key={idx} className="flex flex-col items-center w-[180px] sm:w-[220px] group cursor-pointer">
                      <div className="w-full aspect-square rounded-md overflow-hidden bg-surface-muted mb-2 border border-surface-border">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[14px] sm:text-[15px] text-fg font-medium text-center leading-snug group-hover:text-primary-600 transition-colors break-words">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
