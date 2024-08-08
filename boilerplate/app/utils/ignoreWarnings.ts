/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
import { LogBox } from "react-native"

// prettier-ignore
LogBox.ignoreLogs([
  "Require cycle:",
  "Overriding previous layout animation with new one before the first began:",
])
