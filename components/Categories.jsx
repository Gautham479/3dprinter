"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Zap, Watch, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Categories() {
  const categories = [
    {
      title: "Idols",
      desc: "Collectible idols and premium figurines",
      icon: <Crown />,
      borderColor: "border-yellow-400",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-yellow-500",
      isCTA: false,
      link: "/category/Idols",
    },
    {
      title: "Action Figures",
      desc: "Dynamic heroes and articulated models",
      icon: <Zap />,
      borderColor: "border-red-500",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-red-500",
      isCTA: false,
      link: "/category/Action%20Figures",
    },
    {
      title: "Daily Accessories",
      desc: "Everyday lifestyle essentials and gadgets",
      icon: <Watch />,
      borderColor: "border-orange-400",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-orange-500",
      isCTA: false,
      link: "/category/Daily%20Accessories",
    },
    {
      title: "Explore All Products",
      desc: "Discover our full catalog of 3D printed wonders",
      icon: <ArrowRight className="w-6 h-6 ml-3 inline-block transition-transform group-hover:translate-x-2" />,
      borderColor: "border-accent-500",
      bgColor: "bg-accent-600",
      hoverBg: "hover:bg-accent-500",
      textColor: "text-white",
      accent: "text-white",
      isCTA: true,
      link: "/products",
    }
  ];

  return (
    <section className="w-full py-24 bg-black relative font-sans">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Our Collections</h2>
          <p className="text-zinc-400 mt-2">Find exactly what you're looking for</p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {categories.map((cat, i) => (
            <Link key={i} href={cat.link} className="block w-full focus:outline-none">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border ${cat.borderColor} ${cat.bgColor} ${cat.hoverBg} ${cat.isCTA ? 'hover:-translate-y-1' : ''}`}
              >
                <div className="p-8 md:py-10 md:px-12 flex flex-col justify-center min-h-[140px]">
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="w-full">
                      <h3 className={`text-2xl md:text-3xl ${cat.isCTA ? 'font-bold flex items-center justify-center text-center' : 'font-black'} tracking-tight ${cat.textColor} mb-1 uppercase`}>
                        {cat.title}
                        {cat.isCTA && cat.icon}
                      </h3>
                      {!cat.isCTA && (
                        <p className={`text-sm md:text-base font-medium ${cat.accent} opacity-80`}>
                          {cat.desc}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Background icon silhouette */}
                  {!cat.isCTA && cat.icon && (
                    <div className={`absolute right-4 md:right-16 top-1/2 -translate-y-1/2 ${cat.accent} transition-transform duration-700 group-hover:scale-110 opacity-10 pointer-events-none`}>
                      {React.cloneElement(cat.icon, { className: "w-24 h-24 md:w-32 md:h-32", strokeWidth: 1.5 })}
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
