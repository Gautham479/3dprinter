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
