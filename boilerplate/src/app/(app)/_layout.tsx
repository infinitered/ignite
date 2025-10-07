import { Redirect, Stack } from "expo-router"

import { Header } from "@/components/Header"
import { useAuth } from "@/context/AuthContext"

export default function AppLayout() {
  const { logout, isAuthenticated } = useAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          header: () => <Header rightTx="common:logOut" onRightPress={logout} />,
        }}
      />
    </Stack>
  )
}
