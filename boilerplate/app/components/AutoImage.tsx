import React, { useLayoutEffect, useState } from "react"
import { Image, ImageProps, ImageURISource, Platform } from "react-native"

/**
 * An Image component that automatically sizes a remote or data-uri image.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md)
 */
export function AutoImage(props: ImageProps) {
  const source = props.source as ImageURISource

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const uri = Platform.select({
      web: (source?.uri as string) ?? (source as string),
      default: source?.uri as string,
    })

    if (!uri) return

    Image.getSize(uri, (width, height) => setImageSize({ width, height }))
  }, [source?.uri])

  return <Image {...props} style={[imageSize, props.style]} />
}
