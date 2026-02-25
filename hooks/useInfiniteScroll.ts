"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export function useInfiniteScroll<T>(
  fetchMore: (page: number) => Promise<T[]>,
  options: UseInfiniteScrollOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const {
    threshold = 0,
    rootMargin = "200px",
    enabled = true
  } = options;

  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore || !enabled) return;
    
    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);
      
      const newData = await fetchMore(page);
      
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newData]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [fetchMore, page, hasMore, enabled]);

  useEffect(() => {
    if (!enabled) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingRef.current && hasMore) {
          loadMore();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, threshold, rootMargin, enabled, hasMore]);

  return {
    data,
    loading,
    hasMore,
    error,
    observerRef,
    setData // Useful for resetting or initial data
  };
}