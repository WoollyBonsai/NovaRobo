'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../src/context/StoreContext';
import { Product, ComponentItem } from '../../src/data/products';
import PcbBackground from '../../src/components/PcbBackground';
import {
  Shield,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Package,
  Sliders,
  DollarSign,
  Cpu,
  Layers,
  Wrench,
  Search,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';

export default function AdminPage() {
  const {
    products,
    components,
    addProduct,
    updateProduct,
    deleteProduct,
    addComponent,
    updateComponent,
    deleteComponent,
    resetCatalog,
    orders,
    updateOrderStatus,
    enquiries,
    approveEnquiry,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    showToast,
  } = useStore();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'products' | 'components' | 'orders' | 'enquiries'>('products');
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Product Modals
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Component Modals
  const [isAddComponentOpen, setIsAddComponentOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<ComponentItem | null>(null);

  // New Product Form State
  const [newProductForm, setNewProductForm] = useState({
    id: '',
    name: '',
    tagline: '',
    category: 'manipulators' as Product['category'],
    categoryLabel: '6-DOF Manipulator',
    price: 8500,
    leadTime: '2-3 Weeks',
    badge: 'NEW HARDWARE',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    description: '',
    payload: '5.0 kg',
    reach: '850 mm',
    degreesOfFreedom: '6-DOF Rotary Joints',
    repeatability: '±0.02 mm (ISO 9283)',
  });

  // New Component Form State
  const [newCompForm, setNewCompForm] = useState({
    id: '',
    name: '',
    category: 'actuators' as ComponentItem['category'],
    categoryLabel: 'Modular Actuators',
    price: 520,
    inStock: true,
    stockCount: 45,
    voltage: '24V - 48V DC',
    protocol: 'CAN-FD' as ComponentItem['protocol'],
    description: '',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  });

  // Handle Login
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

  // Handle Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pId = newProductForm.id.trim() || `nr-prod-${Date.now().toString().slice(-4)}`;
    const productToAdd: Product = {
      id: pId,
      name: newProductForm.name,
      tagline: newProductForm.tagline || 'High-Precision Robotic System',
      category: newProductForm.category,
      categoryLabel: newProductForm.categoryLabel,
      price: Number(newProductForm.price),
      leadTime: newProductForm.leadTime,
      badge: newProductForm.badge,
      inStock: newProductForm.inStock,
      image: newProductForm.image,
      description: newProductForm.description,
      longDescription: newProductForm.description,
      specs: {
        payload: newProductForm.payload,
        reach: newProductForm.reach,
        degreesOfFreedom: newProductForm.degreesOfFreedom,
        repeatability: newProductForm.repeatability,
      },
      highlights: [
        'Proprietary closed-loop Field-Oriented Control',
        'Aerospace 7075-T6 aluminum CNC billet chassis',
        'Native ROS2 Jazzy / Humble driver bringup package',
      ],
      billOfMaterials: [
        { part: 'Base Flange Casting', spec: '7075-T6 Billet', tolerance: '±0.005 mm', origin: 'In-House CNC' },
        { part: 'Harmonic Drive Gearbox', spec: '1:100 Ratio Zero Backlash', tolerance: 'Arcmin < 1.0', origin: 'Nova Machining' },
      ],
      cadDownloads: [
        { format: 'STEP', filename: `${pId}_assembly_cad.step`, size: '24.8 MB' },
        { format: 'URDF', filename: `${pId}_kinematics.urdf`, size: '3.4 MB' },
      ],
      ros2Package: `ros2 launch nova_${pId.replace(/-/g, '_')}_bringup driver.launch.py hardware_interface:=canfd`,
    };

    addProduct(productToAdd);
    setIsAddProductOpen(false);
    setNewProductForm({
      id: '',
      name: '',
      tagline: '',
      category: 'manipulators',
      categoryLabel: '6-DOF Manipulator',
      price: 8500,
      leadTime: '2-3 Weeks',
      badge: 'NEW HARDWARE',
      inStock: true,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      description: '',
      payload: '5.0 kg',
      reach: '850 mm',
      degreesOfFreedom: '6-DOF Rotary Joints',
      repeatability: '±0.02 mm (ISO 9283)',
    });
  };

  // Handle Edit Product Submit
  const handleEditProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  // Handle Add Component Submit
  const handleAddComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cId = newCompForm.id.trim() || `nr-comp-${Date.now().toString().slice(-4)}`;
    const compToAdd: ComponentItem = {
      id: cId,
      name: newCompForm.name,
      category: newCompForm.category,
      categoryLabel: newCompForm.categoryLabel,
      price: Number(newCompForm.price),
      inStock: newCompForm.inStock,
      stockCount: Number(newCompForm.stockCount),
      voltage: newCompForm.voltage,
      protocol: newCompForm.protocol,
      description: newCompForm.description,
      image: newCompForm.image,
      specs: {
        'Supply Voltage': newCompForm.voltage,
        'Bus Interface': newCompForm.protocol,
        'Control Loop': '1,000 Hz FOC',
      },
    };
    addComponent(compToAdd);
    setIsAddComponentOpen(false);
    setNewCompForm({
      id: '',
      name: '',
      category: 'actuators',
      categoryLabel: 'Modular Actuators',
      price: 520,
      inStock: true,
      stockCount: 45,
      voltage: '24V - 48V DC',
      protocol: 'CAN-FD',
      description: '',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    });
  };

  // Handle Edit Component Submit
  const handleEditComponentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComponent) return;
    updateComponent(editingComponent.id, editingComponent);
    setEditingComponent(null);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // Filtered Components
  const filteredComponents = components.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.protocol.toLowerCase().includes(searchFilter.toLowerCase());
    const matchCat = selectedCategory === 'all' || c.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // -------------------------------------------------------------
  // PASSWORD GATE VIEW (When not logged in)
  // -------------------------------------------------------------
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4 relative font-sans">
        <PcbBackground />

        {/* Top return strip */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-card-border hover:border-accent text-xs font-mono text-muted hover:text-foreground transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Return to Store</span>
          </Link>
        </div>

        {/* Security Terminal Card */}
        <div className="relative z-10 w-full max-w-md bg-card/95 border border-card-border p-8 rounded-3xl shadow-glow-md backdrop-blur-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-card-elevated border border-copper/40 flex items-center justify-center text-copper shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card-elevated border border-copper/30 text-copper font-mono text-[10px] uppercase tracking-wider font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-copper animate-ping" />
              <span>SECURITY AUTHENTICATION REQUIRED</span>
            </div>

            <h1 className="text-2xl font-extrabold font-sans text-foreground">
              Nova Robo Admin Portal
            </h1>
            <p className="text-xs text-muted font-mono leading-relaxed">
              Restricted management console for product listings, inventory levels, order assembly, and custom quotations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-mono text-muted uppercase font-bold block mb-1.5">
                Master Passkey *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator passkey..."
                  className={`w-full bg-background border ${
                    authError ? 'border-red-500 text-red-300' : 'border-card-border focus:border-accent'
                  } rounded-xl px-4 py-3 text-sm font-mono text-foreground focus:outline-none transition-colors pr-10`}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="text-xs font-mono text-red-400 mt-2 flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Invalid passkey. Access denied.</span>
                </div>
              )}
            </div>

            {/* Password Hint */}
            <div className="p-3 rounded-xl bg-card-elevated border border-copper/30 text-xs font-mono text-muted flex items-center justify-between">
              <span>Required Passkey:</span>
              <span className="text-copper font-bold tracking-wider px-2 py-0.5 rounded bg-background border border-copper/40">
                notadmin
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          {/* Silkscreen Footer Mark */}
          <div className="text-center font-mono text-[10px] text-muted/50 border-t border-card-border/60 pt-4">
            NVB_SEC_OPS // 256-BIT SESSION TOKENS // REV 2.4
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN PANEL WORKBENCH
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative pb-24">
      <PcbBackground />

      {/* Top Admin Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-xl border-b border-card-border px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-card-elevated border border-card-border hover:border-accent text-muted hover:text-foreground transition-all"
              title="Return to Main Store"
            >
              <ArrowLeft className="w-4 h-4 text-accent" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold font-mono text-foreground">
                  NOVA ROBO OPERATIONS
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 uppercase">
                  ROOT AUTHENTICATED
                </span>
              </div>
              <span className="text-[10px] font-mono text-muted uppercase">
                Hardware Product Listing, Inventory &amp; Production Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-card-border hover:border-accent text-foreground text-xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
              <span>View Live Store</span>
            </Link>

            <button
              onClick={resetCatalog}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-card border border-card-border hover:border-copper text-muted hover:text-copper transition-colors flex items-center gap-1.5 text-xs"
              title="Reset catalog to factory defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3.5 py-2 rounded-xl bg-card-elevated border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-xs font-bold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 relative z-10">
        {/* KPI Telemetry Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-card/80 border border-card-border shadow-sm">
            <span className="text-[10px] text-muted uppercase block">Active Robots in Store</span>
            <span className="text-2xl font-bold text-foreground mt-1 block">{products.length} Models</span>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              {products.filter((p) => p.inStock).length} Available for Immediate Dispatch
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card/80 border border-card-border shadow-sm">
            <span className="text-[10px] text-muted uppercase block">Hardware Component SKUs</span>
            <span className="text-2xl font-bold text-copper mt-1 block">{components.length} SKUs</span>
            <span className="text-[10px] text-muted mt-1 block">
              {components.reduce((acc, c) => acc + c.stockCount, 0)} Total Units in Stock
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card/80 border border-card-border shadow-sm">
            <span className="text-[10px] text-muted uppercase block">Assembly Pipeline Orders</span>
            <span className="text-2xl font-bold text-accent mt-1 block">{orders.length} Orders</span>
            <span className="text-[10px] text-accent mt-1 block">
              ${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()} Gross Procurement
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card/80 border border-card-border shadow-sm">
            <span className="text-[10px] text-muted uppercase block">Custom Project Inquiries</span>
            <span className="text-2xl font-bold text-amber-400 mt-1 block">{enquiries.length} Requests</span>
            <span className="text-[10px] text-muted mt-1 block">Engineering SLA: 24h</span>
          </div>
        </div>

        {/* Tab Selector & Action Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-card-border">
          <div className="flex items-center space-x-2 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab('products');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'products'
                  ? 'border-accent bg-card text-accent font-bold shadow-sm'
                  : 'border-transparent text-muted hover:text-foreground hover:bg-card/50'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Robotics Catalogue ({products.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('components');
                setSelectedCategory('all');
              }}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'components'
                  ? 'border-copper bg-card text-copper font-bold shadow-sm'
                  : 'border-transparent text-muted hover:text-foreground hover:bg-card/50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Electronic Components ({components.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'border-accent bg-card text-accent font-bold shadow-sm'
                  : 'border-transparent text-muted hover:text-foreground hover:bg-card/50'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders Pipeline ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('enquiries')}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap ${
                activeTab === 'enquiries'
                  ? 'border-amber-400 bg-card text-amber-400 font-bold shadow-sm'
                  : 'border-transparent text-muted hover:text-foreground hover:bg-card/50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Custom Enquiries ({enquiries.length})</span>
            </button>
          </div>

          {/* Quick Action Button */}
          {activeTab === 'products' && (
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase hover:bg-sky-300 transition-all shadow-glow-sm flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Robot Model</span>
            </button>
          )}

          {activeTab === 'components' && (
            <button
              onClick={() => setIsAddComponentOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-copper text-background font-mono text-xs font-bold uppercase hover:bg-amber-400 transition-all shadow-glow-sm flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Component SKU</span>
            </button>
          )}
        </div>

        {/* Search & Filter Strip (For Products and Components) */}
        {(activeTab === 'products' || activeTab === 'components') && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter by name, ID, or specification..."
                className="w-full bg-card border border-card-border rounded-xl pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-accent text-xs"
              />
            </div>

            {/* Category Filter */}
            {activeTab === 'products' ? (
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'manipulators', 'mobile_robots', 'grippers', 'research_kits'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'border-accent bg-accent/15 text-accent font-bold'
                        : 'border-card-border bg-card text-muted hover:text-foreground'
                    }`}
                  >
                    {cat.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {['all', 'actuators', 'gearboxes', 'sensors', 'compute', 'power'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg border text-[11px] capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'border-copper bg-copper/15 text-copper font-bold'
                        : 'border-card-border bg-card text-muted hover:text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 1: PRODUCTS TABLE
            ======================================================== */}
        {activeTab === 'products' && (
          <div className="rounded-2xl border border-card-border overflow-hidden bg-card/60 shadow-sm font-mono text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-card-elevated border-b border-card-border text-[10px] text-muted uppercase">
                  <tr>
                    <th className="px-5 py-3.5">ROBOT HARDWARE</th>
                    <th className="px-4 py-3.5">CATEGORY</th>
                    <th className="px-4 py-3.5">PRICE (USD)</th>
                    <th className="px-4 py-3.5">LEAD TIME</th>
                    <th className="px-4 py-3.5">PAYLOAD / REACH</th>
                    <th className="px-4 py-3.5">STATUS</th>
                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50 text-foreground">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted">
                        No products match the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-card transition-colors">
                        {/* Robot Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-background border border-card-border overflow-hidden shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground text-sm">{p.name}</div>
                              <div className="text-[10px] text-muted">{p.id.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-4 text-muted">
                          <span className="px-2 py-0.5 rounded bg-background border border-card-border text-[10px]">
                            {p.categoryLabel}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4 font-bold text-accent text-sm">
                          ${p.price.toLocaleString()}
                        </td>

                        {/* Lead Time */}
                        <td className="px-4 py-4 text-muted">{p.leadTime}</td>

                        {/* Specs */}
                        <td className="px-4 py-4 text-muted text-[11px]">
                          <div>Payload: {p.specs.payload || 'N/A'}</div>
                          <div>Reach: {p.specs.reach || 'N/A'}</div>
                        </td>

                        {/* Stock Status Toggle */}
                        <td className="px-4 py-4">
                          <button
                            onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                              p.inStock
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                : 'bg-red-500/15 border-red-500/40 text-red-400'
                            }`}
                            title="Click to toggle stock status"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-400' : 'bg-red-400'}`}
                            />
                            <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-2 rounded-lg bg-card-elevated border border-card-border hover:border-accent text-muted hover:text-accent transition-colors"
                              title="Edit product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                  deleteProduct(p.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-card-elevated border border-card-border hover:border-red-500 text-muted hover:text-red-400 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: COMPONENTS TABLE
            ======================================================== */}
        {activeTab === 'components' && (
          <div className="rounded-2xl border border-card-border overflow-hidden bg-card/60 shadow-sm font-mono text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-card-elevated border-b border-card-border text-[10px] text-muted uppercase">
                  <tr>
                    <th className="px-5 py-3.5">COMPONENT HARDWARE</th>
                    <th className="px-4 py-3.5">BUS INTERFACE</th>
                    <th className="px-4 py-3.5">PRICE (USD)</th>
                    <th className="px-4 py-3.5">VOLTAGE</th>
                    <th className="px-4 py-3.5">INVENTORY UNITS</th>
                    <th className="px-4 py-3.5">STATUS</th>
                    <th className="px-4 py-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50 text-foreground">
                  {filteredComponents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-muted">
                        No components match the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredComponents.map((c) => (
                      <tr key={c.id} className="hover:bg-card transition-colors">
                        {/* Name & ID */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-background border border-card-border overflow-hidden shrink-0">
                              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-foreground text-sm">{c.name}</div>
                              <div className="text-[10px] text-muted">{c.id.toUpperCase()}</div>
                            </div>
                          </div>
                        </td>

                        {/* Protocol */}
                        <td className="px-4 py-4">
                          <span className="px-2 py-0.5 rounded bg-copper/15 border border-copper/35 text-copper text-[10px] font-bold">
                            {c.protocol}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-4 py-4 font-bold text-copper text-sm">
                          ${c.price.toLocaleString()}
                        </td>

                        {/* Voltage */}
                        <td className="px-4 py-4 text-muted">{c.voltage}</td>

                        {/* Inventory Count Stepper */}
                        <td className="px-4 py-4">
                          <div className="inline-flex items-center border border-card-border rounded-lg bg-background">
                            <button
                              onClick={() =>
                                updateComponent(c.id, {
                                  stockCount: Math.max(0, c.stockCount - 1),
                                  inStock: c.stockCount - 1 > 0,
                                })
                              }
                              className="px-2 py-1 text-muted hover:text-foreground"
                            >
                              -
                            </button>
                            <span className="px-3 font-bold text-foreground">{c.stockCount}</span>
                            <button
                              onClick={() =>
                                updateComponent(c.id, {
                                  stockCount: c.stockCount + 1,
                                  inStock: true,
                                })
                              }
                              className="px-2 py-1 text-muted hover:text-foreground"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <button
                            onClick={() => updateComponent(c.id, { inStock: !c.inStock })}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                              c.inStock
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                : 'bg-red-500/15 border-red-500/40 text-red-400'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${c.inStock ? 'bg-emerald-400' : 'bg-red-400'}`}
                            />
                            <span>{c.inStock ? 'In Stock' : 'Out of Stock'}</span>
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingComponent(c)}
                              className="p-2 rounded-lg bg-card-elevated border border-card-border hover:border-copper text-muted hover:text-copper transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete component ${c.name}?`)) {
                                  deleteComponent(c.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-card-elevated border border-card-border hover:border-red-500 text-muted hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: ORDERS PIPELINE
            ======================================================== */}
        {activeTab === 'orders' && (
          <div className="rounded-2xl border border-card-border overflow-hidden bg-card/60 shadow-sm font-mono text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-card-elevated border-b border-card-border text-[10px] text-muted uppercase">
                  <tr>
                    <th className="px-5 py-3.5">ORDER ID</th>
                    <th className="px-4 py-3.5">ITEMS ORDERED</th>
                    <th className="px-4 py-3.5">TOTAL</th>
                    <th className="px-4 py-3.5">CURRENT PRODUCTION STATUS</th>
                    <th className="px-4 py-3.5">ADVANCE STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50 text-foreground">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-card transition-colors">
                      <td className="px-5 py-4 font-bold text-accent">{ord.id}</td>
                      <td className="px-4 py-4 text-muted">
                        {ord.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                      </td>
                      <td className="px-4 py-4 font-bold text-foreground">
                        ${ord.total.toLocaleString()}
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-accent/15 border border-accent/35 text-accent">
                          {ord.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-background border border-card-border rounded-lg px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:border-accent"
                        >
                          <option value="Fabrication">Fabrication</option>
                          <option value="SMT Assembly">SMT Assembly</option>
                          <option value="CNC Milling">CNC Milling</option>
                          <option value="QA & Calibration">QA &amp; Calibration</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CUSTOM PROJECT ENQUIRIES
            ======================================================== */}
        {activeTab === 'enquiries' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-6 rounded-2xl bg-card border border-card-border shadow-sm space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-accent font-bold text-sm block">{enq.projectType}</span>
                    <span className="text-[10px] text-muted">{enq.id} · {enq.createdAt}</span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      enq.status === 'Quotation Ready'
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-background border border-card-border/80 space-y-1 text-muted text-[11px]">
                  <div><strong className="text-foreground">Client:</strong> {enq.clientName} ({enq.organization})</div>
                  <div><strong className="text-foreground">Email:</strong> {enq.email}</div>
                  <div><strong className="text-foreground">Payload / Reach:</strong> {enq.payloadRequirement} / {enq.reachRequirement}</div>
                  <div><strong className="text-foreground">Environment:</strong> {enq.environment}</div>
                  <div><strong className="text-foreground">Budget:</strong> {enq.budgetRange} ({enq.timeline})</div>
                  {enq.notes && <div className="pt-1 text-foreground italic">"{enq.notes}"</div>}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-card-border">
                  <span className="text-foreground font-bold">
                    Est. Quote: <span className="text-accent">${(enq.estimatedQuote || 14500).toLocaleString()}</span>
                  </span>

                  {enq.status !== 'Quotation Ready' && (
                    <button
                      onClick={() => approveEnquiry(enq.id, 16800)}
                      className="px-3.5 py-1.5 rounded-xl bg-accent text-background font-bold text-[11px] uppercase hover:bg-sky-300 transition-colors"
                    >
                      Approve Quote ($16,800)
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ========================================================
          ADD PRODUCT MODAL
          ======================================================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-card border border-card-border rounded-3xl p-6 sm:p-8 shadow-glow-lg font-mono text-xs max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex items-center gap-2 text-accent font-bold text-sm">
                <Plus className="w-4 h-4" />
                <span>ADD NEW ROBOT MODEL TO CATALOGUE</span>
              </div>
              <button onClick={() => setIsAddProductOpen(false)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Product ID (e.g. nr-k7-heavy)</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.id}
                    onChange={(e) => setNewProductForm({ ...newProductForm, id: e.target.value })}
                    placeholder="nr-k7-heavy"
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Robot Model Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.name}
                    onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                    placeholder="Nova Heavy-Payload 7"
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Category *</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as Product['category'];
                      const labels: Record<Product['category'], string> = {
                        manipulators: '6-DOF Manipulator',
                        mobile_robots: 'Autonomous Mobile Robot',
                        grippers: 'Adaptive Gripper',
                        research_kits: 'Research & Education Kit',
                      };
                      setNewProductForm({
                        ...newProductForm,
                        category: cat,
                        categoryLabel: labels[cat],
                      });
                    }}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="manipulators">6-DOF Manipulator</option>
                    <option value="mobile_robots">Autonomous Mobile Robot (AMR)</option>
                    <option value="grippers">Adaptive Gripper</option>
                    <option value="research_kits">Research &amp; Education Kit</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Payload (kg)</label>
                  <input
                    type="text"
                    value={newProductForm.payload}
                    onChange={(e) => setNewProductForm({ ...newProductForm, payload: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Reach (mm)</label>
                  <input
                    type="text"
                    value={newProductForm.reach}
                    onChange={(e) => setNewProductForm({ ...newProductForm, reach: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Tagline / Short Hook</label>
                <input
                  type="text"
                  value={newProductForm.tagline}
                  onChange={(e) => setNewProductForm({ ...newProductForm, tagline: e.target.value })}
                  placeholder="Sub-millimeter repeatability for cleanroom automation"
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProductForm.image}
                  onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Engineering Description</label>
                <textarea
                  rows={3}
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  placeholder="Detailed specifications and mechanical architecture overview..."
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 rounded-xl bg-card-elevated text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accent text-background font-bold uppercase hover:bg-sky-300 transition-colors shadow-glow-sm"
                >
                  Publish Robot to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT PRODUCT MODAL
          ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-card border border-card-border rounded-3xl p-6 sm:p-8 shadow-glow-lg font-mono text-xs max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex items-center gap-2 text-accent font-bold text-sm">
                <Edit3 className="w-4 h-4" />
                <span>EDIT ROBOT: {editingProduct.name}</span>
              </div>
              <button onClick={() => setEditingProduct(null)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Lead Time</label>
                  <input
                    type="text"
                    value={editingProduct.leadTime}
                    onChange={(e) => setEditingProduct({ ...editingProduct, leadTime: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Stock Status</label>
                  <select
                    value={editingProduct.inStock ? 'true' : 'false'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === 'true' })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-card-elevated text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accent text-background font-bold uppercase hover:bg-sky-300"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          ADD COMPONENT MODAL
          ======================================================== */}
      {isAddComponentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-card border border-copper/40 rounded-3xl p-6 sm:p-8 shadow-glow-lg font-mono text-xs max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex items-center gap-2 text-copper font-bold text-sm">
                <Plus className="w-4 h-4" />
                <span>ADD NEW HARDWARE COMPONENT SKU</span>
              </div>
              <button onClick={() => setIsAddComponentOpen(false)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddComponentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Component ID</label>
                  <input
                    type="text"
                    required
                    value={newCompForm.id}
                    onChange={(e) => setNewCompForm({ ...newCompForm, id: e.target.value })}
                    placeholder="nr-foc-dual"
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Component Name *</label>
                  <input
                    type="text"
                    required
                    value={newCompForm.name}
                    onChange={(e) => setNewCompForm({ ...newCompForm, name: e.target.value })}
                    placeholder="Dual-Axis FOC Servo Driver"
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Category *</label>
                  <select
                    value={newCompForm.category}
                    onChange={(e) => {
                      const cat = e.target.value as ComponentItem['category'];
                      const labels: Record<ComponentItem['category'], string> = {
                        actuators: 'Modular Actuators',
                        gearboxes: 'Strain-Wave Gearboxes',
                        sensors: 'Perception & LiDAR',
                        compute: 'Carrier Boards & MCU',
                        power: 'Power & Distribution',
                      };
                      setNewCompForm({
                        ...newCompForm,
                        category: cat,
                        categoryLabel: labels[cat],
                      });
                    }}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  >
                    <option value="actuators">Modular Actuators</option>
                    <option value="gearboxes">Strain-Wave Gearboxes</option>
                    <option value="sensors">Perception &amp; LiDAR</option>
                    <option value="compute">Carrier Boards &amp; MCU</option>
                    <option value="power">Power &amp; Distribution</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block mb-1">Bus Interface *</label>
                  <select
                    value={newCompForm.protocol}
                    onChange={(e) => setNewCompForm({ ...newCompForm, protocol: e.target.value as any })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  >
                    <option value="CAN-FD">CAN-FD (1-5 Mbps)</option>
                    <option value="EtherCAT">EtherCAT (100 Mbps)</option>
                    <option value="UART">UART / RS485</option>
                    <option value="SPI">SPI High-Speed</option>
                    <option value="I2C">I2C Fast Mode</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    required
                    value={newCompForm.price}
                    onChange={(e) => setNewCompForm({ ...newCompForm, price: Number(e.target.value) })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Inventory Quantity *</label>
                  <input
                    type="number"
                    required
                    value={newCompForm.stockCount}
                    onChange={(e) => setNewCompForm({ ...newCompForm, stockCount: Number(e.target.value) })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Supply Voltage</label>
                  <input
                    type="text"
                    value={newCompForm.voltage}
                    onChange={(e) => setNewCompForm({ ...newCompForm, voltage: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newCompForm.image}
                    onChange={(e) => setNewCompForm({ ...newCompForm, image: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Component Description</label>
                <textarea
                  rows={2}
                  value={newCompForm.description}
                  onChange={(e) => setNewCompForm({ ...newCompForm, description: e.target.value })}
                  placeholder="Key electrical characteristics, thermal ratings, pinout interfaces..."
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setIsAddComponentOpen(false)}
                  className="px-4 py-2 rounded-xl bg-card-elevated text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-copper text-background font-bold uppercase hover:bg-amber-400"
                >
                  Save Component SKU
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          EDIT COMPONENT MODAL
          ======================================================== */}
      {editingComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-xl bg-card border border-copper/40 rounded-3xl p-6 sm:p-8 shadow-glow-lg font-mono text-xs max-h-[92vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-card-border pb-4">
              <div className="flex items-center gap-2 text-copper font-bold text-sm">
                <Edit3 className="w-4 h-4" />
                <span>EDIT COMPONENT: {editingComponent.name}</span>
              </div>
              <button onClick={() => setEditingComponent(null)} className="text-muted hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditComponentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted block mb-1">Name</label>
                  <input
                    type="text"
                    value={editingComponent.name}
                    onChange={(e) => setEditingComponent({ ...editingComponent, name: e.target.value })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    value={editingComponent.price}
                    onChange={(e) => setEditingComponent({ ...editingComponent, price: Number(e.target.value) })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Inventory Units</label>
                  <input
                    type="number"
                    value={editingComponent.stockCount}
                    onChange={(e) =>
                      setEditingComponent({
                        ...editingComponent,
                        stockCount: Number(e.target.value),
                        inStock: Number(e.target.value) > 0,
                      })
                    }
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Bus Interface</label>
                  <select
                    value={editingComponent.protocol}
                    onChange={(e) => setEditingComponent({ ...editingComponent, protocol: e.target.value as any })}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                  >
                    <option value="CAN-FD">CAN-FD</option>
                    <option value="EtherCAT">EtherCAT</option>
                    <option value="UART">UART</option>
                    <option value="SPI">SPI</option>
                    <option value="I2C">I2C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingComponent.description}
                  onChange={(e) => setEditingComponent({ ...editingComponent, description: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-card-border">
                <button
                  type="button"
                  onClick={() => setEditingComponent(null)}
                  className="px-4 py-2 rounded-xl bg-card-elevated text-muted hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-copper text-background font-bold uppercase hover:bg-amber-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
