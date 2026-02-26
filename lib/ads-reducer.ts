import type { AdsState, AdsAction } from '@/types/ads-state';

export const initialAdsState: AdsState = {
  allAds: [],
  nextBatch: [],
  currentBatchNumber: 1,
  loadedCount: 0,
  isLoading: false,
  hasMore: true,
  error: null,
};

export function adsReducer(
  state: AdsState,
  action: AdsAction
): AdsState {
  switch (action.type) {
    case 'SET_INITIAL_STATE':
      return {
        ...state,
        nextBatch: action.payload.nextBatch,
        currentBatchNumber: action.payload.nextBatchNumber,
        loadedCount: action.payload.initialLoadedCount,
      };

    case 'LOAD_MORE_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'LOAD_MORE_SUCCESS':
      return {
        ...state,
        allAds: [...state.allAds, ...action.payload.newAds],
        loadedCount:
          state.loadedCount + action.payload.newAds.length,
        isLoading: false,
        error: null,
      };

    case 'UPDATE_NEXT_BATCH':
      return {
        ...state,
        nextBatch: action.payload.nextBatch,
        currentBatchNumber: action.payload.nextBatchNumber,
        hasMore: action.payload.hasMore,
      };

    case 'LOAD_MORE_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };

    case 'RESET_STATE':
      return initialAdsState;

    default:
      return state;
  }
}