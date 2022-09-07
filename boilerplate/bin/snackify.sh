#!/usr/bin/env bash
#
# Setup Script
#
 

if [[ -z $(git status -s) ]]
then
 if [[ "$(git name-rev --name-only HEAD)" =~ snack ]]; 
then
    echo 
else
    echo "Creating a new branch for your snack"
    echo $(git checkout -b snack-$(date +'%m%d%y'))
    
fi
else
  echo "There are uncommitted changes in your current branch, please commit changes before running this"
  exit
fi

echo "This command will create an expo snack project for you. 
This can be exported to an expo snack for you to test and play with your app. 
In order to snackify(an expo snack) this project, we must delete:
- /ios
- /android
- /e2e
- /test
- /app/services/reactotron
- jest.config.js
- metro.config.js
- webpack.config.js
"

read -p "Do you wish to continue? " -n 1 -r
echo    # move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # let's do some stuff
    rm -rf ios android e2e test jest.config.js metro.config.js webpack.config.js
    rm -rf ./app/services/reactotron
    mkdir ./app/services/reactotron && cd ./app/services/reactotron
    touch index.ts
    echo "/**
 * This file is loaded for snack to resolve Reactotron for expo snack
 **/
    export const setupReactotron = (arg1:any) => null
    export const setReactotronRootStore=(arg1:any, arg2:any)=>null" > index.ts
    yarn add expo-constants@~13.2.4 expo-localization@~13.1.0 expo-modules-core@~0.11.4 expo-splash-screen@~0.16.2 react-native-screens@~3.15.0 @react-native-async-storage/async-storage@~1.17.3
    yarn remove @expo/webpack-config reactotron-react-native detox detox-expo-helpers ts-jest jest metro-config @rnx-kit/metro-config reactotron-mst reactotron-react-js reactotron-core-client
fi
