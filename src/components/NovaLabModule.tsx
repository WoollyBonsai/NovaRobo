'use client';

import React, { useState } from 'react';
import { LAB_DOCS, LabDoc } from '../data/products';
import { useStore } from '../context/StoreContext';
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
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs uppercase tracking-widest font-bold mb-3">
              <Terminal className="w-3.5 h-3.5" />
              DEVELOPER &amp; HARDWARE LAB
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
            <span className="px-2.5 py-1 rounded-lg bg-card border border-accent/30 text-accent font-bold">
              Jazzy Jalisco
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-card border border-accent/30 text-accent font-bold">
              Humble Hawksbill
            </span>
          </div>
        </div>

        {/* Documentation Layout: Sidebar List + Reader Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Articles Navigation */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-muted uppercase font-bold text-[10px] block mb-1">
              ENGINEERING ARTICLES ({LAB_DOCS.length}):
            </span>
            {LAB_DOCS.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedDoc.id === doc.id
                    ? 'border-accent bg-card shadow-glow-sm'
                    : 'border-card-border bg-background/50 hover:border-card-border hover:bg-card/40'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-accent mb-1.5 font-bold">
                  <span>{doc.category}</span>
                  <span className="text-muted">{doc.readingTime}</span>
                </div>
                <h4 className="text-sm font-bold text-foreground leading-snug">{doc.title}</h4>
                <p className="text-xs text-muted font-sans line-clamp-2 mt-1.5">{doc.summary}</p>
              </div>
            ))}

            {/* GitHub Repo Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-card to-background border border-accent/30 space-y-3 mt-6">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Code className="w-4 h-4 text-accent" />
                <span>Open Source Repositories</span>
              </div>
              <p className="text-xs text-muted font-sans">
                Access official MoveIt2 configurations, URDF 3D collision meshes, and micro-ROS firmware on GitHub.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent text-xs font-bold hover:underline"
              >
                <span>github.com/NovaRobo-Official</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Detailed Reader Panel */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-card border border-card-border space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-card-border pb-4 font-mono text-xs">
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold uppercase">
                {selectedDoc.category}
              </span>
              <span className="text-muted">{selectedDoc.readingTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-foreground">
              {selectedDoc.title}
            </h3>

            {/* Markdown-style Content Presentation */}
            <div className="space-y-4 text-xs sm:text-sm text-foreground/90 font-sans leading-relaxed">
              <div className="whitespace-pre-line font-mono text-xs bg-background/60 p-5 rounded-2xl border border-card-border text-muted leading-relaxed">
                {selectedDoc.content}
              </div>

              {/* Code Snippet Box */}
              {selectedDoc.codeSnippet && (
                <div className="space-y-2 mt-4 font-mono">
                  <div className="flex items-center justify-between text-xs text-accent">
                    <span>Python Kinematics Subscriber Telemetry Node:</span>
                    <button
                      onClick={() => handleCopy(selectedDoc.codeSnippet!)}
                      className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground bg-card px-2.5 py-1 rounded-lg border border-card-border"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-background border border-card-border text-xs text-sky-300 overflow-x-auto">
                    <code>{selectedDoc.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
