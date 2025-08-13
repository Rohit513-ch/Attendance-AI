
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  UserPlus,
  Users,
  Camera,
  ListChecks,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '#', icon: UserPlus, label: 'Student Registration' },
    { href: '#', icon: Users, label: 'View / Authorize Students' },
    { href: '/demo', icon: Camera, label: 'Mark Attendance' },
    { href: '#', icon: ListChecks, label: 'Attendance Details' },
    { href: '#', icon: Settings, label: 'Camera Configuration' },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#111827]">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-yellow-400">AI Dashboard</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={item.href === '/demo'}>
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
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-gray-800 bg-[#111827]/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-[#111827]/60 sm:px-6 md:justify-end">
            <SidebarTrigger className="md:hidden text-white"/>
            <p className='font-bold text-lg md:hidden text-yellow-400'>AI Dashboard</p>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
