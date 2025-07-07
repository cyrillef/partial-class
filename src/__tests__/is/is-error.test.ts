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

import { isError } from '@/is/is-error';

// jest.useFakeTimers();

describe('is-error.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isError
	test('isError(native)', async (): Promise<void> => {
		expect(isError(undefined)).toBe(false);
		expect(isError(null)).toBe(false);
		expect(isError(0)).toBe(false);
		expect(isError('')).toBe(false);
		expect(isError([])).toBe(false);
		expect(isError({})).toBe(false);
		expect(isError(true)).toBe(false);
		expect(isError(false)).toBe(false);
	});

	test('isError(error)', async (): Promise<void> => {
		expect(isError(new Error('Test Error'))).toBe(true);
		expect(isError(new DOMException('Test DOMException'))).toBe(true);
	});

	test('isError(non-error)', async (): Promise<void> => {
		expect(isError(123)).toBe(false);
		expect(isError({ a: 1 })).toBe(false);
		expect(isError([1, 2, 3])).toBe(false);
	});
	//#endregion

});
