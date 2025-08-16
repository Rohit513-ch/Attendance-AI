
'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AttendanceChart } from '../mark-attendance/attendance-chart';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import type { RowInput } from 'jspdf-autotable';


const attendanceRecords = [
  {
    date: '2024-05-20',
    time: '09:01 AM',
    studentId: '23CSE012',
    name: 'Devi Prasad Mohanty',
    department: 'CSE',
    class: 'CSE-A',
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
    department: 'CSE',
    class: 'CSE-A',
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
    department: 'CSE',
    class: 'CSE-B',
    status: 'Absent',
    confidence: '--',
    cameraId: '--',
    photo: 'https://placehold.co/40x40.png'
  },
  {
    date: '2024-05-20',
    time: '09:16 AM',
    studentId: '23ECE018',
    name: 'Shyam Gupta',
    department: 'ECE',
    class: 'ECE-A',
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
    department: 'CSE',
    class: 'CSE-B',
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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  useEffect(() => {
    setIsClient(true);
    setDate(new Date());
  }, []);

  const filteredRecords = useMemo(() => {
    return attendanceRecords
      .filter(record => {
        if (!date) return true;
        const recordDate = new Date(record.date);
        return recordDate.toDateString() === date.toDateString();
      })
      .filter(record => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          record.name.toLowerCase().includes(searchTermLower) ||
          record.studentId.toLowerCase().includes(searchTermLower)
        );
      })
      .filter(record => {
        return selectedClass === 'All' || record.class === selectedClass;
      });
  }, [searchTerm, selectedClass, date]);


  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Attendance Records', 14, 16);
    (doc as any).autoTable({
      startY: 20,
      head: [['Student', 'Roll No.', 'Department', 'Class', 'Date', 'Time', 'Status', 'Confidence']],
      body: filteredRecords.map(record => [
        record.name,
        record.studentId,
        record.department,
        record.class,
        format(new Date(record.date), 'dd MMM, yyyy'),
        record.time,
        record.status,
        record.confidence
      ]) as RowInput[],
    });
    doc.save('attendance-records.pdf');
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRecords.map(record => ({
      'Student': record.name,
      'Roll No.': record.studentId,
      'Department': record.department,
      'Class': record.class,
      'Date': format(new Date(record.date), 'dd MMM, yyyy'),
      'Time': record.time,
      'Status': record.status,
      'Confidence': record.confidence
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, 'attendance-records.xlsx');
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
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
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, roll no..." 
                        className="pl-10 bg-transparent placeholder:text-gray-400" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-full sm:w-[240px] justify-start text-left font-normal bg-transparent hover:bg-white/20 hover:text-white",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "LLL dd, y")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-white/20 hover:text-white">
                        {selectedClass}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setSelectedClass('All')}>All</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedClass('CSE-A')}>CSE-A</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedClass('CSE-B')}>CSE-B</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedClass('ECE-A')}>ECE-A</DropdownMenuItem>
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
                        <DropdownMenuItem onSelect={handleDownloadPdf}>Download as PDF</DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDownloadExcel}>Download as Excel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-white/10 border-white/20">
                      <TableHead className="text-white">Student</TableHead>
                      <TableHead className="text-white">Roll No.</TableHead>
                      <TableHead className="text-white">Department</TableHead>
                      <TableHead className="text-white">Class</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Time</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record, index) => (
                      <TableRow key={index} className="hover:bg-white/10 border-white/20">
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
                        <TableCell>{record.department}</TableCell>
                        <TableCell>{record.class}</TableCell>
                        <TableCell>{format(new Date(record.date), 'dd MMM, yyyy')}</TableCell>
                        <TableCell>{record.time}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>{record.confidence}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="flex items-center justify-between border-t p-4 border-white/20">
                <p className="text-sm text-gray-300">
                  Showing <strong>1-{filteredRecords.length}</strong> of <strong>{filteredRecords.length}</strong> records
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled className="bg-transparent hover:bg-white/20 hover:text-white">Previous</Button>
                  <Button variant="outline" size="sm" className="bg-transparent hover:bg-white/20 hover:text-white">Next</Button>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader className="flex flex-row items-center space-x-2">
                <BarChart2 className="w-6 h-6 text-primary" />
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <AttendanceChart />
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Students</span>
                  <span className="font-bold">30</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Present</span>
                  <span className="font-bold text-green-400">25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Absent</span>
                  <span className="font-bold text-red-400">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Late</span>
                  <span className="font-bold text-yellow-400">2</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
