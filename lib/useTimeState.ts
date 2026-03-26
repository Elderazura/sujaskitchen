"use client";

import { useEffect, useState } from "react";
import { getTimeState, type TimeState } from "./timeState";

/**
 * SSR and first paint use a stable default; client updates after mount to avoid hydration mismatch.
 */
export function useTimeState(): TimeState {
  const [state, setState] = useState<TimeState>("morning");

  useEffect(() => {
    setState(getTimeState());
    const interval = setInterval(() => setState(getTimeState()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
