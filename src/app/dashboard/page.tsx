
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { UserPlus, Users, Camera, ListChecks } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const actions = [
    {
      href: '/dashboard/student-registration',
      icon: UserPlus,
      label: 'Register Students',
    },
    {
      href: '/dashboard/view-authorize-students',
      icon: Users,
      label: 'Authorize Students',
    },
    {
      href: '/dashboard/mark-attendance',
      icon: Camera,
      label: 'Mark Attendance',
    },
     {
      href: '/dashboard/attendance-details',
      icon: ListChecks,
      label: 'View Attendance',
    },
  ];

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-6 text-white">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-yellow-400">
            AI-Powered <span className="text-white">Face Recognition Attendance</span>
        </h1>
        <p className="text-gray-400 md:text-xl">
            Register students, manage attendance, and integrate AI for seamless recognition.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
        {actions.map((action) => (
            <Link href={action.href} key={action.label}>
                <Card className="bg-gray-800 border-gray-800 hover:bg-gray-700 transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                        <action.icon className="h-10 w-10 text-yellow-400" />
                        <p className="font-medium text-gray-400">{action.label}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
