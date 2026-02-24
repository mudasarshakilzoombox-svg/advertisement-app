import type { Ad } from "@/types/ad";
import { getAllAds } from "./ads.repository";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function getRandomAds(limit: number): Ad[] {
  const ads = getAllAds();

  if (!ads.length) return [];

  const shuffled = shuffle(ads);

  const result: Ad[] = [];

  while (result.length < limit) {
    result.push(...shuffled);
  }

  return result.slice(0, limit);
}