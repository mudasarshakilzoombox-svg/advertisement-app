export type StatusType = 'loading' | 'error' | 'end' | 'scroll' | 'empty';

export type StatusMessageProps = {
  type: StatusType;
  message?: string;
  count?: number;
  total?: number;
  onRetry?: () => void;
};