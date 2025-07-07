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

//#region isDefined / isSet / isEmpty / isNull

/**
 * isUndefined - checks if a variable is undefined
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is undefined
 */
export const isUndefined: (x: any) => x is undefined
	= (x: any): x is undefined =>
		typeof x === 'undefined' || x === undefined;

/**
 * isDefined - checks if a variable is defined
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is defined
 */
export const isDefined: <T>(x: T) => x is Exclude<T, undefined>
	= (x: any): x is Exclude<any, undefined> =>
		!isUndefined(x);

/**
 * isSet - checks if a variable is defined and not null
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is defined and not null
 */
export const isSet: <T>(x: T) => x is NonNullable<T>
	= (x: any): x is NonNullable<any> =>
		!isUndefined(x) && !isNull(x);

/**
 * isArray - checks if a variable is an Array and not null
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is an an Array and not null
 */
export const isArray: (x: any) => x is Array<any>
	= (x: any): x is Array<any> =>
		!isNull(x) && Array.isArray(x);

/**
 * isObject - checks if a variable is an Object and not null or an Array
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is an Object and not null or an Array
 */
export const isObject: (x: any) => x is Object
	= (x: any): x is Object =>
		typeof x === 'object' && !isNull(x) && !isArray(x);

/**
 * isEmpty - checks if a variable is defined, not null, not equal to empty string, array, or object
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is defined, not null, not equal to empty string, array, or object
 */
export const isEmpty: (x: any) => boolean
	= (x: any): boolean =>
		!x || (isArray(x) && x.length === 0) || (isObject(x) && Object.keys(x).length === 0);

/**
 * isNull - checks if a variable is null
 * @param x {any} - variable to check
 * @returns {Boolean} - true if variable is null
 */
export const isNull: (x: any) => x is null
	= (x: any): x is null =>
		x === null;
//#endregion
