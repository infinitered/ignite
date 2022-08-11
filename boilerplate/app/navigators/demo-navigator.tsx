import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { DemoComponentsScreen, DemoDebugScreen } from "../screens"
import { AppStackParamList, AppStackScreenProps } from "./app-navigator"

export type DemoTabParamList = {
  DemoComponents: undefined
  DemoDebug: undefined
  DemoContributing: undefined
}

export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="DemoComponents" component={DemoComponentsScreen} />
      <Tab.Screen name="DemoDebug" component={DemoDebugScreen} />
      <Tab.Screen name="DemoContributing" component={DemoDebugScreen} />
    </Tab.Navigator>
  )
}
