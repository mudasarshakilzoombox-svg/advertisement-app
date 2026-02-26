'use server';

import { getRandomAdsBatch, hasMoreBatches, MAXIMUM_ADS_TO_DISPLAY } from "@/lib/ads.service";
import { FetchMoreAdsResponse } from "@/types/api";

export async function fetchMoreAds(
  batchNumber: number, 
  adsPerBatch: number
): Promise<FetchMoreAdsResponse> {
  try {
    console.log(`Server Action: Fetching batch ${batchNumber}`);
    
    const nextBatchAds = await getRandomAdsBatch(batchNumber, adsPerBatch);
    const moreAvailable = await hasMoreBatches(batchNumber, adsPerBatch);
    const totalLoadedSoFar = batchNumber * adsPerBatch;
    
    const hasMore = moreAvailable && nextBatchAds.length > 0 && totalLoadedSoFar < MAXIMUM_ADS_TO_DISPLAY;
    
    return {
      ads: nextBatchAds,
      nextBatchNumber: batchNumber + 1,
      hasMore: hasMore 
    };
  } catch (error) {
    console.error("Error in fetchMoreAds server action:", error);
    return {
      ads: [],
      nextBatchNumber: batchNumber,
      hasMore: false 
    };
  }
}