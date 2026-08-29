'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, FileBadge, HelpCircle, AlertTriangle } from 'lucide-react';

export default function StudentServices() {
  
  const feeStatus = 'overdue';
  const totalFee = 45000;
  const paidFee = 20000;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Services</h1>
        <p className="text-slate-500 mt-1">Manage your fee payments, document requests, and support tickets.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Fees (Wide) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className={feeStatus === 'overdue' ? 'border-rose-200' : 'border-slate-200'}>
            <CardHeader className={`pb-4 border-b ${feeStatus === 'overdue' ? 'border-rose-100 bg-rose-50/30' : 'border-slate-100'}`}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard size={20} className={feeStatus === 'overdue' ? 'text-rose-600' : 'text-slate-600'} /> 
                  Fee Management
                </CardTitle>
                {feeStatus === 'overdue' && (
                  <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                    <AlertTriangle size={14} /> Overdue
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Total Semester Fee</div>
                  <div className="text-2xl font-bold text-slate-900">${totalFee.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500 mb-1">Outstanding Balance</div>
                  <div className="text-3xl font-bold text-rose-600">${(totalFee - paidFee).toLocaleString()}</div>
                  <p className="text-xs text-rose-500 mt-1">Due date: Oct 15, 2026</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <button className="w-full md:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Make a Payment
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center gap-2"><HelpCircle size={20} className="text-slate-600" /> Support Tickets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">Course Registration Error (CS410)</h4>
                    <p className="text-xs text-slate-500 mt-1">Submitted: 2 days ago • Category: Academic</p>
                  </div>
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">Assigned</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-sm font-medium text-indigo-600 hover:underline">Raise New Ticket</button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Col: Certificates */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-4 border-b border-slate-100">
              <CardTitle className="text-lg flex items-center gap-2"><FileBadge size={20} className="text-amber-500" /> Certificates</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-6">Request official university documents and certificates here.</p>
              
              <div className="space-y-3">
                <button className="w-full flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all text-left">
                  <span className="font-medium text-slate-700 text-sm">Download Transcript</span>
                </button>
                <button className="w-full flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all text-left">
                  <span className="font-medium text-slate-700 text-sm">Bonafide Certificate</span>
                </button>
                <button className="w-full flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all text-left">
                  <span className="font-medium text-slate-700 text-sm">Fee Receipt (Last)</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
