"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const faqs = [
    {
      q: "What file formats do you accept?",
      a: "We currently accept .STL and .OBJ file formats up to 100MB in size. We recommend exporting your files in millimeters (mm) for the best accuracy."
    },
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-5 business days across the country. We also offer expedited shipping options at checkout."
    },
    {
      q: "What materials should I choose?",
      a: "PLA is great for visual prototypes and basic use. PETG provides a balance of strength and durability, ABS offers better temperature resistance, and TPU is best for flexible parts."
    },
    {
      q: "Do you offer post-processing?",
      a: "Currently, we provide standard support removal. Basic sanding and painting options will be introduced in the near future."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="w-full py-24 overflow-hidden relative">
      {/* Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-primary-500/20" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-primary-500/30 bg-primary-500/10 text-sm text-primary-500 font-bold mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Got Questions?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-fg mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-fg-muted">Everything you need to know about our service.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative rounded-sm border overflow-hidden transition-all duration-300 ${openIndex === i
                  ? 'border-primary-500/30 bg-surface-card shadow-md'
                  : 'border-surface-border bg-surface-card/60 hover:border-primary-500/20'
                }`}
            >
              {/* Left accent bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded--sm transition-all duration-300 ${openIndex === i
                  ? 'bg-primary-500'
                  : 'bg-surface-border'
                }`} />

              <button
                className="w-full px-6 py-5 pl-8 text-left flex items-center justify-between focus:outline-none relative"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className={`font-bold text-base pr-4 transition-colors ${openIndex === i ? 'text-primary-500' : 'text-fg'
                  }`}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-sm flex items-center justify-center border transition-all ${openIndex === i
                      ? 'border-primary-500/40 bg-primary-500/10 text-primary-500'
                      : 'border-surface-border text-fg-subtle'
                    }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pl-8 relative">
                      <p className="text-fg-muted leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
