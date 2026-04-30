import { useScrollToTop } from '@react-navigation/native';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { type SystemBarStyle, SystemBars } from 'react-native-edge-to-edge';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ScreenProps = {
  children: ReactNode;
  /**
   * fixed = single full-height view, no scroll.
   * scroll = ScrollView, content can exceed screen.
   * scroll-keyboard = ScrollView aware of keyboard (use for forms).
   */
  preset?: 'fixed' | 'scroll' | 'scroll-keyboard';
  className?: string;
  contentClassName?: string;
  statusBarStyle?: SystemBarStyle;
  safeAreaEdges?: ReadonlyArray<'top' | 'bottom' | 'left' | 'right'>;
  keyboardOffset?: number;
};

/**
 * App-wide Screen wrapper. Handles SafeArea, keyboard avoidance,
 * status bar style, and scroll modes. Always use this instead of a
 * raw `<View>` at the screen level.
 */
export function Screen({
  children,
  preset = 'fixed',
  className,
  contentClassName,
  statusBarStyle = 'auto',
  safeAreaEdges = ['top', 'bottom'],
  keyboardOffset = 0,
}: ScreenProps) {
  const scrollRef = useRef<ScrollView>(null);
  useScrollToTop(scrollRef);

  const containerClass = `flex-1 bg-background ${className ?? ''}`.trim();
  const contentClass = `flex-grow ${contentClassName ?? ''}`.trim();

  return (
    <>
      <SystemBars style={statusBarStyle} />
      <SafeAreaView className={containerClass} edges={safeAreaEdges}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={keyboardOffset}
          className="flex-1"
        >
          {preset === 'fixed' ? (
            <View className={contentClass}>{children}</View>
          ) : preset === 'scroll' ? (
            <ScrollView
              ref={scrollRef}
              keyboardShouldPersistTaps="handled"
              contentContainerClassName={contentClass}
            >
              {children}
            </ScrollView>
          ) : (
            <KeyboardAwareScrollView
              keyboardShouldPersistTaps="handled"
              bottomOffset={20}
              contentContainerClassName={contentClass}
            >
              {children}
            </KeyboardAwareScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
