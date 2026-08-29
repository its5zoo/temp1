'use client';

import { CheckCircle, AlertTriangle, Lightbulb, Bell, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StudentHome({ isEmpty, userName }: { isEmpty: boolean, userName: string }) {
  
  if (isEmpty) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome, {userName}!</h1>
          <p className="text-slate-500 mt-1">B.Tech Computer Science • First Year, Semester 1</p>
        </div>
        
        <Card className="bg-indigo-50/50 border-indigo-100 shadow-sm">
          <CardContent className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 mb-6">
              <Lightbulb size={40} />
            </div>
            <h2 className="text-2xl font-bold text-indigo-950 mb-2">Your academic journey starts here.</h2>
            <p className="text-indigo-800/70 max-w-md mx-auto mb-8">
              Because you are new, there is no performance data (CGPA or attendance) to display yet. As your professors post grades and roll calls, this dashboard will update automatically.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
              View Course Syllabus
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // POPULATED STATE (Tier 1: Status first, action second)
  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome back, {userName}</h1>
          <p className="text-slate-500 mt-1">B.Tech Computer Science • Year 3, Semester 6</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Current Status</div>
          <div className="text-emerald-600 font-bold flex items-center justify-end gap-1">
            <CheckCircle size={16} /> Good Standing
          </div>
        </div>
      </div>

      {/* STATUS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatusCard title="CGPA" value="3.82" trend="+0.1 since last term" />
        <StatusCard title="Attendance" value="94.5%" trend="Above 75% requirement" />
        <StatusCard title="Credits" value="84 / 120" trend="On track to graduate" />
        <StatusCard title="Career Match" value="High" trend="AI/ML Engineer Path" />
      </div>

      {/* ACTION ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          {/* Critical Announcements (UniVerse Extension) */}
          <Card className="border-indigo-200 bg-indigo-50/40 shadow-sm mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-indigo-900 flex items-center gap-2">
                <Bell size={18} /> Critical Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                <div>
                  <h4 className="font-semibold text-indigo-900 text-sm">End Semester Exam Schedule Released</h4>
                  <p className="text-xs text-indigo-700 mt-1">Check the Campus Hub for the official date sheet. Exams begin Nov 1st.</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors">
                  View
                </button>
              </div>
            </CardContent>
          </Card>

          {/* AI Support Alerts (Tier 2 requirement) - Opt-in rules apply here behind the scenes */}
          <Card className="border-rose-200 bg-rose-50/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-rose-900 flex items-center gap-2">
                <AlertTriangle size={18} /> Support Nudges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start justify-between bg-white p-4 rounded-lg border border-rose-100 shadow-sm">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-rose-500"><AlertTriangle size={16} /></div>
                  <div>
                    <h4 className="font-semibold text-rose-900 text-sm">Attendance dropping in CS301</h4>
                    <p className="text-xs text-rose-700 mt-1">You've missed the last two lectures. Staying engaged is key to mastering Advanced Data Structures.</p>
                  </div>
                </div>
                <button className="text-xs font-medium text-slate-400 hover:text-slate-600">Dismiss</button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Activities */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">What to do next</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionItem 
                  title="Fee Payment Overdue" 
                  subtitle="₹25,000 outstanding balance"
                  type="danger"
                  action="Pay Now"
                />
                <ActionItem 
                  title="Graph Theory Project Due" 
                  subtitle="CS301 • Due Tomorrow at 11:59 PM"
                  type="danger"
                  action="Submit File"
                />
                <ActionItem 
                  title="Revise Thermodynamics Unit 3" 
                  subtitle="AI Recommendation based on upcoming Quiz"
                  type="info"
                  action="View Notes"
                />
                <ActionItem 
                  title="Provide Feedback for MATH104" 
                  subtitle="Mid-semester survey is now open (Anonymous)"
                  type="neutral"
                  action="Start Survey"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-sky-950 text-white shadow-sm border-sky-900">
            <CardContent className="p-6">
              <div className="bg-sky-900/60 p-3 rounded-xl mb-4 text-sky-300 inline-flex items-center justify-center border border-sky-800/50">
                <Lightbulb size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-white">AI Academic Insights</h3>
              <p className="text-sky-100 text-sm mb-6 leading-relaxed">
                Based on your recent assessment in Linear Algebra, you are struggling with eigenvalue calculations.
              </p>
              <button className="w-full flex items-center justify-between py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl text-sm font-bold transition-all shadow-sm cursor-pointer">
                <span>Generate Practice Set</span>
                <ArrowRight size={16} />
              </button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

function StatusCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-5">
        <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
        <div className="text-3xl font-bold text-slate-900 mb-2">{value}</div>
        <div className="text-xs text-slate-400">{trend}</div>
      </CardContent>
    </Card>
  );
}

function ActionItem({ title, subtitle, type, action }: { title: string, subtitle: string, type: 'danger' | 'info' | 'neutral', action: string }) {
  const getBadgeColor = () => {
    switch(type) {
      case 'danger': return 'bg-rose-100 text-rose-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      case 'neutral': return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${type === 'danger' ? 'bg-rose-500' : type === 'info' ? 'bg-blue-500' : 'bg-slate-400'}`} />
        <div>
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
      <button className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700 whitespace-nowrap ml-4 transition-colors shadow-sm">
        {action}
      </button>
    </div>
  );
}
