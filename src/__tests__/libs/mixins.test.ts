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
import assembleMixins from '@/libs/mixins';

// jest.useFakeTimers();

describe('mixins.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region assembleMixins
	test('assembleMixins', async (): Promise<void> => {
		class Base1 {
			public base1Var: string = 'Base1 Variable';

			public base1Method(): string {
				return ('Base1 Method');
			}
		}

		class Base2 {
			public base2Var: string = 'Base2 Variable';
			
			public base2Method(): string {
				return ('Base2 Method');
			}
		}

		class Derived {
			public derivedVar: string = 'Derived Variable';
			
			public derivedMethod(): string {
				return ('Derived Method');
			}
		}

		assembleMixins(Derived, [Base1, Base2]);

		const instance: Derived = new Derived();

		expect((instance as any).base1Method()).toBe('Base1 Method');
		expect((instance as any).base2Method()).toBe('Base2 Method');
		expect(instance.derivedMethod()).toBe('Derived Method');

		// expect((instance as any).base1Var).toBe('Base1 Variable');
		// expect((instance as any).base2Var).toBe('Base2 Variable');
		expect(instance.derivedVar).toBe('Derived Variable');
	});
	//#endregion

});
