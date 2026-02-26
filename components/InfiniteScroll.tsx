'use client';

import AdsContainer from './AdsContainer';
import StatusMessage from './StatusMessage';
import { useAds } from '@/hooks/useAds';
import { InfiniteScrollClientProps } from '@/types/components';

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
      {allAds.length > 0 && (
        <div className="mt-8">
          <AdsContainer adsList={allAds} />
        </div>
      )}

      <div className="mt-8">
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
          <StatusMessage 
            type="end" 
            total={totalAdsCount}
          />
        )}
      </div>
    </>
  );
}