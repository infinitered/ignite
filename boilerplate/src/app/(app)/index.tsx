import { Redirect } from "expo-router"

export default function Index() {
  // Main app entry point is welcome screen so redirect to it
  return <Redirect href="/(app)/welcome" />
}
