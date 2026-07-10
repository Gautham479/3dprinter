"use client";

import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import UploadBox from '@/components/UploadBox';
import ConfigPanel from '@/components/ConfigPanel';
import { motion } from 'framer-motion';

const DEFAULT_CONFIG = {
  printerBedSize: "256mm x 256mm x 256mm",
  collageImages: ["/pics/collectibles.png", "/pics/desk_organizers.png", "/pics/home decor.webp", "/pics/playables.jpg"]
};

export default function CustomPrintPage() {
  const [siteConfig, setSiteConfig] = React.useState(DEFAULT_CONFIG);

  React.useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        if (data && data.printerBedSize) {
          setSiteConfig(data);
        }
      })
      .catch(console.error);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-surface-bg items-center relative">
      <Navbar />
      <CartDrawer />
      
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-16 min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-4xl font-black text-fg mb-3">Custom 3D Printing</h1>
            <div className="h-[2px] w-20 bg-primary-500 mx-auto rounded-sm mb-4" />
            <p className="text-fg-muted mb-6">
              Upload your own 3D models (STL files), configure your material preferences, and get an instant quote.
            </p>
            
            {/* Collage Section */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-fg mb-4">What Can We Print?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                {siteConfig.collageImages.map((img, idx) => (
                  <div key={idx} className="aspect-square relative rounded-sm overflow-hidden border border-surface-border bg-surface-muted">
                    <img src={img} alt={`Print example ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-500/10 border border-primary-500/30 text-primary-500 px-4 py-3 rounded-sm inline-block font-bold">
              Maximum Printable Dimensions: {siteConfig.printerBedSize}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-8 lg:gap-10 items-start w-full">
            <div className="w-full relative h-[100%]">
              <UploadBox />
            </div>
            <div className="w-full lg:sticky lg:top-24 pb-10">
              <ConfigPanel />
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
