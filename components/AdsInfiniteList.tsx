"use client";

import { useState, useCallback } from "react";
import type { Ad } from "@/types/ad";
import AdsContainer from "./AdsContainer";
import { useIntersection } from "@/hooks/useIntersection";

type Props = {
  initialAds: Ad[];
};

export default function AdsInfiniteList({ initialAds }: Props) {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch("/api/ads", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch ads");
      }

      const newAds: Ad[] = await res.json();

      setAds((prev) => [...prev, ...newAds]);
    } catch (error) {
      console.error("Infinite scroll error:", error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  const triggerRef = useIntersection(loadMore);

  return (
    <>
      <AdsContainer ads={ads} />

      {/* Intersection trigger */}
      <div ref={triggerRef} className="h-20" />

      {loading && (
        <p className="text-center mt-6 text-gray-500">
          Loading more ads...
        </p>
      )}
    </>
  );
}