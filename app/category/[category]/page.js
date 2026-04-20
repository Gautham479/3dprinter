"use client";

import React, { Suspense, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductsGrid from '@/components/ProductsGrid';
import { motion } from 'framer-motion';

function CategoryContent({ categoryName }) {
  const decodedCategory = decodeURIComponent(categoryName);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-black text-fg mb-3">{decodedCategory}</h1>
          <div className="h-[2px] w-20 bg-primary-500 mx-auto rounded-sm mb-4" />
          <p className="text-fg-muted">
            Browse our premium selection of {decodedCategory.toLowerCase()}.
          </p>
        </div>
        <ProductsGrid initialCategory={decodedCategory} hideFilters={true} />
      </motion.div>
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
