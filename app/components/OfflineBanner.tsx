import { View } from 'react-native';

import { Text } from '@/components/Text';
import { useIsOnline } from '@/lib/network';

/**
 * Renders a thin destructive banner when the device is offline. Mount
 * once at the root of the navigator (above all screens) — it auto-hides
 * when connectivity returns.
 */
export function OfflineBanner() {
  const isOnline = useIsOnline();
  if (isOnline) return null;
  return (
    <View className="bg-destructive py-1.5 px-4">
      <Text
        variant="caption"
        align="center"
        className="text-destructive-foreground font-sans-medium"
        accessibilityLiveRegion="polite"
        tx="errors.offline"
      />
    </View>
  );
}
