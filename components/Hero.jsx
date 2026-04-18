"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, ShieldCheck } from 'lucide-react';
import ScrollGem from './ScrollGem';

export default function Hero() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] border-b border-surface-border overflow-hidden flex items-center justify-center">
      
      {/* Background Huge Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h1 className="text-[12vw] font-black text-surface-border/40 select-none tracking-tighter">
          MAHASHRI
        </h1>
      </div>

      {/* 3D Gem Canvas (absolute background) */}
      <div className="absolute inset-0 z-10">
        <ScrollGem />
      </div>

      {/* Content overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between pointer-events-none">
        
        {/* Left Side Floating Feature */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-[250px] pointer-events-auto"
        >
          <div className="bg-surface-card/80 backdrop-blur-md p-5 rounded-sm border border-surface-border shadow-lg">
            <h3 className="font-black text-fg text-lg mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary-500" />
              Industrial Precision
            </h3>
            <p className="text-sm text-fg-muted leading-relaxed">
              Our printers use absolute precision while delivering powerful accuracy, ensuring 99.9% fault-proof prints.
            </p>
          </div>
        </motion.div>

        {/* Right Side Floating Feature */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="max-w-[250px] pointer-events-auto mt-40 lg:mt-64"
        >
          <div className="bg-surface-card/80 backdrop-blur-md p-5 rounded-sm border border-surface-border shadow-lg">
            <h3 className="font-black text-fg text-lg mb-2 flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-primary-500" />
              Ultra-Clean Finish
            </h3>
            <p className="text-sm text-fg-muted leading-relaxed">
              Experience the highest quality surface resolution with zero layer lines visible on our elite materials.
            </p>
          </div>
        </motion.div>

      </div>
      
      {/* Bottom Call to Action Centered */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-primary-500/30 bg-primary-500/10 text-sm text-primary-600 font-bold mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-sm bg-accent-500" />
          Fast & Easy Online Multicolor 3D Printing
        </motion.div>
        
        <div className="flex gap-4">
           {/* Placeholder for future buttons if needed, currently leaving clean */}
        </div>
      </div>
    </div>
  );
}
