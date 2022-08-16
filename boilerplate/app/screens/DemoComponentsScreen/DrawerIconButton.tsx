import React, { useEffect, useMemo, useRef } from "react"
import { Animated, Pressable, PressableProps, ViewStyle } from "react-native"
import { isRTL } from "../../i18n"
import { colors } from "../../theme"

interface DrawerIconButtonProps extends PressableProps {
  open: boolean
}

export function DrawerIconButton(props: DrawerIconButtonProps) {
  const { open, ...PressableProps } = props

  const animation = useRef(new Animated.Value(0)).current

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.text, colors.tint],
  })

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, isRTL ? 60 : -60],
  })

  const topBarRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-45deg"],
  })

  const topBarTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  })

  const bottomBarTranslateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  })

  const bottomBarRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  })

  const marginLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -11.5],
  })

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 12],
  })

  const middleWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 16],
  })

  const marginBottom = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -2],
  })

  const marginTop = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 2],
  })

  useEffect(() => {
    if (open) {
      Animated.spring(animation, { toValue: 1, useNativeDriver: false }).start()
    } else {
      Animated.spring(animation, { toValue: 0, useNativeDriver: false }).start()
    }
  }, [open])

  // RTL support logic
  const topBarTransform = useMemo(
    () =>
      isRTL
        ? [{ translateX: topBarTranslateX }, { rotate: topBarRotation }]
        : [{ rotate: topBarRotation }],
    [topBarTranslateX, topBarRotation],
  )
  const bottomBarTransform = useMemo(
    () =>
      isRTL
        ? [{ translateX: bottomBarTranslateX }, { rotate: bottomBarRotation }]
        : [{ rotate: bottomBarRotation }],
    [bottomBarTranslateX, bottomBarRotation],
  )

  return (
    <Pressable {...PressableProps}>
      <Animated.View style={[$container, { transform: [{ translateX }] }]}>
        <Animated.View
          style={[
            $topBar,
            {
              backgroundColor,
              marginLeft,
              width,
              marginBottom,
              transform: topBarTransform,
            },
          ]}
        />

        <Animated.View style={[$middleBar, { backgroundColor, width: middleWidth }]} />

        <Animated.View
          style={[
            $bottomBar,
            {
              backgroundColor,
              marginLeft,
              width,
              marginTop,
              transform: bottomBarTransform,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
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
