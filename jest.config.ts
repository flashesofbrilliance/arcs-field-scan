import type { Config } from 'jest';

const config: Config = {
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'jsdom',
      testPathPattern: '__tests__/(?!e2e)',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
      },
      setupFilesAfterFramework: ['@testing-library/jest-dom'],
    },
    {
      displayName: 'e2e',
      testEnvironment: 'node',
      testPathPattern: '__tests__/e2e',
      transform: {
        '^.+\\.ts$': ['ts-jest', {}],
      },
    },
  ],
};

export default config;
