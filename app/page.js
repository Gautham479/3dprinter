"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import StorefrontGrid from '@/components/StorefrontGrid';
import ProductsGrid from '@/components/ProductsGrid';
import Materials from '@/components/Materials';
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
      


      {/* Cinematic Tagline Banner */}
      <section className="w-full bg-gradient-to-b from-black to-[#030b1c] pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-6 flex justify-center text-center z-10 relative overflow-hidden border-b border-white/5">
        {/* Subtle Light Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[80%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#ff7a00]/10 via-transparent to-transparent pointer-events-none blur-[60px]" />
        
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto relative z-10"
        >
          <h1 className="text-3xl md:text-5xl lg:text-[4rem] font-black tracking-tight leading-tight md:leading-[1.1] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            <span className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">Where Your Ideas </span>
            <span className="text-[#ff7a00] drop-shadow-[0_0_25px_rgba(255,122,0,0.5)]">Become Reality</span>
          </h1>
        </motion.div>
      </section>

      {/* Hero Section */}
      <section id="hero" className="w-full">
        <Hero />
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Amazon-Style Storefront Section */}
      <StorefrontGrid />

      {/* Additional Added Sections */}
      <Materials />
      <HowItWorks />
      <FAQ />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
