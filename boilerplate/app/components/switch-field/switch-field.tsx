import React, { useState, useEffect } from 'react'
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native'
// import ToggleSwitch from 'toggle-switch-react-native'
import { Text } from '../'
import { flatten } from 'ramda'
import { color } from '../../theme'

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const LABEL: TextStyle = {
}

export interface SwitchFieldProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  label?: string

  value?: boolean

  onToggle?: () => void

  ref?: any

  size?: 'large' | 'medium' | 'small'
}

/**
 * Describe your component here
 */
export const SwitchField = (props: SwitchFieldProps) => {
  const { style, label, value, onToggle, ref, size } = props
  const styles = flatten([CONTAINER, style])

  const [currentValue, setCurrentValue] = useState<boolean>(value)

  useEffect(() => {
    setCurrentValue(value)
  }, [value])

  return (
    <View
      ref={ref}
      style={styles}
    >
      {!!label &&
        <Text
          preset="fieldLabel"
          style={LABEL}
        >{label}</Text>}
      {/* <ToggleSwitch
        isOn={currentValue}
        offColor={color.palette.lightGrey}
        onColor={color.secondaryLighter}
        onToggle={() => {
          setCurrentValue(!currentValue)
          if (onToggle) onToggle()
        }}
        size={size}
      /> */}
    </View>
  )
}
