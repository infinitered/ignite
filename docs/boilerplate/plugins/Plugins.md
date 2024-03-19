## `app/plugins` Directory in Ignite Apps

The `app/plugins` directory is a dedicated space within the Ignite boilerplate for managing Expo Config Plugins. These plugins are used to customize the native configuration of your app without altering the native code directly.

### Adding Custom Plugins

To add a custom plugin:

1. **Create a Plugin**: In `app/plugins`, define your plugin in a TypeScript file, exporting a function that modifies the ExpoConfig.
2. **Integrate the Plugin**: In `app.config.ts`, import your plugin and add it to the `plugins` array.

Example:

```typescript
// In app.config.ts
plugins: [...existingPlugins, require("./plugins/yourCustomPlugin").yourCustomPlugin]
```

## Key Points

- Config plugins extend app configuration, automating native module integration.
- Create plugins in `app/plugins` and add them to `app.config.ts`.
- For complex setups, refer to mods but use them with caution.

For detailed information on creating and using config plugins, refer to [Expo's Config Plugins documentation](https://docs.expo.dev/config-plugins/introduction/).
