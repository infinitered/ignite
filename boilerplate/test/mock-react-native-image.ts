import * as ReactNative from "react-native"
import mockFile from "./mock-file"

jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn((
          uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
          success: (width: number, height: number) => void,
          failure?: (error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
        ) => success(100, 100)),
      },
    },
    ReactNative,
  )
})
