"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { motion } from 'framer-motion';

export default function RefundPolicy() {
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
            Refund Policy
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
              <h2 className="text-2xl font-bold text-heading mb-4">1. Refund Eligibility</h2>
              <p className="mb-3">We offer a 7-day refund policy for defective items. To be eligible for a refund, your order must meet the following criteria:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Request made within 7 days of delivery</li>
                <li>Item must be defective or not match order specifications</li>
                <li>Item must be unused and in its original condition</li>
                <li>Item must be returned with proof of purchase (invoice)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">2. Non-Refundable Items</h2>
              <p className="mb-3">The following items are non-refundable:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Custom prints that meet the specified design and dimensions</li>
                <li>Items that show signs of use or damage caused by the customer</li>
                <li>Items where the customer's design file was the issue</li>
                <li>Printed items that have been post-processed by the customer</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">3. Refund Process</h2>
              <p className="mb-3">To request a refund:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Contact us within 7 days of delivery with photos of the defect</li>
                <li>Provide your order number and reason for the refund</li>
                <li>Ship the item back to us (prepaid shipping label provided)</li>
                <li>We will inspect the item and process the refund within 5-7 business days</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">4. Return Shipping</h2>
              <p>
                For defective items, MahashriLab will provide a prepaid return shipping label. You are responsible for packing and dropping off the item at the designated shipping location.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">5. Refund Amount</h2>
              <p className="mb-3">Refunds will include:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Original product cost</li>
                <li>Original shipping charges</li>
              </ul>
              <p className="mt-3">Refunds will be processed to the original payment method within 7-10 business days after we receive and inspect the returned item.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">6. Damaged Items During Shipping</h2>
              <p>
                If your item arrives damaged, please contact us within 3 days of delivery with photos of the damage. We will investigate and either replace or refund the item.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">7. Order Cancellation</h2>
              <p>
                Orders can only be cancelled before printing begins. Once printing has started, cancellation is not possible. Contact us immediately if you need to cancel your order.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">8. Contact Us</h2>
              <p>
                For refund requests or questions, please contact: support@mahashrilab.com or call us at +91-XXXXXXXXXX
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
