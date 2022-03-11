import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View, Dimensions } from "react-native"
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
  const { height } = Dimensions.get('window')
  const screenHeight = React.useRef(null)
  const [scrollEnabled, setScrollEnabled] = React.useState(true)

  const updateScrollState = () => {
    if (props.preset === 'auto'){
      // check whether if content fits the screen
      const contentFitsScreen = screenHeight.current > height * presets.auto.offset.percent - presets.auto.offset.point
        
      // then toggle scroll state according to it, make sure it's not rendering twice
      if (scrollEnabled && !contentFitsScreen) setScrollEnabled(false)
      else if (!scrollEnabled && contentFitsScreen) setScrollEnabled(true)
    } else if (!scrollEnabled) {
      // set back initial state in case it's locked
      setScrollEnabled(true)
    }
  }

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // update screen height ref
    screenHeight.current = contentHeight

    // then update scroll state
    updateScrollState()
  }

  // update scroll state on every render 
  // when screenHeight isn't null
  if (screenHeight.current !== null) 
    updateScrollState()

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
          onContentSizeChange={onContentSizeChange}
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
