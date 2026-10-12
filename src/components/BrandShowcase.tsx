'use client';

import React from 'react';
import ScrollReveal from './ScrollReveal';
import {
  ShieldCheck,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
  Award,
  Zap,
  Box,
} from 'lucide-react';

export default function BrandShowcase() {
  const pillars = [
    {
      icon: Layers,
      title: 'Precision Kinematics',
      tagline: '±0.02 mm ISO 9283 Certified Repeatability',
      desc: 'Each joint integrates dual 19-bit optical absolute encoders and custom strain-wave reduction drives to guarantee sub-millimeter positioning across the entire 850mm workspace.',
      metric: '0.02 mm',
      label: 'Positioning Tolerance',
    },
    {
      icon: Cpu,
      title: 'Real-Time Embedded Stack',
      tagline: '1,000 Hz Distributed Clock Synchronization',
      desc: 'Our proprietary dual-core STM32H7 hardware architecture executes closed-loop Field-Oriented Control (FOC) with native EtherCAT and CAN-FD determinism.',
      metric: '1,000 Hz',
      label: 'Closed-Loop Frequency',
    },
    {
      icon: Box,
      title: 'Aerospace Material Craft',
      tagline: 'Monocoque 7075-T6 Billet Aluminum',
      desc: '5-axis simultaneous CNC milled chassis designed for maximum stiffness-to-weight ratio, high thermal dissipation, and industrial IP54/IP65 environmental ingress protection.',
      metric: '100%',
      label: 'In-House CNC Machining',
    },
    {
      icon: Wrench,
      title: 'Hardware Agility',
      tagline: 'From Schematic to Working Robot in 14 Days',
      desc: 'Equipped with rapid in-house SMT PCB assembly, 3D additive tooling, and robotic dyno testing benches, we turn custom hardware ideas into production reality fast.',
      metric: '< 14 Days',
      label: 'Rapid Prototype Cycle',
    },
  ];

  return (
    <section id="showcase" className="py-24 bg-background relative border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with PCB Track */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 opacity-60">
                <span className="pcb-via" />
                <div className="w-12 h-[1.5px] bg-gradient-to-r from-copper to-accent" />
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card-elevated border border-copper/35 text-copper font-mono text-xs uppercase tracking-widest font-bold shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
                <span>ENGINEERING TRANSPARENCY</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 opacity-60">
                <div className="w-12 h-[1.5px] bg-gradient-to-l from-copper to-accent" />
                <span className="pcb-via" />
              </div>
            </div>

            <div className="pcb-silkscreen text-[10px] text-muted/60 uppercase">
              // HARDWARE ARCHITECTURE // ZERO BLACK BOXES // OPEN SCHEMATICS
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-foreground">
              Built by Hardware Engineers, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-300 to-copper">
                For Groundbreaking Automation.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
              Nova Robo bridges the gap between digital simulation and physical reality. We engineer transparent,
              open-architecture robotics with zero black boxes, complete CAD documentation, and modular repairability.
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Pillars Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 90}>
                <div className="group relative rounded-2xl bg-card border border-card-border p-6 flex flex-col justify-between hover:border-copper/60 hover:bg-card-elevated hover:shadow-glow-sm transition-all duration-300 pcb-copper-border h-full">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-card-elevated border border-copper/30 flex items-center justify-center text-copper group-hover:scale-105 transition-transform shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-sans text-foreground">{pillar.title}</h3>
                      <div className="text-xs font-mono text-copper mt-0.5">{pillar.tagline}</div>
                    </div>

                    <p className="text-xs text-muted leading-relaxed font-sans">{pillar.desc}</p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-card-border flex items-baseline justify-between font-mono">
                    <span className="text-2xl font-bold text-foreground group-hover:text-copper transition-colors">
                      {pillar.metric}
                    </span>
                    <span className="text-[10px] text-muted uppercase tracking-wider">{pillar.label}</span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Institutional Credentials & Compliance Bar */}
        <ScrollReveal delay={200}>
          <div className="mt-16 rounded-2xl bg-card border border-card-border p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm pcb-copper-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-copper/15 border border-copper/35 flex items-center justify-center text-copper shrink-0 shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-sans text-foreground">
                  Govt. Recognized Hardware Facility &amp; ISO Calibrated
                </h4>
                <p className="text-xs text-muted font-sans mt-0.5">
                  Operating out of the Kalchuri LNCT Group Incubation Centre, Central India Tech Corridor.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 font-mono text-xs">
              <div className="flex items-center space-x-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>MSME UDYAM-MP-41-0055015</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <Award className="w-4 h-4 text-accent" />
                <span>ISO 9283 Repeatability Audit</span>
              </div>
              <div className="flex items-center space-x-2 text-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>CE / RoHS Certified Components</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
