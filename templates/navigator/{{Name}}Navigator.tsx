import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { {{Name}}Screen } from '@/screens/{{kebab-name}}/{{Name}}Screen';

export type {{Name}}NavigatorParamList = {
  {{Name}}: undefined;
  // TODO: nested routes
};

const Stack = createNativeStackNavigator<{{Name}}NavigatorParamList>();

/**
 * Sub-stack for the {{name}} feature. Mount inside the AppNavigator if
 * you need a multi-screen flow (e.g., wizard, drill-down).
 */
export function {{Name}}Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="{{Name}}" component={{Name}}Screen} />
    </Stack.Navigator>
  );
}
