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

import { deepAssign } from '@/libs/object';

// jest.useFakeTimers();

describe('object.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region deepAssign
	test('deepAssign', async (): Promise<void> => {
		const target: any = { a: 1, b: { c: 2 } };
		const source1: any = { b: { d: 3 }, e: 4 };
		const source2: any = { f: 5, b: { g: 6 } };
		const source3: any = { h: 7 };

		const result: any = deepAssign(target, source1, source2, source3);

		expect(result).toEqual({
			a: 1,
			b: {
				c: 2,
				d: 3,
				g: 6
			},
			e: 4,
			f: 5,
			h: 7
		});
		expect(result.b.c).toBe(2);
		expect(result.b.d).toBe(3);
		expect(result.b.g).toBe(6);
		expect(result.e).toBe(4);
		expect(result.f).toBe(5);
		expect(result.h).toBe(7);
	});
	//#endregion

	//#region cloneRegExp
	test('cloneRegExp', async (): Promise<void> => {
		const original: RegExp = /test/i;
		const cloned: RegExp = new RegExp(original.source, original.flags);

		expect(cloned).toEqual(original);
		expect(cloned.test('TEST')).toBe(true);
		expect(cloned.test('example')).toBe(false);
	});
	//#endregion

	//#region getAllPropertyNames
	test('getAllPropertyNames', async (): Promise<void> => {
		const obj: any = {
			a: 1,
			b: { c: 2 },
			d: function() {}
		};

		const names: string[] = Object.getOwnPropertyNames(obj);
		const allNames: string[] = names.concat(Object.getOwnPropertyNames(Object.getPrototypeOf(obj)));

		expect(allNames).toContain('a');
		expect(allNames).toContain('b');
		//expect(allNames).toContain('c');
		expect(allNames).toContain('d');
		expect(allNames).toContain('constructor');
	});
	//#endregion

});
