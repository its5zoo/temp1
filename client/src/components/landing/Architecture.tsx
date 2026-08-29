import { Code2, Database, Eye, Shield, Globe } from 'lucide-react';

export default function Architecture() {
  const cards = [
    { title: 'API-first core.', icon: <Code2 className="h-5 w-5" />, desc: 'Every feature in the platform is accessible via secure, documented APIs for headless extensibility.' },
    { title: 'Single source of truth.', icon: <Database className="h-5 w-5" />, desc: 'One unified database schema that eliminates reconciliation errors across different university departments.' },
    { title: 'Role-aware visibility.', icon: <Eye className="h-5 w-5" />, desc: 'Fine-grained access control ensures users only see data they are authorized to act upon.' },
    { title: 'Externalized policy engine.', icon: <Shield className="h-5 w-5" />, desc: 'Academic rules are managed centrally, not hardcoded into individual application modules.' },
    { title: 'Data residency.', icon: <Globe className="h-5 w-5" />, desc: 'Deploy within specific geographic regions to strictly comply with local data sovereignty laws.' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Built for institutions that get audited.
          </h2>
          <p className="text-lg text-slate-600">
            A technically credible architecture designed to handle the complexity of higher education without creating technical debt.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Architecture Cards */}
          <div className="lg:col-span-5 space-y-4">
            {cards.map((card, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="bg-white p-2 rounded-lg border border-slate-200 text-indigo-600 shadow-sm mt-1">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{card.title}</h4>
                  <p className="text-sm text-slate-600">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Clean Architecture Diagram */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              
              {/* Background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20"></div>

              <div className="relative z-10 flex flex-col items-center gap-6">
                
                {/* Top Layer: Applications */}
                <div className="flex justify-center gap-4 w-full">
                  <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-center text-xs font-semibold text-slate-300 backdrop-blur-sm">Admissions App</div>
                  <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-center text-xs font-semibold text-slate-300 backdrop-blur-sm">Student Portal</div>
                  <div className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg p-3 text-center text-xs font-semibold text-slate-300 backdrop-blur-sm">Faculty Console</div>
                </div>

                {/* Connecting lines */}
                <div className="flex justify-around w-full px-12">
                  <div className="w-[1px] h-6 bg-indigo-500/50"></div>
                  <div className="w-[1px] h-6 bg-indigo-500/50"></div>
                  <div className="w-[1px] h-6 bg-indigo-500/50"></div>
                </div>

                {/* Middle Layer: APIs */}
                <div className="w-full bg-indigo-900/50 border border-indigo-500/30 rounded-lg p-3 flex justify-center items-center gap-2 backdrop-blur-sm">
                  <Code2 className="h-4 w-4 text-indigo-400" />
                  <span className="text-xs font-mono text-indigo-300">Unified REST & GraphQL API Gateway</span>
                </div>

                {/* Connecting lines */}
                <div className="w-[1px] h-6 bg-indigo-500/50"></div>

                {/* Bottom Layer: Core Data & Policy */}
                <div className="w-full bg-slate-800 border-2 border-indigo-600/50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-[40px]"></div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-indigo-600 p-2 rounded flex-shrink-0 text-white"><Shield className="h-5 w-5" /></div>
                    <div className="text-sm font-bold text-white">Governed Data & Policy Layer</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400 uppercase tracking-wider text-center border border-slate-700">Centralized Auth</div>
                    <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400 uppercase tracking-wider text-center border border-slate-700">Audit Logging</div>
                    <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400 uppercase tracking-wider text-center border border-slate-700">Policy Engine</div>
                    <div className="bg-slate-900 rounded p-2 text-[10px] text-slate-400 uppercase tracking-wider text-center border border-slate-700">Data Store</div>
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
