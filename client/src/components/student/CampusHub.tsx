'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, BookOpen, Search, Download } from 'lucide-react';

export default function CampusHub() {
  
  const forums = [
    { id: 1, name: 'CS301 Study Group', posts: 142, lastActive: '10 mins ago' },
    { id: 2, name: 'Placement Prep 2027', posts: 89, lastActive: '1 hour ago' },
    { id: 3, name: 'Campus Hackathon Team Building', posts: 34, lastActive: '2 hours ago' },
  ];

  const resources = [
    { id: 1, title: 'Week 4: Graph Algorithms Notes', type: 'notes', course: 'CS301' },
    { id: 2, title: 'Midterm 2025 Past Paper', type: 'past_paper', course: 'ENG202' },
    { id: 3, title: 'Lecture 12 Recording', type: 'recording', course: 'MATH104' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Campus Hub</h1>
        <p className="text-slate-500 mt-1">Connect with peers, access resources, and join discussions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Forums & Messages */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><Users size={20} className="text-indigo-600" /> Discussion Forums</CardTitle>
              <button className="text-sm font-medium text-indigo-600 hover:underline">View All</button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {forums.map(forum => (
                  <div key={forum.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer">
                    <div>
                      <h4 className="font-semibold text-slate-900">{forum.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{forum.posts} active discussions</p>
                    </div>
                    <div className="text-xs text-slate-400">{forum.lastActive}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-indigo-950 text-white border-indigo-900">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-900 p-2 rounded-lg text-indigo-300">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Direct Messages</h3>
                  <p className="text-indigo-200 text-sm">You have 2 unread messages from your advisor.</p>
                </div>
              </div>
              <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                Open Inbox
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Resource Library */}
        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center gap-2"><BookOpen size={20} className="text-emerald-600" /> Resource Library</CardTitle>
              <div className="mt-4 relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Smart search notes, recordings, papers..." 
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {resources.map(res => (
                  <div key={res.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 bg-slate-100 p-1.5 rounded text-slate-500 uppercase text-[10px] font-bold tracking-wider w-12 text-center">
                        {res.type.replace('_', '\n')}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm group-hover:text-emerald-600 transition-colors">{res.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{res.course}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-emerald-600 p-2">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
