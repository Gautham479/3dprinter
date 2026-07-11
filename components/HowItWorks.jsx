"use client";

import React from 'react';
import { UploadCloud, Zap, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8" />,
      title: "1. Upload and configure",
      desc: "Drop your STL or OBJ files and choose your material, color, and strength.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "2. Instant quote",
      desc: "Get an instant, AI-driven price for your configured parts.",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "3. Crafted with Precision",
      desc: "We print and perform strict quality control to ensure perfection.",
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "4. Fast Delivery",
      desc: "We ship your finished parts directly to your door securely.",
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-20 bg-surface-bg border-b border-surface-border">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-fg mb-4">How It Works</h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            From digital file to physical object in four simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-[2px] bg-surface-border z-0">
            {/* Progress line */}
            <motion.div 
              className="h-full bg-primary-500 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            {/* Flowing particle */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_8px_#C2A56D]"
              animate={{ 
                left: ["0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.7
              }}
            />
          </div>

          {/* Connecting Line (Mobile) */}
          <div className="md:hidden absolute left-1/2 -translate-x-1/2 top-10 bottom-24 w-[2px] bg-surface-border z-0">
            {/* Progress line */}
            <motion.div 
              className="w-full bg-primary-500 rounded-full origin-top h-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            {/* Flowing particle */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_8px_#C2A56D]"
              animate={{ 
                top: ["0%", "100%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1.7
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative z-10 w-20 h-20 bg-surface-card border border-surface-border flex items-center justify-center rounded-full mb-6 text-primary-600 shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-fg mb-3">{step.title}</h3>
                <p className="text-fg-muted leading-relaxed text-sm max-w-[200px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
