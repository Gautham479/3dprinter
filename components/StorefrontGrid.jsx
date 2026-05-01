"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StorefrontGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const displayCollections = featured.length > 0 
    ? featured 
    : products.slice(0, 10).map(p => ({
        name: p.name,
        img: p.image || `https://placehold.co/400x400/111/333?text=${encodeURIComponent(p.name)}`,
        linkUrl: `/products/${p.slug}`
      }));

  if (loading) {
    return (
      <section className="w-full bg-black py-6 sm:py-8 font-sans min-h-[400px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-primary-500 rounded-full animate-spin"></div>
      </section>
    );
  }

  if (products.length === 0) {
    return null; // Don't show the section if there are no products
  }

  return (
    <section className="w-full bg-black py-6 sm:py-8 font-sans">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        
        {/* Curated Collections Horizontal Scroll */}
        {displayCollections.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#111] border border-zinc-800 rounded-md shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[21px] leading-[27px] font-bold text-white tracking-tight">Featured Products</h2>
              <Link href="/products" className="text-[#00A8E1] hover:text-[#FF9900] hover:underline text-[13px] font-medium hidden sm:block">
                See all products
              </Link>
            </div>
            
            <div className="relative w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 sm:gap-6 min-w-max">
                {displayCollections.map((item, idx) => (
                  <Link href={item.linkUrl} key={idx} className="flex flex-col items-center w-[180px] sm:w-[220px] group cursor-pointer">
                    <div className="w-full aspect-square rounded-md overflow-hidden bg-zinc-900 mb-2 shadow-sm">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <span className="text-[14px] sm:text-[15px] text-zinc-300 font-medium text-center line-clamp-2 leading-snug group-hover:text-[#FF9900] transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        
      </div>
    </section>
  );
}
