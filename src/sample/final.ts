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

/// <reference path='./final.d.ts' />

// @ts-ignore
import { Final } from '../bin/index'; // should be: import { Final } from 'partial-class';
export * from './final/partial-1';
export * from './final/partial-2';

@Final
export class FinalDecoratedClass {

	public myVar: string = 'I am myVar from FinalDecoratedClass';

	public constructor() { }

	public hello(): void {
		console.log(`I am hello() from FinalDecoratedClass`);
	}

}

export default FinalDecoratedClass;
