'use client';

import { useState, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, Bot } from 'lucide-react';
import Image from 'next/image';
import { verifyAttendanceAction, type FormState } from './actions';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            Verify Attendance
        </Button>
    );
}

export function AttendanceForm() {
    const initialState: FormState = { status: 'idle', message: '', result: null };
    const [state, formAction] = useActionState(verifyAttendanceAction, initialState);

    const [studentPhotoPreview, setStudentPhotoPreview] = useState<string | null>(null);
    const [referencePhotoPreview, setReferencePhotoPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string | null) => void) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI Verification</CardTitle>
                <CardDescription>Upload two images to verify attendance.</CardDescription>
            </CardHeader>
            <form action={formAction}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="studentName">Student Name</Label>
                        <Input id="studentName" name="studentName" placeholder="e.g., John Doe" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="studentPhoto">Student Photo (Live)</Label>
                        <Input id="studentPhoto" name="studentPhoto" type="file" accept="image/*" required onChange={(e) => handleFileChange(e, setStudentPhotoPreview)} />
                        {studentPhotoPreview && <Image src={studentPhotoPreview} alt="Student photo preview" width={100} height={100} className="mt-2 rounded-md object-cover" />}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="referencePhoto">Reference Photo (ID)</Label>
                        <Input id="referencePhoto" name="referencePhoto" type="file" accept="image/*" required onChange={(e) => handleFileChange(e, setReferencePhotoPreview)} />
                        {referencePhotoPreview && <Image src={referencePhotoPreview} alt="Reference photo preview" width={100} height={100} className="mt-2 rounded-md object-cover" />}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </form>

            {state.status === 'error' && (
                <CardFooter>
                    <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{state.message}</AlertDescription>
                    </Alert>
                </CardFooter>
            )}
            
            {state.status === 'success' && state.result && (
                 <CardFooter className="flex-col items-start space-y-4">
                    <Alert variant={state.result.isAttendanceVerified ? 'default' : 'destructive'} className={state.result.isAttendanceVerified ? 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800' : ''}>
                        {state.result.isAttendanceVerified ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle className={state.result.isAttendanceVerified ? 'text-green-800 dark:text-green-300' : ''}>
                            {state.result.isAttendanceVerified ? 'Attendance Verified' : 'Attendance Not Verified'}
                        </AlertTitle>
                        <AlertDescription className={state.result.isAttendanceVerified ? 'text-green-700 dark:text-green-400' : ''}>
                            {state.result.verificationReasoning}
                        </AlertDescription>
                    </Alert>
                 </CardFooter>
            )}
        </Card>
    );
}
