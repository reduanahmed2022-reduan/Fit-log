          "use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/app/context/PlanContext";
import { Check, X, Eye, Clock, Flame, Star, Dumbbell } from "lucide-react";
import { Workout } from "@/app/type/workout";
import Image from "next/image";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const { plan, saved, markAsDone, removeFromPlan, removeFromSaved } = usePlan();

  const currentList: Workout[] = activeTab === "plan" ? plan : saved;

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, item) => acc + (parseInt(item.duration) || 0), 0);
  const totalCalories = plan.reduce((acc, item) => acc + (parseInt(item.caloriesBurned) || 0), 0);

  return (
    <div className="bg-neutral-950 min-h-screen text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase">MY PLAN</h1>
          <p className="text-neutral-400 mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
            <span className="text-neutral-500 text-xs font-bold uppercase block mb-1">
              Exercises
            </span>
            <span className="text-3xl font-black text-white">{totalExercises} / 5</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
            <span className="text-neutral-500 text-xs font-bold uppercase block mb-1">
              Minutes
            </span>
            <span className="text-3xl font-black text-[#ccff00]">{totalMinutes} min</span>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
            <span className="text-neutral-500 text-xs font-bold uppercase block mb-1">
              Calories
            </span>
            <span className="text-3xl font-black text-orange-500">{totalCalories} kcal</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 mb-8">
          <button
            onClick={() => setActiveTab("plan")}
            className={`pb-4 px-6 font-bold text-lg transition-colors ${
              activeTab === "plan"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Today&s Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-4 px-6 font-bold text-lg transition-colors ${
              activeTab === "saved"
                ? "border-b-2 border-[#ccff00] text-[#ccff00]"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Empty State */}
        {currentList.length === 0 ? (
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-12 text-center my-8">
            <Dumbbell className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black uppercase mb-2">NOTHING HERE YET</h3>
            <p className="text-neutral-400 mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded hover:bg-opacity-90 transition-opacity"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((item) => (
              <div
                key={item.id}
                className={`bg-neutral-900 border ${
                  item.done ? "border-emerald-800 bg-neutral-900/60" : "border-neutral-800"
                } rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <Image
                    src={item.image || "https://via.placeholder.com/150"} 
                    alt={item.name} 
                    className="w-20 h-20 rounded object-cover bg-neutral-800" 
                  /> 
                  <div> 
                    <h3 
                      className={`font-bold text-lg uppercase ${ 
                        item.done ? "line-through text-neutral-500" : "text-white" 
                      }`} 
                    > 
                      {item.name} 
                    </h3> 
                    <p className="text-neutral-400 text-sm mb-2">{item.equipment}</p> 
                    <div className="flex items-center gap-4 text-xs text-neutral-400"> 
                      <span className="flex items-center gap-1"> 
                        <Clock className="w-3.5 h-3.5 text-[#ccff00]" /> {item.duration} 
                      </span> 
                      <span className="flex items-center gap-1"> 
                        <Flame className="w-3.5 h-3.5 text-orange-500" /> {item.caloriesBurned} 
                      </span> 
                      <span className="flex items-center gap-1"> 
                        <Star className="w-3.5 h-3.5 text-yellow-400" /> {item.rating} 
                      </span> 
                    </div> 
                  </div> 
                </div> 
 
                <div className="flex items-center gap-3 w-full md:w-auto justify-end"> 
                  <Link 
                    href={`/workout/${item.id}`} 
                    className="p-2.5 bg-neutral-800 text-neutral-300 rounded hover:text-white hover:bg-neutral-700" 
                    title="View Details" 
                  > 
                    <Eye className="w-5 h-5" /> 
                  </Link> 
 
                  {activeTab === "plan" && ( 
                    <button 
                      onClick={() => markAsDone(item.id)} 
                      className={`p-2.5 rounded ${ 
                        item.done 
                          ? "bg-emerald-600 text-white" 
                          : "bg-neutral-800 text-neutral-300 hover:text-emerald-400" 
                      }`} 
                      title="Mark as Done" 
                    > 
                      <Check className="w-5 h-5" /> 
                    </button> 
                  )} 
 
                  <button 
                    onClick={() => 
                      activeTab === "plan" 
                        ? removeFromPlan(item.id) 
                        : removeFromSaved(item.id) 
                    } 
                    className="p-2.5 bg-neutral-800 text-neutral-300 hover:text-red-400 rounded" 
                    title="Remove" 
                  > 
                    <X className="w-5 h-5" /> 
                  </button> 
                </div> 
              </div> 
            ))} 
          </div> 
        )} 
      </div> 
    </div> 
  ); 
}