'use client';

import React from 'react';
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-bold">
            <Zap className="w-3.5 h-3.5" />
            ENGINEERING TRANSPARENCY
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-foreground">
            Built by Hardware Engineers, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-300 to-blue-400">
              For Groundbreaking Automation.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
            Nova Robo bridges the gap between digital simulation and physical reality. We engineer transparent,
            open-architecture robotics with zero black boxes, complete CAD documentation, and modular repairability.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-card/60 border border-card-border p-6 flex flex-col justify-between hover:border-accent/50 hover:bg-card hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-sans text-foreground">{pillar.title}</h3>
                    <div className="text-xs font-mono text-accent mt-0.5">{pillar.tagline}</div>
                  </div>

                  <p className="text-xs text-muted leading-relaxed font-sans">{pillar.desc}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-card-border flex items-baseline justify-between font-mono">
                  <span className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {pillar.metric}
                  </span>
                  <span className="text-[10px] text-muted uppercase tracking-wider">{pillar.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institutional Credentials & Compliance Bar */}
        <div className="mt-16 rounded-2xl bg-card/40 border border-card-border p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold font-mono text-foreground flex items-center gap-2">
                <span>GOVERNMENT OF INDIA MSME CERTIFIED</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <div className="text-xs font-mono text-muted">
                UDYAM-MP-41-0055015 · Kalchuri LNCT Group Incubation Facility, Central India Tech Corridor
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>ISO 9283 Testing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Open-Source ROS2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Full STEP/CAD Exports</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
