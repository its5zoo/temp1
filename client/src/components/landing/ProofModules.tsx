import { Activity, CheckCircle2, AlertTriangle, ShieldCheck, Zap, BarChart3, Clock, FileText, UserCheck } from 'lucide-react';

export default function ProofModules() {
  return (
    <section className="bg-indigo-950 py-24 text-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Proof of Platform</h2>
          <p className="text-indigo-200 text-lg">Real capabilities built for the complexities of modern higher education.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Subtle connecting line in background (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-indigo-800/50 -translate-y-1/2 z-0"></div>

          {/* Module 1: One Operating Model */}
          <div className="bg-slate-900 border border-indigo-800/50 rounded-2xl p-6 shadow-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400"><Activity size={24} /></div>
              <h3 className="text-xl font-semibold">One Operating Model</h3>
            </div>
            
            {/* Dashboard Mockup */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 font-mono text-xs">
              <div className="flex justify-between text-slate-500 mb-3 uppercase tracking-wider font-sans text-[10px]">
                <span>Lifecycle Signals</span>
                <span className="text-emerald-400">Synced</span>
              </div>
              <div className="space-y-2">
                <SignalRow icon={<UserCheck size={14} className="text-blue-400"/>} label="Admissions" status="Enrolled" time="2m ago" />
                <SignalRow icon={<BarChart3 size={14} className="text-rose-400"/>} label="Assessment" status="Grade Posted" time="5m ago" />
                <SignalRow icon={<ShieldCheck size={14} className="text-orange-400"/>} label="Quality" status="Evidence Logged" time="5m ago" />
              </div>
            </div>
            
            <p className="text-indigo-200 text-sm leading-relaxed">
              <strong className="text-white block mb-1">One change, every lifecycle.</strong>
              When an assessment is graded, it automatically updates student records, generates quality evidence, and signals financial aid.
            </p>
          </div>

          {/* Module 2: Continuous Compliance */}
          <div className="bg-slate-900 border border-indigo-800/50 rounded-2xl p-6 shadow-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-500/20 p-2 rounded-lg text-orange-400"><ShieldCheck size={24} /></div>
              <h3 className="text-xl font-semibold">Continuous Compliance</h3>
            </div>
            
            {/* Dashboard Mockup */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 font-sans">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-semibold mb-1">Evidence Coverage</div>
                  <div className="text-2xl font-bold text-white">94.2%</div>
                </div>
                <div className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} /> Audit-Ready
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">ISO 9001:2015</span>
                  <span className="text-emerald-400">100%</span>
                </div>
                <div className="flex justify-between items-center text-xs bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-300">Regional Standard</span>
                  <span className="text-amber-400">89%</span>
                </div>
              </div>
            </div>
            
            <p className="text-indigo-200 text-sm leading-relaxed">
              <strong className="text-white block mb-1">Audit-ready by design.</strong>
              Frameworks are mapped directly to operational tasks. Evidence is generated passively through daily work, eliminating audit panic.
            </p>
          </div>

          {/* Module 3: Acad AI */}
          <div className="bg-slate-900 border border-indigo-800/50 rounded-2xl p-6 shadow-2xl relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-lime-500/20 p-2 rounded-lg text-lime-400"><Zap size={24} /></div>
              <h3 className="text-xl font-semibold">Acad AI</h3>
            </div>
            
            {/* Dashboard Mockup */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 font-sans">
               <div className="flex items-center gap-2 mb-3 bg-lime-400/10 text-lime-400 p-2 rounded border border-lime-400/20 text-xs">
                 <Zap size={14} className="fill-current" />
                 <span>AI Recommended Intervention</span>
               </div>
               <div className="bg-slate-900 p-3 rounded border border-slate-800">
                 <div className="text-slate-300 text-xs mb-2 leading-relaxed">
                   Based on attendance drop (22%) and recent LMS inactivity, recommend scheduling an advising session.
                 </div>
                 <div className="flex gap-2 mt-3">
                   <button className="flex-1 bg-lime-400 text-slate-950 text-xs font-semibold py-1.5 rounded">Approve</button>
                   <button className="flex-1 bg-slate-800 text-slate-300 text-xs font-medium py-1.5 rounded hover:bg-slate-700">Dismiss</button>
                 </div>
               </div>
            </div>
            
            <p className="text-indigo-200 text-sm leading-relaxed">
              <strong className="text-white block mb-1">You review. Nothing invented.</strong>
              Grounded recommendations based solely on your governed institutional data. Human approval states ensure full accountability.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

function SignalRow({ icon, label, status, time }: { icon: React.ReactNode, label: string, status: string, time: string }) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-800/50 last:border-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-slate-300">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-slate-400">{status}</span>
        <span className="text-slate-600 text-[10px] w-10 text-right">{time}</span>
      </div>
    </div>
  );
}
