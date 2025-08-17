
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Camera, Video, VideoOff, Check, Loader2 } from 'lucide-react';
import { Student } from '../../view-authorize-students/edit-student-form';

export default function AuthorizeVideoPage() {
    const router = useRouter();
    const params = useParams();
    const studentId = params.id as string;

    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [studentName, setStudentName] = useState<string>('');
    const [isSaving, setIsSaving] = useState(false);


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
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                setHasCameraPermission(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions in your browser settings.',
                });
            }
        };

        getCameraPermission();
        
        try {
            const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
            const currentStudent = students.find(s => s.id === studentId);
            if (currentStudent) {
                setStudentName(currentStudent.name);
            } else {
                 toast({ variant: "destructive", title: "Error", description: "Student not found." });
                 router.push('/dashboard/view-authorize-students');
            }
        } catch(e) {
            console.error(e);
        }


        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [toast, studentId, router]);
    
    const handleStartRecording = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'video/webm' });
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };
            
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setRecordedVideoUrl(url);
            };

            setRecordedChunks([]);
            mediaRecorderRef.current.start();
            setIsRecording(true);
        }
    };
    
    const handleStopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSaveVideo = () => {
        if (recordedChunks.length === 0) {
             toast({ variant: "destructive", title: "No Video", description: "Please record a video first." });
             return;
        }

        setIsSaving(true);
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result as string;
            
            try {
                const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
                const updatedStudents = students.map(s => 
                    s.id === studentId ? { ...s, status: 'Authorized', videoUrl: base64data } : s
                );
                localStorage.setItem('students', JSON.stringify(updatedStudents));
                toast({ title: "Success", description: "Student authorized and video saved."});
                router.push('/dashboard/view-authorize-students');
            } catch (error) {
                console.error("Failed to save to localStorage", error);
                toast({ variant: "destructive", title: "Storage Error", description: "Could not save video data." });
                setIsSaving(false);
            }
        };
    };


    return (
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
            <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Authorize Student: {studentName}</CardTitle>
                    <CardDescription>Record a short video of the student from multiple angles for facial recognition.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                        {recordedVideoUrl ? (
                            <video src={recordedVideoUrl} className="w-full h-full object-cover" controls autoPlay loop />
                        ) : (
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        )}
                        {hasCameraPermission === false && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                                <VideoOff className="w-12 h-12" />
                                <p className="mt-2 text-sm">Camera access denied</p>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        {isRecording ? (
                            <Button onClick={handleStopRecording} className="w-full" variant="destructive">
                                <Video className="mr-2 h-4 w-4" />
                                Stop Recording
                            </Button>
                        ) : (
                            <Button onClick={handleStartRecording} className="w-full" disabled={!hasCameraPermission}>
                                <Camera className="mr-2 h-4 w-4" />
                                Start Recording
                            </Button>
                        )}
                         <Button onClick={handleSaveVideo} className="w-full" disabled={!recordedVideoUrl || isSaving}>
                            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                            Save and Authorize
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
