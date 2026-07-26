"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, Package, Star, Zap, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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
  const items = [
    'STL Upload', 'OBJ Upload', 'PLA', 'PETG', 'ABS', 'TPU',
    'Same-Day Quote', 'Precision Prints', 'ISO Certified', '99.9% Success',
    'Pan-India Delivery', 'Custom Orders', 'Engineering Grade',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="w-full overflow-hidden border-t border-b border-surface-border py-3.5 bg-surface-bg">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-7 text-[10px] font-black uppercase tracking-[0.22em] text-fg-muted whitespace-nowrap">
            {item}
            <span className="w-1 h-1 rounded-full bg-primary-500 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stat pill ── */
function StatPill({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 border border-surface-border bg-surface-card/60">
      <Icon className="w-4 h-4 text-primary-500 flex-shrink-0" />
      <div>
        <div className="text-base font-black text-fg leading-none">{value}</div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-fg-muted mt-0.5">{label}</div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [config, setConfig] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch('/api/config')
      .then(async r => {
        if (!r.ok) { console.error('API returned error:', r.status); return null; }
        return r.json();
      })
      .then(d => setConfig(d))
      .catch(console.error);
  }, []);

  const heading = config?.heroHeading || 'Industrial Grade 3D Printing, Simplified.';
  const subheading = config?.heroSubheading || 'Upload your 3D model. Choose material. We craft and deliver precision parts with engineering-grade accuracy — every single time.';

  return (
    <div ref={containerRef} className="w-full">

      {/* ── Text content panel (placed at top of homepage) ── */}
      <section className="relative w-full flex flex-col bg-surface-bg pt-20">

        {/* Top strip */}
        <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 pt-6 pb-0">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-fg-muted">
            MahashriLab © 2026
          </span>
          <div className="flex items-center gap-2 text-[11px] font-bold text-fg-muted uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
            ISO Certified · 99.9% Success
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-10 pb-0">

          {/* Overline */}
          <Reveal delay={0} className="mb-4">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-primary-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">
                Premium 3D Printing Service
              </span>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.08}>
            <h1 className="font-black leading-[1.05] tracking-[-0.03em] text-fg pt-2"
              style={{ fontSize: 'clamp(44px, 6vw, 90px)' }}>
              {heading}
            </h1>
          </Reveal>

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

          {/* Stats row */}
          <Reveal delay={0.4} className="mt-10 mb-10">
            <div className="flex flex-wrap gap-3">
              <StatPill icon={Package} value="500+"  label="Products Delivered" />
              <StatPill icon={Star}    value="4.9★"  label="Customer Rating" />
              <StatPill icon={Zap}     value="24hr"  label="Quote Turnaround" />
              <StatPill icon={Clock}   value="3-7d"  label="Pan-India Shipping" />
            </div>
          </Reveal>
        </div>

        {/* Ticker at the very bottom */}
        <Ticker />
      </section>

    </div>
  );
}
