"use client";

import React from 'react';
import { Zap } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Materials() {
  const materials = [
    {
      name: "PLA (Basic & Lightweight)",
      image: "/images/materials/home-lifestyle.png",
      points: [
        { content: <><strong className="text-fg">Smooth finish</strong> with a clean look</>, type: "normal" },
        { content: <>Great for <strong className="text-fg">prototypes</strong>, models, and display items</>, type: "normal" },
        { content: <><strong className="text-fg">Lightweight</strong> and accurate prints</>, type: "normal" },
        { content: <><strong className="text-fg">Affordable</strong> and an easy choice for basic needs</>, type: "tip" }
      ]
    },
    {
      name: "PETG (All-Rounder Choice)",
      image: "/images/materials/industrial-precision.png",
      points: [
        { content: <>Strong and <strong className="text-fg">durable</strong> for everyday use</>, type: "normal" },
        { content: <><strong className="text-fg">Water-resistant</strong> and long-lasting</>, type: "positive" },
        { content: <>Handles <strong className="text-fg">outdoor conditions</strong> and <strong className="text-fg">sunlight</strong></>, type: "positive" },
        { content: <>Reliable for <strong className="text-fg">functional parts</strong> and enclosures</>, type: "tip" }
      ]
    },
    {
      name: "ABS (High Strength & Heat Resistant)",
      image: "/images/materials/technical-enclosure.png",
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
      points: [
        { content: <>Flexible with a <strong className="text-fg">rubber-like</strong> feel</>, type: "normal" },
        { content: <>Absorbs <strong className="text-fg">shock</strong> and vibration</>, type: "positive" },
        { content: <>Ideal for <strong className="text-fg">seals</strong>, <strong className="text-fg">gaskets</strong>, <strong className="text-fg">bushings</strong></>, type: "normal" },
        { content: <>Great for <strong className="text-fg">grips</strong>, <strong className="text-fg">covers</strong>, and protective parts</>, type: "tip" }
      ]
    }
  ];

  const quickGuide = [
    { question: "Outdoor / Sun use?", answer: "PETG or ABS", emoji: "☀️" },
    { question: "High heat?", answer: "ABS", emoji: "🔥" },
    { question: "Electrical use?", answer: "PETG or ABS", emoji: "⚡" },
    { question: "Flexible part?", answer: "TPU", emoji: "🌀" },
    { question: "Budget / basic use?", answer: "PLA", emoji: "🏷️" }
  ];

  const getBullet = () => (
    <span className="mt-1.5 flex-shrink-0 leading-none text-[10px] text-fg-subtle" aria-hidden="true">
      ⬢
    </span>
  );

  return (
    <section id="materials" className="w-full py-20 bg-surface-bg border-b border-surface-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-fg mb-4">
            Materials Guide
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl mx-auto">
            Select the right material for your project based on your specific needs. Experience the difference in quality and durability.
          </p>
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {materials.map((material, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-lg border border-surface-border bg-surface-card shadow-sm flex flex-col md:flex-row overflow-hidden"
            >
              <div className="md:w-2/5 aspect-[4/3] md:aspect-auto relative bg-surface-muted">
                <Image 
                  src={material.image} 
                  alt={material.name} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>

              <div className="md:w-3/5 p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-fg mb-5">
                  {material.name}
                </h3>
                <ul className="space-y-3">
                  {material.points.map((point, j) => (
                    <li key={j} className="flex gap-3 items-start">
                      {getBullet()}
                      <span className="text-fg-muted leading-relaxed text-sm">
                        {point.content}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Guide */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-lg border border-surface-border bg-surface-card shadow-sm p-8"
        >
          <h3 className="text-2xl font-bold text-fg mb-6 text-center lg:text-left">
            Quick Reference Guide
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickGuide.map((item, i) => {
              const themes = [
                {
                  bg: "bg-amber-500/5 dark:bg-amber-500/10",
                  border: "border-amber-500/20 dark:border-amber-500/30",
                  accent: "bg-amber-500",
                },
                {
                  bg: "bg-rose-500/5 dark:bg-rose-500/10",
                  border: "border-rose-500/20 dark:border-rose-500/30",
                  accent: "bg-rose-500",
                },
                {
                  bg: "bg-sky-500/5 dark:bg-sky-500/10",
                  border: "border-sky-500/20 dark:border-sky-500/30",
                  accent: "bg-sky-500",
                },
                {
                  bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
                  border: "border-emerald-500/20 dark:border-emerald-500/30",
                  accent: "bg-emerald-500",
                },
                {
                  bg: "bg-primary-500/5 dark:bg-primary-500/10",
                  border: "border-primary-500/20 dark:border-primary-500/30",
                  accent: "bg-primary-500",
                }
              ];
              
              const theme = themes[i] || themes[4];

              return (
                <div 
                  key={i} 
                  className={`flex flex-col p-5 rounded-sm border ${theme.border} ${theme.bg} relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accent}`} />
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl leading-none">{item.emoji}</span>
                    <p className="text-xs font-black text-fg-muted uppercase tracking-widest leading-normal">{item.question}</p>
                  </div>
                  
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.answer.split(' or ').map((ans) => {
                      let matBadge = "";
                      if (ans === 'PLA') matBadge = "bg-primary-500/10 text-primary-500 border border-primary-500/20 font-black";
                      else if (ans === 'PETG') matBadge = "bg-blue-500/10 text-blue-500 border border-blue-500/20 font-black";
                      else if (ans === 'ABS') matBadge = "bg-rose-500/10 text-rose-500 border border-rose-500/20 font-black";
                      else if (ans === 'TPU') matBadge = "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black";

                      return (
                        <span key={ans} className={`px-2.5 py-1 text-xs rounded-sm ${matBadge}`}>
                          {ans}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
