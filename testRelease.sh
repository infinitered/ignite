#! /bin/bash

#################### Running this Script #######################
# Verify Git status is clean
# Verify current git is what you're testing
# Run this with `./testRelease.sh <release version>`
#
# If you'd like to test Ignite against FB Master branch
# Run with 2nd param latest `./testRelease.sh fb_check latest`
################################################################
if [[ -z $1 ]]; then
  echo 'Must pass release version as parameter'
  exit 1
fi

SOMETHING_FAILED=0
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

# Runs command and on failure turns on the SOMETHING_FAILED flag
function test_command {
    "$@"
    local status=$?
    if [ $status -ne 0 ]; then
        echo "👎 👎 👎 👎 👎 👎 👎 👎 - $1 Failed" >&2
        SOMETHING_FAILED=1
    fi
    return $status
}

fire_drill()
{
  echo '~~~🌟 Running Fire Drill'
  test_command ./fireDrill.sh
}

setup()
{
  echo '~~~🌟 Linking local for Testing'
  cd ignite-generator
  test_command npm link
  cd ../ignite-cli
  test_command npm link
  cd ../
  mkdir testgrounds
  cd testgrounds
  # Check flag to see if we're testing RN latest against FB latest
  if [[ $2 = "latest" ]]; then
    echo '~~~🌟 Testing Master vs Facebook Latest'
    test_command npm install -g react-native-cli
    test_command ignite n TestProj --branch master --latest
  else
    echo '~~~🌟 Setting up branch'
    git branch -d test_$1
    git checkout -b test_$1
    git push origin test_$1

    echo '~~~🌟 Creating project from branch'
    test_command ignite n TestProj --branch test_$1
  fi

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
    SOMETHING_FAILED=1
  fi

  if [ ! -d "ios" ]; then
    echo 'ios folder did not generate'
    SOMETHING_FAILED=1
  fi

  echo '~ Build ios'
  test_command react-native bundle --entry-file index.ios.js --bundle-output test.ios.js

  echo '~ Build android'
  # A failed android build will not exit with a non-zero return!
  # This makes it a bit trickier to test for - look for the fail message instead
  cd android
  ./gradlew assembleRelease | grep -q 'BUILD FAILED'
  if [[ $? -eq 0 ]]; then
    echo 'Android build failed'
    SOMETHING_FAILED=1
  fi
  cd -
}

clean_up()
{
  echo '~~~🌟 Cleanup'
  cd ../../
  rm -rf testgrounds
  if [[ -z $2 ]]; then
    git checkout -
    git branch -d test_$1
    git push origin --delete test_$1
  fi
}

# This is where the magic happens
fire_drill
setup $1 $2
verify_code
check_builds
clean_up $1 $2

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
