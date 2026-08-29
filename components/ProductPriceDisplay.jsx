"use client";

import React from 'react';

/**
 * Deterministically picks a unique, realistic discount percentage per product.
 * Uses a hash of the product's id/slug/name so every product always gets the same %,
 * but different products get different values.
 */
export function getProductDiscountPercent(product, explicitDiscount) {
  if (typeof explicitDiscount === 'number' && explicitDiscount > 0) return explicitDiscount;
  if (!product) return 20;
  if (typeof product.discountPercent === 'number' && product.discountPercent > 0) return product.discountPercent;
  if (typeof product.discount === 'number' && product.discount > 0) return product.discount;

  const key = String(product.id || product.slug || product.name || 'default');
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash << 5) - hash + key.charCodeAt(i);
    hash |= 0;
  }
  const discounts = [20, 35, 15, 25, 18, 30, 22, 40, 28, 32, 16, 24];
  return discounts[Math.abs(hash) % discounts.length];
}

/**
 * Calculates MRP from selling price (source of truth) + discount %.
 * MRP = round( sellingPrice / (1 - discount/100) )
 */
export function calculateMRP(sellingPrice, discountPercent) {
  const price = Number(sellingPrice) || 0;
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price / (1 - discountPercent / 100));
}

function formatINR(amount) {
  return Number(amount || 0).toLocaleString('en-IN');
}

/**
 * Reusable pricing section matching the Amazon "Limited time deal" reference image.
 *
 * Sizes:
 *   'lg'  — product detail page (large)
 *   'md'  — product grid card  (default)
 *   'sm'  — compact / related products
 */
export default function ProductPriceDisplay({
  product,
  price,
  discountPercent: customDiscount,
  size = 'md',
  showBadge = true,
  showPriceHistory = true,
  showMRP = true,
  className = '',
}) {
  const sellingPrice = price !== undefined ? price : (product?.price || 0);
  const discountPct  = getProductDiscountPercent(product, customDiscount);
  const mrp          = calculateMRP(sellingPrice, discountPct);

  /* ── LARGE (product detail page) ─────────────────────────────── */
  if (size === 'lg') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {showBadge && (
          <span className="inline-block w-fit bg-[#CC0C39] text-white text-xs font-bold px-3 py-1 rounded-sm tracking-wide">
            Limited time deal
          </span>
        )}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          <span className="text-[#CC0C39] text-3xl font-light tracking-tight">
            -{discountPct}%
          </span>
          <div className="flex items-baseline">
            <span className="text-xl font-normal relative -top-3 mr-0.5 text-fg select-none">₹</span>
            <span className="text-5xl font-semibold text-fg tracking-tight">{formatINR(sellingPrice)}</span>
          </div>
          {showPriceHistory && (
            <span className="inline-flex items-center bg-[#E6F4FA] text-[#007185] text-xs font-medium px-3 py-1 rounded-full border border-[#007185]/20 whitespace-nowrap">
              Price history
            </span>
          )}
        </div>
        {showMRP && (
          <p className="text-sm text-fg-muted">
            M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
          </p>
        )}
      </div>
    );
  }

  /* ── SMALL (related / compact) ───────────────────────────────── */
  if (size === 'sm') {
    return (
      <div className={`flex flex-col gap-0.5 ${className}`}>
        {showBadge && (
          <span className="inline-block w-fit bg-[#CC0C39] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide">
            Limited time deal
          </span>
        )}
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
          <span className="text-[#CC0C39] text-xs font-semibold">-{discountPct}%</span>
          <span className="text-fg font-bold text-xs">
            <span className="text-[10px] font-normal mr-0.5">₹</span>{formatINR(sellingPrice)}
          </span>
          {showPriceHistory && (
            <span className="bg-[#E6F4FA] text-[#007185] text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap">
              Price history
            </span>
          )}
        </div>
        {showMRP && (
          <p className="text-[10px] text-fg-muted">
            M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
          </p>
        )}
      </div>
    );
  }

  /* ── MEDIUM / CARD (product grid) ────────────────────────────── */
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {showBadge && (
        <span className="inline-block w-fit bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
          Limited time deal
        </span>
      )}
      <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        <span className="text-[#CC0C39] text-lg font-normal tracking-tight">-{discountPct}%</span>
        <div className="flex items-baseline">
          <span className="text-xs font-normal relative -top-1.5 mr-0.5 text-fg select-none">₹</span>
          <span className="text-lg font-bold text-fg tracking-tight">{formatINR(sellingPrice)}</span>
        </div>
        {showPriceHistory && (
          <span className="inline-flex items-center bg-[#E6F4FA] text-[#007185] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#007185]/20 whitespace-nowrap">
            Price history
          </span>
        )}
      </div>
      {showMRP && (
        <p className="text-xs text-fg-muted">
          M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
        </p>
      )}
    </div>
  );
}
