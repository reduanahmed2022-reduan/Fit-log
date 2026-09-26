 "use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/app/context/PlanContext";
import { Plus, Bookmark } from "lucide-react";
import { Workout } from "@/app/type/workout";
import Image from "next/image";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { plan, addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data: Workout) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Workout Not Found</h2>
      </div>
    );
  }

  const isCapReached = plan.length >= 5;

  return (
    <div className="bg-neutral-950 min-h-screen text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Visual Column */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden h-[400px] lg:h-[550px]">
          <Image
            src={workout.image || "https://via.placeholder.com/600x600"} 
            alt={workout.name} 
            width={600}
            height={600}
            className="w-full h-full object-cover" 
          /> 
        </div> 
 
        {/* Info Column */} 
        <div className="flex flex-col justify-between"> 
          <div> 
            <div className="flex flex-wrap gap-2 mb-4"> 
              {workout.category?.map((cat, idx) => ( 
                <span 
                  key={idx} 
                  className="bg-neutral-800 text-[#ccff00] text-xs font-bold px-3 py-1 rounded-full uppercase" 
                > 
                  {cat} 
                </span> 
              ))} 
            </div> 
 
            <h1 className="text-4xl font-black uppercase mb-3">{workout.name}</h1> 
            <p className="text-neutral-400 mb-8 leading-relaxed">{workout.description}</p> 
 
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 mb-8 grid grid-cols-2 sm:grid-cols-3 gap-4"> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Equipment</span> 
                <span className="font-semibold text-sm">{workout.equipment}</span> 
              </div> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Difficulty</span> 
                <span className="font-semibold text-sm">{workout.difficulty || "Intermediate"}</span> 
              </div> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Sets</span> 
                <span className="font-semibold text-sm">{workout.sets || 4}</span> 
              </div> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Reps</span> 
                <span className="font-semibold text-sm">{workout.reps || "6-8"}</span> 
              </div> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Duration</span> 
                <span className="font-semibold text-sm">{workout.duration}</span> 
              </div> 
              <div> 
                <span className="text-xs text-neutral-500 uppercase block mb-1">Calories</span> 
                <span className="font-semibold text-sm">{workout.calories}</span> 
              </div> 
            </div> 
 
            <div className="mb-8"> 
              <h3 className="text-lg font-bold uppercase mb-4 text-white">INSTRUCTIONS</h3> 
              <ol className="space-y-3 text-neutral-300"> 
                {workout.instructions?.map((step, idx) => ( 
                  <li key={idx} className="flex gap-3 text-sm leading-relaxed"> 
                    <span className="font-bold text-[#ccff00]">{idx + 1}.</span> 
                    <span>{step}</span> 
                  </li> 
                ))} 
              </ol> 
            </div> 
          </div> 
 
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-800"> 
            <button 
              onClick={() => addToPlan(workout)} 
              disabled={isCapReached} 
              className={`flex-1 font-bold py-3.5 px-6 rounded flex items-center justify-center gap-2 transition-colors ${ 
                isCapReached 
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" 
                  : "bg-[#ccff00] text-black hover:bg-opacity-90" 
              }`} 
            > 
              <Plus className="w-5 h-5" /> 
              <span>{isCapReached ? "Cap Reached (5/5)" : "Add to today's plan"}</span> 
            </button> 
            <button 
              onClick={() => saveForLater(workout)} 
              className="flex-1 bg-neutral-900 border border-neutral-700 text-white font-bold py-3.5 px-6 rounded flex items-center justify-center gap-2 hover:border-white transition-colors" 
            > 
              <Bookmark className="w-5 h-5" /> 
              <span>Save for later</span> 
            </button> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}   