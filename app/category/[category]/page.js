"use client";

import React, { Suspense, use, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductsGrid from '@/components/ProductsGrid';
import { motion } from 'framer-motion';

function CategoryHero({ category }) {
  const safeCategory = category || 'Category';
  
  const categoryImageMap = {
    'idols': '/photos/idols.jpeg',
    'action figures': '/photos/action 1.jpeg',
    'daily accessories': '/photos/daily acc .jpeg',
    'desk accessories': '/photos/daily acc 1.jpeg',
    'playables': '/photos/playables.jpeg',
    'collectibles': '/photos/action 2.jpeg',
    'home decor': '/photos/idols 2.jpg',
    'kit cards': '/photos/playables 3.jpeg',
  };

  const defaultImagePath = categoryImageMap[safeCategory.toLowerCase()] || `/photos/${safeCategory.toLowerCase()}.jpeg`;
  const [imgSrc, setImgSrc] = useState(defaultImagePath);

  return (
    <div className="relative w-full h-[35vh] min-h-[300px] flex items-center justify-center overflow-hidden mt-16 bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imgSrc} 
          alt={safeCategory}
          onError={() => setImgSrc('/hero-fallback.png')}
          className="w-full h-full object-cover opacity-50"
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
          <p className="text-zinc-200 text-lg md:text-xl font-medium drop-shadow-lg">
            Explore our premium selection of {safeCategory.toLowerCase()}.
          </p>
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

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<div className="h-screen" />}>
        <CategoryContent categoryName={resolvedParams.category} />
      </Suspense>
      <Footer />
    </div>
  );
}
