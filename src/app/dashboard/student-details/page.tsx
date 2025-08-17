
'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Student } from '../view-authorize-students/edit-student-form';
import type { AttendanceRecord } from '../attendance-details/page';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, CheckCircle, XCircle, Clock } from 'lucide-react';


type GroupedStudents = {
  [department: string]: {
    [className: string]: Student[];
  };
};

const getStatusBadge = (status?: string) => {
    if (!status) return null;
    if (status === 'Present') {
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80">
            <CheckCircle className="mr-1 h-3 w-3" />
            Present
          </Badge>
        );
    }
    if (status === 'Absent') {
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Absent
          </Badge>
        );
    }
    return (
        <Badge variant="secondary">
          <Clock className="mr-1 h-3 w-3" />
          No Record
        </Badge>
    );
};


export default function StudentDetailsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
        const storedStudents = localStorage.getItem('students');
        const storedAttendance = localStorage.getItem('attendanceRecords');
        if (storedStudents) setStudents(JSON.parse(storedStudents));
        if (storedAttendance) setAttendanceRecords(JSON.parse(storedAttendance));
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
  }, []);

  const groupedStudents = useMemo(() => {
    return students.reduce((acc, student) => {
      const { department, class: className } = student;
      if (!acc[department]) {
        acc[department] = {};
      }
      if (!acc[department][className]) {
        acc[department][className] = [];
      }
      acc[department][className].push(student);
      return acc;
    }, {} as GroupedStudents);
  }, [students]);
  
  const selectedStudentAttendance = useMemo(() => {
    if (!selectedStudent || !date) return null;

    return attendanceRecords.find(record => 
        record.studentId === selectedStudent.rollNo &&
        new Date(record.date).toDateString() === date.toDateString()
    );
  }, [selectedStudent, date, attendanceRecords]);


  if (!isClient) return null;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 text-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Details</h1>
            <p className="mt-2 text-sm text-gray-300">
              Browse students by department and class.
            </p>
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
                {date ? format(date, "LLL dd, y") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                    <CardTitle>Student Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {Object.entries(groupedStudents).sort(([depA], [depB]) => depA.localeCompare(depB)).map(([department, classes]) => (
                        <AccordionItem value={department} key={department}>
                        <AccordionTrigger className="text-lg font-semibold text-white">{department}</AccordionTrigger>
                        <AccordionContent>
                            <Accordion type="single" collapsible className="w-full pl-4">
                            {Object.entries(classes).sort(([classA], [classB]) => classA.localeCompare(classB)).map(([className, studentList]) => (
                                <AccordionItem value={className} key={className}>
                                <AccordionTrigger className="text-white">{className}</AccordionTrigger>
                                <AccordionContent className="space-y-2 pl-4">
                                    {studentList.map(student => (
                                    <div key={student.id} 
                                        className={cn(
                                            "flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-white/10 transition-colors",
                                            selectedStudent?.id === student.id && "bg-white/20"
                                        )}
                                        onClick={() => setSelectedStudent(student)}>
                                        <Avatar>
                                        <AvatarImage src={student.photo} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-sm text-gray-400">{student.rollNo}</p>
                                        </div>
                                    </div>
                                    ))}
                                </AccordionContent>
                                </AccordionItem>
                            ))}
                            </Accordion>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
             <Card className="bg-white/10 backdrop-blur-sm border-white/20 sticky top-8">
                <CardHeader>
                    <CardTitle>Attendance Information</CardTitle>
                    <CardDescription>
                        {date ? `Details for ${format(date, 'MMMM dd, yyyy')}` : 'Select a student and a date'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedStudent ? (
                        <div className="space-y-4">
                             <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={selectedStudent.photo} alt={selectedStudent.name} />
                                    <AvatarFallback className="text-2xl">{selectedStudent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                                    <p className="text-gray-400">{selectedStudent.rollNo}</p>
                                </div>
                             </div>
                             <div className="border-t border-white/20 pt-4 space-y-2">
                                <p><strong className="font-semibold text-gray-300">Email:</strong> {selectedStudent.email}</p>
                                <p><strong className="font-semibold text-gray-300">Status:</strong> {getStatusBadge(selectedStudentAttendance?.status)}</p>
                                <p><strong className="font-semibold text-gray-300">Time:</strong> {selectedStudentAttendance?.time || '--'}</p>
                                <p><strong className="font-semibold text-gray-300">Confidence:</strong> {selectedStudentAttendance?.confidence || '--'}</p>
                             </div>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-16">
                            <p>Select a student to view their attendance details for the chosen date.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
