import { getAdsBatch, hasMoreBatches, MAXIMUM_ADS_TO_DISPLAY } from "@/lib/ads.service";
import { FetchMoreAdsResponse } from "@/src/types/api";
import { ADS_PER_BATCH } from "@/config/ads.config";

export async function fetchMoreAds(
  batchNumber: number,
  adsPerBatch: number = ADS_PER_BATCH 
): Promise<FetchMoreAdsResponse> {
  try {
    const nextBatchAds = await getAdsBatch(batchNumber, adsPerBatch);
    
    const validAds = (nextBatchAds || []).filter(ad => ad && ad.id);
    
    if (nextBatchAds && nextBatchAds.length !== validAds.length) {
      console.warn(`Filtered out ${nextBatchAds.length - validAds.length} ads without IDs`);
    }
    
    const adsWithStringIds = validAds.map(ad => ({
      ...ad,
      id: String(ad.id)
    }));
    
    const moreAvailable = await hasMoreBatches(batchNumber, adsPerBatch);
    const totalLoadedSoFar = batchNumber * adsPerBatch;
    
    const hasMore = moreAvailable && adsWithStringIds.length > 0 && totalLoadedSoFar < MAXIMUM_ADS_TO_DISPLAY;
    
    return {
      ads: adsWithStringIds,
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