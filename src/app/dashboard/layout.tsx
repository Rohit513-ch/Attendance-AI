
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  UserPlus,
  Users,
  Camera,
  ListChecks,
  LogOut,
  Menu,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navItems = [
    { href: '/dashboard/student-registration', icon: UserPlus, label: 'Student Registration' },
    { href: '/dashboard/view-authorize-students', icon: Users, label: 'View / Authorize Students' },
    { href: '/dashboard/mark-attendance', icon: Camera, label: 'Mark Attendance' },
    { href: '/dashboard/attendance-details', icon: ListChecks, label: 'Attendance Details' },
  ];

  const NavLinks = () => (
    <nav className="flex flex-col gap-2">
      {navItems.map((item, index) => (
        <Button 
            key={index} 
            variant={pathname === item.href ? 'secondary' : 'ghost'} 
            asChild 
            className="justify-start"
        >
            <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
            </Link>
        </Button>
      ))}
    </nav>
  );

  return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Camera className="h-6 w-6" />
              <span className="sr-only">AttendAI</span>
            </Link>
            {navItems.map(item => (
                <Link
                    key={item.label}
                    href={item.href}
                    className={`transition-colors hover:text-foreground ${pathname === item.href ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                    {item.label}
                </Link>
            ))}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <NavLinks />
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
            <Button variant="ghost" asChild>
                <Link href="/">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                </Link>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
  );
}
