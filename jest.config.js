module.exports = {
  preset: "jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/__tests__/**/*.test.js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/__tests__/*.test.js"],
};
