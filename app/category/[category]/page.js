"use client";

import React, { Suspense, use, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductsGrid from '@/components/ProductsGrid';
import { motion } from 'framer-motion';

const normalizeCategoryName = (rawName) => {
  if (!rawName) return 'Products';
  const decoded = decodeURIComponent(rawName).trim();
  const lower = decoded.toLowerCase().replace(/-/g, ' ');
  if (lower === 'idols' || lower === 'idol') {
    return 'Idols';
  }
  if (lower === 'action figures' || lower === 'action figure' || lower === 'action-figures') {
    return 'Action Figures';
  }
  if (lower.includes('action') && lower.includes('idol')) {
    return 'Action Figures & Idols';
  }
  if (lower.includes('kit card') || lower.includes('kit-card') || lower.includes('playable')) {
    return 'Playables';
  }
  if (lower.includes('organizer') || lower.includes('daily accessories')) {
    return 'Organizers';
  }
  if (lower.includes('home decor') || lower.includes('home-decor')) {
    return 'Home Decor';
  }
  return decoded;
};

const getCategoryTagline = (type) => {
  if (!type) return null;
  const t = type.toLowerCase();
  if (t.includes('action') || t.includes('idol')) return "Collectible action figures, spiritual idols, and anime-inspired creations.";
  if (t.includes('playable') || t.includes('kit card')) return "Interactive Kit Cards and build-it-yourself models designed for creative assembly.";
  if (t.includes('home decor')) return "Where style meets everyday function.";
  if (t.includes('organizer')) return "Functional desk organizers, key holders, and everyday home accessories.";
  return `Explore our premium selection of ${type.toLowerCase()}.`;
};

function CategoryHero({ category }) {
  const safeCategory = category || 'Category';
  
  const categoryImageMap = {
    'action figures & idols': '/photos/action 1.jpeg',
    'idols': '/photos/idols.jpeg',
    'action figures': '/photos/action 1.jpeg',
    'daily accessories': '/photos/daily acc .jpeg',
    'organizers': '/photos/daily acc .jpeg',
    'playables': '/pics/kit_cards.png',
    'home decor': '/pics/home_decor_banner.jpg',
    'kit cards': '/pics/kit_cards.png',
  };

  const defaultImagePath = categoryImageMap[safeCategory.toLowerCase()] || `/photos/${safeCategory.toLowerCase()}.jpeg`;
  const [imgSrc, setImgSrc] = useState(defaultImagePath);

  const tagline = getCategoryTagline(safeCategory);

  const getObjectPosition = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes('idol')) return 'center 20%';
    if (cat.includes('playable')) return 'center';
    if (cat.includes('action figure')) return 'top';
    return 'center';
  };

  return (
    <div className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-16 bg-black border-b border-surface-border">
      {/* Background Image - fully visible, fills the container size */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imgSrc} 
          alt={safeCategory}
          onError={() => setImgSrc('/hero-fallback.png')}
          className="w-full h-full object-cover opacity-100"
          style={{objectPosition: getObjectPosition(safeCategory)}}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-6 py-5 max-w-xl mx-auto rounded-md bg-black/55 backdrop-blur-[4px] border border-white/10 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase drop-shadow-2xl">
            {safeCategory}
          </h1>
          <div className="h-[4px] w-24 bg-primary-500 mx-auto rounded-sm shadow-[0_0_20px_rgba(255,153,0,0.6)]" />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryContent({ categoryName }) {
  const decodedCategory = normalizeCategoryName(categoryName);

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

