import { BackHandler, Platform } from "react-native"
import { renderHook } from "@testing-library/react-native"

import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

jest.mock("../utils/storage", () => ({}))

const rootState = {
  stale: false as const,
  type: "stack",
  key: "root",
  index: 0,
  routeNames: ["Welcome"],
  routes: [{ key: "welcome", name: "Welcome" }],
}

describe("useBackButtonHandler", () => {
  let onBackPress: () => boolean | null | undefined
  let canExit: jest.Mock
  let originalOS: typeof Platform.OS

  beforeEach(() => {
    originalOS = Platform.OS
    Platform.OS = "android"
    canExit = jest.fn().mockReturnValue(false)
    jest.spyOn(navigationRef, "isReady").mockReturnValue(true)
    jest.spyOn(navigationRef, "getRootState").mockReturnValue(rootState)
    jest.spyOn(navigationRef, "canGoBack").mockReturnValue(false)
    jest.spyOn(navigationRef, "goBack").mockImplementation(() => {})
    jest.spyOn(BackHandler, "exitApp").mockImplementation(() => {})
    jest.spyOn(BackHandler, "addEventListener").mockImplementation((_event, handler) => {
      onBackPress = handler
      return { remove: jest.fn() }
    })
  })

  afterEach(() => {
    Platform.OS = originalOS
    jest.restoreAllMocks()
  })

  it("leaves the back press unhandled when the navigator has no root state", () => {
    jest.spyOn(navigationRef, "getRootState").mockReturnValue(undefined)
    renderHook(() => useBackButtonHandler(canExit))

    expect(onBackPress()).toBe(false)
    expect(canExit).not.toHaveBeenCalled()
    expect(BackHandler.exitApp).not.toHaveBeenCalled()
    expect(navigationRef.goBack).not.toHaveBeenCalled()
  })

  it("exits from a route that allows exiting", () => {
    canExit.mockReturnValue(true)
    renderHook(() => useBackButtonHandler(canExit))

    expect(onBackPress()).toBe(true)
    expect(canExit).toHaveBeenCalledWith("Welcome")
    expect(BackHandler.exitApp).toHaveBeenCalledTimes(1)
    expect(navigationRef.goBack).not.toHaveBeenCalled()
  })

  it("navigates back when the route does not allow exiting", () => {
    jest.spyOn(navigationRef, "canGoBack").mockReturnValue(true)
    renderHook(() => useBackButtonHandler(canExit))

    expect(onBackPress()).toBe(true)
    expect(canExit).toHaveBeenCalledWith("Welcome")
    expect(navigationRef.goBack).toHaveBeenCalledTimes(1)
    expect(BackHandler.exitApp).not.toHaveBeenCalled()
  })
})
