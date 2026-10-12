'use client';

import React from 'react';

export default function PcbBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45 select-none"
      aria-hidden="true"
    >
      {/* Background Micro-Grid Dot Matrix */}
      <div className="absolute inset-0 pcb-grid-texture opacity-35" />

      {/* High-Tech Circuit Board Traces & Energy Pulses */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pcbCopperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.35" />
          </linearGradient>

          <linearGradient id="pcbCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </linearGradient>

          <filter id="pcbGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ========================================================
            CIRCUIT TRACES (COPPER BUSES WITH 45-DEGREE BENDS)
            ======================================================== */}
        <g stroke="url(#pcbCopperGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Top Left Bus */}
          <path id="pcbTrack1" d="M -50,140 L 280,140 L 360,220 L 720,220 L 800,300 L 1100,300" />
          <path d="M -50,155 L 270,155 L 350,235 L 710,235 L 790,315 L 1090,315" strokeOpacity="0.4" />
          <path d="M -50,170 L 260,170 L 340,250 L 700,250 L 780,330 L 1080,330" strokeOpacity="0.25" />

          {/* Center Vertical-Diagonal Routing Bus */}
          <path id="pcbTrack2" d="M 960,-50 L 960,180 L 1040,260 L 1040,540 L 1120,620 L 1400,620 L 1480,700 L 1480,1150" />
          <path d="M 980,-50 L 980,170 L 1060,250 L 1060,530 L 1140,610 L 1420,610 L 1500,690 L 1500,1150" strokeOpacity="0.35" />

          {/* Bottom Left Sensor Bus */}
          <path id="pcbTrack3" d="M 120,1150 L 120,880 L 220,780 L 520,780 L 600,700 L 850,700" />
          <path d="M 140,1150 L 140,890 L 230,800 L 510,800 L 590,720 L 840,720" strokeOpacity="0.3" />

          {/* Right EtherCAT High-Speed Differential Pair */}
          <path id="pcbTrack4" d="M 1950,280 L 1650,280 L 1570,360 L 1320,360 L 1240,440 L 980,440" stroke="url(#pcbCyanGrad)" strokeWidth="1.8" />
          <path d="M 1950,295 L 1660,295 L 1580,375 L 1330,375 L 1250,455 L 990,455" stroke="url(#pcbCyanGrad)" strokeOpacity="0.4" />

          {/* Bottom Right Power Rail */}
          <path id="pcbTrack5" d="M 1950,860 L 1600,860 L 1520,940 L 1180,940 L 1100,1020 L 850,1020" />
        </g>

        {/* ========================================================
            ANIMATED CURRENT PACKETS (FLOWING ALONG COPPER TRACKS)
            ======================================================== */}
        {/* Track 1 Packets */}
        <circle r="3" fill="#fbbf24" filter="url(#pcbGlow)">
          <animateMotion dur="8s" repeatCount="indefinite">
            <mpath href="#pcbTrack1" />
          </animateMotion>
        </circle>
        <circle r="2" fill="#38bdf8" filter="url(#pcbGlow)">
          <animateMotion dur="8s" begin="3.5s" repeatCount="indefinite">
            <mpath href="#pcbTrack1" />
          </animateMotion>
        </circle>

        {/* Track 2 Packets */}
        <circle r="3" fill="#38bdf8" filter="url(#pcbGlow)">
          <animateMotion dur="10s" repeatCount="indefinite">
            <mpath href="#pcbTrack2" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="#f59e0b" filter="url(#pcbGlow)">
          <animateMotion dur="10s" begin="4.5s" repeatCount="indefinite">
            <mpath href="#pcbTrack2" />
          </animateMotion>
        </circle>

        {/* Track 3 Packets */}
        <circle r="2.5" fill="#fbbf24" filter="url(#pcbGlow)">
          <animateMotion dur="7s" repeatCount="indefinite">
            <mpath href="#pcbTrack3" />
          </animateMotion>
        </circle>

        {/* Track 4 Packets (High speed) */}
        <circle r="3" fill="#5ee7ff" filter="url(#pcbGlow)">
          <animateMotion dur="5.5s" repeatCount="indefinite">
            <mpath href="#pcbTrack4" />
          </animateMotion>
        </circle>

        {/* Track 5 Packets */}
        <circle r="2.5" fill="#f59e0b" filter="url(#pcbGlow)">
          <animateMotion dur="9s" repeatCount="indefinite">
            <mpath href="#pcbTrack5" />
          </animateMotion>
        </circle>

        {/* ========================================================
            PLATED VIAS & SOLDER PADS (TERMINALS)
            ======================================================== */}
        <g fill="#12161f" stroke="#f59e0b" strokeWidth="1.5">
          <circle cx="280" cy="140" r="5" />
          <circle cx="360" cy="220" r="5" />
          <circle cx="720" cy="220" r="5" />
          <circle cx="1100" cy="300" r="6" fill="#f59e0b" fillOpacity="0.3" />

          <circle cx="960" cy="180" r="5" />
          <circle cx="1040" cy="260" r="5" />
          <circle cx="1400" cy="620" r="5" />

          <circle cx="220" cy="780" r="5" />
          <circle cx="520" cy="780" r="5" />
          <circle cx="850" cy="700" r="6" fill="#38bdf8" stroke="#38bdf8" />

          <circle cx="1650" cy="280" r="5" stroke="#38bdf8" />
          <circle cx="1320" cy="360" r="5" stroke="#38bdf8" />
          <circle cx="980" cy="440" r="6" stroke="#38bdf8" fill="#38bdf8" fillOpacity="0.25" />
        </g>

        {/* Center Via Hole Drill Core Dots */}
        <g fill="#fbbf24">
          <circle cx="280" cy="140" r="1.5" />
          <circle cx="360" cy="220" r="1.5" />
          <circle cx="720" cy="220" r="1.5" />
          <circle cx="1100" cy="300" r="2" />
          <circle cx="960" cy="180" r="1.5" />
          <circle cx="1040" cy="260" r="1.5" />
          <circle cx="1400" cy="620" r="1.5" />
          <circle cx="220" cy="780" r="1.5" />
          <circle cx="520" cy="780" r="1.5" />
        </g>

        {/* ========================================================
            INTEGRATED CHIP & COMPONENT FOOTPRINTS
            ======================================================== */}
        {/* IC1: STM32 MCU Footprint */}
        <g transform="translate(1120, 260)" stroke="#f59e0b" strokeOpacity="0.35" fill="none">
          <rect x="0" y="0" width="80" height="80" rx="4" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="3" fill="#f59e0b" fillOpacity="0.4" />
          {/* Pins */}
          <line x1="-8" y1="20" x2="0" y2="20" strokeWidth="1.5" />
          <line x1="-8" y1="40" x2="0" y2="40" strokeWidth="1.5" />
          <line x1="-8" y1="60" x2="0" y2="60" strokeWidth="1.5" />
          <line x1="80" y1="20" x2="88" y2="20" strokeWidth="1.5" />
          <line x1="80" y1="40" x2="88" y2="40" strokeWidth="1.5" />
          <line x1="80" y1="60" x2="88" y2="60" strokeWidth="1.5" />
          <line x1="20" y1="-8" x2="20" y2="0" strokeWidth="1.5" />
          <line x1="40" y1="-8" x2="40" y2="0" strokeWidth="1.5" />
          <line x1="60" y1="-8" x2="60" y2="0" strokeWidth="1.5" />
          <line x1="20" y1="80" x2="20" y2="88" strokeWidth="1.5" />
          <line x1="40" y1="80" x2="40" y2="88" strokeWidth="1.5" />
          <line x1="60" y1="80" x2="60" y2="88" strokeWidth="1.5" />
          <text x="40" y="44" fill="#f59e0b" fillOpacity="0.5" fontSize="8" fontFamily="monospace" textAnchor="middle">
            STM32H753
          </text>
        </g>

        {/* ========================================================
            SILKSCREEN TECHNICAL MARKINGS
            ======================================================== */}
        <g fill="#94a3b8" fillOpacity="0.3" fontSize="9" fontFamily="monospace" letterSpacing="1.5">
          <text x="375" y="215">L1_TOP_COPPER // 35µm</text>
          <text x="735" y="215">IMP_MATCH_50Ω</text>
          <text x="1335" y="355" fill="#38bdf8" fillOpacity="0.4">ETHERCAT_DIFF_PAIR_100Ω</text>
          <text x="240" y="775">CAN_FD_BUS_VCC</text>
          <text x="1620" y="855">PWR_RAIL_48V_20A</text>
          <text x="80" y="90">NOV_ROBO_CORE_HW // REV_2.4.0</text>
          <text x="80" y="105">SUBSTRATE: FR-4 TG170 HIGH_FREQ</text>
        </g>

        {/* Tooling Alignment Fiducials */}
        <g stroke="#f59e0b" strokeOpacity="0.4" strokeWidth="1" fill="none">
          <circle cx="80" cy="180" r="10" />
          <line x1="70" y1="180" x2="90" y2="180" />
          <line x1="80" y1="170" x2="80" y2="190" />

          <circle cx="1840" cy="180" r="10" />
          <line x1="1830" y1="180" x2="1850" y2="180" />
          <line x1="1840" y1="170" x2="1840" y2="190" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Technical PCB Header Component
 * Renders a copper track leading directly into badges and titles with vias
 */
export function PcbSectionHeader({
  badge,
  title,
  subtitle,
  silkscreenCode,
  align = 'center',
}: {
  badge: string;
  title: React.ReactNode;
  subtitle?: string;
  silkscreenCode?: string;
  align?: 'center' | 'left';
}) {
  const isCenter = align === 'center';

  return (
    <div className={`space-y-4 mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {/* Silkscreen & PCB Track Lockup */}
      <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <div className="hidden sm:flex items-center gap-1.5 opacity-60">
          <span className="pcb-via" />
          <div className="w-10 h-[1.5px] bg-gradient-to-r from-copper to-accent" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-card-elevated border border-copper/35 text-copper font-mono text-[11px] uppercase tracking-widest font-bold shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
          <span>{badge}</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 opacity-60">
          <div className="w-10 h-[1.5px] bg-gradient-to-l from-copper to-accent" />
          <span className="pcb-via" />
        </div>
      </div>

      {silkscreenCode && (
        <div className="pcb-silkscreen text-[10px] text-muted/60 uppercase">
          // {silkscreenCode}
        </div>
      )}

      <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-sans text-foreground">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-muted font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
