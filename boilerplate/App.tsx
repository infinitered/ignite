import "@expo/metro-runtime"
import * as SplashScreen from "expo-splash-screen"
import App from "@/app"

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default IgniteApp
