"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
            Privacy Policy
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
              <h2 className="text-2xl font-bold text-heading mb-4">1. Introduction</h2>
              <p>
                MahashriLab ("we," "us," "our") operates the 3D printing service. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">2. Information We Collect</h2>
              <p className="mb-3">We may collect information about you in a variety of ways:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, shipping address, payment information</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time spent on pages</li>
                <li><strong>File Data:</strong> 3D design files you upload for printing (stored securely)</li>
                <li><strong>Payment Data:</strong> Processed through Cashfree, we do not store credit card details</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Process and fulfill your 3D printing orders</li>
                <li>Send transactional emails and order updates</li>
                <li>Provide customer support</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Prevent fraudulent transactions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">5. Third-Party Services</h2>
              <p className="mb-3">We use third-party services for:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Payments:</strong> Cashfree (RBI-licensed payment gateway)</li>
                <li><strong>Shipping:</strong> Shiprocket for order delivery</li>
              </ul>
              <p className="mt-3">These third parties have their own privacy policies, and we encourage you to review them.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">6. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">7. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at: support@mahashrilab.com or call us at +91-XXXXXXXXXX
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
