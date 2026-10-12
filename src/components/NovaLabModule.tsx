'use client';

import React, { useState } from 'react';
import { LAB_DOCS, LabDoc } from '../data/products';
import { useStore } from '../context/StoreContext';
import ScrollReveal from './ScrollReveal';
import {
  Terminal,
  Code,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';

export default function NovaLabModule() {
  const { showToast } = useStore();
  const [selectedDoc, setSelectedDoc] = useState<LabDoc>(LAB_DOCS[0]);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    showToast('Code snippet copied to clipboard');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="lab" className="py-24 bg-card/40 relative border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Module Header with PCB Track */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="pcb-via" />
                <span className="text-[10px] font-mono text-copper uppercase font-bold tracking-widest">
                  // BUS_03: OPEN FIRMWARE &amp; HARDWARE SPECS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-foreground">
                Nova Robo Lab &amp; Documentation
              </h2>
              <p className="text-sm text-muted font-sans mt-2 max-w-xl">
                Open-architecture ROS2 packages, real-time CAN-FD protocol specifications, wiring pinouts, and
                mechanical calibration guides.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-muted">ROS2 Ecosystem:</span>
              <span className="px-2.5 py-1 rounded-lg bg-card border border-copper/35 text-copper font-bold shadow-sm">
                Jazzy Jalisco
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-card border border-accent/35 text-accent font-bold shadow-sm">
                Humble Hawksbill
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Documentation Layout: Sidebar List + Reader Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Articles Navigation */}
          <ScrollReveal direction="left" className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-muted uppercase font-bold text-[10px] block mb-1">
              ENGINEERING ARTICLES ({LAB_DOCS.length}):
            </span>
            {LAB_DOCS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedDoc.id === doc.id
                    ? 'border-copper bg-card shadow-glow-sm'
                    : 'border-card-border bg-background/50 hover:border-card-border hover:bg-card/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-copper mb-1.5 font-bold">
                  <span>{doc.category}</span>
                  <span className="text-muted">{doc.readingTime}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">{doc.title}</h4>
                <p className="text-xs text-muted font-sans line-clamp-2 mt-1.5">{doc.summary}</p>
              </div>
            ))}

            {/* GitHub Repo Card */}
            <div className="p-5 rounded-2xl bg-card border border-copper/35 space-y-3 mt-6 pcb-copper-border">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Code className="w-4 h-4 text-copper" />
                <span>Open Source Repositories</span>
              </div>
              <p className="text-xs text-muted font-sans">
                Access official MoveIt2 configurations, URDF 3D collision meshes, and micro-ROS firmware on GitHub.
              </p>
              <a
                href="https://github.com/WoollyBonsai/NovaRobo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-copper text-xs font-bold hover:underline"
              >
                <span>github.com/WoollyBonsai/NovaRobo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>

          {/* Right Reader Panel */}
          <ScrollReveal direction="right" className="lg:col-span-8">
            <div className="rounded-3xl bg-card border border-card-border p-6 sm:p-8 space-y-6 shadow-sm pcb-copper-border">
              {/* Doc Header */}
              <div className="border-b border-card-border pb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-copper font-bold">
                  <span>{selectedDoc.category}</span>
                  <span>·</span>
                  <span className="text-muted">{selectedDoc.readingTime} read</span>
                </div>
                <h3 className="text-2xl font-extrabold font-sans text-foreground">{selectedDoc.title}</h3>
                <p className="text-xs text-muted font-mono leading-relaxed">{selectedDoc.summary}</p>
              </div>

              {/* Code Snippet Box */}
              {selectedDoc.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-muted">
                    <span>TERMINAL / CODE IMPLEMENTATION:</span>
                    <button
                      onClick={() => handleCopy(selectedDoc.codeSnippet!)}
                      className="flex items-center gap-1.5 text-copper hover:text-amber-300 transition-colors"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Snippet'}</span>
                    </button>
                  </div>

                  <div className="relative rounded-2xl bg-background border border-card-border p-4 font-mono text-xs text-sky-300 overflow-x-auto">
                    <pre className="whitespace-pre">{selectedDoc.codeSnippet}</pre>
                  </div>
                </div>
              )}

              {/* Documentation Body Text */}
              <div className="space-y-4 text-xs font-sans text-muted leading-relaxed">
                {selectedDoc.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
