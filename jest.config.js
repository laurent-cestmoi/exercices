module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  globalSetup: '<rootDir>/__tests__/global-setup.ts',
  globalTeardown: '<rootDir>/__tests__/global-teardown.ts',
  testRegex: "(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js)$",
  //testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  //testPathIgnorePatterns: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
};