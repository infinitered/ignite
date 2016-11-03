#! /bin/bash

SOMETHING_FAILED=0
function test_command {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "👎 👎 👎 👎 👎 👎 👎 👎 - $1 Failed" >&2
        SOMETHING_FAILED=1
    fi
    return $status
}

show_warnings()
{
  LOGS_BASE=$(grep -rnw './ignite-base/App' -e '\s console.log' | wc -l)
  if [[ $LOGS_BASE -gt 0 ]]; then
    echo 'Warning: console.log() count in ignite-base:' $LOGS_BASE
  fi
}

enforce_templates()
{
  # Template code should mirror active base project
  # Except in the known instances where names differ
  # This rule enforces that templates are kept up to date!
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
}

enforce_versions()
{
  # ignite generator version
  CURRENT_VERSION=$(node -e "var o = require('./ignite-generator/package.json'); console.log(o.version);")

  # verify version is in index
  grep -q 'lockedIgniteVersion.*'$CURRENT_VERSION ignite-generator/src/app/index.es
  if [[ $? -ne 0 ]]; then
    echo 'ignite-generator/src/app/index.es:lockedIgniteVersion does not match' $CURRENT_VERSION
    exit 1
  fi

  # verify version is in CLI
  grep -q 'version.*'$CURRENT_VERSION ignite-cli/package.json
  if [[ $? -ne 0 ]]; then
    echo 'ignite-cli/package.json:version does not match' $CURRENT_VERSION
    exit 1
  fi
}

lint()
{
  # latest eslint plz
  npm i -g babel-eslint

  # install standard if needed
  which standard
  if [[ $? -ne 0 ]]; then
    npm i -g standard
  fi
  # Check cli for compliance
  test_command standard ./ignite-cli/src/**.*
  # Check generator for compliance
  test_command standard ./ignite-generator/src/**.*

  # Run checks specific to ignite-base
  cd ./ignite-base

  # Check base app for standard compliance
  test_command standard ./App/**.*

  # Return to root directory
  cd ..
}

flow_type_check()
{
  # Run checks specific to ignite-base
  cd ./ignite-base

  # Ensure flow installed
  npm install flow-bin

  # Check base app for flow compliance
  test_command npm run flow

  # Return to root directory
  cd ..
}

show_warnings
enforce_templates
enforce_versions
lint
flow_type_check

# Done
if [ "$SOMETHING_FAILED" != "0" ]; then
  echo "~~~👎 Done with errors" 1>&2
  exit 1
else
  echo "~~~👍 Everything looks good!"
  # depends on $SECONDS being part of sh
  printf '%dh:%dm:%ds\n' $(($SECONDS/3600)) $(($SECONDS%3600/60)) $(($SECONDS%60))
  exit 0
fi
