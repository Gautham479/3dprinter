"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function GemModel() {
  const meshRef = useRef(null);
  
  // Track pointer position using useFrame
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotate based on cursor position smoothly (lerp)
      // state.pointer consists of normalized device coordinates (-1 to +1)
      const targetX = state.pointer.y * 1.5; // Up/down pitch
      const targetY = state.pointer.x * 2.0; // Left/right yaw

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetX, 2 * delta);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetY, 2 * delta);
    }
  });

  return (
    <Float 
      speed={3} 
      rotationIntensity={0.5} 
      floatIntensity={0.5}
    >
      <Icosahedron ref={meshRef} args={[1.8, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#F97316" // Screenshot Orange
          emissive="#78350F" // Deep Brown Base
          emissiveIntensity={0.4}
          roughness={0.15} 
          metalness={0.8}
          flatShading={true} 
        />
      </Icosahedron>
    </Float>
  );
}

export default function ScrollGem() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto flex items-center justify-center overflow-hidden">
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        
        {/* Main highlight light aiming from top right - Yellow to create golden facet */}
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2.5} 
          color="#FDE047" 
          castShadow 
        />
        
        {/* Fill light */}
        <directionalLight 
          position={[-5, -5, -5]} 
          intensity={1.0} 
          color="#EA580C" 
        />
        
        <Environment preset="city" />
        
        <GemModel />
        
        {/* Shadow */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.8} 
          scale={10} 
          blur={3} 
          far={4} 
          color="#78350F" 
        />
      </Canvas>
    </div>
  );
}

