"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
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

const MAT = {
  PLA:  { color: '#C2A56D', label: 'bg-amber-50  text-amber-700  border-amber-200' },
  PETG: { color: '#3B82F6', label: 'bg-blue-50   text-blue-700   border-blue-200' },
  ABS:  { color: '#EF4444', label: 'bg-rose-50   text-rose-700   border-rose-200' },
  TPU:  { color: '#10B981', label: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

export default function Materials() {
  const [active, setActive] = useState(0);

  const materials = [
    {
      key: 'PLA',  name: "PLA",  subtitle: "Basic & Lightweight",
      image: "/images/materials/home-lifestyle.png",
      points: ["Smooth, professional finish", "Ideal for prototypes & display models", "Lightweight and highly accurate", "Most affordable choice"],
    },
    {
      key: 'PETG', name: "PETG", subtitle: "All-Rounder Choice",
      image: "/images/materials/industrial-precision.png",
      points: ["Strong and durable daily use", "Water-resistant, UV & sunlight stable", "Reliable for enclosures & mechanisms", "Best value for functional parts"],
    },
    {
      key: 'ABS',  name: "ABS",  subtitle: "High Strength & Heat Resistant",
      image: "/images/materials/technical-enclosure.png",
      points: ["Tough, impact-resistant build", "Handles high temperatures well", "Heavy-use functional applications", "Ideal for automotive parts"],
    },
    {
      key: 'TPU',  name: "TPU",  subtitle: "Flexible & Shock Absorbing",
      image: "/images/materials/flexible-tpu.png",
      points: ["Rubber-like flexible feel", "Excellent shock & vibration damping", "Perfect for seals, gaskets & bushings", "Ideal for grips, covers & protectors"],
    },
  ];

  const quickGuide = [
    { q: "Outdoor / Sun?",    a: "PETG or ABS", e: "☀️" },
    { q: "High heat?",        a: "ABS",          e: "🔥" },
    { q: "Electrical?",       a: "PETG or ABS", e: "⚡" },
    { q: "Needs flex?",       a: "TPU",          e: "🌀" },
    { q: "Budget / basic?",   a: "PLA",          e: "🏷️" },
  ];

  const cur = materials[active];
  const col = MAT[cur.key];

  return (
    <section id="materials" className="w-full border-b border-surface-border">

      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-10 border-b border-surface-border">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Materials</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} direction="left">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-fg tracking-tight">Materials Guide</h2>
        </Reveal>
        <div className="hidden md:block w-32" />
      </div>

      {/* Tab selectors */}
      <div className="flex border-b border-surface-border">
        {materials.map((m, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex-1 py-5 px-4 text-xs font-black uppercase tracking-[0.16em] border-r border-surface-border last:border-r-0 transition-all duration-200 relative"
            style={{
              background: active === i ? col.color : 'transparent',
              color: active === i ? '#fff' : 'var(--app-fg-muted)',
            }}
          >
            {m.name}
            <span className="block text-[9px] tracking-wider mt-0.5 opacity-70 normal-case font-bold">{m.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Active panel: image left + points right */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 border-b border-surface-border"
      >
        {/* Image */}
        <div className="relative aspect-video md:aspect-auto md:min-h-[360px] bg-surface-muted border-b md:border-b-0 md:border-r border-surface-border overflow-hidden">
          <Image src={cur.image} alt={cur.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          {/* Material badge */}
          <div className="absolute top-6 left-6 px-3 py-1.5 font-black text-xs uppercase tracking-widest text-white"
            style={{ background: col.color }}>
            {cur.name}
          </div>
        </div>

        {/* Points */}
        <div className="px-8 sm:px-12 py-10 flex flex-col justify-center">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: col.color }}>{cur.key} · {cur.subtitle}</p>
          <h3 className="font-black text-2xl sm:text-3xl text-fg tracking-tight mb-8">{cur.name} Material</h3>
          <ul className="space-y-4">
            {cur.points.map((pt, j) => (
              <li key={j} className="flex items-start gap-4">
                <div className="mt-[5px] flex-shrink-0 w-4 h-4 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: col.color }} />
                </div>
                <span className="text-base text-fg-muted leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Quick reference row */}
      <div className="grid grid-cols-1 sm:grid-cols-5">
        {quickGuide.map((item, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="px-6 py-7 border-b sm:border-b-0 border-r border-surface-border last:border-r-0 flex flex-col gap-3 hover:bg-surface-muted transition-colors">
              <span className="text-2xl">{item.e}</span>
              <p className="text-[11px] font-black uppercase tracking-wider text-fg-muted">{item.q}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.a.split(' or ').map(ans => (
                  <span key={ans} className={`px-2 py-0.5 text-[10px] font-black uppercase border ${MAT[ans]?.label || ''}`}>{ans}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
