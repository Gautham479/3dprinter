"use client";

import React from 'react';
import { UploadCloud, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8" />,
      title: "1. Upload Your Design",
      desc: "Drop your STL or OBJ files into our quoter to get an instant, AI-driven price.",
      color: "bg-accent-500/15",
      iconColor: "text-accent-500",
      number: "01",
      shape: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagon
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "2. Configure & Order",
      desc: "Select your desired material, color, and strength. Add to cart and check out seamlessly.",
      color: "bg-accent-500/15",
      iconColor: "text-accent-500",
      number: "02",
      shape: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)", // Octagon
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "3. Receive Your Parts",
      desc: "We print, perform quality control, and ship your parts directly to your door.",
      color: "bg-amber-600/15",
      iconColor: "text-amber-700",
      number: "03",
      shape: "polygon(50% 0%, 65% 18%, 95% 25%, 82% 50%, 95% 75%, 65% 82%, 50% 100%, 35% 82%, 5% 75%, 18% 50%, 5% 25%, 35% 18%)", // Flower
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-24 overflow-hidden relative">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-accent-500/20" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-fg mb-4">How It Works</h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            From digital file to physical object in just three simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] z-0">
            <div className="w-full h-full bg-surface-border/60" />
            <motion.div
              className="absolute inset-0 bg-primary-500/60"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center text-center relative z-10 group"
            >
              {/* Icon shape */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="relative w-28 h-28 flex items-center justify-center mb-6 bg-surface-muted/40 transition-all hover:bg-surface-muted/60"
                style={{ clipPath: step.shape }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 ${step.color} opacity-40 group-hover:opacity-100 transition-opacity`} />

                <div className={`relative z-10 ${step.iconColor}`}>
                  {step.icon}
                </div>
              </motion.div>

              <h3 className="text-xl font-black text-fg mb-3 group-hover:text-primary-500 transition-colors">{step.title}</h3>
              <p className="text-fg-muted leading-relaxed max-w-xs text-sm">{step.desc}</p>

              {/* Arrow for mobile */}
              {i < steps.length - 1 && (
                <motion.div
                  className="md:hidden mt-6 text-surface-border"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
