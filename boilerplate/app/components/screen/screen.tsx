import * as React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, ViewStyle, RefreshControl } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScreenProps } from './screen.props'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { useState } from 'react'
import { BOTTOM_NAV_HEIGHT } from '../../utils/features'
import { spacing } from '../../theme'

const isIos = Platform.OS === 'ios'

const STATUS_BAR_IOS: ViewStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 6
}

function ScreenWithoutScrolling({
  bottomNavSafe = false, style: propStyle, backgroundColor, unsafe, bottomSafe, keyboardOffset, statusBar, children
}: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = propStyle || {}
  const backgroundStyle = backgroundColor ? { backgroundColor: backgroundColor } : {}
  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: (bottomSafe ? insets.bottom : 0) + (bottomNavSafe ? BOTTOM_NAV_HEIGHT + insets.bottom : 0),
  } as ViewStyle

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || 'none']}
      style={[preset.outer, backgroundStyle]}
    >
      <StatusBar
        backgroundColor={backgroundStyle.backgroundColor || preset.outer.backgroundColor}
        barStyle={statusBar || 'light-content'}
      />
      <View style={[preset.inner, style, insetStyle]}>{children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling({
  bottomNavSafe = false, style: propStyle, backgroundColor,
  unsafe, bottomSafe, keyboardOffset, keyboardShouldPersistTaps, statusBar, statusBarEffect,
  contentBottomSafe, contentTopSafe, scrollRef, children, onRefresh, controlRefreshing
}: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = propStyle || { paddingBottom: contentBottomSafe ? insets.bottom : 0 }
  const bottomStyle = {
    paddingTop: contentTopSafe ? insets.top : 0,
    paddingBottom: (contentBottomSafe ? insets.bottom : 0) +  (bottomNavSafe ? BOTTOM_NAV_HEIGHT + spacing[6] : 0),
  }
  const backgroundStyle = backgroundColor ? { backgroundColor: backgroundColor } : {}
  const insetStyle = {
    paddingTop: unsafe ? 0 : insets.top,
    paddingBottom: bottomSafe ? insets.bottom : 0,
  } as ViewStyle

  const [scrolled, setScrolled] = useState<boolean>(false)

  const statusBarEffectBackgroundColor = scrolled ? 'rgba(0,0,0,0.5)' : 'transparent'

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || 'none']}
      style={[preset.outer, backgroundStyle]}
    >
      <View
        style={{
          ...{
            ...STATUS_BAR_IOS,
            height: insets.top
          },
          backgroundColor: statusBarEffectBackgroundColor
        }}
      >
        <StatusBar
          backgroundColor={backgroundStyle.backgroundColor || preset.outer.backgroundColor}
          barStyle={statusBar || 'light-content'}
        />
      </View>
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          contentContainerStyle={[preset.inner, style, bottomStyle]}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
          onScroll={(event) => {
            const { nativeEvent: { contentOffset: { y } } } = event
            if (y > 4 && statusBarEffect) {
              setScrolled(true)
            } else {
              setScrolled(false)
            }
          }}
          ref={scrollRef}
          refreshControl={
            onRefresh &&
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={controlRefreshing}
              />
          }
          scrollEventThrottle={1}
          style={[preset.outer, backgroundStyle]}
        >
          {children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function  Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
