import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { OfflineBanner } from '@/components/OfflineBanner';
import { ErrorBoundary } from '@/screens/ErrorScreen/ErrorBoundary';
// @demo remove-block
import { ExampleScreen } from '@/screens/example/ExampleScreen';
// @demo remove-block-end

import type { AppStackParamList, NavigationProps } from './navigationTypes';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

const Stack = createNativeStackNavigator<AppStackParamList>();

const exitRoutes: ReadonlyArray<keyof AppStackParamList> = [
  // @demo remove-block
  'Example',
  // @demo remove-block-end
];

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
      // @demo remove-block
      initialRouteName="Example"
      // @demo remove-block-end
    >
      {/* @demo remove-block */}
      <Stack.Screen name="Example" component={ExampleScreen} />
      {/* @demo remove-block-end */}
    </Stack.Navigator>
  );
}

export function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName as keyof AppStackParamList));

  return (
    <View className="flex-1 bg-background">
      <NavigationContainer ref={navigationRef} {...props}>
        <ErrorBoundary catchErrors="always">
          <OfflineBanner />
          <AppStack />
        </ErrorBoundary>
      </NavigationContainer>
    </View>
  );
}
