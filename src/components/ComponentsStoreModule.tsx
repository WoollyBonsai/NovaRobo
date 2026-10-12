'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ComponentItem } from '../data/products';
import ScrollReveal from './ScrollReveal';
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
  const { components, addToCart, searchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProtocol, setSelectedProtocol] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'actuators', label: 'Actuators & Motors' },
    { id: 'gearboxes', label: 'Gearboxes' },
    { id: 'sensors', label: 'Sensors & LiDAR' },
    { id: 'compute', label: 'Compute & Drivers' },
  ];

  const protocols = ['all', 'CAN-FD', 'EtherCAT', 'UART', 'SPI'];

  const filteredComponents = components.filter((comp) => {
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
        {/* PCB Track Styled Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pcb-via" />
                <span className="text-[10px] font-mono text-copper uppercase font-bold tracking-widest">
                  // BUS_02: EMBEDDED ACTUATION &amp; SILICON SUITE
                </span>
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
              {/* Protocols */}
              <div className="flex items-center gap-1 bg-card-elevated/80 p-1 rounded-xl border border-card-border text-xs font-mono">
                <span className="text-[10px] text-muted px-2 uppercase">Bus:</span>
                {protocols.map((proto) => (
                  <button
                    key={proto}
                    onClick={() => setSelectedProtocol(proto)}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      selectedProtocol === proto
                        ? 'bg-copper text-background font-bold'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {proto}
                  </button>
                ))}
              </div>

              {/* Categories */}
              <div className="flex flex-wrap items-center gap-1.5 bg-card-elevated/80 p-1 rounded-xl border border-card-border text-xs font-mono">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-accent text-background font-bold'
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Components Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredComponents.map((comp, idx) => (
            <ScrollReveal key={comp.id} delay={idx * 60}>
              <div className="group rounded-2xl bg-card border border-card-border hover:border-copper/60 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-glow-sm hover:bg-card-elevated/80 pcb-copper-border">
                {/* Header with Bus Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-copper/15 border border-copper/35 text-copper uppercase">
                      {comp.protocol}
                    </span>
                    <span className="text-[10px] font-mono text-muted">{comp.voltage}</span>
                  </div>

                  {/* Component Visual */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-background border border-card-border/80">
                    <img
                      src={comp.image}
                      alt={comp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">{comp.categoryLabel}</span>
                    <h3 className="text-base font-bold font-sans text-foreground group-hover:text-copper transition-colors leading-snug mt-0.5">
                      {comp.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted font-sans line-clamp-2 leading-relaxed">
                    {comp.description}
                  </p>

                  {/* Spec highlights */}
                  <div className="pt-2 border-t border-card-border/60 space-y-1 font-mono text-[10px] text-muted">
                    {Object.entries(comp.specs)
                      .slice(0, 2)
                      .map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span>{k}:</span>
                          <span className="text-foreground font-semibold">{v}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 mt-4 border-t border-card-border/60 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold font-mono text-foreground">${comp.price}</span>
                    <div className="text-[10px] font-mono text-emerald-400 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{comp.stockCount} in stock</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addToCart(comp, 1, 'standard')}
                    className="px-3.5 py-2 rounded-xl bg-card border border-copper/40 text-copper hover:bg-copper hover:text-background font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
