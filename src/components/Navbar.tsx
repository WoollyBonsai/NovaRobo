'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  User,
  Heart,
  Sliders,
  Terminal,
  Cpu,
  Layers,
  Wrench,
  Search,
  Menu,
  X,
  Shield,
  LifeBuoy,
} from 'lucide-react';

export default function Navbar() {
  const {
    cartCount,
    toggleCart,
    wishlist,
    openAccount,
    openCustomProject,
    openSupport,
    openAdmin,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-xl border-b border-card-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollTo('hero')}>
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-card to-background border border-accent/40 flex items-center justify-center p-1.5 shadow-glow-sm group hover:border-accent transition-colors">
            <img src="/nova-robo-logo.png" alt="Nova Robo" className="w-full h-full object-contain filter drop-shadow" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-foreground font-mono font-bold tracking-widest text-base group-hover:text-accent transition-colors">
                NOVA ROBO
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono tracking-widest bg-accent/10 text-accent border border-accent/30 uppercase">
                HARDWARE
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-muted uppercase">
              BUILD · AUTOMATE · INNOVATE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 bg-card/60 p-1.5 rounded-full border border-card-border">
          <button
            onClick={() => scrollTo('hero')}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-accent" />
            3D Arm Stage
          </button>
          <button
            onClick={() => scrollTo('catalogue')}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-accent" />
            Robotics
          </button>
          <button
            onClick={() => scrollTo('components')}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-accent" />
            Components
          </button>
          <button
            onClick={openCustomProject}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Wrench className="w-3.5 h-3.5 text-accent" />
            Custom Project
          </button>
          <button
            onClick={() => scrollTo('lab')}
            className="px-4 py-1.5 rounded-full text-xs font-mono text-muted hover:text-foreground hover:bg-white/5 transition-all flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-accent" />
            Lab Docs
          </button>
        </nav>

        {/* Right Tools & Action Strip */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Search */}
          {searchOpen ? (
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hardware, specs, CAN-FD..."
                className="bg-card border border-accent/40 text-foreground text-xs font-mono rounded-full px-3.5 py-1.5 w-44 sm:w-60 focus:outline-none focus:border-accent"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="absolute right-2 text-muted hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-colors"
              title="Search store"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Support Ticket Modal Toggle */}
          <button
            onClick={openSupport}
            className="hidden sm:flex items-center gap-1.5 p-2 rounded-xl text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-colors text-xs font-mono"
            title="Engineering Support"
          >
            <LifeBuoy className="w-4 h-4 text-accent" />
            <span className="hidden xl:inline">Support</span>
          </button>

          {/* Admin Dashboard */}
          <button
            onClick={openAdmin}
            className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-colors"
            title="Admin & Operations Portal"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Wishlist */}
          <button
            onClick={() => openAccount('wishlist')}
            className="relative p-2 rounded-xl text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-colors"
            title="Saved Items"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-background text-[10px] font-mono font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account & Orders */}
          <button
            onClick={() => openAccount('orders')}
            className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-card border border-transparent hover:border-card-border transition-colors"
            title="Customer Account & Orders"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Shopping Cart Drawer Toggle */}
          <button
            onClick={() => toggleCart(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-card border border-card-border hover:border-accent text-foreground transition-all shadow-glow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono font-semibold hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-accent text-background font-mono text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-muted hover:text-foreground hover:bg-card"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card/95 border-b border-card-border px-4 py-4 space-y-2 backdrop-blur-xl">
          <button
            onClick={() => scrollTo('hero')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <Cpu className="w-4 h-4 text-accent" /> 3D Arm Stage
          </button>
          <button
            onClick={() => scrollTo('catalogue')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-accent" /> Robotics Catalogue
          </button>
          <button
            onClick={() => scrollTo('components')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4 text-accent" /> Electronic Components
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openCustomProject();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-accent" /> Custom Project Quotation
          </button>
          <button
            onClick={() => scrollTo('lab')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <Terminal className="w-4 h-4 text-accent" /> Nova Lab Tutorials &amp; Docs
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openSupport();
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-mono text-muted hover:text-foreground hover:bg-white/5 flex items-center gap-2"
          >
            <LifeBuoy className="w-4 h-4 text-accent" /> Engineering Support
          </button>
        </div>
      )}
    </header>
  );
}
