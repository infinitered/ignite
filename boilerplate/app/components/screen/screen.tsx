import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  Dimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  // The followings for <Screen preset='auto'/>
  // This will automatically disables scrolling if content fits the screen.
  const { height } = Dimensions.get("window")
  const scrollViewHeight = React.useRef(null)
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

  const updateScrollState = () => {
    if (props.preset === "auto") {
      // check whether if content fits the screen
      // then toggle scroll state according to it
      const contentFitsScreen =
        scrollViewHeight.current < height * presets.auto.offset.percent - presets.auto.offset.point

      // content is less than the size of the screen, so we can disable scrolling
      if (scrollEnabled && contentFitsScreen) setScrollEnabled(false)

      // content is greater than the size of the screen, so let's enable scrolling
      if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true)
    } else if (!scrollEnabled) {
      // set back initial value in case it's stucked in a disabled state
      // i.e. if we've just changed preset from 'auto' to 'scroll'
      setScrollEnabled(true)
    }
  }

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // update scroll view height
    scrollViewHeight.current = contentHeight

    // then update scroll state
    updateScrollState()
  }

  // update scroll state on every render
  // when scrollViewHeight isn't null
  if (scrollViewHeight.current !== null) updateScrollState()

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
          onContentSizeChange={props.preset === "auto" ? onContentSizeChange : undefined}
          scrollEnabled={scrollEnabled}
        >
          {props.children}
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
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
