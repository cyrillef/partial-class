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
import { isDate } from '@/is/is-date';
import moment from 'moment';

// jest.useFakeTimers();

describe('is-date.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
		moment.suppressDeprecationWarnings = true;
		// better to use 
		moment('2025-07-07', 'YYYY-MM-DD', true); // strict parsing

	});

	//#region isDate
	test('isDate()', async (): Promise<void> => {
		expect(isDate(new Date())).toBe(true);
		expect(isDate(new Date('2023-10-01'))).toBe(true);
		expect(isDate(new Date('invalid date'))).toBe(false);
		expect(isDate(Date.now())).toBe(false); // Date.now() returns a number
		expect(isDate('2023-10-01')).toBe(false); // String is not a date
		expect(isDate(1234567890)).toBe(false); // Number is not a date
		expect(isDate(null)).toBe(false);
		expect(isDate(undefined)).toBe(false);
		expect(isDate({})).toBe(false);
		expect(isDate([])).toBe(false);
		expect(isDate('')).toBe(false); // Empty string is not a date
		expect(isDate(true)).toBe(false); // Boolean is not a date
		expect(isDate(false)).toBe(false); // Boolean is not a date
		expect(isDate(new Date('2023-10-01T00:00:00Z'))).toBe(true); // ISO string date
		expect(isDate(new Date('2023-10-01T00:00:00.000Z'))).toBe(true); // ISO string with milliseconds
		expect(isDate(new Date('2023-10-01T00:00:00+00:00'))).toBe(true); // ISO string with timezone offset
		expect(isDate(new Date('2023-10-01T00:00:00-05:00'))).toBe(true); // ISO string with negative timezone offset
		expect(isDate(new Date('2023-10-01T00:00:00.000+00:00'))).toBe(true); // ISO string with milliseconds and timezone offset
		expect(isDate(new Date('2023-10-01T00:00:00.000-05:00'))).toBe(true); // ISO string with milliseconds and negative timezone offset
		expect(isDate(new Date('2023-10-01T00:00:00Z').getTime())).toBe(false); // getTime() returns a number
		expect(isDate(new Date().toISOString())).toBe(false); // toISOString() returns a string
		expect(isDate(new Date().valueOf())).toBe(false); // valueOf() returns a number
		expect(isDate(_fs)).toBe(false); // fs module is not a date
		expect(isDate({ toString: () => '2023-10-01' })).toBe(false); // Object with toString method returning a date string is not a date
		expect(isDate({})).toBe(false); // Empty object is not a date
		expect(isDate([])).toBe(false); // Empty array is not a date
		expect(isDate(new Date('2023-10-01T00:00:00.000Z').getTime())).toBe(false); // getTime() returns a number
	});

	test('isDate(moment)', async (): Promise<void> => {
		expect(isDate(moment())).toBe(true); // moment() returns a Moment object which is a date
		expect(isDate(moment('2023-10-01'))).toBe(true); // moment with valid date string
		expect(isDate(moment('invalid date'))).toBe(false); // moment with invalid date string
		expect(isDate(moment().toDate())).toBe(true); // toDate() returns a Date object
		expect(isDate(moment().valueOf())).toBe(false); // valueOf() returns a number
		expect(isDate(moment().format())).toBe(false); // format() returns a string
	});

	test('isDate(var)', async (): Promise<void> => {
		let d: Date = new Date();
		expect(isDate(d)).toBe(true);
		d = new Date('2023-10-01');
		expect(isDate(d)).toBe(true);
		d = new Date('invalid date');
		expect(isDate(d)).toBe(false);
	});

	test('isDate(var) with moment', async (): Promise<void> => {
		let d: moment.Moment = moment();
		expect(isDate(d)).toBe(true); // moment object is considered a date
		d = moment('2023-10-01');
		expect(isDate(d)).toBe(true); // valid moment date
		d = moment('invalid date');
		expect(isDate(d)).toBe(false); // invalid moment date
	});
	//#endregion

});
