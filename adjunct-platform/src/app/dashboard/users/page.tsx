'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Profile } from '@/lib/mock-data';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UsersManagementPage() {
  const { user } = useAuth();
  const [displayUsers, setDisplayUsers] = useState<Profile[]>([]);
  
  useEffect(() => {
    async function fetchUsers() {
      if (!user) return;
      
      let query = supabase.from('profiles').select('*');
      
      if (user.role !== 'admin') {
        query = query.neq('role', 'student').neq('role', 'admin');
      }
      
      const { data } = await query;
      if (data) {
        setDisplayUsers(data as Profile[]);
      }
    }
    fetchUsers();
  }, [user]);
  
  // Only Admin, HOD, and Advisor should see this page properly
  if (user?.role === 'student' || user?.role === 'adjunct_faculty') {
    return <div className="p-8 text-center text-rose-600 font-medium">Access Denied: You do not have permission to view the user roster.</div>;
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Users & Faculty Directory</h1>
          <p className="text-slate-500 mt-1">Manage personnel, review onboarding status, and monitor workloads.</p>
        </div>
        {user?.role === 'Admin' && (
          <Button className="bg-slate-900 text-white"><UserPlus size={16} className="mr-2" /> Provision New Account</Button>
        )}
      </div>

      <Card>
        <CardHeader className="bg-slate-50/50 border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-lg">Personnel Roster</CardTitle>
            <CardDescription>All active staff members in the department.</CardDescription>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <Button variant="outline" size="icon"><Filter size={16} className="text-slate-600" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{u.name}</div>
                      <div className="text-slate-500">{u.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">{u.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {u.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {u.role === 'Adjunct Faculty' ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">Active</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="link" size="sm" className="text-indigo-600">View Profile</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
