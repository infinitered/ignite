import { View } from 'react-native';

import { Screen } from '@/components/Screen';
import { Text } from '@/components/Text';
import type { AppStackScreenProps } from '@/navigators/navigationTypes';

type Props = AppStackScreenProps<'{{Name}}'>;

/**
 * TODO: describe the user goal this screen serves.
 *
 * Reminder: handle all four UI states (loading, empty, error, populated).
 * Use only `@/components/*` primitives.
 */
export function {{Name}}Screen(_props: Props) {
  return (
    <Screen preset="scroll" contentClassName="p-4 gap-4">
      <Text variant="display" tx="{{name}}.title" />
      <View className="gap-2">
        <Text tx="{{name}}.placeholder" />
      </View>
    </Screen>
  );
}
