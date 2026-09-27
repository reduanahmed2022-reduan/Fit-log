export interface Workout {
  id: string;
  name: string;
  description?: string;
  muscleGroups: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: string;
  caloriesBurned: string;
  rating: number;
  image: string;
  instructions?: string[];
  done?: boolean;
  category?: string;
  calories?: number;
}

export interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
  markAsDone: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
}

interface ExerciseDetail {
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: string;
  calories: string;
  rating: number;
}