import type { Ad } from "@/src/types/ad";

export type FetchMoreAdsParams = {
  batchNumber: number;
  adsPerBatch: number;
};

export type FetchMoreAdsResponse = {
  ads: Ad[];
  nextBatchNumber: number;
  hasMore: boolean;
};