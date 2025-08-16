
'use client';

import { AttendanceForm } from './attendance-form';
import { AttendanceTable } from './attendance-table';
import { AttendanceChart } from './attendance-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, ListChecks } from 'lucide-react';
import Image from 'next/image';

export default function MarkAttendancePage() {
  return (
    <div className="relative min-h-screen">
        <Image
          src="https://images.pexels.com/photos/7640905/pexels-photo-7640905.jpeg"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      <main className="relative flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl text-white">Mark Attendance</h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-300 md:text-xl">
              Use the live camera feed to verify student attendance with AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <AttendanceForm />
            </div>
            <div className="lg:col-span-3 space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <ListChecks className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Today's Attendance Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <AttendanceTable />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <BarChart2 className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Attendance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <AttendanceChart />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
