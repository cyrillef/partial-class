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
import formatToJson from '@/libs/json';

// jest.useFakeTimers();

describe('json.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region formatToJson
	test('formatToJson', async (): Promise<void> => {
		const obj: any = {
			name: 'Test',
			value: 42,
			active: true,
			createdAt: new Date(),
			nested: {
				array: [1, 2, 3],
				regex: /test/i,
				func: function testFunc() { return ('Hello'); }
			}
		};

		const jsonString: string = formatToJson(obj, 2);
		expect(jsonString).toBeDefined();
		expect(jsonString).toContain('"name": "Test"');
		expect(jsonString).toContain('"value": 42');
		expect(jsonString).toContain('"active": true');
		expect(jsonString).toContain('"createdAt": "');
		expect(jsonString).toContain('"nested": {');
		expect(jsonString).toContain('"array": [\n      1,\n      2,\n      3\n    ]');
		expect(jsonString).toContain('"regex": "/test/i"');
		expect(jsonString).toContain('"func": "f testFunc"');
	});
	//#endregion

});
