#! /bin/bash
LOGS_BASE=$(grep -rnw './ignite-base/App' -e '\s console.log' | wc -l)
echo 'Warning: console.log() count in ignite-base:' $LOGS_BASE

# Template code should mirror active base project
# Except in the known instances where names differ
# This rule enforces that tempaltes are kept up to date!
ONE_LINE_DIFFERENT=4
# index.android.js
DIFF_COUNT=$(diff ./ignite-base/index.android.js ./ignite-base/index.js.template | wc -l | grep $ONE_LINE_DIFFERENT)
if [[ $DIFF_COUNT -ne ONE_LINE_DIFFERENT ]]; then
  echo 'Base index.android.js does not match index.js.template'
  exit 1
fi
# index.ios.js
DIFF_COUNT=$(diff ./ignite-base/index.ios.js ./ignite-base/index.js.template | wc -l | grep $ONE_LINE_DIFFERENT)
if [[ $DIFF_COUNT -ne ONE_LINE_DIFFERENT ]]; then
  echo 'Base index.ios.js does not match index.js.template'
  exit 1
fi
# package.json
DIFF_COUNT=$(diff ./ignite-base/package.json ./ignite-base/package.json.template | wc -l | grep $ONE_LINE_DIFFERENT)
if [[ $DIFF_COUNT -ne ONE_LINE_DIFFERENT ]]; then
  echo 'Base package.json does not match package.json.template'
  exit 1
fi

# latest
npm i -g babel-eslint
npm i -g standard

# Check base app for standard compliance
standard ./ignite-base/App/**.*
# Check cli for compliance
standard ./ignite-cli/src/**.*
# Check generator for compliance
standard ./ignite-generator/src/**.*
