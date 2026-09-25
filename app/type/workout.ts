export interface Workout {
  id: string;
  name: string;
  description?: string;
  category: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: string;
  calories: string;
  rating: number;
  image: string;
  instructions?: string[];
  done?: boolean;
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