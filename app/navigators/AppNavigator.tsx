import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import { OfflineBanner } from '@/components/OfflineBanner';
import { ErrorBoundary } from '@/screens/ErrorScreen/ErrorBoundary';
import { ExampleScreen } from '@/screens/example/ExampleScreen';

import { type AppStackParamList, type NavigationProps } from './navigationTypes';
import { navigationRef, useBackButtonHandler } from './navigationUtilities';

const Stack = createNativeStackNavigator<AppStackParamList>();

const exitRoutes: ReadonlyArray<keyof AppStackParamList> = ['Example'];

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
      initialRouteName="Example"
    >
      <Stack.Screen name="Example" component={ExampleScreen} />
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
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
