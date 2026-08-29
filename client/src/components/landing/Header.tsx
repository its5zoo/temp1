'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, GraduationCap } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; href: string; hasDropdown: boolean }[] = [];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-indigo-950/90 backdrop-blur-md border-b border-indigo-800/50 shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-lime-400 p-1.5 rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6 text-indigo-950" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Acad Core</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="relative group cursor-pointer flex items-center gap-1 text-sm font-medium text-indigo-100 hover:text-white transition-colors">
              {link.name}
              {link.hasDropdown && <ChevronDown className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-transform group-hover:rotate-180" />}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden md:inline-flex items-center justify-center h-10 px-6 rounded-full bg-lime-400 text-indigo-950 font-semibold text-sm hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_20px_rgba(163,230,53,0.5)]"
          >
            Login
          </Link>
          <button 
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-indigo-950 z-40 lg:hidden overflow-y-auto pb-20">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between text-lg font-medium text-white border-b border-indigo-800/50 pb-4">
                {link.name}
                {link.hasDropdown && <ChevronDown className="h-5 w-5 text-indigo-400" />}
              </Link>
            ))}
            <Link 
              href="/login" 
              className="mt-4 flex items-center justify-center h-12 rounded-full bg-lime-400 text-indigo-950 font-bold text-base hover:bg-lime-300"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
