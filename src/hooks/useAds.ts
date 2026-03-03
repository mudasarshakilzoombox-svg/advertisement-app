'use client';

import { useReducer, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMoreAds } from '@/src/actions/ads';
import { adsReducer, initialAdsState } from '@/lib/ads-reducer';
import { Ad } from '@/src/types/ad';
import { UseAdsProps, UseAdsReturn } from '@/src/types/hooks';

export function useAds({
  initialAds, 
  preFetchedNextBatch,
  nextBatchNumber,
  totalAdsCount,
  initialLoadedCount,
  adsPerBatch
}: UseAdsProps): UseAdsReturn {
  const [state, dispatch] = useReducer(adsReducer, initialAdsState);
  
  const isLoadingRef = useRef<boolean>(false);
  const hasMoreRef = useRef<boolean>(true);
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px'
  });

   useEffect(() => {
  dispatch({
    type: 'SET_INITIAL_STATE',
    payload: {
      initialAds,
      nextBatch: preFetchedNextBatch,
      nextBatchNumber,
      initialLoadedCount,
      totalAdsCount, 
    }
  });
}, [
  initialAds,
  preFetchedNextBatch,
  nextBatchNumber,
  initialLoadedCount,
  totalAdsCount
]);

  const loadMoreAds = useCallback(async (): Promise<void> => {
  if (isLoadingRef.current || state.loadedCount >= totalAdsCount) {
    return;
  }

  isLoadingRef.current = true;
  dispatch({ type: 'LOAD_MORE_START' });

  try {
    const result = await fetchMoreAds(
      state.currentBatchNumber,
      adsPerBatch
    );

    if (!result.ads.length) {
      dispatch({
        type: 'UPDATE_NEXT_BATCH',
        payload: {
          nextBatch: [],
          nextBatchNumber: state.currentBatchNumber,
          hasMore: false
        }
      });

      return;
    }

    dispatch({
      type: 'LOAD_MORE_SUCCESS',
      payload: {
        newAds: result.ads
      }
    });

    dispatch({
      type: 'UPDATE_NEXT_BATCH',
      payload: {
        nextBatch: [],
        nextBatchNumber: result.nextBatchNumber,
        hasMore: state.loadedCount + result.ads.length < totalAdsCount
      }
    });

  } catch {
    dispatch({
      type: 'LOAD_MORE_ERROR',
      payload: {
        error: 'Failed to load more ads. Please try again.'
      }
    });
  } finally {
    isLoadingRef.current = false;
  }
}, [
  state.loadedCount,
  state.currentBatchNumber,
  totalAdsCount,
  adsPerBatch
]);

  useEffect(() => {
    if (inView && !state.isLoading && state.hasMore && state.loadedCount < totalAdsCount) {
      loadMoreAds();
    }
  }, [inView, state.isLoading, state.hasMore, state.loadedCount, totalAdsCount, loadMoreAds]);

  return {
    allAds: state.allAds,
    nextBatch: state.nextBatch,
    currentBatchNumber: state.currentBatchNumber,
    loadedCount: state.loadedCount,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    error: state.error,
    loadMoreRef,
    retry: loadMoreAds
  };
}