"use client";

import { useEffect, useState } from "react";

/**
 * Cycles 0..length-1 on an interval. Resets when `resetKey` changes.
 */
export function useRotatingIndex(
  length: number,
  intervalMs: number,
  enabled: boolean,
  resetKey: string | number,
): number {
  const [i, setI] = useState(0);

  useEffect(() => {
    setI(0);
  }, [resetKey]);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs, enabled, resetKey]);

  return length === 0 ? 0 : i % length;
}
