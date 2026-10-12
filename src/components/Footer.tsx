'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Send } from 'lucide-react';

export default function Footer() {
  const { openCustomProject, openSupport, showToast } = useStore();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to Nova Robo Firmware Releases & Hardware Bulletins');
    setEmail('');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-background border-t border-card-border font-mono text-xs text-muted relative">
      {/* Top Telemetry Strip */}
      <div className="border-b border-card-border/60 bg-card/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>CENTRAL FABRICATION &amp; SMT LINES OPERATIONAL</span>
          </div>

          <div className="flex items-center gap-4 text-muted">
            <span>KINEMATIC LOOP: 1,000 Hz</span>
            <span>·</span>
            <span>ETHERCAT DETERMINISM: &lt; 15 µs Jitter</span>
            <span>·</span>
            <span>FIRMWARE: v2.4.1 RELEASED</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Vision Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-card border border-accent/40 flex items-center justify-center p-1.5 shadow-glow-sm">
              <img src="/nova-robo-logo.png" alt="Nova Robo" className="w-full h-full object-contain filter drop-shadow" />
            </div>
            <div>
              <span className="text-foreground font-bold tracking-widest text-sm block">NOVA ROBO</span>
              <span className="text-[10px] text-accent tracking-wider uppercase block">BUILD · AUTOMATE · INNOVATE</span>
            </div>
          </div>

          <p className="text-muted font-sans text-xs leading-relaxed max-w-sm">
            Make Nova Robo a trusted destination for people who want to turn engineering ideas into real-world hardware.
            Specializing in 6-DOF kinematics, autonomous mobile robotics, and custom electronics fabrication.
          </p>

          <div className="space-y-1 text-[11px] text-muted">
            <div className="text-foreground font-semibold">Central India Hardware Facility:</div>
            <div>Kalchuri LNCT Group Incubation Centre</div>
            <div>Central India Tech Corridor, Raisen Road, Bhopal 462022</div>
            <div className="text-accent font-semibold pt-1">MSME UDYAM-MP-41-0055015</div>
          </div>
        </div>

        {/* Robotics Products */}
        <div className="space-y-3">
          <h4 className="text-foreground font-bold uppercase tracking-wider text-xs">Robotics Catalogue</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollTo('catalogue')} className="hover:text-accent transition-colors">
                Nova Kinematic-6 Pro
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('catalogue')} className="hover:text-accent transition-colors">
                Nova Rover AMR-100
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('catalogue')} className="hover:text-accent transition-colors">
                Nova Gripper G2-Adaptive
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('catalogue')} className="hover:text-accent transition-colors">
                Nova Quad-Mini Research Kit
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('catalogue')} className="hover:text-accent transition-colors">
                Nova Delta-Pick 300
              </button>
            </li>
          </ul>
        </div>

        {/* Electronic Components Store */}
        <div className="space-y-3">
          <h4 className="text-foreground font-bold uppercase tracking-wider text-xs">Components Store</h4>
          <ul className="space-y-2">
            <li>
              <button onClick={() => scrollTo('components')} className="hover:text-accent transition-colors">
                NR-DRV-7510 FOC Driver
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('components')} className="hover:text-accent transition-colors">
                Harmonic Reduction 17-100
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('components')} className="hover:text-accent transition-colors">
                NovaScan 360 Solid-State LiDAR
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('components')} className="hover:text-accent transition-colors">
                StereoSense Depth Camera Pro
              </button>
            </li>
            <li>
              <button onClick={() => scrollTo('components')} className="hover:text-accent transition-colors">
                NovaCore-H7 Robotics Carrier
              </button>
            </li>
          </ul>
        </div>

        {/* Engineering Lab & Newsletter */}
        <div className="space-y-3">
          <h4 className="text-foreground font-bold uppercase tracking-wider text-xs">Engineering Bulletins</h4>
          <p className="text-[11px] text-muted font-sans leading-relaxed">
            Get firmware release changelogs, ROS2 packages, and hardware design updates directly:
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              required
              placeholder="engineer@lab.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-card border border-card-border rounded-xl px-3 py-2 text-foreground text-xs focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-accent text-background font-bold uppercase tracking-wider hover:bg-sky-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Subscribe</span>
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={openCustomProject}
              className="text-accent text-[11px] hover:underline flex items-center gap-1"
            >
              <span>Request Custom Hardware Quote →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="border-t border-card-border/60 py-6 text-center text-[11px] text-muted max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          © 2026 Nova Robo Technologies Pvt. Ltd. Part of the DeepTech Ventures Research Ecosystem.
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => scrollTo('hero')} className="hover:text-accent">Back to Top</button>
          <span>·</span>
          <button onClick={openSupport} className="hover:text-accent">Engineering Support</button>
          <span>·</span>
          <span>ISO 9283 Certified</span>
        </div>
      </div>
    </footer>
  );
}
