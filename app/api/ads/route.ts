import { NextResponse } from "next/server";
import { getRandomAds } from "@/lib/ads.service";

export async function GET() {
  const ads = getRandomAds(9);
  return NextResponse.json(ads);
}