import adsData from "@/public/ads.json";
import type { Ad } from "@/types/ad";

const ads: Ad[] = adsData as Ad[];

export function getRandomAds(limit: number): Ad[] {
  const shuffled: Ad[] = [...ads].sort(
    () => 0.5 - Math.random()
  );

  const result: Ad[] = [];

  while (result.length < limit) {
    result.push(...shuffled);
  }

  return result.slice(0, limit);
}