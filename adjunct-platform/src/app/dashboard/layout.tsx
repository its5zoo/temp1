'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  GraduationCap,
  Menu,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const roleColors: Record<string, string> = {
  'HOD': 'bg-navy-900 border-navy-700', // We'll use a custom dark blue class or slate-900
  'Full-Time Faculty': 'bg-teal-700 border-teal-600',
  'Adjunct Faculty': 'bg-purple-700 border-purple-600',
  'Student Advisor': 'bg-amber-600 border-amber-500',
  'Student': 'bg-emerald-700 border-emerald-600'
};

const getSidebarColor = (role: string) => {
  if (role === 'HOD') return 'bg-slate-900';
  if (role === 'Full-Time Faculty') return 'bg-teal-800';
  if (role === 'Adjunct Faculty') return 'bg-purple-800';
  if (role === 'Student Advisor') return 'bg-amber-700';
  if (role === 'Student') return 'bg-emerald-800';
  return 'bg-gray-800';
};

const getNavItems = (role: string) => {
  switch (role) {
    case 'Student':
      return [
        { name: 'Dashboard', href: '/dashboard/student', icon: <Home size={20} /> },
        { name: 'My Courses', href: '#', icon: <BookOpen size={20} /> },
        { name: 'Assignments', href: '#', icon: <Briefcase size={20} /> },
        { name: 'Advising', href: '#', icon: <Users size={20} /> },
        { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
      ];
    default:
      return [];
  }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const sidebarColor = getSidebarColor(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 fixed md:static inset-y-0 left-0 z-50 w-64 ${sidebarColor} text-white flex flex-col`}
      >
        <div className="p-6 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-white/90" />
          <span className="text-xl font-bold tracking-tight">Acad Core</span>
        </div>
        
        <div className="px-6 pb-4">
          <div className="text-xs text-white/60 uppercase tracking-wider font-semibold mb-1">Role</div>
          <div className="text-sm font-medium bg-white/10 inline-block px-2 py-1 rounded">
            {user.role}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label={user.role === 'Student' ? 'Student Dashboard' : 'Overview'} 
            href={user.role === 'Student' ? '/dashboard/student' : '/dashboard'} 
            active={pathname === (user.role === 'Student' ? '/dashboard/student' : '/dashboard')} 
          />
          {(user.role === 'Adjunct Faculty' || user.role === 'Full-Time Faculty' || user.role === 'Student') && (
            <NavItem icon={<BookOpen size={20} />} label="Courses" href="/dashboard/courses" active={pathname.startsWith('/dashboard/courses')} />
          )}
          {(user.role === 'HOD' || user.role === 'Student Advisor') && (
            <NavItem icon={<Users size={20} />} label="Users & Faculty" href="/dashboard/users" active={pathname.startsWith('/dashboard/users')} />
          )}
          {user.role === 'HOD' && (
            <NavItem icon={<Briefcase size={20} />} label="Recruitment" href="/dashboard/recruitment" active={pathname.startsWith('/dashboard/recruitment')} />
          )}
          <NavItem icon={<MessageSquare size={20} />} label="Messages & Doubts" href="/dashboard/messages" active={pathname.startsWith('/dashboard/messages')} />
          <NavItem icon={<Settings size={20} />} label="Settings" href="/dashboard/settings" active={pathname.startsWith('/dashboard/settings')} />
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <button onClick={() => { logout(); router.push('/'); }} className="flex items-center gap-3 text-white/80 hover:text-white px-2 py-2 rounded-md hover:bg-white/10 w-full transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-slate-500 hover:text-slate-700" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800 hidden sm:block">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
                <span className="text-sm font-medium text-slate-700 hidden sm:block">{user.name}</span>
                <Avatar className="h-9 w-9 border border-slate-200">
                  <AvatarFallback className="bg-slate-100 text-slate-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex-col items-start gap-1">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-slate-500">{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { logout(); router.push('/'); }}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <Link href={href}>
      <span className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${active ? 'bg-white/15 text-white font-medium' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
        {icon}
        {label}
      </span>
    </Link>
  );
}
