import React from "react"
import { Image, StyleSheet } from "react-native"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"

const defaultImage = require("./bg.png")
const { flatten } = StyleSheet

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Wallpaper(props: WallpaperProps) {
  // grab the props
  const { preset = "stretch", style: styleOverride, backgroundImage } = props

  // assemble the style
  const presetToUse = presets[preset] || presets.stretch
  const styles = flatten([presetToUse, styleOverride])

  // figure out which image to use
  const source = backgroundImage || defaultImage

  return <Image source={source} style={styles} />
}
