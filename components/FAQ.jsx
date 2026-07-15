"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const yInit = direction === 'up' ? 60 : 0;
  const xInit = direction === 'left' ? 80 : direction === 'right' ? -80 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ y: yInit, x: xInit, opacity: 0 }}
      animate={visible ? { y: 0, x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "We currently accept .STL and .OBJ file formats up to 100MB in size. We recommend exporting your files in millimeters (mm) for the best accuracy.",
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3–5 business days across the country. We also offer expedited shipping options at checkout.",
    },
    {
      q: "What material should I choose?",
      a: "PLA is great for visual prototypes and basic use. PETG provides a balance of strength and durability, ABS offers better temperature resistance, and TPU is best for flexible parts.",
    },
    {
      q: "Do you offer post-processing?",
      a: "Currently we provide standard support removal. Basic sanding and painting options will be introduced in the near future.",
    },
    {
      q: "How is pricing calculated?",
      a: "Pricing is based on material volume, selected material type, and complexity of the model. Upload your file to get an instant, transparent quote before placing any order.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="w-full border-b border-surface-border">

      {/* Header */}
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-10 border-b border-surface-border">
        <Reveal>
          <div className="flex items-center gap-3">
            <div className="h-px w-10 bg-primary-500" />
            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary-500">FAQ</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} direction="left">
          <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-fg tracking-tight">
            Common Questions
          </h2>
        </Reveal>
        <div className="hidden md:block w-32" />
      </div>

      {/* Two-column layout: big label left + accordion right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr]">

        {/* Left: large decorative text */}
        <Reveal className="hidden lg:flex flex-col justify-between px-10 lg:px-16 py-12 border-r border-surface-border">
          <div>
            <p
              className="font-black leading-none tracking-tighter text-surface-border select-none"
              style={{ fontSize: 'clamp(64px, 7vw, 110px)' }}
              aria-hidden="true"
            >
              FAQ
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-fg-muted leading-relaxed">
              Still have questions? Reach out to us directly and we&apos;ll respond within 24 hours.
            </p>
            <Link
              href="/contact"
              className="btn-outline inline-flex text-xs"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>

        {/* Right: accordion */}
        <div>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.07}>
                <div className="border-b border-surface-border last:border-b-0">
                  <button
                    className="w-full flex items-start justify-between gap-6 px-8 py-7 text-left focus:outline-none group"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    {/* Number + question */}
                    <div className="flex items-start gap-5 min-w-0">
                      <span className="flex-shrink-0 text-xs font-black text-primary-500 mt-1 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={`font-bold text-base sm:text-lg leading-snug transition-colors duration-200 ${isOpen ? 'text-primary-500' : 'text-fg group-hover:text-primary-500'}`}>
                        {faq.q}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 mt-1 w-7 h-7 border border-surface-border flex items-center justify-center transition-all duration-200"
                      style={{ borderColor: isOpen ? '#C2A56D' : undefined, color: isOpen ? '#C2A56D' : 'var(--app-fg-muted)' }}
                    >
                      {isOpen
                        ? <Minus className="w-3.5 h-3.5" />
                        : <Plus className="w-3.5 h-3.5" />
                      }
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 pl-[4.5rem]">
                          {/* Top rule */}
                          <div className="h-px bg-primary-500/30 mb-5" />
                          <p className="text-base text-fg-muted leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Mobile contact CTA */}
      <div className="lg:hidden flex items-center justify-center px-6 py-8 border-t border-surface-border">
        <Link href="/contact" className="btn-outline">
          Still have questions? Contact Us
        </Link>
      </div>
    </section>
  );
}
