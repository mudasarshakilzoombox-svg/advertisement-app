'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMoreAds } from '@/actions/ads';
import { adsReducer, initialAdsState } from '@/lib/ads-reducer';
import type { Ad } from '@/types/ad';
import type { UseAdsProps, UseAdsReturn } from '@/types/hooks';

export function useAds({
  preFetchedNextBatch,
  nextBatchNumber,
  totalAdsCount,
  initialLoadedCount,
  adsPerBatch,
}: UseAdsProps): UseAdsReturn {
  const [state, dispatch] = useReducer(adsReducer, initialAdsState);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    dispatch({
      type: 'SET_INITIAL_STATE',
      payload: {
        nextBatch: preFetchedNextBatch,
        nextBatchNumber,
        initialLoadedCount,
      },
    });
  }, [preFetchedNextBatch, nextBatchNumber, initialLoadedCount]);

  const loadMoreAds = useCallback(async (): Promise<void> => {
    if (
      state.isLoading ||
      !state.hasMore ||
      state.loadedCount >= totalAdsCount
    ) {
      return;
    }

    if (!state.nextBatch.length) {
      dispatch({
        type: 'UPDATE_NEXT_BATCH',
        payload: {
          nextBatch: [],
          nextBatchNumber: state.currentBatchNumber,
          hasMore: false,
        },
      });
      return;
    }

    dispatch({ type: 'LOAD_MORE_START' });

    try {
      const validNextAds = state.nextBatch.filter(
        (ad): ad is Ad => Boolean(ad && ad.id)
      );

      dispatch({
        type: 'LOAD_MORE_SUCCESS',
        payload: {
          newAds: validNextAds,
        },
      });

      if (state.loadedCount + validNextAds.length >= totalAdsCount) {
        dispatch({
          type: 'UPDATE_NEXT_BATCH',
          payload: {
            nextBatch: [],
            nextBatchNumber: state.currentBatchNumber + 1,
            hasMore: false,
          },
        });
        return;
      }

      const result = await fetchMoreAds(
        state.currentBatchNumber,
        adsPerBatch
      );

      dispatch({
        type: 'UPDATE_NEXT_BATCH',
        payload: {
          nextBatch: result.ads,
          nextBatchNumber: result.nextBatchNumber,
          hasMore: result.hasMore,
        },
      });

    } catch (error) {
      dispatch({
        type: 'LOAD_MORE_ERROR',
        payload: {
          error: 'Failed to load more ads. Please try again.',
        },
      });
    }
  }, [
    state.isLoading,
    state.hasMore,
    state.nextBatch,
    state.loadedCount,
    state.currentBatchNumber,
    totalAdsCount,
    adsPerBatch,
  ]);

  useEffect(() => {
    if (
      inView &&
      !state.isLoading &&
      state.hasMore &&
      state.loadedCount < totalAdsCount
    ) {
      loadMoreAds();
    }
  }, [
    inView,
    state.isLoading,
    state.hasMore,
    state.loadedCount,
    totalAdsCount,
    loadMoreAds,
  ]);

  return {
    allAds: state.allAds,
    nextBatch: state.nextBatch,
    currentBatchNumber: state.currentBatchNumber,
    loadedCount: state.loadedCount,
    isLoading: state.isLoading,
    hasMore: state.hasMore,
    error: state.error,
    loadMoreRef,
    retry: loadMoreAds,
  };
}