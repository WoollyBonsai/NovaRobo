'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';
import { Product, ComponentItem } from '../data/products';
import {
  X,
  Shield,
  Package,
  Sliders,
  Wrench,
  Lock,
  Unlock,
  ExternalLink,
  Eye,
  EyeOff,
  XCircle,
  Plus,
} from 'lucide-react';

export default function AdminDashboardModal() {
  const {
    isAdminOpen,
    closeAdmin,
    orders,
    updateOrderStatus,
    enquiries,
    approveEnquiry,
    products,
    components,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries' | 'inventory'>('orders');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passwordInput);
    if (!success) {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 3000);
    } else {
      setPasswordInput('');
      setAuthError(false);
    }
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeProductionCount = orders.filter((o) => o.status !== 'Delivered').length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status !== 'Approved').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-card border border-copper/40 rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-card-elevated/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-copper/15 border border-copper/35 flex items-center justify-center text-copper shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono text-sm font-bold text-foreground">
                  NOVA ROBO ADMINISTRATIVE DASHBOARD &amp; OPERATIONS
                </h3>
                {isAdminAuthenticated && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/35 text-emerald-400">
                    ROOT UNLOCKED
                  </span>
                )}
              </div>
              <div className="text-[10px] font-mono text-muted">
                Executive Control · Products, Orders, Production Lines &amp; Custom Project Enquiries
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <Link
                href="/admin"
                onClick={closeAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase hover:bg-sky-300 transition-colors shadow-sm"
              >
                <span>Full Admin Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={closeAdmin}
              className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            PASSWORD LOCK GATE (When Not Authenticated)
            ======================================================== */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 font-mono text-xs">
            <div className="w-16 h-16 rounded-2xl bg-card-elevated border border-copper/35 flex items-center justify-center text-copper shadow-glow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-bold font-sans text-foreground">
                Enter Master Admin Passkey
              </h4>
              <p className="text-muted leading-relaxed">
                Access to modify robot models, component prices, production schedules, and client quotation archives requires authorization.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="text-[11px] text-muted uppercase font-bold block mb-1">
                  Master Passkey *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter passkey..."
                    className={`w-full bg-background border ${
                      authError ? 'border-red-500' : 'border-card-border focus:border-accent'
                    } rounded-xl px-4 py-2.5 text-foreground focus:outline-none pr-10`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <div className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Invalid passkey. Access denied.</span>
                  </div>
                )}
              </div>

              {/* Password Hint */}
              <div className="p-3 rounded-xl bg-card-elevated border border-copper/30 text-xs text-muted flex items-center justify-between">
                <span>Passkey:</span>
                <span className="text-copper font-bold tracking-wider px-2 py-0.5 rounded bg-background border border-copper/40">
                  notadmin
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-copper text-background font-bold uppercase hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-glow-sm"
              >
                <Unlock className="w-4 h-4" />
                <span>Authorize &amp; Unlock</span>
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================
             AUTHENTICATED CONTENT
             ======================================================== */
          <>
            {/* Top Telemetry KPI Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-card-elevated/40 border-b border-card-border font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-card border border-card-border">
                <span className="text-[10px] text-muted uppercase block">Total Gross Procurement</span>
                <span className="text-xl font-bold text-accent mt-1 block">${totalRevenue.toLocaleString()}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-card-border">
                <span className="text-[10px] text-muted uppercase block">Active Production Units</span>
                <span className="text-xl font-bold text-foreground mt-1 block">{activeProductionCount} Units</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-card-border">
                <span className="text-[10px] text-muted uppercase block">Open Custom Enquiries</span>
                <span className="text-xl font-bold text-amber-400 mt-1 block">{pendingEnquiriesCount} Projects</span>
              </div>

              <div className="p-3.5 rounded-xl bg-card border border-card-border">
                <span className="text-[10px] text-muted uppercase block">Active Product Listings</span>
                <span className="text-xl font-bold text-copper mt-1 block">
                  {products.length} Robots / {components.length} Parts
                </span>
              </div>
            </div>

            {/* Banner for Full Admin Page */}
            <div className="px-6 py-2.5 bg-copper/10 border-b border-copper/25 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-copper">
                <span className="w-1.5 h-1.5 rounded-full bg-copper animate-ping" />
                <span>Dedicated full page available for managing product listings &amp; adding new models:</span>
              </div>
              <Link
                href="/admin"
                onClick={closeAdmin}
                className="text-foreground hover:text-accent font-bold underline flex items-center gap-1"
              >
                <span>Open /admin</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            {/* Tab Strip */}
            <div className="px-6 border-b border-card-border flex items-center space-x-3 bg-card/60 font-mono text-xs">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-accent text-accent font-bold'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Orders Pipeline ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'enquiries'
                    ? 'border-accent text-accent font-bold'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Custom Project Pipeline ({enquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('inventory')}
                className={`py-3.5 px-3 border-b-2 flex items-center gap-2 transition-colors ${
                  activeTab === 'inventory'
                    ? 'border-accent text-accent font-bold'
                    : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Inventory &amp; Supplies ({components.length + products.length})</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 font-mono text-xs">
              {/* TAB 1: ORDER MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4 animate-fade-in">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-2xl bg-background border border-card-border space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground text-sm">{ord.id}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-accent/10 text-accent border border-accent/30 font-bold">
                              {ord.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-muted mt-0.5">
                            Created: {ord.createdAt} · Carrier: {ord.carrier}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-base font-bold text-accent">
                            ${ord.total.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-muted">{ord.items.length} Line Items</div>
                        </div>
                      </div>

                      {/* Line items summary */}
                      <div className="p-3 rounded-xl bg-card/60 border border-card-border text-[11px] text-muted space-y-1">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>
                              {it.name} (x{it.quantity})
                            </span>
                            <span>${(it.price * it.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Advance Production Stage */}
                      <div className="flex items-center justify-between pt-2 border-t border-card-border">
                        <span className="text-[11px] text-muted">Advance Production Stage:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {(
                            [
                              'Fabrication',
                              'SMT Assembly',
                              'CNC Milling',
                              'QA & Calibration',
                              'Dispatched',
                              'Delivered',
                            ] as const
                          ).map((st) => (
                            <button
                              key={st}
                              onClick={() => updateOrderStatus(ord.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                                ord.status === st
                                  ? 'bg-accent text-background border-accent font-bold'
                                  : 'bg-card border-card-border text-muted hover:text-foreground'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: CUSTOM ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4 animate-fade-in">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-4 rounded-2xl bg-background border border-card-border space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-foreground text-sm">{enq.projectType}</div>
                          <div className="text-[11px] text-muted">
                            Client: {enq.clientName} ({enq.organization}) · {enq.email}
                          </div>
                        </div>

                        {enq.estimatedQuote && (
                          <div className="text-right">
                            <span className="text-xs text-muted block">Estimated Quote:</span>
                            <span className="text-sm font-bold text-accent">
                              ${enq.estimatedQuote.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-muted font-sans bg-card/40 p-3 rounded-xl border border-card-border/40">
                        {enq.notes}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-[11px] text-muted">
                          Target: {enq.payloadRequirement} payload · {enq.timeline}
                        </div>

                        {enq.status !== 'Approved' && (
                          <button
                            onClick={() => approveEnquiry(enq.id, enq.estimatedQuote || 12000)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-bold transition-colors"
                          >
                            Approve Official Quotation
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: INVENTORY TRACKING */}
              {activeTab === 'inventory' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between text-muted text-xs">
                    <span>Live stock levels across Nova Robo Central Assembly Warehouse:</span>
                    <Link
                      href="/admin"
                      onClick={closeAdmin}
                      className="text-accent hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Manage &amp; Add New SKUs on Full Admin Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="rounded-2xl border border-card-border overflow-hidden bg-background">
                    <table className="w-full text-left">
                      <thead className="bg-card border-b border-card-border text-muted uppercase text-[10px]">
                        <tr>
                          <th className="px-5 py-3">ITEM IDENTIFIER</th>
                          <th className="px-5 py-3">DISCIPLINE</th>
                          <th className="px-5 py-3">UNIT PRICE</th>
                          <th className="px-5 py-3">SUPPLY STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-card-border/50 text-foreground">
                        {[...products, ...components].map((item: Product | ComponentItem) => (
                          <tr key={item.id} className="hover:bg-card/40 transition-colors">
                            <td className="px-5 py-3 font-bold">{item.name}</td>
                            <td className="px-5 py-3 text-muted">{item.categoryLabel}</td>
                            <td className="px-5 py-3 text-accent">${item.price.toLocaleString()}</td>
                            <td className="px-5 py-3">
                              {item.inStock ? (
                                <span className="text-emerald-400 font-bold">In Stock</span>
                              ) : (
                                <span className="text-amber-400 font-bold">Pre-Order</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
