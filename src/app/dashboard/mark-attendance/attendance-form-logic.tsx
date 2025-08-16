
'use client';

import { useState, useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, Bot, Camera, VideoOff } from 'lucide-react';
import Image from 'next/image';
import { verifyAttendanceAction, type FormState } from './actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
            Verify Attendance
        </Button>
    );
}

export function AttendanceFormLogic() {
    const initialState: FormState = { status: 'idle', message: '', result: null };
    const [state, formAction] = useActionState(verifyAttendanceAction, initialState);
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [studentPhotoPreview, setStudentPhotoPreview] = useState<string | null>(null);
    const [referencePhotoPreview, setReferencePhotoPreview] = useState<string | null>(null);
    const [studentPhotoFile, setStudentPhotoFile] = useState<File | null>(null);

     useEffect(() => {
        const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setHasCameraPermission(false);
            toast({
                variant: 'destructive',
                title: 'Camera Not Supported',
                description: 'Your browser does not support camera access.',
            });
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            let description = 'Please enable camera permissions in your browser settings to use this app.';
            if (error instanceof DOMException && error.name === "NotAllowedError") {
              description = "Camera access was denied. Please enable it in your browser settings to continue.";
            }
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: description,
            });
        }
        };

        getCameraPermission();
        
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }

    }, [toast]);

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
    
    const captureStudentPhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUri = canvas.toDataURL('image/jpeg');
            setStudentPhotoPreview(dataUri);

            canvas.toBlob(blob => {
                if(blob){
                    const photoFile = new File([blob], "student-photo.jpg", { type: "image/jpeg" });
                    setStudentPhotoFile(photoFile);
                }
            }, 'image/jpeg');
        }
    }
    
    const createFormWithPhoto = (formData: FormData) => {
        if(studentPhotoFile) {
            formData.set('studentPhoto', studentPhotoFile);
        }
        formAction(formData);
    }

    return (
        <>
            <form action={createFormWithPhoto}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="studentName">Student Name</Label>
                        <Input id="studentName" name="studentName" placeholder="e.g., John Doe" required />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Student Photo (Live)</Label>
                        <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                            {hasCameraPermission === false && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                                    <VideoOff className="w-12 h-12" />
                                    <p className="mt-2 text-sm">Camera access denied</p>
                                </div>
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" />
                         <Button type="button" variant="outline" className="w-full mt-2" onClick={captureStudentPhoto} disabled={!hasCameraPermission}>
                            <Camera className="mr-2 h-4 w-4" />
                            Capture Photo
                        </Button>
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
        </>
    );
}
