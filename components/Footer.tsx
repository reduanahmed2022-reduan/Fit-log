import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 py-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
          <Dumbbell className="text-[#ccff00] w-5 h-5" />
          <span>FITLOG</span>
        </div>
        <p className="text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};