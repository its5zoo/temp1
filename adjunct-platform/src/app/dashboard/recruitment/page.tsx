'use client';

import { useAuth } from '@/lib/auth-context';
import KanbanBoard from '@/components/recruitment/KanbanBoard';
import { Users, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { MOCK_APPLICANTS } from '@/lib/recruitment-data';

export default function RecruitmentDashboard() {
  const { user } = useAuth();

  // Basic KPI calculations
  const totalApps = MOCK_APPLICANTS.length;
  const selected = MOCK_APPLICANTS.filter(a => a.status === 'Selected' || a.status === 'Onboarding').length;
  const conversionRate = totalApps > 0 ? Math.round((selected / totalApps) * 100) : 0;

  if (user?.role !== 'HOD') {
    return (
      <div className="p-8">
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-lg">
          Access Denied. The Recruitment Dashboard is only accessible to Head of Department (HOD) roles.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Faculty Recruitment Pipeline</h1>
        <p className="text-slate-500">Manage adjunct faculty applications and hiring workflows.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <KPICard 
          title="Total Applications" 
          value={totalApps.toString()} 
          icon={<Users className="text-blue-500" />}
          trend="+12 this week"
        />
        <KPICard 
          title="Avg. Time to Hire" 
          value="18 days" 
          icon={<Clock className="text-orange-500" />}
          trend="-2 days vs last month"
        />
        <KPICard 
          title="Conversion Rate" 
          value={`${conversionRate}%`} 
          icon={<TrendingUp className="text-purple-500" />}
          trend="Applied to Selected"
        />
        <KPICard 
          title="Onboarding" 
          value={MOCK_APPLICANTS.filter(a => a.status === 'Onboarding').length.toString()} 
          icon={<CheckCircle2 className="text-emerald-500" />}
          trend="Action required"
        />
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-hidden">
        <KanbanBoard />
      </div>

    </div>
  );
}

function KPICard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="text-sm font-medium text-slate-500">{title}</div>
        <div className="bg-slate-50 p-2 rounded-lg">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-xs text-slate-400">{trend}</div>
    </div>
  );
}
