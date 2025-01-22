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

import assembleMixins from '@/libs/mixins';

// target: The prototype of the class for a static method,
// 		   or the constructor function of the class for an instance method.
// className: The name of the class being decorated.
// descriptor: An object containing the property descriptor of the method being decorated.

// Ex:
// @Partial('FinalDecoratedClass')
// class PartialOneClass {}
// @Partial('FinalDecoratedClass')
// class PartialTwoClass {}
// @Final
// class FinalDecoratedClass {}

export type ClassDefinition = { new(...args: any[]): {} };

export const PartialClasses: Map<string, ClassDefinition[]> = new Map<string, ClassDefinition[]>();

export function Partial(name: string): Function {
	return (function (target: Object, _name: string | symbol, _descriptor?: TypedPropertyDescriptor<any>): void {
		if (!PartialClasses.has(name))
			PartialClasses.set(name, []);
		PartialClasses.get(name)?.push(target as ClassDefinition);
	});
}

export function Final<T extends ClassDefinition>(constructor: T): T {
	assembleMixins(constructor, PartialClasses.get(constructor.name) || []);
	return (constructor);
}
