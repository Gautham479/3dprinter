"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Bounds, Html } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

function calculateVolume(geometry) {
  let volume = 0;
  const position = geometry.attributes.position;
  
  if (geometry.index) {
    for (let i = 0; i < geometry.index.count; i += 3) {
      const a = geometry.index.getX(i);
      const b = geometry.index.getX(i + 1);
      const c = geometry.index.getX(i + 2);
      
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

function STLModel({ fileUrl, fileName, plateIndex, setTotalPlates }) {
  const ext = fileName ? fileName.split('.').pop().toLowerCase() : 'stl';
  let LoaderClass = STLLoader;
  if (ext === '3mf') LoaderClass = ThreeMFLoader;
  if (ext === 'obj') LoaderClass = OBJLoader;

  const result = useLoader(LoaderClass, fileUrl);
  const [geometry, setGeometry] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const [childrenRef, setChildrenRef] = useState([]);
  const [actualTotalPlates, setActualTotalPlates] = useState(1);

  // --- EFFECT 1: Runs ONCE per file load. Calculates total pricing and plate count. ---
  useEffect(() => {
    if (!result) return;

    if (result.isBufferGeometry) {
      // Single STL mesh
      const g = result.clone();
      g.computeVertexNormals();
      g.computeBoundingBox();
      const b = g.boundingBox;
      if (b && b.max.x !== Infinity) {
        useStore.getState().setFileStats({
          volume: calculateVolume(g),
          x: Math.round(b.max.x - b.min.x),
          y: Math.round(b.max.y - b.min.y),
          z: Math.round(b.max.z - b.min.z)
        });
      }
      if (setTotalPlates) setTotalPlates(1);
      setActualTotalPlates(1);
      setChildrenRef([]);
    } else {
      // 3MF / OBJ Group — compute TOTAL bounding box for pricing
      result.updateMatrixWorld(true);
      const children = result.children || [];

      const allGeometries = [];
      children.forEach((child) => {
        child.traverse((node) => {
          if (node.isMesh && node.geometry) {
            const geom = node.geometry.clone();
            geom.applyMatrix4(node.matrixWorld);
            allGeometries.push(geom);
          }
        });
      });

      if (allGeometries.length > 0) {
        const totalGeometry = BufferGeometryUtils.mergeGeometries(allGeometries, false);
        totalGeometry.computeVertexNormals();
        totalGeometry.computeBoundingBox();
        const totalBBox = totalGeometry.boundingBox;

        if (totalBBox && totalBBox.max.x !== Infinity) {
          const tx = Math.round(totalBBox.max.x - totalBBox.min.x);
          const ty = Math.round(totalBBox.max.y - totalBBox.min.y);
          const tz = Math.round(totalBBox.max.z - totalBBox.min.z);

          // Price is ALWAYS based on total geometry — set once and never again
          useStore.getState().setFileStats({
            volume: calculateVolume(totalGeometry),
            x: tx,
            y: ty,
            z: tz
          });

          const fits = tx <= 256 && ty <= 256 && tz <= 256;
          const plates = fits ? 1 : Math.max(1, children.length);
          if (setTotalPlates) setTotalPlates(plates);
          setActualTotalPlates(plates);
          setChildrenRef(children);
        }
      }
    }
  }, [result]); // <-- Only re-runs when a NEW file is loaded

  // --- EFFECT 2: Runs when plateIndex changes. Only updates the VISIBLE geometry. ---
  useEffect(() => {
    if (!result) return;

    let finalGeometry;

    if (result.isBufferGeometry) {
      finalGeometry = result.clone();
    } else {
      const children = childrenRef.length > 0 ? childrenRef : (result.children || []);
      const objectsToRender = (actualTotalPlates > 1 && plateIndex >= 0 && plateIndex < children.length)
        ? [children[plateIndex]]
        : children;

      const geometries = [];
      objectsToRender.forEach((child) => {
        child.traverse((node) => {
          if (node.isMesh && node.geometry) {
            const geom = node.geometry.clone();
            geom.applyMatrix4(node.matrixWorld);
            geometries.push(geom);
          }
        });
      });

      finalGeometry = geometries.length > 0
        ? BufferGeometryUtils.mergeGeometries(geometries, false)
        : new THREE.BufferGeometry();
    }

    finalGeometry.computeVertexNormals();
    finalGeometry.center();
    finalGeometry.computeBoundingBox();

    const bbox = finalGeometry.boundingBox;
    const sizeZ = bbox ? (bbox.max.z - bbox.min.z) : 0;
    setOffsetY(sizeZ / 2);
    setGeometry(finalGeometry);
  }, [result, plateIndex, childrenRef, actualTotalPlates]); // <-- Only updates visuals

  if (!geometry) return null;

  return (
    <mesh 
      geometry={geometry} 
      position={[0, offsetY, 0]} 
      castShadow 
      receiveShadow 
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <meshStandardMaterial 
        color="#D2B48C" 
        metalness={0.7} 
        roughness={0.3} 
      />
    </mesh>
  );
}

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        <span className="text-white text-sm font-medium tracking-wide">Loading 3D Engine...</span>
      </div>
    </Html>
  );
}

export default function STLViewer({ file }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [plateIndex, setPlateIndex] = useState(0);
  const [totalPlates, setTotalPlates] = useState(1);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setPlateIndex(0);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleNext = () => setPlateIndex((p) => (p + 1) % totalPlates);
  const handlePrev = () => setPlateIndex((p) => (p - 1 + totalPlates) % totalPlates);

  if (!fileUrl) return null;

  return (
    <div className="w-full h-full relative rounded-sm overflow-hidden border border-surface-border bg-surface-muted">
      <Canvas camera={{ position: [0, 100, 200], fov: 45 }} shadows>
        
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
            <STLModel 
              fileUrl={fileUrl} 
              fileName={file.name} 
              plateIndex={plateIndex} 
              setTotalPlates={setTotalPlates} 
            />
          </Bounds>
        </Suspense>

        <OrbitControls makeDefault enableDamping />
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 rounded-sm backdrop-blur-md border border-white/10 shadow-lg">
          <span className="w-2 h-2 rounded-sm bg-accent-500 animate-pulse" />
          <span className="text-white text-xs font-bold uppercase tracking-widest">3D Preview</span>
        </div>
        <div className="px-3 py-1.5 bg-black/50 rounded-sm backdrop-blur-md border border-white/10 shadow-lg">
          <span className="text-fg-muted text-xs font-bold uppercase tracking-widest">Bed Size: 256×256×256</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 px-2.5 py-1 bg-surface-card border border-surface-border rounded-sm shadow-lg">
        <span className="text-fg-muted text-xs font-bold uppercase">{file?.name?.split('.').pop() || 'STL'}</span>
      </div>

      {totalPlates > 1 && (
        <>
          <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-primary-500 transition shadow-lg backdrop-blur-md border border-white/10 z-10">
            <ChevronLeft size={20} />
          </button>
          <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 text-white rounded-full hover:bg-primary-500 transition shadow-lg backdrop-blur-md border border-white/10 z-10">
            <ChevronRight size={20} />
          </button>
          
          <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/80 text-white text-xs font-bold rounded-full backdrop-blur-md shadow-lg border border-white/10 z-10">
            Plate {plateIndex + 1} of {totalPlates}
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 text-white/70 text-xs rounded-full backdrop-blur-md pointer-events-none shadow-lg z-10">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
}
