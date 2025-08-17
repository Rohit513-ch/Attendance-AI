
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function RegistrationForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentName: '',
    collegeId: '',
    universityId: '',
    mobileNo: '',
    emailId: '',
    fatherName: '',
    motherName: '',
    course: '',
    dob: '',
    gender: 'male',
    studentPhoto: '',
    branch: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
  };
  
  const handleCheckboxChange = (id: string, checked: boolean | 'indeterminate') => {
      if(checked) {
          setFormData(prev => ({ ...prev, branch: id }));
      }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setFormData(prev => ({...prev, studentPhoto: reader.result as string}));
          };
          reader.readAsDataURL(file);
      }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    for (const key in formData) {
      if (key !== 'studentPhoto' && !formData[key as keyof typeof formData]) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please fill out all required fields.",
        })
        return;
      }
    }

    const newStudent = {
      id: Date.now().toString(),
      photo: formData.studentPhoto || 'https://placehold.co/40x40.png',
      name: formData.studentName,
      rollNo: formData.collegeId,
      class: `${formData.branch}-A`,
      department: formData.branch,
      email: formData.emailId,
      status: 'Pending',
    };

    try {
        const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
        const updatedStudents = [...existingStudents, newStudent];
        localStorage.setItem('students', JSON.stringify(updatedStudents));
        
        // Also add to attendance records
        const existingAttendance = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
        const newAttendanceRecord = {
             date: new Date().toISOString().split('T')[0],
             time: '--',
             studentId: newStudent.rollNo,
             name: newStudent.name,
             department: newStudent.department,
             class: newStudent.class,
             status: 'Absent',
             confidence: '--',
             photo: newStudent.photo
        }
        const updatedAttendance = [...existingAttendance, newAttendanceRecord];
        localStorage.setItem('attendanceRecords', JSON.stringify(updatedAttendance));

        toast({
            title: "Registration Submitted",
            description: "Student details have been saved.",
        })
        router.push('/dashboard/student-registration/success');
    } catch (error) {
        console.error("Failed to save to localStorage", error);
        toast({
            variant: "destructive",
            title: "Storage Error",
            description: "Could not save student data. Please try again.",
        })
    }
  };


  return (
      <Card className="w-[80%] max-w-[800px] mx-auto my-0 p-5 rounded-xl shadow-lg bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Student Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="studentName">Student Name <span className="text-red-500">*</span></Label>
                <Input id="studentName" required className="bg-transparent placeholder:text-gray-400" value={formData.studentName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="collegeId">CollegeID(Ex: 23CSEDS012) <span className="text-red-500">*</span></Label>
                <Input id="collegeId" required className="bg-transparent placeholder:text-gray-400" value={formData.collegeId} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="universityId">UniversityID(Ex: 23UGO10978) <span className="text-red-500">*</span></Label>
                <Input id="universityId" required className="bg-transparent placeholder:text-gray-400" value={formData.universityId} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="mobileNo">Mobile No. <span className="text-red-500">*</span></Label>
                <Input id="mobileNo" required className="bg-transparent placeholder:text-gray-400" value={formData.mobileNo} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="emailId">Email Id <span className="text-red-500">*</span></Label>
                <Input id="emailId" type="email" required className="bg-transparent placeholder:text-gray-400" value={formData.emailId} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="fatherName">Father Name <span className="text-red-500">*</span></Label>
                <Input id="fatherName" required className="bg-transparent placeholder:text-gray-400" value={formData.fatherName} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="motherName">Mother Name <span className="text-red-500">*</span></Label>
                <Input id="motherName" required className="bg-transparent placeholder:text-gray-400" value={formData.motherName} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="course">Select Course <span className="text-red-500">*</span></Label>
                <Select required onValueChange={(value) => handleSelectChange('course', value)} value={formData.course}>
                  <SelectTrigger id="course" className="bg-transparent">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                    <SelectItem value="bba">BBA</SelectItem>
                    <SelectItem value="mba">MBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dob">Date Of Birth <span className="text-red-500">*</span></Label>
                <Input id="dob" type="date" placeholder="dd-----yyyy" required className="bg-transparent" value={formData.dob} onChange={handleChange}/>
              </div>
              <div>
                <Label>Gender <span className="text-red-500">*</span></Label>
                <RadioGroup value={formData.gender} onValueChange={handleRadioChange} className="flex items-center gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="studentPhoto">Student Photo <span className="text-red-500">*</span></Label>
                <Input id="studentPhoto" type="file" required className="bg-transparent" onChange={handleFileChange} />
              </div>
              <div className="col-span-2">
                <Label>Select Branch <span className="text-red-500">*</span></Label>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  {['CSE', 'IT', 'ECE', 'Civil', 'EEE', 'Mech', 'BT'].map(branch => (
                     <div className="flex items-center space-x-2" key={branch}>
                        <Checkbox id={branch} onCheckedChange={(checked) => handleCheckboxChange(branch, checked)} checked={formData.branch === branch} />
                        <Label htmlFor={branch}>{branch}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Textarea id="address" required className="bg-transparent placeholder:text-gray-400" value={formData.address} onChange={handleChange} />
              </div>
            </div>
             <CardFooter className="px-0 pb-0 mt-6">
                <Button type="submit" className="w-full text-lg py-6 rounded-t-none">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
  );
}
