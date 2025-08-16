
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
  SidebarInset,
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
      <div className="flex min-h-screen bg-[#111827]">
        <Sidebar>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4 text-yellow-400" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/">
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-gray-800 bg-blue-950/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-blue-950/60 sm:px-6">
            <div className="flex-1" />
          </header>
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
