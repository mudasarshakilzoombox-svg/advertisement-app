'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMoreAds } from '@/actions/ads';
import AdsContainer from './AdsContainer';
import { Ad } from '@/types/ad';
import { InfiniteScrollClientProps } from '@/types/components';

export default function InfiniteScrollClient({
  preFetchedNextBatch,
  nextBatchNumber,
  totalAdsCount,
  initialLoadedCount,
  adsPerBatch
}: InfiniteScrollClientProps) {
  const [allAds, setAllAds] = useState<Ad[]>([]);
  const [nextBatch, setNextBatch] = useState<Ad[]>(preFetchedNextBatch);
  const [currentBatchNumber, setCurrentBatchNumber] = useState(nextBatchNumber);
  const [loadedCount, setLoadedCount] = useState(initialLoadedCount);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px'
  });

  const loadMoreAds = useCallback(async () => {
    if (isLoading || !hasMore || loadedCount >= totalAdsCount) return;
    if (!nextBatch.length) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    
    try {
      const validNextAds = nextBatch.filter((ad: Ad) => ad && ad.id);
      setAllAds((prev: Ad[]) => [...prev, ...validNextAds]);
      
      const newLoadedCount = loadedCount + validNextAds.length;
      setLoadedCount(newLoadedCount);

      if (newLoadedCount >= totalAdsCount) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }

      const result = await fetchMoreAds(currentBatchNumber, adsPerBatch);
      
      setNextBatch(result.ads);
      setCurrentBatchNumber(result.nextBatchNumber);
      setHasMore(result.hasMore);
      
    } catch (error) {
      console.error('Error loading more ads:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, loadedCount, totalAdsCount, nextBatch, currentBatchNumber, adsPerBatch]);

  useEffect(() => {
    if (inView && !isLoading && hasMore && loadedCount < totalAdsCount) {
      loadMoreAds();
    }
  }, [inView, isLoading, hasMore, loadedCount, totalAdsCount, loadMoreAds]);

  return (
    <>
      {allAds.length > 0 && <AdsContainer adsList={allAds} />}

      <div className="mt-8">
        {hasMore && loadedCount < totalAdsCount && (
          <div ref={loadMoreRef} className="h-10" />
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">
              Loading more ads... ({loadedCount} of {totalAdsCount})
            </span>
          </div>
        )}
        
        {!hasMore && !isLoading && loadedCount >= totalAdsCount && (
          <p className="text-gray-800 text-center py-8">
            No more ads to load at the moment.
          </p>
        )}
      </div>
    </>
  );
}