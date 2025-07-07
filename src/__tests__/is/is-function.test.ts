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

import { isFunction } from '@/is/is-function';

// jest.useFakeTimers();

describe('is-function.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isFunction
	test('isFunction(native)', async (): Promise<void> => {
		expect(isFunction(undefined)).toBe(false);
		expect(isFunction(null)).toBe(false);
		expect(isFunction(0)).toBe(false);
		expect(isFunction('')).toBe(false);
		expect(isFunction([])).toBe(false);
		expect(isFunction({})).toBe(false);
		expect(isFunction(true)).toBe(false);
		expect(isFunction(false)).toBe(false);
	});

	test('isFunction(function)', async (): Promise<void> => {
		expect(isFunction(() => {})).toBe(true);
		expect(isFunction(function() {})).toBe(true);
		expect(isFunction(class MyClass {})).toBe(true);
		expect(isFunction(async () => {})).toBe(true);
		expect(isFunction(function* () {})).toBe(true);
	});

	test('isFunction(non-function)', async (): Promise<void> => {
		expect(isFunction(123)).toBe(false);
		expect(isFunction('string')).toBe(false);
		expect(isFunction({ a: 1 })).toBe(false);
		expect(isFunction([1, 2, 3])).toBe(false);
	});
	//#endregion

});
