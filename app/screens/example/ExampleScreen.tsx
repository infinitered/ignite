// @demo remove-file
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, View } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { ListView } from '@/components/ListView';
import { LoadingState } from '@/components/LoadingState';
import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import { TextField } from '@/components/TextField';
import { translate } from '@/i18n/translate';
import { type Post, usePosts } from '@/queries/usePosts';
import { analytics } from '@/services/analytics/posthog';
import { usePrefsStore } from '@/stores/usePrefsStore';

const formSchema = z.object({
  email: z.string().email(translate('errors.invalidEmail')),
});
type FormValues = z.infer<typeof formSchema>;

/**
 * Demonstrates every load-bearing pattern in the starter:
 *  - NativeWind classes (light + dark)
 *  - Zustand store with MMKV-backed persistence
 *  - TanStack Query against the typed `api` client (Zod-validated)
 *  - FlashList rendering server data
 *  - RHF + Zod 4 form with validation + accessible error rendering
 *  - PostHog analytics event
 *
 * Replace this with your real first screen — keep the patterns.
 */
export function ExampleScreen() {
  // Selector-based subscriptions — re-render only when each value changes.
  const exampleCounter = usePrefsStore((s) => s.exampleCounter);
  const incrementCounter = usePrefsStore((s) => s.incrementCounter);
  const resetCounter = usePrefsStore((s) => s.resetCounter);
  const posts = usePosts();
  const form = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = (values: FormValues) => {
    analytics.track('example.form_submitted', { email_domain: values.email.split('@')[1] });
    Alert.alert(translate('example.submitted'), values.email);
  };

  return (
    <Screen preset="scroll-keyboard" contentClassName="p-4 gap-4">
      <Text variant="display" tx="example.title" />

      <Card>
        <Text variant="heading-3" text={translate('example.counter', { count: exampleCounter })} />
        <View className="mt-3 flex-row gap-2">
          <Button
            onPress={incrementCounter}
            tx="example.increment"
            accessibilityLabel="Increment counter"
          />
          <Button
            variant="secondary"
            onPress={resetCounter}
            tx="example.reset"
            accessibilityLabel="Reset counter"
          />
        </View>
      </Card>

      <Card className="h-72">
        <Text variant="heading-3" tx="example.fetchedPosts" />
        <View className="mt-3 flex-1">
          {posts.isPending ? (
            <LoadingState />
          ) : posts.isError ? (
            <ErrorState
              title={translate('errors.loadFailed')}
              message={posts.error instanceof Error ? posts.error.message : undefined}
              onRetry={() => posts.refetch()}
            />
          ) : posts.data.length === 0 ? (
            <EmptyState />
          ) : (
            <ListView<Post>
              data={posts.data.slice(0, 20)}
              keyExtractor={(item) => String(item.id)}
              estimatedItemSize={56}
              renderItem={({ item }) => (
                <View className="border-b border-border py-2">
                  <Text variant="body-bold" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text variant="caption" tone="muted" numberOfLines={2}>
                    {item.body}
                  </Text>
                </View>
              )}
            />
          )}
        </View>
      </Card>

      <Card>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <TextField
              label={translate('example.emailLabel')}
              placeholder={translate('example.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              value={field.value ?? ''}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              returnKeyType="send"
              onSubmitEditing={form.handleSubmit(onSubmit)}
            />
          )}
        />
        <View className="mt-3">
          <Button
            onPress={form.handleSubmit(onSubmit)}
            tx="example.submit"
            accessibilityLabel="Submit form"
          />
        </View>
      </Card>
    </Screen>
  );
}
