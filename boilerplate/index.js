// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import { AppRegistry } from "react-native"

AppRegistry.registerComponent("HelloWorld", () => App)
export default App
