
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
      <Card className="w-full max-w-4xl border-2 border-red-500">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Student Registration Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input id="studentName" />
              </div>
              <div>
                <Label htmlFor="mobileNo">Mobile No.</Label>
                <Input id="mobileNo" />
              </div>
              <div>
                <Label htmlFor="emailId">Email Id</Label>
                <Input id="emailId" type="email" />
              </div>
              <div>
                <Label htmlFor="fatherName">Father Name</Label>
                <Input id="fatherName" />
              </div>
              <div>
                <Label htmlFor="motherName">Mother Name</Label>
                <Input id="motherName" />
              </div>
              <div>
                <Label htmlFor="course">Select Course</Label>
                <Select>
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
                <Label htmlFor="dob">Date Of Birth</Label>
                <Input id="dob" type="date" placeholder="dd-----yyyy" />
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup defaultValue="male" className="flex items-center gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="studentPhoto">Student Photo</Label>
                <Input id="studentPhoto" type="file" />
              </div>
              <div className="col-span-2">
                <Label>Select Branch</Label>
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
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="px-0 pb-0">
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 rounded-t-none">
            Submit
          </Button>
        </CardFooter>
      </Card>
  );
}
