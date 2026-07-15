"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useStore } from '@/store/useStore';
import { Package, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login?redirect=/my-orders');
      } else {
        setUser(session.user);
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

  return (
    <div className="flex flex-col min-h-screen bg-surface-bg">
      <Navbar />
      
      <main className="flex-1 max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <motion.button
          onClick={() => router.push('/')}
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-fg-muted hover:text-fg transition-colors mb-8 font-bold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <h1 className="text-3xl font-black text-fg mb-8">My Orders</h1>

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
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-[var(--app-cta-contrast)] font-bold rounded-sm transition-colors"
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
      </main>
      
      <Footer />
    </div>
  );
}
