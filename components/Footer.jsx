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
    <footer className="w-full relative overflow-hidden">
      {/* Top border */}
      <div className="h-[1px] w-full bg-primary-500/20" />

      {/* Background */}
      <div className="absolute inset-0 bg-surface-card/60 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              className="flex items-center gap-2.5 mb-5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-sm bg-primary-500/15" />
                <div className="absolute inset-0 rounded-sm border border-primary-500/30" />
                <span className="text-xl relative z-10">🖨️</span>
              </div>
              <span className="font-black text-xl tracking-tight text-fg">
                Mahashri<span className="text-primary-500">Lab</span>
              </span>
            </motion.div>

            <p className="text-fg-muted max-w-sm leading-relaxed mb-6 text-sm">
              Industrial grade 3D printing for everyone. Upload, customize, and order high-quality parts in seconds.
            </p>

            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-accent-500/30 bg-accent-500/10 text-xs font-bold text-accent-500">
              <motion.span
                className="w-2 h-2 rounded-sm bg-accent-500"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              All Systems Operational
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-fg font-black mb-5 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Careers', path: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className="text-fg-subtle hover:text-primary-500 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-primary-500 transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
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
                    className="text-fg-subtle hover:text-primary-500 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-primary-500 transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-fg-subtle text-sm">
            © {new Date().getFullYear()} MahashriLab. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-fg-subtle text-sm">Made with precision in India</span>
            <span className="text-lg">🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
