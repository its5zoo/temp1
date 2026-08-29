'use client';

import { useState, useEffect } from 'react';
import { Applicant, ApplicationStatus, MOCK_APPLICANTS } from '@/lib/recruitment-data';
import { Mail, Clock, Phone, MapPin, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast"; // Shadcn UI toast hook we'll need to use or simulate

const STAGES: ApplicationStatus[] = ['Applied', 'Screening', 'Interview', 'Selected', 'Onboarding'];

export default function KanbanBoard() {
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [search, setSearch] = useState('');
  
  // Custom simple toast since we might not have the shadcn toaster fully set up in this session
  const [toastMsg, setToastMsg] = useState<{title: string, desc: string} | null>(null);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  const handleDragStart = (e: React.DragEvent, applicantId: string) => {
    e.dataTransfer.setData('applicantId', applicantId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: ApplicationStatus) => {
    e.preventDefault();
    const applicantId = e.dataTransfer.getData('applicantId');
    
    setApplicants(prev => prev.map(app => {
      if (app.id === applicantId) {
        // Only trigger "email" if status actually changed
        if (app.status !== newStatus) {
          setToastMsg({
            title: 'Automated Email Sent',
            desc: `Notified ${app.name} about status update to: ${newStatus}`
          });
        }
        return { ...app, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return app;
    }));
  };

  const filteredApplicants = applicants.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) || 
    app.jobId.toLowerCase().includes(search.toLowerCase())
  );

  const getStageColor = (stage: ApplicationStatus) => {
    switch(stage) {
      case 'Applied': return 'bg-slate-100 border-slate-200';
      case 'Screening': return 'bg-blue-50 border-blue-200';
      case 'Interview': return 'bg-purple-50 border-purple-200';
      case 'Selected': return 'bg-emerald-50 border-emerald-200';
      case 'Onboarding': return 'bg-indigo-50 border-indigo-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  const getStageHeaderColor = (stage: ApplicationStatus) => {
    switch(stage) {
      case 'Applied': return 'text-slate-700 bg-slate-200/50';
      case 'Screening': return 'text-blue-700 bg-blue-200/50';
      case 'Interview': return 'text-purple-700 bg-purple-200/50';
      case 'Selected': return 'text-emerald-700 bg-emerald-200/50';
      case 'Onboarding': return 'text-indigo-700 bg-indigo-200/50';
      default: return 'text-slate-700 bg-slate-200/50';
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Toast Notification Simulation */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-xl z-50 animate-in slide-in-from-bottom-5 fade-in border border-slate-700">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-lime-400" />
            <div>
              <div className="font-semibold text-sm">{toastMsg.title}</div>
              <div className="text-xs text-slate-300">{toastMsg.desc}</div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates or Job IDs..."
            className="w-full h-10 pl-10 pr-4 rounded-md border border-slate-200 focus:outline-none focus:border-slate-800 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Total Candidates: {filteredApplicants.length}
        </div>
      </div>

      {/* Kanban Grid */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max h-full items-start">
          
          {STAGES.map(stage => {
            const stageApplicants = filteredApplicants.filter(app => app.status === stage);
            
            return (
              <div 
                key={stage}
                className={`w-80 rounded-xl border flex flex-col h-full max-h-[70vh] shrink-0 transition-colors ${getStageColor(stage)}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage)}
              >
                {/* Column Header */}
                <div className={`p-4 border-b rounded-t-xl flex justify-between items-center ${getStageHeaderColor(stage)}`}>
                  <h3 className="font-bold text-sm">{stage}</h3>
                  <Badge variant="secondary" className="bg-white/60 text-slate-800 hover:bg-white/80">
                    {stageApplicants.length}
                  </Badge>
                </div>

                {/* Cards Container */}
                <div className="p-3 overflow-y-auto flex-1 space-y-3 custom-scrollbar">
                  {stageApplicants.map(app => (
                    <div 
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-slate-300 hover:shadow transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold text-slate-900 text-sm">{app.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{app.id}</div>
                      </div>
                      
                      <div className="text-xs font-semibold text-slate-600 mb-3 pb-2 border-b border-slate-100">
                        {app.jobId}
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-xs text-slate-500 gap-2">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span>{app.experienceYears} yrs exp</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500 gap-2">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span className="truncate">{app.email}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-500 gap-2">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          <span>{app.phone}</span>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-slate-400 text-right mt-2">
                        Updated: {app.lastUpdated}
                      </div>
                    </div>
                  ))}
                  
                  {stageApplicants.length === 0 && (
                    <div className="text-center p-4 text-sm text-slate-400 border-2 border-dashed border-slate-200/50 rounded-lg">
                      Drop candidates here
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>
      
    </div>
  );
}
