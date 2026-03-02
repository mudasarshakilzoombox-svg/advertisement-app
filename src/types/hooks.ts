import { Ad } from './ad';

export type UseAdsProps = {
  preFetchedNextBatch: Ad[];
  nextBatchNumber: number;
  totalAdsCount: number;
  initialLoadedCount: number;
  adsPerBatch: number;
};

export type UseAdsReturn = {
  allAds: Ad[];
  nextBatch: Ad[];
  currentBatchNumber: number;
  loadedCount: number;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  loadMoreRef: (node?: Element | null) => void;
  retry: () => Promise<void>;
};

export type UseInfiniteScrollProps<T> = {
  fetchMore: (page: number) => Promise<T[]>;
  initialData: T[];
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
};

export type UseInfiniteScrollReturn<T> = {
  data: T[];
  loading: boolean;
  hasMore: boolean;
  error: string | null;
  observerRef: (node?: Element | null) => void;
};

export type UseVirtualizedAdsProps = UseAdsProps & {
  itemHeight?: number;
  containerHeight?: number;
};

export type UseVirtualizedAdsReturn = UseAdsReturn & {
  visibleAds: Ad[];
  containerRef: React.RefObject<HTMLDivElement>;
  totalHeight: number;
  offsetY: number;
};