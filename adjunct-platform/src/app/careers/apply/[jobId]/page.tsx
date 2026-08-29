'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_JOBS } from '@/lib/recruitment-data';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId as string;
  
  const job = MOCK_JOBS.find(j => j.id === jobId);
  
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: ''
  });

  if (!job) {
    return <div className="p-12 text-center">Job not found.</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we'd send this to the backend.
    // For this mock, we just show the success state.
    
    // Simulating API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <div className="bg-indigo-950">
        <Header />
      </div>

      <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl mt-20">
        
        <Link href="/careers" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to open positions
        </Link>

        {submitted ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Thank you for applying for the <strong>{job.title}</strong> position. Our hiring team will review your profile and contact you soon.
            </p>
            <Link 
              href="/careers"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              Return to Careers
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-slate-200 shadow-sm">
            <div className="mb-8 pb-8 border-b border-slate-100">
              <div className="text-indigo-600 font-semibold text-sm mb-2">Apply for</div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{job.title}</h1>
              <div className="text-slate-500">{job.department} • {job.location}</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone Number *</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-700">Years of Industry Experience *</label>
                  <input 
                    type="number" 
                    id="experience" 
                    min="0"
                    required
                    className="w-full h-12 px-4 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    value={formData.experience}
                    onChange={e => setFormData({...formData, experience: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Resume / CV *</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-slate-600 justify-center">
                      <span className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-slate-500">PDF, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Submit Application
                </button>
              </div>

            </form>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
