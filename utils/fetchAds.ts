import { Ad } from "@/types/ad";

export async function fetchAds(page: number, limit: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/ads.json`);
  const allAds: Ad[] = await res.json();

  const start = (page - 1) * limit;
  const end = page * limit;
  const ads = allAds.slice(start, end);

  return ads;
}