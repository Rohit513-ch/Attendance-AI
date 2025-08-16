
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
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EditStudentForm, Student } from './edit-student-form';

const initialStudents: Student[] = [
  {
    id: '1',
    photo: 'https://placehold.co/40x40.png',
    name: 'Aarav Sharma',
    rollNo: '23CSE001',
    class: 'CSE-A',
    department: 'CSE',
    email: 'aarav.sharma@example.com',
    status: 'Pending',
  },
  {
    id: '2',
    photo: 'https://placehold.co/40x40.png',
    name: 'Diya Singh',
    rollNo: '23ECE012',
    class: 'ECE-B',
    department: 'ECE',
    email: 'diya.singh@example.com',
    status: 'Authorized',
  },
  {
    id: '3',
    photo: 'https://placehold.co/40x40.png',
    name: 'Rohan Gupta',
    rollNo: '23MECH034',
    class: 'MECH-A',
    department: 'Mechanical',
    email: 'rohan.gupta@example.com',
    status: 'Rejected',
  },
  {
    id: '4',
    photo: 'https://placehold.co/40x40.png',
    name: 'Priya Patel',
    rollNo: '23CSE021',
    class: 'CSE-A',
    department: 'CSE',
    email: 'priya.patel@example.com',
    status: 'Pending',
  },
  {
    id: '5',
    photo: 'https://placehold.co/40x40.png',
    name: 'Advik Kumar',
    rollNo: '23IT005',
    class: 'IT-A',
    department: 'IT',
    email: 'advik.kumar@example.com',
    status: 'Authorized',
  },
  {
    id: '676',
    photo: 'https://placehold.co/40x40.png',
    name: 'Satyam Chand',
    rollNo: '23CSE686',
    class: 'CSE-C',
    department: 'CSE',
    email: 'satyam.chand@example.com',
    status: 'Pending',
  },
  {
    id: '677',
    photo: 'https://placehold.co/40x40.png',
    name: 'Soumya Sukriti',
    rollNo: '23CSE687',
    class: 'CSE-C',
    department: 'CSE',
    email: 'soumya.sukriti@example.com',
    status: 'Pending',
  },
  {
    id: '678',
    photo: 'https://placehold.co/40x40.png',
    name: 'Pratik Priyadarshi',
    rollNo: '23CSE688',
    class: 'CSE-C',
    department: 'CSE',
    email: 'pratik.priyadarshi@example.com',
    status: 'Authorized',
  },
  {
    id: '679',
    photo: 'https://placehold.co/40x40.png',
    name: 'Aditya Kumar Sharma',
    rollNo: '23CSE689',
    class: 'CSE-C',
    department: 'CSE',
    email: 'aditya.sharma@example.com',
    status: 'Rejected',
  },
  {
    id: '680',
    photo: 'https://placehold.co/40x40.png',
    name: 'Ananya Singh',
    rollNo: '23CSE690',
    class: 'CSE-C',
    department: 'CSE',
    email: 'ananya.singh@example.com',
    status: 'Pending',
  },
  {
    id: '681',
    photo: 'https://placehold.co/40x40.png',
    name: 'Aryan Kumar',
    rollNo: '23CSE691',
    class: 'CSE-C',
    department: 'CSE',
    email: 'aryan.kumar@example.com',
    status: 'Authorized',
  },
   {
    id: '682',
    photo: 'https://placehold.co/40x40.png',
    name: 'Ishaan Sharma',
    rollNo: '23ECE015',
    class: 'ECE-A',
    department: 'ECE',
    email: 'ishaan.sharma@example.com',
    status: 'Pending',
  },
  {
    id: '683',
    photo: 'https://placehold.co/40x40.png',
    name: 'Myra Reddy',
    rollNo: '23IT008',
    class: 'IT-A',
    department: 'IT',
    email: 'myra.reddy@example.com',
    status: 'Authorized',
  },
  {
    id: '684',
    photo: 'https://placehold.co/40x40.png',
    name: 'Vihaan Joshi',
    rollNo: '23MECH040',
    class: 'MECH-B',
    department: 'Mechanical',
    email: 'vihaan.joshi@example.com',
    status: 'Rejected',
  },
  {
    id: '685',
    photo: 'https://placehold.co/40x40.png',
    name: 'Saanvi Gupta',
    rollNo: '23CSE055',
    class: 'CSE-B',
    department: 'CSE',
    email: 'saanvi.gupta@example.com',
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
  const [isClient, setIsClient] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStatusChange = (id: string, status: 'Authorized' | 'Rejected') => {
    setStudents(students.map(student => student.id === id ? { ...student, status } : student));
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updatedStudent: Student) => {
    setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
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

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePreviousPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : totalPages));
  };

  const startRecord = (currentPage - 1) * itemsPerPage + 1;
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
                  <DropdownMenuItem onSelect={() => setSelectedDepartment('ECE')}>ECE</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedDepartment('IT')}>IT</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedDepartment('Mechanical')}>Mechanical</DropdownMenuItem>
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
                            onClick={() => handleStatusChange(student.id, 'Authorized')}
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span className="sr-only">Authorize</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                            onClick={() => handleStatusChange(student.id, 'Rejected')}
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
              <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1} className="bg-transparent hover:bg-white/20 hover:text-white">
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-transparent hover:bg-white/20 hover:text-white">
                Next
              </Button>
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
}
