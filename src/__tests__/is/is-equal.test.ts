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

import moment from 'moment';
import { isEqual } from '@/is/is-equal';

// jest.useFakeTimers();

describe('is-equal.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isEqual
	test('isEqual(native)', async (): Promise<void> => {
		expect(isEqual(undefined, undefined)).toBe(true);
		expect(isEqual(null, null)).toBe(true);
		expect(isEqual(0, 0)).toBe(true);
		expect(isEqual('', '')).toBe(true);
		expect(isEqual([], [])).toBe(true);
		expect(isEqual({}, {})).toBe(true);
		expect(isEqual(true, true)).toBe(true);
		expect(isEqual(false, false)).toBe(true);

		expect(isEqual(undefined, null)).toBe(false);
		expect(isEqual(null, undefined)).toBe(false);
		expect(isEqual(0, '')).toBe(false);
		expect(isEqual([], {})).toBe(false);
		expect(isEqual({}, [])).toBe(false);

		expect(isEqual(true, false)).toBe(false);
		expect(isEqual(false, true)).toBe(false);
	});

	test('isEqual(objects)', async (): Promise<void> => {
		expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
		expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
		expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
		expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
	});

	test('isEqual(arrays)', async (): Promise<void> => {
		expect(isEqual([1, 2], [1, 2])).toBe(true);
		expect(isEqual([1, 2], [2, 1])).toBe(false);
		expect(isEqual([1, 2], [1])).toBe(false);
		expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
		expect(isEqual([1, 2], [])).toBe(false);
		expect(isEqual([], [1, 2])).toBe(false);
	});

	test('isEqual(Date/Moment)', async (): Promise<void> => {
		expect(isEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toBe(true);
		expect(isEqual(new Date(2020, 0, 1), new Date(2020, 0, 2))).toBe(false);
		expect(isEqual(new Date(2020, 0, 1), new Date(2019, 11, 31))).toBe(false);
		// Moment.js is not included in the test environment, so this part is commented out
		expect(isEqual(moment('2020-01-01'), moment('2020-01-01'))).toBe(true);
		expect(isEqual(moment('2020-01-01'), moment('2020-01-02'))).toBe(false);
		expect(isEqual(moment('2020-01-01'), moment('2019-12-31'))).toBe(false);

		expect(isEqual(moment('2020-01-01'), new Date(2020, 0, 1))).toBe(false); // Should it be true?
		expect(isEqual(new Date(2020, 0, 1), moment('2020-01-01'))).toBe(false); // Should it be true?
	});

	test('isEqual(RegEx)', async (): Promise<void> => {
		expect(isEqual(/abc/, /abc/)).toBe(true);
		expect(isEqual(/abc/, /def/)).toBe(false);
		expect(isEqual(/abc/i, /abc/)).toBe(false);
		expect(isEqual(/abc/, /abc/i)).toBe(false);
		expect(isEqual(/abc/g, /abc/)).toBe(false);
		expect(isEqual(/abc/, /abc/g)).toBe(false);
	});

	test('isEqual(mixed)', async (): Promise<void> => {
		expect(isEqual({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] })).toBe(true);
		expect(isEqual({ a: 1, b: [2, 3] }, { a: 1, b: [3, 2] })).toBe(false);
		expect(isEqual({ a: 1, b: [2, 3] }, { a: 1 })).toBe(false);
		expect(isEqual({ a: 1, b: [2, 3] }, { b: [2, 3], a: 1 })).toBe(true);

		expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
		expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
		expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1 })).toBe(false);
		expect(isEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })).toBe(true);
	});

	//#endregion

});
