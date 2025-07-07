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

import { isArray, isDefined, isEmpty, isNull, isObject, isSet, isUndefined } from '@/is/is-defined';

// jest.useFakeTimers();

describe('is-defined.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isDate
	test('isUndefined()', async (): Promise<void> => {
		expect(isUndefined(undefined)).toBe(true);
		expect(isUndefined(null)).toBe(false);
		expect(isUndefined(0)).toBe(false);
		expect(isUndefined('')).toBe(false);
		expect(isUndefined([])).toBe(false);
		expect(isUndefined({})).toBe(false);
		expect(isUndefined(true)).toBe(false);
		expect(isUndefined(false)).toBe(false);
	});

	test('isDefined()', async (): Promise<void> => {
		expect(isDefined(undefined)).toBe(false);
		expect(isDefined(null)).toBe(true);
		expect(isDefined(0)).toBe(true);
		expect(isDefined('')).toBe(true);
		expect(isDefined([])).toBe(true);
		expect(isDefined({})).toBe(true);
		expect(isDefined(true)).toBe(true);
		expect(isDefined(false)).toBe(true);
	});

	test('isSet()', async (): Promise<void> => {
		expect(isSet(undefined)).toBe(false);
		expect(isSet(null)).toBe(false);
		expect(isSet(0)).toBe(true);
		expect(isSet('')).toBe(true);
		expect(isSet([])).toBe(true);
		expect(isSet({})).toBe(true);
		expect(isSet(true)).toBe(true);
		expect(isSet(false)).toBe(true);
	});

	test('isArray()', async (): Promise<void> => {
		expect(isArray(undefined)).toBe(false);
		expect(isArray(null)).toBe(false);
		expect(isArray(0)).toBe(false);
		expect(isArray('')).toBe(false);
		expect(isArray([])).toBe(true);
		expect(isArray({})).toBe(false);
		expect(isArray(true)).toBe(false);
		expect(isArray(false)).toBe(false);
	});

	test('isObject()', async (): Promise<void> => {
		expect(isObject(undefined)).toBe(false);
		expect(isObject(null)).toBe(false);
		expect(isObject(0)).toBe(false);
		expect(isObject('')).toBe(false);
		expect(isObject([])).toBe(false);
		expect(isObject({})).toBe(true);
		expect(isObject(true)).toBe(false);
		expect(isObject(false)).toBe(false);
	});

	test('isEmpty()', async (): Promise<void> => {
		expect(isEmpty(undefined)).toBe(true);
		expect(isEmpty(null)).toBe(true);
		expect(isEmpty(0)).toBe(true);
		expect(isEmpty('')).toBe(true);
		expect(isEmpty([])).toBe(true);
		expect(isEmpty({})).toBe(true);
		expect(isEmpty(true)).toBe(false);
		expect(isEmpty(false)).toBe(true);
	});

	test('isNull()', async (): Promise<void> => {
		expect(isNull(undefined)).toBe(false);
		expect(isNull(null)).toBe(true);
		expect(isNull(0)).toBe(false);
		expect(isNull('')).toBe(false);
		expect(isNull([])).toBe(false);
		expect(isNull({})).toBe(false);
		expect(isNull(true)).toBe(false);
		expect(isNull(false)).toBe(false);
	});

	//#endregion

});
