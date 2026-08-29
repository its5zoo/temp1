'use client';

import { useState } from 'react';
import { Database, UserCheck, GraduationCap, Briefcase, FileSignature, CheckCircle, Scale, DollarSign, BrainCircuit } from 'lucide-react';

const lifecycles = [
  { id: 'admissions', label: 'Admissions', icon: <UserCheck />, desc: 'Attract, assess, and enroll best-fit students seamlessly.', color: 'text-blue-500', pos: 'col-start-2 row-start-1 -mt-4' },
  { id: 'student', label: 'Student Lifecycle', icon: <GraduationCap />, desc: 'Manage enrollment, progression, and graduation paths.', color: 'text-indigo-500', pos: 'col-start-3 row-start-1 mt-6' },
  { id: 'faculty', label: 'Faculty Lifecycle', icon: <Briefcase />, desc: 'Recruitment, workload, and performance tracking.', color: 'text-purple-500', pos: 'col-start-3 row-start-2' },
  { id: 'operations', label: 'Academic Operations', icon: <Database />, desc: 'Curriculum, scheduling, and catalog management.', color: 'text-fuchsia-500', pos: 'col-start-3 row-start-3 -mt-6' },
  { id: 'assessment', label: 'Assessment', icon: <FileSignature />, desc: 'Exams, assignments, rubrics, and continuous evaluation.', color: 'text-rose-500', pos: 'col-start-2 row-start-3 mt-4' },
  { id: 'quality', label: 'Quality & Accreditation', icon: <CheckCircle />, desc: 'Continuous compliance and evidence collection.', color: 'text-orange-500', pos: 'col-start-1 row-start-3 -mt-6' },
  { id: 'governance', label: 'Academic Governance', icon: <Scale />, desc: 'Policy enforcement and automated approvals.', color: 'text-amber-500', pos: 'col-start-1 row-start-2' },
  { id: 'finance', label: 'Student Finance', icon: <DollarSign />, desc: 'Billing, scholarships, and financial aid management.', color: 'text-lime-600', pos: 'col-start-1 row-start-1 mt-6' },
];

export default function LifecycleMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeData = lifecycles.find(l => l.id === activeNode);

  return (
    <section id="operating-model" className="bg-slate-50 py-24 border-b border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Every lifecycle. One core layer. <br/>
            <span className="text-indigo-600">One governed institution.</span>
          </h2>
          <p className="text-lg text-slate-600">
            A change in one lifecycle propagates through every other lifecycle it touches. No more manual reconciliation or fragmented systems.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center">
          
          {/* Interactive Map */}
          <div className="relative w-full max-w-[600px] aspect-square flex-shrink-0">
            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
              {lifecycles.map((_, idx) => {
                const angle = (idx * Math.PI) / 4 - Math.PI / 2;
                const x = 50 + 35 * Math.cos(angle);
                const y = 50 + 35 * Math.sin(angle);
                const isActive = activeNode === lifecycles[idx].id;
                const isTouched = activeNode !== null && !isActive; // Simple logic: all touch the core
                return (
                  <line 
                    key={idx}
                    x1="50" y1="50" x2={x} y2={y} 
                    stroke={isActive ? '#6366f1' : '#cbd5e1'} 
                    strokeWidth={isActive ? "1.5" : "0.5"}
                    className="transition-colors duration-500"
                  />
                );
              })}
            </svg>

            {/* Core Node */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full flex flex-col items-center justify-center bg-indigo-950 text-white shadow-xl shadow-indigo-900/20 transition-transform duration-500 z-10 border-4 ${activeNode ? 'border-indigo-400 scale-105' : 'border-indigo-800'}`}
            >
              <BrainCircuit className="h-8 w-8 mb-2 text-lime-400" />
              <div className="text-xs font-bold text-center leading-tight">Platform &<br/>Data/AI Core</div>
            </div>

            {/* Orbiting Nodes */}
            {lifecycles.map((lifecycle, idx) => {
              const angle = (idx * Math.PI) / 4 - Math.PI / 2;
              const radius = 42; // Percentage
              const left = `${50 + radius * Math.cos(angle)}%`;
              const top = `${50 + radius * Math.sin(angle)}%`;
              const isSelected = activeNode === lifecycle.id;
              const isIdle = activeNode !== null && !isSelected;

              return (
                <button
                  key={lifecycle.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex flex-col items-center justify-center bg-white border-2 shadow-lg transition-all duration-300 group z-20 outline-none focus:ring-4 focus:ring-indigo-500/30 ${
                    isSelected ? `border-indigo-500 scale-110 shadow-indigo-200` : 
                    isIdle ? 'border-slate-100 opacity-60 scale-95 grayscale' : 
                    'border-slate-200 hover:border-indigo-300 hover:scale-105'
                  }`}
                  style={{ left, top }}
                  onClick={() => setActiveNode(isSelected ? null : lifecycle.id)}
                  onMouseEnter={() => setActiveNode(lifecycle.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onFocus={() => setActiveNode(lifecycle.id)}
                  onBlur={() => setActiveNode(null)}
                  aria-label={`View ${lifecycle.label} details`}
                >
                  <div className={`mb-1 ${isSelected ? lifecycle.color : 'text-slate-500'}`}>
                    {lifecycle.icon}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-700 text-center px-1 leading-tight">
                    {lifecycle.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanatory Panel (Desktop) / Accordion (Mobile via restructuring if needed, keeping it simple here) */}
          <div className="w-full lg:w-[400px] h-[200px] flex items-center justify-center">
            {activeData ? (
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100 animate-in fade-in slide-in-from-right-8 duration-300 w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <div className={`inline-flex p-2 rounded-lg bg-slate-50 mb-4 ${activeData.color}`}>
                  {activeData.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{activeData.label}</h3>
                <p className="text-slate-600">{activeData.desc}</p>
              </div>
            ) : (
              <div className="text-center p-8 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl w-full">
                <BrainCircuit className="h-10 w-10 mx-auto mb-4 opacity-50" />
                <p>Hover or select a lifecycle node to see how it connects to the governed core.</p>
              </div>
            )}
          </div>

        </div>

        {/* Legend */}
        <div className="flex justify-center items-center gap-6 mt-12 text-sm text-slate-500">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Selected</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-200"></div> Connected</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Idle</div>
        </div>

      </div>
    </section>
  );
}
