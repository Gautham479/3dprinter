// components/PriceCalculator.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

interface PriceResult {
  finalPrice: number;
  weight: number;
  volumeCm3: number;
  boundingBox: { x: number; y: number; z: number };
  material: string;
  infillPercent: number;
  costs: {
    material: number;
    electricity: number;
    depreciation: number;
  };
  subtotal: number;
  profit: number;
  multicolorCharge: number;
}

export default function PriceCalculator() {
  const [file, setFile] = useState<File | null>(null);
  const [material, setMaterial] = useState('PLA');
  const [infill, setInfill] = useState('20');
  const [isMulticolor, setIsMulticolor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<PriceResult | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.stl')) {
        setError('Please upload an .stl file');
        setFile(null);
        return;
      }
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File too large (max 100MB)');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an STL file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('stl', file);
      formData.append('material', material);
      formData.append('infill', infill);
      formData.append('multicolor', isMulticolor.toString());

      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to calculate price');
      }

      setResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">3D Print Estimator</h1>
          <p className="text-slate-400">Upload your STL file to get an accurate price</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 rounded-2xl p-8 border border-slate-700">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  STL File
                </label>
                <label className="flex items-center justify-center w-full px-6 py-10 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-blue-500 transition">
                  <input
                    type="file"
                    accept=".stl"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="text-center">
                    <p className="text-slate-400">
                      {file ? (
                        <span>
                          <span className="font-semibold text-slate-200">{file.name}</span>
                          <br />
                          <span className="text-xs">({(file.size / 1024).toFixed(0)} KB)</span>
                        </span>
                      ) : (
                        'Click to upload or drag and drop'
                      )}
                    </p>
                  </div>
                </label>
              </div>

              {/* Material */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Material
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="PLA">PLA (₹1300/kg)</option>
                  <option value="PETG">PETG (₹1300/kg)</option>
                  <option value="ABS">ABS (₹1300/kg)</option>
                </select>
              </div>

              {/* Infill */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Infill: <span className="text-blue-400">{infill}%</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={infill}
                  onChange={(e) => setInfill(e.target.value)}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Multicolor */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="multicolor"
                  checked={isMulticolor}
                  onChange={(e) => setIsMulticolor(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-700 cursor-pointer"
                />
                <label htmlFor="multicolor" className="ml-3 text-sm text-slate-300 cursor-pointer">
                  Multicolor (+₹50)
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!file || loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition"
              >
                {loading ? 'Calculating...' : 'Calculate Price'}
              </button>
            </form>
          </div>

          {/* Result */}
          {result && (
            <div className="lg:col-span-2 space-y-6">
              {/* Price Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                <p className="text-blue-100 text-sm mb-2">Final Price</p>
                <p className="text-6xl font-bold">
                  ₹{result.finalPrice.toLocaleString('en-IN')}
                </p>
              </div>

              {/* Model Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Volume</p>
                  <p className="text-white font-semibold">{result.volumeCm3.toFixed(2)} cm³</p>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-1">Weight</p>
                  <p className="text-white font-semibold">{result.weight.toFixed(1)}g</p>
                </div>
              </div>

              {/* Dimensions */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-3">Dimensions (cm)</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="text-slate-500 text-xs">X</p>
                    <p className="text-white font-semibold">{result.boundingBox.x.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Y</p>
                    <p className="text-white font-semibold">{result.boundingBox.y.toFixed(1)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs">Z</p>
                    <p className="text-white font-semibold">{result.boundingBox.z.toFixed(1)}</p>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-400 text-sm mb-4">Cost Breakdown</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Material ({result.material}, {result.infillPercent}%)</span>
                    <span className="text-white font-semibold">₹{result.costs.material.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Electricity</span>
                    <span className="text-white font-semibold">₹{result.costs.electricity.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Depreciation</span>
                    <span className="text-white font-semibold">₹{result.costs.depreciation.toFixed(0)}</span>
                  </div>
                  {result.multicolorCharge > 0 && (
                    <div className="flex justify-between text-slate-300">
                      <span>Multicolor</span>
                      <span className="text-white font-semibold">₹{result.multicolorCharge}</span>
                    </div>
                  )}
                  <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between">
                    <span className="text-slate-300">Subtotal</span>
                    <span className="text-white font-semibold">₹{result.subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Profit (15%)</span>
                    <span className="text-white font-semibold">₹{result.profit.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
