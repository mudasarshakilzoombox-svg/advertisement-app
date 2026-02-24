"use client";

import { useEffect, useRef } from "react";

type UseIntersectionOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
};

/**
 * Reusable Intersection Observer hook
 * Ideal for infinite scroll
 */
export function useIntersection(
  callback: () => void,
  options?: UseIntersectionOptions
) {
  const {
    root = null,
    rootMargin = "200px",
    threshold = 0,
    enabled = true,
  } = options || {};

  const targetRef = useRef<HTMLDivElement | null>(null);
  const callbackRef = useRef(callback);

  // Always keep latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          callbackRef.current();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, enabled]);

  return targetRef;
}