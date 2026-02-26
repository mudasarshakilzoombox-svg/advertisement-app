import { StatusMessageProps } from '@/types/status';

export default function StatusMessage({ 
  type, 
  count, 
  total, 
  onRetry 
}: StatusMessageProps) {
  
  if (type === 'scroll') {
    return (
      <div className="h-16 flex items-center justify-center">
        <span className="text-gray-600 text-sm animate-pulse">
          Loading for more ads...
        </span>
      </div>
    );
  }

  if (type === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-3 border-indigo-200 border-t-indigo-600 mb-3"></div>
        <p className="text-gray-600 text-sm">
          Loading... {count} of {total}
        </p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 rounded-xl p-6 inline-block">
          <svg className="w-10 h-10 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-600 mb-3">Failed to load ads</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
        <p className="text-gray-700 text-center py-4">
          No more ads
        </p>
    
  );
}