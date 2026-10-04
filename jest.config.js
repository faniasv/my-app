// BE Live 5 Automated Testing
const nextJest = require("next/jest")();

const createJestConfig = nextJest;

const customJestConfig = {
  testEnvironment: "node",

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(customJestConfig);