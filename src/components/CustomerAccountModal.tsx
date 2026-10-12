'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  X,
  Package,
  Heart,
  FileText,
  User,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Clock,
  Truck,
  Shield,
  Key,
} from 'lucide-react';

export default function CustomerAccountModal() {
  const {
    isAccountOpen,
    closeAccount,
    accountTab,
    openAccount,
    orders,
    wishlist,
    toggleWishlist,
    addToCart,
    enquiries,
    openCustomProject,
    showToast,
  } = useStore();

  if (!isAccountOpen) return null;

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-card-border rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-foreground">
                CUSTOMER PORTAL &amp; LAB DASHBOARD
              </h3>
              <div className="text-[10px] font-mono text-muted">
                Lab Lead: Dr. Kabir Verma · Tier-1 Robotics Research Account
              </div>
            </div>
          </div>

          <button
            onClick={closeAccount}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 border-b border-card-border flex items-center space-x-2 bg-card/60 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => openAccount('orders')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              accountTab === 'orders'
                ? 'border-accent text-accent font-bold'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders &amp; Tracking ({orders.length})</span>
          </button>

          <button
            onClick={() => openAccount('wishlist')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              accountTab === 'wishlist'
                ? 'border-accent text-accent font-bold'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Products ({wishlist.length})</span>
          </button>

          <button
            onClick={() => openAccount('enquiries')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              accountTab === 'enquiries'
                ? 'border-accent text-accent font-bold'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Custom Project Quotes ({enquiries.length})</span>
          </button>

          <button
            onClick={() => openAccount('profile')}
            className={`py-3.5 px-3 border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              accountTab === 'profile'
                ? 'border-accent text-accent font-bold'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Facility Settings</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-mono text-xs">
          {/* TAB 1: ORDERS */}
          {accountTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              {orders.length === 0 ? (
                <div className="text-center py-12 text-muted">No orders found.</div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-background border border-card-border space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-card-border/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground font-bold text-sm">{order.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-accent/10 text-accent border border-accent/30">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-muted text-[11px] mt-0.5">Placed on {order.createdAt}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-accent">${order.total.toLocaleString()}</div>
                        <div className="text-[10px] text-muted">Tracking: {order.trackingNumber}</div>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-muted">
                        <span>Production Progress</span>
                        <span className="text-foreground font-bold">{order.statusProgress}%</span>
                      </div>
                      <div className="w-full bg-card h-2 rounded-full overflow-hidden border border-card-border">
                        <div
                          className="bg-accent h-2 rounded-full transition-all duration-500 shadow-glow-sm"
                          style={{ width: `${order.statusProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] text-muted pt-1">
                        <span>SMT Assembly</span>
                        <span>CNC Milling</span>
                        <span>QA &amp; Calibration</span>
                        <span>Dispatched</span>
                        <span>Delivered</span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 pt-2 border-t border-card-border/40">
                      <div className="text-[11px] text-muted uppercase font-bold">Hardware Components Ordered:</div>
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-foreground">
                          <span>
                            {it.quantity}x {it.name}{' '}
                            <span className="text-muted text-[10px]">({it.warranty})</span>
                          </span>
                          <span className="font-semibold">${it.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Destination */}
                    <div className="pt-2 text-[11px] text-muted flex items-start gap-2 bg-card/60 p-3 rounded-xl border border-card-border/50">
                      <Truck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{order.shippingAddress} ({order.carrier})</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {accountTab === 'wishlist' && (
            <div className="space-y-4 animate-fade-in">
              {savedProducts.length === 0 ? (
                <div className="text-center py-12 text-muted">No saved products yet.</div>
              ) : (
                savedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-xl bg-background border border-card-border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-xl object-cover border border-card-border shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] text-accent block uppercase">{prod.categoryLabel}</span>
                        <h4 className="font-bold text-foreground truncate">{prod.name}</h4>
                        <span className="text-accent font-bold">${prod.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          addToCart(prod);
                          toggleWishlist(prod.id);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-accent text-background font-bold text-xs flex items-center gap-1.5 shadow-glow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="p-2 text-muted hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: CUSTOM PROJECT ENQUIRIES */}
          {accountTab === 'enquiries' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted">Direct Custom Engineering Project Requests:</span>
                <button
                  onClick={openCustomProject}
                  className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/40 text-accent hover:bg-accent/20"
                >
                  + New Project Request
                </button>
              </div>

              {enquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-5 rounded-2xl bg-background border border-card-border space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-foreground font-bold text-sm">{enq.projectType}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-accent/10 text-accent border border-accent/30">
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-muted text-[11px] mt-0.5">
                        Ref: {enq.id} · Submitted {enq.createdAt}
                      </div>
                    </div>

                    {enq.estimatedQuote && (
                      <div className="text-right">
                        <span className="text-[10px] text-muted block uppercase">Estimated Quote</span>
                        <span className="text-base font-bold text-emerald-400 font-mono">
                          ${enq.estimatedQuote.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-card/60 p-3 rounded-xl border border-card-border/50">
                    <div>
                      <span className="text-muted block text-[10px]">PAYLOAD</span>
                      <span className="text-foreground font-bold">{enq.payloadRequirement}</span>
                    </div>
                    <div>
                      <span className="text-muted block text-[10px]">REACH</span>
                      <span className="text-foreground font-bold">{enq.reachRequirement}</span>
                    </div>
                    <div>
                      <span className="text-muted block text-[10px]">ENVIRONMENT</span>
                      <span className="text-foreground font-bold">{enq.environment}</span>
                    </div>
                    <div>
                      <span className="text-muted block text-[10px]">TIMELINE</span>
                      <span className="text-foreground font-bold">{enq.timeline}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted font-sans leading-relaxed pt-1">
                    <strong className="text-foreground">Project Notes:</strong> {enq.notes}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: FACILITY PROFILE */}
          {accountTab === 'profile' && (
            <div className="space-y-6 animate-fade-in">
              <div className="p-5 rounded-2xl bg-background border border-card-border space-y-4">
                <h4 className="text-sm font-bold text-foreground">Robotics Lab Profile Credentials</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted block text-[10px]">LEAD RESEARCHER</span>
                    <span className="text-foreground font-bold text-sm">Dr. Kabir Verma</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">INSTITUTION</span>
                    <span className="text-foreground font-bold text-sm">
                      Autonomous Systems Lab, IIT Bombay
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">ACCOUNT TIER</span>
                    <span className="text-accent font-bold">Enterprise Academic Partner (Tier 1)</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[10px]">PAYMENT TERMS</span>
                    <span className="text-emerald-400 font-bold">Net-30 Invoice Pre-Approved ($50k Limit)</span>
                  </div>
                </div>
              </div>

              {/* API Keys */}
              <div className="p-5 rounded-2xl bg-background border border-card-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-accent" />
                    <span className="text-foreground font-bold">Nova Robo Cloud Telemetry API Key</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">Active</span>
                </div>
                <div className="p-3 rounded-xl bg-card border border-card-border font-mono text-xs text-muted flex items-center justify-between">
                  <code>nvb_live_99fa8120b7c44910e99812</code>
                  <button
                    onClick={() => showToast('API key copied')}
                    className="text-accent text-[11px] font-bold hover:underline"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
