import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon } from "../../app/components"
import { Button } from "../../app/components/Button"
import { Text } from "../../app/components/Text"
import { colors, typography } from "../../app/theme"
import { Story, StoryScreen, UseCase } from "../views"

declare let module

const $iconStyle: ImageStyle = { width: 30, height: 30 }
const $customButtonStyle: ViewStyle = { backgroundColor: colors.palette.angry, height: 100 }
const $customButtonPressedStyle: ViewStyle = { backgroundColor: colors.palette.angry }
const $customButtonTextStyle: TextStyle = {
  color: colors.palette.angry,
  fontFamily: typography.primary.bold,
  textDecorationLine: "underline",
  textDecorationColor: colors.palette.angry,
}
const $customButtonPressedTextStyle: TextStyle = { color: colors.palette.neutral100 }
const $customButtonRightAccessoryStyle: ViewStyle = {
  width: "53%",
  height: "200%",
  backgroundColor: colors.palette.angry,
  position: "absolute",
  top: 0,
  right: 0,
}
const $customButtonPressedRightAccessoryStyle: ImageStyle = { tintColor: colors.palette.neutral100 }

storiesOf("Button", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Presets", () => (
    <Story>
      <UseCase text="Default" usage="Used as a primary button.">
        <Button>Cillum Eu Laboris In Labore</Button>
      </UseCase>

      <UseCase text="Filled" usage="Used as a secondary button.">
        <Button preset="filled">Nulla Tempor Laboris Ex</Button>
      </UseCase>

      <UseCase text="Reversed" usage="A more prominent button with contrast.">
        <Button preset="reversed">Incididunt Laborum Ad Ipsum</Button>
      </UseCase>
    </Story>
  ))
  .add("Passing Content", () => (
    <Story>
      <UseCase
        text="Via `text` Prop"
        usage="Used when you want to pass a value but don't want to open a child."
      >
        <Button text="Billum In Aute Fugiat" />
      </UseCase>

      <UseCase text="Via `tx` Prop" usage="Used for looking up i18n keys.">
        <Button tx="storybook.loremButton" />
      </UseCase>

      <UseCase
        text="Children"
        usage="Used like you would normally use a React Native <Text> component."
      >
        <Button>Aliqua Velit Irure Reprehenderit</Button>
      </UseCase>

      <UseCase
        text="Right Accessory"
        usage="Adds an additional component to the right of the text."
      >
        <Button
          preset="filled"
          RightAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="bug" />
          )}
        >
          Duis Quis Duis
        </Button>
      </UseCase>

      <UseCase text="Left Accessory" usage="Adds an additional component to the left of the text.">
        <Button
          preset="filled"
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="bug" />
          )}
        >
          Duis Proident Incididunt
        </Button>
      </UseCase>

      <UseCase
        text="Nested Text Children"
        usage="Since <Text /> supports other nested <Text />, this is allowed here too."
      >
        <Button>
          <Text>
            <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
            {` `}
            <Text preset="default">
              Ullamco cupidatat officia exercitation velit non ullamco nisi..
            </Text>
            {` `}
            <Text preset="bold">Occaecat aliqua irure proident veniam.</Text>
          </Text>
        </Button>
      </UseCase>

      <UseCase
        text="Multiline"
        usage="The button is multiline by default and will try to fit any content and accessories nicely."
      >
        <Button
          preset="reversed"
          RightAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="bug" />
          )}
          LeftAccessory={(props) => (
            <Icon containerStyle={props.style} style={$iconStyle} icon="bug" />
          )}
        >
          Nostrud nulla consequat veniam veniam reprehenderit. Fugiat id nisi quis duis sunt
          proident mollit dolor mollit adipisicing proident deserunt.
        </Button>
      </UseCase>
    </Story>
  ))
  .add("Styling", () => (
    <Story>
      <UseCase text="Style the Button's container">
        <Button style={$customButtonStyle}>Consectetur Reprehenderit Exercitation</Button>
      </UseCase>

      <UseCase text="Style the Button's text">
        <Button preset="filled" textStyle={$customButtonTextStyle}>
          Magna Cupidatat Ea Anim
        </Button>
      </UseCase>

      <UseCase text="Style the accessories">
        <Button
          preset="reversed"
          RightAccessory={() => <View style={$customButtonRightAccessoryStyle} />}
        >
          Commodo pariatur et enim ea id fugiat anim ad.
        </Button>
      </UseCase>

      <UseCase text="Change the pressed state styles">
        <Button
          pressedStyle={$customButtonPressedStyle}
          pressedTextStyle={$customButtonPressedTextStyle}
          RightAccessory={(props) => (
            <Icon
              containerStyle={props.style}
              style={[
                $iconStyle,
                props.pressableState.pressed && $customButtonPressedRightAccessoryStyle,
              ]}
              icon="bug"
            />
          )}
        >
          Ea Id Fugiat Anim Ad
        </Button>
      </UseCase>
    </Story>
  ))
