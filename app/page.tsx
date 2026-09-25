// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import Link from "next/link";
// import { ArrowDown, Clock, Flame, Star, ChevronDown, Search } from "lucide-react";
// import { Workout } from "../app/type/workout";
// import banner from "../public/assets/banner.png";
// import Image from "next/image";


// export default function HomePage() {
//   const [workouts, setWorkouts] = useState<Workout[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [sortBy, setSortBy] = useState<string>("duration");
//   const [query, setQuery] = useState<string>("");

//   useEffect(() => {
//     fetch("https://api.abcz.workers.dev/api/fitlog")
//       .then((res) => res.json())
//       .then((data: Workout[]) => {
//         setWorkouts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const filtered = workouts.filter((item) => {
//     const q = query.toLowerCase();
//     const nameMatch = item.name.toLowerCase().includes(q);
//     const tagMatch = item.category?.some((c) => c.toLowerCase().includes(q));
//     return nameMatch || tagMatch;
//   });

//   const sorted = [...filtered].sort((a, b) => {
//     if (sortBy === "duration") return (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0);
//     if (sortBy === "calories") return (parseInt(a.calories) || 0) - (parseInt(b.calories) || 0);
//     if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
//     return 0;
//   });

//   return (
//     <div className="bg-neutral-950 text-white min-h-screen">
//       {/* Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//         <div>
//           <span className="text-[#ccff00] text-sm font-bold uppercase tracking-widest">
//             WORKOUT LIBRARY
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight my-4">
//             TRAIN WITH INTENT. LOG EVERY SET.
//           </h1>
//           <p className="text-neutral-400 text-lg mb-8 max-w-xl leading-relaxed">
//             FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos plan, and watch the week&aps work add up.
//           </p>
//           <a
//             href="#library"
//             className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold px-6 py-3.5 rounded hover:bg-opacity-90 transition-colors"
//           >
//             <span>BROWSE WORKOUTS</span>
//             <ArrowDown className="w-5 h-5" />
//           </a>
//         </div>
//         <div className="flex justify-center">
//           <Image
//             src={banner}
//             alt="/"
//             width={350} height={260}
//             className="rounded-lg max-h-[420px] object-cover"
//           />
//         </div>
//       </section>

//       {/* Library Section */}
//       <section id="library" className="max-w-7xl mx-auto px-4 py-16 border-t border-neutral-900">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
//           <div>
//             <h2 className="text-3xl font-black uppercase">THE LIBRARY</h2>
//             <p className="text-neutral-400 mt-1">Twelve lifts covering every major muscle group.</p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search workout or tag..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="input input-bordered input-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00]"
//               />
//               <Search className="w-4 h-4 absolute right-2.5 top-2.5 text-neutral-500" />
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-neutral-400">Sort By:</span>
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
//                   className="select select-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00]"
//                 >
//                   <option value="duration">Duration</option>
//                   <option value="calories">Calories</option>
//                   <option value="rating">Rating</option>
//                 </select>
//                 <ChevronDown className="w-4 h-4 absolute right-2 top-2.5 pointer-events-none text-neutral-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-24">
//             <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sorted.map((item) => (
//               <Link
//                 key={item.id}
//                 href={`/workout/${item.id}`}
//                 className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between group"
//               >
//                 <div>
//                   <div className="h-48 overflow-hidden bg-neutral-800">
//                     <Image
//                       src={item.image || "https://via.placeholder.com/400x300"}
//                       alt={item.name}
//                       width={400}
//                       height={300}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     />
//                   </div>
//                   <div className="p-5">
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {item.category?.map((cat, idx) => (
//                         <span
//                           key={idx}
//                           className="badge badge-neutral text-xs px-2.5 py-1 font-semibold uppercase tracking-wider"
//                         >
//                           {cat}
//                         </span>
//                       ))}
//                     </div>
//                     <h3 className="text-xl font-bold uppercase text-white mb-2">{item.name}</h3>
//                     <p className="text-neutral-400 text-sm">
//                       <span className="text-neutral-500">Equipment:</span> {item.equipment}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="px-5 pb-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-4 h-4 text-[#ccff00]" /> {item.duration}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Flame className="w-4 h-4 text-orange-500" /> {item.calories}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {item.rating}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Clock, Flame, Star, ChevronDown, Search } from "lucide-react";
// import { Workout } from "../app/type/workout";
// import banner from "../public/assets/banner.png";
// import Banner from "@/components/Banner"; // সঠিক পাথ দিন

// export default function HomePage() {
//   const [workouts, setWorkouts] = useState<Workout[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [sortBy, setSortBy] = useState<string>("duration");
//   const [query, setQuery] = useState<string>("");

//   useEffect(() => {
//     fetch("https://api.abcz.workers.dev/api/fitlog")
//       .then((res) => res.json())
//       .then((data: Workout[]) => {
//         setWorkouts(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   const filtered = workouts.filter((item) => {
//     const q = query.toLowerCase();
//     const nameMatch = item.name.toLowerCase().includes(q);
//     const tagMatch = item.category?.some((c) => c.toLowerCase().includes(q));
//     return nameMatch || tagMatch;
//   });

//   const sorted = [...filtered].sort((a, b) => {
//     if (sortBy === "duration") return (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0);
//     if (sortBy === "calories") return (parseInt(a.calories) || 0) - (parseInt(b.calories) || 0);
//     if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
//     return 0;
//   });

//   return (
//     <div className="bg-neutral-950 text-white min-h-screen">
//       {/* Separate Responsive Banner Section */}
//       <Banner bannerImage={banner} />

//       {/* Library Section */}
//       <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-neutral-900">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-black uppercase">THE LIBRARY</h2>
//             <p className="text-neutral-400 mt-1 text-sm sm:text-base">
//               Twelve lifts covering every major muscle group.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
//             <div className="relative w-full sm:w-auto">
//               <input
//                 type="text"
//                 placeholder="Search workout or tag..."
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="input input-bordered input-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00] w-full"
//               />
//               <Search className="w-4 h-4 absolute right-2.5 top-2.5 text-neutral-500" />
//             </div>

//             <div className="flex items-center justify-between sm:justify-start gap-2">
//               <span className="text-sm text-neutral-400">Sort By:</span>
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
//                   className="select select-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00]"
//                 >
//                   <option value="duration">Duration</option>
//                   <option value="calories">Calories</option>
//                   <option value="rating">Rating</option>
//                 </select>
//                 <ChevronDown className="w-4 h-4 absolute right-2 top-2.5 pointer-events-none text-neutral-400" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center py-24">
//             <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {sorted.map((item) => (
//               <Link
//                 key={item.id}
//                 href={`/workout/${item.id}`}
//                 className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between group"
//               >
//                 <div>
//                   <div className="h-48 overflow-hidden bg-neutral-800">
//                     {/* <img
//                       src={item.image || "https://via.placeholder.com/400x300"}
//                       alt={item.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     /> */}

//                     <Image
//                       src={item.image || "https://via.placeholder.com/400x300"}
//                       alt={item.name}
//                       width={200}
//                        height={250}
//                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                      />
//                   </div>
//                   <div className="p-5">
//                     <div className="flex flex-wrap gap-2 mb-3">
//                       {item.category?.map((cat, idx) => (
//                         <span
//                           key={idx}
//                           className="badge badge-neutral text-xs px-2.5 py-1 font-semibold uppercase tracking-wider"
//                         >
//                           {cat}
//                         </span>
//                       ))}
//                     </div>
//                     <h3 className="text-xl font-bold uppercase text-white mb-2">{item.name}</h3>
//                     <p className="text-neutral-400 text-sm">
//                       <span className="text-neutral-500">Equipment:</span> {item.equipment}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="px-5 pb-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
//                   <span className="flex items-center gap-1">
//                     <Clock className="w-4 h-4 text-[#ccff00]" /> {item.duration}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Flame className="w-4 h-4 text-orange-500" /> {item.calories}
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {item.rating}
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }


"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, ChevronDown, Search } from "lucide-react";
import { Workout } from "../app/type/workout";
import banner from "../public/assets/banner.png";
import Banner from "@/components/Banner"; // সঠিক পাথ দিন

export default function HomePage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("duration");
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data: Workout[]) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = workouts.filter((item) => {
    const q = query.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q);
    const tagMatch = item.category?.some((c) => c.toLowerCase().includes(q));
    return nameMatch || tagMatch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "duration") return (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0);
    if (sortBy === "calories") return (parseInt(a.calories) || 0) - (parseInt(b.calories) || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      {/* Separate Responsive Banner Section */}
      <Banner bannerImage={banner} />

      {/* Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 border-t border-neutral-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase">THE LIBRARY</h2>
            <p className="text-neutral-400 mt-1 text-sm sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search workout or tag..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input input-bordered input-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00] w-full"
              />
              <Search className="w-4 h-4 absolute right-2.5 top-2.5 text-neutral-500" />
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-sm text-neutral-400">Sort By:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                  className="select select-sm bg-neutral-900 border-neutral-800 text-white pr-8 focus:border-[#ccff00]"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-2.5 pointer-events-none text-neutral-400" />
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <span className="loading loading-spinner text-[#ccff00] loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((item) => (
              <Link
                key={item.id}
                href={`/workout/${item.id}`}
                className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Section */}
                  <div className="h-48 overflow-hidden bg-neutral-800">
                    <Image
                      src={item.image || "https://via.placeholder.com/400x300"}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Section */}
                    <div className="p-5">
                    {/* Yellow Category Buttons / Tags */}
                     <div className="flex flex-wrap gap-2 mb-3">
                      {item.category?.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-[#ccff00] text-black text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm tracking-wider"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                    
  
                    <h3 className="text-xl font-bold uppercase text-white mb-1">{item.name}</h3>
                    <p className="text-neutral-400 text-sm">
                      <span className="text-neutral-500">{item.equipment}</span>
                    </p>
                  </div> 

                </div>

                <div className="px-5 pb-5 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#ccff00]" /> {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" /> {item.calories}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {item.rating}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
