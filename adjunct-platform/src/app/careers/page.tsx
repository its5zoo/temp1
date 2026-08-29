import Link from 'next/link';
import { MOCK_JOBS } from '@/lib/recruitment-data';
import { Briefcase, MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function CareersPage() {
  const activeJobs = MOCK_JOBS.filter(job => job.status === 'Active');

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* We reuse the Header but make it sticky with a solid background since it's an inner page */}
      <div className="bg-indigo-950">
        <Header />
      </div>

      <main className="flex-1 container mx-auto px-4 py-16 max-w-5xl mt-20">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Adjunct Faculty Openings</h1>
          <p className="text-lg text-slate-600">Join our network of industry experts. Bring real-world experience to the classroom.</p>
        </div>

        <div className="space-y-6">
          {activeJobs.length > 0 ? (
            activeJobs.map(job => (
              <div key={job.id} className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex-1">
                    <div className="text-indigo-600 font-semibold text-sm mb-2">{job.department}</div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{job.title}</h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1"><Briefcase size={16} /> {job.type}</div>
                      <div className="flex items-center gap-1"><MapPin size={16} /> {job.location}</div>
                      <div className="flex items-center gap-1"><CalendarDays size={16} /> Posted {new Date(job.postedDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link 
                      href={`/careers/apply/${job.id}`}
                      className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors w-full md:w-auto"
                    >
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <Briefcase className="h-12 w-12 mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-900">No openings available</h3>
              <p className="text-slate-500">Please check back later.</p>
            </div>
          )}
        </div>

      </main>

      <Footer />
    </div>
  );
}
