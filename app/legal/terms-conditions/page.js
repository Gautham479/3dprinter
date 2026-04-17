"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { motion } from 'framer-motion';

export default function TermsConditions() {
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
            Terms & Conditions
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
              <h2 className="text-2xl font-bold text-heading mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">2. Use License</h2>
              <p className="mb-3">Permission is granted to temporarily download one copy of the materials (information or software) on our site for personal, non-commercial transitory viewing only.</p>
              <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">3. Disclaimer</h2>
              <p>
                The materials on MahashriLab's site are provided on an 'as is' basis. MahashriLab makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">4. Limitations</h2>
              <p>
                In no event shall MahashriLab or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MahashriLab's site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on MahashriLab's site could include technical, typographical, or photographic errors. MahashriLab does not warrant that any of the materials on the site are accurate, complete, or current.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">6. 3D File Ownership</h2>
              <p className="mb-3">
                By uploading 3D design files to our service, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>You own or have the right to use the design files</li>
                <li>The files do not infringe upon any third-party intellectual property rights</li>
                <li>You grant MahashriLab the right to print and deliver the items as ordered</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">7. Limitations on Liability</h2>
              <p>
                MahashriLab will not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">8. Modifications</h2>
              <p>
                MahashriLab may revise these terms of service for the site at any time without notice. By using this site, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-heading mb-4">9. Contact Us</h2>
              <p>
                If you have questions about these Terms & Conditions, please contact us at: support@mahashrilab.com
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
