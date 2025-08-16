
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
import { Checkbox } from '@/components/ui/checkbox';
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

const students = [
  {
    id: '1',
    photo: 'https://placehold.co/40x40.png',
    name: 'Devi Prasad Mohanty',
    rollNo: '23CSE001',
    class: 'CSE-A',
    department: 'CSE',
    email: 'deviprasad.mohanty@example.com',
    status: 'Pending',
  },
  {
    id: '2',
    photo: 'https://placehold.co/40x40.png',
    name: 'Pratik Kar',
    rollNo: '23ECE012',
    class: 'ECE-B',
    department: 'ECE',
    email: 'pratik.kar@example.com',
    status: 'Authorized',
  },
  {
    id: '3',
    photo: 'https://placehold.co/40x40.png',
    name: 'Rohit Pandit',
    rollNo: '23MECH034',
    class: 'MECH-A',
    department: 'Mechanical',
    email: 'rohit.pandit@example.com',
    status: 'Rejected',
  },
  {
    id: '4',
    photo: 'https://placehold.co/40x40.png',
    name: 'Shyam Gupta',
    rollNo: '23CSE021',
    class: 'CSE-A',
    department: 'CSE',
    email: 'shyam.gupta@example.com',
    status: 'Pending',
  },
  {
    id: '5',
    photo: 'https://placehold.co/40x40.png',
    name: 'Chitranshu Sanket',
    rollNo: '23IT005',
    class: 'IT-A',
    department: 'IT',
    email: 'chitranshu.sanket@example.com',
    status: 'Authorized',
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
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900/50">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              View & Authorize Students
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage student registrations, authorize accounts, and update
              records.
            </p>
          </div>

          <div className="rounded-lg border bg-white dark:border-gray-800 dark:bg-card">
            <div className="flex flex-col gap-4 border-b p-4 dark:border-gray-800 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search by name, roll no..."
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 md:flex-none">
                      Department
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>CSE</DropdownMenuItem>
                    <DropdownMenuItem>ECE</DropdownMenuItem>
                    <DropdownMenuItem>IT</DropdownMenuItem>
                    <DropdownMenuItem>Mechanical</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 md:flex-none">
                      Status
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>All</DropdownMenuItem>
                    <DropdownMenuItem>Pending</DropdownMenuItem>
                    <DropdownMenuItem>Authorized</DropdownMenuItem>
                    <DropdownMenuItem>Rejected</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Authorize Selected
                </Button>
                <Button variant="destructive" size="sm">
                  Reject Selected
                </Button>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                1-5 of {students.length} students
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No.</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.photo} alt={student.name} data-ai-hint="person" />
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
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-700">
                              <CheckCircle className="h-4 w-4" />
                              <span className="sr-only">Authorize</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                              <XCircle className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

             <div className="flex items-center justify-between border-t p-4 dark:border-gray-800">
                <p className="text-sm text-muted-foreground">
                    Showing <strong>1-5</strong> of <strong>{students.length}</strong> students
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">Previous</Button>
                    <Button variant="outline" size="sm">Next</Button>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
