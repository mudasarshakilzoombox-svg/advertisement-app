import { NextRequest, NextResponse } from "next/server";
import { getAdsBatch, hasMoreBatches, MAXIMUM_ADS_TO_DISPLAY } from "@/lib/ads.service";
import { ADS_PER_BATCH } from "@/config/ads.config";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const adsPerBatch = parseInt(searchParams.get("limit") || String(ADS_PER_BATCH));

  try {
    const ads = await getAdsBatch(pageNumber, adsPerBatch);
    const hasMore = await hasMoreBatches(pageNumber, adsPerBatch);
    const totalLoadedSoFar = pageNumber * adsPerBatch;
    
    return NextResponse.json({
      ads,
      hasMore: hasMore && totalLoadedSoFar < MAXIMUM_ADS_TO_DISPLAY,
      nextPage: pageNumber + 1,
      totalAds: MAXIMUM_ADS_TO_DISPLAY
    });
    
  } catch (error) {
    console.error("Error in ads API:", error);
    return NextResponse.json(
      { error: "Failed to fetch ads" },
      { status: 500 }
    );
  }
}