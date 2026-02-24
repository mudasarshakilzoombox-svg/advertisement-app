import { NextResponse } from "next/server";
import { getRandomAds } from "@/utils/ads";

export async function GET() {
  const ads = getRandomAds(8);
  return NextResponse.json(ads);
}