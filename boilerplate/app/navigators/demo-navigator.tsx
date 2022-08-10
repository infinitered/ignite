import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ComponentsScreen, DemoScreen } from "../screens"

const Tab = createBottomTabNavigator()

export const DemoNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen name="Components" component={ComponentsScreen} />
    <Tab.Screen name="Debug" component={DemoScreen} />
    <Tab.Screen name="Contributing" component={DemoScreen} />
  </Tab.Navigator>
)
