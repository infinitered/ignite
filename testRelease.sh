#! /bin/bash

#################### Running this Script #######################
# Verify Git status is clean
# Verify current git is what you're testing
# Run this with `./testRelease.sh <release version>`
################################################################
echo "#########################################################"
echo '# Test a release of Ignite before actually releasing it #'
echo '#                  ._______.                            #'
echo '#                   | \   / |                           #'
echo '#                .--|.O.|.O.|______.                    #'
echo '#              __).-| = | = |/   \ |                    #'
echo "#              >__) (.'---\`.)Q.|.Q.|--.                 #"
echo '#                    \\___// = | = |-.(__               #'
echo "#                     \`---'( .---. ) (__<               #"
echo "#                           \\\\.-.//                     #"
echo "#                            \`---'                      #"
echo '#########################################################'

if [[ -z $1 ]]; then
  echo 'Must pass release version as parameter'
  exit 1
fi

function test_command {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "👎 👎 👎 👎 👎 👎 👎 👎 - $1 Failed" >&2
    fi
    return $status
}

fire_drill()
{
  echo '~~~🌟 Running Fire Drill'
  test_command ./fireDrill
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
  test_command cd android && ./gradlew assembleRelease && cd -
}

clean_up()
{
  echo '~~~🌟 Cleanup'
  cd ../../
  rm -rf testgrounds
  git checkout -
  git branch -d test_$1
  git push origin --delete test_$1
}

# This is where the magic happens
fire_drill
setup $1
verify_code
check_builds
clean_up $1

# Done
if [ "$?" != "0" ]; then
    echo "~~~👎 Done with errors" 1>&2
    exit 1
else
  echo "~~~👍 Everything looks good!"
fi

# How much time did we save?
times
