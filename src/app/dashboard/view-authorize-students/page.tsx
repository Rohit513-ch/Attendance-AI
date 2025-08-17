
'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  Search,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Clock,
  Video,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EditStudentForm, Student } from './edit-student-form';

const initialStudents: Student[] = [
    { id: 'CSE001', photo: 'https://placehold.co/40x40.png', name: 'Ankit Sharma', rollNo: 'CSE001', class: 'CSE-4A', department: 'CSE', email: 'ankit.cse@example.com', status: 'Pending' },
    { id: 'CSE002', photo: 'https://placehold.co/40x40.png', name: 'Neha Verma', rollNo: 'CSE002', class: 'CSE-4A', department: 'CSE', email: 'neha.cse@example.com', status: 'Pending' },
    { id: 'CSE003', photo: 'https://placehold.co/40x40.png', name: 'Raj Patel', rollNo: 'CSE003', class: 'CSE-4A', department: 'CSE', email: 'raj.cse@example.com', status: 'Pending' },
    { id: 'CSE004', photo: 'https://placehold.co/40x40.png', name: 'Divya Gupta', rollNo: 'CSE004', class: 'CSE-4A', department: 'CSE', email: 'divya.cse@example.com', status: 'Pending' },
    { id: 'CSE005', photo: 'https://placehold.co/40x40.png', name: 'Karan Singh', rollNo: 'CSE005', class: 'CSE-4A', department: 'CSE', email: 'karan.cse@example.com', status: 'Pending' },
    { id: 'CSE006', photo: 'https://placehold.co/40x40.png', name: 'Radhika Nair', rollNo: 'CSE006', class: 'CSE-4A', department: 'CSE', email: 'radhika.cse@example.com', status: 'Pending' },
    { id: 'CSE007', photo: 'https://placehold.co/40x40.png', name: 'Manav Iyer', rollNo: 'CSE007', class: 'CSE-4A', department: 'CSE', email: 'manav.cse@example.com', status: 'Pending' },
    { id: 'CSE008', photo: 'https://placehold.co/40x40.png', name: 'Shruti Chawla', rollNo: 'CSE008', class: 'CSE-4A', department: 'CSE', email: 'shruti.cse@example.com', status: 'Pending' },
    { id: 'CSE009', photo: 'https://placehold.co/40x40.png', name: 'Nikhil Joshi', rollNo: 'CSE009', class: 'CSE-4A', department: 'CSE', email: 'nikhil.cse@example.com', status: 'Pending' },
    { id: 'CSE010', photo: 'https://placehold.co/40x40.png', name: 'Sneha Kulkarni', rollNo: 'CSE010', class: 'CSE-4A', department: 'CSE', email: 'sneha.cse@example.com', status: 'Pending' },
    { id: 'IT001', photo: 'https://placehold.co/40x40.png', name: 'Varun Mishra', rollNo: 'IT001', class: 'IT-4A', department: 'IT', email: 'varun.it@example.com', status: 'Pending' },
    { id: 'IT002', photo: 'https://placehold.co/40x40.png', name: 'Aditi Jain', rollNo: 'IT002', class: 'IT-4A', department: 'IT', email: 'aditi.it@example.com', status: 'Pending' },
    { id: 'IT003', photo: 'https://placehold.co/40x40.png', name: 'Saurabh Kumar', rollNo: 'IT003', class: 'IT-4A', department: 'IT', email: 'saurabh.it@example.com', status: 'Pending' },
    { id: 'IT004', photo: 'https://placehold.co/40x40.png', name: 'Meenal Shah', rollNo: 'IT004', class: 'IT-4A', department: 'IT', email: 'meenal.it@example.com', status: 'Pending' },
    { id: 'IT005', photo: 'https://placehold.co/40x40.png', name: 'Harshita Yadav', rollNo: 'IT005', class: 'IT-4A', department: 'IT', email: 'harshita.it@example.com', status: 'Pending' },
    { id: 'IT006', photo: 'https://placehold.co/40x40.png', name: 'Akash Reddy', rollNo: 'IT006', class: 'IT-4A', department: 'IT', email: 'akash.it@example.com', status: 'Pending' },
    { id: 'IT007', photo: 'https://placehold.co/40x40.png', name: 'Ritika Malhotra', rollNo: 'IT007', class: 'IT-4A', department: 'IT', email: 'ritika.it@example.com', status: 'Pending' },
    { id: 'IT008', photo: 'https://placehold.co/40x40.png', name: 'Abhishek Das', rollNo: 'IT008', class: 'IT-4A', department: 'IT', email: 'abhishek.it@example.com', status: 'Pending' },
    { id: 'IT009', photo: 'https://placehold.co/40x40.png', name: 'Tanya Kaur', rollNo: 'IT009', class: 'IT-4A', department: 'IT', email: 'tanya.it@example.com', status: 'Pending' },
    { id: 'IT010', photo: 'https://placehold.co/40x40.png', name: 'Rohit Goel', rollNo: 'IT010', class: 'IT-4A', department: 'IT', email: 'rohit.it@example.com', status: 'Pending' },
    { id: 'ECE001', photo: 'https://placehold.co/40x40.png', name: 'Deepak Tiwari', rollNo: 'ECE001', class: 'ECE-4A', department: 'ECE', email: 'deepak.ece@example.com', status: 'Pending' },
    { id: 'ECE002', photo: 'https://placehold.co/40x40.png', name: 'Ananya Rathi', rollNo: 'ECE002', class: 'ECE-4A', department: 'ECE', email: 'ananya.ece@example.com', status: 'Pending' },
    { id: 'ECE003', photo: 'https://placehold.co/40x40.png', name: 'Mohit Bansal', rollNo: 'ECE003', class: 'ECE-4A', department: 'ECE', email: 'mohit.ece@example.com', status: 'Pending' },
    { id: 'ECE004', photo: 'https://placehold.co/40x40.png', name: 'Shreya Menon', rollNo: 'ECE004', class: 'ECE-4A', department: 'ECE', email: 'shreya.ece@example.com', status: 'Pending' },
    { id: 'ECE005', photo: 'https://placehold.co/40x40.png', name: 'Chirag Jain', rollNo: 'ECE005', class: 'ECE-4A', department: 'ECE', email: 'chirag.ece@example.com', status: 'Pending' },
    { id: 'ECE006', photo: 'https://placehold.co/40x40.png', name: 'Sunidhi Rao', rollNo: 'ECE006', class: 'ECE-4A', department: 'ECE', email: 'sunidhi.ece@example.com', status: 'Pending' },
    { id: 'ECE007', photo: 'https://placehold.co/40x40.png', name: 'Rajat Ghosh', rollNo: 'ECE007', class: 'ECE-4A', department: 'ECE', email: 'rajat.ece@example.com', status: 'Pending' },
    { id: 'ECE008', photo: 'https://placehold.co/40x40.png', name: 'Pooja Sinha', rollNo: 'ECE008', class: 'ECE-4A', department: 'ECE', email: 'pooja.ece@example.com', status: 'Pending' },
    { id: 'ECE009', photo: 'https://placehold.co/40x40.png', name: 'Aman Saxena', rollNo: 'ECE009', class: 'ECE-4A', department: 'ECE', email: 'aman.ece@example.com', status: 'Pending' },
    { id: 'ECE010', photo: 'https://placehold.co/40x40.png', name: 'Isha Kapoor', rollNo: 'ECE010', class: 'ECE-4A', department: 'ECE', email: 'isha.ece@example.com', status: 'Pending' },
    { id: 'ME001', photo: 'https://placehold.co/40x40.png', name: 'Raghav Chouhan', rollNo: 'ME001', class: 'MECH-4A', department: 'Mechanical', email: 'raghav.me@example.com', status: 'Pending' },
    { id: 'ME002', photo: 'https://placehold.co/40x40.png', name: 'Diya Agarwal', rollNo: 'ME002', class: 'MECH-4A', department: 'Mechanical', email: 'diya.me@example.com', status: 'Pending' },
    { id: 'ME003', photo: 'https://placehold.co/40x40.png', name: 'Mohan Sharma', rollNo: 'ME003', class: 'MECH-4A', department: 'Mechanical', email: 'mohan.me@example.com', status: 'Pending' },
    { id: 'ME004', photo: 'https://placehold.co/40x40.png', name: 'Aishwarya Shetty', rollNo: 'ME004', class: 'MECH-4A', department: 'Mechanical', email: 'aishwarya.me@example.com', status: 'Pending' },
    { id: 'ME005', photo: 'https://placehold.co/40x40.png', name: 'Yashwant Rao', rollNo: 'ME005', class: 'MECH-4A', department: 'Mechanical', email: 'yash.me@example.com', status: 'Pending' },
    { id: 'ME006', photo: 'https://placehold.co/40x40.png', name: 'Simran Bedi', rollNo: 'ME006', class: 'MECH-4A', department: 'Mechanical', email: 'simran.me@example.com', status: 'Pending' },
    { id: 'ME007', photo: 'https://placehold.co/40x40.png', name: 'Pranav Saxena', rollNo: 'ME007', class: 'MECH-4A', department: 'Mechanical', email: 'pranav.me@example.com', status: 'Pending' },
    { id: 'ME008', photo: 'https://placehold.co/40x40.png', name: 'Charu Mehta', rollNo: 'ME008', class: 'MECH-4A', department: 'Mechanical', email: 'charu.me@example.com', status: 'Pending' },
    { id: 'ME009', photo: 'https://placehold.co/40x40.png', name: 'Akhil Verma', rollNo: 'ME009', class: 'MECH-4A', department: 'Mechanical', email: 'akhil.me@example.com', status: 'Pending' },
    { id: 'ME010', photo: 'https://placehold.co/40x40.png', name: 'Kritika Narayan', rollNo: 'ME010', class: 'MECH-4A', department: 'Mechanical', email: 'kritika.me@example.com', status: 'Pending' },
    { id: 'CE001', photo: 'https://placehold.co/40x40.png', name: 'Gaurav Pandey', rollNo: 'CE001', class: 'Civil-4A', department: 'Civil', email: 'gaurav.ce@example.com', status: 'Pending' },
    { id: 'CE002', photo: 'https://placehold.co/40x40.png', name: 'Swati Jha', rollNo: 'CE002', class: 'Civil-4A', department: 'Civil', email: 'swati.ce@example.com', status: 'Pending' },
    { id: 'CE003', photo: 'https://placehold.co/40x40.png', name: 'Harish Mittal', rollNo: 'CE003', class: 'Civil-4A', department: 'Civil', email: 'harish.ce@example.com', status: 'Pending' },
    { id: 'CE004', photo: 'https://placehold.co/40x40.png', name: 'Rupal Joshi', rollNo: 'CE004', class: 'Civil-4A', department: 'Civil', email: 'rupal.ce@example.com', status: 'Pending' },
    { id: 'CE005', photo: 'https://placehold.co/40x40.png', name: 'Krishan Thakur', rollNo: 'CE005', class: 'Civil-4A', department: 'Civil', email: 'krishan.ce@example.com', status: 'Pending' },
    { id: 'CE006', photo: 'https://placehold.co/40x40.png', name: 'Madhuri Reddy', rollNo: 'CE006', class: 'Civil-4A', department: 'Civil', email: 'madhuri.ce@example.com', status: 'Pending' },
    { id: 'CE007', photo: 'https://placehold.co/40x40.png', name: 'Nitin Kapoor', rollNo: 'CE007', class: 'Civil-4A', department: 'Civil', email: 'nitin.ce@example.com', status: 'Pending' },
    { id: 'CE008', photo: 'https://placehold.co/40x40.png', name: 'Sakshi Mehra', rollNo: 'CE008', class: 'Civil-4A', department: 'Civil', email: 'sakshi.ce@example.com', status: 'Pending' },
    { id: 'CE009', photo: 'https://placehold.co/40x40.png', name: 'Udit Malhotra', rollNo: 'CE009', class: 'Civil-4A', department: 'Civil', email: 'udit.ce@example.com', status: 'Pending' },
    { id: 'CE010', photo: 'https://placehold.co/40x40.png', name: 'Payal Saini', rollNo: 'CE010', class: 'Civil-4A', department: 'Civil', email: 'payal.ce@example.com', status: 'Pending' },
    { id: 'AIML001', photo: 'https://placehold.co/40x40.png', name: 'Aarav Sharma', rollNo: 'AIML001', class: 'AIML-4A', department: 'AIML', email: 'aarav.aiml@example.com', status: 'Pending' },
    { id: 'AIML002', photo: 'https://placehold.co/40x40.png', name: 'Priya Nair', rollNo: 'AIML002', class: 'AIML-4A', department: 'AIML', email: 'priya.aiml@example.com', status: 'Pending' },
    { id: 'AIML003', photo: 'https://placehold.co/40x40.png', name: 'Rohan Mehta', rollNo: 'AIML003', class: 'AIML-4A', department: 'AIML', email: 'rohan.aiml@example.com', status: 'Pending' },
    { id: 'AIML004', photo: 'https://placehold.co/40x40.png', name: 'Sneha Iyer', rollNo: 'AIML004', class: 'AIML-4A', department: 'AIML', email: 'sneha.aiml@example.com', status: 'Pending' },
    { id: 'AIML005', photo: 'https://placehold.co/40x40.png', name: 'Aditya Verma', rollNo: 'AIML005', class: 'AIML-4A', department: 'AIML', email: 'aditya.aiml@example.com', status: 'Pending' },
    { id: 'AIML006', photo: 'https://placehold.co/40x40.png', name: 'Kavya Reddy', rollNo: 'AIML006', class: 'AIML-4A', department: 'AIML', email: 'kavya.aiml@example.com', status: 'Pending' },
    { id: 'AIML007', photo: 'https://placehold.co/40x40.png', name: 'Manish Gupta', rollNo: 'AIML007', class: 'AIML-4A', department: 'AIML', email: 'manish.aiml@example.com', status: 'Pending' },
    { id: 'AIML008', photo: 'https://placehold.co/40x40.png', name: 'Ritu Sharma', rollNo: 'AIML008', class: 'AIML-4A', department: 'AIML', email: 'ritu.aiml@example.com', status: 'Pending' },
    { id: 'AIML009', photo: 'https://placehold.co/40x40.png', name: 'Saurav Singh', rollNo: 'AIML009', class: 'AIML-4A', department: 'AIML', email: 'saurav.aiml@example.com', status: 'Pending' },
    { id: 'AIML010', photo: 'https://placehold.co/40x40.png', name: 'Meera Pillai', rollNo: 'AIML010', class: 'AIML-4A', department: 'AIML', email: 'meera.aiml@example.com', status: 'Pending' },
    { id: 'DS001', photo: 'https://placehold.co/40x40.png', name: 'Tanvi Joshi', rollNo: 'DS001', class: 'DS-4A', department: 'DS', email: 'tanvi.ds@example.com', status: 'Pending' },
    { id: 'DS002', photo: 'https://placehold.co/40x40.png', name: 'Arjun Patel', rollNo: 'DS002', class: 'DS-4A', department: 'DS', email: 'arjun.ds@example.com', status: 'Pending' },
    { id: 'DS003', photo: 'https://placehold.co/40x40.png', name: 'Shivani Deshmukh', rollNo: 'DS003', class: 'DS-4A', department: 'DS', email: 'shivani.ds@example.com', status: 'Pending' },
    { id: 'DS004', photo: 'https://placehold.co/40x40.png', name: 'Rahul Choudhary', rollNo: 'DS004', class: 'DS-4A', department: 'DS', email: 'rahul.ds@example.com', status: 'Pending' },
    { id: 'DS005', photo: 'https://placehold.co/40x40.png', name: 'Ananya Menon', rollNo: 'DS005', class: 'DS-4A', department: 'DS', email: 'ananya.ds@example.com', status: 'Pending' },
    { id: 'DS006', photo: 'https://placehold.co/40x40.png', name: 'Karan Malhotra', rollNo: 'DS006', class: 'DS-4A', department: 'DS', email: 'karan.ds@example.com', status: 'Pending' },
    { id: 'DS007', photo: 'https://placehold.co/40x40.png', name: 'Pooja Kulkarni', rollNo: 'DS007', class: 'DS-4A', department: 'DS', email: 'pooja.ds@example.com', status: 'Pending' },
    { id: 'DS008', photo: 'https://placehold.co/40x40.png', name: 'Vivek Jain', rollNo: 'DS008', class: 'DS-4A', department: 'DS', email: 'vivek.ds@example.com', status: 'Pending' },
    { id: 'DS009', photo: 'https://placehold.co/40x40.png', name: 'Neha Agarwal', rollNo: 'DS009', class: 'DS-4A', department: 'DS', email: 'neha.ds@example.com', status: 'Pending' },
    { id: 'DS010', photo: 'https://placehold.co/40x40.png', name: 'Harsh Varma', rollNo: 'DS010', class: 'DS-4A', department: 'DS', email: 'harsh.ds@example.com', status: 'Pending' },
    {
        id: '23ME001',
        photo: 'https://placehold.co/40x40.png',
        name: 'ABHIJIT NARAYAN SETHI',
        rollNo: '23ME001',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'abhijit.sethi@example.com',
        status: 'Pending',
    },
    {
        id: '23ME003',
        photo: 'https://placehold.co/40x40.png',
        name: 'MUKUND DAGA',
        rollNo: '23ME003',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'mukund.daga@example.com',
        status: 'Pending',
    },
    {
        id: '23ME004',
        photo: 'https://placehold.co/40x40.png',
        name: 'DEBASISH NAYAK',
        rollNo: '23ME004',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'debasish.nayak@example.com',
        status: 'Pending',
    },
    {
        id: '23ME005',
        photo: 'https://placehold.co/40x40.png',
        name: 'RASMI RANJAN SAHOO',
        rollNo: '23ME005',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'rasmi.sahoo@example.com',
        status: 'Pending',
    },
    {
        id: '23ME006',
        photo: 'https://placehold.co/40x40.png',
        name: 'AMARENDRA BEHERA',
        rollNo: '23ME006',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'amarendra.behera@example.com',
        status: 'Pending',
    },
    {
        id: '23ME007',
        photo: 'https://placehold.co/40x40.png',
        name: 'KSHITISH KUMAR PODH',
        rollNo: '23ME007',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'kshitish.podh@example.com',
        status: 'Pending',
    },
    {
        id: '23ME008',
        photo: 'https://placehold.co/40x40.png',
        name: 'SUBHRARANJAN MISHRA',
        rollNo: '23ME008',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'subhraranjan.mishra@example.com',
        status: 'Pending',
    },
    {
        id: '23ME010',
        photo: 'https://placehold.co/40x40.png',
        name: 'ANKEET MAHARANA',
        rollNo: '23ME010',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'ankeet.maharana@example.com',
        status: 'Pending',
    },
    {
        id: '23ME012',
        photo: 'https://placehold.co/40x40.png',
        name: 'SINAYARAJ NAIK',
        rollNo: '23ME012',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'sinayaraj.naik@example.com',
        status: 'Pending',
    },
    {
        id: '23ME013',
        photo: 'https://placehold.co/40x40.png',
        name: 'RAKESH ROSHAN KHORA',
        rollNo: '23ME013',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'rakesh.khora@example.com',
        status: 'Pending',
    },
    {
        id: '23ME014',
        photo: 'https://placehold.co/40x40.png',
        name: 'PARESH KUMAR BISOI',
        rollNo: '23ME014',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'paresh.bisoi@example.com',
        status: 'Pending',
    },
    {
        id: '23ME015',
        photo: 'https://placehold.co/40x40.png',
        name: 'PINMAYA BEHERA',
        rollNo: '23ME015',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'pinmaya.behera@example.com',
        status: 'Pending',
    },
    {
        id: '23ME016',
        photo: 'https://placehold.co/40x40.png',
        name: 'SAIKIRAN PRADHAN',
        rollNo: '23ME016',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'saikiran.pradhan@example.com',
        status: 'Pending',
    },
    {
        id: '23ME017',
        photo: 'https://placehold.co/40x40.png',
        name: 'NARESH KUMAR KHILLO',
        rollNo: '23ME017',
        class: 'MECH-A',
        department: 'Mechanical',
        email: 'naresh.khillo@example.com',
        status: 'Pending',
    },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Authorized':
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 hover:bg-green-100/80">
          <CheckCircle className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case 'Pending':
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 hover:bg-yellow-100/80">
          <Clock className="mr-1 h-3 w-3" />
          {status}
        </Badge>
      );
    case 'Rejected':
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

export default function ViewAuthorizeStudentsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  
  useEffect(() => {
    setIsClient(true);
    try {
        const storedStudents = localStorage.getItem('students');
        if (storedStudents) {
            setStudents(JSON.parse(storedStudents));
        } else {
            localStorage.setItem('students', JSON.stringify(initialStudents));
            setStudents(initialStudents);
        }
    } catch (error) {
        console.error("Could not access localStorage", error);
        setStudents(initialStudents);
    }
  }, []);

  const updateLocalStorage = (updatedStudents: Student[]) => {
      try {
        localStorage.setItem('students', JSON.stringify(updatedStudents));
      } catch (error) {
          console.error("Failed to update localStorage", error);
      }
  }

  const handleAuthorize = (id: string) => {
    router.push(`/dashboard/authorize-video/${id}`);
  };

  const handleReject = (id: string) => {
    const updatedStudents = students.map(student => student.id === id ? { ...student, status: 'Rejected' } : student);
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
  };

  const handleDelete = (id: string) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updatedStudent: Student) => {
    const updatedStudents = students.map(student => (student.id === updatedStudent.id ? updatedStudent : student));
    setStudents(updatedStudents);
    updateLocalStorage(updatedStudents);
    setEditingStudent(null);
  };
  
  const filteredStudents = useMemo(() => {
    return students
      .filter(student => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchTermLower) ||
          student.rollNo.toLowerCase().includes(searchTermLower)
        );
      })
      .filter(student => {
        return selectedDepartment === 'All' || student.department === selectedDepartment;
      })
      .filter(student => {
        return selectedStatus === 'All' || student.status === selectedStatus;
      });
  }, [students, searchTerm, selectedDepartment, selectedStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedStatus]);


  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  
  const currentStudents = useMemo(() => {
    return filteredStudents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
  }, [filteredStudents, currentPage, itemsPerPage]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : totalPages));
  };

  const startRecord = filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endRecord = Math.min(currentPage * itemsPerPage, filteredStudents.length);


  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            View & Authorize Students
          </h1>
          <p className="mt-2 text-sm text-gray-300">
            Manage student registrations, authorize accounts, and update
            records.
          </p>
        </div>

        <div className="rounded-lg border bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-lg">
          <div className="flex flex-col gap-4 border-b p-4 border-white/20 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll no..."
                className="pl-10 bg-transparent placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 md:flex-none bg-transparent hover:bg-white/20 hover:text-white">
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
                  <DropdownMenuItem onSelect={() => setSelectedDepartment('BT')}>BT</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedDepartment('CHEM')}>CHEM</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-1 md:flex-none bg-transparent hover:bg-white/20 hover:text-white">
                    {selectedStatus}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => setSelectedStatus('All')}>All</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedStatus('Pending')}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedStatus('Authorized')}>Authorized</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedStatus('Rejected')}>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-white/10 border-b-white/20">
                <TableHead className="text-white">Student</TableHead>
                <TableHead className="text-white">Roll No.</TableHead>
                <TableHead className="text-white">Class</TableHead>
                <TableHead className="text-white">Department</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-white/10 border-b-0">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={student.photo}
                          alt={student.name}
                          data-ai-hint="person"
                        />
                        <AvatarFallback>
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {student.status === 'Pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-400 hover:text-green-300"
                            onClick={() => handleAuthorize(student.id)}
                            title="Authorize with Video"
                          >
                            <Video className="h-4 w-4" />
                            <span className="sr-only">Authorize with video</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                            onClick={() => handleReject(student.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-gray-300" onClick={() => handleEdit(student)}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t p-4 border-white/20">
            <p className="text-sm text-gray-300">
              Showing <strong>{startRecord}-{endRecord}</strong> of{' '}
              <strong>{filteredStudents.length}</strong> students
            </p>
            <div className="flex gap-2">
              <button className="boton-elegante" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
              <button className="boton-elegante" onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</button>
            </div>
          </div>
        </div>
      </div>
      
      {editingStudent && (
        <AlertDialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Student Details</AlertDialogTitle>
            </AlertDialogHeader>
            <EditStudentForm
              student={editingStudent}
              onUpdate={handleUpdate}
              onCancel={() => setEditingStudent(null)}
            />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );

    
    

    

    

    

    