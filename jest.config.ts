export default {
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  coveragePathIgnorePatterns: ['<rootDir>/.*.interface.ts$'],
  moduleNameMapper: {
    '@shared/(.*)': '<rootDir>/src/@shared/$1',
    '@src/(.*)': '<rootDir>/src/$1',
  },
};
