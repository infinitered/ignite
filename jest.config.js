/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/boilerplate/"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  prettierPath: null,
}
