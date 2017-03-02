# App Templates

You can use an app template as the starting point for your app by creating a new
Ignite project with the `--template` flag:

```
ignite new MyIgniteApp --template {app template name}
```

Ignite 2.0 ships with two app templates:

- `Empty`: Creates an app containing nothing but the minimum requirements to make
your app compatible with React: `package.json`, and `index.js`.

- `Infinite Red App Template`: Creates your app with a host of opinions and
options. This template reflects the way that we at Infinite Red prefer to start
our apps. This is also Ignite's default template; if you don't select a
template, Ignite will use this.

You can select `Empty` with the shortcut `--empty` instead of the `--template` flag.
