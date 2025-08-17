
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface Student {
  id: string;
  photo: string;
  name: string;
  rollNo: string;
  class: string;
  department: string;
  email: string;
  status: string;
}

interface EditStudentFormProps {
  student: Student;
  onUpdate: (student: Student) => void;
  onCancel: () => void;
}

export function EditStudentForm({ student, onUpdate, onCancel }: EditStudentFormProps) {
  const [formData, setFormData] = useState<Student>(student);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Student Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="rollNo">Roll No.</Label>
        <Input id="rollNo" name="rollNo" value={formData.rollNo} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="class">Class</Label>
        <Input id="class" name="class" value={formData.class} onChange={handleChange} />
      </div>
       <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Input id="department" name="department" value={formData.department} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
