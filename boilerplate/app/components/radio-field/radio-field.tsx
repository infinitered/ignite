import React, { useState, useEffect } from 'react'
import { StyleProp, TextStyle, ViewStyle, TouchableOpacity } from 'react-native'
import { Text } from '../'
import { flatten } from 'ramda'
import { View } from '../view/view'
import { ItemValue } from '../../utils/features'
import { Row } from '../row/row'
import { spacing, color } from '../../theme'

const CONTAINER: ViewStyle = {
}

const LABEL: TextStyle = {
  paddingBottom: spacing[1]
}

const RADIO: ViewStyle = {
  width: 18,
  height: 18,
  borderRadius: 18,
  borderWidth: 0.5,
  borderColor: color.palette.black,
  marginEnd: 6
}

const CHECKED_RADIO: ViewStyle = {
  ...RADIO,
  borderWidth: 5,
  borderColor: color.primary
}

const RADIO_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: spacing[3],
  marginEnd: spacing[3],
  marginBottom: spacing[2]
}

export interface RadioFieldProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  data?: ItemValue[]

  value?: ItemValue

  onValueChanged?: (value?: ItemValue) => void

  label?: string

  ref?: any
}

/**
 * Describe your component here
 */
export const RadioField = (props: RadioFieldProps) => {
  const { style, value, data, onValueChanged, label, ref } = props
  const styles = flatten([CONTAINER, style])

  const [currentValue, setCurrentvalue] = useState<ItemValue>(value)

  useEffect(() => {
    setCurrentvalue(value)
  }, [value])

  return (
    <View style={styles}>
      {!!label &&
        <Text
          preset="fieldLabel"
          style={LABEL}
        >{label}</Text>}
      <Row
        flex={1}
        flexWrap="wrap"
        pdH={0}
        pdV={0}
        ref={ref}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={`radio-item-${item.id}`}
            onPress={() => {
              if (onValueChanged) onValueChanged(item)
              setCurrentvalue(item)
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[RADIO_CONTAINER, {
              marginStart: index === 0 ? 0 : spacing[2]
            } ]}
          >
            <View style={item.id === currentValue?.id ? CHECKED_RADIO : RADIO} />
            <Text
              color={color.text}
              text={item.name}
            />
          </TouchableOpacity>)
        )}
      </Row>
    </View>
  )
}
