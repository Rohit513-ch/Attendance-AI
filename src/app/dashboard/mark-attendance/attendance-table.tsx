
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

const attendanceData = [
  {
    name: 'Sophia Davis',
    avatar: 'https://placehold.co/40x40.png',
    status: 'Present',
    time: '09:01 AM',
    verified: true,
  },
  {
    name: 'Liam Martinez',
    avatar: 'https://placehold.co/40x40.png',
    status: 'Present',
    time: '09:02 AM',
    verified: true,
  },
  {
    name: 'Olivia Brown',
    avatar: 'https://placehold.co/40x40.png',
    status: 'Absent',
    time: '--',
    verified: false,
  },
  {
    name: 'Noah Wilson',
    avatar: 'https://placehold.co/40x40.png',
    status: 'Present',
    time: '08:59 AM',
    verified: true,
  },
  {
    name: 'Emma Johnson',
    avatar: 'https://placehold.co/40x40.png',
    status: 'Present',
    time: '09:05 AM',
    verified: false,
    reason: 'Face mismatch',
  },
];

export function AttendanceTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((entry, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={entry.avatar} alt={entry.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{entry.name}</div>
                  {entry.status === 'Present' && !entry.verified && (
                    <div className="text-xs text-destructive">{entry.reason}</div>
                  )}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={entry.status === 'Present' ? 'default' : 'secondary'}
                className={entry.status === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                {entry.status === 'Present' && entry.verified && <CheckCircle2 className="mr-1 h-3 w-3 text-green-600 dark:text-green-400" />}
                {entry.status === 'Present' && !entry.verified && <XCircle className="mr-1 h-3 w-3 text-red-600 dark:text-red-400" />}
                {entry.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-1 text-muted-foreground">
                {entry.time !== '--' && <Clock className="h-4 w-4" />}
                {entry.time}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
