
'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  Search,
  Download,
  Calendar as CalendarIcon,
  CheckCircle,
  XCircle,
  Clock,
  BarChart2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AttendanceChart } from '../mark-attendance/attendance-chart';
import Image from 'next/image';

const attendanceRecords = [
  {
    date: '2024-05-20',
    time: '09:01 AM',
    studentId: '23CSE012',
    name: 'Devi Prasad Mohanty',
    status: 'Present',
    confidence: '99%',
    cameraId: 'CAM-01',
    photo: 'https://placehold.co/40x40.png'
  },
  {
    date: '2024-05-20',
    time: '09:02 AM',
    studentId: '23CSE024',
    name: 'Pratik Kar',
    status: 'Present',
    confidence: '97%',
    cameraId: 'CAM-01',
    photo: 'https://placehold.co/40x40.png'
  },
  {
    date: '2024-05-20',
    time: '--',
    studentId: '23CSE045',
    name: 'Rohit Pandit',
    status: 'Absent',
    confidence: '--',
    cameraId: '--',
    photo: 'https://placehold.co/40x40.png'
  },
  {
    date: '2024-05-20',
    time: '09:16 AM',
    studentId: '23CSE018',
    name: 'Shyam Gupta',
    status: 'Late',
    confidence: '98%',
    cameraId: 'CAM-02',
    photo: 'https://placehold.co/40x40.png'
  },
  {
    date: '2024-05-20',
    time: '09:05 AM',
    studentId: '23CSE033',
    name: 'Chitranshu Sanket',
    status: 'Present',
    confidence: '96%',
    cameraId: 'CAM-01',
    photo: 'https://placehold.co/40x40.png'
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Present':
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80">
          <CheckCircle className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case 'Late':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 hover:bg-yellow-100/80">
          <Clock className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case 'Absent':
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function AttendanceDetailsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Image
        src="https://images.pexels.com/photos/7640905/pexels-photo-7640905.jpeg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <main className="relative flex-1 p-4 md:p-6 lg:p-8">
        {isClient && (
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Attendance Details
              </h1>
              <p className="mt-2 text-sm text-gray-300">
                View, filter, and export detailed attendance records.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Records</CardTitle>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search by name, roll no..." className="pl-10" />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-full sm:w-[300px] justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} -{" "}
                                  {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full sm:w-auto">
                            Class
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>All</DropdownMenuItem>
                          <DropdownMenuItem>CSE-A</DropdownMenuItem>
                          <DropdownMenuItem>CSE-B</DropdownMenuItem>
                          <DropdownMenuItem>ECE-A</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <Download className="mr-2 h-4 w-4" />
                                Download
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Download as PDF</DropdownMenuItem>
                            <DropdownMenuItem>Download as Excel</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Roll No.</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceRecords.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={record.photo} alt={record.name} data-ai-hint="person" />
                                  <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{record.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{record.studentId}</TableCell>
                            <TableCell>{format(new Date(record.date), 'dd MMM, yyyy')}</TableCell>
                            <TableCell>{record.time}</TableCell>
                            <TableCell>{getStatusBadge(record.status)}</TableCell>
                            <TableCell>{record.confidence}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <div className="flex items-center justify-between border-t p-4 dark:border-gray-800">
                    <p className="text-sm text-muted-foreground">
                      Showing <strong>1-5</strong> of <strong>{attendanceRecords.length}</strong> records
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" disabled>Previous</Button>
                      <Button variant="outline" size="sm">Next</Button>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="space-y-8">
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <BarChart2 className="w-6 h-6 text-primary" />
                    <CardTitle>Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AttendanceChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Students</span>
                      <span className="font-bold">30</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Present</span>
                      <span className="font-bold text-green-600">25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Absent</span>
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Late</span>
                      <span className="font-bold text-yellow-600">2</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
