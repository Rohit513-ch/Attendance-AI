
'use server';

import { z } from 'zod';
import { verifyAttendance, type VerifyAttendanceOutput } from '@/ai/flows/verify-attendance';

export interface FormState {
    status: 'idle' | 'success' | 'error';
    message: string;
    result: VerifyAttendanceOutput | null;
}

const fileToDataUri = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const formSchema = z.object({
    studentName: z.string().min(1, 'Student name is required.'),
    studentPhoto: z.instanceof(File).refine(file => file.size > 0, "Student photo is required.")
        .refine(file => file.size <= MAX_FILE_SIZE, `Student photo must be less than 5MB.`)
        .refine(file => ALLOWED_FILE_TYPES.includes(file.type), 'Only .jpg, .png, and .webp formats are supported.'),
    referencePhoto: z.instanceof(File).refine(file => file.size > 0, "Reference photo is required.")
        .refine(file => file.size <= MAX_FILE_SIZE, `Reference photo must be less than 5MB.`)
        .refine(file => ALLOWED_FILE_TYPES.includes(file.type), 'Only .jpg, .png, and .webp formats are supported.'),
});


export async function verifyAttendanceAction(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    try {
        const validatedFields = formSchema.safeParse({
            studentName: formData.get('studentName'),
            studentPhoto: formData.get('studentPhoto'),
            referencePhoto: formData.get('referencePhoto'),
        });
        
        if (!validatedFields.success) {
            return {
                status: 'error',
                message: validatedFields.error.errors.map(e => e.message).join(', '),
                result: null,
            };
        }
        
        const { studentName, studentPhoto, referencePhoto } = validatedFields.data;

        const [studentPhotoDataUri, referencePhotoDataUri] = await Promise.all([
            fileToDataUri(studentPhoto),
            fileToDataUri(referencePhoto)
        ]);
        
        const result = await verifyAttendance({
            studentName,
            studentPhotoDataUri,
            referencePhotoDataUri,
        });

        return {
            status: 'success',
            message: 'Verification successful.',
            result: result,
        };
    } catch (error) {
        console.error('Verification failed:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return {
            status: 'error',
            message: `Verification process failed: ${errorMessage}`,
            result: null,
        };
    }
}
