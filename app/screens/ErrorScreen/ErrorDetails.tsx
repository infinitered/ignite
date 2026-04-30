import type { ErrorInfo } from 'react';
import { ScrollView, View } from 'react-native';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
}

/**
 * Rendered by `ErrorBoundary` when something throws. Shows the error
 * (dev-only stack trace) and a reset button.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen preset="fixed" contentClassName="items-center px-6 pt-8 gap-4">
      <View className="items-center gap-2">
        <Icon name="bug-outline" size={64} className="text-destructive" />
        <Text variant="heading-2" tone="destructive" tx="errorScreen.title" />
        <Text align="center" tone="muted" tx="errorScreen.friendlySubtitle" />
      </View>

      {__DEV__ && (
        <ScrollView className="flex-1 self-stretch bg-muted rounded-md p-3">
          <Text variant="body-bold" tone="destructive">
            {String(props.error).trim()}
          </Text>
          <Text variant="caption" tone="muted" selectable className="mt-2">
            {(props.errorInfo?.componentStack ?? '').trim()}
          </Text>
        </ScrollView>
      )}

      <Button
        variant="destructive"
        onPress={props.onReset}
        tx="errorScreen.reset"
        accessibilityLabel="Reset the app"
      />
    </Screen>
  );
}
