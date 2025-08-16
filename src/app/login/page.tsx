
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { User, Lock } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex flex-col justify-center w-1/2 p-12 text-white login-gradient">
          <h1 className="text-4xl font-bold mb-4 font-headline">Welcome to website</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
          </p>
        </div>
        <div className="w-full md:w-1/2 bg-card p-8 md:p-12">
          <h2 className="text-2xl font-bold text-center text-primary mb-8">USER LOGIN</h2>
          <form className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="email" placeholder="Username" className="pl-10" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="password" placeholder="Password" className="pl-10" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm font-medium text-muted-foreground">
                  Remember
                </label>
              </div>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div>
              <Button asChild className="w-full text-white login-button-gradient hover:opacity-90">
                <Link href="/dashboard">LOGIN</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
