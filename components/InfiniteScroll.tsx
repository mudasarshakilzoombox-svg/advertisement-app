'use client';

import AdsContainer from './AdsContainer';
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
        {hasMore && loadedCount < totalAdsCount && (
          <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
            {!isLoading && (
              <span className="text-gray-400 text-sm">Scroll for more</span>
            )}
          </div>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="text-gray-600 mt-2">
              Loading more ads... ({loadedCount} of {totalAdsCount})
            </span>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={retry}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!hasMore && !isLoading && loadedCount >= totalAdsCount && (
              <p className="text-gray-800 text-center py-4">
                No more ads
              </p>

        )}
      </div>
    </>
  );
}