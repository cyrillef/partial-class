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

import { isString } from '@/is/is-string';

// jest.useFakeTimers();

describe('is-string.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isNumber
	test('isString(native)', async (): Promise<void> => {
		expect(isString(undefined)).toBe(false);
		expect(isString(null)).toBe(false);
		expect(isString(0)).toBe(false);
		expect(isString('')).toBe(true);
		expect(isString([])).toBe(false);
		expect(isString({})).toBe(false);
		expect(isString(true)).toBe(false);
		expect(isString(false)).toBe(false);
	});

	test('isString(string)', async (): Promise<void> => {
		expect(isString('123')).toBe(true);
		expect(isString('0.123')).toBe(true);
		expect(isString('-123')).toBe(true);
		expect(isString('1e10')).toBe(true);
		expect(isString('')).toBe(true);
	});

	test('isString(non-string)', async (): Promise<void> => {
		expect(isString(123)).toBe(false);
		expect(isString({ a: 1 })).toBe(false);
		expect(isString([1, 2, 3])).toBe(false);
	});
	//#endregion

});
