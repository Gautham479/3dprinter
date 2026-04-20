"use client";

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, Rocket, Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useStore } from '../store/useStore';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCT_TYPES } from '../lib/catalog';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('quote');
  const [scrolled, setScrolled] = useState(false);
  const cart = useStore((state) => state.cart);
  const openCart = useStore((state) => state.openCart);
  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const logoClicksRef = useRef(0);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.altKey && e.code === 'KeyA') {
        e.preventDefault();
        router.push('/admin/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['quote', 'materials', 'how-it-works', 'faq'];
      let current = 'quote';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push(`/?section=${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const goToHome = () => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      router.push('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    logoClicksRef.current += 1;
    if (logoClicksRef.current >= 7) {
      router.push('/admin/login');
      logoClicksRef.current = 0;
    }
    
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      logoClicksRef.current = 0;
    }, 2000); // Reset clicks after 2 seconds

    goToHome();
  };

  const handleSearchChange = (event) => {
    const nextQuery = event.target.value;
    setSearchQuery(nextQuery);
    if (pathname !== '/') {
      router.push('/?section=content');
      return;
    }
    const contentSection = document.getElementById('content');
    if (contentSection) {
      const y = contentSection.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Custom Print', path: '/custom', id: 'custom' },
    { id: 'materials', label: 'About Material' },
    { id: 'how-it-works', label: 'How It Works' },
    { label: 'Contact', path: '/contact', id: 'contact' },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-surface-bg/85 backdrop-blur-xl border-b border-surface-border/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
        }`}
    >
      {/* Top accent line */}
      <div className="h-[1px] w-full bg-primary-500/20" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={handleLogoClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="relative flex items-center justify-center p-1">
                {/* Custom 3D Printer Logo */}
                <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" className="w-9 h-9 text-primary-500">
                  {/* Bed Plate */}
                  <rect x="48" y="416" width="416" height="48" rx="24" />
                  
                  {/* Letter 3 */}
                  <path d="M120 200 A 50 50 0 0 1 160 260 A 50 50 0 0 1 120 320" />
                  <path d="M100 200 H160" />
                  
                  {/* Letter D */}
                  <path d="M256 200 v120" />
                  <path d="M256 200 C360 200 360 320 256 320" />
                  
                  {/* Printer Rail and Extruder */}
                  <path d="M80 80 h350" />
                  <rect x="200" y="48" width="112" height="64" rx="12" />
                  <path d="M256 112 v40 L 256 200" strokeDasharray="16 16" />
                </svg>
              </div>
              <span className="font-black text-xl tracking-tight text-fg">
                Mahashri<span className="text-primary-500">Lab</span>
              </span>
            </motion.div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-1 text-sm font-semibold">
              <div
                className="relative group/dropdown"
                onMouseEnter={() => setScrolled(window.scrollY > 20)}
              >
                <button
                  onClick={() => router.push('/products')}
                  className="relative px-4 py-2 rounded-sm transition-all duration-200 text-fg-muted hover:text-fg hover:bg-surface-muted/50 flex items-center gap-1.5"
                >
                  <span className="relative z-10">Products</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/dropdown:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-0 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:-mt-0 pt-2 transition-all duration-200 z-50 min-w-[200px]">
                  <div className="bg-surface-card border border-surface-border/60 rounded-lg shadow-lg overflow-hidden flex flex-col">
                    <button onClick={() => router.push('/products')} className="px-4 py-2.5 text-sm text-left text-primary-500 font-bold hover:bg-surface-muted/60 border-b border-surface-border/30 transition-colors">
                      All Products
                    </button>
                    {PRODUCT_TYPES.map(type => (
                      <button key={type} onClick={() => router.push(`/category/${encodeURIComponent(type)}`)} className="px-4 py-2.5 text-sm text-left text-fg-muted hover:text-fg hover:bg-surface-muted/60 border-b border-surface-border/30 last:border-b-0 transition-colors">
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => link.path ? router.push(link.path) : scrollTo(link.id)}
                  className={`relative px-4 py-2 rounded-sm transition-all duration-200 ${activeSection === link.id
                      ? 'text-primary-500'
                      : 'text-fg-muted hover:text-fg hover:bg-surface-muted/50'
                    }`}
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 rounded-sm bg-primary-500/10 border border-primary-500/20"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              ))}

              {/* Legal Dropdown */}
              <div
                className="relative group/dropdown"
                onMouseEnter={() => setScrolled(window.scrollY > 20)}
              >
                <button
                  className="relative px-4 py-2 rounded-sm transition-all duration-200 text-fg-muted hover:text-fg hover:bg-surface-muted/50 flex items-center gap-1.5"
                >
                  <span className="relative z-10">Legal</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/dropdown:rotate-180" />
                </button>
                <div className="absolute top-full left-0 mt-0 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible group-hover/dropdown:-mt-0 pt-2 transition-all duration-200 z-50 min-w-[200px]">
                  <div className="bg-surface-card border border-surface-border/60 rounded-lg shadow-lg overflow-hidden flex flex-col">
                    {[
                      { label: 'Privacy Policy', path: '/legal/privacy-policy' },
                      { label: 'Terms & Conditions', path: '/legal/terms-conditions' },
                      { label: 'Refund Policy', path: '/legal/refund-policy' },
                      { label: 'Shipping Policy', path: '/legal/shipping-policy' },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className="w-full text-left px-4 py-2.5 text-sm text-fg-muted hover:text-fg hover:bg-surface-muted/60 transition-colors duration-150 border-b border-surface-border/30 last:border-b-0"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 bg-surface-card/60 border border-surface-border rounded-sm px-3 py-2 w-64 hover:border-primary-500/40 focus-within:border-primary-500/60 focus-within:bg-surface-card transition-all">
              <Search className="w-4 h-4 text-fg-subtle flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
                aria-label="Search products"
              />
            </div>

            <ThemeToggle />

            {/* Cart */}
            <motion.button
              className="relative p-2 rounded-sm border border-surface-border/60 bg-surface-card/50 hover:border-primary-500/40 hover:bg-primary-500/5 transition-all"
              onClick={openCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5 text-fg-muted" />
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-primary-500 text-[var(--app-cta-contrast)] text-[10px] font-black w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-sm flex items-center justify-center shadow-md"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}
