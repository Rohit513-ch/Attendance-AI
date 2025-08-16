
import { RegistrationLoader } from './registration-loader';
import Image from 'next/image';

export default function StudentRegistrationPage() {
  return (
    <div className="relative min-h-screen">
       <Image
        src="https://images.pexels.com/photos/7640905/pexels-photo-7640905.jpeg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <main className="relative flex flex-1 items-center justify-center p-4 md:p-6">
          <RegistrationLoader />
      </main>
    </div>
  );
}
