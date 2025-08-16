
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
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  UserPlus,
  Users,
  Camera,
  ListChecks,
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent className="bg-blue-950 text-white">
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} className="text-white hover:bg-blue-900 data-[active=true]:bg-blue-800">
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4 text-white" />
                      <span className="text-white">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="bg-blue-950 text-white">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-white hover:bg-blue-900">
                        <Link href="/">
                            <LogOut className="h-4 w-4" />
                            <span className="text-white">Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 flex flex-col bg-background">
          <header className="sticky top-0 z-40 w-full border-b bg-white">
            <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
              <div className="flex gap-6 md:gap-10">
                 <SidebarTrigger className="md:hidden"/>
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
