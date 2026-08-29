import { GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const columns = [
    {
      title: 'Lifecycles',
      links: ['Admissions', 'Student', 'Faculty', 'Academic Operations', 'Assessment', 'Quality & Accreditation', 'Academic Governance', 'Student Finance']
    },
    {
      title: 'Products',
      links: ['Outcomes & Retention', 'Curriculum Management', 'Faculty Records', 'Student Information System', 'Scheduling Engine', 'Examinations', 'Admissions CRM']
    },
    {
      title: 'By Role',
      links: ['President / VC', 'CIO / IT', 'Registrar', 'QA / Accreditation', 'Dean / Faculty']
    },
    {
      title: 'Resources',
      links: ['Whitepapers', 'Data Sheets', 'Infographics', 'Templates', 'Blog', 'Glossary', 'Videos']
    },
    {
      title: 'Company',
      links: ['About Us', 'Clients & Case Studies', 'Partners', 'Pricing', 'Trust Center', 'Security']
    },
    {
      title: 'Compare',
      links: ['vs. Traditional ERPs', 'vs. Point Solutions', 'ROI Calculator']
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Cookie Policy', 'Terms of Service', 'Data Residency', 'Sitemap']
    }
  ];

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 text-slate-400">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Section: Logo & Brand */}
        <div className="mb-16 border-b border-slate-800 pb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1.5 rounded flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-slate-300" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Acad Core</span>
          </div>
          
          <div className="flex gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-lime-400 transition-colors">Client Login</Link>
            <span className="text-slate-700">|</span>
            <Link href="/support" className="text-sm font-medium text-white hover:text-lime-400 transition-colors">Support Portal</Link>
          </div>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-20">
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold mb-4 text-sm">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm hover:text-indigo-300 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Brand Statement & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-slate-800 pt-8">
          <div className="text-[10px] md:text-xs tracking-[0.2em] font-bold text-slate-600 uppercase">
            CONNECTED. GOVERNED. EXPLAINABLE.
          </div>
          
          <div className="text-sm text-slate-600">
            &copy; {new Date().getFullYear()} Acad Core. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
