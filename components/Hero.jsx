"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="w-full bg-surface-bg border-b border-surface-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center justify-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-6xl font-black text-fg leading-tight tracking-tight mb-6">
            Industrial Grade 3D Printing, <br />
            <span className="text-primary-600">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl text-fg-muted mb-10 leading-relaxed max-w-2xl">
            Get instant quotes and upload your 3D models. We deliver precision parts with absolute accuracy, ensuring fault-proof prints for engineering and design.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link 
              href="/custom" 
              className="px-8 py-3.5 rounded-sm bg-primary-500 hover:bg-primary-600 text-[var(--app-cta-contrast)] font-bold transition-colors shadow-sm hover:shadow"
            >
              Get Instant Quote
            </Link>
            <Link 
              href="/products" 
              className="px-8 py-3.5 rounded-sm bg-transparent border border-fg text-fg hover:bg-surface-muted font-bold transition-colors"
            >
              Browse Catalog
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-fg-subtle font-medium">
            <ShieldCheck className="w-5 h-5 text-primary-500" />
            <span>ISO Certified Quality &bull; 99.9% Success Rate</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
