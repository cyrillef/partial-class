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

import { isObject } from '@/is/is-defined';

//#region isError
const baseGetTag: (value: any) => string
	= (value: any): string => {
		if (value === null)
			return (value === undefined ? '[object Undefined]' : '[object Null]');
		return (toString.call(value));
	};

export const isError: (value: any) => value is Error | DOMException
	= (value: any): value is Error | DOMException => {
		if (!isObject(value))
			return (false);
		const tag: string = baseGetTag(value);
		return (tag === '[object Error]' || tag === '[object DOMException]');
	};
//#endregion
