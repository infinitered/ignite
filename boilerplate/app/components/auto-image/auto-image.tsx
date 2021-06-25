import React, { useLayoutEffect, useState } from "react"
import {
  Image as RNImage,
  ImageProps as DefaultImageProps,
  ImageURISource,
  Platform,
} from "react-native"

type ImageProps = DefaultImageProps & {
  source: ImageURISource
}

/**
 * An Image wrapper component that autosizes itself to the size of the actual image.
 * You can always override by passing a width and height in the style.
 * If passing only one of width/height this image component will use the actual
 * size of the other dimension.
 *
 * This component isn't required, but is provided as a convenience so that
 * we don't have to remember to explicitly set image sizes on every image instance.
 *
 * To use as a stand-in replacement import { AutoImage as Image } and remove the
 * Image import from react-native. Now all images in that file are handled by this
 * component and are web-ready if not explicitly sized in the style property.
 */
export function AutoImage(props: ImageProps) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (props.source?.uri) {
      RNImage.getSize(props.source.uri as any, (width, height) => {
        setImageSize({ width, height })
      })
    } else if (Platform.OS === "web") {
      // web requires a different method to get it's size
      RNImage.getSize(props.source as any, (width, height) => {
        setImageSize({ width, height })
      })
    } else {
      const { width, height } = RNImage.resolveAssetSource(props.source)
      setImageSize({ width, height })
    }
  }, [])

  return <RNImage {...props} style={[imageSize, props.style]} />
}
