
import {
  Card,
  CardContent,
} from '@/components/ui/card';
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
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-6 text-white">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
            <span className="text-yellow-400">AI-Powered</span> Face Recognition Attendance
        </h1>
        <p className="text-gray-400 md:text-xl">
            Register students, manage attendance, and integrate AI for seamless recognition.
        </p>
      </div>

      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-3">
        {actions.slice(0, 3).map((action) => (
            <Link href={action.href} key={action.label}>
                <Card className="bg-[#1F2937] border-[#1F2937] hover:bg-[#374151] transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                        <action.icon className="h-10 w-10 text-yellow-400" />
                        <p className="font-medium">{action.label}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
       <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2 lg:px-28">
         {actions.slice(3).map((action) => (
            <Link href={action.href} key={action.label}>
                 <Card className="bg-[#1F2937] border-[#1F2937] hover:bg-[#374151] transition-colors">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                        <action.icon className="h-10 w-10 text-yellow-400" />
                        <p className="font-medium">{action.label}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </main>
  );
}
