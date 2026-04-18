"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    query: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name || !formData.email || !formData.query) {
      setError('Please fill in required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '6782b0a0-3a1b-469c-9fa1-45ae9f0562ea',
          subject: 'New Message from MahashriLab Website',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Not provided',
          category: formData.category || 'Not specified',
          message: formData.query
        })
      });

      const json = await response.json();

      if (response.status !== 200 || !json.success) {
        throw new Error(json.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', category: '', query: '' });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "absolute left-4 top-4 text-fg-muted transition-all pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary-500 peer-focus:bg-background peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-background peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:text-primary-500";
  const inputClass = "peer w-full bg-surface-card rounded-xl px-4 py-4 outline-none border border-surface-border focus:border-primary-500/50 text-fg placeholder-transparent shadow-lg transition-all";

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-primary-500 uppercase tracking-widest text-sm font-bold mb-2 text-center">
          Get in touch
        </h3>
        <h2 className="text-3xl font-black mb-8 text-fg text-center">
          Send Us a Message
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold"
            >
              ✓ Thank you! We've received your message.
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold"
            >
              ✗ {error}
            </motion.div>
          )}

          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className={inputClass}
            />
            <label htmlFor="name" className={labelClass}>Your Name</label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className={inputClass}
            />
            <label htmlFor="email" className={labelClass}>Email Address</label>
          </div>

          <div className="relative">
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={inputClass}
            />
            <label htmlFor="phone" className={labelClass}>Phone Number</label>
          </div>



          <div className="relative">
            <textarea
              name="query"
              id="query"
              value={formData.query}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows="5"
              className={`${inputClass} resize-none`}
            />
            <label htmlFor="query" className={labelClass}>Your Message</label>
          </div>

          <motion.button
            type="submit"
            disabled={loading || submitted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-4 rounded-xl bg-primary-500 text-[var(--app-cta-contrast)] font-black shadow-lg disabled:opacity-50 transition-colors hover:bg-primary-600"
          >
            {loading ? 'Sending...' : submitted ? 'Message Sent!' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
