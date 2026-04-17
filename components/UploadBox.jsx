"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, FileBox, Cpu } from 'lucide-react';
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
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-fg font-black pb-2">
        <div className="w-8 h-8 rounded-sm bg-primary-500/15 border border-primary-500/30 flex items-center justify-center">
          <Upload className="w-4 h-4 text-primary-500" />
        </div>
        <span>Upload Model</span>
      </div>

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className={`flex-1 flex flex-col items-center justify-center p-10 w-full rounded-sm border-2 border-dashed transition-all duration-300 cursor-pointer relative overflow-hidden min-h-[380px] ${
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center text-center space-y-4 relative z-10"
            >
              {/* Success icon */}
              <motion.div
                className="w-24 h-24 rounded-sm bg-accent-500/15 border border-accent-500/30 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-12 h-12 text-accent-500" />
              </motion.div>

              <div>
                <p className="text-fg font-black text-xl">{selectedFile.name}</p>
                <p className="text-sm text-fg-muted mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm font-bold">
                <Cpu className="w-4 h-4" />
                Model loaded — price calculated
              </div>

              <p className="text-sm text-primary-500 font-bold">Click or drag here to upload a different file</p>
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

              <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface-muted/60 border border-surface-border text-fg-subtle text-sm font-medium">
                <motion.span
                  className="w-2 h-2 rounded-sm bg-accent-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                1000+ models quoted this month
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
