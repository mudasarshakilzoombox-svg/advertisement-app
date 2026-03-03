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

  const showEndMessage = !hasMore && !isLoading && loadedCount >= totalAdsCount && totalAdsCount > 0;
  const showScrollTrigger = hasMore && loadedCount < totalAdsCount && !isLoading;
  const showLoadingSpinner = isLoading;
  const showError = error;

  return (
    <>
      <div className='mt-5'>
        <AdsContainer adsList={allAds} />
      </div>
      
      <div className="mt-12">
        {showScrollTrigger && (
          <div ref={loadMoreRef} className="h-10">
            <StatusMessage type="scroll" />
          </div>
        )}
        
        {showLoadingSpinner && (
          <StatusMessage 
            type="loading" 
            count={loadedCount} 
            total={totalAdsCount}
          />
        )}
        
        {showError && (
          <StatusMessage 
            type="error" 
            onRetry={retry}
          />
        )}
        
        {showEndMessage && (
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