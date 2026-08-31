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
 * Calculates selling price (discounted price) from MRP and discount %.
 * Sale Price = MRP - (MRP * Discount Percentage / 100)
 */
export function getSellingPrice(product, explicitPrice, explicitDiscount) {
  const mrp = Number(explicitPrice !== undefined ? explicitPrice : (product?.price || 0));
  const discountPct = getProductDiscountPercent(product, explicitDiscount);
  const isEnabled = product ? (product.isDiscountEnabled ?? product.is_discount_enabled ?? true) : true;

  if (!isEnabled || discountPct <= 0 || discountPct > 100) {
    return mrp;
  }

  return Math.round(mrp - (mrp * discountPct / 100));
}

function formatINR(amount) {
  return Number(amount || 0).toLocaleString('en-IN');
}

/**
 * Reusable pricing section displaying dynamic discounts, MRP with strikethrough, and selling price.
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
  const mrp = Number(price !== undefined ? price : (product?.price || 0));
  const discountPct = getProductDiscountPercent(product, customDiscount);
  const isEnabled = product ? (product.isDiscountEnabled ?? product.is_discount_enabled ?? true) : true;
  const hasDiscount = isEnabled && discountPct > 0 && discountPct <= 100;
  const sellingPrice = hasDiscount ? Math.round(mrp - (mrp * discountPct / 100)) : mrp;

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
          {hasDiscount && showPriceHistory && (
            <span className="inline-flex items-center bg-[#E6F4FA] text-[#007185] text-xs font-medium px-3 py-1 rounded-full border border-[#007185]/20 whitespace-nowrap">
              Price history
            </span>
          )}
        </div>
        {hasDiscount && showMRP ? (
          <p className="text-sm text-fg-muted">
            M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
          </p>
        ) : !hasDiscount && showMRP ? (
          <p className="text-sm text-fg-muted">
            Price: ₹{formatINR(mrp)}
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
          {hasDiscount && showPriceHistory && (
            <span className="bg-[#E6F4FA] text-[#007185] text-[9px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap">
              Price history
            </span>
          )}
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
        {hasDiscount && showPriceHistory && (
          <span className="inline-flex items-center bg-[#E6F4FA] text-[#007185] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#007185]/20 whitespace-nowrap">
            Price history
          </span>
        )}
      </div>
      {hasDiscount && showMRP && (
        <p className="text-xs text-fg-muted">
          M.R.P.: <span className="line-through">₹{formatINR(mrp)}</span>
        </p>
      )}
    </div>
  );
}
