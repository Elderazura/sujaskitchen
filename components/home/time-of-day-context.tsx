"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { TIME_CONFIG, type TimeState } from "@/lib/timeState";
import { useTimeState } from "@/lib/useTimeState";

type TimeOfDayContextValue = {
  timeState: TimeState;
  isNight: boolean;
};

const TimeOfDayContext = createContext<TimeOfDayContextValue | null>(null);

export function TimeOfDayProvider({ children }: { children: ReactNode }) {
  const timeState = useTimeState();
  const value = useMemo(
    () => ({
      timeState,
      /** Dark hero and below-fold surfaces: dinner and after-hours closed. */
      isNight: timeState === "dinner" || timeState === "closed",
    }),
    [timeState],
  );

  return (
    <TimeOfDayContext.Provider value={value}>{children}</TimeOfDayContext.Provider>
  );
}

export function useTimeOfDay() {
  const ctx = useContext(TimeOfDayContext);
  if (!ctx) {
    throw new Error("useTimeOfDay must be used within TimeOfDayProvider");
  }
  return ctx;
}

export function useTimeConfig() {
  const { timeState } = useTimeOfDay();
  return TIME_CONFIG[timeState];
}
