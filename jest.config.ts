export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
