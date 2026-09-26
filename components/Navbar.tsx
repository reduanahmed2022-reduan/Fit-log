

//  "use client"; 
 
// import Link from "next/link"; 
// import { usePathname } from "next/navigation"; 
// import { usePlan } from "../app/context/PlanContext" 
// import { Dumbbell } from "lucide-react"; 
 
// export default function Navbar() { 
//   const pathname = usePathname(); 
//   const { plan, saved } = usePlan(); 
 
//   return ( 
//     <header className="navbar bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 px-4 lg:px-12"> 
//       <div className="navbar-start"> 
//         <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider"> 
//           <Dumbbell className="text-[#ccff00] w-7 h-7" /> 
//           <span>FITLOG</span> 
//         </Link> 
//       </div> 
 
//       <div className="navbar-center flex gap-8 font-medium"> 
//         <Link 
//           href="/" 
//           className={ 
//             pathname === "/" 
//               ? "text-[#ccff00] font-semibold border-b-2 border-[#ccff00] pb-1" 
//               : "text-neutral-400 hover:text-white transition-colors" 
//           } 
//         > 
//           Workout 
//         </Link> 
//         <Link 
//           href="/my-plan" 
//           className={ 
//             pathname === "/my-plan" 
//               ? "text-[#ccff00] font-semibold border-b-2 border-[#ccff00] pb-1" 
//               : "text-neutral-400 hover:text-white transition-colors" 
//           } 
//         > 
//           My Plan 
//         </Link> 
//       </div> 
 
//       <div className="navbar-end flex items-center gap-3"> 
//         <Link 
//           href="/my-plan" 
//           className="bg-[#ccff00] text-black font-bold px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-opacity-90 transition-opacity" 
//         > 
//           <span>Plan</span> 
//           <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded-full text-xs font-extrabold"> 
//             {plan.length} 
//           </span> 
//         </Link> 
//         <Link 
//           href="/my-plan" 
//           className="border border-neutral-700 text-white font-medium px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2 hover:border-neutral-500 transition-colors" 
//         > 
//           <span>Saved</span> 
//           <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full text-xs font-semibold"> 
//             {saved.length} 
//           </span> 
//         </Link> 
//       </div> 
//     </header> 
//   ); 
// } 



"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
 import { usePlan } from "../app/context/PlanContext";
import { Dumbbell, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const getLinkStyle = (path: string) =>
    pathname === path
      ? "text-[#ccff00] font-semibold border-b-2 border-[#ccff00] pb-1"
      : "text-neutral-400 hover:text-white transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 px-4 md:px-8 lg:px-12">
      <div className="flex items-center justify-between h-16">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold tracking-wider text-white"
        >
          <Dumbbell className="text-[#ccff00] w-7 h-7" />
          <span>FITLOG</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className={getLinkStyle("/")}>
            Workout
          </Link>
          <Link href="/my-plan" className={getLinkStyle("/my-plan")}>
            My Plan
          </Link>
        </nav>

        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/my-plan"
            className="bg-[#ccff00] text-black font-bold px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded-full text-xs font-extrabold">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="border border-neutral-700 text-white font-medium px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2 hover:border-neutral-500 transition-colors"
          >
            <span>Saved</span>
            <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full text-xs font-semibold">
              {saved.length}
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden text-neutral-300 hover:text-white focus:outline-none p-1"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-800 py-4 space-y-4">
          <nav className="flex flex-col space-y-3 px-2">
            <Link
              href="/"
              onClick={closeMenu}
              className={`text-base font-medium ${
                pathname === "/" ? "text-[#ccff00]" : "text-neutral-300"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className={`text-base font-medium ${
                pathname === "/my-plan" ? "text-[#ccff00]" : "text-neutral-300"
              }`}
            >
              My Plan
            </Link>
          </nav>

          <div className="flex items-center gap-3 pt-2 px-2 border-t border-neutral-800/60">
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="bg-[#ccff00] text-black font-bold px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              <span>Plan</span>
              <span className="bg-black text-[#ccff00] px-2 py-0.5 rounded-full text-xs font-extrabold">
                {plan.length}
              </span>
            </Link>
            <Link
              href="/my-plan"
              onClick={closeMenu}
              className="border border-neutral-700 text-white font-medium px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2"
            >
              <span>Saved</span>
              <span className="bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full text-xs font-semibold">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}