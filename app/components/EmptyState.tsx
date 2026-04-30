import { View } from 'react-native';

import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Text } from '@/components/Text';
import type { TxKeyPath } from '@/i18n';

export type EmptyStateProps = {
  iconName?: React.ComponentProps<typeof Icon>['name'];
  headingTx?: TxKeyPath;
  heading?: string;
  contentTx?: TxKeyPath;
  content?: string;
  buttonTx?: TxKeyPath;
  buttonText?: string;
  onButtonPress?: () => void;
  className?: string;
};

/**
 * Renders for "no results" / "you have no items yet" states. One of
 * the four UI states every screen must handle — see CLAUDE.md.
 */
export function EmptyState({
  iconName = 'document-outline',
  headingTx,
  heading,
  contentTx,
  content,
  buttonTx,
  buttonText,
  onButtonPress,
  className,
}: EmptyStateProps) {
  return (
    <View className={`flex-1 items-center justify-center p-6 gap-3 ${className ?? ''}`.trim()}>
      <Icon name={iconName} size={48} className="text-muted-foreground" />
      <Text variant="heading-3" align="center" tx={headingTx}>
        {heading ?? 'Nothing here yet'}
      </Text>
      {(contentTx || content) && (
        <Text variant="caption" align="center" tx={contentTx}>
          {content}
        </Text>
      )}
      {onButtonPress && (
        <Button
          variant="secondary"
          onPress={onButtonPress}
          tx={buttonTx}
          text={buttonText}
          accessibilityLabel={buttonText ?? 'Action'}
        />
      )}
    </View>
  );
}
