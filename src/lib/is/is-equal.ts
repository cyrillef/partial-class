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

import { isMoment } from 'moment';

//#region isEqual
export const isEqual: (a: any, b: any) => boolean
	= (a: any, b: any): boolean => {
		if (a === b)
			return (true);

		if (a && b && typeof a === 'object' && typeof b === 'object') {
			if (a.constructor !== b.constructor)
				return (false);

			if (Array.isArray(a)) {
				if (a.length !== b.length)
					return (false);
				return (a.every((el: any, i: number): boolean => isEqual(el, b[i])));
			}

			if (isMoment(a) && isMoment(b))
				return (a.isSame(b));
			if (a instanceof Date)
				return (a.getTime() === b.getTime());
			if (a instanceof RegExp)
				return (a.toString() === b.toString());

			const keysA: string[] = Object.keys(a);
			const keysB: string[] = Object.keys(b);
			if (keysA.length !== keysB.length)
				return (false);

			return (keysA.every((key: string): boolean => keysB.includes(key) && isEqual(a[key], b[key])));
		}

		return (false);
	};
//#endregion
