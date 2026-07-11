"use client";

import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Categories() {
  const categories = [
    {
      title: "Idols",
      desc: "Collectible idols and premium figurines",
      image: "/photos/idols.jpeg",
      link: "/category/idols",
      position: "object-center",
    },
    {
      title: "Action Figures",
      desc: "Dynamic heroes and articulated models",
      image: "/photos/action 1.jpeg",
      link: "/category/action figures",
      position: "object-top",
    },
    {
      title: "Daily Accessories",
      desc: "Everyday lifestyle essentials and gadgets",
      image: "/photos/daily acc .jpeg",
      link: "/category/daily accessories",
      position: "object-center",
    },
    {
      title: "Playables",
      desc: "Interactive toys and engaging models",
      image: "/photos/playables.jpeg",
      link: "/category/playables",
      position: "object-bottom",
    },
  ];

  return (
    <section className="w-full py-20 bg-surface-bg border-b border-surface-border font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center w-full"
        >
          <h2 className="text-3xl md:text-4xl font-black text-fg tracking-tight mb-2 uppercase">Our Collections</h2>
          <p className="text-fg-subtle text-lg font-medium">Find exactly what you're looking for</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, i) => {
            return (
              <Link 
                key={i} 
                href={cat.link} 
                className="group block relative w-full h-[280px] sm:h-[320px] rounded-xl overflow-hidden border border-surface-border shadow-md focus:outline-none"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-surface-muted">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${cat.position} w-full h-full transition-transform duration-500 group-hover:scale-105`}
                    priority={i < 2}
                  />
                </div>

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20 group-hover:from-black/90 group-hover:via-black/55 group-hover:to-black/25 transition-all duration-300" />

                {/* Card Content */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-8 select-none">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-wider text-white mb-2 uppercase drop-shadow-md">
                    {cat.title}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-white/80 max-w-[85%] mb-4 drop-shadow-sm">
                    {cat.desc}
                  </p>
                  
                  {/* Hover CTA Indicator */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary-500 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore Collection
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-bold text-base py-3.5 px-10 rounded-sm shadow-md transition-colors duration-200"
          >
            Explore All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
