import React from "react"
import { ViewStyle, Animated, Easing, TouchableWithoutFeedback } from "react-native"
import { colors } from "../../theme"
import { SwitchProps } from "./switch.props"

// dimensions
const THUMB_SIZE = 30
const WIDTH = 56
const MARGIN = 2
const OFF_POSITION = -0.5
const ON_POSITION = WIDTH - THUMB_SIZE - MARGIN
const BORDER_RADIUS = (THUMB_SIZE * 3) / 4

// colors
const ON_COLOR = colors.tint
const OFF_COLOR = colors.error
const BORDER_ON_COLOR = ON_COLOR
const BORDER_OFF_COLOR = "rgba(0, 0, 0, 0.1)"

// animation
const DURATION = 250

// the track always has these props
const TRACK = {
  height: THUMB_SIZE + MARGIN,
  width: WIDTH,
  borderRadius: BORDER_RADIUS,
  borderWidth: MARGIN / 2,
  backgroundColor: colors.background,
}

// the thumb always has these props
const $thumb: ViewStyle = {
  position: "absolute",
  width: THUMB_SIZE,
  height: THUMB_SIZE,
  borderColor: BORDER_OFF_COLOR,
  borderRadius: THUMB_SIZE / 2,
  borderWidth: MARGIN / 2,
  backgroundColor: colors.background,
  shadowColor: BORDER_OFF_COLOR,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 1,
  shadowRadius: 2,
  elevation: 2,
}

const makeAnimatedValue = (switchOn) => new Animated.Value(switchOn ? 1 : 0)

export function Switch({
  onToggle,
  thumbOffStyle,
  thumbOnStyle,
  trackOnStyle,
  trackOffStyle,
  value,
  ...rest
}: SwitchProps) {
  const [timer] = React.useState<Animated.Value>(makeAnimatedValue(value))
  const startAnimation = React.useMemo(
    () => (newValue: boolean) => {
      const toValue = newValue ? 1 : 0
      const easing = Easing.out(Easing.circle)
      Animated.timing(timer, {
        toValue,
        duration: DURATION,
        easing,
        useNativeDriver: true,
      }).start()
    },
    [timer],
  )

  const [previousValue, setPreviousValue] = React.useState<boolean>(value)
  React.useEffect(() => {
    if (value !== previousValue) {
      startAnimation(value)
      setPreviousValue(value)
    }
  }, [value])

  const handlePress = React.useMemo(() => () => onToggle && onToggle(!value), [onToggle, value])

  if (!timer) {
    return null
  }

  const translateX = timer.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_POSITION, ON_POSITION],
  })

  const trackStyle = [
    TRACK,
    {
      backgroundColor: value ? ON_COLOR : OFF_COLOR,
      borderColor: value ? BORDER_ON_COLOR : BORDER_OFF_COLOR,
    },
    value ? trackOnStyle : trackOffStyle,
  ]

  const thumbStyle = [
    $thumb,
    {
      transform: [{ translateX }],
    },
    value ? thumbOnStyle : thumbOffStyle,
  ]

  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      {...rest}
    >
      <Animated.View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
