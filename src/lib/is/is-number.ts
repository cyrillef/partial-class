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

//#region isNumber isInteger isFloat
export const isNumber: (value: any) => value is number
	= (value: any): value is number =>
		//!Number.isNaN(Number.parseFloat(value)) && Number.isFinite(Number(value));
		typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);

export const isInteger: (value: any) => value is number
	= (value: any): value is number =>
		isNumber(value) && Number.isInteger(value); // isSafeInteger

export const isFloat: (value: any) => value is number
	= (value: any): value is number =>
		isNumber(value) && !Number.isInteger(value);
//#endregion
