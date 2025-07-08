//
// Copyright (c) Autodesk, Inc. All rights reserved
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM 'AS IS' AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
//
/*jshint esversion: 9 */

import _path from 'path';
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// global.__dirname = __dirname;

// @ts-ignore
global.__dirname = import.meta.dirname || _path.dirname(_path.resolve(import.meta.url));

const testsSrc: string = _path.resolve(__dirname, '..');
const serverSrc: string = _path.resolve(__dirname, '../../lib');

export const aliases: any = {
	'@/decorators/*': [`${serverSrc}/decorators/*`],
	'@/enums/*': [`${serverSrc}/enums/*`],
	'@/is/*': [`${serverSrc}/is/*`],
	'@/libs/*': [`${serverSrc}/libs/*`],
	'@/scripts/*': [`${serverSrc}/scripts/*`],
	//'@/*': [`${serverSrc}/*`],

	'@/tests/*': [`${testsSrc}/*`],
};

// https://kulshekhar.github.io/ts-jest/docs/
const config: Config.InitialOptions = {
	rootDir: `${testsSrc}`,
	roots: ['<rootDir>',],
	testMatch: [
		//'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},

	preset: 'ts-jest',
	//'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	verbose: true,
	automock: false,
	globalSetup: '<rootDir>/_config/jest.global.setup.ts',
	globalTeardown: '<rootDir>/_config/jest.global.teardown.ts',

	modulePaths: [serverSrc,], // <-- This will be set to 'baseUrl' value
	moduleNameMapper: pathsToModuleNameMapper(aliases /* ,{ prefix: '<rootDir>/' } */),

	// globals: {
	// 	__dirname: process.cwd(),
	// },

};

export default config;