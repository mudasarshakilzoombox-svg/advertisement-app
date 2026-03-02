import adsData from "@/public/ads.json";
import type { Ad } from "@/src/types/ad";

export function getAllAds(): Ad[] {
  return adsData as Ad[];
}