# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Ignite is a battle-tested React Native boilerplate and CLI tool developed by Infinite Red. This repository contains the **Ignite CLI** (`ignite-cli` npm package) that generates React Native apps with a comprehensive boilerplate, along with generators for components, screens, and other features.

## Architecture

### Core Structure

- **`/src/`** - Main CLI source code written in TypeScript
  - **`/src/commands/`** - All CLI commands (new, generate, doctor, etc.)
  - **`/src/tools/`** - Utility modules for CLI functionality
  - **`/src/assets/`** - ASCII art and other CLI assets
  - **`src/cli.ts`** - Main CLI entry point using Gluegun framework

- **`/boilerplate/`** - Template React Native app that gets copied to new projects
  - **`/boilerplate/app/`** - Main React Native app source
  - **`/boilerplate/ignite/templates/`** - Generator templates for components/screens

- **`/test/`** - CLI testing infrastructure
- **`/docs/`** - Comprehensive documentation
- **`/bin/ignite`** - CLI executable entry point

### CLI Commands Architecture

The CLI is built on the **Gluegun** framework and follows a command-based architecture:

- **`new`** - Creates new React Native apps from boilerplate
- **`generate`** (alias: `g`) - Generates components, screens, and other features
- **`doctor`** - Diagnoses development environment issues  
- **`remove-demo`** - Removes boilerplate demo code
- **`cache`** - Manages dependency caching for faster installs

### Boilerplate Architecture

Generated React Native apps use this structure:
- **Expo SDK v53** with React Native 0.79
- **TypeScript** throughout
- **React Navigation v7** for navigation
- **MMKV** for persistence
- **apisauce** for API communication
- **Reactotron** for debugging
- **Jest** for testing with **Maestro** for E2E tests

## Development Commands

### CLI Development

```bash
# Build the CLI
yarn build

# Build and watch for changes
yarn build:watch

# Run CLI in development mode
yarn ignite-cli:dev

# Run CLI with production build
yarn ignite-cli:prod

# TypeScript type checking
yarn typecheck
```

### Testing

```bash
# Run all tests
yarn test

# Watch mode for tests
yarn watch

# Debug test watch mode
yarn watch:debug

# Run tests with coverage
yarn coverage
```

### Code Quality

```bash
# Lint code
yarn lint

# Format code
yarn format:write

# Check formatting
yarn format:check
```

### Generated App Commands (Boilerplate)

When working with generated apps, these commands are available:

```bash
# Start development server
yarn start

# Run on iOS/Android
yarn ios
yarn android

# Run tests
yarn test
yarn test:watch

# Run Maestro E2E tests
yarn test:maestro

# Build for different environments
yarn build:ios:dev
yarn build:android:dev
yarn build:ios:prod
yarn build:android:prod

# Compile TypeScript
yarn compile

# Lint generated app
yarn lint
```

### Working with Generators

The CLI includes generators for creating components and other features:

```bash
# Generate a component
npx ignite-cli g component MyComponent

# Generate a screen  
npx ignite-cli g screen MyScreen

# Generate with subdirectory
npx ignite-cli g component folder/MyComponent

# Generate in specific directory
npx ignite-cli g component MyComponent --dir app/components/custom
```

## Key Development Concepts

### Generator Templates
- Templates are stored in `/boilerplate/ignite/templates/`
- Use EJS templating syntax
- Support front matter for configuration
- Can specify target directories and file naming patterns

### Demo Code System
- Boilerplate includes demo code that can be removed
- `remove-demo` command intelligently removes demo-specific code
- Demo dependencies and patches are tracked in `tools/demo.ts`

### Cache System
- CLI can cache `node_modules` to speed up project creation
- Managed through `tools/cache.ts`
- Enabled by default but can be disabled with `--no-cache`

### Validation System
- Comprehensive validation for project names, directories, etc.
- Located in `tools/validations.ts`
- Ensures generated projects follow React Native naming conventions

### React Native Integration
- Deep integration with React Native CLI and Expo tools
- Handles iOS/Android setup, bundle identifiers, etc.
- Located in `tools/react-native.ts`

## Testing Patterns

- **Unit tests** for individual CLI tools and utilities
- **Integration tests** in `/test/vanilla/` that test full app generation
- **Snapshot testing** for generated file outputs
- CLI tests use file system mocking and temporary directories

## Release Process

- Uses **semantic-release** for automated versioning
- Builds are created in `/build/` directory
- Assets are copied during build process
- Published to npm as `ignite-cli`

## Important Files to Understand

- **`src/commands/new.ts`** - Main app generation logic
- **`src/commands/generate.ts`** - Component/screen generation
- **`src/tools/react-native.ts`** - React Native specific utilities
- **`boilerplate/package.json`** - Dependencies for generated apps
- **`template.config.js`** - React Native template configuration
