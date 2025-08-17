export interface ApiError {
  status: number;
  error: string;
}

export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'error' in error;
}
