import React, { useState, useEffect } from 'react'
import { StyleProp, ViewStyle, Keyboard } from 'react-native'
import { flatten } from 'ramda'
import { spacing } from '../../theme'
import { useSafeArea } from 'react-native-safe-area-context'
import { isIos } from '../../utils/features'
import { View } from '../view/view'

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: spacing[4],
  paddingTop: spacing[5]
}

export interface BottomViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * Describe your component here
 */
export const BottomView = (props: BottomViewProps) => {
  const insets = useSafeArea()

  const { style, children } = props
  const styles = flatten([CONTAINER, { paddingBottom: insets.bottom + spacing[4] } ,style])

  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      isIos ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardShown(true);
      });
    const hideSubscription = Keyboard.addListener(
      isIos ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (keyboardShown) {
    return null
  }

  return (
    <View style={styles}>
      {children}
    </View>
  )
}
