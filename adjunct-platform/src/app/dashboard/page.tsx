'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, Clock, MessageSquare, Star, Users, AlertTriangle, Activity, Database, ShieldAlert, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_COURSES, MOCK_SUBMISSIONS, MOCK_DOUBTS, MOCK_ALERTS, MOCK_PROFILES, MOCK_LIFECYCLE_STAGES, MOCK_WEEKLY_REPORTS } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardOverview() {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'admin') return <AdminDashboard />;
  if (user.role === 'adjunct_faculty') return <AdjunctDashboard />;
  if (user.role === 'hod') return <HODDashboard />;
  if (user.role === 'advisor') return <AdvisorDashboard />;
  if (user.role === 'student') return <StudentDashboard />;

  // Basic fallback for other roles
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.name}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Role: {user.role}</CardTitle>
          <CardDescription>This is a basic dashboard view for {user.role}.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

import { useState, useEffect } from 'react';

function HODDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [facultyCount, setFacultyCount] = useState<number>(MOCK_PROFILES.filter(u => u.role === 'adjunct_faculty').length);
  const [facultyList, setFacultyList] = useState<any[]>([]);
  
  useEffect(() => {
    async function loadLiveData() {
      const { count } = await supabase.from('adjunct_faculty').select('*', { count: 'exact', head: true });
      if (count !== null) setFacultyCount(count);

      // Fetch the actual roster of teaching staff
      const { data: roster } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['adjunct_faculty', 'hod', 'advisor'])
        .order('role', { ascending: true });
        
      if (roster) {
        setFacultyList(roster);
      }
    }
    loadLiveData();
  }, []);
  const handleDownloadReport = () => {
    // Generate CSV data for the excel sheet
    const headers = ['Metric', 'Value', 'Details'];
    const rows = [
      ['Total Faculty', facultyCount.toString(), 'Active adjunct faculty members'],
      ['Pending Onboarding', '1', 'Dr. Alan Smith is pending LMS Training'],
      ['Average Course Rating', '4.6', 'Out of 5.0 across all department courses'],
      ['Overloaded Staff', MOCK_ALERTS.length.toString(), 'Staff with workload score > 80 or excessive students'],
      [],
      ['Active Alerts', 'Severity', 'Timestamp'],
      ...MOCK_ALERTS.map(alert => [
        `"${alert.message}"`, 
        alert.severity, 
        new Date(alert.timestamp).toLocaleDateString()
      ])
    ];

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Department_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Department Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.name}. Here is the real-time department health.</p>
        </div>
        <Button onClick={handleDownloadReport} className="bg-slate-900 text-white">Generate Department Report</Button>
      </div>
      
      {/* Active Alerts */}
      <Card className="border-rose-200 bg-rose-50/50 shadow-sm">
        <CardHeader className="pb-3 border-b border-rose-100">
          <CardTitle className="text-rose-700 flex items-center gap-2">
            <ShieldAlert size={20} /> System Alerts (Edge Functions)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3">
          {MOCK_ALERTS.map(alert => (
            <div key={alert.id} className="flex gap-3 items-start p-3 bg-white border border-rose-100 rounded-lg">
              <AlertTriangle className={`shrink-0 ${alert.severity === 'high' ? 'text-rose-600' : 'text-amber-500'}`} size={20} />
              <div>
                <p className="text-sm font-medium text-slate-800">{alert.message}</p>
                <p className="text-xs text-slate-500 mt-1">{new Date(alert.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Total Faculty" value={facultyCount.toString()} icon={<Users className="text-blue-600" />} />
        <KPICard title="Pending Onboarding" value="1" icon={<Clock className="text-amber-500" />} />
        <KPICard title="Avg Course Rating" value="4.6" icon={<Star className="text-emerald-500" />} />
        <KPICard title="Overloaded Staff" value={MOCK_ALERTS.length.toString()} icon={<Activity className="text-rose-600" />} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Onboarding Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Jane Doe</div>
                  <div className="text-xs text-slate-500">Adjunct Faculty</div>
                </div>
                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>
              </div>
              <div className="flex justify-between items-center p-3 border border-slate-100 rounded-lg bg-slate-50">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Dr. Alan Smith</div>
                  <div className="text-xs text-slate-500">LMS Training Pending</div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Escalations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">No recent academic escalations from Student Advisors.</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Faculty Roster */}
      <Card className="shadow-sm">
        <CardHeader className="bg-slate-50/50 border-b pb-4">
          <CardTitle>Department Faculty Roster</CardTitle>
          <CardDescription>A live view of all teaching staff within your department.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-100/50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Email</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facultyList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                      Loading faculty data...
                    </td>
                  </tr>
                ) : (
                  facultyList.map(faculty => (
                    <tr key={faculty.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {faculty.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {faculty.email}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="capitalize bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200">
                          {faculty.role.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50"
                          onClick={() => router.push(`/dashboard/users/${faculty.id}`)}
                        >
                          View Profile
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentDashboard() {
  const { user } = useAuth();
  
  // State for Attendance
  const [attendance, setAttendance] = useState<number>(75); // Mock 75% default if query fails
  
  // State for Feedback Form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  useEffect(() => {
    async function loadStudentData() {
      if (!user) return;
      const { data } = await supabase.from('students').select('attendance').eq('profile_id', user.id).single();
      if (data && data.attendance) {
        setAttendance(data.attendance);
      }
    }
    loadStudentData();
  }, [user]);

  // Attendance Math Logic (Assuming 40 total classes)
  const TOTAL_CLASSES = 40;
  const currentAttended = (attendance / 100) * TOTAL_CLASSES;
  let classesNeeded = 0;
  if (attendance < 80) {
    classesNeeded = Math.ceil((0.8 * TOTAL_CLASSES - currentAttended) / 0.2);
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Mock faculty_id (we'll just fetch Jane Doe's ID from adjunct_faculty table)
      const { data: faculty } = await supabase.from('profiles').select('id').eq('email', 'jane.adjunct@univ.edu').single();
      
      if (faculty) {
        const { data: adjunctRow } = await supabase.from('adjunct_faculty').select('id').eq('profile_id', faculty.id).single();
        if (adjunctRow) {
          // If the student doesn't exist in the 'students' table, we will use NULL for student_id to allow anonymous submission
          const { data: studentRow } = await supabase.from('students').select('id').eq('profile_id', user?.id).single();
          
          await supabase.from('faculty_feedback').insert({
            student_id: studentRow ? studentRow.id : null,
            faculty_id: adjunctRow.id,
            overall_rating: rating,
            teaching_rating: rating,
            punctuality_rating: rating,
            responsiveness_rating: rating,
            comments: comments
          });
        }
      }
      setFeedbackSuccess(true);
      setComments('');
      setRating(5);
      setTimeout(() => setFeedbackSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Learning</h1>
        <p className="text-slate-500 mt-1">Welcome back, {user?.name}. Here is your academic progress.</p>
      </div>

      {/* Attendance Tracking Meter */}
      <Card className={`border-l-4 ${attendance >= 80 ? 'border-l-emerald-500' : 'border-l-rose-500'}`}>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            Academic Standing (Attendance)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-slate-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${attendance >= 80 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${attendance}%` }}
              ></div>
            </div>
            <span className="font-bold text-lg">{attendance}%</span>
          </div>
          
          {attendance < 80 ? (
            <div className="bg-rose-50 text-rose-800 p-4 rounded-md mt-4 flex gap-3 items-start">
              <AlertTriangle className="h-5 w-5 mt-0.5" />
              <div>
                <p className="font-semibold">You are At Risk (&lt; 80% Threshold)</p>
                <p className="text-sm mt-1">
                  Based on your current attendance rate, you must attend <strong>{classesNeeded} consecutive upcoming classes</strong> to reach the 80% minimum requirement.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md mt-4">
              <p className="font-semibold">You are in good standing.</p>
              <p className="text-sm mt-1">Keep up the great work and maintain this attendance!</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="text-sm text-slate-600 space-y-2">
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                 <span className="font-medium text-slate-900">Advanced Python Programming</span>
                 <Badge className="bg-purple-100 text-purple-700">In Progress</Badge>
               </div>
               <div className="flex justify-between items-center bg-slate-50 p-3 rounded border border-slate-100">
                 <span className="font-medium text-slate-900">Data Structures</span>
                 <Badge className="bg-purple-100 text-purple-700">In Progress</Badge>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Faculty Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rate Your Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            {feedbackSuccess ? (
              <div className="bg-emerald-50 text-emerald-700 p-6 text-center rounded-md border border-emerald-200">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <p className="font-bold">Feedback Submitted!</p>
                <p className="text-sm mt-1">Thank you for helping us improve teaching quality.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-6 w-6 cursor-pointer transition-colors ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Comments (Anonymous)</label>
                  <textarea 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="How was the teaching style? Was the faculty punctual?"
                    className="w-full p-2 border border-slate-300 rounded-md text-sm min-h-[80px]"
                    required
                  />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 text-white">
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdjunctDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  
  // Filter mock data for this instructor
  const myCourses = MOCK_COURSES.filter(c => c.instructorId === user?.id);
  const myCourseIds = myCourses.map(c => c.id);
  const pendingGrades = MOCK_SUBMISSIONS.filter(s => s.status === 'Pending' && myCourseIds.includes(MOCK_COURSES.find(c => c.id === s.assignmentId)?.id || '')); // Simplification for demo
  const openDoubts = MOCK_DOUBTS.filter(d => d.status === 'Open' && myCourseIds.includes(d.courseId));

  const performanceData = [
    { name: 'Week 1', rating: 4.2 },
    { name: 'Week 2', rating: 4.5 },
    { name: 'Week 3', rating: 4.8 },
    { name: 'Week 4', rating: 4.7 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.name}. Here's what's happening today.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">Start Live Session</Button>
      </div>

      <LifecycleTimeline />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Assigned Courses" value={myCourses.length.toString()} icon={<BookOpen className="text-purple-600" />} />
        <KPICard title="Pending Grades" value={MOCK_SUBMISSIONS.filter(s=>s.status==='Pending').length.toString()} icon={<CheckCircle className="text-amber-500" />} />
        <KPICard title="Open Doubts" value={openDoubts.length.toString()} icon={<MessageSquare className="text-blue-500" />} />
        <KPICard title="Avg Rating" value="4.7 / 5.0" icon={<Star className="text-emerald-500" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Courses */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-lg">Your Active Courses</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {myCourses.map(course => (
                  <div key={course.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div>
                      <div className="font-semibold text-slate-900">{course.title}</div>
                      <div className="text-sm text-slate-500 mt-1">{course.code} • {course.studentsEnrolled} students</div>
                    </div>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Next Session: {course.nextSession ? new Date(course.nextSession).toLocaleDateString() : 'TBD'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <WeeklyReportsForm />

          {/* Performance Chart */}
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-lg">Student Ratings Trend</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="rating" fill="#9333ea" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar content (Tasks & Doubts) */}
        <div className="space-y-8">
          
          <AIInsightsPanel />

          {/* Action Queue */}
          <Card className="shadow-sm border-slate-200 border-t-4 border-t-amber-400">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Action Queue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Unresolved Doubts</h4>
                {openDoubts.map(doubt => (
                  <div key={doubt.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-slate-900">{doubt.studentName}</span>
                      {doubt.slaBreach && <Badge variant="destructive" className="text-[10px]">SLA Breach</Badge>}
                    </div>
                    <p className="text-sm text-slate-600 line-clamp-2">{doubt.question}</p>
                    <Button variant="link" onClick={() => router.push('/dashboard/messages')} className="text-purple-600 p-0 h-auto mt-2 text-sm">Reply Now &rarr;</Button>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Assignments to Grade</h4>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-900">Python Basics Quiz</div>
                    <div className="text-xs text-slate-500 mt-1">3 pending submissions</div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => router.push('/dashboard/courses')}>Grade</Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

function AdvisorDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Advisory Roster</h1>
          <p className="text-slate-500 mt-1">Welcome back, {user?.name}. Here is your assigned student workload.</p>
        </div>
        <Button onClick={() => alert("Calendar integration activated: Invites sent to student cohorts for next Tuesday.")} className="bg-amber-600 hover:bg-amber-700 text-white"><Calendar className="mr-2 h-4 w-4" /> Schedule Meeting</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Assigned Students" value="260" icon={<Users className="text-amber-600" />} />
        <KPICard title="Upcoming Meetings" value="4" icon={<Calendar className="text-blue-500" />} />
        <KPICard title="At Risk (CGPA < 2.5)" value="12" icon={<AlertTriangle className="text-rose-500" />} />
        <KPICard title="Pending Queries" value="8" icon={<MessageSquare className="text-emerald-500" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">AW</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Alice Wong</div>
                  <div className="text-xs text-slate-500">CS Major • Year 2</div>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <div>
                  <div className="text-xs text-slate-500">Success Score</div>
                  <div className="text-sm font-bold text-emerald-600">92%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">CGPA</div>
                  <div className="text-sm font-bold text-slate-800">3.8</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/users')}>View Profile</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">BM</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Bob Martin</div>
                  <div className="text-xs text-slate-500">CS Major • Year 2</div>
                </div>
              </div>
              <div className="flex gap-8 items-center">
                <div>
                  <div className="text-xs text-slate-500">Success Score</div>
                  <div className="text-sm font-bold text-amber-600">65%</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">CGPA</div>
                  <div className="text-sm font-bold text-slate-800">2.4</div>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/users')}>View Profile</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Administration</h1>
          <p className="text-slate-500 mt-1">Global platform controls and provisioning.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Total Active Users" value="1,204" icon={<Users className="text-blue-600" />} />
        <KPICard title="Database Status" value="Healthy" icon={<Database className="text-emerald-500" />} />
        <KPICard title="Storage Used" value="42% (210GB)" icon={<Activity className="text-purple-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>User Provisioning</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-500">Only Admins can provision non-student accounts.</p>
            <div className="space-y-2">
              <input type="email" placeholder="Email Address" className="w-full p-2 border border-slate-300 rounded text-sm" />
              <select className="w-full p-2 border border-slate-300 rounded text-sm">
                <option>HOD</option>
                <option>Adjunct Faculty</option>
                <option>Student Advisor</option>
                <option>Admin</option>
              </select>
              <Button className="w-full bg-slate-900 text-white mt-2">Send Invite Link</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Audit Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm border-b pb-2">
                <span className="font-semibold">System Admin</span> created role <Badge variant="outline" className="text-xs">Adjunct Faculty</Badge> for jane.adjunct@univ.edu
                <div className="text-xs text-slate-400 mt-1">2 hours ago</div>
              </div>
              <div className="text-sm border-b pb-2">
                <span className="font-semibold">System</span> executed edge function `compute-health-score`
                <div className="text-xs text-slate-400 mt-1">6 hours ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
      </CardContent>
    </Card>
  );
}

function LifecycleTimeline() {
  const stages = [
    { id: 'recruitment', label: 'Recruitment' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'training', label: 'Training' },
    { id: 'course_allocation', label: 'Allocation' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'weekly_reports', label: 'Reports' },
    { id: 'performance_review', label: 'Review' },
    { id: 'contract_renewal', label: 'Renewal' },
    { id: 'exit', label: 'Exit' }
  ];

  const getStatusStyle = (stageId: string) => {
    const stageData = MOCK_LIFECYCLE_STAGES.find(s => s.stage === stageId);
    if (!stageData) return { icon: <Clock size={16} />, className: 'bg-slate-100 text-slate-400 border-slate-200', text: 'Locked' };
    
    if (stageData.status === 'completed') {
      return { icon: <CheckCircle size={16} />, className: 'bg-emerald-100 text-emerald-700 border-emerald-500', text: 'Completed' };
    }
    if (stageData.status === 'current') {
      return { icon: <Activity size={16} />, className: 'bg-indigo-100 text-indigo-700 border-indigo-500 shadow-md ring-2 ring-indigo-200', text: 'Current' };
    }
    return { icon: <Clock size={16} />, className: 'bg-slate-100 text-slate-400 border-slate-200', text: 'Pending' };
  };

  return (
    <Card className="border-indigo-100 shadow-sm bg-gradient-to-r from-slate-50 to-indigo-50/30">
      <CardHeader>
        <CardTitle className="text-lg">Faculty Lifecycle Tracker</CardTitle>
        <CardDescription>Your progression through the academic pipeline</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 hidden md:block"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-9 gap-4 md:gap-0 relative z-10">
            {stages.map((stage) => {
              const style = getStatusStyle(stage.id);
              return (
                <div key={stage.id} className="flex flex-col items-center justify-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all ${style.className}`}>
                    {style.icon}
                  </div>
                  <div className="text-xs font-medium text-slate-700 text-center">{stage.label}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider hidden md:block">{style.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WeeklyReportsForm() {
  const myReports = MOCK_WEEKLY_REPORTS.filter(r => r.facultyId === 'u3');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BookOpen size={18} /> Weekly Reports</CardTitle>
        <CardDescription>Submit your weekly progress for HOD review</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Classes Conducted</label>
            <input type="number" className="w-full border rounded p-2 text-sm" placeholder="e.g. 4" />
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Topics Covered</label>
            <input type="text" className="w-full border rounded p-2 text-sm" placeholder="Brief summary" />
          </div>
          <div className="flex items-end">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">Submit Draft</Button>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="text-sm font-semibold text-slate-700">Past Submissions</h4>
          {myReports.map(report => (
            <div key={report.id} className="flex justify-between items-center p-3 border-b text-sm">
              <div>Week {report.weekNumber} <span className="text-slate-500 ml-2">({report.classesConducted} classes)</span></div>
              <Badge variant="outline" className={report.status === 'submitted' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}>
                {report.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AIInsightsPanel() {
  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800"><Star size={18} /> AI Contract Insights</CardTitle>
        <CardDescription>Predictive analytics for upcoming contract renewal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Renewal Probability</span>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none">High (92%)</Badge>
        </div>
        <div className="space-y-2">
          <div className="text-xs text-slate-500">Contributing Factors:</div>
          <ul className="text-sm space-y-1 text-slate-700">
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Student Rating (4.6/5.0) exceeds avg</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> 100% Course Completion Rate</li>
            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Zero SLA Breaches on student doubts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
