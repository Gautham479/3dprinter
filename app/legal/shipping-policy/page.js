"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { motion } from 'framer-motion';

export default function ShippingPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary-accent to-secondary-accent py-16 sm:py-24">
        <motion.div
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Shipping Policy
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            Last updated: April 17, 2026
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-body space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">1. Free Shipping</h2>
              <p>
                MahashriLab offers free shipping on all orders across India. We handle all shipping costs, so there are no hidden charges added at checkout.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">2. Shipping Partners</h2>
              <p className="mb-3">We partner with Shiprocket, a leading logistics provider in India, to ensure reliable and timely delivery of your orders.</p>
              <p className="mb-3"><strong>Shiprocket Coverage:</strong> All major cities and towns across India</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">3. Processing Time</h2>
              <p className="mb-3">Order processing timeline:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Design Analysis:</strong> 24-48 hours after order confirmation</li>
                <li><strong>Printing:</strong> 3-7 business days (depending on print complexity and size)</li>
                <li><strong>Quality Check:</strong> 1-2 days</li>
                <li><strong>Handover to Shiprocket:</strong> 1-2 days</li>
              </ul>
              <p className="mt-3"><em>Estimated total time from order to shipment: 7-12 business days</em></p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">4. Delivery Timeline</h2>
              <p className="mb-3">Estimated delivery times after shipment:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Metro Cities (Delhi, Mumbai, Bangalore, etc.):</strong> 2-4 business days</li>
                <li><strong>Tier-2 Cities:</strong> 4-6 business days</li>
                <li><strong>Tier-3 Cities & Remote Areas:</strong> 6-10 business days</li>
              </ul>
              <p className="mt-3"><em>Note: These are estimates and may vary depending on local conditions.</em></p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">5. Packaging</h2>
              <p className="mb-3">We take great care in packaging your orders:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Items are wrapped with protective bubble wrap</li>
                <li>Packed in rigid corrugated boxes to prevent damage</li>
                <li>Fragile stickers applied where necessary</li>
                <li>Tracking information provided with shipping label</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">6. Tracking Your Order</h2>
              <p className="mb-3">Once your order is shipped, you will receive:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Email notification with Shiprocket tracking link</li>
                <li>Tracking number for real-time shipment updates</li>
                <li>Estimated delivery date</li>
              </ul>
              <p className="mt-3">You can track your package on Shiprocket's website or app using your tracking number.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">7. Delivery Confirmation</h2>
              <p>
                A signature or confirmation may be required at delivery depending on order value and local regulations. Shiprocket will attempt delivery during business hours.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">8. Lost or Damaged Shipments</h2>
              <p className="mb-3">If your shipment arrives damaged or goes missing:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Contact us within 3 days of expected delivery date</li>
                <li>Provide photos of damage (if applicable)</li>
                <li>We will coordinate with Shiprocket for a replacement or refund</li>
                <li>Resolution typically within 10-15 business days</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">9. Restricted Locations</h2>
              <p className="mb-3">We ship to almost all locations across India. However, we cannot ship to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Military cantonments without special authorization</li>
                <li>High-security zones</li>
                <li>Remote islands without regular shipping routes</li>
              </ul>
              <p className="mt-3">Contact us if your location is not serviceable.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">10. Shipping Address Requirements</h2>
              <p className="mb-3">Please provide accurate shipping information:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Full name and phone number</li>
                <li>Complete street address</li>
                <li>City, state, and pincode</li>
                <li>Landmark (if in a non-standard address area)</li>
              </ul>
              <p className="mt-3">Incorrect addresses may result in delivery delays.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">11. Contact Us</h2>
              <p>
                For shipping inquiries or issues, please contact: support@mahashrilab.com or call us at +91-XXXXXXXXXX
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
