'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { GraduationCap, Briefcase, Mail, ArrowLeft, Building2, User } from 'lucide-react';

export default function FacultyProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [facultyDetails, setFacultyDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      // Fetch basic profile
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', params.id).single();
      
      // Fetch extended details
      let details = null;
      if (prof && prof.role === 'adjunct_faculty') {
        const { data: adjunct } = await supabase
          .from('adjunct_faculty')
          .select('*, departments(department_name)')
          .eq('profile_id', prof.id)
          .single();
        details = adjunct;
      }
      
      setProfile(prof);
      setFacultyDetails(details);
      setLoading(false);
    }
    loadProfile();
  }, [params.id]);

  if (loading) {
    return <div className="p-8 text-center text-slate-500 animate-pulse">Loading faculty dossier...</div>;
  }

  if (!profile) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-slate-800">Faculty not found</h2>
        <Button onClick={() => router.back()} className="mt-4" variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <Button variant="ghost" onClick={() => router.back()} className="text-slate-500 -ml-4 hover:bg-slate-100">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Button>

      {/* Hero Header */}
      <Card className="border-t-4 border-t-indigo-600 shadow-sm overflow-hidden bg-white">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="h-24 w-24 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-3xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
                <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 capitalize">
                  {profile.role.replace('_', ' ')}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {profile.email}</span>
                {facultyDetails?.departments && (
                  <span className="flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {facultyDetails.departments.department_name}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Grid */}
      {facultyDetails && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <User className="h-5 w-5 text-indigo-500" /> Biography & Background
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 text-slate-600 leading-relaxed">
                {facultyDetails.bio || "No biography provided for this faculty member yet."}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <GraduationCap className="h-5 w-5 text-emerald-500" /> Academic Qualifications
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {facultyDetails.qualifications && facultyDetails.qualifications.length > 0 ? (
                  <ul className="space-y-3">
                    {facultyDetails.qualifications.map((qual: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="h-2 w-2 mt-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-slate-700 font-medium">{qual}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-500 italic">No qualifications listed.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                  <Briefcase className="h-5 w-5 text-amber-500" /> Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Years</p>
                  <p className="text-3xl font-bold text-slate-900">{facultyDetails.experience_years || 0} <span className="text-lg text-slate-500 font-normal">years</span></p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-3">Previous Institutions</p>
                  {facultyDetails.previous_institutions && facultyDetails.previous_institutions.length > 0 ? (
                    <div className="flex flex-col gap-2">
                      {facultyDetails.previous_institutions.map((inst: string, i: number) => (
                        <div key={i} className="bg-slate-50 p-2 rounded border border-slate-100 text-sm font-medium text-slate-700">
                          {inst}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 italic">None listed.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="bg-slate-50/50 border-b">
                <CardTitle className="text-lg text-slate-800">Live KPIs</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-500">Performance Score</span>
                  <span className="font-bold text-slate-900">{facultyDetails.performance_score}/5.0</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <span className="text-sm font-medium text-slate-500">Status</span>
                  <Badge variant="outline" className="capitalize border-emerald-200 text-emerald-700 bg-emerald-50">
                    {facultyDetails.employment_status || 'Active'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
