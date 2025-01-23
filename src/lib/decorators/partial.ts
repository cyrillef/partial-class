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

export function Partial(name: string | symbol): Function;
export function Partial(target: Function): void;
export function Partial(...args: any[]): Function | void {
	if (typeof args[0] === 'function') {
		const target: any = args[0];
		const name: string | symbol = target.name;
		if (!PartialClasses.has(name as string))
			PartialClasses.set(name as string, []);
		PartialClasses.get(name as string)?.push(target as ClassDefinition);
	} else if (typeof args[0] === 'string') {
		const finalClassName: string | symbol = args[0]
		return (function (target: Object): void {
			if (!PartialClasses.has(finalClassName as string || (target as any).name))
				PartialClasses.set(finalClassName as string, []);
			PartialClasses.get(finalClassName as string)?.push(target as ClassDefinition);
		});
	} else {
		return (function (target: Object): void {
			if (!PartialClasses.has((target as any).name))
				PartialClasses.set((target as any).name, []);
			PartialClasses.get((target as any).name)?.push(target as ClassDefinition);
		});
	}
}

export function Final<T extends ClassDefinition>(constructor: T): T {
	assembleMixins(constructor, PartialClasses.get(constructor.name) || []);
	return (constructor);
}
