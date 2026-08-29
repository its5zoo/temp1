import { BrainCircuit, AlertOctagon, Info, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Intelligence() {
  const capabilities = [
    { num: '01', title: 'Predictive Analytics', desc: 'Identify at-risk students and intervene before minor issues become systemic dropouts.' },
    { num: '02', title: 'Workflow Automation', desc: 'Eliminate manual routing for approvals, curriculum changes, and faculty requests.' },
    { num: '03', title: 'AI Governance', desc: 'Complete explainability. Every model decision is logged, auditable, and traceable to source data.' },
    { num: '04', title: 'Resource Optimization', desc: 'Intelligently schedule classrooms and faculty based on historical utilization patterns.' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text & Capabilities */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Intelligence, demonstrated.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Data before models. Governance before automation. Assistance before autonomy. 
              Our AI doesn't act on its own—it surfaces grounded insights for your team to review and approve.
            </p>
            
            <div className="space-y-6">
              {capabilities.map((cap) => (
                <div key={cap.num} className="flex gap-4 group">
                  <div className="text-indigo-300 font-mono font-bold text-lg pt-0.5 group-hover:text-indigo-600 transition-colors">
                    {cap.num}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{cap.title}</h4>
                    <p className="text-sm text-slate-600">{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Realistic Mockup */}
          <div className="lg:col-span-7 w-full max-w-2xl mx-auto">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              
              <div className="bg-white px-5 py-4 border-b border-slate-200 flex items-center gap-3">
                <BrainCircuit className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-800">Early Alert Intelligence</h3>
              </div>

              <div className="p-5 bg-slate-50 space-y-4">
                {/* Student Alert Card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                  
                  <div className="flex justify-between items-start mb-4 pl-2">
                    <div>
                      <div className="font-bold text-slate-900">Michael Chen</div>
                      <div className="text-xs text-slate-500">B.Sc. Computer Science • Year 2</div>
                    </div>
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                      High Risk (82%)
                    </Badge>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 pl-2">
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      <Info className="h-3.5 w-3.5 text-indigo-500" /> Explainable Signals
                    </div>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-center gap-2">
                        <AlertOctagon className="h-3.5 w-3.5 text-rose-500" />
                        Attendance dropped below 60% in core modules (Last 14 days)
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertOctagon className="h-3.5 w-3.5 text-rose-500" />
                        No LMS logins in 5 days
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2 pl-2">
                    <button className="flex-1 bg-indigo-600 text-white text-sm font-semibold py-2 rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
                      Intervene
                    </button>
                    <button className="flex-1 bg-white text-slate-700 border border-slate-300 text-sm font-medium py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                      Monitor
                    </button>
                    <button className="bg-white text-slate-700 border border-slate-300 px-3 rounded-lg shadow-sm hover:bg-slate-50 transition-colors">
                      Stable
                    </button>
                  </div>

                </div>

                {/* Smaller secondary card */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-slate-300 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">Sarah Jenkins</div>
                      <div className="text-xs text-slate-500">Monitor Status • Stable</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              
              <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-center gap-1">
                <BrainCircuit className="h-3 w-3" /> Model Confidence: 94% • Grounded in institutional data only
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
