'use client';

import { ArrowRight, CheckCircle2, ShieldAlert, Activity, GitCommit } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-indigo-950 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background abstract shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/30 blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e511_1px,transparent_1px),linear-gradient(to_bottom,#4f46e511_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Typographic Statement */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/50 text-indigo-200 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
              </span>
              Platform & Data/AI Core v2.0 Live
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              The Academic Operating System <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-lime-300">for higher education.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100/80 leading-relaxed mb-10 max-w-xl font-light">
              Acad Core unifies institutional lifecycles from admissions to alumni and curriculum to accreditation through one governed operating model. Compliance evidence is generated through daily work, not audit emergencies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#operating-model" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-indigo-950 font-semibold text-base hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl"
              >
                See the operating model
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-transparent border border-indigo-400/30 text-white font-medium text-base hover:bg-indigo-900/50 transition-colors"
              >
                Talk to us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Right: Realistic Registrar Interface Composition */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none perspective-[2000px]">
            {/* Main Console Window */}
            <div className="bg-[#0f172a] rounded-xl border border-indigo-800/50 shadow-2xl overflow-hidden transform lg:rotate-y-[-5deg] lg:rotate-x-[5deg] lg:translate-x-4 transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0 hover:translate-x-0">
              
              {/* Window Header */}
              <div className="bg-[#1e293b] px-4 py-3 flex items-center border-b border-indigo-800/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="mx-auto text-xs font-medium text-slate-400 uppercase tracking-widest">Registrar Operations • Main Console</div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 md:p-6 grid gap-6 relative">
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Active Students</div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      24,892 <span className="text-[10px] text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded font-medium">+2.4%</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Pending Requests</div>
                    <div className="text-xl font-bold text-white">
                      143 <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-1 animate-pulse"></span>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Compliance State</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1 mt-1">
                      <CheckCircle2 className="h-4 w-4" /> Audit-Ready
                    </div>
                  </div>
                </div>

                {/* Task Area */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider flex justify-between">
                    <span>My Work: High Priority</span>
                    <span className="text-indigo-400 cursor-pointer hover:text-indigo-300">View All</span>
                  </div>
                  
                  {/* Task Items */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer group">
                      <div className="mt-0.5"><ShieldAlert className="h-4 w-4 text-rose-400" /></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-200 group-hover:text-white">Resolve missing grading rubrics</div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                          <span className="text-slate-400">CS301 • Faculty of Science</span>
                          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                          <span className="text-rose-400 font-medium">Blocks Accreditation</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 transition-colors cursor-pointer group">
                      <div className="mt-0.5"><Activity className="h-4 w-4 text-amber-400" /></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-200 group-hover:text-white">Review early-alert interventions</div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                          <span className="text-slate-400">12 Students • High Risk</span>
                          <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                          <span>Due in 2 days</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Notification (Absolute) */}
                <div className="absolute -right-6 -bottom-6 bg-white rounded-lg shadow-2xl p-4 border border-slate-100 flex items-center gap-4 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-500 hidden md:flex">
                  <div className="bg-lime-100 p-2 rounded-full">
                    <GitCommit className="h-5 w-5 text-lime-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">One change, everywhere.</div>
                    <div className="text-xs text-slate-500">Curriculum update synced to 4 lifecycles.</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
