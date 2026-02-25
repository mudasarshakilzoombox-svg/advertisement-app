'use server';

import { getRandomAdsBatch, hasMoreBatches } from "@/lib/ads.service";
import type { Ad } from "@/types/ad";

export async function fetchMoreAds(
  batchNumber: number, 
  adsPerBatch: number
): Promise<{ 
  ads: Ad[]; 
  nextBatchNumber: number; 
  hasMore: boolean;
}> {
  try {
    console.log(`Server Action: Fetching batch ${batchNumber}`);
    
    const nextBatchAds = await getRandomAdsBatch(batchNumber, adsPerBatch);
    
    const moreAvailable = await hasMoreBatches(batchNumber, adsPerBatch);
    
    return {
      ads: nextBatchAds,
      nextBatchNumber: batchNumber + 1,
      hasMore: moreAvailable && nextBatchAds.length > 0
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