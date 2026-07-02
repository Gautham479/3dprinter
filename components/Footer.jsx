"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Footer() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <footer className="w-full relative overflow-hidden bg-surface-card border-t border-surface-border">
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center gap-2.5 mb-5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleNavigation('/')}>
              <div className="relative flex items-center justify-center p-1">
                <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-fg">
                  <rect x="48" y="416" width="416" height="48" rx="24" />
                  <path d="M120 200 A 50 50 0 0 1 160 260 A 50 50 0 0 1 120 320" />
                  <path d="M100 200 H160" />
                  <path d="M256 200 v120" />
                  <path d="M256 200 C360 200 360 320 256 320" />
                  <path d="M80 80 h350" />
                  <rect x="200" y="48" width="112" height="64" rx="12" />
                  <path d="M256 112 v40 L 256 200" strokeDasharray="16 16" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-fg">
                MahashriLab
              </span>
            </div>

            <p className="text-fg-muted max-w-sm leading-relaxed mb-6 text-sm">
              Industrial grade 3D printing for everyone. Upload, customize, and order high-quality parts in seconds.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-surface-border bg-surface-bg/50 text-xs font-bold text-fg-muted">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              All Systems Operational
            </div>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-fg font-black mb-5 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-fg-muted hover:text-fg transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-fg transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-fg font-black mb-5 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3">
              {[
                { label: 'Terms & Conditions', path: '/legal/terms-conditions' },
                { label: 'Privacy Policy', path: '/legal/privacy-policy' },
                { label: 'Refund Policy', path: '/legal/refund-policy' },
                { label: 'Shipping Policy', path: '/legal/shipping-policy' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-fg-muted hover:text-fg transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-fg transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-surface-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-fg-muted text-sm">
            © {new Date().getFullYear()} MahashriLab. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-fg-muted text-sm">Made with precision in India</span>
            <span className="text-lg">🇮🇳</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
