"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
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
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (section) {
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [section]);

  return null;
}

export default function Home() {
  const products = useStore((state) => state.products);

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg w-full relative pt-16">
      <Navbar />
      <CartDrawer />
      <Suspense fallback={null}>
        <ScrollToSection />
      </Suspense>
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Hero Section */}
      <Hero />

      {/* ── SECTION DIVIDER: Hero → Collections ── */}
      <div className="w-full flex flex-col items-center" aria-hidden="true">
        <div className="w-full h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #C2A56D 20%, #C2A56D 80%, transparent 100%)' }} />
        <div className="w-full h-px bg-surface-border" />
      </div>

      {/* Categories Section */}
      <Categories />

      {/* Amazon-Style Storefront Section */}
      <StorefrontGrid />

      {/* ── SECTION DIVIDER: Featured Products → Materials Guide ── */}
      <div className="w-full flex flex-col items-center" aria-hidden="true">
        <div className="w-full h-[3px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #3B82F6 20%, #C2A56D 50%, #3B82F6 80%, transparent 100%)' }} />
        <div className="w-full h-px bg-surface-border" />
      </div>

      {/* Additional Added Sections */}
      <Materials />
      <HowItWorks />
      <FAQ />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
