import { Ad } from './ad';

export type GetRandomAdsReturn = {
  adsForCurrentPage: Ad[];
  totalAdsLoadedSoFar: number;
};

export type FetchMoreAdsParams = {
  batchNumber: number;
  adsPerBatch: number;
};