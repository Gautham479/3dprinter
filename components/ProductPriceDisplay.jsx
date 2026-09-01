"use client";

import React from 'react';

/**
 * Reads discount percentage from product or explicit parameter.
 * Returns a number between 0 and 100 (defaults to 0).
 */
export function getProductDiscountPercent(product, explicitDiscount) {
  if (typeof explicitDiscount === 'number' && explicitDiscount >= 0) return explicitDiscount;
  if (!product) return 0;
  
  const val = product.discountPercentage ?? product.discount_percentage ?? product.discountPercent ?? product.discount;
  const num = Number(val);
  if (!isNaN(num) && num >= 0 && num <= 100) {
    return num;
  }
  return 0;
}

/**
 * Returns the final selling price (the price entered by admin / in DB).
 * Selling Price is the SOURCE OF TRUTH and NEVER changes when a discount is applied.
 */
export function getSellingPrice(product, explicitPrice) {
  if (explicitPrice !== undefined && explicitPrice !== null && explicitPrice !== '') {
    return Number(explicitPrice) || 0;
  }
  return Number(product?.price || 0);
}

/**
 * Calculates original MRP backwards from Selling Price and Discount %.
 * Formula: MRP = Selling Price / (1 - Discount / 100)
 *
 * Examples:
 *   ₹499 + 18% -> 499 / 0.82 = 608.54
 *   ₹499 + 20% -> 499 / 0.80 = 623.75
 *   ₹999 + 10% -> 999 / 0.90 = 1110
 */
export function calculateMRP(sellingPrice, discountPct) {
  const price = Number(sellingPrice) || 0;
  const pct = Number(discountPct) || 0;
  if (price <= 0 || pct <= 0 || pct >= 100) return price;
  
  const rawMrp = price / (1 - pct / 100);
  return Math.round(rawMrp * 100) / 100;
}

function formatINR(amount) {
  const num = Number(amount || 0);
  if (Number.isInteger(num)) {
    return num.toLocaleString('en-IN');
  }
  return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Reusable pricing component matching Amazon/E-commerce deal styling:
 * - Selling Price = Source of Truth (what admin entered, what customer pays)
 * - MRP = Calculated backwards from Selling Price and Discount %
 * - Price History is completely removed.
 *
 * Sizes:
 *   'lg'  — product detail page
 *   'md'  — product grid card (default)
 *   'sm'  — compact / related products
 */
export default function ProductPriceDisplay({
  product,
  price,
  discountPercent: customDiscount,
  size = 'md',
  showBadge = true,
  showMRP = true,
  className = '',
}) {
  const sellingPrice = getSellingPrice(product, price);
  const discountPct = getProductDiscountPercent(product, customDiscount);
  const isEnabled = product ? (product.isDiscountEnabled ?? product.is_discount_enabled ?? true) : true;
  const hasDiscount = isEnabled && discountPct > 0 && discountPct < 100;
  const mrp = hasDiscount ? calculateMRP(sellingPrice, discountPct) : sellingPrice;

  /* ── LARGE (product detail page) ─────────────────────────────── */
  if (size === 'lg') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {hasDiscount && showBadge && (
          <span className="inline-block w-fit bg-[#CC0C39] text-white text-xs font-bold px-3 py-1 rounded-sm tracking-wide">
            Limited time deal
          </span>
        )}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1">
          {hasDiscount && (
            <span className="text-[#CC0C39] text-3xl font-light tracking-tight">
              -{discountPct}%
            </span>
          )}
          <div className="flex items-baseline">
            <span className="text-xl font-normal relative -top-3 mr-0.5 text-fg select-none">₹</span>
            <span className="text-5xl font-semibold text-fg tracking-tight">{formatINR(sellingPrice)}</span>
          </div>
        </div>
        {hasDiscount && showMRP ? (
          <p className="text-sm text-fg-muted">
            M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
          </p>
        ) : !hasDiscount && showMRP ? (
          <p className="text-sm text-fg-muted">
            Price: ₹{formatINR(sellingPrice)}
          </p>
        ) : null}
      </div>
    );
  }

  /* ── SMALL (related / compact) ───────────────────────────────── */
  if (size === 'sm') {
    return (
      <div className={`flex flex-col gap-0.5 ${className}`}>
        {hasDiscount && showBadge && (
          <span className="inline-block w-fit bg-[#CC0C39] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide">
            Limited time deal
          </span>
        )}
        <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
          {hasDiscount && (
            <span className="text-[#CC0C39] text-xs font-semibold">-{discountPct}%</span>
          )}
          <span className="text-fg font-bold text-xs">
            <span className="text-[10px] font-normal mr-0.5">₹</span>{formatINR(sellingPrice)}
          </span>
        </div>
        {hasDiscount && showMRP && (
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
      {hasDiscount && showBadge && (
        <span className="inline-block w-fit bg-[#CC0C39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
          Limited time deal
        </span>
      )}
      <div className="flex items-center flex-wrap gap-x-2 gap-y-1">
        {hasDiscount && (
          <span className="text-[#CC0C39] text-lg font-normal tracking-tight">-{discountPct}%</span>
        )}
        <div className="flex items-baseline">
          <span className="text-xs font-normal relative -top-1.5 mr-0.5 text-fg select-none">₹</span>
          <span className="text-lg font-bold text-fg tracking-tight">{formatINR(sellingPrice)}</span>
        </div>
      </div>
      {hasDiscount && showMRP && (
        <p className="text-xs text-fg-muted">
          M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
        </p>
      )}
    </div>
  );
}
