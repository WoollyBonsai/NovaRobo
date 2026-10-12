'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { COMPONENTS, ComponentItem } from '../data/products';
import {
  Cpu,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  Zap,
  Radio,
  Layers,
} from 'lucide-react';

export default function ComponentsStoreModule() {
  const { addToCart, searchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'actuators', label: 'Actuators & Motors' },
    { id: 'gearboxes', label: 'Gearboxes' },
    { id: 'sensors', label: 'Sensors & LiDAR' },
    { id: 'compute', label: 'Compute & Drivers' },
  ];

  const protocols = ['all', 'CAN-FD', 'EtherCAT', 'UART'];

  const filteredComponents = COMPONENTS.filter((comp) => {
    const matchesCategory = selectedCategory === 'all' || comp.category === selectedCategory;
    const matchesProtocol = selectedProtocol === 'all' || comp.protocol === selectedProtocol;
    const matchesSearch =
      searchQuery === '' ||
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesProtocol && matchesSearch;
  });

  return (
    <section id="components" className="py-24 bg-background relative border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-bold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              HARDWARE STORE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-foreground">
              Electronic Components &amp; Actuators
            </h2>
            <p className="text-sm text-muted font-sans mt-2 max-w-xl">
              Laboratory-tested motor controllers, harmonic reduction drives, solid-state perception sensors,
              and multi-bus carrier boards for custom robotics fabrication.
            </p>
          </div>

          {/* Dual Filter Bars */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-1.5 bg-card/80 p-1.5 rounded-2xl border border-card-border">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-accent text-background font-bold shadow-glow-sm'
                      : 'text-muted hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Protocol Filter */}
            <div className="flex items-center gap-1 bg-card/80 p-1.5 rounded-2xl border border-card-border text-xs font-mono">
              <span className="text-muted px-2 flex items-center gap-1 text-[11px]">
                <Radio className="w-3 h-3 text-accent" /> Bus:
              </span>
              {protocols.map((prot) => (
                <button
                  key={prot}
                  onClick={() => setSelectedProtocol(prot)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedProtocol === prot
                      ? 'bg-accent/20 text-accent font-bold border border-accent/40'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {prot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredComponents.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-card border border-card-border p-5 flex flex-col justify-between hover:border-accent/60 transition-all duration-300 hover:shadow-glow-sm"
            >
              <div>
                {/* Visual / Thumbnail */}
                <div className="relative aspect-video rounded-xl overflow-hidden bg-background mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-background/80 border border-card-border text-accent backdrop-blur-md">
                    {item.protocol}
                  </div>
                </div>

                <div className="text-[10px] font-mono text-accent uppercase tracking-wider mb-1">
                  {item.categoryLabel}
                </div>
                <h4 className="text-base font-bold font-sans text-foreground group-hover:text-accent transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-muted font-sans line-clamp-2 mt-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Specs Table */}
                <div className="mt-4 pt-3 border-t border-card-border space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between text-muted">
                    <span>Voltage:</span>
                    <span className="text-foreground font-semibold">{item.voltage}</span>
                  </div>
                  {Object.entries(item.specs)
                    .slice(0, 2)
                    .map(([k, v]) => (
                      <div key={k} className="flex justify-between text-muted">
                        <span className="truncate max-w-[120px]">{k}:</span>
                        <span className="text-foreground font-semibold truncate max-w-[130px]">{v}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="mt-5 pt-4 border-t border-card-border flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold font-mono text-foreground">${item.price}</div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>In Stock ({item.stockCount} units)</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(item)}
                  className="px-3.5 py-2 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all flex items-center gap-1.5 shadow-glow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
