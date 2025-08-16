
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  UserPlus,
  Users,
  Camera,
  ListChecks,
  LogOut,
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="flex-shrink-0">
          <SidebarContent className="bg-black text-white flex flex-col">
            <SidebarMenu className="flex-1">
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} className="text-white hover:bg-gray-800 data-[active=true]:bg-gray-700">
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4 text-white" />
                      <span className="text-white">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarFooter className="mt-auto">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="text-white hover:bg-gray-800">
                            <Link href="/">
                                <LogOut className="h-4 w-4" />
                                <span className="text-white">Logout</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col flex-1">
            <header className="sticky top-0 z-40 w-full border-b bg-white">
                <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                    <div className="flex gap-6 md:gap-10">
                        <SidebarTrigger className="md:hidden"/>
                    </div>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
