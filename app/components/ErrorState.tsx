import { View } from 'react-native';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';

export type ErrorStateProps = {
  title?: string | undefined;
  message?: string | undefined;
  onRetry?: (() => void) | undefined;
  retryLabel?: string | undefined;
  className?: string | undefined;
};

/**
 * Renders a recoverable error state. Provide `onRetry` for transient
 * failures (network, timeouts). Use the ErrorBoundary for unrecoverable
 * crashes.
 */
export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
}: ErrorStateProps) {
  return (
    <View className={`flex-1 items-center justify-center p-6 gap-3 ${className ?? ''}`.trim()}>
      <Icon name="alert-circle-outline" size={48} className="text-destructive" />
      <Text variant="heading-3" align="center">
        {title}
      </Text>
      {message ? (
        <Text variant="caption" align="center" tone="muted">
          {message}
        </Text>
      ) : null}
      {onRetry ? (
        <Button onPress={onRetry} accessibilityLabel={retryLabel} text={retryLabel} />
      ) : null}
    </View>
  );
}
