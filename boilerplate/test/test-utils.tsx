import { ReactElement } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { render, RenderOptions } from "@testing-library/react-native"

import { ThemeProvider } from "@/theme"

// This provides a custom renderer function for @testing-library/react-native.
// Use this instead of the default `render` function to ensure that
// the components are wrapped with the necessary providers for the tests to pass.

// Based on The example code here:
// https://testing-library.com/docs/react-testing-library/setup/
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from "@testing-library/react-native"
export { customRender as render }
