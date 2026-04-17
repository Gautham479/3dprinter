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
            Innovation and quality at the intersection of technology and creativity
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Our Story */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-6">
              Our Story
            </h2>
            <p className="text-body text-lg leading-relaxed mb-4">
              Founded with a vision to democratize advanced manufacturing technology, we've been at the forefront of 3D printing innovation. Our journey began with a simple belief: everyone should have access to powerful tools that bring their ideas to life.
            </p>
            <p className="text-body text-lg leading-relaxed">
              Over the years, we've grown from a startup to a trusted partner for thousands of makers, designers, and businesses worldwide. Our commitment to excellence and customer satisfaction has never wavered.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-8 rounded-lg border border-primary-accent/20">
              <div className="text-4xl font-bold text-primary-accent mb-2">5K+</div>
              <p className="text-body font-semibold">Happy Customers</p>
            </div>
            <div className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-8 rounded-lg border border-primary-accent/20">
              <div className="text-4xl font-bold text-primary-accent mb-2">50K+</div>
              <p className="text-body font-semibold">Projects Completed</p>
            </div>
            <div className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-8 rounded-lg border border-primary-accent/20">
              <div className="text-4xl font-bold text-primary-accent mb-2">100+</div>
              <p className="text-body font-semibold">Products</p>
            </div>
            <div className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-8 rounded-lg border border-primary-accent/20">
              <div className="text-4xl font-bold text-primary-accent mb-2">24/7</div>
              <p className="text-body font-semibold">Support Available</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-accent/5 to-secondary-accent/5 p-8 rounded-lg border border-primary-accent/10">
            <h3 className="text-2xl font-bold text-heading mb-4">Our Mission</h3>
            <p className="text-body text-lg leading-relaxed">
              To empower creators, makers, and businesses with cutting-edge 3D printing technology and exceptional support. We believe in democratizing manufacturing and making advanced tools accessible to everyone.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary-accent/5 to-secondary-accent/5 p-8 rounded-lg border border-primary-accent/10">
            <h3 className="text-2xl font-bold text-heading mb-4">Our Values</h3>
            <ul className="text-body text-lg space-y-3">
              <li className="flex items-start">
                <span className="text-primary-accent mr-3 font-bold">✓</span>
                <span><strong>Innovation:</strong> Constantly pushing boundaries</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-accent mr-3 font-bold">✓</span>
                <span><strong>Quality:</strong> Excellence in every product</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-accent mr-3 font-bold">✓</span>
                <span><strong>Support:</strong> Always there for our customers</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "Our experienced engineers and designers are passionate about 3D printing technology.",
              },
              {
                title: "Quality Products",
                description: "Every product is rigorously tested to ensure the highest standards of performance.",
              },
              {
                title: "Customer Support",
                description: "Our dedicated support team is ready to help you succeed with our products.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-primary-accent/10 to-secondary-accent/10 p-8 rounded-lg border border-primary-accent/20 hover:border-primary-accent/40 transition-all duration-300"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-heading mb-3">{item.title}</h3>
                <p className="text-body text-base leading-relaxed">{item.description}</p>
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
            Ready to Start Your Journey?
          </h3>
          <p className="text-body text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers and explore our range of premium 3D printing solutions today.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-3 bg-primary-accent text-white rounded-lg font-semibold hover:bg-secondary-accent transition-all duration-300 transform hover:scale-105"
          >
            Explore Products
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
