import { useLayoutEffect, useState } from "react"
import { Image, ImageProps, ImageURISource, Platform, PixelRatio } from "react-native"

export interface AutoImageProps extends ImageProps {
  /**
   * How wide should the image be?
   */
  maxWidth?: number
  /**
   * How tall should the image be?
   */
  maxHeight?: number
  headers?: {
    [key: string]: string
  }
}

/**
 * A hook that will return the scaled dimensions of an image based on the
 * provided dimensions' aspect ratio. If no desired dimensions are provided,
 * it will return the original dimensions of the remote image.
 *
 * How is this different from `resizeMode: 'contain'`? Firstly, you can
 * specify only one side's size (not both). Secondly, the image will scale to fit
 * the desired dimensions instead of just being contained within its image-container.
 * @param {number} remoteUri - The URI of the remote image.
 * @param {number} dimensions - The desired dimensions of the image. If not provided, the original dimensions will be returned.
 * @returns {[number, number]} - The scaled dimensions of the image.
 */
export function useAutoImage(
  remoteUri: string,
  headers?: {
    [key: string]: string
  },
  dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0])
  const remoteAspectRatio = remoteWidth / remoteHeight
  const [maxWidth, maxHeight] = dimensions ?? []

  useLayoutEffect(() => {
    if (!remoteUri) return

    if (!headers) {
      Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]))
    } else {
      Image.getSizeWithHeaders(remoteUri, headers, (w, h) => setRemoteImageDimensions([w, h]))
    }
  }, [remoteUri, headers])

  if (Number.isNaN(remoteAspectRatio)) return [0, 0]

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight)
    return [
      PixelRatio.roundToNearestPixel(remoteWidth * aspectRatio),
      PixelRatio.roundToNearestPixel(remoteHeight * aspectRatio),
    ]
  } else if (maxWidth) {
    return [maxWidth, PixelRatio.roundToNearestPixel(maxWidth / remoteAspectRatio)]
  } else if (maxHeight) {
    return [PixelRatio.roundToNearestPixel(maxHeight * remoteAspectRatio), maxHeight]
  } else {
    return [remoteWidth, remoteHeight]
  }
}

/**
 * An Image component that automatically sizes a remote or data-uri image.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/AutoImage/}
 * @param {AutoImageProps} props - The props for the `AutoImage` component.
 * @returns {JSX.Element} The rendered `AutoImage` component.
 */
export function AutoImage(props: AutoImageProps) {
  const { maxWidth, maxHeight, ...ImageProps } = props
  const source = props.source as ImageURISource
  const headers = source?.headers

  const [width, height] = useAutoImage(
    Platform.select({
      web: (source?.uri as string) ?? (source as string),
      default: source?.uri as string,
    }),
    headers,
    [maxWidth, maxHeight],
  )

  return <Image {...ImageProps} style={[{ width, height }, props.style]} />
}
