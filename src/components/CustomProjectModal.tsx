'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Compass,
  Upload,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  Cpu,
  Layers,
  Wrench,
  Calculator,
} from 'lucide-react';

export default function CustomProjectModal() {
  const { isCustomProjectOpen, closeCustomProject, submitEnquiry, showToast } = useStore();

  const [clientName, setClientName] = useState('Dr. Kabir Verma');
  const [organization, setOrganization] = useState('Robotics Autonomous Systems Lab');
  const [email, setEmail] = useState('k.verma@me.iitb.ac.in');
  const [projectType, setProjectType] = useState('6-DOF Custom Manipulator Arm');
  const [payloadRequirement, setPayloadRequirement] = useState('7.5 kg');
  const [reachRequirement, setReachRequirement] = useState('950 mm');
  const [environment, setEnvironment] = useState('Cleanroom ISO 5 / Optical Bench');
  const [budgetRange, setBudgetRange] = useState('$12,000 - $18,000');
  const [timeline, setTimeline] = useState('6-8 Weeks Fast-Track');
  const [notes, setNotes] = useState(
    'Require integrated EtherCAT slave interface and quick-release ISO flange for vacuum pick tooling.'
  );
  const [fileName, setFileName] = useState<string | null>(null);

  if (!isCustomProjectOpen) return null;

  // Dynamic estimate calculation based on payload and project type
  const calculateEstimate = () => {
    let base = 6500;
    if (projectType.includes('6-DOF')) base += 5000;
    if (projectType.includes('Mobile Robot')) base += 4200;
    if (projectType.includes('PCB')) base = 3500;
    if (environment.includes('Cleanroom') || environment.includes('Vacuum')) base += 2500;
    return base;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEnquiry({
      clientName,
      organization,
      email,
      projectType,
      payloadRequirement,
      reachRequirement,
      environment,
      budgetRange,
      timeline,
      notes: `${notes}${fileName ? ` [Uploaded Attachment: ${fileName}]` : ''}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-card border border-card-border rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-foreground">
                CUSTOM HARDWARE PROJECT ENQUIRY &amp; QUOTE SYSTEM
              </h3>
              <div className="text-[10px] font-mono text-muted">
                Collaborate directly with Nova Robo hardware engineering team · 24h SLA Response
              </div>
            </div>
          </div>

          <button
            onClick={closeCustomProject}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 font-mono text-xs">
          {/* Engineering Category */}
          <div>
            <label className="text-foreground font-bold block mb-2">1. Hardware Project Discipline *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {[
                '6-DOF Custom Manipulator Arm',
                'Autonomous Mobile Robot (AMR)',
                'Custom Robot End-Effector',
                'Multi-Layer Custom Robotics PCB',
                'Delta / High-Speed Mechanism',
                'Custom Kinematics Testing Rig',
              ].map((type) => (
                <div
                  key={type}
                  onClick={() => setProjectType(type)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    projectType === type
                      ? 'border-accent bg-accent/10 text-foreground font-bold'
                      : 'border-card-border bg-background/50 text-muted hover:border-card-border'
                  }`}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="space-y-4">
            <label className="text-foreground font-bold block">2. Mechanical &amp; Electrical Target Parameters</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-muted block mb-1">Payload Capacity *</label>
                <input
                  type="text"
                  required
                  value={payloadRequirement}
                  onChange={(e) => setPayloadRequirement(e.target.value)}
                  placeholder="e.g. 5.0 kg"
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Workspace Reach *</label>
                <input
                  type="text"
                  required
                  value={reachRequirement}
                  onChange={(e) => setReachRequirement(e.target.value)}
                  placeholder="e.g. 950 mm radial"
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Operating Environment</label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="Standard Industrial (IP54)">Standard Industrial (IP54)</option>
                  <option value="Cleanroom ISO 5 / Optical Bench">Cleanroom ISO 5 / Optical Bench</option>
                  <option value="High Temp / Vacuum Chamber">High Temp / Vacuum Chamber</option>
                  <option value="Outdoor Rugged / Waterproof (IP67)">Outdoor Rugged (IP67)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-muted block mb-1">Estimated Budget Scope</label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="$5,000 - $10,000">$5,000 - $10,000 (Research Prototype)</option>
                  <option value="$10,000 - $20,000">$10,000 - $20,000 (Custom Production Unit)</option>
                  <option value="$20,000 - $50,000">$20,000 - $50,000 (Full Turnkey Automation)</option>
                  <option value="$50,000+">$50,000+ (Multi-Robot Fleet)</option>
                </select>
              </div>

              <div>
                <label className="text-muted block mb-1">Delivery Target</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                >
                  <option value="4-6 Weeks Rapid Turnaround">4-6 Weeks Rapid Turnaround</option>
                  <option value="6-8 Weeks Standard">6-8 Weeks Standard</option>
                  <option value="12+ Weeks Strategic Development">12+ Weeks Strategic Development</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact & Organization Details */}
          <div className="space-y-4">
            <label className="text-foreground font-bold block">3. Engineering Point of Contact</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-muted block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Organization / Lab *</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>

          {/* Project Notes & CAD Upload Simulation */}
          <div className="space-y-3">
            <label className="text-muted block">Project Description &amp; Specific Constraints</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-background border border-card-border rounded-xl p-3 text-foreground focus:outline-none focus:border-accent"
            />

            {/* CAD File Drag / Upload simulation */}
            <div
              onClick={() => {
                const sampleFiles = ['spec_robotic_payload_envelope.step', 'kinematic_assembly_mount.dxf', 'flange_interface.pdf'];
                const picked = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
                setFileName(picked);
                showToast(`Attached CAD specification: ${picked}`);
              }}
              className="border border-dashed border-card-border hover:border-accent rounded-2xl p-4 text-center cursor-pointer bg-background/40 hover:bg-background/80 transition-all flex flex-col items-center justify-center gap-1.5"
            >
              <Upload className="w-5 h-5 text-accent" />
              <span className="text-foreground font-semibold">
                {fileName ? `Attached: ${fileName}` : 'Attach CAD Model (.STEP, .IGES, .DXF) or PDF Specs'}
              </span>
              <span className="text-[10px] text-muted">Click to simulate attaching engineering specifications</span>
            </div>
          </div>

          {/* Live Estimate Card */}
          <div className="p-4 rounded-2xl bg-background border border-card-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-accent" />
              <div>
                <div className="text-foreground font-bold">Preliminary Hardware Estimate</div>
                <div className="text-[10px] text-muted">Based on selected mechanical kinematics &amp; payload scope</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-bold font-mono text-emerald-400">
                ~${calculateEstimate().toLocaleString()}
              </span>
              <span className="text-[10px] text-muted block">Subject to engineering design review</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-between">
            <div className="text-[10px] text-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>NDA protected · Engineering analysis turnaround within 24 business hours</span>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-accent text-background font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 transition-all shadow-glow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Project Brief</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
