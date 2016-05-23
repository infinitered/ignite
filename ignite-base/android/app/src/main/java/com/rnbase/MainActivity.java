package com.rnbase;

import android.content.Intent;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactActivity;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "RNBase";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this); // <------ Initialize the Package
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativeI18n(),
            new VectorIconsPackage(),
            new RNDeviceInfo(),
            mReactNativePushNotificationPackage
        );
    }

    // Add onNewIntent
    @Override
    protected void onNewIntent (Intent intent) {
      super.onNewIntent(intent);

      mReactNativePushNotificationPackage.newIntent(intent);
    }

}
