/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-native-svg|nativewind|react-native-css-interop)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/templates/'],
  passWithNoTests: true,
};
