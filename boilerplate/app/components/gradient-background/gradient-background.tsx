import * as React from "react"
import { ViewStyle } from "react-native"
import { View } from "../view/view"

const BG_GRADIENT: ViewStyle = { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }

export interface GradientBackgroundProps {
}

export function GradientBackground(props: GradientBackgroundProps) {
  return <View  style={BG_GRADIENT} />
}
