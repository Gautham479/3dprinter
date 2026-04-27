"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function StorefrontGrid() {
  const cards = [
    {
      title: "Best Sellers in Action Figures",
      type: "grid",
      items: [
        { name: "Sci-Fi Heroes", img: "https://loremflickr.com/400/400/scifi,figure" },
        { name: "Mecha Models", img: "https://loremflickr.com/400/400/mecha,robot" },
        { name: "Anime Idols", img: "https://loremflickr.com/400/400/anime,figure" },
        { name: "Game Bosses", img: "https://loremflickr.com/400/400/monster,miniature" },
      ],
      linkText: "Shop action figures",
      linkUrl: "#"
    },
    {
      title: "Trending Miniatures",
      type: "single",
      img: "https://loremflickr.com/800/800/miniature,tabletop",
      badge: "Best Seller",
      linkText: "Explore tabletop minis",
      linkUrl: "#"
    },
    {
      title: "Up to 60% off Dioramas",
      type: "grid",
      items: [
        { name: "Fantasy Scenery", img: "https://loremflickr.com/400/400/fantasy,scenery" },
        { name: "Cyberpunk City", img: "https://loremflickr.com/400/400/cyberpunk,city" },
        { name: "Ruins Base", img: "https://loremflickr.com/400/400/ruins,diorama" },
        { name: "Display Stands", img: "https://loremflickr.com/400/400/pedestal,display" },
      ],
      linkText: "Shop dioramas & bases",
      linkUrl: "#"
    },
    {
      title: "Premium Resin Busts",
      type: "single",
      img: "https://loremflickr.com/800/800/sculpture,bust",
      badge: "30% OFF",
      linkText: "Discover high-detail busts",
      linkUrl: "#"
    }
  ];

  const collections = [
    { name: "Tabletop RPG", img: "https://loremflickr.com/400/400/dungeonsanddragons" },
    { name: "Sci-Fi Vehicles", img: "https://loremflickr.com/400/400/spaceship,model" },
    { name: "Custom Keycaps", img: "https://loremflickr.com/400/400/keycap" },
    { name: "Cosplay Props", img: "https://loremflickr.com/400/400/cosplay,prop" },
    { name: "Mechanical Parts", img: "https://loremflickr.com/400/400/gears,mechanism" },
    { name: "Articulated Toys", img: "https://loremflickr.com/400/400/actionfigure" },
    { name: "Filament Rolls", img: "https://loremflickr.com/400/400/3dprinting,filament" },
  ];

  return (
    <section className="w-full bg-black py-6 sm:py-8 font-sans">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        
        {/* Amazon-style 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-[#111] border border-zinc-800 rounded-md shadow-sm p-5 flex flex-col h-full hover:border-zinc-700 transition-colors duration-300"
            >
              <h2 className="text-[21px] leading-[27px] font-bold text-white mb-3 tracking-tight">
                {card.title}
              </h2>
              
              <div className="flex-grow flex flex-col justify-center mb-4 relative">
                {card.type === "grid" ? (
                  <div className="grid grid-cols-2 gap-3 h-[280px]">
                    {card.items.map((item, i) => (
                      <div key={i} className="flex flex-col h-full group cursor-pointer">
                        <div className="relative w-full h-full overflow-hidden bg-zinc-900 rounded-sm flex-grow">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                        </div>
                        <span className="text-[12px] text-zinc-300 mt-1 line-clamp-1">{item.name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative w-full h-[280px] overflow-hidden rounded-sm group cursor-pointer bg-zinc-900">
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    {card.badge && (
                      <div className="absolute top-0 left-0 bg-[#CC0C39] text-white text-[12px] font-bold px-2 py-1 z-10">
                        {card.badge}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="mt-auto pt-2">
                <Link href={card.linkUrl} className="text-[#00A8E1] hover:text-[#FF9900] hover:underline text-[13px] font-medium transition-colors">
                  {card.linkText}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Curated Collections Horizontal Scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#111] border border-zinc-800 rounded-md shadow-sm p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[21px] leading-[27px] font-bold text-white tracking-tight">Curated Collections</h2>
            <Link href="#" className="text-[#00A8E1] hover:text-[#FF9900] hover:underline text-[13px] font-medium hidden sm:block">
              See all collections
            </Link>
          </div>
          
          <div className="relative w-full overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-4 sm:gap-6 min-w-max">
              {collections.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center w-[130px] sm:w-[160px] group cursor-pointer">
                  <div className="w-full aspect-square rounded-md overflow-hidden bg-zinc-900 mb-2 shadow-sm">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <span className="text-[13px] text-zinc-300 font-medium text-center line-clamp-2 leading-snug group-hover:text-[#FF9900] transition-colors">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
