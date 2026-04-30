import { QueryClient } from '@tanstack/react-query';

/**
 * Single QueryClient for the app. Defaults tuned for mobile:
 * - longer staleTime (mobile data is "expensive" to refetch)
 * - exponential backoff on retry
 * - no refetch on focus (mobile apps focus often as users switch)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
