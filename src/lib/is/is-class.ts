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

const isClassReference: (obj: any) => obj is Function
	= (obj: any): obj is Function =>
		typeof obj === 'function' && obj.prototype?.constructor === obj;

const isDerivedFromObject: (obj: any) => boolean
	= (obj: any): boolean => {
		while (obj) {
			if (Object.getPrototypeOf(obj) === Object.prototype)
				return (true);
			obj = obj.__proto__;
		}
		return (false);
	};

export const isClass: (obj: any) => obj is Function
	= (obj: any): obj is Function =>
		isClassReference(obj) && isDerivedFromObject(obj.prototype); // Object.getPrototypeOf(obj.prototype) === Object.prototype;

export const isClassInstance: (obj: any) => obj is object
	= (obj: any): obj is object =>
		typeof obj === 'object' && !Array.isArray(obj) && obj !== null 
		&& obj.constructor && obj.constructor.hasOwnProperty('name') && obj.constructor.name !== 'Object'
		&& isClassReference(obj.constructor);

export const isClassInstanceOf: (obj: any, cls: Function) => obj is object
	= (obj: any, cls: Function): obj is object =>
		isClassInstance(obj) && obj instanceof cls && isClassReference(cls);

export const isClassOrInstance: (obj: any) => obj is Function | object
	= (obj: any): obj is Function | object =>
		isClassReference(obj) || isClassInstance(obj);

export const isClassOrInstanceOf: (obj: any, cls: Function) => obj is Function | object
	= (obj: any, cls: Function): obj is Function | object =>
		isClassOrInstance(obj) && (isClassReference(obj) || isClassInstanceOf(obj, cls)) && isClassReference(cls);
