"use client";

import { useState, useEffect, useCallback } from "react";

export function useDemoState<T extends Record<string, any>>(demoSlug: string, initialData: T) {
  const storageKey = `starx_demo_state_${demoSlug}`;
  const sessionIdKey = `starx_demo_sid_${demoSlug}`;

  const getSessionKey = () => {
    if (typeof window === "undefined") return "default";
    let sid = sessionStorage.getItem(sessionIdKey);
    if (!sid) {
      sid = `s_${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(sessionIdKey, sid);
    }
    return sid;
  };

  const [state, setStateInternal] = useState<T>(initialData);

  const [hasReset, setHasReset] = useState(false);

  // Sync from sessionStorage or isolated DB sandbox after hydration
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored) {
        setStateInternal(JSON.parse(stored));
        return;
      }
    } catch (err) {
      console.warn(`[useDemoState] Failed reading state for ${demoSlug}`, err);
    }
    const sid = getSessionKey();
    fetch(`/api/demos/sandbox?slug=${encodeURIComponent(demoSlug)}&sessionKey=${encodeURIComponent(sid)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.source === "sandbox" && data?.state && Object.keys(data.state).length > 0) {
          setStateInternal(data.state as T);
        }
      })
      .catch(() => {});
  }, [demoSlug, storageKey]);

  const setState = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setStateInternal((prev) => {
        const next = typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater;
        if (typeof window !== "undefined") {
          try {
            sessionStorage.setItem(storageKey, JSON.stringify(next));
            const sid = getSessionKey();
            fetch("/api/demos/sandbox", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slug: demoSlug, sessionKey: sid, state: next }),
            }).catch(() => {});
          } catch {}
        }
        return next;
      });
    },
    [demoSlug, storageKey]
  );

  const resetState = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem(storageKey);
        const sid = getSessionKey();
        fetch(`/api/demos/sandbox?slug=${encodeURIComponent(demoSlug)}&sessionKey=${encodeURIComponent(sid)}`, {
          method: "DELETE",
        }).catch(() => {});
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
