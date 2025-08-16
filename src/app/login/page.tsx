
'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./login-form').then(mod => mod.LoginForm), { 
    ssr: false,
    loading: () => (
        <div className="space-y-6">
            <div className="relative">
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="relative">
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
            <div>
              <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
});


export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex flex-col justify-center w-1/2 p-12 text-white login-gradient">
          <h1 className="text-4xl font-bold mb-4 font-headline">Welcome to AttendAI</h1>
          <p className="text-lg">
            Streamline your attendance process with our AI-powered facial recognition system.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-card p-8">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">USER LOGIN</h2>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
