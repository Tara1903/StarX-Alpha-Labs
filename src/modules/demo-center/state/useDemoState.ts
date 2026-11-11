"use client";

import { useState, useEffect, useCallback } from "react";

export function useDemoState<T extends Record<string, any>>(demoSlug: string, initialData: T) {
  const storageKey = `starx_demo_state_${demoSlug}`;

  const [state, setStateInternal] = useState<T>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (err) {
        console.warn(`[useDemoState] Failed reading state for ${demoSlug}`, err);
      }
    }
    return initialData;
  });

  const [hasReset, setHasReset] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(state));
      } catch (err) {
        console.warn(`[useDemoState] Failed persisting state for ${demoSlug}`, err);
      }
    }
  }, [state, storageKey, demoSlug]);

  const setState = useCallback((updater: T | ((prev: T) => T)) => {
    setStateInternal((prev) => {
      const next = typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
      return next;
    });
  }, []);

  const resetState = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(storageKey);
      } catch (err) {
        console.warn(`[useDemoState] Failed clearing session storage for ${demoSlug}`, err);
      }
    }
    setStateInternal(initialData);
    setHasReset(true);
    setTimeout(() => setHasReset(false), 2500);
  }, [storageKey, initialData, demoSlug]);

  return {
    state,
    setState,
    resetState,
    hasReset,
  };
}
