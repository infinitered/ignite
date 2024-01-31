# Config folder

This file imports configuration objects from either the config.dev.js file or the config.prod.js file depending on whether we are in `__DEV__` mode or not.

Note that we do not gitignore these files. Unlike on web servers, just because these are not checked into your repo doesn't mean that they are secure. In fact, you're shipping a JavaScript bundle with every config variable in plain text. Anyone who downloads your app can easily extract them.

If you doubt this, just bundle your app, and then go look at the bundle and search it for one of your config variable values. You'll find it there.

Read more here: https://reactnative.dev/docs/security#storing-sensitive-info

## config.base.js

This file contains configuration variables that are shared between development and production. For example, we set a `exitRoutes` setting to tell the app which routes should be considered "exit routes" (i.e. routes that the user can exit the app from).

## config.dev.js

This file contains configuration variables that are specific to development. For example, you might want to use a different API URL for development than you do for production.

## config.prod.js

This file contains configuration variables that are specific to production.
