'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Bell, User, MonitorSmartphone, Key } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-slate-500 mt-1">Manage your profile, security preferences, and active devices.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <User size={18} /> Profile & Preferences
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Shield size={18} /> Security & Devices
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Bell size={18} /> Notifications
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Preferences</CardTitle>
                <CardDescription>Update your personal information and visibility.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Phone Number</label>
                    <input type="text" defaultValue="+1 (555) 019-2831" className="w-full p-2.5 border border-slate-300 rounded-lg text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Language</label>
                    <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm">
                      <option value="en">English (US)</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Profile Visibility</label>
                  <select className="w-full p-2.5 border border-slate-300 rounded-lg text-sm">
                    <option value="private">Private (Only Advisors & Teachers)</option>
                    <option value="public">Public (Visible to Peers)</option>
                  </select>
                </div>
                <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">Save Changes</button>
              </CardContent>
            </Card>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><Key size={18}/> Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">2FA is currently <strong className="text-rose-600">disabled</strong>.</span>
                  <button className="px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-medium">Enable 2FA</button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2"><MonitorSmartphone size={18}/> Active Devices</CardTitle>
                  <CardDescription>Review the devices currently logged into your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="divide-y divide-slate-100">
                    <div className="py-4 flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">MacBook Pro (Chrome)</h4>
                        <p className="text-xs text-slate-500 mt-1">IP: 192.168.1.45 • Last active: Just now</p>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Current Session</span>
                    </div>
                    <div className="py-4 flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900">iPhone 14 Pro (Safari)</h4>
                        <p className="text-xs text-slate-500 mt-1">IP: 104.28.10.12 • Last active: 2 hours ago</p>
                      </div>
                      <button className="text-xs font-medium text-rose-600 hover:underline">Revoke Access</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>Control which alerts you receive via email and push.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { id: 'notif_assignment', label: 'Assignment Deadlines' },
                  { id: 'notif_exam', label: 'Exam Results Published' },
                  { id: 'notif_attendance', label: 'Attendance Warnings (Tier 2)' },
                  { id: 'notif_advisor', label: 'Advisor Messages' }
                ].map(setting => (
                  <div key={setting.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">{setting.label}</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

        </div>

      </div>
    </div>
  );
}
