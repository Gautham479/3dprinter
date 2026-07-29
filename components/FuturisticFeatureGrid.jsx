"use client";

import React from 'react';
import { 
  Package, 
  ShieldCheck, 
  Sparkles, 
  Leaf, 
  Cpu, 
  Target, 
  Zap, 
  Layers, 
  Compass, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function FuturisticFeatureGrid() {
  return (
    <section className="relative w-full bg-[#080A0F] py-24 px-4 sm:px-8 lg:px-16 overflow-hidden border-t border-b border-white/10">
      
      {/* ── Background Ambient Glows & Futuristic Grid Lines ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Electric Blue & Purple Gradient Aura Blobs */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-1/3 right-10 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[160px] animate-pulse delay-1000" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 rounded-full blur-[180px]" />

        {/* Abstract Micro Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)`,
            backgroundSize: '48px 48px' 
          }} 
        />

        {/* Floating Abstract Line Art Geometry */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20%" cy="30%" r="200" stroke="white" strokeWidth="1" fill="none" strokeDasharray="6 6" />
          <circle cx="80%" cy="70%" r="300" stroke="white" strokeWidth="1" fill="none" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* ── Top Icon Badge Ribbon (Icon-Only Badges) ── */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mb-16 flex-wrap">
          
          {/* Badge 1: Delivery Box */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-blue-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-transparent border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
              <Package className="w-6 h-6" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
          </div>

          {/* Badge 2: Shield */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-indigo-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent border border-indigo-400/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          {/* Badge 3: Sparkles */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-purple-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition-all">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          {/* Badge 4: Leaf */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-emerald-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-transparent border border-emerald-400/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all">
              <Leaf className="w-6 h-6" />
            </div>
          </div>

          {/* Badge 5: CPU Tech */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-transparent border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
              <Cpu className="w-6 h-6" />
            </div>
          </div>

          {/* Badge 6: Target Precision */}
          <div className="group relative p-4 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 hover:border-blue-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-transparent border border-blue-400/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
              <Target className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* ── Apple/Tesla Bento Grid Showcase ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Main Large Futuristic Showcase (Spans 8 cols) */}
          <div className="md:col-span-8 group relative rounded-[36px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-8 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-blue-400/40">
            
            {/* Glowing Top Shimmer Line */}
            <div className="absolute top-0 left-12 right-12 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.8)]" />

            {/* Corner Accent Hardware Lines */}
            <div className="absolute top-6 left-6 w-3 h-3 border-t-2 border-l-2 border-white/30" />
            <div className="absolute top-6 right-6 w-3 h-3 border-t-2 border-r-2 border-white/30" />
            <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-white/30" />
            <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-white/30" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10 h-full">
              {/* Left Visual Artwork & Floating 3D Orbs */}
              <div className="relative w-full lg:w-1/2 aspect-square max-w-[320px] mx-auto lg:mx-0 flex items-center justify-center">
                {/* Outer Rotating Glowing Ring */}
                <div className="absolute inset-0 rounded-full border border-blue-500/30 border-dashed animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-purple-500/20 animate-[spin_12s_linear_infinite_reverse]" />

                {/* Central Futuristic Glass Sphere */}
                <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-blue-600/40 via-indigo-500/30 to-purple-500/20 backdrop-blur-3xl border border-white/30 shadow-[0_0_50px_rgba(59,130,246,0.4)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-60 pointer-events-none" />
                  <Layers className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                </div>

                {/* Floating Micro 3D Element 1 */}
                <div className="absolute top-2 right-4 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-blue-300 shadow-lg animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>

                {/* Floating Micro 3D Element 2 */}
                <div className="absolute bottom-2 left-4 p-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-indigo-300 shadow-lg animate-[pulse_3s_infinite]">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>

              {/* Right Aesthetic Icon Grid Strip (Pure Icons, No Text) */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                    ENGINEERING METALLURGY
                  </span>
                </div>

                {/* 4 Floating Glass Pills with Icon-Only Badges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-blue-400 hover:border-blue-400/50 hover:bg-white/[0.08] transition-all">
                    <Package className="w-7 h-7" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-300 hover:border-indigo-400/50 hover:bg-white/[0.08] transition-all">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-300 hover:border-purple-400/50 hover:bg-white/[0.08] transition-all">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-emerald-400 hover:border-emerald-400/50 hover:bg-white/[0.08] transition-all">
                    <Leaf className="w-7 h-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tesla-Style Glass Cylinder Badge (Spans 4 cols) */}
          <div className="md:col-span-4 group relative rounded-[36px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/15 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-purple-400/40">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-300">
                PRECISION ARCHITECTURE
              </span>
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
            </div>

            {/* Glowing Central Icon Orb */}
            <div className="my-auto py-6 flex items-center justify-center relative">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-blue-500/30 border border-white/20 backdrop-blur-2xl shadow-[0_0_40px_rgba(168,85,247,0.3)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Target className="w-12 h-12 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              </div>
            </div>

            {/* Icon-Only Status Ribbon */}
            <div className="flex items-center justify-around p-3 rounded-2xl bg-white/[0.04] border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <Zap className="w-5 h-5 text-blue-400" />
              <Activity className="w-5 h-5 text-purple-400" />
            </div>
          </div>

          {/* Card 3: Minimalist Horizontal Glass Strip (Spans 12 cols) */}
          <div className="md:col-span-12 group relative rounded-[36px] bg-gradient-to-r from-white/[0.05] via-white/[0.03] to-white/[0.05] backdrop-blur-2xl border border-white/15 p-8 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-500 hover:border-blue-400/40">
            <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
              
              {/* Left Icons Cluster */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-400">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-300">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              {/* Right Decorative Line Art Geometry */}
              <div className="flex items-center gap-3">
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-blue-400" />
                <div className="w-3 h-3 rounded-full bg-blue-400 animate-ping" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
