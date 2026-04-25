"use client";

import { useEffect, useMemo, useState } from 'react';
import { MATERIAL_TYPES, PRODUCT_TYPES } from '@/lib/catalog';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingBag, LogOut, ArrowLeft, Plus, Search, Trash2, CheckCircle, XCircle, Upload, BarChart3, Zap, Download, Palette } from 'lucide-react';

const EMPTY_FORM = {
  name: '',
  slug: '',
  fullDescription: '',
  material: 'PLA',
  price: '',
  image: '',
  imageColor: 'bg-primary-50',
  type: PRODUCT_TYPES[0],
  dimensions: '',
  weight: '',
  printTime: '',
  inStock: true,
  isFeatured: false,
};

const COLOR_PRESETS = [
  // Grayscale
  { name: 'Pure White', hex: '#ffffff' }, { name: 'Off White', hex: '#f8fafc' },
  { name: 'Light Grey', hex: '#cbd5e1' }, { name: 'Cool Grey', hex: '#64748b' },
  { name: 'Dark Grey', hex: '#334155' }, { name: 'Matte Black', hex: '#1e293b' },
  { name: 'Pure Black', hex: '#000000' },
  // Reds & Pinks
  { name: 'Cherry Red', hex: '#dc2626' }, { name: 'Crimson', hex: '#991b1b' },
  { name: 'Coral', hex: '#f87171' }, { name: 'Hot Pink', hex: '#db2777' },
  { name: 'Soft Pink', hex: '#fbcfe8' }, { name: 'Magenta', hex: '#d946ef' },
  // Oranges & Browns
  { name: 'Bright Orange', hex: '#f97316' }, { name: 'Burnt Orange', hex: '#c2410c' },
  { name: 'Peach', hex: '#fdba74' }, { name: 'Wood Brown', hex: '#78350f' },
  { name: 'Desert Sand', hex: '#d97706' }, { name: 'Beige', hex: '#fef3c7' },
  // Yellows
  { name: 'Lemon Yellow', hex: '#fde047' }, { name: 'Sunflower', hex: '#eab308' },
  { name: 'Gold', hex: '#ca8a04' },
  // Greens
  { name: 'Lime Green', hex: '#84cc16' }, { name: 'Kelly Green', hex: '#22c55e' },
  { name: 'Forest Green', hex: '#15803d' }, { name: 'Mint', hex: '#a7f3d0' },
  { name: 'Olive', hex: '#4d7c0f' }, { name: 'Teal', hex: '#14b8a6' },
  // Blues
  { name: 'Sky Blue', hex: '#7dd3fc' }, { name: 'Ocean Blue', hex: '#0ea5e9' },
  { name: 'Royal Blue', hex: '#2563eb' }, { name: 'Navy Blue', hex: '#1e3a8a' },
  { name: 'Indigo', hex: '#4f46e5' }, { name: 'Ice Blue', hex: '#e0f2fe' },
  // Purples
  { name: 'Lavender', hex: '#d8b4fe' }, { name: 'Amethyst', hex: '#a855f7' },
  { name: 'Deep Purple', hex: '#7e22ce' }, { name: 'Plum', hex: '#4c1d95' },
  // Specials
  { name: 'Silver Silk', hex: '#94a3b8' }, { name: 'Copper', hex: '#b45309' },
  { name: 'Bronze', hex: '#92400e' }, { name: 'Translucent', hex: '#e2e8f0' }
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorForm, setColorForm] = useState({ name: '', hex: '#111111', material: 'PLA', colorType: 'Basic' });
  const [savingColor, setSavingColor] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [additionalImagesByProduct, setAdditionalImagesByProduct] = useState({});
  const [uploadingProductId, setUploadingProductId] = useState('');
  const [deletingImage, setDeletingImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [recentColors, setRecentColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  const [orderTypeFilter, setOrderTypeFilter] = useState('ALL');
  const [updatingOrderId, setUpdatingOrderId] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    const response = await fetch('/api/admin/products');
    if (!response.ok) {
      let message = 'Failed to load products.';
      try {
        const data = await response.json();
        if (data?.error) {
          message = data.error;
        }
      } catch {
        const text = await response.text().catch(() => '');
        if (text) {
          message = text.slice(0, 160);
        }
      }
      setError(message);
      setLoading(false);
      return;
    }
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  const fetchOrders = async () => {
    const response = await fetch('/api/admin/orders');
    if (response.ok) {
      const data = await response.json();
      setOrders(data);
    }
  };

  const fetchColors = async () => {
    const response = await fetch('/api/colors', { cache: 'no-store' });
    if (response.ok) {
      const data = await response.json();
      setColors(data);
    }
  };

  const handleCreateColor = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!colorForm.name || !colorForm.hex || !colorForm.material) {
      setError('Please fill all fields');
      return;
    }
    
    // Check duplicates
    const isDuplicate = colors.some(c => c.name.toLowerCase() === colorForm.name.toLowerCase() && c.material === colorForm.material);
    if (isDuplicate) {
      setError(`Color "${colorForm.name}" already exists in ${colorForm.material}`);
      return;
    }

    setSavingColor(true);
    const response = await fetch('/api/admin/colors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(colorForm),
    });
    
    if (response.ok) {
      await fetchColors();
      
      setSuccessMessage(`Color "${colorForm.name}" added to ${colorForm.material}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setRecentColors(prev => {
        const newRecent = [{name: colorForm.name, hex: colorForm.hex}, ...prev.filter(c => c.name !== colorForm.name || c.hex !== colorForm.hex)].slice(0, 5);
        return newRecent;
      });

      setColorForm(prev => ({ ...prev, name: '', hex: '#111111' }));
    } else {
      let errorMsg = 'Failed to add color. Please try again.';
      try {
        const errorData = await response.json();
        if (errorData.error) errorMsg = errorData.error;
      } catch (e) {}
      setError(errorMsg);
    }
    setSavingColor(false);
  };

  const handleDeleteColor = async (id) => {
    if (!window.confirm('Delete this color?')) return;
    const response = await fetch(`/api/admin/colors/${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchColors();
    } else {
      let errorMsg = 'Failed to delete color.';
      try {
        const errorData = await response.json();
        if (errorData.error) errorMsg = errorData.error;
      } catch (e) {}
      setError(errorMsg);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchColors();
  }, []);

  const inStockCount = useMemo(() => products.filter((product) => product.inStock).length, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (p.name?.toLowerCase() || '').includes(q) ||
        (p.fullDescription?.toLowerCase() || '').includes(q) ||
        (p.type?.toLowerCase() || '').includes(q) ||
        (p.material?.toLowerCase() || '').includes(q);
    }).sort((a, b) => {
      let valA, valB;
      if (sortKey === 'createdAt') { valA = new Date(a.createdAt || 0).getTime(); valB = new Date(b.createdAt || 0).getTime(); }
      else if (sortKey === 'name') { valA = a.name.toLowerCase(); valB = b.name.toLowerCase(); }
      else if (sortKey === 'price') { valA = a.price; valB = b.price; }
      else if (sortKey === 'stock') { valA = a.inStock ? 1 : 0; valB = b.inStock ? 1 : 0; }
      else { valA = a.id; valB = b.id; }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [products, searchQuery, sortKey, sortOrder]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderStatusFilter !== 'ALL' && o.status !== orderStatusFilter) return false;
      if (orderTypeFilter !== 'ALL' && o.orderType !== orderTypeFilter) return false;
      if (orderSearch) {
        const q = orderSearch.toLowerCase();
        return (o.orderId?.toLowerCase().includes(q) || 
                o.customerName?.toLowerCase().includes(q) || 
                o.email?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [orders, orderSearch, orderStatusFilter, orderTypeFilter]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      await fetchOrders();
    }
    setUpdatingOrderId('');
  };

  const handleBulkDelete = async () => {
    if (!selectedProductIds.length) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedProductIds.length} selected products? This action cannot be undone.`)) return;

    setLoading(true);
    for (const id of selectedProductIds) {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    }
    setSelectedProductIds([]);
    await fetchProducts();
  };

  const toggleSelect = (id) => {
    setSelectedProductIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map(p => p.id));
    }
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    const payload = new FormData();
    payload.set('name', form.name);
    payload.set('slug', form.slug);
    payload.set('fullDescription', form.fullDescription);
    payload.set('material', form.material);
    payload.set('price', String(Number(form.price)));
    payload.set('type', form.type);
    payload.set('imageColor', form.imageColor);
    payload.set('dimensions', form.dimensions);
    payload.set('weight', form.weight);
    payload.set('printTime', form.printTime);
    payload.set('inStock', String(form.inStock));
    payload.set('isFeatured', String(form.isFeatured));
    if (imageFile) {
      payload.set('imageFile', imageFile);
    }
    for (const file of imageFiles) {
      payload.append('imageFiles', file);
    }

    const response = await fetch('/api/admin/products', {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      let message = 'Failed to create product.';
      try {
        const data = await response.json();
        if (data?.error) {
          message = data.error;
        }
      } catch {
        const text = await response.text().catch(() => '');
        if (text) {
          message = text.slice(0, 160);
        }
      }
      setError(message);
      setSaving(false);
      return;
    }

    setForm(EMPTY_FORM);
    setImageFile(null);
    setImageFiles([]);
    await fetchProducts();
    setSaving(false);
  };

  const addImagesToProduct = async (productId) => {
    const files = additionalImagesByProduct[productId] || [];
    if (!files.length) return;

    setUploadingProductId(productId);
    setError('');

    const payload = new FormData();
    files.forEach((file) => payload.append('imageFiles', file));

    const response = await fetch(`/api/admin/products/${productId}/images`, {
      method: 'POST',
      body: payload,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.error || 'Failed to add images.');
      setUploadingProductId('');
      return;
    }

    setAdditionalImagesByProduct((prev) => ({ ...prev, [productId]: [] }));
    await fetchProducts();
    setUploadingProductId('');
  };

  const toggleStock = async (product) => {
    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inStock: !product.inStock }),
    });
    if (response.ok) {
      await fetchProducts();
    }
  };

  const toggleFeature = async (product) => {
    const response = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFeatured: !product.isFeatured }),
    });
    if (response.ok) {
      await fetchProducts();
    }
  };

  const deleteProductImage = async (productId, imageUrl) => {
    if (!window.confirm('Delete this image permanently?')) return;
    setDeletingImage(imageUrl);
    setError('');

    const response = await fetch(`/api/admin/products/${productId}/images`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data?.error || 'Failed to delete image.');
    } else {
      await fetchProducts();
    }
    setDeletingImage('');
  };

  const deleteProduct = async (id) => {
    const shouldDelete = window.confirm('Delete this product?');
    if (!shouldDelete) return;

    const response = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      await fetchProducts();
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };


  const inputClass = "w-full rounded-sm border border-surface-border bg-surface-muted/60 px-3 py-2.5 text-fg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 transition-all backdrop-blur-sm";

  const statCards = [
    { label: 'Total Products', value: products.length, icon: <Package className="w-5 h-5" />, color: 'bg-primary-500/20', border: 'border-primary-500/30' },
    { label: 'In Stock', value: inStockCount, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-green-500/20', border: 'border-green-500/30' },
    { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-cyan-500/20', border: 'border-cyan-500/30' },
    { label: 'Revenue', value: `₹${orders.filter(o => o.status === 'PAID').reduce((s, o) => s + o.totalAmount, 0)}`, icon: <BarChart3 className="w-5 h-5" />, color: 'bg-purple-500/20', border: 'border-purple-500/30' },
  ];

  return (
    <main className="min-h-screen bg-surface-bg relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 relative">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-fg flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-primary-500/20 border border-primary-500/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-500" />
              </div>
              Admin Dashboard
            </h1>
            <p className="text-fg-muted mt-1 text-sm ml-13">
              Products: {products.length} | Orders: {orders.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface-card/60 backdrop-blur-sm border border-surface-border text-fg text-sm font-bold hover:border-primary-500/40 hover:text-primary-500 transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to Store
            </Link>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface-card/60 backdrop-blur-sm border border-surface-border text-fg text-sm font-bold hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-sm border ${stat.border} bg-surface-card/60 backdrop-blur-sm p-5 relative overflow-hidden`}
            >
              <div className={`absolute inset-0 ${stat.color} pointer-events-none`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-fg-subtle text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-fg">{stat.value}</p>
                </div>
                <div className="text-primary-500 opacity-60">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface-card/60 backdrop-blur-sm border border-surface-border/60 p-1.5 rounded-sm w-fit">
          {[
            { id: 'products', label: 'Products Manager', icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders Manager', icon: <ShoppingBag className="w-4 h-4" /> },
            { id: 'colors', label: 'Colors Manager', icon: <Palette className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold transition-all ${activeTab === tab.id ? 'text-[var(--app-cta-contrast)]' : 'text-fg-muted hover:text-fg'
                }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="adminTabBg"
                  className="absolute inset-0 rounded-sm bg-primary-500"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'products' ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Add Product Form */}
              <section className="rounded-sm border border-primary-500/20 bg-surface-card/60 backdrop-blur-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-500/50" />
                <h2 className="text-xl font-black text-fg mb-5 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary-500" />
                  Add New Product
                </h2>
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className={inputClass} placeholder="Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
                  <input className={inputClass} placeholder="Slug (optional)" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} />
                  <textarea className={`${inputClass} md:col-span-2 min-h-24 resize-none`} placeholder="Full description" value={form.fullDescription} onChange={(e) => updateField('fullDescription', e.target.value)} />
                  <select className={inputClass} value={form.type} onChange={(e) => updateField('type', e.target.value)}>
                    {PRODUCT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                  <select className={inputClass} value={form.material} onChange={(e) => updateField('material', e.target.value)}>
                    {MATERIAL_TYPES.map((material) => <option key={material} value={material}>{material}</option>)}
                  </select>
                  <input className={inputClass} type="number" placeholder="Price" value={form.price} onChange={(e) => updateField('price', e.target.value)} required />
                  <div>
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">Primary Product Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">Additional Images</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} className={inputClass} />
                  </div>
                  <input className={inputClass} placeholder="Image gradient classes" value={form.imageColor} onChange={(e) => updateField('imageColor', e.target.value)} />
                  <input className={inputClass} placeholder="Dimensions" value={form.dimensions} onChange={(e) => updateField('dimensions', e.target.value)} />
                  <input className={inputClass} placeholder="Weight" value={form.weight} onChange={(e) => updateField('weight', e.target.value)} />
                  <input className={inputClass} placeholder="Print time" value={form.printTime} onChange={(e) => updateField('printTime', e.target.value)} />
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-fg font-bold cursor-pointer">
                      <input type="checkbox" checked={form.inStock} onChange={(e) => updateField('inStock', e.target.checked)} className="w-4 h-4 accent-primary-500" />
                      In stock
                    </label>
                    <label className="flex items-center gap-2 text-sm text-fg font-bold cursor-pointer">
                      <input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField('isFeatured', e.target.checked)} className="w-4 h-4 accent-primary-500" />
                      Include on Homepage
                    </label>
                  </div>
                  <div className="md:col-span-2">
                    {error ? <p className="text-red-400 text-sm mb-3 bg-red-500/10 border border-red-500/20 rounded-sm px-3 py-2">{error}</p> : null}
                    <motion.button
                      disabled={saving}
                      whileHover={!saving ? { scale: 1.02 } : {}}
                      whileTap={!saving ? { scale: 0.98 } : {}}
                      className="btn-glow bg-primary-500 text-[var(--app-cta-contrast)] px-6 py-2.5 rounded-sm font-black disabled:opacity-60 flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <motion.div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-sm" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          Create Product
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </section>

              {/* Manage Products */}
              <section className="rounded-sm border border-surface-border/60 bg-surface-card/60 backdrop-blur-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent-500/50" />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h2 className="text-xl font-black text-fg">Manage Products</h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-subtle" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`${inputClass} pl-9 !w-auto min-w-[200px]`}
                      />
                    </div>
                    <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} className={`${inputClass} !w-auto`}>
                      <option value="createdAt">Date Added</option>
                      <option value="name">Name</option>
                      <option value="price">Price</option>
                      <option value="stock">Stock Status</option>
                    </select>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className={`${inputClass} !w-auto`}>
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </div>

                {selectedProductIds.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-sm flex items-center justify-between"
                  >
                    <span className="text-sm font-bold text-fg">{selectedProductIds.length} products selected</span>
                    <button onClick={handleBulkDelete} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-black rounded-sm transition-colors border border-red-500/30">
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </button>
                  </motion.div>
                )}

                {error ? <p className="text-red-400 text-sm mb-3 bg-red-500/10 border border-red-500/20 rounded-sm px-3 py-2">{error}</p> : null}

                {loading ? (
                  <div className="flex items-center gap-3 py-8 justify-center">
                    <motion.div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-sm" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                    <p className="text-fg-muted font-semibold">Loading products...</p>
                  </div>
                ) : products.length === 0 ? (
                  <p className="text-fg-muted text-sm text-center py-8">No products found yet. Create one above.</p>
                ) : filteredProducts.length === 0 ? (
                  <p className="text-fg-muted text-sm text-center py-8">No products match your search.</p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-3 border border-surface-border/60 rounded-sm bg-surface-muted/30">
                      <input
                        type="checkbox"
                        checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 cursor-pointer accent-primary-500"
                      />
                      <span className="text-sm font-black text-fg">Select All</span>
                    </div>

                    {filteredProducts.map((product) => {
                      const productImages = [product.image, ...(product.images || [])].filter(Boolean);
                      const uniqueImages = [...new Set(productImages)];
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`border rounded-sm p-4 flex flex-col gap-3 transition-all ${selectedProductIds.includes(product.id)
                              ? 'border-primary-500/40 bg-primary-500/5'
                              : 'border-surface-border/60 bg-surface-muted/20'
                            }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                checked={selectedProductIds.includes(product.id)}
                                onChange={() => toggleSelect(product.id)}
                                className="mt-1 w-4 h-4 cursor-pointer accent-primary-500"
                              />
                              <div className="flex flex-col gap-1">
                                <input
                                  key={`name-${product.id}-${product.name}`}
                                  type="text"
                                  defaultValue={product.name}
                                  onBlur={async (e) => {
                                    const val = e.target.value.trim();
                                    if (val && val !== product.name) {
                                      await fetch(`/api/admin/products/${product.id}`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ name: val }),
                                      });
                                      fetchProducts();
                                    }
                                  }}
                                  className="font-black text-fg bg-transparent border-b border-transparent hover:border-surface-border focus:border-primary-500 focus:outline-none focus:bg-surface-muted/30 px-1 py-0.5 -ml-1 rounded-sm transition-all w-[250px]"
                                />
                                <div className="text-sm text-fg-muted flex items-center gap-1">
                                  <span>{product.type} | {product.material} | ₹</span>
                                  <input
                                    key={`price-${product.id}-${product.price}`}
                                    type="number"
                                    defaultValue={product.price}
                                    onBlur={async (e) => {
                                      const val = Number(e.target.value);
                                      if (!isNaN(val) && val !== product.price && val >= 0) {
                                        await fetch(`/api/admin/products/${product.id}`, {
                                          method: 'PATCH',
                                          headers: { 'Content-Type': 'application/json' },
                                          body: JSON.stringify({ price: val }),
                                        });
                                        fetchProducts();
                                      }
                                    }}
                                    className="w-20 bg-transparent border-b border-transparent hover:border-surface-border focus:border-primary-500 focus:outline-none focus:bg-surface-muted/30 px-1 py-0.5 -ml-1 rounded-sm transition-all"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => setAdditionalImagesByProduct((prev) => ({ ...prev, [product.id]: Array.from(e.target.files || []) }))}
                                className={`${inputClass} !py-1.5 !text-xs w-[200px]`}
                              />
                              <button
                                onClick={() => addImagesToProduct(product.id)}
                                disabled={uploadingProductId === product.id || !(additionalImagesByProduct[product.id] || []).length}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black bg-primary-500/15 border border-primary-500/30 text-primary-500 disabled:opacity-50 hover:bg-primary-500/25 transition-colors"
                              >
                                <Upload className="w-3 h-3" />
                                {uploadingProductId === product.id ? 'Uploading...' : 'Add Images'}
                              </button>
                                <button
                                  onClick={() => toggleFeature(product)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black transition-colors ${product.isFeatured
                                      ? 'bg-blue-500/15 border border-blue-500/30 text-blue-400 hover:bg-blue-500/25'
                                      : 'bg-surface-muted border border-surface-border text-fg-muted hover:text-fg'
                                    }`}
                                >
                                  {product.isFeatured ? 'Unfeature' : 'Feature'}
                                </button>
                                <button
                                  onClick={() => toggleStock(product)}
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black transition-colors ${product.inStock
                                    ? 'bg-green-500/15 border border-green-500/30 text-green-400 hover:bg-green-500/25'
                                    : 'bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25'
                                  }`}
                              >
                                {product.inStock ? <><CheckCircle className="w-3 h-3" /> Mark Out of Stock</> : <><XCircle className="w-3 h-3" /> Mark In Stock</>}
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-black bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                Remove
                              </button>
                            </div>
                          </div>

                          {uniqueImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-surface-border/40">
                              {uniqueImages.map(url => (
                                <div key={url} className="relative w-16 h-16 border border-surface-border rounded-sm bg-surface-muted overflow-hidden group">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={url} alt="" className="w-full h-full object-cover" />
                                  <button
                                    onClick={() => deleteProductImage(product.id, url)}
                                    disabled={deletingImage === url}
                                    className="absolute inset-0 bg-black/70 text-[var(--app-cta-contrast)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete image"
                                  >
                                    {deletingImage === url ? '...' : <Trash2 className="w-4 h-4 text-red-400" />}
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </section>
            </motion.div>
          ) : activeTab === 'orders' ? (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <section className="rounded-sm border border-surface-border/60 bg-surface-card/60 backdrop-blur-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-500/50" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <h2 className="text-xl font-black text-fg flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-cyan-500" />
                    Orders Manager
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-subtle" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={orderSearch}
                        onChange={(e) => setOrderSearch(e.target.value)}
                        className={`${inputClass} pl-9 !w-auto min-w-[200px]`}
                      />
                    </div>
                    <select value={orderStatusFilter} onChange={(e) => setOrderStatusFilter(e.target.value)} className={`${inputClass} !w-auto`}>
                      <option value="ALL">All Statuses</option>
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                    <select value={orderTypeFilter} onChange={(e) => setOrderTypeFilter(e.target.value)} className={`${inputClass} !w-auto`}>
                      <option value="ALL">All Types</option>
                      <option value="custom">Custom</option>
                      <option value="product">Product</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-surface-border rounded-sm">
                    <ShoppingBag className="w-12 h-12 text-fg-subtle mx-auto mb-3" />
                    <p className="text-fg-muted font-semibold">No orders received yet.</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-surface-border rounded-sm">
                    <p className="text-fg-muted font-semibold">No orders match your filters.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order, i) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`border border-surface-border/60 rounded-sm p-5 bg-surface-muted/20 flex flex-col md:flex-row gap-6 relative overflow-hidden ${updatingOrderId === order.id ? 'opacity-60' : ''}`}
                      >
                        <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded--sm ${order.status === 'PAID' || order.status === 'COMPLETED' ? 'bg-green-500' :
                            order.status === 'PENDING' ? 'bg-amber-500' : order.status === 'PROCESSING' ? 'bg-cyan-500' : 'bg-red-500'
                          }`} />

                        <div className="flex-1 space-y-4 pl-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-black text-lg text-fg">{order.orderId}</p>
                                <span className="bg-surface-border/50 text-fg-muted px-2 py-0.5 rounded-sm text-[10px] font-black uppercase">
                                  {order.orderType || 'product'}
                                </span>
                              </div>
                              <p className="text-xs text-fg-muted">{new Date(order.createdAt).toLocaleString()}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-fg-subtle">Status:</span>
                              <select 
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                disabled={updatingOrderId === order.id}
                                className={`px-2 py-1 rounded-sm text-xs font-black outline-none border focus:ring-2 focus:ring-primary-500/50 transition-all cursor-pointer ${
                                  order.status === 'PAID' || order.status === 'COMPLETED' ? 'bg-green-500/15 text-green-400 border-green-500/20' :
                                  order.status === 'PENDING' ? 'bg-amber-500/15 text-amber-400 border-amber-500/20' :
                                  order.status === 'PROCESSING' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20' :
                                  'bg-red-500/15 text-red-400 border-red-500/20'
                                }`}
                              >
                                <option value="PENDING" className="bg-surface-bg text-fg">PENDING</option>
                                <option value="PAID" className="bg-surface-bg text-fg">PAID</option>
                                <option value="PROCESSING" className="bg-surface-bg text-fg">PROCESSING</option>
                                <option value="COMPLETED" className="bg-surface-bg text-fg">COMPLETED</option>
                                <option value="CANCELLED" className="bg-surface-bg text-fg">CANCELLED</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-muted/40 p-4 rounded-sm border border-surface-border/50 text-sm">
                            <div>
                              <p className="text-fg-subtle text-xs uppercase font-black tracking-wider mb-2">Customer</p>
                              <p className="font-black text-fg">{order.customerName}</p>
                              <p className="text-fg-muted text-xs">{order.email}</p>
                              <p className="text-fg-muted text-xs">{order.phone}</p>
                            </div>
                            <div>
                              <p className="text-fg-subtle text-xs uppercase font-black tracking-wider mb-2">Shipping</p>
                              <p className="text-fg-muted text-xs">{order.address}</p>
                              <p className="text-fg-muted text-xs">{order.city}, {order.state} {order.pincode}</p>
                            </div>
                          </div>
                          
                          {order.notes && (
                            <div className="bg-surface-border/20 p-3 rounded-sm border border-surface-border/40">
                              <p className="text-fg-subtle text-xs uppercase font-black tracking-wider mb-1">Order Notes</p>
                              <p className="text-sm text-fg whitespace-pre-wrap">{order.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-surface-border/50 pt-4 md:pt-0 md:pl-6">
                          <div>
                            <p className="text-fg-subtle text-xs uppercase font-black tracking-wider mb-3">Items Included</p>
                            <ul className="space-y-3 text-sm max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                              {order.items?.map(item => (
                                <li key={item.id} className="bg-surface-bg border border-surface-border/60 p-2.5 rounded-sm">
                                  <div className="flex justify-between items-start mb-1">
                                    <span className="text-fg font-bold text-xs truncate max-w-[180px]" title={item.fileName}>{item.fileName}</span>
                                    <span className="text-primary-500 font-black whitespace-nowrap ml-2 text-xs">₹{item.price}</span>
                                  </div>
                                  <div className="text-[10px] text-fg-muted flex flex-wrap gap-1 mb-2">
                                    <span className="bg-surface-muted px-1.5 py-0.5 rounded-sm border border-surface-border/50">{item.material}</span>
                                    {item.quality && <span className="bg-surface-muted px-1.5 py-0.5 rounded-sm border border-surface-border/50">{item.quality.split(' ')[0]}</span>}
                                  </div>
                                  
                                  {item.fileUrl && (
                                    <a 
                                      href={item.fileUrl} 
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-center gap-1.5 w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 py-1.5 rounded-sm text-[10px] font-black transition-colors"
                                    >
                                      <Download className="w-3 h-3" />
                                      Download Model
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4 pt-3 border-t border-surface-border/50 space-y-1.5">
                            <div className="flex justify-between text-xs text-fg-muted">
                              <span>Items Total</span>
                              <span>₹{order.totalAmount - order.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-xs text-fg-muted">
                              <span>Delivery</span>
                              <span>₹{order.deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-sm font-black text-primary-500 pt-1 border-t border-surface-border/40">
                              <span>Total Paid</span>
                              <span>₹{order.totalAmount}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            </motion.div>
          ) : activeTab === 'colors' ? (
            <motion.div
              key="colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <section className="rounded-sm border border-purple-500/20 bg-surface-card/60 backdrop-blur-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-purple-500/50" />
                <h2 className="text-xl font-black text-fg mb-5 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-500" />
                  Colors Manager
                </h2>
                
                {/* Preset Palette */}
                <div className="mb-6">
                  <p className="text-xs text-fg-muted font-bold uppercase tracking-wider mb-3">Preset Palette</p>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map(preset => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setColorForm(prev => ({ ...prev, name: preset.name, hex: preset.hex }))}
                        className="w-8 h-8 rounded-full border border-surface-border hover:scale-110 transition-transform shadow-sm relative group"
                        style={{ backgroundColor: preset.hex }}
                        title={preset.name}
                      >
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-bg text-fg text-[10px] px-2 py-1 rounded-sm opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity border border-surface-border z-10">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {recentColors.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-surface-border/50">
                    <p className="text-xs text-fg-muted font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                      Recently Added <span className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded-sm">Click to reuse</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {recentColors.map((recent, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setColorForm(prev => ({ ...prev, name: recent.name, hex: recent.hex }))}
                          className="flex items-center gap-2 bg-surface-muted/30 hover:bg-surface-muted/60 border border-surface-border px-3 py-1.5 rounded-sm transition-colors"
                        >
                          <div className="w-3 h-3 rounded-full border border-surface-border/50" style={{ backgroundColor: recent.hex }} />
                          <span className="text-xs text-fg font-bold">{recent.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {error && <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-sm px-4 py-3">{error}</p>}
                {successMessage && <p className="text-green-400 text-sm mb-4 bg-green-500/10 border border-green-500/20 rounded-sm px-4 py-3 flex items-center gap-2"><CheckCircle className="w-4 h-4" />{successMessage}</p>}

                <form onSubmit={handleCreateColor} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 bg-surface-muted/30 p-5 border border-surface-border/60 rounded-sm relative">
                  <div className="md:col-span-3">
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">Color Name</label>
                    <input className={inputClass} placeholder="e.g. Matte Black" value={colorForm.name} onChange={(e) => setColorForm(prev => ({ ...prev, name: e.target.value }))} required />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">HEX / Picker</label>
                    <div className="flex items-center gap-2">
                      <div className="relative shrink-0">
                        <input type="color" value={colorForm.hex} onChange={(e) => setColorForm(prev => ({ ...prev, hex: e.target.value }))} className="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
                        <div className="h-10 w-10 rounded-full border-2 border-surface-border bg-surface-card p-0.5 shadow-md flex items-center justify-center transition-colors hover:border-purple-500">
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: colorForm.hex }} />
                        </div>
                      </div>
                      <input className={`${inputClass} uppercase`} placeholder="#000000" value={colorForm.hex} onChange={(e) => setColorForm(prev => ({ ...prev, hex: e.target.value }))} required pattern="^#[0-9A-Fa-f]{6}$" title="Must be a valid HEX color (e.g., #FF0000)" />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">Category</label>
                    <select className={inputClass} value={colorForm.material} onChange={(e) => setColorForm(prev => ({ ...prev, material: e.target.value }))}>
                      {MATERIAL_TYPES.map(mat => <option key={mat} value={mat}>{mat}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-fg-muted font-bold mb-1.5">Color Type</label>
                    <select className={inputClass} value={colorForm.colorType} onChange={(e) => setColorForm(prev => ({ ...prev, colorType: e.target.value }))}>
                      <option value="Basic">Basic</option>
                      <option value="Matte">Matte</option>
                      <option value="Silk">Silk</option>
                      <option value="Translucent">Translucent</option>
                      <option value="Special">Special</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 flex items-end">
                    <button type="submit" disabled={savingColor} className="w-full btn-glow bg-purple-500 hover:bg-purple-600 text-[var(--app-cta-contrast)] font-black rounded-sm px-4 h-10 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                      {savingColor ? 'Adding...' : <><Plus className="w-4 h-4" /> Add Color</>}
                    </button>
                  </div>
                </form>

                <div className="space-y-8">
                  {MATERIAL_TYPES.map(mat => {
                    const materialColors = colors.filter(c => c.material === mat);
                    const isSelected = colorForm.material === mat;
                    return (
                      <div key={mat} className={`p-5 rounded-sm border transition-all duration-300 ${isSelected ? 'border-purple-500/50 bg-purple-500/5' : 'border-surface-border bg-surface-muted/10'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <h3 className={`text-lg font-black ${isSelected ? 'text-purple-500' : 'text-fg'}`}>{mat} Colors</h3>
                          <span className="bg-surface-border/60 text-fg-subtle px-2 py-0.5 rounded-sm text-xs font-bold">{materialColors.length} items</span>
                        </div>
                        {materialColors.length === 0 ? (
                          <p className="text-sm text-fg-muted italic">No colors added for {mat} yet.</p>
                        ) : (
                          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {materialColors.map(color => (
                              <div key={color.id} className="relative flex flex-col items-center gap-2 p-4 border border-surface-border/60 bg-surface-card shadow-sm hover:shadow-md hover:border-purple-500/40 rounded-sm group transition-all">
                                <div className="w-10 h-10 rounded-full border border-surface-border shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: color.hex }} />
                                <span className="text-xs font-bold text-fg text-center mt-1 truncate w-full" title={color.name}>{color.name}</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-[10px] text-fg-muted uppercase">{color.hex}</span>
                                  <span className="text-[9px] bg-surface-border/40 text-fg-subtle px-1 rounded-sm uppercase">{color.colorType || 'Basic'}</span>
                                </div>
                                <button
                                  onClick={() => handleDeleteColor(color.id)}
                                  className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 text-[var(--app-cta-contrast)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                  title="Delete color"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  );
}
