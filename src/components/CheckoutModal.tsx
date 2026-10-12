'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  CreditCard,
  Building,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cart, cartTotal, placeOrder } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [formData, setFormData] = useState({
    fullName: 'Dr. Kabir Verma',
    organization: 'Robotics & Automation Research Lab, IIT Bombay',
    email: 'k.verma@me.iitb.ac.in',
    phone: '+91 98200 44192',
    address: 'Powai Technology Park, Building 4B',
    city: 'Mumbai',
    country: 'India',
    postalCode: '400076',
    shippingMethod: 'Reinforced Shock-Sensor Crate Freight (DHL Cargo)',
    paymentMethod: 'Corporate PO / Lab Invoice (Net-30)',
  });

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((s) => (s + 1) as 2 | 3);
      return;
    }
    // Place order
    placeOrder(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-card border border-card-border rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-foreground">
                SECURE HARDWARE CHECKOUT
              </h3>
              <div className="text-[10px] font-mono text-muted">
                Step {step} of 3 · 256-Bit Encrypted Procurement
              </div>
            </div>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-background h-1">
          <div
            className="bg-accent h-1 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 font-mono text-xs">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-foreground font-bold text-sm">1. Delivery Address &amp; Lab Affiliation</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Organization / University *</label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Direct Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Facility Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-muted block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2.5 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-foreground font-bold text-sm">2. Industrial Freight &amp; Packaging Option</div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Reinforced Shock-Sensor Crate Freight (DHL Cargo)',
                    desc: 'Heavy wooden export crate with internal foam cradle, desiccant packs, and tamper-evident G-force impact telemetry sensors.',
                    badge: 'RECOMMENDED FOR ROBOT ARMS',
                  },
                  {
                    name: 'DHL Express Air Priority (2-4 Days)',
                    desc: 'Double-walled carton box packaging for electronic components, sensors, and driver boards.',
                    badge: 'EXPRESS AIR',
                  },
                ].map((opt) => (
                  <div
                    key={opt.name}
                    onClick={() => setFormData({ ...formData, shippingMethod: opt.name })}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.shippingMethod === opt.name
                        ? 'border-accent bg-accent/10'
                        : 'border-card-border bg-background/50 hover:border-card-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground">{opt.name}</span>
                      <span className="text-[10px] text-accent px-2 py-0.5 rounded bg-accent/20">
                        {opt.badge}
                      </span>
                    </div>
                    <p className="text-muted text-[11px] mt-1.5 font-sans leading-relaxed">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-foreground font-bold text-sm">3. Procurement &amp; Payment Method</div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Corporate PO / Lab Invoice (Net-30)',
                    desc: 'Official invoice generated with GST/Tax ID for university purchase orders and corporate research departments. Payment due in 30 days.',
                    icon: Building,
                  },
                  {
                    name: 'Corporate Credit Card / P-Card',
                    desc: 'Instant procurement via Visa, MasterCard, or American Express commercial purchasing card.',
                    icon: CreditCard,
                  },
                  {
                    name: 'Direct Bank Wire (SWIFT / RTGS)',
                    desc: 'Wire transfer instructions dispatched via email with dedicated escrow reference code.',
                    icon: FileCheck,
                  },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={m.name}
                      onClick={() => setFormData({ ...formData, paymentMethod: m.name })}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.paymentMethod === m.name
                          ? 'border-accent bg-accent/10'
                          : 'border-card-border bg-background/50 hover:border-card-border'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        <span className="font-bold text-foreground">{m.name}</span>
                      </div>
                      <p className="text-muted text-[11px] mt-1 font-sans">{m.desc}</p>
                    </div>
                  );
                })}
              </div>

              {/* Order Confirmation Preview */}
              <div className="p-4 rounded-xl bg-background border border-card-border space-y-2 mt-4">
                <div className="text-muted text-[11px] uppercase font-bold">Order Summary Review</div>
                <div className="flex justify-between text-foreground">
                  <span>{cart.length} Hardware Line Items</span>
                  <span className="font-bold text-accent">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-muted">
                  Shipping to: {formData.organization}, {formData.city} ({formData.country})
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation Buttons */}
          <div className="pt-4 border-t border-card-border flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2)}
                className="px-4 py-2 rounded-xl bg-background border border-card-border text-muted hover:text-foreground"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-md flex items-center gap-2"
            >
              <span>{step === 3 ? 'Place Hardware Order' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
