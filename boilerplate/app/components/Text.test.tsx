import React from "react"
// eslint-disable-next-line no-restricted-imports
import { Text as RNText, StyleSheet } from "react-native"
import { render } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import { lightTheme } from "@/theme"

import { Text } from "./Text"

/* This is an example component test using react-native-testing-library. For more
 * information on how to write your own, see the documentation here:
 * https://callstack.github.io/react-native-testing-library/ */
const testText = "Test string"

describe("Text", () => {
  it("should render the component", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Text text={testText} />
      </NavigationContainer>,
    )
    expect(getByText(testText)).toBeDefined()
  })

  it("should render the component with a heading preset", () => {
    const { getByText } = render(
      <NavigationContainer>
        <Text text={testText} preset="heading" />
      </NavigationContainer>,
    )
    const component = getByText(testText)
    expect(component).toBeDefined()
    expect(component).toBeOnTheScreen()

    const style = component.props.style
    const collapsedStyle = StyleSheet.flatten(style)
    expect(collapsedStyle).toMatchObject({
      fontSize: 36,
      lineHeight: 44,
      fontFamily: "spaceGroteskBold",
      color: lightTheme.colors.text,
    })
  })

  it("should be able to pass a ref", () => {
    const ref = React.createRef<RNText | null>()
    expect(ref.current).toBeNull()

    const { getByText } = render(
      <NavigationContainer>
        <Text text={testText} ref={ref} />
      </NavigationContainer>,
    )
    expect(getByText(testText)).toBeDefined()
    expect(ref.current).toBeDefined()

    // Our ref should have the testText as its only child
    expect(ref.current?.props?.children).toBe(testText)
  })
})
