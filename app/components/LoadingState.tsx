import { ActivityIndicator, View } from 'react-native';

import { Text } from '@/components/Text';

export type LoadingStateProps = {
  message?: string;
  className?: string;
};

/**
 * Centered spinner + optional caption. One of the four UI states
 * every screen must handle — see CLAUDE.md.
 */
export function LoadingState({ message, className }: LoadingStateProps) {
  return (
    <View
      className={`flex-1 items-center justify-center gap-2 ${className ?? ''}`.trim()}
      accessibilityLiveRegion="polite"
      accessibilityRole="progressbar"
    >
      <ActivityIndicator size="large" className="text-primary" />
      {message ? (
        <Text variant="caption" tone="muted">
          {message}
        </Text>
      ) : null}
    </View>
  );
}
