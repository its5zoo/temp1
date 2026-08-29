import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Receipt, 
  ShieldCheck, 
  Calendar, 
  Check,
  Building2 
} from 'lucide-react';

export default function StudentFeesTab({ feesData, onPayFee }) {
  const { 
    semester = 'Semester 5 (Fall 2026)', 
    totalTuition = 125000, 
    scholarshipDiscount = 15000, 
    netPayable = 110000, 
    amountPaid = 85000, 
    balanceDue = 25000, 
    dueDate = 'Sep 15, 2026', 
    status = 'Overdue (₹25,000)', 
    ledger = [] 
  } = feesData || {};

  const [paying, setPaying] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const handlePayment = async () => {
    if (!onPayFee || balanceDue <= 0) return;
    setPaying(true);
    await onPayFee(balanceDue);
    setPaying(false);
    setToastMsg(`Tuition fee of ₹${balanceDue.toLocaleString('en-IN')} paid successfully.`);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl bg-slate-900 border border-slate-700 text-white flex items-center gap-3 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <CreditCard size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Tuition Accounts & Semester Fee Ledger
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {semester} • University Bursar Accounts Desk
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadReceipt}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} className="text-slate-700" />
            <span>Download Official Fee Receipt</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Gross Tuition</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">₹{totalTuition.toLocaleString('en-IN')}</span>
          <p className="text-[11px] text-slate-500 mt-1">Base Tuition + Lab Practicum</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Merit Concession</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">-₹{scholarshipDiscount.toLocaleString('en-IN')}</span>
          <p className="text-[11px] text-slate-500 mt-1">Dean's Merit Scholarship</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Amount Paid</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">₹{amountPaid.toLocaleString('en-IN')}</span>
          <p className="text-[11px] text-slate-500 mt-1">Paid via NetBanking</p>
        </div>

        <div className={`p-5 rounded-2xl border shadow-2xs ${
          balanceDue > 0 ? 'bg-amber-50/50 border-amber-200' : 'bg-emerald-50/50 border-emerald-200'
        }`}>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Outstanding Balance</span>
          <span className={`text-2xl font-black mt-1 block ${balanceDue > 0 ? 'text-amber-800' : 'text-emerald-800'}`}>
            ₹{balanceDue.toLocaleString('en-IN')}
          </span>
          <p className="text-[11px] text-slate-600 mt-1">
            {balanceDue > 0 ? `Due by ${dueDate}` : '✓ No Dues Pending'}
          </p>
        </div>
      </div>

      {/* Pay Now Action Banner */}
      {balanceDue > 0 && (
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white">
              Settle Pending Semester 5 Dues
            </h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              Clear outstanding balance of <strong>₹{balanceDue.toLocaleString('en-IN')}</strong> to unlock semester exam admit card and grade sheet dispatch.
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={paying}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <CreditCard size={15} />
            <span>{paying ? 'Processing Payment...' : `Pay ₹${balanceDue.toLocaleString('en-IN')} Now`}</span>
          </button>
        </div>
      )}

      {/* Chronological Transaction Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            Account Ledger & Fee Transactions
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Official University Receipt Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction Date</th>
                <th className="py-3.5 px-4">Fee Head / Description</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4 text-right">Status / Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ledger.map((tx) => {
                const isDebit = tx.amount > 0;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-600 font-medium">
                      {tx.date}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {tx.item}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                        tx.type === 'Payment' 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : tx.type === 'Credit'
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}>
                        {tx.type}
                      </span>
                    </td>

                    <td className={`py-3.5 px-4 font-black text-xs ${
                      tx.type === 'Payment' || tx.type === 'Credit' ? 'text-emerald-700' : 'text-slate-900'
                    }`}>
                      {tx.amount < 0 ? `-₹${Math.abs(tx.amount).toLocaleString('en-IN')}` : `₹${tx.amount.toLocaleString('en-IN')}`}
                    </td>

                    <td className="py-3.5 px-4 text-right font-medium text-slate-600">
                      {tx.status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
