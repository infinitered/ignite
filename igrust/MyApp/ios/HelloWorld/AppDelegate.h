#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>

@interface AppDelegate : EXAppDelegateWrapper <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
