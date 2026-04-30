import { Pressable, PressableProps, ViewStyle, Platform } from "react-native"
import { useDrawerProgress } from "react-native-drawer-layout"
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated"

import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"

interface DrawerIconButtonProps extends PressableProps {}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * @param {DrawerIconButtonProps} props - The props for the `DrawerIconButton` component.
 * @returns {JSX.Element} The rendered `DrawerIconButton` component.
 */
export function DrawerIconButton(props: DrawerIconButtonProps) {
  const { ...PressableProps } = props
  const progress = useDrawerProgress()
  const isWeb = Platform.OS === "web"
  const {
    theme: { colors },
    themed,
  } = useAppTheme()

  const animatedContainerStyles = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, isRTL ? 60 : -60])

    return {
      transform: [{ translateX }],
    }
  })

  const animatedTopBarStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [colors.text, colors.tint])
    const marginStart = interpolate(progress.value, [0, 1], [0, -11.5])
    const rotate = interpolate(progress.value, [0, 1], [0, isRTL ? 45 : -45])
    const marginBottom = interpolate(progress.value, [0, 1], [0, -2])
    const width = interpolate(progress.value, [0, 1], [18, 12])
    const marginHorizontal =
      isWeb && isRTL
        ? { marginRight: marginStart }
        : {
            marginLeft: marginStart,
          }

    return {
      ...marginHorizontal,
      backgroundColor,
      marginBottom,
      width,
      transform: [{ rotate: `${rotate}deg` }],
    }
  })

  const animatedMiddleBarStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(progress.value, [0, 1], [colors.text, colors.tint])
    const width = interpolate(progress.value, [0, 1], [18, 16])

    return {
      backgroundColor,
      width,
    }
  })

  const animatedBottomBarStyles = useAnimatedStyle(() => {
    const marginTop = interpolate(progress.value, [0, 1], [4, 2])
    const backgroundColor = interpolateColor(progress.value, [0, 1], [colors.text, colors.tint])
    const marginStart = interpolate(progress.value, [0, 1], [0, -11.5])
    const rotate = interpolate(progress.value, [0, 1], [0, isRTL ? -45 : 45])
    const width = interpolate(progress.value, [0, 1], [18, 12])
    const marginHorizontal =
      isWeb && isRTL
        ? { marginRight: marginStart }
        : {
            marginLeft: marginStart,
          }

    return {
      ...marginHorizontal,
      backgroundColor,
      width,
      marginTop,
      transform: [{ rotate: `${rotate}deg` }],
    }
  })

  return (
    <AnimatedPressable {...PressableProps} style={[$container, animatedContainerStyles]}>
      <Animated.View style={[$topBar, animatedTopBarStyles]} />

      <Animated.View style={[themed($middleBar), animatedMiddleBarStyles]} />

      <Animated.View style={[$bottomBar, animatedBottomBarStyles]} />
    </AnimatedPressable>
  )
}

const barHeight = 2

const $container: ViewStyle = {
  alignItems: "center",
  height: 56,
  justifyContent: "center",
  width: 56,
}

const $topBar: ViewStyle = {
  height: barHeight,
}

const $middleBar: ViewStyle = {
  height: barHeight,
  marginTop: 4,
}

const $bottomBar: ViewStyle = {
  height: barHeight,
}

// @demo remove-file
