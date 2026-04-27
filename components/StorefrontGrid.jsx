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

  // Group products by type, keeping only the first product for each type
  const categories = {};
  products.forEach(p => {
    if (!categories[p.type]) {
      categories[p.type] = p;
    }
  });

  const cards = Object.values(categories).map(product => ({
    title: product.type,
    type: "single",
    img: product.image || `https://placehold.co/800x800/111/333?text=${encodeURIComponent(product.type)}`,
    badge: product.inStock ? "" : "Out of Stock",
    linkText: `Shop ${product.type}`,
    linkUrl: `/category/${encodeURIComponent(product.type)}`
  }));

  // For collections, just show a list of recent or featured products
  const collections = products.slice(0, 10).map(p => ({
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
        
        {/* Amazon-style Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#111] border border-zinc-800 rounded-md shadow-sm p-5 flex flex-col h-full hover:border-zinc-700 transition-colors duration-300"
            >
              <h2 className="text-[21px] leading-[27px] font-bold text-white mb-3 tracking-tight">
                {card.title}
              </h2>
              
              <div className="flex-grow flex flex-col justify-center mb-4 relative">
                <Link href={card.linkUrl} className="relative w-full h-[280px] overflow-hidden rounded-sm group cursor-pointer bg-zinc-900 block">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {card.badge && (
                    <div className="absolute top-0 left-0 bg-[#CC0C39] text-white text-[12px] font-bold px-2 py-1 z-10">
                      {card.badge}
                    </div>
                  )}
                </Link>
              </div>
              
              <div className="mt-auto pt-2">
                <Link href={card.linkUrl} className="text-[#00A8E1] hover:text-[#FF9900] hover:underline text-[13px] font-medium transition-colors">
                  {card.linkText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curated Collections Horizontal Scroll */}
        {collections.length > 0 && (
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
                {collections.map((item, idx) => (
                  <Link href={item.linkUrl} key={idx} className="flex flex-col items-center w-[130px] sm:w-[160px] group cursor-pointer">
                    <div className="w-full aspect-square rounded-md overflow-hidden bg-zinc-900 mb-2 shadow-sm">
                      <img 
                        src={item.img} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                    <span className="text-[13px] text-zinc-300 font-medium text-center line-clamp-2 leading-snug group-hover:text-[#FF9900] transition-colors">
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
