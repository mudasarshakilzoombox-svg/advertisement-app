import { Ad } from './ad';

export type AdsState = {
  allAds: Ad[];
  nextBatch: Ad[];
  currentBatchNumber: number;
  loadedCount: number;
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  retryCount?: number;
};

export type AdsAction =
  | { type: 'SET_INITIAL_STATE'; payload: { 
      nextBatch: Ad[]; 
      nextBatchNumber: number; 
      initialLoadedCount: number 
    } 
  }
  | { type: 'LOAD_MORE_START' }
  | { type: 'LOAD_MORE_SUCCESS'; payload: { 
      newAds: Ad[]; 
    } 
  }
  | { type: 'UPDATE_NEXT_BATCH'; payload: { 
      nextBatch: Ad[]; 
      nextBatchNumber: number; 
      hasMore: boolean;
    } 
  }
  | { type: 'LOAD_MORE_ERROR'; payload: { 
      error: string; 
    } 
  }
  | { type: 'INCREMENT_RETRY' }
  | { type: 'RESET_STATE' };