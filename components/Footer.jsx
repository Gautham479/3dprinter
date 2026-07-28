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
            <h4 className="text-fg font-black mb-3 text-sm uppercase tracking-widest">ABOUT US</h4>
            <p className="text-fg-muted max-w-md leading-relaxed mb-6 text-sm">
              At MahashriLab, we craft unique and functional products using cutting-edge 3D printing technology. From stylish organizers to clever puzzles and fun gadgets, our creations are where art meets purpose.
            </p>

            {/* Contact details */}
            <div className="space-y-2 mb-6 text-sm text-fg-muted">
              <div className="flex items-center gap-2">
                <span className="text-primary-500">📞</span>
                <span>+91 6364205864</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-500">✉️</span>
                <span>Contact@mahashrilab.in</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-500">📍</span>
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>

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
