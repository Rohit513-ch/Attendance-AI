
import { RegistrationLoader } from './registration-loader';

export default function StudentRegistrationPage() {
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="flex justify-center">
        <RegistrationLoader />
      </div>
    </main>
  );
}
