'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Shield,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    toggleCart,
    cart,
    removeFromCart,
    updateQuantity,
    setWarranty,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    openCheckout,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-card border-l border-card-border h-full flex flex-col justify-between shadow-glow-lg">
        {/* Cart Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <span className="font-mono text-sm font-bold text-foreground">
              HARDWARE CART ({cart.reduce((a, b) => a + b.quantity, 0)})
            </span>
          </div>

          <button
            onClick={() => toggleCart(false)}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted space-y-3 font-mono">
              <ShoppingBag className="w-12 h-12 text-card-border stroke-1" />
              <div className="text-foreground text-sm font-bold">Your cart is empty</div>
              <p className="text-xs">Explore our robotics catalogue or electronic components store to begin.</p>
              <button
                onClick={() => toggleCart(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase hover:bg-accent/20"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-background/60 border border-card-border space-y-3 font-mono text-xs"
              >
                <div className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-card-border shrink-0 bg-background"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-accent block uppercase">{item.categoryLabel}</span>
                    <h4 className="font-bold text-foreground truncate text-sm">{item.name}</h4>
                    <div className="text-accent font-semibold mt-1">
                      ${(item.price + item.warrantyCost).toLocaleString()} each
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted hover:text-red-400 p-1 transition-colors shrink-0"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Warranty Selection Pill */}
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-card-border/40">
                  <span className="text-muted flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" /> Warranty:
                  </span>
                  <select
                    value={item.warranty}
                    onChange={(e) => setWarranty(item.id, e.target.value as 'standard' | 'enterprise')}
                    className="bg-card border border-card-border text-foreground text-[10px] rounded-lg px-2 py-1 focus:outline-none focus:border-accent"
                  >
                    <option value="standard">Standard 1-Yr (Free)</option>
                    <option value="enterprise">Enterprise 3-Yr (+15%)</option>
                  </select>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-muted text-[11px]">Quantity</span>
                  <div className="flex items-center border border-card-border rounded-lg bg-card text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-muted hover:text-foreground"
                    >
                      -
                    </button>
                    <span className="px-2 text-foreground font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-muted hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-card-border bg-background/60 space-y-4 font-mono text-xs">
            <div className="space-y-1.5 text-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-foreground">${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-foreground">${cartTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-accent" /> Crate Freight Shipping
                </span>
                <span className="text-foreground">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE (Tier 1 Lab)</span>
                  ) : (
                    `$${cartShipping}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-card-border text-sm font-bold text-foreground">
                <span>Total Amount</span>
                <span className="text-accent text-lg">${cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={openCheckout}
              className="w-full py-3.5 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
