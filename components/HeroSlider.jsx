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
    brand: 'MahashriLabs',
    badge: '⚡ PREMIUM 3D PRINTING STUDIO',
    headlineLine1: 'Bringing Ideas',
    headlineLine2: 'Into Reality',
    subtitle: 'Custom manufacturing, premium collectibles, and innovative 3D printed creations designed with precision.',
    primaryBtn: 'Explore Collection',
    primaryLink: '/products',
    secondaryBtn: 'How It Works',
    secondaryLink: '/#how-it-works',
    trustIndicators: [
      { title: 'Custom 3D Printing', subtitle: 'Made to your specifications', icon: Layers },
      { title: 'Premium Materials', subtitle: 'PLA • PETG • ABS • TPU', icon: Box },
      { title: 'High Precision', subtitle: 'Detailed & reliable prints', icon: CheckCircle2 },
    ],
    shopBtn: 'Shop Now',
    shopLink: '/category/Home%20Decor',
    images: [
      { url: '/pics/home decor.webp', label: 'Home Décor' },
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
    secondaryBtn: 'View All',
    secondaryLink: '/products',
    trustIndicators: [
      { title: 'Detailed Finishing', subtitle: 'Ultra-smooth surface detail', icon: Sparkles },
      { title: 'Custom Designs', subtitle: 'From concept to reality', icon: Target },
      { title: 'Safe Packaging', subtitle: 'Protective shipping pan-India', icon: ShieldCheck },
    ],
    shopBtn: 'Shop Now',
    shopLink: '/category/Action%20Figures%20%26%20Idols',
    images: [
      { url: '/pics/collectibles.png', label: 'Collectibles' },
      { url: '/photos/action 1.jpeg', label: 'Anime Collector' },
      { url: '/photos/action 2.jpeg', label: 'Superhero Figure' },
      { url: '/photos/idols.jpeg', label: 'Fantasy Model' }
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
