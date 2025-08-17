
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


const initialAttendanceRecords = [
    {
        date: '2024-05-20',
        time: '09:01 AM',
        studentId: '23CSE001',
        name: 'Aarav Sharma',
        department: 'CSE',
        class: 'CSE-A',
        status: 'Present',
        confidence: '99%',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-20',
        time: '09:02 AM',
        studentId: '23ECE012',
        name: 'Diya Singh',
        department: 'ECE',
        class: 'ECE-B',
        status: 'Present',
        confidence: '97%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-20',
        time: '--',
        studentId: '23MECH034',
        name: 'Rohan Gupta',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        cameraId: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-20',
        time: '09:16 AM',
        studentId: '23CSE021',
        name: 'Priya Patel',
        department: 'CSE',
        class: 'CSE-A',
        status: 'Present',
        confidence: '98%',
        cameraId: 'CAM-02',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-20',
        time: '09:05 AM',
        studentId: '23IT005',
        name: 'Advik Kumar',
        department: 'IT',
        class: 'IT-A',
        status: 'Present',
        confidence: '96%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-21',
        time: '09:00 AM',
        studentId: '23CSE001',
        name: 'Aarav Sharma',
        department: 'CSE',
        class: 'CSE-A',
        status: 'Present',
        confidence: '99%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-21',
        time: '09:03 AM',
        studentId: '23ECE012',
        name: 'Diya Singh',
        department: 'ECE',
        class: 'ECE-B',
        status: 'Present',
        confidence: '98%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-21',
        time: '--',
        studentId: '23MECH034',
        name: 'Rohan Gupta',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        cameraId: '--',
        photo: 'https://placehold.co/40x40.png'
    },
     {
        date: '2024-05-21',
        time: '09:05 AM',
        studentId: '23CSE021',
        name: 'Priya Patel',
        department: 'CSE',
        class: 'CSE-A',
        status: 'Present',
        confidence: '95%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-21',
        time: '09:08 AM',
        studentId: '23IT005',
        name: 'Advik Kumar',
        department: 'IT',
        class: 'IT-A',
        status: 'Present',
        confidence: '97%',
        cameraId: 'CAM-01',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:02 AM',
        studentId: '23CSE686',
        name: 'Satyam Chand',
        department: 'CSE',
        class: 'CSE-C',
        status: 'Present',
        confidence: '98%',
        cameraId: 'CAM-03',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23CSE687',
        name: 'Soumya Sukriti',
        department: 'CSE',
        class: 'CSE-C',
        status: 'Absent',
        confidence: '--',
        cameraId: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:18 AM',
        studentId: '23CSE688',
        name: 'Pratik Priyadarshi',
        department: 'CSE',
        class: 'CSE-C',
        status: 'Present',
        confidence: '99%',
        cameraId: 'CAM-03',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:04 AM',
        studentId: '23CSE689',
        name: 'Aditya Kumar Sharma',
        department: 'CSE',
        class: 'CSE-C',
        status: 'Present',
        confidence: '96%',
        cameraId: 'CAM-03',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:01 AM',
        studentId: '23CSE100',
        name: 'Alok Kumar Mandal',
        department: 'CSE',
        class: 'CSE-A',
        status: 'Present',
        confidence: '98%',
        cameraId: 'CAM-04',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:03 AM',
        studentId: '23ECE101',
        name: 'Rakesh Sethi',
        department: 'ECE',
        class: 'ECE-B',
        status: 'Present',
        confidence: '95%',
        cameraId: 'CAM-04',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23CSE102',
        name: 'Nityananda Behera',
        department: 'CSE',
        class: 'CSE-B',
        status: 'Absent',
        confidence: '--',
        cameraId: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:15 AM',
        studentId: '23IT103',
        name: 'Sudhansu Sahoo',
        department: 'IT',
        class: 'IT-A',
        status: 'Present',
        confidence: '99%',
        cameraId: 'CAM-04',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:05 AM',
        studentId: '23MECH104',
        name: 'Matruprasad Panda',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Present',
        confidence: '97%',
        cameraId: 'CAM-04',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:06 AM',
        studentId: '23CSE105',
        name: 'Soumya Ranjan Behera',
        department: 'CSE',
        class: 'CSE-C',
        status: 'Present',
        confidence: '96%',
        cameraId: 'CAM-04',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:00 AM',
        studentId: '23EEE106',
        name: 'Jan Mohanty',
        department: 'EEE',
        class: 'EEE-A',
        status: 'Present',
        confidence: '98%',
        cameraId: 'CAM-05',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23BT107',
        name: 'Kabir Singh',
        department: 'BT',
        class: 'BT-B',
        status: 'Absent',
        confidence: '--',
        cameraId: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:02 AM',
        studentId: '23CSE-DS108',
        name: 'Priya Mohapatra',
        department: 'CSE-DS',
        class: 'CSE-DS-A',
        status: 'Present',
        confidence: '99%',
        cameraId: 'CAM-05',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '09:08 AM',
        studentId: '23CSE-AIML109',
        name: 'Ravi Udhury',
        department: 'CSE-AIML',
        class: 'CSE-AIML-A',
        status: 'Present',
        confidence: '97%',
        cameraId: 'CAM-05',
        photo: 'https://placehold.co/40x40.png'
    }
];

export type AttendanceRecord = typeof initialAttendanceRecords[0];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Present':
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80">
          <CheckCircle className="mr-1 h-3 w-3" />
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
  const [date, setDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const itemsPerPage = 50;

  useEffect(() => {
    setIsClient(true);
    try {
        const storedRecords = localStorage.getItem('attendanceRecords');
        if (storedRecords) {
            setAttendanceRecords(JSON.parse(storedRecords));
        } else {
            localStorage.setItem('attendanceRecords', JSON.stringify(initialAttendanceRecords));
            setAttendanceRecords(initialAttendanceRecords);
        }
    } catch (error) {
        console.error("Could not access localStorage", error);
        setAttendanceRecords(initialAttendanceRecords);
    }
  }, []);

  const filteredRecords = useMemo(() => {
    let recordsToShow = attendanceRecords;

    if (date) {
        recordsToShow = recordsToShow.filter(record => {
            const recordDate = new Date(record.date);
            return recordDate.toDateString() === date.toDateString();
        });
    }

    return recordsToShow
      .filter(record => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          record.name.toLowerCase().includes(searchTermLower) ||
          record.studentId.toLowerCase().includes(searchTermLower)
        );
      })
      .filter(record => {
        return selectedDepartment === 'All' || record.department === selectedDepartment;
      });
  }, [searchTerm, selectedDepartment, date, attendanceRecords]);
  
  const totalPages = useMemo(() => {
    return Math.ceil(filteredRecords.length / itemsPerPage);
  }, [filteredRecords, itemsPerPage]);
  
  const currentRecords = useMemo(() => {
      return filteredRecords.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
  },[filteredRecords, currentPage, itemsPerPage]);

  const summary = useMemo(() => {
    const present = filteredRecords.filter(r => r.status === 'Present').length;
    const absent = filteredRecords.filter(r => r.status === 'Absent').length;
    const total = filteredRecords.length;
    return { present, absent, total };
  }, [filteredRecords]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };
  
  useEffect(() => {
      setCurrentPage(1);
  }, [searchTerm, selectedDepartment, date]);


  const startRecord = filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRecord = Math.min(currentPage * itemsPerPage, filteredRecords.length);


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
                        <CalendarIcon className="mr-2 h-4 w-4 text-yellow-400" />
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
                        {selectedDepartment}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('All')}>All</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE')}>CSE</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-AIML')}>CSE-AIML</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-DS')}>CSE-DS</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('Mechanical')}>Mechanical</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('EEE')}>EEE</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('ECE')}>ECE</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('BT')}>BT</DropdownMenuItem>
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
                    {currentRecords.length > 0 ? (
                      currentRecords.map((record, index) => (
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
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-400 py-8">
                          No attendance records found for the selected criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="flex items-center justify-between border-t p-4 border-white/20">
                <p className="text-sm text-gray-300">
                  Showing <strong>{startRecord}-{endRecord}</strong> of <strong>{filteredRecords.length}</strong> records
                </p>
                <div className="flex gap-2">
                    <button className="boton-elegante" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button className="boton-elegante" onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
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
                <AttendanceChart data={filteredRecords} />
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Students</span>
                  <span className="font-bold">{summary.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Present</span>
                  <span className="font-bold text-green-400">{summary.present}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Absent</span>
                  <span className="font-bold text-red-400">{summary.absent}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
