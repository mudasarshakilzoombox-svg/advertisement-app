import { Ad } from './ad';

export type GetAdsReturn = {
  adsForCurrentPage: Ad[];
  totalAdsLoadedSoFar: number;
};

export type GetAdsBatchReturn = {
  ads: Ad[];
  nextBatchNumber: number;
  hasMore: boolean;
};