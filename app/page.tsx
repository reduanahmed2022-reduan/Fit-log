
"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, ChevronDown, Search } from "lucide-react";
import { Workout } from "../app/type/workout";

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) throw new Error("Failed to fetch workouts");
        const data: Workout[] = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Error loading workouts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Filter and Sort combined with useMemo for better performance
  const sortedWorkouts = useMemo(() => {
    const q = query.toLowerCase().trim();

    const filtered = workouts.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(q);
      const tagMatch = item.category?.some((c) => c.toLowerCase().includes(q));
      return nameMatch || tagMatch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "duration") {
        return (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0);
      }
      if (sortBy === "calories") {
        return (parseInt(a.calories) || 0) - (parseInt(b.calories) || 0);
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });
  }, [workouts, query, sortBy]);

  return (
    <main className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      <section id="library" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
              The Library
            </h2>
            <p className="text-neutral-400 mt-2 text-sm sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-64 lg:w-72">
              <input
                type="text"
                placeholder="Search workout or tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-bordered input-sm w-full h-10 bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 pr-9 focus:border-[#ccff00] focus:outline-none"
              />
              <Search className="w-4 h-4 absolute right-3 top-3 text-neutral-500 pointer-events-none" />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto">
              <span className="text-sm text-neutral-400 whitespace-nowrap">Sort By:</span>
              <div className="relative w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                  className="select select-sm h-10 w-full sm:w-32 bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00] focus:outline-none appearance-none"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20 sm:py-24">
            <span className="loading loading-spinner text-[#ccff00] loading-lg" />
          </div>
        ) : sortedWorkouts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-sm sm:text-base">No workouts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {sortedWorkouts.map((item) => (
              <Link
                key={item.id}
                href={`/workout/${item.id}`}
                className="group bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-neutral-600 hover:-translate-y-1 hover:shadow-xl"
              >
                <div>
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-800">
                    <Image
                      src={item.image || "https://via.placeholder.com/400x300"}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                      {item.category?.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ccff00] text-black text-[9px] sm:text-[10px] font-extrabold uppercase px-2 sm:px-2.5 py-1 rounded-sm tracking-wider"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold uppercase text-white mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm line-clamp-1">
                      <span className="text-neutral-500">{item.equipment}</span>
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-neutral-800 grid grid-cols-3 gap-2 text-[10px] sm:text-xs text-neutral-400">
                  <span className="flex items-center justify-center sm:justify-start gap-1">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ccff00]" />
                    <span>{item.duration}</span>
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                    <span>{item.calories}</span>
                  </span>
                  <span className="flex items-center justify-center sm:justify-end gap-1">
                    <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
                    <span>{item.rating}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}