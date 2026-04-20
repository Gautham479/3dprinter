"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, FileBox, Cpu } from 'lucide-react';
import STLViewer from './STLViewer';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadBox() {
  const { selectedFile, setSelectedFile } = useStore();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, [setSelectedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'model/stl': ['.stl'],
      'text/plain': ['.obj']
    },
    maxFiles: 1
  });

  return (
    <div className="flex flex-col h-full relative">
      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`flex-1 flex flex-col items-center justify-center w-full rounded-sm border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden min-h-[400px] h-[400px] lg:h-[450px] max-h-[500px] ${
          isDragActive
            ? 'border-primary-500 bg-primary-500/10 shadow-lg'
            : 'border-surface-border hover:border-primary-500/50 hover:bg-primary-50/50 bg-surface-card/60'
        }`}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-10 bg-surface-card cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent dropzone click when interacting with 3D model
            >
              <STLViewer file={selectedFile} />
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                className="absolute top-4 right-16 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-md backdrop-blur-sm transition-colors shadow-lg z-20 flex items-center gap-2"
                title="Remove model"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                <span className="text-xs font-bold">Remove</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center space-y-5 relative z-10"
            >
              {/* Upload icon */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Subtle pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-sm border border-primary-500/15"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon */}
                <motion.div
                  className="w-20 h-20 rounded-sm bg-primary-500/10 border border-primary-500/25 flex items-center justify-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <FileBox className="w-10 h-10 text-primary-500" />
                </motion.div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-fg tracking-tight">Drop Your STL File Here</h3>
                <p className="text-base text-fg-muted mt-2">or click to browse files</p>
                <p className="text-xs text-fg-subtle mt-2 uppercase tracking-widest font-bold">STL files only, up to 100MB</p>
              </div>


            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag active overlay */}
        <AnimatePresence>
          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-primary-500/10 rounded-sm z-20"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-5xl mb-3"
                >
                  📦
                </motion.div>
                <p className="text-primary-500 font-black text-xl">Drop it!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
