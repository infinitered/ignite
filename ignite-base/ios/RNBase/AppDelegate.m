/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
// #import "RCTPushNotificationManager.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"RNBase"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// // Required to register for notifications
// - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
// {
//   [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
// }

// // Required for the register event.
// - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
// {
//   [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
// }

// // Required for the notification event.
// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
// {
//   [RCTPushNotificationManager didReceiveRemoteNotification:notification];
// }

// // Required for the localNotification event.
// - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
// {
//   [RCTPushNotificationManager didReceiveLocalNotification:notification];
// }


@end
