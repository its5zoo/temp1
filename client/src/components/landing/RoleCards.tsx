import { Shield, Server, GraduationCap, FileCheck, Users, ArrowRight } from 'lucide-react';

const roles = [
  {
    id: 'president',
    title: 'President / VC',
    tagline: 'Lead one institution.',
    icon: <Shield className="h-6 w-6" />,
    color: 'from-blue-500 to-indigo-600',
    hoverLine: 'bg-blue-500'
  },
  {
    id: 'cio',
    title: 'CIO / IT',
    tagline: 'Retire the integration burden.',
    icon: <Server className="h-6 w-6" />,
    color: 'from-indigo-500 to-purple-600',
    hoverLine: 'bg-indigo-500'
  },
  {
    id: 'registrar',
    title: 'Registrar',
    tagline: 'Govern the academic lifecycle.',
    icon: <GraduationCap className="h-6 w-6" />,
    color: 'from-purple-500 to-fuchsia-600',
    hoverLine: 'bg-purple-500'
  },
  {
    id: 'qa',
    title: 'QA / Accreditation',
    tagline: 'Always audit-ready.',
    icon: <FileCheck className="h-6 w-6" />,
    color: 'from-fuchsia-500 to-rose-500',
    hoverLine: 'bg-fuchsia-500'
  },
  {
    id: 'dean',
    title: 'Dean / Faculty',
    tagline: 'One record for every faculty member.',
    icon: <Users className="h-6 w-6" />,
    color: 'from-emerald-500 to-teal-600',
    hoverLine: 'bg-emerald-500'
  }
];

export default function RoleCards() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            A different starting point for every leader.
          </h2>
          <p className="text-xl text-indigo-600 font-medium">
            The same institution underneath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full outline-none focus-within:ring-2 focus-within:ring-indigo-500 cursor-pointer hover:-translate-y-1"
              tabIndex={0}
            >
              {/* Accent Line on Hover */}
              <div className={`absolute top-0 left-0 w-full h-1 ${role.hoverLine} transform origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-300`}></div>
              
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${role.color} mb-6 shadow-md`}>
                {role.icon}
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-2">{role.title}</h3>
              <p className="text-sm text-slate-600 mb-8 flex-grow">{role.tagline}</p>
              
              <div className="mt-auto flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                Explore <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Background abstract decoration on hover */}
              <div className="absolute -right-8 -bottom-8 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none text-slate-900">
                {role.icon}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
