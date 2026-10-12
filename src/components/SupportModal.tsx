'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SupportTicket } from '../data/products';
import {
  X,
  LifeBuoy,
  Send,
  Plus,
} from 'lucide-react';

export default function SupportModal() {
  const { isSupportOpen, closeSupport, supportTickets, createTicket, sendSupportMessage } = useStore();

  const [selectedTicketId, setSelectedTicketId] = useState<string>(
    supportTickets[0]?.id || ''
  );
  const [newMsgText, setNewMsgText] = useState('');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  // New ticket state
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState<SupportTicket['category']>('Kinematics');
  const [initialText, setInitialText] = useState('');

  if (!isSupportOpen) return null;

  const currentTicket =
    supportTickets.find((t) => t.id === selectedTicketId) || supportTickets[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgText.trim() || !currentTicket) return;
    sendSupportMessage(currentTicket.id, newMsgText.trim());
    setNewMsgText('');
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !initialText.trim()) return;
    const created = createTicket(newSubject.trim(), newCategory, initialText.trim());
    setSelectedTicketId(created.id);
    setIsCreatingTicket(false);
    setNewSubject('');
    setInitialText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-card border border-card-border rounded-3xl shadow-glow-lg overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Header */}
        <div className="p-5 border-b border-card-border flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-foreground">
                NOVA ROBO DIRECT HARDWARE ENGINEERING SUPPORT
              </h3>
              <div className="text-[10px] font-mono text-muted">
                Direct channel with Nova Robo Lead Kinematics &amp; Embedded Firmware Specialists
              </div>
            </div>
          </div>

          <button
            onClick={closeSupport}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Left Tickets List / Right Thread */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-[460px]">
          {/* Left Tickets Sidebar */}
          <div className="md:col-span-4 border-r border-card-border p-4 bg-background/50 space-y-3 font-mono text-xs overflow-y-auto">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted uppercase font-bold">Active Threads ({supportTickets.length})</span>
              <button
                onClick={() => setIsCreatingTicket(true)}
                className="p-1 rounded-lg bg-accent/10 text-accent border border-accent/30 hover:bg-accent/20 flex items-center gap-1 text-[10px]"
                title="Create New Ticket"
              >
                <Plus className="w-3 h-3" /> New
              </button>
            </div>

            {supportTickets.map((tick) => (
              <div
                key={tick.id}
                onClick={() => {
                  setSelectedTicketId(tick.id);
                  setIsCreatingTicket(false);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  selectedTicketId === tick.id && !isCreatingTicket
                    ? 'border-accent bg-card text-foreground shadow-glow-sm'
                    : 'border-card-border bg-card/40 text-muted hover:border-card-border hover:text-foreground'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-accent mb-1">
                  <span>{tick.id}</span>
                  <span className="text-muted">{tick.lastUpdated}</span>
                </div>
                <div className="font-bold truncate text-foreground">{tick.subject}</div>
                <div className="text-[10px] text-muted mt-1">{tick.category} · {tick.status}</div>
              </div>
            ))}
          </div>

          {/* Right Panel: Chat Thread or New Ticket Form */}
          <div className="md:col-span-8 flex flex-col justify-between p-6 bg-card">
            {isCreatingTicket ? (
              /* Create New Ticket Form */
              <form onSubmit={handleCreateTicketSubmit} className="space-y-4 font-mono text-xs flex-1">
                <div className="flex justify-between items-center border-b border-card-border pb-3">
                  <h4 className="text-sm font-bold text-foreground">Log New Engineering Support Query</h4>
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="text-muted hover:text-foreground text-xs"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="text-muted block mb-1">Subject / Hardware Issue *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CAN-FD Baud Rate Sync Error on Axis 3"
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="text-muted block mb-1">Subsystem Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as SupportTicket['category'])}
                    className="w-full bg-background border border-card-border rounded-xl px-3 py-2 text-foreground focus:outline-none focus:border-accent"
                  >
                    <option value="Kinematics">Kinematics &amp; Motion Control</option>
                    <option value="Firmware">Embedded Firmware &amp; Micro-ROS</option>
                    <option value="Electrical">Electrical &amp; Power Bus Wiring</option>
                    <option value="Mechanical">Mechanical Flanges &amp; Gearboxes</option>
                    <option value="Calibration">Optical Zeroing &amp; Calibration</option>
                  </select>
                </div>

                <div>
                  <label className="text-muted block mb-1">Detailed Technical Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide diagnostic codes, voltage readings, or kernel log output..."
                    value={initialText}
                    onChange={(e) => setInitialText(e.target.value)}
                    className="w-full bg-background border border-card-border rounded-xl p-3 text-foreground focus:outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-accent text-background font-bold text-xs uppercase hover:bg-sky-300 transition-all shadow-glow-sm"
                >
                  Submit Ticket
                </button>
              </form>
            ) : currentTicket ? (
              /* Message Thread View */
              <div className="flex flex-col h-full justify-between space-y-4">
                {/* Thread Header */}
                <div className="border-b border-card-border pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-foreground font-sans">{currentTicket.subject}</h4>
                    <div className="text-[11px] font-mono text-muted">
                      {currentTicket.category} · Status: <span className="text-accent">{currentTicket.status}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-accent/10 border border-accent/30 text-accent">
                    Dedicated Hardware Support
                  </span>
                </div>

                {/* Messages Bubbles Area */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[320px]">
                  {currentTicket.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === 'customer' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-muted mb-1">
                        {msg.authorName} · {msg.timestamp}
                      </div>
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-mono leading-relaxed ${
                          msg.sender === 'customer'
                            ? 'bg-accent/15 border border-accent/40 text-foreground rounded-tr-none'
                            : 'bg-background border border-card-border text-foreground/90 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input Box */}
                <form onSubmit={handleSendMessage} className="pt-3 border-t border-card-border flex items-center gap-2">
                  <input
                    type="text"
                    value={newMsgText}
                    onChange={(e) => setNewMsgText(e.target.value)}
                    placeholder="Type technical reply to engineering team..."
                    className="flex-1 bg-background border border-card-border rounded-xl px-4 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-accent"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-accent text-background hover:bg-sky-300 transition-colors shadow-glow-sm"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
