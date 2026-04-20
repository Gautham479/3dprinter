"use client";

import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Image from 'next/image';

export default function MaterialsPage() {
  const [activeCard, setActiveCard] = useState(null);

  const materials = [
    {
      name: "PLA (Basic & Lightweight)",
      image: "/images/materials/home-lifestyle.png",
      color: "bg-red-500/10",
      borderColor: "border-red-500/40",
      accentColor: "text-red-500",
      points: [
        { content: <><strong className="text-fg">Smooth finish</strong> with a clean look</>, type: "normal" },
        { content: <>Great for <strong className="text-fg">prototypes</strong>, models, and display items</>, type: "normal" },
        { content: <>Lightweight and <strong className="text-fg">accurate prints</strong></>, type: "normal" },
        { content: <>Affordable and an easy choice for <strong className="text-fg">basic needs</strong></>, type: "tip" }
      ]
    },
    {
      name: "PETG (All-Rounder Choice)",
      image: "/images/materials/technical-enclosure.png",
      color: "bg-accent-500/10",
      borderColor: "border-accent-500/25",
      accentColor: "text-accent-500",
      points: [
        { content: <>Strong and <strong className="text-fg">durable</strong> for everyday use</>, type: "normal" },
        { content: <><strong className="text-fg">Water-resistant</strong> and long-lasting</>, type: "positive" },
        { content: <>Handles <strong className="text-fg">outdoor conditions</strong> and sunlight</>, type: "positive" },
        { content: <>Reliable for <strong className="text-fg">functional parts</strong> and enclosures</>, type: "tip" }
      ]
    },
    {
      name: "ABS (High Strength & Heat Resistant)",
      image: "/images/materials/industrial-precision.png",
      color: "bg-amber-600/10",
      borderColor: "border-amber-600/25",
      accentColor: "text-amber-600",
      points: [
        { content: <>Tough and <strong className="text-fg">impact-resistant</strong></>, type: "positive" },
        { content: <>Handles <strong className="text-fg">high temperatures</strong></>, type: "positive" },
        { content: <>Suitable for <strong className="text-fg">heavy-use</strong> parts</>, type: "normal" },
        { content: <>Ideal for <strong className="text-fg">automotive</strong> and practical applications</>, type: "tip" }
      ]
    },
    {
      name: "TPU (Flexible & Shock Absorbing)",
      image: "/images/materials/flexible-tpu.png",
      color: "bg-rose-500/10",
      borderColor: "border-rose-400/25",
      accentColor: "text-rose-500",
      points: [
        { content: <>Flexible with a <strong className="text-fg">rubber-like</strong> feel</>, type: "normal" },
        { content: <>Absorbs <strong className="text-fg">shock</strong> and vibration</>, type: "positive" },
        { content: <>Ideal for <strong className="text-fg">seals</strong>, gaskets, bushings, and similar parts</>, type: "normal" },
        { content: <>Great for <strong className="text-fg">grips</strong>, covers, and protective parts</>, type: "tip" }
      ]
    }
  ];

  const quickGuide = [
    { question: "Outdoor / Sun use?", answer: "PETG or ABS" },
    { question: "High heat?", answer: "ABS" },
    { question: "Electrical use?", answer: "PETG or ABS" },
    { question: "Flexible part?", answer: "TPU" },
    { question: "Budget / basic use?", answer: "PLA" }
  ];

  const getBullet = (type) => {
    const base = "mt-1.5 flex-shrink-0 leading-none";
    return (
      <span className={`${base} text-[10px] text-white/35`} aria-hidden="true">
        ⬢
      </span>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-6 min-h-[60vh] overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-primary-500/30 bg-primary-500/10 text-sm text-primary-500 font-bold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Material Science
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-fg mb-4">
            Materials Guide
          </h1>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Select the right material for your project based on your specific needs. Experience the difference in quality and durability.
          </p>
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {materials.map((material, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setActiveCard(i)}
              onHoverEnd={() => setActiveCard(null)}
              className={`relative rounded-sm border ${material.borderColor} bg-surface-card/80 p-0 flex flex-col md:flex-row cursor-default overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-500/30 group`}
            >
              <div className={`absolute inset-0 ${material.color} opacity-0 transition-opacity duration-300 ${activeCard === i ? 'opacity-100' : ''}`} />
              
              {/* Material Image */}
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative bg-surface-muted overflow-hidden">
                <Image 
                  src={material.image} 
                  alt={material.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              {/* Material Details */}
              <div className="md:w-3/5 p-7 relative">
                <h3 className="text-xl font-black text-fg mb-5 flex items-center gap-3">
                  <span>{material.name}</span>
                </h3>
                <ul className="space-y-3">
                  {material.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="flex gap-3 items-start"
                    >
                      {getBullet(point.type)}
                      <span className={`text-fg-muted leading-relaxed text-sm ${point.type === 'negative' ? 'opacity-60' : ''} ${point.type === 'tip' ? 'font-semibold text-fg' : ''}`}>
                        {point.content ?? point.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-sm border border-surface-border bg-surface-card/80 p-8 overflow-hidden"
        >
          <h3 className="text-2xl font-black text-fg mb-6 flex items-center gap-2 relative">
            <span>Quick Reference Guide</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {quickGuide.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + i * 0.07 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-surface-muted/60 p-5 rounded-sm border border-surface-border hover:border-primary-500/40 transition-all cursor-default group"
              >
                <p className="text-sm font-bold text-fg mb-2 group-hover:text-primary-500 transition-colors uppercase tracking-wider">{item.question}</p>
                <div className="h-0.5 w-10 bg-surface-border mb-3 group-hover:bg-primary-500/40 transition-colors" />
                <p className="text-primary-500 font-black text-lg">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
