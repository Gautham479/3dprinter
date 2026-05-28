"use client";

import React, { Suspense, use, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductsGrid from '@/components/ProductsGrid';
import { motion } from 'framer-motion';

const getCategoryTagline = (type) => {
  if (!type) return null;
  const t = type.toLowerCase();
  if (t.includes('kit card')) return "Not just a card — a masterpiece in your hands.";
  if (t.includes('playable')) return "Crafted for curious minds.";
  if (t.includes('collect')) return "Crafted to be admired, shaped with precision.";
  if (t.includes('home decor')) return "Where style meets everyday function.";
  return `Explore our premium selection of ${type.toLowerCase()}.`;
};

function CategoryHero({ category }) {
  const safeCategory = category || 'Category';
  
  const categoryImageMap = {
    'idols': '/photos/idols.jpeg',
    'action figures': '/photos/action 1.jpeg',
    'daily accessories': '/photos/daily acc .jpeg',
    'desk accessories': '/pics/desk accesories.webp',
    'playables': '/pics/playables.jpg',
    'collectibles': '/pics/collectible.jpg',
    'home decor': '/pics/home decor.webp',
    'kit cards': '/pics/kit cards.webp',
  };

  const defaultImagePath = categoryImageMap[safeCategory.toLowerCase()] || `/photos/${safeCategory.toLowerCase()}.jpeg`;
  const [imgSrc, setImgSrc] = useState(defaultImagePath);

  const tagline = getCategoryTagline(safeCategory);

  // Get object-position based on category
  const getObjectPosition = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('collectible')) return 'center 20%';
    if (cat.includes('playable')) return 'center';
    return '';
  };

  return (
    <div className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-16 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imgSrc} 
          alt={safeCategory}
          onError={() => setImgSrc('/hero-fallback.png')}
          className="w-full h-full object-cover opacity-50"
          style={{objectPosition: getObjectPosition(safeCategory)}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-bg via-surface-bg/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-bg/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase drop-shadow-2xl">
            {safeCategory}
          </h1>
          <div className="h-[4px] w-24 bg-primary-500 mx-auto rounded-sm mb-6 shadow-[0_0_20px_rgba(255,153,0,0.6)]" />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryContent({ categoryName }) {
  const decodedCategory = decodeURIComponent(categoryName);

  return (
    <div className="w-full flex flex-col items-center">
      <CategoryHero category={decodedCategory} />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[50vh]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProductsGrid initialCategory={decodedCategory} hideFilters={true} />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryLoadingFallback() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-16 bg-surface-muted">
        <div className="text-center px-4 space-y-4">
          <div className="h-16 w-64 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
          <div className="h-1 w-24 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
          <div className="h-4 w-80 bg-surface-border/40 animate-pulse rounded-sm mx-auto" />
        </div>
      </div>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="w-full aspect-[4/3] bg-surface-muted animate-pulse rounded-sm border border-surface-border/40" />
              <div className="h-4 bg-surface-muted animate-pulse rounded-sm w-3/4" />
              <div className="h-3 bg-surface-muted/60 animate-pulse rounded-sm w-full" />
              <div className="h-8 bg-surface-muted animate-pulse rounded-sm mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<CategoryLoadingFallback />}>
        <CategoryContent categoryName={resolvedParams.category} />
      </Suspense>
      <Footer />
    </div>
  );
}

