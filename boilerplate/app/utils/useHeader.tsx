import React from "react"
import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { Header, HeaderProps } from "../components"

/**
 * A hook to set the header for a screen.
 */
export function useHeader(headerProps: HeaderProps, deps: any[] = []) {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header {...headerProps} />,
    })
  }, deps)
}
