import { cache } from 'react';
import adsData from "@/public/ads.json";
import type { Ad } from "@/src/types/ad";
import { GetAdsReturn } from "@/src/types/services";
import { ADS_PER_BATCH, TOTAL_ADS_AVAILABLE, MAX_BATCHES } from "@/config/ads.config";

const allAvailableAds: Ad[] = adsData as Ad[];

export const MAXIMUM_ADS_TO_DISPLAY = TOTAL_ADS_AVAILABLE;

export const getSequentialIndices = cache((): number[] => {
  return Array.from({ length: MAXIMUM_ADS_TO_DISPLAY }, (_, index) => index);
});

export async function getAdsBatch(
  batchNumber: number, 
  adsPerBatch: number = ADS_PER_BATCH 
): Promise<Ad[]> {
  const sequentialIndices = getSequentialIndices();
  const startIndex = (batchNumber - 1) * adsPerBatch;
  const endIndex = Math.min(startIndex + adsPerBatch, MAXIMUM_ADS_TO_DISPLAY);
  
  if (startIndex >= MAXIMUM_ADS_TO_DISPLAY) {
    return [];
  }
  
  const indicesForCurrentBatch = sequentialIndices.slice(startIndex, endIndex);
  const adsForCurrentBatch = indicesForCurrentBatch.map(index => allAvailableAds[index]);
  
  return adsForCurrentBatch;
}

export function getAds(
  limit: number = ADS_PER_BATCH, 
  page: number = 1
): GetAdsReturn {
  const sequentialIndices = getSequentialIndices();
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, MAXIMUM_ADS_TO_DISPLAY);
  
  if (startIndex >= MAXIMUM_ADS_TO_DISPLAY) {
    return { 
      adsForCurrentPage: [], 
      totalAdsLoadedSoFar: MAXIMUM_ADS_TO_DISPLAY 
    };
  }
  
  const indicesForCurrentPage = sequentialIndices.slice(startIndex, endIndex);
  const adsForCurrentPage = indicesForCurrentPage.map(index => allAvailableAds[index]);
  const totalAdsLoadedSoFar = endIndex;
  
  return { 
    adsForCurrentPage, 
    totalAdsLoadedSoFar 
  };
}

export async function hasMoreBatches(
  currentBatchNumber: number, 
  adsPerBatch: number = ADS_PER_BATCH
): Promise<boolean> {
  return currentBatchNumber < MAX_BATCHES;
}

export async function getTotalBatches(adsPerBatch: number = ADS_PER_BATCH): Promise<number> {
  return MAX_BATCHES;
}

export function getCurrentLoadedCount(
  batchNumber: number, 
  adsPerBatch: number = ADS_PER_BATCH
): number {
  return Math.min(batchNumber * adsPerBatch, MAXIMUM_ADS_TO_DISPLAY);
}