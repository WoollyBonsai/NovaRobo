'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import {
  Activity,
  ArrowRight,
  Compass,
  Cpu,
  Layers,
  Maximize2,
  Zap,
} from 'lucide-react';

interface HeroStageProps {
  onIframeReady: () => void;
}

export default function HeroStage({ onIframeReady }: HeroStageProps) {
  const { openCustomProject, openProductDetail } = useStore();

  const [jointAngles, setJointAngles] = useState({
    j1: 42.4,
    j2: -18.7,
    j3: 88.2,
    j4: 0.0,
    j5: 35.6,
    j6: -12.1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJointAngles((prev) => ({
        j1: Number((prev.j1 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        j2: Number((prev.j2 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
        j3: Number((prev.j3 + (Math.random() * 0.2 - 0.1)).toFixed(1)),
        j4: Number((prev.j4 + (Math.random() * 0.5 - 0.25)).toFixed(1)),
        j5: Number((prev.j5 + (Math.random() * 0.3 - 0.15)).toFixed(1)),
        j6: Number((prev.j6 + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      }));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const flagshipProduct = PRODUCTS[0];

  return (
    <section id="hero" className="relative w-full h-screen min-h-[750px] overflow-hidden bg-background pt-20">
      {/* 3D Spline Robotic Arm Iframe (Preserved Exactly) */}
      <div className="absolute inset-0 z-0">
        <iframe
          className="spline-frame"
          src="https://my.spline.design/robotarm-dGeMfZX19JuyBr3QIR55NJ6g/"
          title="Spline robot arm"
          frameBorder="0"
          onLoad={onIframeReady}
          allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
        />
        <div className="spline-badge-mask" aria-hidden="true" />
      </div>

      {/* Subtle Background Radial Gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 30%, transparent 40%, rgba(5, 11, 18, 0.85) 90%)',
        }}
      />

      {/* Hero UI Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8 pointer-events-none">
        {/* Top Header Badge & Telemetry Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4">
          <div className="pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-accent/30 text-accent font-mono text-xs backdrop-blur-md shadow-glow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>6-DOF KINEMATIC MANIPULATOR // ONLINE</span>
          </div>

          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-2xl bg-card/70 border border-card-border backdrop-blur-md font-mono text-xs text-muted pointer-events-auto">
            <div className="flex items-center gap-1.5 text-foreground">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span>REPEATABILITY: ±0.02 mm</span>
            </div>
            <span className="text-card-border">|</span>
            <div>PAYLOAD: 5.0 kg</div>
            <span className="text-card-border">|</span>
            <div>BUS: EtherCAT / CAN-FD</div>
          </div>
        </div>

        {/* Center / Left Headline Box */}
        <div className="max-w-xl pointer-events-auto my-auto space-y-4 bg-background/40 backdrop-blur-sm p-4 sm:p-6 rounded-3xl border border-card-border/40">
          <div className="text-xs font-mono tracking-widest text-accent uppercase font-bold flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            OFFICIAL ROBOTICS &amp; HARDWARE PLATFORM
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-foreground leading-[1.1]">
            Turn Ideas into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-sky-400 to-blue-500">
              Real-World Hardware.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
            From 6-axis precision kinematics to autonomous mobile robots and high-speed multi-layer PCB prototyping.
            Discover engineered hardware ready for deployment or partner with our team for custom robotics engineering.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#catalogue"
              className="px-6 py-3 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-md flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              Explore Catalogue
            </a>

            <button
              onClick={openCustomProject}
              className="px-5 py-3 rounded-xl bg-card/90 border border-accent/40 text-foreground font-mono text-xs font-bold uppercase tracking-wider hover:border-accent hover:bg-card transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-accent" />
              Custom Project
            </button>

            <button
              onClick={() => openProductDetail(flagshipProduct)}
              className="px-4 py-3 rounded-xl bg-card/50 text-muted hover:text-foreground font-mono text-xs flex items-center gap-1.5 transition-colors border border-transparent hover:border-card-border"
            >
              <span>Specs Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Interactive HUD Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          {/* Real-time Joint Angles Telemetry Pill */}
          <div className="pointer-events-auto flex items-center gap-3 px-4 py-2 rounded-2xl bg-card/80 border border-card-border backdrop-blur-md font-mono text-[11px] text-muted shadow-sm">
            <div className="flex items-center gap-1 text-accent font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>JOINTS:</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-3 text-foreground">
              <span>J1: {jointAngles.j1}°</span>
              <span>J2: {jointAngles.j2}°</span>
              <span>J3: {jointAngles.j3}°</span>
              <span>J4: {jointAngles.j4}°</span>
              <span>J5: {jointAngles.j5}°</span>
              <span>J6: {jointAngles.j6}°</span>
            </div>
          </div>

          {/* 3D Interaction Notice */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2 text-xs font-mono text-muted bg-card/60 px-3 py-1.5 rounded-full border border-card-border">
            <Maximize2 className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Interactive 3D Stage: Click &amp; drag to rotate arm</span>
          </div>
        </div>
      </div>
    </section>
  );
}
