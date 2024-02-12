---
title: .maestro
sidebar_position: 2
---

# Maestro

Ignite's demo project includes a `.maestro` directory with a few example test flows. [Maestro](https://maestro.mobile.dev/) is Ignite's default end-to-end testing solution.

If you have Maestro setup, you can run your tests via

```bash
maestro test .maestro/MyTestFile.yaml
```

This command is also setup as a npm script in `package.json`, which you can customize to your liking:

```bash
yarn run test:maestro
```

You can learn how to run and create Maestro tests by following the [Ignite Cookbook Recipe](https://ignitecookbook.com/docs/recipes/MaestroSetup) or by visiting [Maestro's Documentation](https://maestro.mobile.dev/)
