#! /bin/bash
#########################################################
# Test a release of Ignite before actually releasing it #
#                  ._______.                            #
#                   | \   / |                           #
#                .--|.O.|.O.|______.                    #
#              __).-| = | = |/   \ |                    #
#              >__) (.'---`.)Q.|.Q.|--.                 #
#                    \\___// = | = |-.(__               #
#                     `---'( .---. ) (__<               #
#                           \\.-.//                     #
#                            `---'                      #
#########################################################

if [[ -z $1 ]]; then
  echo 'Must pass release version as parameter'
  exit 1
fi

function test_command {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "$1 Failed" >&2
    fi
    return $status
}

setup()
{
  echo '~~~🌟 Setting up branch'
  git branch -d test_$1
  git checkout -b test_$1
  git push origin test_$1
  cd ignite-generator
  test_command npm link
  cd ../ignite-cli
  test_command npm link
  cd ../
  mkdir testgrounds
  cd testgrounds

  echo '~~~🌟 Creating project from branch'
  test_command ignite n TestProj --branch test_$1
  cd TestProj
}

verify_code()
{
  echo '~~~🌟 Checking Code'
  test_command standard App/
  test_command npm test
}

check_builds()
{
  echo '~~~🌟 Checking Builds'

  if [ ! -d "android" ]; then
    echo 'Android folder did not generate'
    exit 1
  fi

  if [ ! -d "ios" ]; then
    echo 'ios folder did not generate'
    exit 1
  fi

  echo '~ Build ios'
  test_command react-native bundle --entry-file index.ios.js --bundle-output test.ios.js

  echo '~ Build android'
  test_command react-native bundle --entry-file index.android.js --bundle-output test.android.js
}

clean_up()
{
  cd ../../
  rm -rf testgrounds
  git branch -d test_$1
  git push origin --delete test_$1
}

# This is where the magic happens
setup $1
verify_code
check_builds
clean_up $1
# How much time did we save?
times
