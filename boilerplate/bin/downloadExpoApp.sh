#!/bin/bash -e

# based on https://github.com/yaron1m/expo-detox-typescript-example/blob/master/scripts/dl_expo_bins
APP_PATH=./bin/Exponent.app

if [ ! -d $APP_PATH ]; then
  # query expo.io to find most recent ipaUrl
  IPA_URL=`curl --silent --show-error https://expo.io/--/api/v2/versions |  python -c 'import sys, json; print json.load(sys.stdin)["iosUrl"]'`

  # download tar.gz
  TMP_PATH=./exponent.tar.gz
  curl --silent --show-error --output $TMP_PATH $IPA_URL

  # recursively make app dir
  mkdir -p $APP_PATH

  # unzip tar.gz into APP_PATH
  tar -C $APP_PATH -xzf $TMP_PATH
  rm ./exponent.tar.gz
fi
