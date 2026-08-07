"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Box, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Target,
  FileCode
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SLIDES = [
  {
    id: 'mahashrilabs',
    isFullImage: true,
    isWhiteBtn: true,
    shopBtn: 'Shop Now',
    shopLink: '/category/Home%20Decor',
    images: [
      { url: '/pics/home_decor_hero_wide.png', label: 'Mahashri Labs - Timeless Design for a Greener Tomorrow' }
    ]
  },
  {
    id: 'collectibles',
    isFullImage: true,
    isWhiteBtn: true,
    shopBtn: 'Shop Now',
    shopLink: '/category/Collectibles',
    images: [
      { url: '/pics/collectibles_banner_wide.jpg', label: 'Crafted for Beautiful Spaces - Mahashri Lab Collectibles' }
    ]
  },
];

export default function HeroSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-gray-50 hero-slider-container">
      

      <div className="relative w-full h-[85vh] min-h-[620px] max-h-[900px]">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, Keyboard, A11y]}
          effect="slide"
          speed={700}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          pagination={{
            clickable: true,
            el: '.custom-swiper-pagination',
            bulletClass: 'inline-block w-3 h-3 rounded-full bg-gray-300 transition-all duration-300 cursor-pointer hover:bg-gray-400',
            bulletActiveClass: '!w-8 !bg-gray-900 !rounded-full',
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {SLIDES.map((slide, index) => {
            const isActive = activeIndex === index;

            if (slide.isFullImage) {
              return (
                <SwiperSlide key={slide.id} className="w-full h-full select-none relative overflow-hidden">
                  {/* ── BLURRED BACKGROUND FILL (prevents empty letterbox bars) ── */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      backgroundImage: `url(${slide.images[0].url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'blur(28px) brightness(0.55) saturate(1.3)',
                      transform: 'scale(1.12)',
                    }}
                    aria-hidden="true"
                  />

                  {/* ── SUBTLE VIGNETTE for button legibility ── */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent z-[1]" aria-hidden="true" />

                  {/* ── MAIN IMAGE — object-contain, full visibility, hover scale ── */}
                  <div className="absolute inset-0 flex items-center justify-center z-[2]">
                    <img
                      src={slide.images[0].url}
                      alt={slide.images[0].label}
                      loading="eager"
                      className="transition-transform duration-[4000ms] ease-out"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        transform: isActive ? 'scale(1.03)' : 'scale(1)',
                      }}
                    />
                  </div>

                  {/* ── BOTTOM-CENTER SHOP NOW BUTTON ── */}
                  <div
                    className="absolute inset-x-0 bottom-0 z-[10] flex justify-center pb-10 sm:pb-14"
                    style={{ animation: isActive ? 'heroFadeIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none' }}
                  >
                    {/* Pulsing halo ring */}
                    <span
                      className="absolute bottom-10 sm:bottom-14 w-44 h-14 rounded-full pointer-events-none"
                      style={{
                        animation: isActive ? (slide.isWhiteBtn ? 'heroWhitePulse 2.4s ease-in-out infinite' : 'heroPulseRing 2.2s cubic-bezier(0.25,0.46,0.45,0.94) infinite') : 'none'
                      }}
                      aria-hidden="true"
                    />

                    <Link
                      href={slide.shopLink}
                      id={`hero-slide-${slide.id}-shop-now`}
                      className="hero-shop-btn group relative overflow-hidden inline-flex items-center gap-3 font-black uppercase rounded-full"
                      style={slide.isWhiteBtn ? {
                        /* ── WHITE BUTTON ── */
                        padding: 'clamp(13px, 1.8vw, 18px) clamp(28px, 4.5vw, 52px)',
                        fontSize: 'clamp(0.72rem, 1.3vw, 0.95rem)',
                        background: 'rgba(255,255,255,0.92)',
                        color: '#1a1a1a',
                        letterSpacing: '0.2em',
                        boxShadow: '0 16px 48px rgba(0,0,0,0.35), 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,1)',
                        border: '1.5px solid rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                      } : {
                        /* ── RED BUTTON ── */
                        padding: 'clamp(13px, 1.8vw, 18px) clamp(28px, 4.5vw, 52px)',
                        fontSize: 'clamp(0.72rem, 1.3vw, 0.95rem)',
                        background: 'linear-gradient(135deg, #ff2244 0%, #e60023 45%, #b8001b 100%)',
                        color: '#ffffff',
                        letterSpacing: '0.2em',
                        boxShadow: '0 20px 60px rgba(230,0,35,0.55), 0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
                        border: '1.5px solid rgba(255,255,255,0.18)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      {/* Shimmer sweep on hover */}
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                        style={{
                          background: slide.isWhiteBtn
                            ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)'
                            : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.28) 50%, transparent 100%)',
                          borderRadius: 'inherit',
                        }}
                        aria-hidden="true"
                      />

                      {/* Sparkle prefix */}
                      <Sparkles
                        className="relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                        style={{
                          width: 'clamp(13px, 1.3vw, 16px)',
                          height: 'clamp(13px, 1.3vw, 16px)',
                          color: slide.isWhiteBtn ? '#b8860b' : '#ffffff',
                        }}
                      />

                      <span className="relative z-10 tracking-[0.22em]">Shop Now</span>

                      {/* Arrow in frosted circle */}
                      <span
                        className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                        style={{
                          width: 'clamp(26px, 2.8vw, 34px)',
                          height: 'clamp(26px, 2.8vw, 34px)',
                          flexShrink: 0,
                          background: slide.isWhiteBtn ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.15)',
                        }}
                      >
                        <ArrowRight
                          style={{ width: 'clamp(12px, 1.3vw, 16px)', height: 'clamp(12px, 1.3vw, 16px)' }}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                      </span>
                    </Link>
                  </div>

                </SwiperSlide>
              );
            }

            return (
              <SwiperSlide key={slide.id} className="w-full h-full select-none bg-white">
                
                {/* 50/50 Split Screen Layout */}
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
                  
                  {/* LEFT 50%: White Content Panel */}
                  <div className="w-full h-full bg-white flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-10 lg:py-14 z-10 border-b lg:border-b-0 lg:border-r border-gray-100 relative overflow-y-auto">
                    
                    {/* Decorative subtle corner accent */}
                    <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-gray-200" />
                    <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-gray-200" />

                    {/* Brand & Badge Row */}
                    <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                      <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-500">
                        {slide.brand}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-[11px] font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        <span>{slide.badge}</span>
                      </div>
                    </div>

                    {/* Large Hero Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4 sm:mb-6">
                      {slide.headlineLine1}{' '}
                      <br className="hidden sm:inline" />
                      <span className="text-gray-600">
                        {slide.headlineLine2}
                      </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium leading-relaxed mb-6 sm:mb-8 max-w-xl">
                      {slide.subtitle}
                    </p>

                    {/* Dual CTAs Area */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                      {/* Primary Button */}
                      <Link
                        href={slide.primaryLink}
                        className="relative overflow-hidden inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gray-900 hover:bg-blue-600 text-white text-sm sm:text-base font-bold tracking-wide shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group"
                      >
                        <span>{slide.primaryBtn}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>

                      {/* Secondary Button */}
                      <Link
                        href={slide.secondaryLink}
                        className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-800 text-sm sm:text-base font-semibold border border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span>{slide.secondaryBtn}</span>
                      </Link>
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-px bg-gray-100 mb-6 sm:mb-8" />

                    {/* Trust Indicators / Feature Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {slide.trustIndicators.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <div 
                            key={idx} 
                            className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group cursor-default"
                          >
                            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-gray-900 tracking-wide group-hover:text-blue-600 transition-colors">
                                {item.title}
                              </div>
                              <div className="text-[11px] font-medium text-gray-500 mt-0.5 leading-tight">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>

                  {/* RIGHT 50%: Hero Image Container */}
                  <div className="w-full h-[350px] sm:h-[420px] lg:h-full relative overflow-hidden bg-neutral-950 group">
                    <Link href={slide.shopLink || '/category/Home%20Decor'} className="block w-full h-full">
                      <img
                        src={slide.images[0].url}
                        alt={slide.images[0].label}
                        loading="lazy"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      {/* Bottom gradient for button legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
                    </Link>

                    {/* Shop Now Button — premium centred overlay */}
                    {slide.shopBtn && (
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                        <Link
                          href={slide.shopLink}
                          className="group/btn inline-flex items-center gap-3 px-8 py-3 rounded-full bg-white text-gray-900 text-[11px] font-black uppercase tracking-[0.18em] shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 border border-white/20 hover:bg-gray-900 hover:text-white"
                        >
                          <span>{slide.shopBtn}</span>
                          <span className="w-6 h-6 rounded-full bg-gray-900 group-hover/btn:bg-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                            <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:text-gray-900 transition-all duration-300 group-hover/btn:translate-x-0.5" />
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>

                </div>

              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation Arrows */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-gray-900 hover:text-white backdrop-blur-md border border-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md group transform hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next slide"
          className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-gray-900 hover:text-white backdrop-blur-md border border-gray-200 text-gray-800 flex items-center justify-center transition-all duration-300 shadow-md group transform hover:scale-105"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </button>

      </div>

      {/* Pagination Bar Below Hero Section */}
      <div className="w-full py-4 bg-white border-t border-gray-100 flex items-center justify-center">
        <div className="custom-swiper-pagination flex items-center justify-center gap-2.5" />
      </div>

    </section>
  );
}
