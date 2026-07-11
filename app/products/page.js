"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductsGrid from '@/components/ProductsGrid';
import { motion } from 'framer-motion';

function ProductsLoadingFallback() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="h-10 w-64 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-[2px] w-20 bg-surface-muted animate-pulse rounded-sm mx-auto" />
        <div className="h-4 w-80 bg-surface-muted/60 animate-pulse rounded-sm mx-auto" />
      </div>
      <div className="mb-10 flex gap-2">
        {[80, 100, 120, 90, 110].map((w, i) => (
          <div key={i} className="h-9 bg-surface-muted animate-pulse rounded-sm" style={{ width: w }} />
        ))}
      </div>
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
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'All';

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-4xl font-black text-fg mb-3">Product Catalogue</h1>
          <div className="h-[2px] w-20 bg-primary-500 mx-auto rounded-sm mb-4" />
          <p className="text-fg-muted">
            Browse our complete collection of high-quality 3D printed accessories.
          </p>
        </div>
        <ProductsGrid hideFilters={false} initialCategory={category} />
      </motion.div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<ProductsLoadingFallback />}>
        <ProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
