#!/usr/bin/env bash
# One-shot post-clone setup. Idempotent — safe to run multiple times.

set -euo pipefail

echo "→ Enabling corepack…"
corepack enable

echo "→ Installing dependencies…"
pnpm install --frozen-lockfile

echo "→ Initializing husky hooks…"
pnpm husky

if [ ! -f .env.local ]; then
  echo "→ Creating .env.local from template…"
  cp .env.example .env.local
  echo "  ⚠️  Edit .env.local with your project's keys before running pnpm ios."
else
  echo "→ .env.local already exists, leaving alone."
fi

echo
echo "✓ Setup complete."
echo
echo "Next steps:"
echo "  1. Edit .env.local with SENTRY_DSN, POSTHOG keys, EXPO_PUBLIC_API_URL."
echo "  2. Rename the app:    pnpm rename MyApp --bundle-id com.your.app"
echo "  3. Boot the dev sim:  pnpm ios   (or pnpm android)"
echo "  4. Generate features: pnpm gen feature Profile"
