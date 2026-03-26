"use client";

import { useEffect, useState } from "react";
import { getTimeState, type TimeState } from "./timeState";

/**
 * SSR and first paint use a stable default; client updates after mount to avoid hydration mismatch.
 */
export function useTimeState(): TimeState {
  const [state, setState] = useState<TimeState>("breakfast");

  useEffect(() => {
    setState((prev) => {
      const next = getTimeState();
      return prev === next ? prev : next;
    });
    const interval = setInterval(() => {
      setState((prev) => {
        const next = getTimeState();
        return prev === next ? prev : next;
      });
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
