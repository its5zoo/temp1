import { ArrowRight, Link as LinkIcon, Unlink, ServerCrash, RefreshCw } from 'lucide-react';

export default function StorySection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
            Institutions have applications and data.<br/>
            <span className="text-indigo-600">They lacked the governed operating layer.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Historically, higher education technology forced a choice: rigid ERPs that stifle innovation, or point solutions that create data silos. Acad Core introduces a third way.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Before: Disconnected Tools */}
          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 relative group">
            <div className="absolute top-4 right-4 bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <ServerCrash size={14} /> The Old Way
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-8">Disconnected Point Solutions</h3>
            
            <div className="relative h-64 w-full">
              {/* Floating, disconnected cards */}
              <div className="absolute top-0 left-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 rotate-[-6deg] w-40 z-10 group-hover:-translate-y-1 transition-transform">
                <div className="h-2 w-12 bg-slate-200 rounded mb-2"></div>
                <div className="text-sm font-semibold text-slate-700">Admissions CRM</div>
              </div>
              
              <div className="absolute bottom-4 left-1/4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 rotate-[4deg] w-40 z-20 group-hover:translate-y-1 transition-transform">
                <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                <div className="text-sm font-semibold text-slate-700">LMS / Grading</div>
              </div>

              <div className="absolute top-12 right-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200 rotate-[8deg] w-48 z-10 group-hover:-translate-y-1 transition-transform">
                <div className="h-2 w-10 bg-slate-200 rounded mb-2"></div>
                <div className="text-sm font-semibold text-slate-700">Finance System</div>
              </div>

              {/* Broken Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-rose-300 stroke-2" strokeDasharray="4 4">
                <path d="M 100 80 Q 150 120 220 90" fill="none" />
                <path d="M 240 100 Q 280 180 200 220" fill="none" />
                {/* Break markers */}
                <circle cx="160" cy="100" r="4" fill="#fda4af" stroke="none" />
                <circle cx="240" cy="160" r="4" fill="#fda4af" stroke="none" />
              </svg>
              <div className="absolute top-[40%] left-[40%] bg-white p-1 rounded shadow-sm text-rose-500"><Unlink size={16} /></div>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400" /> Fragmented systems & duplicate records</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400" /> Manual reconciliation</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400" /> Audit panic & assembled evidence</li>
            </ul>
          </div>

          {/* After: Acad Core */}
          <div className="bg-indigo-950 p-8 md:p-12 rounded-3xl border border-indigo-800 relative group shadow-2xl">
            <div className="absolute top-4 right-4 bg-lime-400/20 text-lime-400 border border-lime-400/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <LinkIcon size={14} /> Acad Core
            </div>
            
            <h3 className="text-xl font-bold text-white mb-8">One Governed Model</h3>
            
            <div className="relative h-64 w-full flex items-center justify-center">
              {/* Coherent System Diagram */}
              <div className="relative w-full max-w-[280px] aspect-square">
                {/* Central Data Layer */}
                <div className="absolute inset-4 rounded-full border border-indigo-700/50 bg-indigo-900/40 flex items-center justify-center z-0 animate-[spin_60s_linear_infinite]">
                </div>
                <div className="absolute inset-12 rounded-full bg-indigo-800/80 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(79,70,229,0.3)] border border-indigo-500/50 backdrop-blur-md">
                   <div className="text-center">
                     <RefreshCw size={24} className="mx-auto text-lime-400 mb-1" />
                     <div className="text-[10px] font-bold text-white uppercase tracking-widest">Shared Data</div>
                   </div>
                </div>

                {/* Connected Nodes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-indigo-500/50 text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-20">Admissions</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-900 border border-indigo-500/50 text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-20">Finance</div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 border border-indigo-500/50 text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-20">Academics</div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-slate-900 border border-indigo-500/50 text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-20">Quality</div>
              </div>
            </div>

            <ul className="mt-8 space-y-3 text-sm text-indigo-200">
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-lime-400" /> Connected lifecycles & shared records</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-lime-400" /> Continuous evidence generation</li>
              <li className="flex items-start gap-2"><div className="mt-1 w-1.5 h-1.5 rounded-full bg-lime-400" /> Explainable, grounded AI assistance</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
