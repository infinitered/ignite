import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * Render a component wrapped in the same providers the app uses. Use
 * this in every component / screen test — bare `render()` diverges from
 * production behavior and leads to surprises.
 */
export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, bottom: 0, left: 0, right: 0 },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{ui}</NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>,
    options
  );
}
