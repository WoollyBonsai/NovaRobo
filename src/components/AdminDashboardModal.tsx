'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, COMPONENTS, Order, Product, ComponentItem } from '../data/products';
import {
  X,
  Shield,
  Package,
  Sliders,
  Wrench,
} from 'lucide-react';

export default function AdminDashboardModal() {
  const {
    isAdminOpen,
    closeAdmin,
    orders,
    updateOrderStatus,
    enquiries,
    approveEnquiry,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries' | 'inventory'>('orders');

  if (!isAdminOpen) return null;

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const activeProductionCount = orders.filter((o) => o.status !== 'Delivered').length;
  const pendingEnquiriesCount = enquiries.filter((e) => e.status !== 'Approved').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-card border border-accent/40 rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-foreground">
                NOVA ROBO ADMINISTRATIVE DASHBOARD &amp; OPERATIONS
              </h3>
              <div className="text-[10px] font-mono text-muted">
                Executive Control · Products, Orders, Production Lines &amp; Custom Project Enquiries
              </div>
            </div>
          </div>

          <button
            onClick={closeAdmin}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Telemetry KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-background/60 border-b border-card-border font-mono text-xs">
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
            <span className="text-[10px] text-muted uppercase block">Hardware Quality Yield</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">99.8% Nominal</span>
          </div>
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
            <span>Orders &amp; Assembly Control ({orders.length})</span>
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
            <span>Inventory &amp; Supplies ({COMPONENTS.length + PRODUCTS.length})</span>
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
                        Customer: {ord.shippingAddress} · Tracking: {ord.trackingNumber}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-accent">${ord.total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Status Progression Controls */}
                  <div className="pt-2 border-t border-card-border/60 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] text-muted uppercase">Advance Production Stage:</span>
                    {(['SMT Assembly', 'CNC Milling', 'QA & Calibration', 'Dispatched', 'Delivered'] as Order['status'][]).map(
                      (st) => (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(ord.id, st)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] transition-colors border ${
                            ord.status === st
                              ? 'bg-accent text-background font-bold border-accent'
                              : 'bg-card text-muted hover:text-foreground border-card-border hover:border-accent'
                          }`}
                        >
                          {st}
                        </button>
                      )
                    )}
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
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{enq.projectType}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-muted">
                        Client: {enq.clientName} ({enq.organization}) · {enq.email}
                      </div>
                    </div>

                    {enq.estimatedQuote && (
                      <div className="text-right">
                        <span className="text-[10px] text-muted block uppercase">Current Quote</span>
                        <span className="text-base font-bold text-emerald-400">
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
              <div className="text-muted text-xs">
                Live stock levels across Nova Robo Central Assembly Warehouse:
              </div>

              <div className="rounded-2xl border border-card-border overflow-hidden bg-background">
                <table className="w-full text-left">
                  <thead className="bg-card border-b border-card-border text-muted uppercase text-[10px]">
                    <tr>
                      <th className="px-5 py-3">ITEM IDENTIFIER</th>
                      <th className="px-5 py-3">DISCIPLINE</th>
                      <th className="px-5 py-3">UNIT PRICE</th>
                      <th className="px-5 py-3">SUPPLY STATUS</th>
                      <th className="px-5 py-3">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/50 text-foreground">
                    {[...PRODUCTS, ...COMPONENTS].map((item: Product | ComponentItem) => (
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
                        <td className="px-5 py-3">
                          <button
                            onClick={() => showToast(`Inventory calibrated for ${item.name}`)}
                            className="text-accent text-[11px] hover:underline"
                          >
                            Calibrate Count
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
