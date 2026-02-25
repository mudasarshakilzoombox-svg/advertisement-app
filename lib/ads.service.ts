import { cache } from 'react';
import adsData from "@/public/ads.json";
import { Ad } from "@/types/ad";
import { GetRandomAdsReturn } from "@/types/services";

const allAvailableAds: Ad[] = adsData as Ad[];
const MAXIMUM_ADS_TO_DISPLAY = 190;

export const getRandomizedIndices = cache((): number[] => {
  console.log("Generating random indices on server...");
  
  const indices = Array.from({ length: MAXIMUM_ADS_TO_DISPLAY }, (_, index) => index);
  
  for (let currentIndex = indices.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [indices[currentIndex], indices[randomIndex]] = 
    [indices[randomIndex], indices[currentIndex]];
  }
  
  return indices;
});

export async function getRandomAdsBatch(
  batchNumber: number, 
  adsPerBatch: number
): Promise<Ad[]> {
  const randomizedIndices = getRandomizedIndices();
  const startIndex = (batchNumber - 1) * adsPerBatch;
  const endIndex = Math.min(startIndex + adsPerBatch, MAXIMUM_ADS_TO_DISPLAY);
  
  console.log(`Server: Fetching batch ${batchNumber} (indices ${startIndex}-${endIndex})`);
  
  if (startIndex >= MAXIMUM_ADS_TO_DISPLAY) {
    return [];
  }
  
  const indicesForCurrentBatch = randomizedIndices.slice(startIndex, endIndex);
  const adsForCurrentBatch = indicesForCurrentBatch.map(index => allAvailableAds[index]);
  
  return adsForCurrentBatch;
}

export function getRandomAds(limit: number, page: number = 1): GetRandomAdsReturn {
  const randomizedIndices = getRandomizedIndices();
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, MAXIMUM_ADS_TO_DISPLAY);
  
  console.log(`getRandomAds: Page ${page}, Start: ${startIndex}, End: ${endIndex}`);
  
  if (startIndex >= MAXIMUM_ADS_TO_DISPLAY) {
    return { 
      adsForCurrentPage: [], 
      totalAdsLoadedSoFar: MAXIMUM_ADS_TO_DISPLAY 
    };
  }
  
  const indicesForCurrentPage = randomizedIndices.slice(startIndex, endIndex);
  const adsForCurrentPage = indicesForCurrentPage.map(index => allAvailableAds[index]);
  const totalAdsLoadedSoFar = endIndex;
  
  return { 
    adsForCurrentPage, 
    totalAdsLoadedSoFar 
  };
}

export async function hasMoreBatches(
  currentBatchNumber: number, 
  adsPerBatch: number
): Promise<boolean> {
  const totalBatches = Math.ceil(MAXIMUM_ADS_TO_DISPLAY / adsPerBatch);
  return currentBatchNumber < totalBatches;
}

export async function getTotalBatches(adsPerBatch: number): Promise<number> {
  return Math.ceil(MAXIMUM_ADS_TO_DISPLAY / adsPerBatch);
}

export function getCurrentLoadedCount(batchNumber: number, adsPerBatch: number): number {
  return Math.min(batchNumber * adsPerBatch, MAXIMUM_ADS_TO_DISPLAY);
}