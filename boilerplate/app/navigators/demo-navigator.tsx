import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Icon } from "../components"
import { DemoComponentsScreen, DemoDebugScreen } from "../screens"
import { colors } from "../theme"
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
        tabBarStyle: {
          marginTop: 11,
          backgroundColor: colors.background,
          borderTopColor: "transparent",
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
      }}
    >
      <Tab.Screen
        name="DemoComponents"
        component={DemoComponentsScreen}
        options={{
          tabBarLabel: "Components",
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />
      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: "Debug",

          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />
      <Tab.Screen
        name="DemoContributing"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
