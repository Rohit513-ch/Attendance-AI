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
    {
      href: '#',
      icon: ListChecks,
      label: 'View Attendance',
    },
    {
      href: '#',
      icon: Settings,
      label: 'Configure Camera',
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-900 text-white">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-yellow-400">
          AI-Powered Face Recognition Attendance
        </h1>
        <p className="text-muted-foreground text-gray-400">
          Register students, manage attendance, and integrate AI for seamless
          recognition.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {actions.slice(0, 3).map((action) => (
          <Button
            key={action.label}
            asChild
            className="h-24 bg-gray-800 hover:bg-gray-700 flex flex-col items-center justify-center gap-2 rounded-lg"
          >
            <Link href={action.href}>
              <action.icon className="h-8 w-8 text-yellow-400" />
              <span className="text-lg font-medium">{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
         {actions.slice(3, 5).map((action) => (
          <Button
            key={action.label}
            asChild
            className="h-24 bg-gray-800 hover:bg-gray-700 flex flex-col items-center justify-center gap-2 rounded-lg"
          >
            <Link href={action.href}>
              <action.icon className="h-8 w-8 text-yellow-400" />
              <span className="text-lg font-medium">{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </main>
  );
}
