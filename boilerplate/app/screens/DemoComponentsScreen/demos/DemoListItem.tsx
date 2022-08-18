/* eslint-disable react/jsx-key */
import React from "react"
import { View } from "react-native"
import { ListItem } from "../../../components"
import { Demo } from "../DemoComponentsScreen"
import { DemoUseCase } from "../DemoUseCase"

export const DemoListItem: Demo = {
  name: "ListItem",
  description: "An Image component that automatically sizes a remote or data-uri image.",
  data: [
    <DemoUseCase name="Remote URI">
      <ListItem topSeparator bottomSeparator rightIcon="ladybug">
        Deserunt ad ut adipisicing
      </ListItem>

      <ListItem
        bottomSeparator
        leftIcon="ladybug"
        rightIcon="ladybug"
        leftIconColor="red"
        rightIconColor="red"
      >
        Incididunt enim tempor dolor ad elit esse aliqua eiusmod ullamco eiusmod cupidatat
        consequat.
      </ListItem>

      <ListItem
        bottomSeparator
        LeftActionComponent={
          <View style={{ backgroundColor: "red", width: 50, height: 100, marginRight: 20 }}></View>
        }
        RightActionComponent={
          <View style={{ backgroundColor: "red", width: 50, height: 100, marginLeft: 16 }}></View>
        }
      >
        Incididunt enim tempor dolor
      </ListItem>
    </DemoUseCase>,
  ],
}
