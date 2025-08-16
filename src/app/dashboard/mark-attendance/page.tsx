
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AttendanceForm } from './attendance-form';
import { AttendanceTable } from './attendance-table';
import { AttendanceChart } from './attendance-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2, ListChecks } from 'lucide-react';

export default function MarkAttendancePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl">Mark Attendance</h1>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
              Experience the power of AttendAI. Upload a student photo and a reference photo to see our AI in action.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
                <AttendanceForm />
            </div>
            <div className="lg:col-span-3 space-y-8">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <BarChart2 className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Attendance Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <AttendanceChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-2">
                  <ListChecks className="w-6 h-6 text-primary" />
                  <CardTitle className="font-headline">Today's Attendance Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <AttendanceTable />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
