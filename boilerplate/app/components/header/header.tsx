import React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { HeaderProps } from './header.props'
import { Button } from '../button/button'
import { Text } from '../text/text'
import { spacing, color } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { HEADER_HEIGHT } from '../../utils/features'
import { NativeIcon } from '../native-icon/native-icon'
import { useSafeArea } from 'react-native-safe-area-context'

// static styles
const ROOT: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const BORDER: ViewStyle = {
  position: 'absolute',
  bottom: 0.5,
  left: 0,
  right: 0,
  backgroundColor: color.palette.moreTransparentWhite,
  height: 0.5
}

const CONTENT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: HEADER_HEIGHT,
}

const BACK_BUTTON: ViewStyle = {
  paddingVertical: spacing[2]
}

const TITLE: TextStyle = { textAlign: 'center' }

const MIDDLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center'
}

const LEFT: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center'
}

const RIGHT: ViewStyle = {
  width: 60,
  alignItems: 'flex-end'
}

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    leftType = 'text',
    leftText,
    backText,
    rightType = 'notification',
    style,
    bordered,
    topSafe,
    rightContent
  } = props

  const navigation = useNavigation()

  const insets = useSafeArea()

  const styles: ViewStyle = {
    ...ROOT,
    paddingTop: topSafe ? insets.top : 0
  }

  return (
    <View style={[styles, style]}>
      <View style={CONTENT} >
        <View style={LEFT}>
          {leftType === 'back' &&
            <Button
              onPress={navigation.goBack}
              preset="link"
              style={BACK_BUTTON}
            >
              <NativeIcon
                color={color.palette.offWhite}
                directory="MaterialIcons"
                name="arrow-back-ios"
                size={26}
              />
            </Button>}

          {leftType === 'back' && !!backText &&
            <Text
              marginStart={spacing[4]}
              preset="bigHeader"
              text={backText}
            />}
          {leftType === 'text' &&
            <Text
              preset="bigHeader"
              text={leftText}
            />}
        </View>
        {/* <View style={MIDDLE}>
        <Text
          style={[TITLE, titleStyle]}
          text={header}
        />
      </View> */}
        {rightType !== 'none'  &&
          <View style={RIGHT} >
            {/* {rightType === 'notification' && <NotificationButton />} */}
          </View>}
        {rightContent}
      </View>

      {bordered && <View style={BORDER} />}
    </View>
  )
}
