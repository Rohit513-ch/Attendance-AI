
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, Camera, ListChecks, Settings, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { AttendanceChart } from '../demo/attendance-chart';
import { AttendanceTable } from '../demo/attendance-table';

export default function DashboardPage() {
  const actions = [
    {
      href: '#',
      icon: UserPlus,
      label: 'Register Students',
    },
    {
      href: '#',
      icon: Users,
      label: 'Authorize Students',
    },
    {
      href: '/demo',
      icon: Camera,
      label: 'Mark Attendance',
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {actions.map((action) => (
            <Card key={action.label} className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {action.label}
                </CardTitle>
                <action.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button size="sm" asChild>
                    <Link href={action.href}>Go</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center">
             <div className="grid gap-2">
                <CardTitle>Attendance Analytics</CardTitle>
                <CardDescription>
                    Weekly student attendance overview.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/demo">
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <AttendanceChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance Log</CardTitle>
             <CardDescription>
                A log of today's student attendance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceTable />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
