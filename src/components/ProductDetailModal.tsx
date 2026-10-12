'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShoppingBag,
  Heart,
  Download,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  FileText,
  Wrench,
  Copy,
  Check,
} from 'lucide-react';

export default function ProductDetailModal() {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    openCustomProject,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'bom' | 'cad'>('overview');
  const [selectedWarranty, setSelectedWarranty] = useState<'standard' | 'enterprise'>('standard');
  const [quantity, setQuantity] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!selectedProduct) return null;

  const isSaved = isInWishlist(selectedProduct.id);
  const enterpriseFee = Math.round(selectedProduct.price * 0.15);
  const finalPrice =
    (selectedProduct.price + (selectedWarranty === 'enterprise' ? enterpriseFee : 0)) * quantity;

  const copyRosCommand = () => {
    navigator.clipboard.writeText(selectedProduct.ros2Package);
    setCopiedCode(true);
    showToast('Copied ROS2 launch command to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-card border border-card-border rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-card-border bg-background/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent uppercase tracking-wider font-bold">
              {selectedProduct.categoryLabel}
            </span>
            <span className="text-card-border">/</span>
            <span className="text-xs font-mono text-muted">{selectedProduct.id.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className="p-2 rounded-xl bg-card border border-card-border hover:border-accent text-foreground transition-colors"
              title={isSaved ? 'Remove from saved' : 'Save product'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-accent text-accent' : ''}`} />
            </button>
            <button
              onClick={closeProductDetail}
              className="p-2 rounded-xl bg-card border border-card-border hover:border-accent text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* Header Hero Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Box */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden bg-background border border-card-border">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent backdrop-blur-md">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            {/* Title & Quick Configuration */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-sans text-foreground">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-accent font-mono">{selectedProduct.tagline}</p>
              <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
                {selectedProduct.longDescription}
              </p>

              {/* Warranty Tier Selector */}
              <div className="pt-2">
                <span className="text-xs font-mono text-foreground font-semibold block mb-2">
                  HARDWARE WARRANTY TIER:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedWarranty('standard')}
                    className={`cursor-pointer p-3.5 rounded-xl border text-xs font-mono transition-all ${
                      selectedWarranty === 'standard'
                        ? 'border-accent bg-accent/10 text-foreground'
                        : 'border-card-border bg-background/50 text-muted hover:border-card-border'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Standard 1-Year</span>
                      <span className="text-accent font-semibold">Included</span>
                    </div>
                    <div className="text-[11px] text-muted mt-1">Full parts replacement &amp; standard repair support.</div>
                  </div>

                  <div
                    onClick={() => setSelectedWarranty('enterprise')}
                    className={`cursor-pointer p-3.5 rounded-xl border text-xs font-mono transition-all ${
                      selectedWarranty === 'enterprise'
                        ? 'border-accent bg-accent/10 text-foreground'
                        : 'border-card-border bg-background/50 text-muted hover:border-card-border'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>Enterprise 3-Year</span>
                      <span className="text-accent font-semibold">+${enterpriseFee}</span>
                    </div>
                    <div className="text-[11px] text-muted mt-1">24h advance hardware hot-swap &amp; dedicated engineer SLA.</div>
                  </div>
                </div>
              </div>

              {/* Price & Cart Actions */}
              <div className="pt-4 border-t border-card-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-3xl font-extrabold font-mono text-foreground">
                    ${finalPrice.toLocaleString()}
                  </div>
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock · Lead time: {selectedProduct.leadTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-card-border rounded-xl bg-background font-mono text-xs">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-muted hover:text-foreground"
                    >
                      -
                    </button>
                    <span className="px-2 text-foreground font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-muted hover:text-foreground"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(selectedProduct, quantity, selectedWarranty);
                      closeProductDetail();
                    }}
                    className="px-6 py-3 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-md flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deep Exploration Tabs Strip */}
          <div className="border-b border-card-border flex items-center space-x-2 pt-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 font-mono text-xs border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Highlights
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-4 font-mono text-xs border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              <FileText className="w-4 h-4" />
              Engineering Specs
            </button>
            <button
              onClick={() => setActiveTab('bom')}
              className={`pb-3 px-4 font-mono text-xs border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'bom'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              <Layers className="w-4 h-4" />
              Bill of Materials (BOM)
            </button>
            <button
              onClick={() => setActiveTab('cad')}
              className={`pb-3 px-4 font-mono text-xs border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'cad'
                  ? 'border-accent text-accent font-bold'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              <Download className="w-4 h-4" />
              3D CAD &amp; ROS2
            </button>
          </div>

          {/* Tab 1: Highlights & Story */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedProduct.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background/60 border border-card-border">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs font-mono text-foreground leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-background border border-card-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold font-mono text-foreground">Need a Custom Modification?</h4>
                  <p className="text-xs text-muted font-sans mt-1">
                    Nova Robo engineers can adapt flange designs, custom torque curves, and vacuum-sealed joints for your exact application.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeProductDetail();
                    openCustomProject();
                  }}
                  className="px-4 py-2 rounded-xl bg-card border border-accent/40 text-accent font-mono text-xs uppercase hover:bg-card/80 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  Request Custom Quote
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Full Engineering Specs Matrix */}
          {activeTab === 'specs' && (
            <div className="rounded-2xl border border-card-border overflow-hidden bg-background animate-fade-in font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-card border-b border-card-border text-muted uppercase text-[10px]">
                  <tr>
                    <th className="px-6 py-3 font-bold">SPECIFICATION ATTRIBUTE</th>
                    <th className="px-6 py-3 font-bold">ENGINEERING VALUE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-card-border/50 text-foreground">
                  {Object.entries(selectedProduct.specs).map(([attr, val]) => (
                    <tr key={attr} className="hover:bg-card/40 transition-colors">
                      <td className="px-6 py-3.5 text-muted uppercase font-semibold">
                        {attr.replace(/([A-Z])/g, ' $1')}
                      </td>
                      <td className="px-6 py-3.5 font-bold text-accent">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Bill of Materials & Part Origins */}
          {activeTab === 'bom' && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-xs font-mono text-muted">
                Transparent component breakdown showing tolerances and in-house fabrication origins:
              </div>
              <div className="rounded-2xl border border-card-border overflow-hidden bg-background font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-card border-b border-card-border text-muted uppercase text-[10px]">
                    <tr>
                      <th className="px-6 py-3 font-bold">SUBSYSTEM PART</th>
                      <th className="px-6 py-3 font-bold">SPECIFICATION</th>
                      <th className="px-6 py-3 font-bold">TOLERANCE</th>
                      <th className="px-6 py-3 font-bold">ORIGIN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border/50 text-foreground">
                    {selectedProduct.billOfMaterials.map((item, idx) => (
                      <tr key={idx} className="hover:bg-card/40 transition-colors">
                        <td className="px-6 py-3.5 font-semibold text-foreground">{item.part}</td>
                        <td className="px-6 py-3.5 text-muted">{item.spec}</td>
                        <td className="px-6 py-3.5 text-accent">{item.tolerance}</td>
                        <td className="px-6 py-3.5 text-muted">{item.origin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: CAD Models & ROS2 Package */}
          {activeTab === 'cad' && (
            <div className="space-y-6 animate-fade-in">
              {/* CAD Downloads */}
              <div>
                <h4 className="text-xs font-mono text-foreground font-bold uppercase mb-3">
                  DOWNLOADABLE 3D CAD &amp; SPECIFICATION FILES:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedProduct.cadDownloads.map((cad, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-background border border-card-border flex flex-col justify-between space-y-3 font-mono text-xs"
                    >
                      <div>
                        <span className="text-[10px] text-accent block uppercase">{cad.format}</span>
                        <span className="font-semibold text-foreground block truncate">{cad.filename}</span>
                        <span className="text-[10px] text-muted">{cad.size}</span>
                      </div>
                      <button
                        onClick={() => showToast(`Starting download: ${cad.filename}`)}
                        className="w-full py-2 rounded-lg bg-card border border-card-border hover:border-accent text-foreground text-[11px] font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5 text-accent" /> Download File
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROS2 Package Quickstart */}
              <div className="p-5 rounded-2xl bg-background border border-card-border space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent font-bold">
                    <Terminal className="w-4 h-4" />
                    <span>NATIVE ROS2 JAZZY / HUMBLE BRINGUP COMMAND:</span>
                  </div>
                  <button
                    onClick={copyRosCommand}
                    className="p-1.5 rounded-lg bg-card text-muted hover:text-foreground text-xs flex items-center gap-1 font-mono transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-card/80 border border-card-border/80 font-mono text-xs text-sky-300 overflow-x-auto">
                  <code>{selectedProduct.ros2Package}</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
