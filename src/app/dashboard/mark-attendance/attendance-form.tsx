
'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AttendanceFormLogic } from './attendance-form-logic';


export function AttendanceForm() {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">AI Verification</CardTitle>
                <CardDescription>Upload two images to verify attendance.</CardDescription>
            </CardHeader>
            <AttendanceFormLogic />
        </Card>
    );
}
