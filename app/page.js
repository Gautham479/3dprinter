"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductsGrid from '@/components/ProductsGrid';
import HowItWorks from '@/components/HowItWorks';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

function ScrollToSection() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  React.useEffect(() => {
    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [section]);

  return null;
}

export default function Home() {
  const products = useStore((state) => state.products);

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      
      {/* Top headline in empty space */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-fg tracking-tight leading-tight"
        >
          Where Your Ideas <span className="text-primary-500">Become Reality</span>
        </motion.h1>
      </section>

      {/* Hero Section */}
      <section id="hero" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 sm:pt-4 sm:pb-10">
        <Hero />
      </section>

      {/* Featured Products */}
      <section id="content" className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-fg mb-3">Featured Collection</h2>
          <div className="h-[2px] w-20 bg-primary-500 mx-auto rounded-sm mb-4" />
          <p className="text-fg-muted">
            Our hand-picked selection of premium 3D printed accessories and items.
          </p>
        </div>
        <ProductsGrid featuredOnly={true} hideFilters={true} />
      </section>

      {/* Additional Added Sections */}
      <HowItWorks />
      <FAQ />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
