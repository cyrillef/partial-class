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

import { isInteger, isNumber, isFloat } from '@/is/is-number';

// jest.useFakeTimers();

describe('is-number.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isNumber
	test('isNumber(native)', async (): Promise<void> => {
		expect(isNumber(undefined)).toBe(false);
		expect(isNumber(null)).toBe(false);
		expect(isNumber(0)).toBe(true);
		expect(isNumber('')).toBe(false);
		expect(isNumber([])).toBe(false);
		expect(isNumber({})).toBe(false);
		expect(isNumber(true)).toBe(false);
		expect(isNumber(false)).toBe(false);
	});

	test('isNumber(number)', async (): Promise<void> => {
		expect(isNumber(123)).toBe(true);
		expect(isNumber(0.123)).toBe(true);
		expect(isNumber(-123)).toBe(true);
		expect(isNumber(Number.MAX_VALUE)).toBe(true);
		expect(isNumber(Number.MIN_VALUE)).toBe(true);
	});

	test('isNumber(non-number)', async (): Promise<void> => {
		expect(isNumber('string')).toBe(false);
		expect(isNumber({ a: 1 })).toBe(false);
		expect(isNumber([1, 2, 3])).toBe(false);
	});

	test('isNumber(string)', async (): Promise<void> => {
		expect(isNumber('123')).toBe(false);
		expect(isNumber('0.123')).toBe(false);
		expect(isNumber('-123')).toBe(false);
		expect(isNumber('1e10')).toBe(false);
		expect(isNumber('1.23e-10')).toBe(false);
		expect(isNumber('NaN')).toBe(false);
		expect(isNumber('Infinity')).toBe(false);
		expect(isNumber('undefined')).toBe(false);
		expect(isNumber('null')).toBe(false);
	});

	test('isNumber(edge cases)', async (): Promise<void> => {
		expect(isNumber(Number.NaN)).toBe(false);
		expect(isNumber(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(false);
		expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true);
		expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true);
		expect(isNumber(Number.MAX_VALUE)).toBe(true);
		expect(isNumber(Number.MIN_VALUE)).toBe(true);
	});

	test('isNumber(typed arrays)', async (): Promise<void> => {
		expect(isNumber(new Int8Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Uint8Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Int16Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Uint16Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Int32Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Uint32Array([1, 2, 3]))).toBe(false);
		expect(isNumber(new Float32Array([1.1, 2.2, 3.3]))).toBe(false);
		expect(isNumber(new Float64Array([1.1, 2.2, 3.3]))).toBe(false);
	});
	//#endregion

	//#region isInteger

	test('isInteger(native)', async (): Promise<void> => {
		expect(isInteger(undefined)).toBe(false);
		expect(isInteger(null)).toBe(false);
		expect(isInteger(0)).toBe(true);
		expect(isInteger('')).toBe(false);
		expect(isInteger([])).toBe(false);
		expect(isInteger({})).toBe(false);
		expect(isInteger(true)).toBe(false);
		expect(isInteger(false)).toBe(false);
	});

	test('isInteger(number)', async (): Promise<void> => {
		expect(isInteger(123)).toBe(true);
		expect(isInteger(0.123)).toBe(false);
		expect(isInteger(-123)).toBe(true);
	});

	test('isInteger(non-number)', async (): Promise<void> => {
		expect(isInteger('string')).toBe(false);
		expect(isInteger({ a: 1 })).toBe(false);
		expect(isInteger([1, 2, 3])).toBe(false);
	});

	test('isInteger(string)', async (): Promise<void> => {
		expect(isInteger('123')).toBe(false);
		expect(isInteger('0.123')).toBe(false);
		expect(isInteger('-123')).toBe(false);
		expect(isInteger('1e10')).toBe(false);
		expect(isInteger('1.23e-10')).toBe(false);
		expect(isInteger('NaN')).toBe(false);
		expect(isInteger('Infinity')).toBe(false);
		expect(isInteger('undefined')).toBe(false);
		expect(isInteger('null')).toBe(false);
	});

	test('isInteger(edge cases)', async (): Promise<void> => {
		expect(isInteger(Number.NaN)).toBe(false);
		expect(isInteger(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isInteger(Number.NEGATIVE_INFINITY)).toBe(false);
		expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
		expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
		expect(isInteger(Number.MAX_VALUE)).toBe(true);
		expect(isInteger(Number.MIN_VALUE)).toBe(false);
	});
	//#endregion

	//#region isFloat
	test('isFloat(native)', async (): Promise<void> => {
		expect(isFloat(undefined)).toBe(false);
		expect(isFloat(null)).toBe(false);
		expect(isFloat(0)).toBe(false);
		expect(isFloat('')).toBe(false);
		expect(isFloat([])).toBe(false);
		expect(isFloat({})).toBe(false);
		expect(isFloat(true)).toBe(false);
		expect(isFloat(false)).toBe(false);
	});

	test('isFloat(number)', async (): Promise<void> => {
		expect(isFloat(123)).toBe(false);
		expect(isFloat(0.123)).toBe(true);
		expect(isFloat(-123)).toBe(false);
	});

	test('isFloat(non-number)', async (): Promise<void> => {
		expect(isFloat('string')).toBe(false);
		expect(isFloat({ a: 1 })).toBe(false);
		expect(isFloat([1, 2, 3])).toBe(false);
	});

	test('isFloat(string)', async (): Promise<void> => {
		expect(isFloat('123')).toBe(false);
		expect(isFloat('0.123')).toBe(false);
		expect(isFloat('-123')).toBe(false);
		expect(isFloat('1e10')).toBe(false);
		expect(isFloat('1.23e-10')).toBe(false);
		expect(isFloat('NaN')).toBe(false);
		expect(isFloat('Infinity')).toBe(false);
		expect(isFloat('undefined')).toBe(false);
		expect(isFloat('null')).toBe(false);
	});

	test('isFloat(edge cases)', async (): Promise<void> => {
		expect(isFloat(Number.NaN)).toBe(false);
		expect(isFloat(Number.MAX_VALUE)).toBe(false);
		expect(isFloat(Number.MIN_VALUE)).toBe(true);
		expect(isFloat(Number.POSITIVE_INFINITY)).toBe(false);
		expect(isFloat(Number.NEGATIVE_INFINITY)).toBe(false);
		expect(isFloat(Number.MAX_SAFE_INTEGER)).toBe(false);
		expect(isFloat(Number.MIN_SAFE_INTEGER)).toBe(false);
	});
	//#endregion

});
