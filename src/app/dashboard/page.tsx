
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, Camera, ListChecks, Settings } from 'lucide-react';
import Link from 'next/link';

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
    </main>
  );
}
