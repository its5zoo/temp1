'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_PROFILES } from '@/lib/mock-data';

export default function LoginPage() {
  const [email, setEmail] = useState('jane.adjunct@univ.edu');
  const [password, setPassword] = useState('demo123');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    router.push('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/')}
        className="fixed top-4 left-4 text-slate-500 hover:text-slate-900"
      >
        &larr; Back to Home
      </Button>
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-purple-600">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Sign in</CardTitle>
          <CardDescription>
            Enter your university email to access your dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="jane.adjunct@univ.edu" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-sm rounded-md">
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold">Demo Accounts:</p>
                <span className="text-xs font-mono bg-blue-100 px-1.5 py-0.5 rounded text-blue-700">PW: demo123</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                {MOCK_PROFILES.map(user => (
                  <li 
                    key={user.id} 
                    className="cursor-pointer hover:underline flex items-center justify-between" 
                    onClick={() => {
                      setEmail(user.email);
                      setPassword('demo123');
                    }}
                  >
                    <span>{user.email}</span>
                    <span className="text-xs opacity-75 font-medium ml-2">({user.role})</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-purple-600 hover:bg-purple-700" type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
