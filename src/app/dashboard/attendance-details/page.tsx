
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
    { date: '2024-05-22', time: '09:00 AM', studentId: 'CSE001', name: 'Ankit Sharma', department: 'CSE', class: 'CSE-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'CSE002', name: 'Neha Verma', department: 'CSE', class: 'CSE-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CSE003', name: 'Raj Patel', department: 'CSE', class: 'CSE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:03 AM', studentId: 'CSE004', name: 'Divya Gupta', department: 'CSE', class: 'CSE-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CSE005', name: 'Karan Singh', department: 'CSE', class: 'CSE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CSE006', name: 'Radhika Nair', department: 'CSE', class: 'CSE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:05 AM', studentId: 'CSE007', name: 'Manav Iyer', department: 'CSE', class: 'CSE-4A', status: 'Present', confidence: '96%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CSE008', name: 'Shruti Chawla', department: 'CSE', class: 'CSE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:02 AM', studentId: 'CSE009', name: 'Nikhil Joshi', department: 'CSE', class: 'CSE-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CSE010', name: 'Sneha Kulkarni', department: 'CSE', class: 'CSE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT001', name: 'Varun Mishra', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'IT002', name: 'Aditi Jain', department: 'IT', class: 'IT-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT003', name: 'Saurabh Kumar', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:04 AM', studentId: 'IT004', name: 'Meenal Shah', department: 'IT', class: 'IT-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT005', name: 'Harshita Yadav', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'IT006', name: 'Akash Reddy', department: 'IT', class: 'IT-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT007', name: 'Ritika Malhotra', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT008', name: 'Abhishek Das', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:06 AM', studentId: 'IT009', name: 'Tanya Kaur', department: 'IT', class: 'IT-4A', status: 'Present', confidence: '95%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'IT010', name: 'Rohit Goel', department: 'IT', class: 'IT-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'ECE001', name: 'Deepak Tiwari', department: 'ECE', class: 'ECE-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ECE002', name: 'Ananya Rathi', department: 'ECE', class: 'ECE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:02 AM', studentId: 'ECE003', name: 'Mohit Bansal', department: 'ECE', class: 'ECE-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ECE004', name: 'Shreya Menon', department: 'ECE', class: 'ECE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ECE005', name: 'Chirag Jain', department: 'ECE', class: 'ECE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:03 AM', studentId: 'ECE006', name: 'Sunidhi Rao', department: 'ECE', class: 'ECE-4A', status: 'Present', confidence: '96%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ECE007', name: 'Rajat Ghosh', department: 'ECE', class: 'ECE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'ECE008', name: 'Pooja Sinha', department: 'ECE', class: 'ECE-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ECE009', name: 'Aman Saxena', department: 'ECE', class: 'ECE-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:05 AM', studentId: 'ECE010', name: 'Isha Kapoor', department: 'ECE', class: 'ECE-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME001', name: 'Raghav Chouhan', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:02 AM', studentId: 'ME002', name: 'Diya Agarwal', department: 'Mechanical', class: 'MECH-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME003', name: 'Mohan Sharma', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'ME004', name: 'Aishwarya Shetty', department: 'Mechanical', class: 'MECH-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME005', name: 'Yashwant Rao', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:03 AM', studentId: 'ME006', name: 'Simran Bedi', department: 'Mechanical', class: 'MECH-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME007', name: 'Pranav Saxena', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME008', name: 'Charu Mehta', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'ME009', name: 'Akhil Verma', department: 'Mechanical', class: 'MECH-4A', status: 'Present', confidence: '96%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'ME010', name: 'Kritika Narayan', department: 'Mechanical', class: 'MECH-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:04 AM', studentId: 'CE001', name: 'Gaurav Pandey', department: 'Civil', class: 'Civil-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CE002', name: 'Swati Jha', department: 'Civil', class: 'Civil-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'CE003', name: 'Harish Mittal', department: 'Civil', class: 'Civil-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CE004', name: 'Rupal Joshi', department: 'Civil', class: 'Civil-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:02 AM', studentId: 'CE005', name: 'Krishan Thakur', department: 'Civil', class: 'Civil-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CE006', name: 'Madhuri Reddy', department: 'Civil', class: 'Civil-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CE007', name: 'Nitin Kapoor', department: 'Civil', class: 'Civil-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'CE008', name: 'Sakshi Mehra', department: 'Civil', class: 'Civil-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'CE009', name: 'Udit Malhotra', department: 'Civil', class: 'Civil-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:03 AM', studentId: 'CE010', name: 'Payal Saini', department: 'Civil', class: 'Civil-4A', status: 'Present', confidence: '96%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML001', name: 'Aarav Sharma', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'AIML002', name: 'Priya Nair', department: 'AIML', class: 'AIML-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML003', name: 'Rohan Mehta', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:04 AM', studentId: 'AIML004', name: 'Sneha Iyer', department: 'AIML', class: 'AIML-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML005', name: 'Aditya Verma', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'AIML006', name: 'Kavya Reddy', department: 'AIML', class: 'AIML-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML007', name: 'Manish Gupta', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML008', name: 'Ritu Sharma', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:06 AM', studentId: 'AIML009', name: 'Saurav Singh', department: 'AIML', class: 'AIML-4A', status: 'Present', confidence: '95%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'AIML010', name: 'Meera Pillai', department: 'AIML', class: 'AIML-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:02 AM', studentId: 'DS001', name: 'Tanvi Joshi', department: 'DS', class: 'DS-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'DS002', name: 'Arjun Patel', department: 'DS', class: 'DS-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:00 AM', studentId: 'DS003', name: 'Shivani Deshmukh', department: 'DS', class: 'DS-4A', status: 'Present', confidence: '99%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'DS004', name: 'Rahul Choudhary', department: 'DS', class: 'DS-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:03 AM', studentId: 'DS005', name: 'Ananya Menon', department: 'DS', class: 'DS-4A', status: 'Present', confidence: '97%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'DS006', name: 'Karan Malhotra', department: 'DS', class: 'DS-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'DS007', name: 'Pooja Kulkarni', department: 'DS', class: 'DS-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:01 AM', studentId: 'DS008', name: 'Vivek Jain', department: 'DS', class: 'DS-4A', status: 'Present', confidence: '98%', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '--', studentId: 'DS009', name: 'Neha Agarwal', department: 'DS', class: 'DS-4A', status: 'Absent', confidence: '--', photo: 'https://placehold.co/40x40.png' },
    { date: '2024-05-22', time: '09:05 AM', studentId: 'DS010', name: 'Harsh Varma', department: 'DS', class: 'DS-4A', status: 'Present', confidence: '96%', photo: 'https://placehold.co/40x40.png' },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME001',
        name: 'ABHIJIT NARAYAN SETHI',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME003',
        name: 'MUKUND DAGA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME004',
        name: 'DEBASISH NAYAK',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME005',
        name: 'RASMI RANJAN SAHOO',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME006',
        name: 'AMARENDRA BEHERA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME007',
        name: 'KSHITISH KUMAR PODH',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME008',
        name: 'SUBHRARANJAN MISHRA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME010',
        name: 'ANKEET MAHARANA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME012',
        name: 'SINAYARAJ NAIK',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME013',
        name: 'RAKESH ROSHAN KHORA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME014',
        name: 'PARESH KUMAR BISOI',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME015',
        name: 'PINMAYA BEHERA',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME016',
        name: 'SAIKIRAN PRADHAN',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
    {
        date: '2024-05-22',
        time: '--',
        studentId: '23ME017',
        name: 'NARESH KUMAR KHILLO',
        department: 'Mechanical',
        class: 'MECH-A',
        status: 'Absent',
        confidence: '--',
        photo: 'https://placehold.co/40x40.png'
    },
];

export type AttendanceRecord = typeof initialAttendanceRecords[0];

const getStatusBadge = (status: string) => {
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
  return null;
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
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('IT')}>IT</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('ECE')}>ECE</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('Mechanical')}>Mechanical</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('Civil')}>Civil</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('AIML')}>AIML</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('DS')}>DS</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('EEE')}>EEE</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setSelectedDepartment('BT')}>BT</DropdownMenuItem>
                       <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-B')}>CSE-B</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-C')}>CSE-C</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-D')}>CSE-D</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-E')}>CSE-E</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-F')}>CSE-F</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-G')}>CSE-G</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-H')}>CSE-H</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-I')}>CSE-I</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-J')}>CSE-J</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-K')}>CSE-K</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-DS')}>CSE-DS</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CSE-AIML')}>CSE-AIML</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('MECH')}>MECH</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CIVIL')}>CIVIL</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setSelectedDepartment('CHEM')}>CHEM</DropdownMenuItem>
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

    

    

    

    