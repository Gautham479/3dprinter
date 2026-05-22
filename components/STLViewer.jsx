"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { useLoader } from '@react-three/fiber';
import { Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';

function calculateVolume(geometry) {
  const position = geometry.attributes.position;
  if (!position) return 0;
  
  let volume = 0;
  
  if (geometry.index) {
    const indices = geometry.index.array;
    for (let i = 0; i < indices.length; i += 3) {
      const a = indices[i];
      const b = indices[i + 1];
      const c = indices[i + 2];
      
      const x1 = position.getX(a), y1 = position.getY(a), z1 = position.getZ(a);
      const x2 = position.getX(b), y2 = position.getY(b), z2 = position.getZ(b);
      const x3 = position.getX(c), y3 = position.getY(c), z3 = position.getZ(c);
      
      volume += (-x3 * y2 * z1 + x2 * y3 * z1 + x3 * y1 * z2 - x1 * y3 * z2 - x2 * y1 * z3 + x1 * y2 * z3) / 6.0;
    }
  } else {
    for (let i = 0; i < position.count; i += 3) {
      const x1 = position.getX(i), y1 = position.getY(i), z1 = position.getZ(i);
      const x2 = position.getX(i + 1), y2 = position.getY(i + 1), z2 = position.getZ(i + 1);
      const x3 = position.getX(i + 2), y3 = position.getY(i + 2), z3 = position.getZ(i + 2);
      
      volume += (-x3 * y2 * z1 + x2 * y3 * z1 + x3 * y1 * z2 - x1 * y3 * z2 - x2 * y1 * z3 + x1 * y2 * z3) / 6.0;
    }
  }
  return Math.abs(volume);
}

function STLModel({ fileUrl }) {
  const geometry = useLoader(STLLoader, fileUrl);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (geometry) {
      geometry.computeVertexNormals();
      geometry.center(); // Center the geometry's bounding box
      geometry.computeBoundingBox();
      
      const boundingBox = geometry.boundingBox;
      const x = Math.round(boundingBox.max.x - boundingBox.min.x);
      const y = Math.round(boundingBox.max.y - boundingBox.min.y);
      const z = Math.round(boundingBox.max.z - boundingBox.min.z);
      const volume = calculateVolume(geometry);

      // Save stats to store for price calculation and UI display
      useStore.getState().setFileStats({
        volume,
        x,
        y,
        z
      });

      // Because we rotate by -Math.PI/2 on X, the local Z axis becomes world Y.
      // After centering, local Z goes from -sizeZ/2 to +sizeZ/2.
      // Move it up by sizeZ/2 so the bottom sits perfectly at world Y=0.
      const sizeZ = boundingBox.max.z - boundingBox.min.z;
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
