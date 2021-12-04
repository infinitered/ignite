/* eslint-disable */
import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { AutoImage } from "./auto-image"

declare let module

const bowser = require("../../screens/welcome/bowser.png")
const morty = { uri: "https://rickandmortyapi.com/api/character/avatar/2.jpeg" }

storiesOf("AutoImage", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="With require()">
        <AutoImage source={bowser} />
        <AutoImage source={bowser} style={{ width: 150 }} />
        <AutoImage source={bowser} style={{ width: 150, height: 150 }} />
        <AutoImage source={bowser} style={{ height: 150 }} />
        <AutoImage source={bowser} style={{ height: 150, resizeMode: "contain" }} />
      </UseCase>
      <UseCase text="With URL">
        <AutoImage source={morty} />
        <AutoImage source={morty} style={{ width: 150 }} />
        <AutoImage source={morty} style={{ width: 150, height: 150 }} />
        <AutoImage source={morty} style={{ height: 150 }} />
        <AutoImage source={morty} style={{ height: 150, resizeMode: "contain" }} />
      </UseCase>
    </Story>
  ))
