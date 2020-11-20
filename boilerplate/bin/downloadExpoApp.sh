#!/bin/bash -e

# taken from https://github.com/expo/with-detox-tests/blob/master/setup.sh

# query expo.io to find most recent ipaUrl
IPA_URL=`curl --silent --show-error https://expo.io/--/api/v2/versions |  python -c 'import sys, json; print json.load(sys.stdin)["iosUrl"]'`

# download tar.gz
TMP_PATH=./exponent.tar.gz
curl --silent --show-error --output $TMP_PATH $IPA_URL

# recursively make app dir
APP_PATH=./bin/Exponent.app
mkdir -p $APP_PATH

# unzip tar.gz into APP_PATH
tar -C $APP_PATH -xzf $TMP_PATH
rm ./exponent.tar.gz
