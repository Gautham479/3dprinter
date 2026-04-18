"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Multicolor 3D Printing Service
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Who We Are */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-6">
            Who We Are
          </h2>
          <p className="text-body text-lg leading-relaxed max-w-3xl">
            We are a multicolor 3D printing service, providing multicolor 3D printing for prototypes, functional parts, and custom designs. With a commitment to quality and precision, we help makers, designers, and businesses bring their ideas to life.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          className="mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-6">
            What We Do
          </h2>
          <p className="text-body text-lg leading-relaxed max-w-3xl mb-4">
            We offer multicolor 3D printing services with a simple process:
          </p>
          <ul className="text-body text-lg space-y-3">
            <li className="flex items-start">
              <span className="text-primary-accent mr-3 font-bold">•</span>
              <span><strong>Upload your files:</strong> STL or OBJ format</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-accent mr-3 font-bold">•</span>
              <span><strong>Get instant pricing:</strong> No hidden fees</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-accent mr-3 font-bold">•</span>
              <span><strong>We print it:</strong> Using high-quality PLA and PETG materials on calibrated FDM printers</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-accent mr-3 font-bold">•</span>
              <span><strong>Quality assured:</strong> Every print is inspected before shipping</span>
            </li>
          </ul>
        </motion.div>

        {/* Our Process */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-8">
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Analysis",
                description: "Your 3D model is analyzed using PrusaSlicer to determine exact material usage, print time, and cost.",
              },
              {
                step: "2",
                title: "Printing",
                description: "We print your order using calibrated FDM printers with quality filaments.",
              },
              {
                step: "3",
                title: "Quality Check",
                description: "Each print is inspected for dimensional accuracy, layer adhesion, and surface quality.",
              },
              {
                step: "4",
                title: "Packaging & Shipping",
                description: "Orders are carefully packaged with bubble wrap and rigid boxes, then shipped via Shiprocket.",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-6 rounded-lg border border-primary-accent/20 hover:border-primary-accent/40 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-primary-accent text-white rounded-full flex items-center justify-center font-bold text-lg mr-3">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-bold text-heading">{process.title}</h3>
                </div>
                <p className="text-body text-sm leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Trust Us */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-8">
            Why Trust Us
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Transparent Pricing",
                description: "Get instant, accurate quotes before you order. No hidden fees. Pricing is calculated based on material usage and print time.",
              },
              {
                title: "Secure Payments",
                description: "All payments are processed securely through Cashfree, a RBI-licensed payment gateway supporting UPI, cards, and net banking.",
              },
              {
                title: "Return Policy",
                description: "We stand behind our products with a 7-day return policy for defective items. See our Refund Policy for details.",
              },
              {
                title: "Dedicated Support",
                description: "Reach us anytime via email or phone. We respond to all queries within 24 hours.",
              },
            ].map((trust, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-primary-accent/5 to-secondary-accent/5 p-6 rounded-lg border border-primary-accent/10 hover:border-primary-accent/20 transition-all duration-300"
                variants={itemVariants}
              >
                <h3 className="text-xl font-bold text-heading mb-2">{trust.title}</h3>
                <p className="text-body leading-relaxed">{trust.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 p-12 rounded-lg border border-primary-accent/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-heading mb-4">
            Ready to Get Your Parts Printed?
          </h3>
          <p className="text-body text-lg mb-6 max-w-2xl mx-auto">
            Upload your STL file, get an instant quote, and we'll print your custom parts with precision and care.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
