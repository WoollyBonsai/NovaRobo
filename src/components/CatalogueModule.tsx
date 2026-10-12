'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, Product } from '../data/products';
import {
  ShoppingBag,
  Heart,
  Eye,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Filter,
} from 'lucide-react';

export default function CatalogueModule() {
  const { addToCart, toggleWishlist, isInWishlist, openProductDetail, searchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Robotics' },
    { id: 'manipulators', label: 'Manipulator Arms' },
    { id: 'mobile_robots', label: 'Autonomous Mobile (AMRs)' },
    { id: 'grippers', label: 'End-Effectors & Grippers' },
    { id: 'research_kits', label: 'Research Kits' },
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogue" className="py-24 bg-card/30 relative border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              SYSTEM SOLUTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-foreground">
              Robotics &amp; Automation Catalogue
            </h2>
            <p className="text-sm text-muted font-sans mt-2 max-w-xl">
              Production-ready manipulators, mobile platforms, and adaptive end-effectors with full ROS2 integration
              and open hardware specifications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-card/80 p-1.5 rounded-2xl border border-card-border">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-accent text-background font-bold shadow-glow-sm'
                    : 'text-muted hover:text-foreground hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isSaved = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group relative rounded-3xl bg-card border border-card-border overflow-hidden flex flex-col justify-between hover:border-accent/60 transition-all duration-300 hover:shadow-glow-md"
              >
                {/* Image & Badges */}
                <div className="relative aspect-video w-full overflow-hidden bg-background">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {product.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent backdrop-blur-md">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-card/80 border border-card-border text-foreground hover:text-accent backdrop-blur-md transition-colors"
                    title={isSaved ? 'Remove from saved' : 'Save product'}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-accent text-accent' : ''}`} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-accent uppercase tracking-wider mb-1">
                      {product.categoryLabel}
                    </div>
                    <h3 className="text-xl font-bold font-sans text-foreground group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-muted font-sans line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Quick Specs Pill Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-card-border/60 font-mono text-[11px]">
                    {product.specs.payload && (
                      <div className="bg-background/60 p-2 rounded-xl border border-card-border/40">
                        <span className="text-muted block text-[10px]">PAYLOAD</span>
                        <span className="font-semibold text-foreground">{product.specs.payload}</span>
                      </div>
                    )}
                    {product.specs.repeatability && (
                      <div className="bg-background/60 p-2 rounded-xl border border-card-border/40">
                        <span className="text-muted block text-[10px]">REPEATABILITY</span>
                        <span className="font-semibold text-foreground">{product.specs.repeatability}</span>
                      </div>
                    )}
                    {product.specs.reach && (
                      <div className="bg-background/60 p-2 rounded-xl border border-card-border/40">
                        <span className="text-muted block text-[10px]">REACH</span>
                        <span className="font-semibold text-foreground">{product.specs.reach}</span>
                      </div>
                    )}
                    {product.specs.degreesOfFreedom && (
                      <div className="bg-background/60 p-2 rounded-xl border border-card-border/40">
                        <span className="text-muted block text-[10px]">DEGREES OF FREEDOM</span>
                        <span className="font-semibold text-foreground">{product.specs.degreesOfFreedom}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Action Strip */}
                  <div className="pt-4 border-t border-card-border flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold font-mono text-foreground">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted">
                        {product.inStock ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Ready to Ship</span>
                          </>
                        ) : (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{product.leadTime}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openProductDetail(product)}
                        className="p-2.5 rounded-xl bg-card border border-card-border hover:border-accent text-foreground transition-colors"
                        title="View Full Specifications & BOM"
                      >
                        <Eye className="w-4 h-4 text-accent" />
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all flex items-center gap-1.5 shadow-glow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
