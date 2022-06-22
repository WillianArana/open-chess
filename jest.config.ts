export default {
  clearMocks: true,
  coverageProvider: 'v8',
  rootDir: 'src',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
};
