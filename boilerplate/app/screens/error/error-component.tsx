import React, { ErrorInfo } from "react"
import { TextStyle, View, ViewStyle, ScrollView, ImageStyle } from "react-native"
import { color } from "../../theme"
import { Button, Icon, Text } from "../../components"
import { getActiveRouteName, RootNavigation } from "../../navigators"
import { translate } from "../../i18n"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  flex: 1,
  padding: 16,
  backgroundColor: color.background,
}

const VIEW_CONTAIN: ViewStyle = {
  width: "100%",
  maxHeight: "50%",
  backgroundColor: color.line,
  marginVertical: 15,
  padding: 10,
  borderRadius: 6,
}

const BTN_RESET: ViewStyle = {
  paddingHorizontal: 40,
  backgroundColor: color.primary,
}

const TITLE_ERROR: TextStyle = {
  color: color.error,
  fontWeight: "bold",
}

const CONTENT_ERROR: TextStyle = {
  color: color.primary,
  fontWeight: "bold",
}

const CONTENT_BACKTRACE: TextStyle = {
  color: color.primary,
}

const ICON: ImageStyle = {
  marginTop: 30,
  width: 64,
  height: 64,
}

export interface ErrorComponentProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

/**
 * Describe your component here
 */
export const ErrorComponent = (props: ErrorComponentProps) => {
  const getError = () => {
    const name = getActiveRouteName(RootNavigation.getRootState())
    return translate("errorScreen.traceTitle", { name })
  }
  return (
    <View style={CONTAINER}>
      <Icon style={ICON} icon="bug" />
      <Text style={TITLE_ERROR} tx={"errorScreen.title"} />
      <View style={VIEW_CONTAIN}>
        <ScrollView>
          <Text style={CONTENT_ERROR} text={getError()} />
          <Text selectable text={`${props.error}`} />
          <Text style={CONTENT_BACKTRACE} text={`${props.errorInfo.componentStack}`} />
        </ScrollView>
      </View>
      <Button style={BTN_RESET} onPress={props.onReset} tx="errorScreen.reset" />
    </View>
  )
}
