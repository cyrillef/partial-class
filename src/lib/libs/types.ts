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

// Construct a type with a set of properties K of type T
// /typescript/lib/lib.es5.d.ts
// type Record<K extends keyof any, T> = {
// 	[P in K]: T;
// };

export type Constructor<T = {}> = new (...args: any[]) => T;

export type Dictionary<T> = Record<string, T>;

export type StringDictionary = Dictionary<string>;
export type AnyDictionary = Dictionary<any>;

export default Dictionary;

// Ex:
// const stringDictionary: StringDictionary = { foo: 'bar', };
// console.log(stringDictionary.foo); // bar
// console.log(stringDictionary['foo']); // bar

// const stringDictionary2: Dictionary<string> = { foo: 'bar', };
// console.log(stringDictionary2.foo); // bar
// console.log(stringDictionary2['foo']); // bar
