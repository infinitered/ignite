import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoComponentsScreen, DemoDebugScreen } from "../screens"
import { colors, typography } from "../theme"
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
        tabBarStyle: $tabBar,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
      }}
    >
      <Tab.Screen
        name="DemoComponents"
        component={DemoComponentsScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="debug" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoContributing"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.communityTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="community" style={{ tintColor: focused && colors.tint }} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  marginTop: 11,
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
}
