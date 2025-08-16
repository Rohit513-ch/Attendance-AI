
'use client';

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

export function RegistrationForm() {
  return (
      <Card className="w-[80%] max-w-[800px] mx-auto my-0 p-5 rounded-xl shadow-lg bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Student Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="studentName">Student Name <span className="text-red-500">*</span></Label>
                <Input id="studentName" required />
              </div>
              <div>
                <Label htmlFor="collegeId">CollegeID(Ex: 23CSEDS012) <span className="text-red-500">*</span></Label>
                <Input id="collegeId" required />
              </div>
              <div>
                <Label htmlFor="universityId">UniversityID(Ex: 23UGO10978) <span className="text-red-500">*</span></Label>
                <Input id="universityId" required />
              </div>
              <div>
                <Label htmlFor="mobileNo">Mobile No. <span className="text-red-500">*</span></Label>
                <Input id="mobileNo" required />
              </div>
              <div>
                <Label htmlFor="emailId">Email Id <span className="text-red-500">*</span></Label>
                <Input id="emailId" type="email" required />
              </div>
              <div>
                <Label htmlFor="fatherName">Father Name <span className="text-red-500">*</span></Label>
                <Input id="fatherName" required />
              </div>
              <div>
                <Label htmlFor="motherName">Mother Name <span className="text-red-500">*</span></Label>
                <Input id="motherName" required />
              </div>
              <div>
                <Label htmlFor="course">Select Course <span className="text-red-500">*</span></Label>
                <Select required>
                  <SelectTrigger id="course">
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
                <Input id="dob" type="date" placeholder="dd-----yyyy" required />
              </div>
              <div>
                <Label>Gender <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="male" className="flex items-center gap-4 mt-2">
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
                <Input id="studentPhoto" type="file" required />
              </div>
              <div className="col-span-2">
                <Label>Select Branch <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cse" />
                    <Label htmlFor="cse">CSE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="it" />
                    <Label htmlFor="it">IT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="ece" />
                    <Label htmlFor="ece">ECE</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="civil" />
                    <Label htmlFor="civil">Civil</Label>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address <span className="text-red-500">*</span></Label>
                <Textarea id="address" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="px-0 pb-0">
          <Button className="w-full text-lg py-6 rounded-t-none">
            Submit
          </Button>
        </CardFooter>
      </Card>
  );
}
