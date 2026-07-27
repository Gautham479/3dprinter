"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

const NAV = {
  policies: [
    { label: 'Privacy Policy',           path: '/legal/privacy-policy' },
    { label: 'Refund Policy',            path: '/legal/refund-policy' },
    { label: 'Shipping Policy',          path: '/legal/shipping-policy' },
    { label: 'Terms & Conditions',       path: '/legal/terms-conditions' },
    { label: 'Return & Exchange Policy', path: '/legal/refund-policy' },
  ],
  discover: [
    { label: 'About Us',         path: '/about' },
    { label: 'Contact Us',       path: '/contact' },
    { label: 'Home',             path: '/' },
    { label: 'Custom Printing',  path: '/custom' },
  ],
};

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);
const LiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.021 2.25H8.1l4.258 5.627 5.886-5.627zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIALS = [
  { icon: IgIcon, label: 'Instagram', href: 'https://instagram.com' },
  { icon: YtIcon, label: 'YouTube',   href: 'https://youtube.com' },
  { icon: LiIcon, label: 'LinkedIn',  href: 'https://linkedin.com' },
  { icon: XIcon,  label: 'X',         href: 'https://x.com' },
];

export default function Footer() {
  const router = useRouter();
  const go = (path) => router.push(path);

  return (
    <footer className="w-full relative overflow-hidden bg-surface-card border-t border-surface-border">

      {/* ── Main grid ── */}
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-14 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ─ 1. About Us ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            {/* Logo */}
            <div
              className="flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => go('/')}
            >
              <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-fg flex-shrink-0">
                <rect x="48" y="416" width="416" height="48" rx="24" />
                <path d="M120 200 A 50 50 0 0 1 160 260 A 50 50 0 0 1 120 320" />
                <path d="M100 200 H160" />
                <path d="M256 200 v120" />
                <path d="M256 200 C360 200 360 320 256 320" />
                <path d="M80 80 h350" />
                <rect x="200" y="48" width="112" height="64" rx="12" />
                <path d="M256 112 v40 L 256 200" strokeDasharray="16 16" />
              </svg>
              <span className="font-black text-lg tracking-tight text-fg">MahashriLab</span>
            </div>

            <h4 className="text-fg font-black text-xs uppercase tracking-widest mb-3">About Us</h4>
            <p className="text-fg-muted text-sm leading-relaxed mb-5">
              At MahashriLab, we craft unique and functional products using cutting-edge 3D printing technology. From stylish organizers to clever puzzles and fun gadgets — our creations are where art meets purpose.
            </p>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-surface-border bg-surface-bg/50 text-xs font-bold text-fg-muted">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              All Systems Operational
            </div>
          </motion.div>

          {/* ─ 2. Contact Us ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            <h4 className="text-fg font-black text-xs uppercase tracking-widest mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919021285801" className="flex items-start gap-2.5 text-fg-muted hover:text-fg transition-colors text-sm group">
                  <Phone className="w-3.5 h-3.5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>+91-9021285801</span>
                </a>
              </li>
              <li>
                <a href="mailto:Contact@mahashrilab.in" className="flex items-start gap-2.5 text-fg-muted hover:text-fg transition-colors text-sm group">
                  <Mail className="w-3.5 h-3.5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Contact@mahashrilab.in</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-fg-muted text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span>Bengaluru, Karnataka, India</span>
                </div>
              </li>
            </ul>

            {/* Business hours */}
            <div className="mt-6 pt-5 border-t border-surface-border">
              <p className="text-[11px] font-black uppercase tracking-widest text-fg-muted mb-2">Business Hours</p>
              <p className="text-xs text-fg-muted">Mon – Sat: 10:00 AM – 7:00 PM</p>
              <p className="text-xs text-fg-muted">Sun: By appointment only</p>
            </div>
          </motion.div>

          {/* ─ 3. Policies ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <h4 className="text-fg font-black text-xs uppercase tracking-widest mb-5">Policies</h4>
            <ul className="space-y-3">
              {NAV.policies.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => go(item.path)}
                    className="text-fg-muted hover:text-fg transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-primary-500 transition-colors flex-shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ─ 4. Discover & Payments ─ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.17 }}
          >
            <h4 className="text-fg font-black text-xs uppercase tracking-widest mb-5">Discover</h4>
            <ul className="space-y-3 mb-8">
              {NAV.discover.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => go(item.path)}
                    className="text-fg-muted hover:text-fg transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-sm bg-surface-border group-hover:bg-primary-500 transition-colors flex-shrink-0" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Secure Payments via Razorpay */}
            <div className="pt-4 border-t border-surface-border">
              <p className="text-[10px] font-black uppercase tracking-widest text-fg-muted mb-2">Secure Payments</p>
              <div className="flex items-center gap-2 px-3 py-2 border border-surface-border bg-surface-bg/50 rounded-sm text-xs font-bold text-fg">
                <ShieldCheck className="w-4 h-4 text-primary-500 flex-shrink-0" />
                <span>Payments processed securely via Razorpay</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-surface-border" />

        {/* ── Social + bottom bar ── */}
        <div className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-fg-muted">Follow us</p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-surface-border flex items-center justify-center text-fg-muted hover:text-fg hover:border-fg hover:bg-surface-muted transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Center: copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <p className="text-fg-muted text-xs">
              © {new Date().getFullYear()} MahashriLab · All Rights Reserved
            </p>
            <p className="text-fg-muted text-[11px] flex items-center gap-1">
              Made with precision in India <span className="text-sm">🇮🇳</span>
            </p>
          </motion.div>

          {/* Right: language + currency selector (No arrow marks as requested) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1.5 px-3 py-2 border border-surface-border text-xs text-fg font-bold cursor-default">
              <span>🌐</span>
              <span>English</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 border border-surface-border text-xs text-fg font-bold cursor-default">
              <span>🇮🇳</span>
              <span>India | INR ₹</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
