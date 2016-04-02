# The Navigation System

This file is to explain the navigation system implemented here for ReactNative.

An Example use of the Navigator component can be:
```
  <Navigator
    renderScene={Router.renderScene}
    // Optional
    initialRoute={Routes.OneScreen}
    configureScene={Router.configureScene}
    navigationBar={NavigationBar.render()}
  />
```

initialRoute is what component to show.
renderScene is the switch of how to find what screens to show.
configureScene gives the scene animations.
navigationBar is the component for the nav bar.


