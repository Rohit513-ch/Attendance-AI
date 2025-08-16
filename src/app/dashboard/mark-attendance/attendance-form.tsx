
'use client';

import { Card, CardDescription, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

const AttendanceFormLogic = dynamic(() => import('./attendance-form-logic').then(mod => mod.AttendanceFormLogic), { 
    ssr: false,
    loading: () => (
        <>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="w-full aspect-video rounded-md" />
                    <Skeleton className="h-10 w-full mt-2" />
                </div>
                 <div className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </CardContent>
            <CardFooter>
                 <Skeleton className="h-10 w-full" />
            </CardFooter>
        </>
    )
});


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
