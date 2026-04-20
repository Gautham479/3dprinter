"use client";

import React, { useEffect, useMemo, useRef } from 'react';
import { Zap, Box, Palette, Layers, ShoppingCart, UploadCloud, Sliders } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

const AVAILABLE_COLORS = [
  { name: 'Black', hex: '#111111' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Beige', hex: '#d6c4a8' },
  { name: 'Latte Brown', hex: '#8b6b4a' },
  { name: 'Ivory White', hex: '#f8f5e9' },
];

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23c9955b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
  backgroundPosition: 'right 0.75rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.25em 1.25em',
  paddingRight: '2.5rem',
};

export default function ConfigPanel() {
  const { config, setConfig, selectedFile, mockPrice, addToCart } = useStore();
  const strengthPercentage = ((config.strength - 10) / 90) * 100;
  const colorContainerRef = useRef(null);

  const availableColorsForMaterial = useMemo(() => {
    return AVAILABLE_COLORS.filter(color => {
      if (config.material === 'PETG') return ['Black', 'Gray'].includes(color.name);
      if (config.material === 'ABS' || config.material === 'TPU') return ['Black'].includes(color.name);
      return true;
    });
  }, [config.material]);

  useEffect(() => {
    if (config.color && config.color !== 'Multicolor') {
      const isValid = availableColorsForMaterial.some(c => c.name === config.color);
      if (!isValid) {
        setConfig({ color: null });
      }
    }
  }, [config.material, config.color, availableColorsForMaterial, setConfig]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't deselect if clicking inside the color container
      if (colorContainerRef.current && colorContainerRef.current.contains(event.target)) {
        return;
      }
      
      // Prevent deselecting when clicking Add to Cart
      if (event.target.closest('.add-to-cart-btn')) {
        return;
      }

      if (config.color && config.color !== 'Multicolor') {
        setConfig({ color: null });
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [config.color, setConfig]);

  return (
    <div className="relative rounded-sm border border-surface-border bg-surface-card/90 p-6 sm:p-8 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 relative">
        <div className="w-9 h-9 rounded-sm bg-primary-500/15 border border-primary-500/25 flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-500" />
        </div>
        <h3 className="text-lg font-black text-fg">Configure Your Print</h3>
        <motion.div
          className="ml-auto w-2 h-2 rounded-sm bg-accent-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div className="space-y-6 relative">
        {/* Material */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-black text-fg">
            <Box className="w-4 h-4 text-primary-500" /> Material
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['PLA', 'PETG', 'ABS', 'TPU'].map((mat) => (
              <button
                key={mat}
                onClick={() => setConfig({ material: mat })}
                className={`py-2.5 px-1 rounded-sm text-sm font-bold border transition-all text-center ${config.material === mat
                    ? 'border-primary-500/50 bg-primary-500/10 text-primary-500'
                    : 'border-surface-border bg-surface-muted/40 text-fg-muted hover:border-primary-500/30 hover:text-fg'
                  }`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Color Mode */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-black text-fg">
            <Palette className="w-4 h-4 text-primary-500" /> Color Option
          </label>

          <div className="grid grid-cols-2 gap-2">
            {['Single Color', 'Multicolor'].map((mode) => (
              <button
                key={mode}
                onClick={() => setConfig({ colorMode: mode, color: mode === 'Multicolor' ? 'Multicolor' : config.color })}
                className={`py-2.5 px-3 rounded-sm text-sm font-bold border transition-all ${config.colorMode === mode
                    ? 'border-primary-500/50 bg-primary-500/10 text-primary-500'
                    : 'border-surface-border bg-surface-muted/40 text-fg-muted hover:border-primary-500/30 hover:text-fg'
                  }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {config.colorMode !== 'Multicolor' && (
            <motion.div
              ref={colorContainerRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex gap-2 flex-wrap">
                {availableColorsForMaterial.map((color) => (
                  <button
                    key={color.name}
                    title={color.name}
                    onClick={() => {
                      if (config.color === color.name) {
                        setConfig({ color: null });
                      } else {
                        setConfig({ color: color.name });
                      }
                    }}
                    className={`w-8 h-8 rounded-sm border-2 transition-all hover:scale-110 ${config.color === color.name
                        ? 'border-primary-500 scale-110 shadow-md'
                        : 'border-surface-border hover:border-primary-500/50'
                      }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
              <p className="text-xs text-fg-subtle font-semibold">Selected: {config.color || 'None'}</p>
            </motion.div>
          )}
        </div>

        {/* Quality */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-black text-fg">
            <Layers className="w-4 h-4 text-primary-500" /> Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Draft (0.3mm)', label: 'Draft', detail: '0.3mm' },
              { id: 'Standard (0.2mm)', label: 'Standard', detail: '0.2mm' },
              { id: 'High (0.1mm)', label: 'High', detail: '0.1mm' }
            ].map((q) => (
              <button
                key={q.id}
                onClick={() => setConfig({ quality: q.id })}
                className={`py-2 px-1 rounded-sm border transition-all flex flex-col items-center justify-center gap-0.5 ${config.quality === q.id
                    ? 'border-primary-500/50 bg-primary-500/10 text-primary-500'
                    : 'border-surface-border bg-surface-muted/40 text-fg-muted hover:border-primary-500/30 hover:text-fg'
                  }`}
              >
                <span className="text-sm font-bold">{q.label}</span>
                <span className="text-[10px] opacity-70 font-semibold">{q.detail}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Strength */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-black text-fg">
            <Sliders className="w-4 h-4 text-primary-500" />
            Infill Strength
            <span className="ml-auto text-primary-500 font-black text-base">{config.strength}%</span>
          </label>

          <div className="relative">
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={config.strength}
              onChange={(e) => setConfig({ strength: Number(e.target.value) })}
              className="w-full h-2 rounded-sm appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--app-primary-500) 0%, var(--app-accent-500) ${strengthPercentage}%, var(--app-surface-border) ${strengthPercentage}%)`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-fg-subtle font-semibold">
            <span>Light (10%)</span>
            <span>Solid (100%)</span>
          </div>
        </div>

        {/* Price display */}
        <div className={`rounded-sm border p-5 text-center transition-all ${selectedFile
            ? 'border-primary-500/30 bg-primary-500/10'
            : 'border-surface-border bg-surface-muted/30'
          }`}>
          {selectedFile ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-1"
            >
              <p className="text-xs text-fg-subtle uppercase tracking-widest font-bold">Estimated Price</p>
              <p className="text-5xl font-black text-primary-500">₹{mockPrice}</p>
              <p className="text-xs text-fg-muted flex items-center justify-center gap-1 mt-1">
                <motion.span
                  className="w-1.5 h-1.5 rounded-sm bg-accent-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                Includes material & processing
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <UploadCloud className="w-8 h-8 text-fg-subtle" />
              <p className="text-fg-muted font-semibold text-sm">Upload your model to see price</p>
              <p className="text-xs text-fg-subtle">Instant pricing, no signup needed</p>
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          disabled={!selectedFile}
          onClick={addToCart}
          whileHover={selectedFile ? { scale: 1.02 } : {}}
          whileTap={selectedFile ? { scale: 0.98 } : {}}
          className={`add-to-cart-btn w-full py-4 rounded-sm font-black text-base flex items-center justify-center gap-2 transition-all ${selectedFile
              ? 'btn-glow bg-primary-500 hover:bg-primary-600 text-[var(--app-cta-contrast)]'
              : 'bg-surface-muted border border-surface-border text-fg-subtle cursor-not-allowed'
            }`}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </motion.button>
      </div>
    </div>
  );
}
