module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  globalSetup: './src/__tests__/setup.ts',
  testMatch: ['**/__tests__/specs/**/*.+(ts|tsx|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/build/'],
  verbose: true,
  testURL: 'http://localhost/',
};
