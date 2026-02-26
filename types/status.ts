export type StatusType = 'loading' | 'error' | 'end' | 'scroll';

export type StatusMessageProps = {
  type: StatusType;
  count?: number;
  total?: number;
  onRetry?: () => void;
};