"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Reveal helper ── */
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const yInit = direction === 'up' ? 70 : direction === 'down' ? -70 : 0;
  const xInit = direction === 'left' ? 80 : direction === 'right' ? -80 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ y: yInit, x: xInit, opacity: 0 }}
      animate={visible ? { y: 0, x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Horizontal marquee ticker ── */
function Ticker() {
  const items = ['STL Upload', 'OBJ Upload', 'PLA', 'PETG', 'ABS', 'TPU', 'Same-Day Quote', 'Precision Prints', 'ISO Certified', '99.9% Success'];
  const doubled = [...items, ...items];
  return (
    <div className="w-full overflow-hidden border-t border-b border-surface-border py-4 bg-surface-bg">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-8 text-xs font-black uppercase tracking-[0.2em] text-fg-muted whitespace-nowrap">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [config, setConfig] = useState(null);
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 400], [0, -60]);

  useEffect(() => {
    fetch('/api/config')
      .then(async r => {
        if (!r.ok) {
          console.error('API returned error:', r.status);
          return null;
        }
        return r.json();
      })
      .then(d => setConfig(d))
      .catch(console.error);
  }, []);

  const heading = config?.heroHeading || 'Industrial Grade 3D Printing, Simplified.';
  const subheading = config?.heroSubheading || 'Upload your 3D model. Choose material. We craft and deliver precision parts with engineering-grade accuracy — every single time.';

  return (
    <div ref={containerRef} className="w-full">

      {/* ── HERO PANEL ── full viewport */}
      <section className="relative w-full flex flex-col" style={{ minHeight: '100svh' }}>

        {/* Top strip */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6 pb-0">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-fg-muted">
            MahashriLab © 2025
          </span>
          <div className="flex items-center gap-2 text-[11px] font-bold text-fg-muted uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
            ISO Certified · 99.9% Success
          </div>
        </div>

        {/* Main content — grows to fill */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-10 pb-0">

          {/* Overline */}
          <Reveal delay={0} className="mb-6">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">
                Premium 3D Printing Service
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <motion.div style={{ y: headlineY }}>
            <Reveal delay={0.08}>
              <h1 className="font-black leading-[0.92] tracking-[-0.03em] text-fg"
                style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
                {heading}
              </h1>
            </Reveal>
          </motion.div>

          {/* Divider line */}
          <Reveal delay={0.18} className="mt-10 mb-8">
            <div className="h-px w-full bg-surface-border" />
          </Reveal>

          {/* Bottom row: subtext + CTAs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <Reveal delay={0.24} className="max-w-xl">
              <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-medium">
                {subheading}
              </p>
            </Reveal>

            <Reveal delay={0.32} direction="left" className="flex-shrink-0">
              <div className="flex items-center gap-4">
                <Link href="/custom" className="btn-primary">
                  Get Instant Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/products" className="btn-outline hidden sm:flex">
                  Browse Catalogue
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Spacer */}
          <div className="h-10 md:h-14" />
        </div>

        {/* Ticker at the very bottom of hero */}
        <Ticker />
      </section>

    </div>
  );
}
