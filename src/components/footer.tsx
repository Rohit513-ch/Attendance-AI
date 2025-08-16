
import { Camera } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Camera className="h-6 w-6 text-yellow-400" />
          <p className="text-center text-sm leading-loose text-gray-400 md:text-left">
            Built by the AttendAI Team. &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
