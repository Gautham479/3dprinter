"use client";

import { useEffect, useRef, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function NavigationLoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const completeTimer = useRef(null);
  const progressTimer1 = useRef(null);
  const progressTimer2 = useRef(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  // When route actually changes, finish the bar
  useEffect(() => {
    const current = pathname + searchParams.toString();
    if (current !== prevPathRef.current) {
      prevPathRef.current = current;
      setWidth(100);
      completeTimer.current = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 350);
    }
    return () => clearTimeout(completeTimer.current);
  }, [pathname, searchParams]);

  // Listen for navigation intent (anchor clicks)
  useEffect(() => {
    const handleClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.startsWith('http') && !href.startsWith(window.location.origin)) return;
      if (anchor.getAttribute('target') === '_blank') return;

      // Same-page navigation? skip
      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      // Start the progress bar
      clearTimeout(progressTimer1.current);
      clearTimeout(progressTimer2.current);
      setVisible(true);
      setWidth(15);
      progressTimer1.current = setTimeout(() => setWidth(50), 200);
      progressTimer2.current = setTimeout(() => setWidth(75), 700);
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      clearTimeout(progressTimer1.current);
      clearTimeout(progressTimer2.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nav-loader"
          className="fixed top-0 left-0 z-[99999] h-[2px] pointer-events-none"
          style={{
            background: 'var(--app-primary-500)',
            width: `${width}%`,
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 8px var(--app-primary-500)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  );
}

export default function NavigationLoader() {
  return (
    <Suspense fallback={null}>
      <NavigationLoaderInner />
    </Suspense>
  );
}
