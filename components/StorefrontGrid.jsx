"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
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

export default function StorefrontGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setProducts(d); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = products.filter(p => p.isFeatured).map(p => ({
    name: p.name,
    img: p.image || `https://placehold.co/500x500/1A1A1A/C2A56D?text=${encodeURIComponent(p.name)}`,
    linkUrl: `/products/${p.slug}`,
  }));
  const base = featured.length > 0
    ? featured
    : products.slice(0, 10).map(p => ({
      name: p.name,
      img: p.image || `https://placehold.co/500x500/1A1A1A/C2A56D?text=${encodeURIComponent(p.name)}`,
      linkUrl: `/products/${p.slug}`,
    }));

  const shuffle = arr => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; }
    return s;
  };
  const items = shuffle(base);

  const scroll = dir => scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });

  if (loading) {
    return (
      <section className="w-full border-b border-surface-border">
        <div className="flex gap-0">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-1/4 aspect-square bg-surface-muted animate-pulse border-r border-surface-border" />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full border-b border-surface-border">

      {/* Section header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-10 border-b border-surface-border">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Featured</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} direction="left">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-fg tracking-tight">Selected Products</h2>
        </Reveal>
        <Reveal delay={0.15} direction="left" className="hidden md:flex items-center gap-4">
          <button onClick={() => scroll('left')} className="w-10 h-10 border border-surface-border flex items-center justify-center hover:border-fg hover:bg-fg hover:text-surface-bg transition-all" aria-label="Left">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll('right')} className="w-10 h-10 border border-surface-border flex items-center justify-center hover:border-fg hover:bg-fg hover:text-surface-bg transition-all" aria-label="Right">
            <ChevronRight className="w-4 h-4" />
          </button>
        </Reveal>
      </div>

      {/* Scroll strip */}
      <Reveal>
        <div ref={scrollRef} className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex" style={{ width: 'max-content' }}>
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.linkUrl}
                className="group relative flex-shrink-0 border-r border-surface-border last:border-r-0"
                style={{ width: 'clamp(220px, 22vw, 320px)' }}
              >
                {/* Square image */}
                <div className="relative w-full aspect-square overflow-hidden bg-surface-muted">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-400" />
                  {/* Arrow on hover */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowRight className="w-4 h-4 text-white -rotate-45" />
                  </div>
                </div>

                {/* Name bar */}
                <div className="px-4 py-4 border-t border-surface-border flex items-center justify-between">
                  <span className="text-sm font-bold text-fg leading-snug group-hover:text-primary-500 transition-colors">
                    {item.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-fg-muted flex-shrink-0 group-hover:text-primary-500 transition-colors ml-2" />
                </div>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-primary-500 w-0 group-hover:w-full transition-all duration-400 ease-out" />
              </Link>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Mobile arrows + CTA */}
      <div className="flex items-center justify-between px-6 py-5 border-t border-surface-border md:hidden">
        <div className="flex gap-3">
          <button onClick={() => scroll('left')} className="w-9 h-9 border border-surface-border flex items-center justify-center" aria-label="Left">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => scroll('right')} className="w-9 h-9 border border-surface-border flex items-center justify-center" aria-label="Right">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <Link href="/products" className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-fg-muted hover:text-fg transition-colors">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
