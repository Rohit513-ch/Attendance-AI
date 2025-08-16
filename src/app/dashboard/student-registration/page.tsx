
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Mail, Phone, Lock, Upload, ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useMultistepForm } from '@/hooks/use-multistep-form';

const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  rollNumber: z.string().min(1, 'Roll number is required'),
  registrationNumber: z.string().min(1, 'Registration number is required'),
  class: z.string().min(1, 'Class/Year/Section is required'),
  department: z.string().min(1, 'Department/Branch is required'),
});

const contactInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

const authSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const faceDataSchema = z.object({
    photo: z.any().refine(file => file instanceof File || typeof file === 'string', 'Photo is required.'),
});

const formSchema = personalInfoSchema.merge(contactInfoSchema).merge(authSchema).merge(faceDataSchema);

type FormData = z.infer<typeof formSchema>;

function PersonalInfoForm({ register, errors }: any) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register('fullName')} placeholder="John Doe" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
            </div>
            <div>
                <Label htmlFor="rollNumber">Roll Number / Student ID</Label>
                <Input id="rollNumber" {...register('rollNumber')} placeholder="e.g., 21CS001" />
                {errors.rollNumber && <p className="text-red-500 text-xs mt-1">{errors.rollNumber.message}</p>}
            </div>
            <div>
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input id="registrationNumber" {...register('registrationNumber')} placeholder="e.g., 20210001" />
                {errors.registrationNumber && <p className="text-red-500 text-xs mt-1">{errors.registrationNumber.message}</p>}
            </div>
            <div>
                <Label htmlFor="class">Class / Year / Section</Label>
                <Input id="class" {...register('class')} placeholder="e.g., 3rd Year, Section A" />
                {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class.message}</p>}
            </div>
            <div>
                <Label htmlFor="department">Department / Branch</Label>
                <Input id="department" {...register('department')} placeholder="e.g., Computer Science" />
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
            </div>
        </div>
    );
}

function ContactInfoForm({ register, errors }: any) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register('email')} placeholder="student@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input id="mobileNumber" type="tel" {...register('mobileNumber')} placeholder="+1234567890" />
                {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber.message}</p>}
            </div>
        </div>
    );
}

function AuthForm({ register, errors }: any) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" {...register('username')} placeholder="Choose a username" />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" {...register('password')} placeholder="********" />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" {...register('confirmPassword')} placeholder="********" />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
        </div>
    );
}


function FaceDataForm({ setValue, watch }: any) {
    const { toast } = useToast();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const photo = watch('photo');
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    useEffect(() => {
        if (photo instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(photo);
        } else if (typeof photo === 'string' && photo.startsWith('data:image')) {
            setPhotoPreview(photo);
        } else {
            setPhotoPreview(null);
        }
    }, [photo]);


    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            setHasCameraPermission(true);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
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

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
            setHasCameraPermission(false);
            if(videoRef.current) {
                videoRef.current.srcObject = null;
            }
        }
    };
    
    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, []);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            const dataUrl = canvas.toDataURL('image/png');
            setValue('photo', dataUrl, { shouldValidate: true });
            stopCamera();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue('photo', file, { shouldValidate: true });
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label>Face Data Capture</Label>
                <div className="flex gap-4">
                     <Button type="button" onClick={startCamera} disabled={hasCameraPermission}>
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                    </Button>
                    <Label htmlFor="upload-photo" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                    </Label>
                    <Input id="upload-photo" type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
            </div>

            <div className="w-full aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
                {photoPreview && !hasCameraPermission && (
                     <Image src={photoPreview} alt="Photo preview" width={300} height={200} className="object-cover" />
                )}
                <video ref={videoRef} className={`w-full h-full object-cover ${!hasCameraPermission ? 'hidden' : ''}`} autoPlay muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                {!photoPreview && !hasCameraPermission && <p className="text-muted-foreground">Camera or upload preview</p>}
            </div>

            {hasCameraPermission && (
                <div className="flex gap-4">
                    <Button type="button" onClick={capturePhoto}>Capture</Button>
                    <Button type="button" variant="outline" onClick={stopCamera}>Stop Camera</Button>
                </div>
            )}
        </div>
    );
}

const stepSchemas = [personalInfoSchema, contactInfoSchema, authSchema, faceDataSchema];

function RegistrationForm() {
    const methods = useForm<FormData>({
        resolver: async (data, context, options) => {
            const currentStepSchema = stepSchemas[currentStepIndex];
            return zodResolver(currentStepSchema)(data, context, options);
        },
        mode: "onChange"
    });

    const { toast } = useToast();

    const onSubmit = (data: FormData) => {
        console.log(data);
        toast({
            title: 'Registration Submitted!',
            description: 'Student data has been successfully saved.',
        });
    };
    
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
        <PersonalInfoForm key="personal" register={methods.register} errors={methods.formState.errors} />,
        <ContactInfoForm key="contact" register={methods.register} errors={methods.formState.errors} />,
        <AuthForm key="auth" register={methods.register} errors={methods.formState.errors} />,
        <FaceDataForm key="face" setValue={methods.setValue} watch={methods.watch} />,
    ]);

    const handleNext = async () => {
        const currentStepSchema = stepSchemas[currentStepIndex];
        const fieldsToValidate = Object.keys(currentStepSchema.shape) as (keyof FormData)[];
        const isValid = await methods.trigger(fieldsToValidate);
        if (isValid) {
            next();
        }
    };

    return (
        <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-yellow-400">Student Registration</CardTitle>
                <CardDescription className="text-gray-400">
                    Fill out the form to register a new student. 
                    Step {currentStepIndex + 1} of {steps.length}
                </CardDescription>
                <Progress value={((currentStepIndex + 1) / steps.length) * 100} className="mt-2" />
            </CardHeader>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <CardContent>
                        {step}
                    </CardContent>
                    <CardFooter className="flex justify-between mt-6">
                        <div>
                            {!isFirstStep && (
                                <Button type="button" variant="outline" onClick={back}>
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-4">
                            {isLastStep ? (
                                <Button type="submit">
                                    Submit Registration
                                </Button>
                            ) : (
                                <Button type="button" onClick={handleNext}>
                                    Next <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}
                            <Button type="reset" variant="destructive" onClick={() => methods.reset()}>Reset</Button>
                        </div>
                    </CardFooter>
                </form>
            </FormProvider>
        </Card>
    )
}

export default function StudentRegistrationPage() {
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <main className="flex-1 p-4 md:p-6 text-white">
            <div className="mx-auto max-w-4xl">
                {isClient ? <RegistrationForm /> : null}
            </div>
        </main>
    );
}
