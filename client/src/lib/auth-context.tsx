'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile } from './mock-data';
import { supabase } from './supabase';

interface AuthContextType {
  user: Profile | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUserId = localStorage.getItem('supabaseUserId');
      if (storedUserId) {
        const { data } = await supabase.from('profiles').select('*').eq('id', storedUserId).single();
        if (data) setUser(data as Profile);
      }
      setIsLoading(false);
    }
    loadUser();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').eq('email', email).single();
    
    if (data && !error) {
      setUser(data as Profile);
      localStorage.setItem('supabaseUserId', data.id);
    } else {
      alert('User not found in Supabase. Did you run the seed script? Try jane.adjunct@univ.edu');
    }
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('supabaseUserId');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
