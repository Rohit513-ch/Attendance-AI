
import { RegistrationLoader } from './registration-loader';

export default function StudentRegistrationPage() {
  return (
    <div className="flex min-h-screen items-start justify-center p-4 md:p-6">
      <main className="flex-1 items-center justify-center p-4 md:p-6">
          <RegistrationLoader />
      </main>
    </div>
  );
}
