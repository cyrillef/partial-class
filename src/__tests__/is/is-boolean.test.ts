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

import _fs from 'fs';
import { isBoolean } from '@/is/is-boolean';

// jest.useFakeTimers();

describe('is-boolean.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isBoolean
	test('isBoolean(true/false)', async (): Promise<void> => {
		expect(isBoolean(true)).toBe(true);
		expect(isBoolean(false)).toBe(true);
	});

	test('isBoolean(var)', async (): Promise<void> => {
		let b: boolean = true;
		expect(isBoolean(b)).toBe(true);
		b = false;
		expect(isBoolean(b)).toBe(true);
	});

	test('isBoolean(1/0)', async (): Promise<void> => {
		expect(isBoolean(1)).toBe(false);
		expect(isBoolean(0)).toBe(false);
	});

	it('should return false for non-boolean values', () => {
		expect(isBoolean('true')).toBe(false);
		expect(isBoolean(0)).toBe(false);
		expect(isBoolean(null)).toBe(false);
		expect(isBoolean(undefined)).toBe(false);
		expect(isBoolean({})).toBe(false);
		expect(isBoolean([])).toBe(false);
	});

	it('should narrow type correctly in a type guard', () => {
		const values: (boolean | string | number)[] = [true, 'hello', 42];
		const booleans: boolean[] = values.filter(isBoolean);
		// TypeScript should infer `booleans` as `boolean[]`
		booleans.forEach((val: boolean): void => {
			expect(typeof val).toBe('boolean'); // val is inferred as boolean here
		});
	});
	//#endregion

});
