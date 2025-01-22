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

import { Constructor } from '@/libs/types';

export const assembleMixins: <TBase extends Constructor>(derivedCtor: TBase, constructors: any[]) => any
	= <TBase extends Constructor>(derivedCtor: TBase, constructors: any[]): any => {
		constructors.forEach((baseCtor: any) => {
			// Non-Statics
			Object.getOwnPropertyNames(baseCtor.prototype).forEach((name: PropertyKey): void => {
				Object.defineProperty(
					derivedCtor.prototype,
					name,
					Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
				);
			});
			// Statics
			Object.getOwnPropertyNames(baseCtor).forEach((name: PropertyKey): void => {
				if (name === 'length' || name === 'prototype' || name === 'name')
					return;
				Object.defineProperty(
					derivedCtor,
					name,
					Object.getOwnPropertyDescriptor(baseCtor, name) || Object.create(null)
				);
			});
		});
	};

export default assembleMixins;
