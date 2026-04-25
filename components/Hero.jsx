"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let targetTime = 0;
    let currentVideoTime = 0;

    const handleScroll = () => {
      if (!containerRef.current || !videoRef.current) return;

      const container = containerRef.current;
      const video = videoRef.current;
      
      const { top, height } = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrolled = -top;
      const scrollableDistance = height - windowHeight;

      if (scrolled >= 0 && scrolled <= scrollableDistance && video.duration) {
        const progress = scrolled / scrollableDistance;
        targetTime = progress * video.duration;
      } else if (scrolled < 0) {
        targetTime = 0;
      } else if (scrolled > scrollableDistance && video.duration) {
        targetTime = video.duration;
      }

      // Lerp (smooth interpolation) towards target time
      currentVideoTime += (targetTime - currentVideoTime) * 0.1;

      // Update constantly for maximum smoothness
      if (Math.abs(targetTime - currentVideoTime) > 0.001) {
        video.currentTime = currentVideoTime;
      }
    };

    const loop = () => {
      handleScroll();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Use requestAnimationFrame for smoother performance compared to 'scroll' event
    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh]">
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-black">
        
        {/* Background Video */}
        <video
          ref={videoRef}
          src="/hero-video-smooth.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
          muted
          playsInline
          preload="auto"
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-bg via-transparent to-surface-bg/80 z-0 pointer-events-none" />



        {/* Content overlay */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pointer-events-none">
          
          <div className="flex w-full justify-between items-center">
            {/* Left Side Floating Feature */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="max-w-[250px] pointer-events-auto"
            >
              <div className="bg-surface-card/80 backdrop-blur-md p-5 rounded-sm border border-surface-border shadow-lg">
                <h3 className="font-black text-fg text-lg mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary-500" />
                  Industrial Precision
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Our printers use absolute precision while delivering powerful accuracy, ensuring 99.9% fault-proof prints.
                </p>
              </div>
            </motion.div>

            {/* Right Side Floating Feature */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="max-w-[250px] pointer-events-auto mt-40 lg:mt-64"
            >
              <div className="bg-surface-card/80 backdrop-blur-md p-5 rounded-sm border border-surface-border shadow-lg">
                <h3 className="font-black text-fg text-lg mb-2 flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-primary-500" />
                  Ultra-Clean Finish
                </h3>
                <p className="text-sm text-fg-muted leading-relaxed">
                  Experience the highest quality surface resolution with zero layer lines visible on our elite materials.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
        
        {/* Bottom Call to Action Centered */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm border border-primary-500/30 bg-primary-500/10 text-sm text-primary-600 font-bold shadow-lg backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-accent-500" />
            Fast & Easy Online Multicolor 3D Printing
          </motion.div>
          
          <div className="text-xs text-white/50 mt-4 uppercase tracking-widest font-bold animate-pulse">
            Scroll to discover
          </div>
        </div>
      </div>
    </div>
  );
}
