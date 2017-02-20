### Containers Folder
A container is what they call a "Smart Component" in Redux.  It is a component
which knows about Redux.  They are usually used as "Screens".

Also located in here are 2 special containers: `App.js` and `RootContainer.js`.

`App.js` is first component loaded after `index.ios.js` or `index.android.js`.  The purpose of this file is to setup Redux or any other non-visual "global" modules.  Having Redux setup here helps with the hot-reloading process in React Native during development as it won't try to reload your sagas and reducers should your colors change (for example).

`RootContainer.js` is the first visual component in the app.  It is the ancestor of all other screens and components.

You'll probably find you'll have great mileage in Ignite apps without even touching these 2 files.  They, of course, belong to you, so when you're ready to add something non-visual like Firebase or something visual like an overlay, you have spots to place these additions.
