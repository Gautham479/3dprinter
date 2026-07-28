"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { Package, ArrowLeft, User, Key, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile'
  
  // Auth state
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  
  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // UI states
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login?redirect=/my-orders');
      } else {
        setUser(session.user);
        setFullName(session.user.user_metadata?.full_name || '');
        setPhone(session.user.user_metadata?.phone || '');
        fetchOrders(session.user.email);
      }
    };
    
    checkAuth();
  }, [router, setUser]);

  const fetchOrders = async (email) => {
    try {
      const res = await fetch(`/api/my-orders?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess('');
    setProfileError('');
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName,
          phone: phone 
        }
      });
      
      if (error) throw error;
      
      setUser(data.user);
      setProfileSuccess('Profile updated successfully!');
      setTimeout(() => setProfileSuccess(''), 4000);
    } catch (error) {
      setProfileError(error.message || 'Failed to update profile');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordSuccess('');
    setPasswordError('');
    
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setPasswordSaving(false);
      return;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      setPasswordSaving(false);
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      setPasswordSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(''), 4000);
    } catch (error) {
      setPasswordError(error.message || 'Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg">
      <Navbar />
      
      <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Back navigation */}
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors mb-8 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        {/* Tab Header Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-surface-border">
          <div>
            <h1 className="text-3xl font-black text-fg tracking-tight">
              {activeTab === 'orders' ? 'My Orders' : 'Account Management'}
            </h1>
            <p className="text-sm text-fg-muted mt-1">{user?.email}</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border transition-all ${
                activeTab === 'orders'
                  ? 'bg-fg text-surface-bg border-fg'
                  : 'bg-surface-card text-fg-muted border-surface-border hover:text-fg'
              }`}
            >
              <Package className="w-4 h-4" />
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border transition-all ${
                activeTab === 'profile'
                  ? 'bg-fg text-surface-bg border-fg'
                  : 'bg-surface-card text-fg-muted border-surface-border hover:text-fg'
              }`}
            >
              <User className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Render Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.div
              key="orders-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-surface-muted animate-pulse rounded-sm border border-surface-border" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 bg-surface-card rounded-sm border border-surface-border">
                  <Package className="w-12 h-12 text-fg-subtle mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-fg mb-2">No orders found</h2>
                  <p className="text-fg-muted mb-6">You haven't placed any orders yet.</p>
                  <button
                    onClick={() => router.push('/products')}
                    className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="bg-surface-card border border-surface-border rounded-sm p-6 shadow-sm">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-surface-border/50">
                        <div>
                          <p className="text-sm text-fg-muted font-bold">Order Number</p>
                          <p className="text-lg text-primary-500 font-black">{order.orderId}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                          <p className="text-sm text-fg-muted font-bold">Placed on</p>
                          <p className="text-fg font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-left md:text-right">
                          <p className="text-sm text-fg-muted font-bold">Status</p>
                          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                            order.status === 'PROCESSING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            order.status === 'PAID' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            'bg-surface-muted text-fg-subtle border border-surface-border'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-black text-fg uppercase tracking-wider">Items</h3>
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center py-2">
                            <div className="flex-1">
                              <p className="text-fg font-bold">{item.fileName}</p>
                              <p className="text-xs text-fg-muted mt-0.5">
                                {item.material} • {item.color} • {item.colorMode}
                              </p>
                            </div>
                            <p className="text-fg font-black">₹{item.price}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-4 border-t border-surface-border/50 flex justify-between items-center">
                        <p className="text-fg-muted font-bold">Total Amount</p>
                        <p className="text-xl font-black text-primary-500">₹{order.totalAmount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left profile overview / actions */}
                <div className="md:col-span-1 space-y-6">
                  <div className="bg-surface-card border border-surface-border rounded-sm p-6 text-center">
                    <div className="w-20 h-20 bg-primary-500/10 border border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-black text-fg">
                      {fullName || 'User Account'}
                    </h3>
                    <p className="text-sm text-fg-muted mb-6">{user?.email}</p>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-colors font-bold text-sm rounded-sm"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Right forms block */}
                <div className="md:col-span-2 space-y-8">
                  {/* Edit profile form */}
                  <form onSubmit={handleUpdateProfile} className="bg-surface-card border border-surface-border rounded-sm p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-black text-fg flex items-center gap-2">
                        <User className="w-5 h-5 text-primary-500" />
                        Profile Settings
                      </h3>
                      <p className="text-xs text-fg-muted mt-1">Update your basic account details.</p>
                    </div>

                    {profileSuccess && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold">
                        <CheckCircle className="w-4 h-4" />
                        {profileSuccess}
                      </div>
                    )}
                    
                    {profileError && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
                        <AlertCircle className="w-4 h-4" />
                        {profileError}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">
                          Email Address (Unchangeable)
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user?.email || ''}
                          className="w-full px-4 py-2.5 bg-surface-muted text-fg-muted border border-surface-border cursor-not-allowed text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="fullName" className="block text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">
                          Full Name
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          placeholder="e.g. Gautham K"
                          className="w-full px-4 py-2.5 bg-surface-bg text-fg border border-surface-border focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="e.g. +91 9876543210"
                          className="w-full px-4 py-2.5 bg-surface-bg text-fg border border-surface-border focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                    >
                      {profileSaving ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                  </form>

                  {/* Change password form */}
                  <form onSubmit={handleChangePassword} className="bg-surface-card border border-surface-border rounded-sm p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-black text-fg flex items-center gap-2">
                        <Key className="w-5 h-5 text-primary-500" />
                        Update Password
                      </h3>
                      <p className="text-xs text-fg-muted mt-1">Ensure your account uses a secure, modern password.</p>
                    </div>

                    {passwordSuccess && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold">
                        <CheckCircle className="w-4 h-4" />
                        {passwordSuccess}
                      </div>
                    )}
                    
                    {passwordError && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
                        <AlertCircle className="w-4 h-4" />
                        {passwordError}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="Min. 6 characters"
                          required
                          className="w-full px-4 py-2.5 bg-surface-bg text-fg border border-surface-border focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-xs font-bold text-fg-muted uppercase tracking-wider mb-2">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Repeat new password"
                          required
                          className="w-full px-4 py-2.5 bg-surface-bg text-fg border border-surface-border focus:outline-none focus:border-primary-500 transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500/50 text-white font-bold text-xs uppercase tracking-widest transition-colors"
                    >
                      {passwordSaving ? 'Updating Password...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}
