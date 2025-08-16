
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
            className={`justify-start ${pathname === item.href ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
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
      <div className="flex min-h-screen w-full">
        <aside className="hidden md:flex h-screen w-64 flex-col border-r bg-gray-900 text-white border-gray-800 sticky top-0">
            <div className="flex h-16 items-center border-b border-gray-800 px-6">
                <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold"
                >
                <Camera className="h-6 w-6 text-yellow-400" />
                <span className="text-white">AttendAI</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2 px-4">
                <NavLinks />
            </div>
            <div className="mt-auto p-4">
                 <Button variant="ghost" asChild className="w-full justify-start text-gray-400 hover:bg-gray-700 hover:text-white">
                    <Link href="/">
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Link>
                </Button>
            </div>
        </aside>
        <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col bg-gray-900 text-white border-gray-800">
                    <div className="flex h-16 items-center border-b border-gray-800 px-6">
                        <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-semibold"
                        >
                        <Camera className="h-6 w-6 text-yellow-400" />
                        <span className="text-white">AttendAI</span>
                        </Link>
                    </div>
                    <div className="px-4">
                        <NavLinks />
                    </div>
                     <div className="mt-auto p-4">
                        <Button variant="ghost" asChild className="w-full justify-start text-gray-400 hover:bg-gray-700 hover:text-white">
                            <Link href="/">
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
             <div className="flex-1 text-center text-lg font-semibold">
                AttendAI
             </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {children}
            </main>
        </div>
      </div>
  );
}
