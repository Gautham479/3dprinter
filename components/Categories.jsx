"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Categories() {
  const categories = [
    {
      title: "Idols",
      desc: "Collectible idols and premium figurines",
      borderColor: "border-surface-border",
      bgColor: "bg-surface-card",
    },
    {
      title: "Action Figures",
      desc: "Dynamic heroes and articulated models",
      borderColor: "border-surface-border",
      bgColor: "bg-surface-card",
    },
    {
      title: "Daily Accessories",
      desc: "Everyday lifestyle essentials and gadgets",
      borderColor: "border-surface-border",
      bgColor: "bg-surface-card",
    },
    {
      title: "Playables",
      desc: "Interactive toys and engaging models",
      borderColor: "border-surface-border",
      bgColor: "bg-surface-card",
    },
  ];

  return (
    <section className="w-full py-20 bg-surface-bg border-b border-surface-border font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center w-full"
        >
          <h2 className="text-3xl md:text-4xl font-black text-fg tracking-tight mb-2">Our Collections</h2>
          <p className="text-fg-subtle text-lg">Find exactly what you're looking for</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`group flex flex-col items-center justify-center text-center p-10 rounded-xl border ${cat.borderColor} ${cat.bgColor} transition-colors duration-200 hover:bg-surface-muted min-h-[200px]`}
              >
                <h3 className="text-2xl font-bold tracking-tight text-fg mb-3 uppercase">
                  {cat.title}
                </h3>
                <p className="text-sm md:text-base font-medium text-fg-muted max-w-[80%]">
                  {cat.desc}
                </p>
              </motion.div>
            );

            return cat.link ? (
              <Link key={i} href={cat.link} className="block w-full focus:outline-none">
                {CardContent}
              </Link>
            ) : (
              <div key={i} className="block w-full focus:outline-none">
                {CardContent}
              </div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/products" className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg py-3 px-10 rounded-sm transition-colors duration-200">
            Explore All Products
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
