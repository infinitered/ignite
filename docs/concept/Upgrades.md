## Upgrading

It's important to stay up-to-date with React Native updates. Luckily, we can bank on Expo having done this work for us. If you're letting Expo manage your native code for you, just run the following:

```bash
npx expo install expo@49.0.0
npx expo install --fix
```

And that's it! If you've added native dependencies outside the Expo ecosystem, you'll want to run prebuild again:

```bash
npx expo prebuild --clean --no-install
```

And finally, if you're managing native code yourself, check out these tools:

- [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) great web based tool
- [rn-diff-purge](https://github.com/react-native-community/rn-diff-purge)

It's less important to keep your Ignite app updated, but you might want to keep pace with Infinite Red's latest changes. To do that, [@nirre7](https://github.com/nirre7) built an amazing tool:

- [ignite-diff-purge](https://github.com/nirre7/ignite-diff-purge) To help you see the diffs between different versions. The first diff is from 5.4.1 (ignite-bowser) and then continues with Ignite CLI boilerplate
- [ignite-expo-diff-purge](https://github.com/nirre7/ignite-expo-diff-purge) To help you see the diffs between different versions. The first diff is from 5.4.1 (ignite-bowser with Expo) and then continues with Ignite CLI boilerplate with Expo
- [ignite-bowser-diff-purge](https://github.com/nirre7/ignite-bowser-diff-purge) To help you see the diffs between different versions of the old [ignite-bowser](https://github.com/infinitered/ignite-bowser) boilerplate
