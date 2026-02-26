'use server';

import { 
  getRandomAdsBatch, 
  hasMoreBatches, 
  MAXIMUM_ADS_TO_DISPLAY 
} from "@/lib/ads.service";

import type { 
  FetchMoreAdsParams, 
  FetchMoreAdsResponse 
} from "@/types/fetchMoreAds";

export async function fetchMoreAds(
  batchNumber: FetchMoreAdsParams["batchNumber"],
  adsPerBatch: FetchMoreAdsParams["adsPerBatch"]
): Promise<FetchMoreAdsResponse> {
  try {
    console.log(`Server Action: Fetching batch ${batchNumber}`);
    
    const nextBatchAds = await getRandomAdsBatch(batchNumber, adsPerBatch);
    const moreAvailable = await hasMoreBatches(batchNumber, adsPerBatch);
    const totalLoadedSoFar = batchNumber * adsPerBatch;
    
    const hasMore =
      moreAvailable &&
      nextBatchAds.length > 0 &&
      totalLoadedSoFar < MAXIMUM_ADS_TO_DISPLAY;
    
    return {
      ads: nextBatchAds,
      nextBatchNumber: batchNumber + 1,
      hasMore,
    };
  } catch (error) {
    console.error("Error in fetchMoreAds server action:", error);
    
    return {
      ads: [],
      nextBatchNumber: batchNumber,
      hasMore: false,
    };
  }
}