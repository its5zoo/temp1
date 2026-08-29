'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function CareerPath({ isEmpty }: { isEmpty: boolean }) {
  
  if (isEmpty) {
    return (
      <div className="text-center py-20">
        <div className="bg-slate-100 p-4 rounded-full inline-block text-slate-400 mb-4">
          <Target size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Set your Career Goal</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-6">
          Tell us where you want to go. We'll map out the skills you need and find the gaps in your current academic profile.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors">
          Choose Career Path
        </button>
      </div>
    );
  }

  // Example Schema: Target AI/ML Engineer
  const careerGoal = "AI/ML Engineer";
  
  const skills = [
    { name: 'Python', required: 80, current: 50, type: 'Technical', match: 'partial' },
    { name: 'Linear Algebra', required: 90, current: 85, type: 'Technical', match: 'strong' },
    { name: 'PyTorch', required: 70, current: 0, type: 'Tool', match: 'missing' },
    { name: 'Technical Comm.', required: 70, current: 75, type: 'Soft Skill', match: 'strong' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Career & Skill Path</h1>
        <p className="text-slate-500 mt-1">Gap analysis based on your academic performance and declared skills.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Target & Summary */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="bg-indigo-950 text-white border-indigo-900">
            <CardContent className="p-6">
              <div className="text-indigo-300 text-sm font-medium mb-1 uppercase tracking-wider">Target Role</div>
              <h2 className="text-2xl font-bold mb-4">{careerGoal}</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1 text-indigo-200">
                    <span>Overall Match</span>
                    <span>55%</span>
                  </div>
                  <div className="w-full bg-indigo-900/50 rounded-full h-2">
                    <div className="bg-lime-400 h-2 rounded-full" style={{ width: '55%' }} />
                  </div>
                </div>
                <p className="text-xs text-indigo-200/70 leading-relaxed">
                  You have a strong foundation in mathematics, but you are missing key framework skills required for this role.
                </p>
                <button className="w-full py-2 bg-indigo-800 hover:bg-indigo-700 border border-indigo-600 rounded-lg text-sm font-medium transition-colors">
                  Edit Goal
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="text-xs font-bold text-blue-700 mb-1">Missing Skill: PyTorch</div>
                <div className="text-sm text-blue-900 mb-2">Enroll in <strong>CS410: Deep Learning</strong> next semester to close this gap.</div>
                <button className="text-xs font-medium text-blue-700 hover:underline">View Syllabus</button>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="text-xs font-bold text-amber-700 mb-1">Skill Gap: Python</div>
                <div className="text-sm text-amber-900 mb-2">Your Python proficiency is at 50%. Practice object-oriented concepts before taking CS410.</div>
                <button className="text-xs font-medium text-amber-700 hover:underline">View Resources</button>
              </div>
            </CardContent>
          </Card>

          {/* Internships & Hackathons Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Experience Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div>
                  <div className="text-xs font-bold text-indigo-600 mb-0.5">HACKATHON</div>
                  <div className="text-sm font-semibold text-slate-900">UniVerse Build AI 2026</div>
                </div>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold rounded">Completed</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                <div>
                  <div className="text-xs font-bold text-indigo-600 mb-0.5">INTERNSHIP</div>
                  <div className="text-sm font-semibold text-slate-900">Data Science Intern - TechCorp</div>
                </div>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] uppercase font-bold rounded">Applied</span>
              </div>
              <button className="w-full text-xs font-medium text-indigo-600 hover:underline mt-2">
                + Add Experience
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Skill Graph Analysis */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg">Skill Gap Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {skills.map(skill => (
                  <div key={skill.name} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 hover:bg-slate-50 transition-colors">
                    
                    <div className="w-48 shrink-0">
                      <div className="font-semibold text-slate-900 text-sm">{skill.name}</div>
                      <div className="text-xs text-slate-500">{skill.type}</div>
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Current: {skill.current}%</span>
                        <span className="text-slate-500">Required: {skill.required}%</span>
                      </div>
                      <div className="relative w-full h-2 bg-slate-100 rounded-full">
                        {/* Target Marker */}
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-slate-400 z-10"
                          style={{ left: `${skill.required}%` }}
                        />
                        {/* Current Progress */}
                        <div 
                          className={`absolute top-0 bottom-0 left-0 rounded-full ${
                            skill.match === 'strong' ? 'bg-emerald-500' : 
                            skill.match === 'partial' ? 'bg-amber-400' : 'bg-rose-400'
                          }`}
                          style={{ width: `${skill.current}%` }}
                        />
                      </div>
                    </div>

                    <div className="w-32 shrink-0 flex justify-end">
                      {skill.match === 'strong' ? (
                        <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                          <CheckCircle2 size={16} /> Proficient
                        </div>
                      ) : skill.match === 'partial' ? (
                        <div className="flex items-center gap-1 text-amber-600 text-sm font-medium">
                          <Circle size={16} /> Needs Work
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-600 text-sm font-medium">
                          <Circle size={16} className="text-rose-200" fill="currentColor" /> Missing
                        </div>
                      )}
                    </div>

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
