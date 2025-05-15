# Welcome to the Spacebox Application!

## Overview

The Spacebox application is a mobile application that allows users to manage their items. It involves two screens:

- The Login screen, where users can log in to their account.
- The Home screen, where users can view their items, add new items, and remove items.

Optionally, it involves a backend application that allows users to manage their items using a REST API. The backend application is built using Node.js and Express, and it uses PostgreSQL as the database. The backend application is exposed to the internet using ngrok, which allows users to access it from anywhere. The backend application can be disabled through the configuration file in app/config.

For ease of use, the user id is hardcoded in the application and the application doesn't implement any authentication mechanism (e.g JWT, OAuth, etc.).

The mobile application is built using React Native and Expo and has been tested **on iOS only.**

The application is translated into English and Traditional Chinese. The language is set based on the device's language settings. If the device's language is not supported, the application will default to English.

## Setup the application

Make sure you run the Node.js version 22.0 or higher.
You can check your Node.js version by running the following command:

```bash
node -v
```

If you don't have Node.js installed, you can download it from the official website: [Node.js](https://nodejs.org/)
If you have Node.js installed, you can run the following command to install the dependencies:

```bash
npm install
```

### Setup the backend application

In order to run the backend application in the folder `backend-app-spacebox`, you need to have the following dependencies installed:

- Docker compose
- Node.js

Once you have the dependencies installed, you can run the following command to start the backend application:

```bash
docker-compose up -d
```

The backend application will be running on port 3002 locally and the database will be running on port 5432 locally.
An ngrok server is configured to expose the backend application to the internet. To grab the ngrok URL, you can open your browser and go to the following URL: http://localhost:4040/inspect/http

### Setup the react-native expo application

Once the backend application is running, you can run the following command to start the react-native expo application in the root folder of the project:

```bash
npm install
```

Set the backend configuration url in app/config if you wanna use the backend API previously started.

```bash
`API_URL` should be set to the ngrok URL you got from the previous step.
`USE_API_ITEMS` should be set to `true` to use the backend API.
```

To run the application on the IOS simulator, you can run the following command:

```bash
npm run ios
```

If you just want to run the current development build without changing the native code, you can run the following command:

```bash
npm run start:ios
```

## Run Tests

To run the tests, you can run the following command:

```bash
npm test
```

To run the tests in watch mode, you can run the following command:

```bash
npm test:watch
```

Note: The tests should be run with the config `USE_API_ITEMS` set to `false` in order to run the tests without the backend API.
