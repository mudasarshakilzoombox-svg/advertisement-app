"use client";

import { useState } from "react";
import { Ad } from "@/types/ad";
import AdCard from "./AdCard.server";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export default function AdsContainer({
  initialAds,
}: {
  initialAds: Ad[];
}) {
  const [ads, setAds] = useState(initialAds);

  const loadMore = async () => {
    const res = await fetch("/api/ads");
    const newAds = await res.json();
    setAds((prev) => [...prev, ...newAds]);
  };

  const triggerRef = useInfiniteScroll(loadMore);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {ads.map((ad, index) => (
          <AdCard key={`${ad.id}-${index}`} ad={ad} />
        ))}
      </div>

      <div ref={triggerRef} className="h-20" />
    </>
  );
}