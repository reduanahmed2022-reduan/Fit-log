"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import toast from "react-hot-toast";

import { Workout, PlanContextType } from "../type/workout";

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {

    const [plan, setPlan] = useState<Workout[]>([]);

    const [saved, setSaved] = useState<Workout[]>([]);

    useEffect(() => {

        const storedPlan = localStorage.getItem("fitlog_plan");

        const storedSaved = localStorage.getItem("fitlog_saved");

        if (storedPlan) setPlan(JSON.parse(storedPlan));

        if (storedSaved) setSaved(JSON.parse(storedSaved));
    }, []);

    const persist = (nextPlan: Workout[] | null, nextSaved: Workout[] | null) => {

        if (nextPlan) localStorage.setItem("fitlog_plan", JSON.stringify(nextPlan));
        if (nextSaved) localStorage.setItem("fitlog_saved", JSON.stringify(nextSaved));

    };

    const addToPlan = (item: Workout) => {

        if (plan.length >= 5) {

            toast.error("Cap reached! You can only add up to 5 lifts for today.");

            return;

        }

        if (plan.some((w) => w.id === item.id)) {

            toast.error("Workout already in today's plan!");

            return;
        }

        const updated = [...plan, { ...item, done: false }];

        setPlan(updated);

        persist(updated, null);

        toast.success("Added to today's plan!");

    };

    const saveForLater = (item: Workout) => {

        if (saved.some((w) => w.id === item.id)) {

            toast.error("Workout already saved!");

            return;

        }

        const updated = [...saved, item];

        setSaved(updated);

        persist(null, updated);

        toast.success("Saved for later!");

    };

    const markAsDone = (id: string) => {

        const updated = plan.map((item) =>

            item.id === id ? { ...item, done: !item.done } : item

        );

        setPlan(updated);

        persist(updated, null);

        toast.success("Workout status updated!");

    };

    const removeFromPlan = (id: string) => {

        const updated = plan.filter((item) => item.id !== id);

        setPlan(updated);

        persist(updated, null);

        toast.success("Removed from plan!");

    };

    const removeFromSaved = (id: string) => {

        const updated = saved.filter((item) => item.id !== id);

        setSaved(updated);

        persist(null, updated);

        toast.success("Removed from saved!");

    };

    return (

        <PlanContext.Provider

            value={{

                plan,

                saved,

                addToPlan,

                saveForLater,

                markAsDone,

                removeFromPlan,

                removeFromSaved,

            }}

        >

            {children}

        </PlanContext.Provider>

    );

}

export const usePlan = (): PlanContextType => {

    const context = useContext(PlanContext);

    if (!context) {

        throw new Error("usePlan must be used within a PlanProvider");

    }

    return context;

};