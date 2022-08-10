import React, { useEffect, useRef } from "react"
import { Animated, Pressable, PressableProps, ViewStyle } from "react-native"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  height: 45,
  justifyContent: "center",
  width: 45,
}

const TOPBAR: ViewStyle = {
  height: 3,
  backgroundColor: "rgb(0,122,255)",
}

const MIDDLEBAR: ViewStyle = {
  height: 3,
  width: 25,
  backgroundColor: "rgb(0,122,255)",
  marginTop: 4,
}

const BOTTOMBAR: ViewStyle = {
  height: 3,
  backgroundColor: "rgb(0,122,255)",
}

export const HamburgerButton = ({ open, ...props }: PressableProps & { open: boolean }) => {
  const animation = useRef(new Animated.Value(0)).current

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -60],
  })

  const topBarRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-50deg"],
  })

  const bottomBarRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "50deg"],
  })

  const marginLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -13],
  })

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [25, 14],
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

  return (
    <Pressable {...props}>
      <Animated.View style={[CONTAINER, { transform: [{ translateX }] }]}>
        <Animated.View
          style={[
            TOPBAR,
            {
              marginLeft,
              width,
              marginBottom,
              transform: [{ rotate: topBarRotation }],
            },
          ]}
        />
        <Animated.View style={MIDDLEBAR} />
        <Animated.View
          style={[
            BOTTOMBAR,
            {
              marginLeft,
              width,
              marginTop,
              transform: [{ rotate: bottomBarRotation }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}
