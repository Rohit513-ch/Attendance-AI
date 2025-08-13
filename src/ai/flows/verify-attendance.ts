'use server';
/**
 * @fileOverview Verifies student attendance using facial recognition and provides reasoning.
 *
 * - verifyAttendance - A function that handles the attendance verification process.
 * - VerifyAttendanceInput - The input type for the verifyAttendance function.
 * - VerifyAttendanceOutput - The return type for the verifyAttendance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyAttendanceInputSchema = z.object({
  studentPhotoDataUri: z
    .string()
    .describe(
      "A photo of the student's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  referencePhotoDataUri: z
    .string()
    .describe(
      'A reference photo of the student for facial recognition, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the typo here
    ),
  studentName: z.string().describe('The name of the student.'),
});
export type VerifyAttendanceInput = z.infer<typeof VerifyAttendanceInputSchema>;

const VerifyAttendanceOutputSchema = z.object({
  isAttendanceVerified: z
    .boolean()
    .describe('Whether or not the student attendance is verified.'),
  verificationReasoning: z
    .string()
    .describe('The reasoning for the attendance verification result.'),
});
export type VerifyAttendanceOutput = z.infer<typeof VerifyAttendanceOutputSchema>;

export async function verifyAttendance(
  input: VerifyAttendanceInput
): Promise<VerifyAttendanceOutput> {
  return verifyAttendanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyAttendancePrompt',
  input: {schema: VerifyAttendanceInputSchema},
  output: {schema: VerifyAttendanceOutputSchema},
  prompt: `You are an AI attendance verification system.

You are provided with two photos: one taken at the time of attendance, and a reference photo of the student.

Determine if the student in the attendance photo is the same person as in the reference photo. Provide reasoning for your determination.

Student Name: {{{studentName}}}
Attendance Photo: {{media url=studentPhotoDataUri}}
Reference Photo: {{media url=referencePhotoDataUri}}`,
});

const verifyAttendanceFlow = ai.defineFlow(
  {
    name: 'verifyAttendanceFlow',
    inputSchema: VerifyAttendanceInputSchema,
    outputSchema: VerifyAttendanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
