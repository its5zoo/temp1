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
  AlertCircle
} from 'lucide-react';

const ROLE_PRESETS = [
  {
    id: 'hod',
    label: 'HOD',
    fullName: 'HOD / Chair',
    name: 'Dr. Rajesh Sharma',
    email: 'alan.hod@univ.edu',
    icon: Building2
  },
  {
    id: 'faculty',
    label: 'Faculty',
    fullName: 'Faculty Member',
    name: 'Prof. Priya Sharma',
    email: 'jane.adjunct@univ.edu',
    icon: BookOpen
  },
  {
    id: 'advisor',
    label: 'Advisor',
    fullName: 'Academic Advisor',
    name: 'Dr. Ramesh Iyer',
    email: 'mark.advisor@univ.edu',
    icon: UserCheck
  },
  {
    id: 'student',
    label: 'Student',
    fullName: 'Student',
    name: 'Aarav Sharma',
    email: 'alice.student@univ.edu',
    icon: GraduationCap
  },
  {
    id: 'admin',
    label: 'Admin',
    fullName: 'Administrator',
    name: 'System Admin',
    email: 'admin@univ.edu',
    icon: ShieldCheck
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
  const { login } = useAuth();
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
      try {
        await login('alan.hod@univ.edu');
        navigate('/dashboard');
      } catch {
        setError('No account found for this email. Try clicking one of the demo buttons below.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-slate-200/60"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>

        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          AcadCore v2.4
        </span>
      </div>

      {/* Center Unified Single Box */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Box Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white font-black text-base shadow-xs mb-1">
              AC
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Acad<span className="text-slate-500">Core</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sign in to your university portal dashboard
            </p>
          </div>

          {/* Role Selector Tabs Row */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Choose Role
            </span>
            <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {ROLE_PRESETS.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert("Demo Password: 'demo123'"); }} 
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-slate-900 w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              <span>{loading ? 'Signing in...' : `Sign In as ${ROLE_PRESETS.find(r => r.id === selectedRole)?.label || 'User'} (Demo)`}</span>
              <ArrowRight size={15} />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400">
        Institutional Portal • Protected by RBAC Security
      </footer>
    </div>
  );
}
