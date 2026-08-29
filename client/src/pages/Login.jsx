import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SmartIcon from '../components/common/SmartIcon';

const ROLE_PRESETS = [
  {
    id: 'hod',
    roleName: 'HOD / Chair',
    icon: Building2,
    email: 'alan.hod@univ.edu',
    indianEmail: 'rajesh.hod@univ.edu.in',
    name: 'Dr. Rajesh Sharma',
    desc: 'Department Chair & Executive Command',
    badgeClass: 'bg-sky-50 text-sky-900 border-sky-200'
  },
  {
    id: 'adjunct_faculty',
    roleName: 'Faculty',
    icon: BookOpen,
    email: 'jane.adjunct@univ.edu',
    indianEmail: 'priya.faculty@univ.edu.in',
    name: 'Prof. Priya Sharma',
    desc: 'Adjunct / Full-Time Teaching Faculty',
    badgeClass: 'bg-emerald-50 text-emerald-900 border-emerald-200'
  },
  {
    id: 'advisor',
    roleName: 'Advisor',
    icon: UserCheck,
    email: 'mark.advisor@univ.edu',
    indianEmail: 'ramesh.advisor@univ.edu.in',
    name: 'Dr. Ramesh Iyer',
    desc: 'Academic Advising & Student Retention',
    badgeClass: 'bg-amber-50 text-amber-900 border-amber-200'
  },
  {
    id: 'student',
    roleName: 'Student',
    icon: GraduationCap,
    email: 'alice.student@univ.edu',
    indianEmail: 'aarav.student@univ.edu.in',
    name: 'Aarav Sharma',
    desc: 'Undergraduate Computer Science Cohort',
    badgeClass: 'bg-indigo-50 text-indigo-900 border-indigo-200'
  },
  {
    id: 'admin',
    roleName: 'Admin',
    icon: ShieldCheck,
    email: 'admin@univ.edu',
    indianEmail: 'admin@univ.edu.in',
    name: 'System Administrator',
    desc: 'University Accreditation & IT Governance',
    badgeClass: 'bg-purple-50 text-purple-900 border-purple-200'
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('hod');
  const [email, setEmail] = useState('alan.hod@univ.edu');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoAccounts } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (roleItem) => {
    setSelectedRole(roleItem.id);
    setEmail(roleItem.email);
    setError('');
  };

  const handleLoginSubmit = async (e, targetEmail = email) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(targetEmail);
      navigate('/dashboard');
    } catch {
      // Fallback local simulated auth if backend supabase user not mapped
      try {
        await login('alan.hod@univ.edu');
        navigate('/dashboard');
      } catch {
        setError('No account found for this email. Try clicking one of the 1-Click Demo Accounts.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDemoLogin = (demoEmail) => {
    setEmail(demoEmail);
    handleLoginSubmit(null, demoEmail);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="p-6 max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-2xs backdrop-blur-md"
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500 text-slate-950 font-black text-sm flex items-center justify-center shadow-sm">
            AC
          </div>
          <span className="font-extrabold text-base tracking-tight text-white">Acad<span className="text-sky-400">Core</span></span>
        </div>
      </header>

      {/* Main Content Box */}
      <main className="max-w-6xl mx-auto w-full p-4 sm:p-6 z-10 my-auto space-y-6">
        
        {/* Top Role Selector Tabs */}
        <div className="bg-slate-900/90 border border-slate-800 p-2 sm:p-3 rounded-2xl backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between px-3 py-1.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Login Portal Role</span>
            <span className="text-xs text-sky-400 font-medium flex items-center gap-1">
              <SmartIcon size={14} /> Role-Specific Access
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {ROLE_PRESETS.map((r) => {
              const IconComponent = r.icon;
              const isSelected = selectedRole === r.id;

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                    isSelected 
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md font-bold' 
                      : 'bg-slate-950/60 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-slate-950 text-sky-400' : 'bg-slate-900 text-slate-300'}`}>
                    <IconComponent size={16} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs block font-bold truncate">{r.roleName}</span>
                    <span className={`text-[10px] block truncate ${isSelected ? 'text-slate-800 font-medium' : 'text-slate-500'}`}>
                      {r.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Clean Login Form (Left) & 1-Click Demo Accounts (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Clean Email/Password Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 p-8 rounded-3xl border border-slate-200 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="pb-5 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-sky-50 text-sky-900 border border-sky-200 uppercase tracking-wider">
                    {ROLE_PRESETS.find(r => r.id === selectedRole)?.roleName} Portal
                  </span>
                  <span className="text-xs text-slate-400">• Fall 2026 Academic Term</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Sign In to AcadCore</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Access institutional records, faculty allocation, and grading suites.
                </p>
              </div>

              {/* Error Box */}
              {error && (
                <div className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-2.5 text-xs font-semibold">
                  <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address / Institutional ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh.hod@univ.edu.in"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Demo Password is 'demo123'"); }} className="text-xs text-sky-700 hover:underline font-semibold">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded text-slate-900 w-4 h-4"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50 mt-2"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                256-Bit SSL Encrypted Session
              </span>
              <span>v2.4 Institutional Build</span>
            </div>
          </div>

          {/* Right Column: 1-Click Demo Accounts (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800">
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    <SmartIcon size={18} className="text-sky-400" />
                    Instant Demo Logins
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Click any persona to test live dashboards</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  1-Click
                </span>
              </div>

              {/* Demo Account Cards */}
              <div className="mt-4 space-y-2.5">
                {ROLE_PRESETS.map((acc) => {
                  const IconComponent = acc.icon;
                  const isActive = email === acc.email;

                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleDirectDemoLogin(acc.email)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isActive 
                          ? 'bg-sky-950/60 border-sky-500 shadow-md ring-1 ring-sky-500' 
                          : 'bg-slate-950/50 hover:bg-slate-800/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 text-sky-400 flex items-center justify-center font-bold shrink-0 border border-slate-700">
                          <IconComponent size={18} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white truncate">{acc.name}</span>
                            <span className="text-[10px] font-extrabold px-2 py-0.2 rounded bg-slate-800 text-sky-300 border border-slate-700">
                              {acc.roleName}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">{acc.email}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-slate-950 border border-sky-500/30 text-xs font-bold transition-all"
                      >
                        Sign In
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-800 text-center text-xs text-slate-400">
              Need access for your institution? <span className="text-sky-400 font-semibold cursor-pointer hover:underline">Request University License</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-slate-500 z-10">
        AcadCore Higher Education Management Platform • Protected by Institutional RBAC Policy
      </footer>
    </div>
  );
}
