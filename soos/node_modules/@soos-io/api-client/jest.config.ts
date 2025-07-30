module.exports = {
  preset: "ts-jest", // Preset that is used to configure Jest to use ts-jest for ts / tsx files
  testEnvironment: "node", // The test environment that will be used for testing
  testMatch: [
    "**/?(*.)+(spec|test).ts", // Matches any .ts files ending in .spec.ts or .test.ts
  ],
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform .ts files using ts-jest
  },
};
