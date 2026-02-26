'use client';

import { useReducer, useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMoreAds } from '@/actions/ads';
import { adsReducer, initialAdsState } from '@/lib/ads-reducer';
import { Ad } from '@/types/ad';
import { UseAdsProps, UseAdsReturn } from '@/types/hooks';

export function useAds({
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
        nextBatch: preFetchedNextBatch,
        nextBatchNumber,
        initialLoadedCount
      }
    });
  }, [preFetchedNextBatch, nextBatchNumber, initialLoadedCount]);

  const loadMoreAds = useCallback(async (): Promise<void> => {
    if (isLoadingRef.current || !hasMoreRef.current || state.loadedCount >= totalAdsCount) {
      return;
    }

    if (!state.nextBatch.length) {
      dispatch({ 
        type: 'LOAD_MORE_SUCCESS', 
        payload: { 
          newAds: [], 
          nextBatch: [], 
          nextBatchNumber: state.currentBatchNumber, 
          hasMore: false 
        }
      });
      hasMoreRef.current = false;
      return;
    }

    isLoadingRef.current = true;
    dispatch({ type: 'LOAD_MORE_START' });

    try {
      const validNextAds = state.nextBatch.filter((ad: Ad): ad is Ad => {
        return ad !== null && ad !== undefined && typeof ad.id === 'string';
      });
      
      if (state.loadedCount + validNextAds.length >= totalAdsCount) {
        dispatch({
          type: 'LOAD_MORE_SUCCESS',
          payload: {
            newAds: validNextAds,
            nextBatch: [],
            nextBatchNumber: state.currentBatchNumber + 1,
            hasMore: false 
          }
        });
        hasMoreRef.current = false;
        isLoadingRef.current = false;
        return;
      }

      const result = await fetchMoreAds(state.currentBatchNumber, adsPerBatch);
      
      dispatch({
        type: 'LOAD_MORE_SUCCESS',
        payload: {
          newAds: validNextAds,
          nextBatch: result.ads,
          nextBatchNumber: result.nextBatchNumber,
          hasMore: result.hasMore 
        }
      });
      
      hasMoreRef.current = result.hasMore;
      
    } catch (error) {
      console.error('Error loading more ads:', error);
      dispatch({
        type: 'LOAD_MORE_ERROR',
        payload: { error: 'Failed to load more ads. Please try again.' }
      });
    } finally {
      isLoadingRef.current = false;
    }
  }, [state.nextBatch, state.loadedCount, state.currentBatchNumber, totalAdsCount, adsPerBatch]);

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