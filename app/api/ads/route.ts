import { NextRequest, NextResponse } from "next/server";
import { getRandomAds } from "@/lib/ads.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const ADS_PER_PAGE = 15;
  const MAXIMUM_ADS = 190;

  try {
    const { adsForCurrentPage, totalAdsLoadedSoFar } = getRandomAds(ADS_PER_PAGE, pageNumber);
    
    const validAds = adsForCurrentPage.filter(ad => ad && ad.id);
    
    const hasMoreAds = totalAdsLoadedSoFar < MAXIMUM_ADS && validAds.length > 0;
    
    console.log(`API: Page ${pageNumber}, Loaded: ${totalAdsLoadedSoFar}/${MAXIMUM_ADS}, HasMore: ${hasMoreAds}`);
    
    return NextResponse.json({
      ads: validAds,
      hasMore: hasMoreAds
    });
    
  } catch (error) {
    console.error("Error in ads API:", error);
    return NextResponse.json(
      { 
        ads: [], 
        hasMore: false, 
        errorMessage: "Failed to fetch ads" 
      },
      { status: 500 }
    );
  }
}