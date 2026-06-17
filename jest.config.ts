/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({dir: './'});

// Add any custom config to be passed to Jest
const config: Config = {
	...(await createJestConfig({
		clearMocks: true,
		testEnvironment: 'node',
		moduleNameMapper: {'^@/(.*)$': '<rootDir>/$1'},
		setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	})()),
	transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
};

export default config;
