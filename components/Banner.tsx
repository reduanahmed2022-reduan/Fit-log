"use client"; 
 
import Image, { StaticImageData } from "next/image"; 
import { ArrowDown } from "lucide-react"; 
 
interface BannerSectionProps { 
  bannerImage: StaticImageData | string; 
} 
 
export default function BannerSection({ bannerImage }: BannerSectionProps) { 
  return ( 
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"> 
      {/* Text Content */} 
      <div className="text-center lg:text-left flex flex-col items-center lg:items-start"> 
        <span className="text-[#ccff00] text-xs sm:text-sm font-bold uppercase tracking-widest"> 
          WORKOUT LIBRARY 
        </span> 
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight my-3 sm:my-4 leading-tight"> 
          TRAIN WITH INTENT. LOG EVERY SET. 
        </h1> 
        <p className="text-neutral-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-xl leading-relaxed"> 
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up. 
        </p> 
        <a 
          href="#library" 
          className="inline-flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded hover:bg-opacity-90 transition-all active:scale-95 text-sm sm:text-base w-full sm:w-auto" 
        > 
          <span>BROWSE WORKOUTS</span> 
          <ArrowDown className="w-5 h-5" /> 
        </a> 
      </div> 
 
      {/* Banner Image Container */} 
      <div className="flex justify-center items-center w-full mt-4 lg:mt-0"> 
        <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[450px]"> 
          <Image 
            src={bannerImage} 
            alt="FitLog Hero Banner" 
            width={450} 
            height={320} 
            priority 
            className="rounded-lg object-cover w-full h-auto" 
          /> 
        </div> 
      </div> 
    </section> 
  ); 
};