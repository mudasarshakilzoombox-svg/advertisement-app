import { Ad } from './ad';

export type FetchMoreAdsResponse = {
  ads: Ad[];
  nextBatchNumber: number;
  hasMore: boolean;
};

export type AdsApiResponse = {
  ads: Ad[];
  hasMore: boolean;
  errorMessage?: string;
};