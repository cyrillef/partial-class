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

// import type { GlobalConfig } from '@jest/types';

import _path from 'path';
import * as TSConfigPaths from 'tsconfig-paths';
import { aliases } from './jest.config';
// global.__dirname = __dirname;

const baseUrl: string = _path.resolve(__dirname, '..');
// @ts-ignore: TS6133
const cleanup: () => void = TSConfigPaths.register({
	baseUrl,
	paths: aliases, // tsConfig.compilerOptions.paths,
});

export const globalSetup: () => Promise<void>
	= async (): Promise<void> => {
	};

// afterAll(async (): Promise<void> => {
// });

export default globalSetup;
