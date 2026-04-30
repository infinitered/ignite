import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { env } from '@/config/env';
import { logger } from '@/lib/logger';

/**
 * Push notification scaffolding. Call `registerForPushNotifications()`
 * after the user has consented (NOT on app launch).
 *
 * Returns the EAS push token to send to your backend, or `null` if
 * permission was denied or running on a simulator.
 */
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    logger.warn('[push] Push notifications require a physical device');
    return null;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let status = existing;
  if (existing !== 'granted') {
    const result = await Notifications.requestPermissionsAsync();
    status = result.status;
  }
  if (status !== 'granted') {
    logger.warn('[push] Permission denied');
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const projectId = env.EXPO_PUBLIC_EAS_PROJECT_ID;
  if (!projectId) {
    logger.warn('[push] EXPO_PUBLIC_EAS_PROJECT_ID not configured');
    return null;
  }

  const token = await Notifications.getExpoPushTokenAsync({ projectId });
  return token.data;
}

/** Set the in-app behavior for foreground notifications. */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
