"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Categories() {
  const categories = [
    {
      title: "Idols",
      desc: "Collectible idols and premium figurines",
      image: "https://loremflickr.com/600/400/lordshiva,statue",
      objectPosition: "object-top",
      borderColor: "border-yellow-400",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-yellow-500",
      isCTA: false,
    },
    {
      title: "Action Figures",
      desc: "Dynamic heroes and articulated models",
      image: "https://loremflickr.com/600/400/actionfigure",
      objectPosition: "object-top",
      borderColor: "border-red-500",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-red-500",
      isCTA: false,
    },
    {
      title: "Daily Accessories",
      desc: "Everyday lifestyle essentials and gadgets",
      image: "https://loremflickr.com/600/400/watch,gadget",
      borderColor: "border-orange-400",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-orange-500",
      isCTA: false,
    },
    {
      title: "Multicolor Printing Capabilities",
      desc: "Vibrant, high-quality multi-material prints",
      image: "https://loremflickr.com/600/400/3dprinting,colorful",
      borderColor: "border-purple-500",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-purple-500",
      isCTA: false,
    },
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
          {categories.map((cat, i) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 ${cat.link ? 'cursor-pointer' : ''} border ${cat.borderColor} ${cat.bgColor} ${cat.hoverBg} ${cat.isCTA ? 'hover:-translate-y-1' : ''}`}
              >
                <div className="p-8 md:py-10 md:px-12 flex flex-col justify-center min-h-[180px] md:min-h-[220px]">
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="w-full md:w-2/3">
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
                  
                  {/* Background Image */}
                  {!cat.isCTA && cat.image && (
                    <div className="absolute right-0 top-0 bottom-0 w-2/3 md:w-[60%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_25%)] transition-all duration-700 -z-0">
                      <img 
                        src={cat.image} 
                        alt={cat.title}
                        className={`w-full h-full object-cover ${cat.objectPosition || 'object-center'} transition-all duration-700 group-hover:scale-125 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0`} 
                      />
                    </div>
                  )}
                </div>
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 md:mt-14 flex justify-center"
        >
          <Link href="/products" className="inline-flex items-center justify-center bg-accent-600 hover:bg-accent-500 text-white font-bold text-lg py-4 px-10 md:py-5 md:px-14 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-accent-500 group focus:outline-none">
            EXPLORE ALL PRODUCTS
            <ArrowRight className="w-6 h-6 ml-3 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
