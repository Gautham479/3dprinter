"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RefreshCcw, ShieldCheck } from 'lucide-react';

function Printer3DCard() {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative w-full max-w-md mx-auto cursor-pointer"
    >
      {/* Warm shadow behind card */}
      <div className="absolute inset-4 rounded-3xl bg-primary-500/15 blur-2xl pointer-events-none" />

      {/* Main card */}
      <div className="relative rounded-3xl overflow-hidden border border-surface-border bg-surface-card shadow-xl"
        style={{ transform: 'translateZ(0px)' }}
      >
        {/* Status badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-bg/90 border border-surface-border text-xs font-bold text-accent-500">
          <motion.span
            className="w-2 h-2 rounded-full bg-accent-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          ONLINE
        </div>

        {/* Image */}
        <div className="aspect-[4/5] flex items-center justify-center p-8 bg-gradient-to-b from-surface-muted/50 to-surface-card">
          <motion.img
            src="/printer.png"
            alt="Bambu P2S 3D Printer"
            className="w-full h-full object-contain drop-shadow-lg"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x500/5c4a42/c9955b?text=Bambu+P2S";
            }}
          />
        </div>

        {/* Bottom stats bar */}
        <div className="px-6 py-4 border-t border-surface-border bg-surface-muted/40 grid grid-cols-3 gap-4">
          {[
            { label: 'Layer', value: '0.2mm' },
            { label: 'Speed', value: '500mm/s' },
            { label: 'Temp', value: '220°C' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-[10px] text-fg-subtle uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-sm font-black text-primary-500 mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div className="relative py-8 sm:py-12 w-full overflow-hidden">
      {/* Soft warm background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-sm text-primary-600 font-bold mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-accent-500"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Fast & Easy Online 3D Printing Service
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl font-black text-fg tracking-tight leading-[1.05] mb-6">
            Bambu P2S{' '}
            <span className="gradient-text block">3D Printing Service</span>
          </h1>

          <p className="text-lg sm:text-xl text-fg-muted mb-10 max-w-xl leading-relaxed">
            Get an instant price in 30 seconds. Upload your STL file, pick material, and order online. No signup needed.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            {[
              { icon: <RefreshCcw className="w-4 h-4" />, text: 'Free Reprint If We Make a Mistake' },
              { icon: <ShieldCheck className="w-4 h-4" />, text: 'QC Checked Before Shipping' },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 text-fg-muted border border-surface-border px-5 py-2.5 rounded-full bg-surface-card/80 hover:text-primary-500 hover:border-primary-500/40 transition-all cursor-default"
              >
                <span className="text-primary-500">{badge.icon}</span>
                {badge.text}
              </motion.div>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-8 mt-10 pt-8 border-t border-surface-border/60"
          >
            {[
              { value: '1000+', label: 'Models Printed' },
              { value: '4', label: 'Materials' },
              { value: '30s', label: 'Instant Quote' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black gradient-text">{stat.value}</p>
                <p className="text-xs text-fg-subtle font-semibold mt-0.5 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: 3D Printer Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <Printer3DCard />
        </motion.div>
      </div>
    </div>
  );
}
