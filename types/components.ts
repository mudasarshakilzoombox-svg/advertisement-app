// types/components.ts
import { Ad } from './ad';

export type InfiniteScrollClientProps = {
  preFetchedNextBatch: Ad[];
  nextBatchNumber: number;
  totalAdsCount: number;
  initialLoadedCount: number;
  adsPerBatch: number;
};

export type AdsContainerProps = {
  adsList: Ad[];
  batchNumber?: number;
};

export type AdCardProps = {
  adDetails: Ad;
};