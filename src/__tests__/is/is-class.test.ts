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

import { isClass, isClassInstance, isClassInstanceOf } from '@/is/is-class';

// jest.useFakeTimers();

describe('is-class.test.ts', () => {

	// let agent: InstanceType<typeof TestAgent>;

	beforeAll(async (): Promise<void> => {
	});

	//#region isClass
	test('isClass(native)', async (): Promise<void> => {
		expect(isClass(undefined)).toBe(false);
		expect(isClass(null)).toBe(false);
		expect(isClass(0)).toBe(false);
		expect(isClass('')).toBe(false);
		expect(isClass([])).toBe(false);
		expect(isClass({})).toBe(false);
		expect(isClass(true)).toBe(false);
		expect(isClass(false)).toBe(false);
	});

	test('isClass(class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClass(TestClass)).toBe(true);
		expect(isClass(class { })).toBe(true);
		expect(isClass(class TestClass2 { })).toBe(true);
		expect(isClass(new TestClass())).toBe(false);
	});

	test('isClass(non-class)', async (): Promise<void> => {
		expect(isClass(123)).toBe(false);
		expect(isClass({ a: 1 })).toBe(false);
		expect(isClass([1, 2, 3])).toBe(false);
	});

	test('isClass(arrow function)', async (): Promise<void> => {
		const arrowFunction: () => void = (): void => { };
		expect(isClass(arrowFunction)).toBe(false);
	});

	test('isClass(function)', async (): Promise<void> => {
		function testFunction(): void { }
		expect(isClass(testFunction)).toBe(true);
	});

	test('isClass(extended class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClass(TestClass)).toBe(true);
		class TestClassExtended extends TestClass { }
		expect(isClass(TestClassExtended)).toBe(true);
		expect(isClass(new TestClassExtended())).toBe(false);
		class TestClassPlus extends TestClassExtended { }
		expect(isClass(TestClassPlus)).toBe(true);
		expect(isClass(new TestClassPlus())).toBe(false);
	});

	//#endregion

	//#region isClassInstance
	test('isClassInstance(native)', async (): Promise<void> => {
		expect(isClassInstance(undefined)).toBe(false);
		expect(isClassInstance(null)).toBe(false);
		expect(isClassInstance(0)).toBe(false);
		expect(isClassInstance('')).toBe(false);
		expect(isClassInstance([])).toBe(false);
		expect(isClassInstance({})).toBe(false);
		expect(isClassInstance(true)).toBe(false);
		expect(isClassInstance(false)).toBe(false);
	});

	test('isClassInstance(class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClassInstance(TestClass)).toBe(false);
		expect(isClassInstance(class { })).toBe(false);
		expect(isClassInstance(class TestClass2 { })).toBe(false);
		expect(isClassInstance(new TestClass())).toBe(true);
	});

	test('isClassInstance(non-class)', async (): Promise<void> => {
		expect(isClassInstance(123)).toBe(false);
		expect(isClassInstance({ a: 1 })).toBe(false);
		expect(isClassInstance([1, 2, 3])).toBe(false);
	});

	test('isClassInstance(arrow function)', async (): Promise<void> => {
		const arrowFunction: () => void = (): void => { };
		expect(isClassInstance(arrowFunction)).toBe(false);
	});

	test('isClassInstance(function)', async (): Promise<void> => {
		function testFunction(): void { }
		expect(isClassInstance(testFunction)).toBe(false);
	});

	test('isClassInstance(extended class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClassInstance(TestClass)).toBe(false);
		class TestClassExtended extends TestClass { }
		expect(isClassInstance(TestClassExtended)).toBe(false);
		expect(isClassInstance(new TestClassExtended())).toBe(true);
		class TestClassPlus extends TestClassExtended { }
		expect(isClassInstance(TestClassPlus)).toBe(false);
		expect(isClassInstance(new TestClassPlus())).toBe(true);
	});
	//#endregion

	//#region isClassInstanceOf
	test('isClassInstanceOf(native)', async (): Promise<void> => {
		expect(isClassInstanceOf(undefined, Object)).toBe(false);
		expect(isClassInstanceOf(null, Object)).toBe(false);
		expect(isClassInstanceOf(0, Object)).toBe(false);
		expect(isClassInstanceOf('', Object)).toBe(false);
		expect(isClassInstanceOf([], Object)).toBe(false);
		expect(isClassInstanceOf({}, Object)).toBe(false);
		expect(isClassInstanceOf(true, Object)).toBe(false);
		expect(isClassInstanceOf(false, Object)).toBe(false);
	});

	test('isClassInstanceOf(class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClassInstanceOf(TestClass, TestClass)).toBe(false);
		expect(isClassInstanceOf(class { }, TestClass)).toBe(false);
		expect(isClassInstanceOf(class TestClass2 { }, TestClass)).toBe(false);
		expect(isClassInstanceOf(new TestClass(), TestClass)).toBe(true);
	});

	test('isClassInstanceOf(non-class)', async (): Promise<void> => {
		expect(isClassInstanceOf(123, Object)).toBe(false);
		expect(isClassInstanceOf({ a: 1 }, Object)).toBe(false);
		expect(isClassInstanceOf([1, 2, 3], Object)).toBe(false);
	});

	test('isClassInstanceOf(arrow function)', async (): Promise<void> => {
		const arrowFunction: () => void = (): void => { };
		expect(isClassInstanceOf(arrowFunction, Object)).toBe(false);
	});

	test('isClassInstanceOf(function)', async (): Promise<void> => {
		function testFunction(): void { }
		expect(isClassInstanceOf(testFunction, Object)).toBe(false);
	});

	test('isClassInstanceOf(extended class)', async (): Promise<void> => {
		class TestClass { }
		expect(isClassInstanceOf(TestClass, TestClass)).toBe(false);
		expect(isClassInstanceOf(new TestClass(), TestClass)).toBe(true);
		class TestClassExtended extends TestClass { }
		expect(isClassInstanceOf(TestClassExtended, TestClass)).toBe(false);
		expect(isClassInstanceOf(TestClassExtended, TestClassExtended)).toBe(false);
		expect(isClassInstanceOf(new TestClassExtended(), TestClass)).toBe(true);
		expect(isClassInstanceOf(new TestClassExtended(), TestClassExtended)).toBe(true);
		class TestClassPlus extends TestClassExtended { }
		expect(isClassInstanceOf(TestClassPlus, TestClass)).toBe(false);
		expect(isClassInstanceOf(TestClassPlus, TestClassExtended)).toBe(false);
		expect(isClassInstanceOf(TestClassPlus, TestClassPlus)).toBe(false);
		expect(isClassInstanceOf(new TestClassPlus(), TestClass)).toBe(true);
		expect(isClassInstanceOf(new TestClassPlus(), TestClassExtended)).toBe(true);
		expect(isClassInstanceOf(new TestClassPlus(), TestClassPlus)).toBe(true);
	});
	//#endregion
});
