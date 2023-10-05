module.exports = {
  assets: [
    // TODO: link documentation about fonts to this section
    // If you need to add non-google fonts (those not available through the `@expo-google-fonts/**`
    // packages, you can add them to the referenced path below and uncomment this line.
    // "./assets/fonts/"
  ],

  // This prevents FlashList from rendering a large red box.
  // See: https://github.com/reactwg/react-native-new-architecture/discussions/135
  // Remove when FlashList fully supports the new architecture.
  // https://github.com/Shopify/flash-list/pull/550
  //
  project: {
    android: {
      unstable_reactLegacyComponentNames: ["CellContainer", "AutoLayoutView"],
    },
    ios: {
      unstable_reactLegacyComponentNames: ["CellContainer", "AutoLayoutView"],
    },
  },
}
