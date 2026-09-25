

 "use client"; 
 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { usePlan } from "../app/context/PlanContext" 
import { Dumbbell } from "lucide-react"; 
 
export default function Navbar() { 
  const pathname = usePathname(); 
  const { plan, saved } = usePlan(); 
 
  return ( 
    <header className="navbar bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 px-4 lg:px-12"> 
      <div className="navbar-start"> 
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wider"> 
          <Dumbbell className="text-[#ccff00] w-7 h-7" /> 
          <span>FITLOG</span> 
        </Link> 
      </div> 
 
      <div className="navbar-center flex gap-8 font-medium"> 
        <Link 
          href="/" 
          className={ 
            pathname === "/" 
              ? "text-[#ccff00] font-semibold border-b-2 border-[#ccff00] pb-1" 
              : "text-neutral-400 hover:text-white transition-colors" 
          } 
        > 
          Workout 
        </Link> 
        <Link 
          href="/my-plan" 
          className={ 
            pathname === "/my-plan" 
              ? "text-[#ccff00] font-semibold border-b-2 border-[#ccff00] pb-1" 
              : "text-neutral-400 hover:text-white transition-colors" 
          } 
        > 
          My Plan 
        </Link> 
      </div> 
 
      <div className="navbar-end flex items-center gap-3"> 
        <Link 
          href="/my-plan" 
          className="bg-[#ccff00] text-black font-bold px-3.5 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-opacity-90 transition-opacity" 
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
    </header> 
  ); 
} 