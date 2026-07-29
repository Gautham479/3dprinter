"use client";

import React, { useRef, useState, useEffect } from 'react';
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
    brand: 'MahashriLabs',
    badge: '⚡ PREMIUM 3D PRINTING STUDIO',
    headlineLine1: 'Bringing Ideas',
    headlineLine2: 'Into Reality',
    subtitle: 'Custom manufacturing, premium collectibles, and innovative 3D printed creations designed with precision.',
    primaryBtn: 'Explore Collection',
    primaryLink: '/products',
    secondaryBtn: 'Custom Print',
    secondaryLink: '/custom',
    trustIndicators: [
      { title: 'Custom 3D Printing', subtitle: 'Made to your specifications', icon: Layers },
      { title: 'Premium Materials', subtitle: 'PLA • PETG • ABS • TPU', icon: Box },
      { title: 'High Precision', subtitle: 'Detailed & reliable prints', icon: CheckCircle2 },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200&auto=format&fit=crop', label: 'Bright Workspace' },
      { url: '/pics/desk_organizers.png', label: 'Minimal Desk' },
      { url: '/pics/collectibles.png', label: 'Precision Print' },
      { url: '/photos/daily acc .jpeg', label: 'Lifestyle Setup' }
    ]
  },
  {
    id: 'collectibles',
    brand: 'MahashriLabs',
    badge: '🔥 EXCLUSIVE COLLECTIBLE SERIES',
    headlineLine1: 'Design.',
    headlineLine2: 'Print. Create.',
    subtitle: 'Highly detailed 3D printed action figures, superhero models, and gaming display items crafted for true collectors.',
    primaryBtn: 'Browse Collectibles',
    primaryLink: '/products',
    secondaryBtn: 'Custom Request',
    secondaryLink: '/custom',
    trustIndicators: [
      { title: 'Detailed Finishing', subtitle: 'Ultra-smooth surface detail', icon: Sparkles },
      { title: 'Custom Designs', subtitle: 'From concept to reality', icon: Target },
      { title: 'Safe Packaging', subtitle: 'Protective shipping pan-India', icon: ShieldCheck },
    ],
    images: [
      { url: '/photos/action 1.jpeg', label: 'Anime Collector' },
      { url: '/photos/action 2.jpeg', label: 'Superhero Figure' },
      { url: '/photos/idols.jpeg', label: 'Fantasy Model' },
      { url: '/photos/action 3.jpeg', label: 'Display Shelf' }
    ]
  },
  {
    id: 'custom-printing',
    brand: 'MahashriLabs',
    badge: '🛠️ ON-DEMAND FABRICATION',
    headlineLine1: 'Crafting the Future',
    headlineLine2: 'Layer by Layer',
    subtitle: 'From raw CAD concepts to functional prototypes and high-strength mechanical components using engineering polymers.',
    primaryBtn: 'Start Your Project',
    primaryLink: '/custom',
    secondaryBtn: 'Browse Materials',
    secondaryLink: '/#materials',
    trustIndicators: [
      { title: 'CAD File Support', subtitle: 'STL, OBJ, 3MF compatible', icon: FileCode },
      { title: 'Industrial Polymers', subtitle: 'High-strength PLA, PETG & ABS', icon: Cpu },
      { title: 'Fast Production', subtitle: 'Quick turnarounds on orders', icon: Zap },
    ],
    images: [
      { url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop', label: 'Bright 3D Studio' },
      { url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop', label: 'CAD Workbench' },
      { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop', label: 'Prototype Parts' },
      { url: '/photos/daily acc 1.jpeg', label: 'Daylight Printing' }
    ]
  },
  {
    id: 'everyday-innovation',
    brand: 'MahashriLabs',
    badge: '✨ CREATIVE LIFESTYLE CATALOGUE',
    headlineLine1: 'Everyday',
    headlineLine2: 'Innovation',
    subtitle: 'Functional desk accessories, elegant home décor items, and interactive kit cards designed to elevate modern spaces.',
    primaryBtn: 'Explore Collection',
    primaryLink: '/products',
    secondaryBtn: 'View Catalogue',
    secondaryLink: '/products',
    trustIndicators: [
      { title: 'High Quality Prints', subtitle: 'Professional finish', icon: CheckCircle2 },
      { title: 'Eco-Friendly PLA', subtitle: 'Sustainable material options', icon: Sparkles },
      { title: 'Made On Demand', subtitle: 'Printed fresh when you order', icon: Clock },
    ],
    images: [
      { url: '/pics/desk_organizers.png', label: 'Desk Organizers' },
      { url: '/pics/home decor.webp', label: 'Home Décor' },
      { url: '/pics/kit_cards.png', label: 'Kit Cards' },
      { url: '/pics/playables.jpg', label: 'Playables' }
    ]
  }
];

export default function HeroSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.25));
    }, 40);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="relative w-full h-[94vh] sm:h-[98vh] min-h-[700px] max-h-[1150px] overflow-hidden bg-[#F3F4F6] hero-slider-container">
      
      {/* Top Autoplay Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 z-40 bg-black/10">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-75 ease-linear shadow-[0_0_12px_rgba(37,99,235,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination, Keyboard, A11y]}
        effect="slide"
        speed={850}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true }}
        pagination={{
          clickable: true,
          el: '.custom-swiper-pagination',
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {SLIDES.map((slide, index) => {
          const isActive = activeIndex === index;

          return (
            <SwiperSlide key={slide.id} className="relative w-full h-full overflow-hidden select-none bg-[#F3F4F6]">
              
              {/* Bright High-Key Editorial Image Collage Grid */}
              <div className="absolute inset-0 p-4 sm:p-8 md:p-12 grid grid-cols-12 grid-rows-6 gap-3 sm:gap-5 max-w-[1650px] mx-auto">
                
                {/* 1. Main Feature Image (Left - spans 6 cols, 6 rows) */}
                <div className="col-span-12 lg:col-span-6 row-span-3 lg:row-span-6 relative overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-xl border-4 sm:border-8 border-white bg-white group">
                  <img
                    src={slide.images[0].url}
                    alt={slide.images[0].label}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                      isActive ? 'scale-108' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 text-[11px] font-bold shadow-sm tracking-wide">
                    {slide.images[0].label}
                  </div>
                </div>

                {/* 2. Top Right Image (Spans 6 cols, 3 rows) */}
                <div className="hidden lg:block lg:col-span-6 row-span-3 relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-lg border-4 sm:border-8 border-white bg-white group">
                  <img
                    src={slide.images[1].url}
                    alt={slide.images[1].label}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                      isActive ? 'scale-108' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 text-[11px] font-bold shadow-sm tracking-wide">
                    {slide.images[1].label}
                  </div>
                </div>

                {/* 3. Bottom Right 1 Image (Spans 3 cols, 3 rows) */}
                <div className="hidden lg:block lg:col-span-3 row-span-3 relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-md border-4 sm:border-8 border-white bg-white group">
                  <img
                    src={slide.images[2].url}
                    alt={slide.images[2].label}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                      isActive ? 'scale-108' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 text-[10px] font-bold shadow-sm tracking-wide">
                    {slide.images[2].label}
                  </div>
                </div>

                {/* 4. Bottom Right 2 Image (Spans 3 cols, 3 rows) */}
                <div className="hidden lg:block lg:col-span-3 row-span-3 relative overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-md border-4 sm:border-8 border-white bg-white group">
                  <img
                    src={slide.images[3].url}
                    alt={slide.images[3].label}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${
                      isActive ? 'scale-108' : 'scale-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-900 text-[10px] font-bold shadow-sm tracking-wide">
                    {slide.images[3].label}
                  </div>
                </div>

              </div>

              {/* Light 20–30% Wash Overlay for Image Vibrancy */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/15 to-transparent z-10 pointer-events-none" />

              {/* Soft Blue Gradient Glow Behind Foreground Card */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-purple-500/20 blur-[130px] rounded-full z-15 pointer-events-none" />

              {/* Left-Aligned Apple-Tech Foreground Dark Glass Card */}
              <div className="relative z-20 w-full h-full flex items-center justify-start max-w-[1550px] mx-auto px-4 sm:px-8 lg:px-16">
                <div
                  className={`w-full max-w-xl lg:max-w-2xl bg-[#0F141C]/85 sm:bg-[#0F141C]/92 backdrop-blur-3xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.35)] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 md:p-14 text-left transition-all duration-700 ease-out relative overflow-hidden animate-card-float ${
                    isActive
                      ? 'translate-y-0 opacity-100 scale-100'
                      : 'translate-y-10 opacity-0 scale-95'
                  }`}
                >
                  {/* Decorative Corner Accents */}
                  <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-blue-400/40" />
                  <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-blue-400/40" />
                  <div className="absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 border-blue-400/40" />
                  <div className="absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 border-blue-400/40" />

                  {/* Pulsing Top Edge Line */}
                  <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_20px_rgba(59,130,246,1)] animate-pulse" />

                  {/* Brand & Badge Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-blue-400">
                      {slide.brand}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                      <span>{slide.badge}</span>
                    </div>
                  </div>

                  {/* Large Hero Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] mb-5">
                    {slide.headlineLine1}{' '}
                    <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                      {slide.headlineLine2}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 font-medium leading-relaxed mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>

                  {/* Dual CTAs Area */}
                  <div className="flex flex-wrap items-center gap-4 mb-9">
                    {/* Primary Button */}
                    <Link
                      href={slide.primaryLink}
                      className="relative overflow-hidden inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm sm:text-base font-bold tracking-wide shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:shadow-[0_0_40px_rgba(37,99,235,0.9)] transition-all duration-300 transform hover:-translate-y-0.5 group border border-blue-400/40"
                    >
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine pointer-events-none" />
                      <span>{slide.primaryBtn}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    {/* Secondary Button */}
                    <Link
                      href={slide.secondaryLink}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-semibold border border-white/20 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <span>{slide.secondaryBtn}</span>
                    </Link>
                  </div>

                  {/* Divider Line */}
                  <div className="w-full h-px bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-7" />

                  {/* Authentic Trust Indicators / Feature Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {slide.trustIndicators.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-400/40 hover:bg-white/[0.06] transition-all duration-300 group cursor-default"
                        >
                          <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-400/30 text-blue-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white tracking-wide group-hover:text-blue-300 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-[11px] font-medium text-gray-400 mt-0.5 leading-tight">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

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
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-[#0066FF] hover:text-white backdrop-blur-xl border border-gray-200 text-gray-900 flex items-center justify-center transition-all duration-300 shadow-lg group transform hover:scale-105"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        ref={nextRef}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/90 hover:bg-[#0066FF] hover:text-white backdrop-blur-xl border border-gray-200 text-gray-900 flex items-center justify-center transition-all duration-300 shadow-lg group transform hover:scale-105"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Custom Pagination Dots */}
      <div className="custom-swiper-pagination absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 shadow-md" />
    </section>
  );
}
