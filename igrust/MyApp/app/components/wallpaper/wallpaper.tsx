import React from "react"
import { AutoImage as Image } from "../auto-image/auto-image"
import { presets } from "./wallpaper.presets"
import { WallpaperProps } from "./wallpaper.props"

const defaultImage = require("./bg.png")

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
  const styles = [presetToUse, styleOverride]

  // figure out which image to use
  const source = backgroundImage || defaultImage

  return <Image source={source} style={styles} />
}
