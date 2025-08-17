
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-6">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
            <CheckCircle className="h-10 w-10 text-green-400" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Registration Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            The new student has been successfully registered. Their account is now pending authorization from an administrator.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/dashboard/view-authorize-students">Authorize Students</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent hover:bg-white/20 hover:text-white">
              <Link href="/dashboard/student-registration">Register Another</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
