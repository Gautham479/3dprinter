"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { Loader2 } from 'lucide-react';

function STLModel({ fileUrl }) {
  const geometry = useLoader(STLLoader, fileUrl);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (geometry) {
      geometry.computeVertexNormals();
      geometry.center(); // Center the geometry's bounding box
      geometry.computeBoundingBox();
      
      // Because we rotate by -Math.PI/2 on X, the local Z axis becomes world Y.
      // After centering, local Z goes from -sizeZ/2 to +sizeZ/2.
      // Move it up by sizeZ/2 so the bottom sits perfectly at world Y=0.
      const sizeZ = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
      setOffsetY(sizeZ / 2);
    }
  }, [geometry]);

  return (
    <mesh 
      geometry={geometry} 
      position={[0, offsetY, 0]} 
      castShadow 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]}
    >
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
        
        {/* 3D Build Volume representing 250x250x250 mesh */}
        <group position={[0, 0, 0]}>
          <gridHelper args={[250, 25, '#444444', '#222222']} position={[0, 0, 0]} />
          <mesh position={[0, 125, 0]}>
            <boxGeometry args={[250, 250, 250]} />
            <meshBasicMaterial color="#444444" wireframe={true} transparent opacity={0.15} />
          </mesh>
        </group>

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={1.2}>
            <STLModel fileUrl={fileUrl} />
          </Bounds>
        </Suspense>

        <OrbitControls makeDefault enableDamping />
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
