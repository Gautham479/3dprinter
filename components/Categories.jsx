"use client";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const yInit = direction === 'up' ? 60 : 0;
  const xInit = direction === 'left' ? 80 : direction === 'right' ? -80 : 0;
  return (
    <motion.div ref={ref} initial={{ y: yInit, x: xInit, opacity: 0 }}
      animate={visible ? { y: 0, x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Categories() {
  const categories = [
    { 
      title: "Action Figures", 
      desc: "Collectible action figures, articulated models, and anime-inspired creations.", 
      image: "/photos/action 1.jpeg", 
      link: `/category/${encodeURIComponent('Action Figures')}`, 
      position: "object-top" 
    },
    { 
      title: "Collectibles", 
      desc: "Curated 3D printed display models, detailed statues, and artistic collectibles.", 
      image: "/pics/collectibles.png", 
      link: `/category/${encodeURIComponent('Collectibles')}`, 
      position: "object-center" 
    },
    { 
      title: "Organizers", 
      desc: "Functional desk organizers, key holders, and everyday home accessories.", 
      image: "/photos/daily acc .jpeg", 
      link: `/category/${encodeURIComponent('Organizers')}`, 
      position: "object-center" 
    },
    { 
      title: "Playables", 
      desc: "Interactive Kit Cards and build-it-yourself models designed for creative assembly.", 
      image: "/pics/kit_cards.png", 
      link: `/category/${encodeURIComponent('Playables')}`, 
      position: "object-center" 
    },
  ];

  return (
    <section className="w-full border-b border-surface-border">

      {/* Section header */}
      <div className="flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-10 border-b border-surface-border gap-2">
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Collections</span>
            <div className="h-px w-10 bg-primary-500" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-fg tracking-tight">Our Collections</h2>
        </Reveal>
      </div>

      {/* 2-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((cat, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <Link
              href={cat.link}
              className="group relative block overflow-hidden border-b border-r border-surface-border"
              style={{ height: 'clamp(280px, 35vw, 480px)' }}
            >
              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover ${cat.position} transition-transform duration-700 ease-out group-hover:scale-105`}
                priority={i < 2}
              />

              {/* Thin bottom gradient for text legibility only */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-8 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60 font-medium mb-2">{cat.desc}</p>
                  <h3 className="font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none">
                    {cat.title}
                  </h3>
                </div>
              </div>

              {/* Bottom gold line on hover */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-primary-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </Link>
          </Reveal>
        ))}
      </div>


    </section>
  );
}
