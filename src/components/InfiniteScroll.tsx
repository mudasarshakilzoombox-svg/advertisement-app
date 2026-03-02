'use client';

import AdsContainer from './AdsContainer';
import StatusMessage from './StatusMessage';
import { useAds } from '@/src/hooks/useAds';
import { InfiniteScrollClientProps } from '@/src/types/components';

export default function InfiniteScrollClient(props: InfiniteScrollClientProps) {
  const {
    allAds,
    isLoading,
    hasMore,
    error,
    loadedCount,
    loadMoreRef,
    retry
  } = useAds(props);

  const { totalAdsCount } = props;

  return (
    <>
      <AdsContainer adsList={allAds} />

      <div className="mt-12">
        {hasMore && loadedCount < totalAdsCount && !isLoading && (
          <div ref={loadMoreRef}>
            <StatusMessage type="scroll" />
          </div>
        )}
        
        {isLoading && (
          <StatusMessage 
            type="loading" 
            count={loadedCount} 
            total={totalAdsCount}
          />
        )}
        
        {error && (
          <StatusMessage 
            type="error" 
            onRetry={retry}
          />
        )}
        
        {!hasMore && !isLoading && loadedCount >= totalAdsCount && (
          <div className="mt-8">
            <StatusMessage 
              type="end" 
              total={totalAdsCount}
            />
          </div>
        )}
      </div>
    </>
  );
}