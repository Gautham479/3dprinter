"use client";

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, Zap, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';

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

export default function HowItWorks() {
  const steps = [
    { icon: <UploadCloud className="w-6 h-6" />, number: "01", title: "Upload & Configure", desc: "Drop your STL or OBJ file, then pick material, color, and strength settings." },
    { icon: <Zap className="w-6 h-6" />,         number: "02", title: "Instant Quote",      desc: "Receive a precise, AI-calculated price for your configured parts instantly." },
    { icon: <CheckCircle className="w-6 h-6" />, number: "03", title: "Precision Crafting", desc: "We print with engineering-grade accuracy and run strict quality control." },
    { icon: <Package className="w-6 h-6" />,     number: "04", title: "Fast Delivery",      desc: "Your finished parts ship directly to your door, packed securely." },
  ];

  return (
    <section id="how-it-works" className="w-full border-b border-surface-border">

      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-10 border-b border-surface-border">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">Process</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} direction="left">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-fg tracking-tight">How It Works</h2>
        </Reveal>
        <div className="hidden md:block w-32" />
      </div>

      {/* Steps row — each takes equal width, bordered */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="group relative px-8 py-12 border-b sm:border-b-0 border-r border-surface-border last:border-r-0 flex flex-col gap-6 hover:bg-surface-muted transition-colors duration-300 cursor-default">

              {/* Number + icon row */}
              <div className="flex items-start justify-between">
                <span className="font-black text-5xl md:text-6xl leading-none text-surface-border group-hover:text-primary-500 transition-colors duration-400 select-none">
                  {step.number}
                </span>
                <div className="w-10 h-10 border border-surface-border flex items-center justify-center text-fg-muted group-hover:border-primary-500 group-hover:text-primary-500 transition-all duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Line */}
              <div className="h-px bg-surface-border group-hover:bg-primary-500 transition-colors duration-400" />

              {/* Text */}
              <div>
                <h3 className="font-black text-lg text-fg mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-primary-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
