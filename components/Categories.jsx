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
      images: ["/photos/idols.jpeg"],
      objectPosition: "object-center",
      objectFit: "object-contain",
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
      images: [
        "/photos/action 1.jpeg",
        "/photos/action 2.jpeg",
        "/photos/action 3.jpeg",
        "/photos/action 4.jpeg"
      ],
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
      images: [
        "/photos/daily acc .jpeg",
        "/photos/daily acc 1.jpeg",
        "/photos/daily acc 2.jpeg"
      ],
      borderColor: "border-orange-400",
      bgColor: "bg-black",
      hoverBg: "hover:bg-zinc-900",
      textColor: "text-white",
      accent: "text-orange-500",
      isCTA: false,
    },
    {
      title: "Playables",
      desc: "Interactive toys and engaging models",
      images: [
        "/photos/playables.jpeg",
        "/photos/playables 1.jpeg",
        "/photos/playables 3.jpeg"
      ],
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
          className="mb-14 text-center w-full px-2 md:px-4"
        >
          <div className="inline-block mb-8 w-full">
            <span className="text-primary-500 font-black tracking-widest text-[clamp(6px,2.2vw,16px)] uppercase drop-shadow-lg whitespace-nowrap">
              India’s First E-Commerce Store for Multi Colour 3D Printed Products with Custom Printing Options
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight flex justify-center">Our Collections</h2>
          <p className="text-zinc-400 mt-2 flex justify-center">Find exactly what you're looking for</p>
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
                  {!cat.isCTA && cat.images && (
                    <div className="absolute right-0 top-0 bottom-0 w-2/3 md:w-[60%] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_25%)] transition-all duration-700 -z-0">
                      {cat.images.length === 1 ? (
                        <img 
                          src={cat.images[0]} 
                          alt={cat.title}
                          className={`w-full h-full ${cat.objectFit || 'object-cover'} ${cat.objectPosition || 'object-center'} transition-all duration-700 group-hover:scale-125 opacity-80 group-hover:opacity-100`} 
                        />
                      ) : (
                        <div className={`w-full h-full grid gap-1 ${cat.images.length >= 3 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2'}`}>
                          {cat.images.map((img, idx) => (
                            <div key={idx} className={`relative overflow-hidden ${cat.images.length === 3 && idx === 0 ? 'row-span-2' : ''}`}>
                              <img 
                                src={img} 
                                alt={`${cat.title} ${idx}`}
                                className={`absolute inset-0 w-full h-full ${cat.objectFit || 'object-cover'} ${cat.objectPosition || 'object-center'} transition-all duration-700 group-hover:scale-125 opacity-80 group-hover:opacity-100`} 
                              />
                            </div>
                          ))}
                        </div>
                      )}
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
