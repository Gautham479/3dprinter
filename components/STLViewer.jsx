"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, Bounds, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { Loader2 } from 'lucide-react';

function STLModel({ fileUrl }) {
  const geometry = useLoader(STLLoader, fileUrl);

  useEffect(() => {
    if (geometry) {
      geometry.computeVertexNormals();
      geometry.center(); // Center the geometry's bounding box
    }
  }, [geometry]);

  return (
    <mesh geometry={geometry} castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial 
        color="#8a8d91" 
        metalness={0.7} 
        roughness={0.3} 
      />
    </mesh>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white/80 whitespace-nowrap bg-black/60 px-6 py-4 rounded-xl backdrop-blur-md">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-primary-500 mx-auto" />
        <span className="text-sm font-bold tracking-widest uppercase">Processing Model...</span>
      </div>
    </Html>
  );
}

export default function STLViewer({ file }) {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!fileUrl) return null;

  return (
    <div className="w-full h-full relative rounded-sm overflow-hidden border border-surface-border bg-[#111111]">
      <Canvas camera={{ position: [0, 100, 200], fov: 45 }} shadows>
        <color attach="background" args={['#1a1a1a']} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[50, 50, 50]} intensity={1.5} castShadow />
        <directionalLight position={[-50, -50, -50]} intensity={0.5} />
        
        {/* Grid floor representing build plate */}
        <gridHelper args={[250, 25, '#444444', '#222222']} position={[0, -25, 0]} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <STLModel fileUrl={fileUrl} />
            </Center>
          </Bounds>
        </Suspense>

        <OrbitControls makeDefault autoRotate autoRotateSpeed={1.5} enableDamping />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-sm backdrop-blur-md border border-white/10 shadow-lg">
        <span className="w-2 h-2 rounded-sm bg-accent-500 animate-pulse" />
        <span className="text-white text-xs font-bold uppercase tracking-widest">3D Preview</span>
      </div>

      <div className="absolute top-4 right-4 px-2.5 py-1 bg-surface-card border border-surface-border rounded-sm shadow-lg">
        <span className="text-fg-muted text-xs font-bold uppercase">STL</span>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white/70 text-xs rounded-full backdrop-blur-md pointer-events-none shadow-lg">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
