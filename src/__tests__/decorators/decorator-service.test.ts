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

import DecoratorsService, { DESIGN_PROPERTIES } from '@/decorators/decorator-service';
import Dictionary from '@/libs/types';
import { isString } from '@/is/is-string';
// import _fs from 'fs';

// jest.useFakeTimers();

const CLASS_KEY: string = 'test:class';
const METHOD_KEY: string = 'test:method';
const PROPERTY_KEY: string = 'test:property';
const PARAMETER_KEY: string = 'test:parameter';

import result from '@/tests/decorators/class-decorator';
// import Test from 'supertest/lib/test';
// import { console } from 'inspector';

//#region ClassDecorator
export function ClassDecorator(name?: string): ClassDecorator;
export function ClassDecorator(options: Dictionary<any>): ClassDecorator;
export function ClassDecorator(arg?: string | Dictionary<any>): ClassDecorator {
	return ((constructor: Function): void => {
		let obj: Dictionary<any> = { className: constructor.name, constructor, };
		if (isString(arg))
			obj = { ...obj, name: arg, };
		else if (arg)
			obj = { ...obj, ...arg, };
		DecoratorsService.addAttributes(constructor, { [CLASS_KEY]: obj, });
		// DecoratorsService.setClassMetadata(CLASS_KEY, constructor, obj);
	});
}
//#endregion

//#region MethodDecorator
// export function MethodDecorator(): MethodDecorator;
export function MethodDecorator(name?: string): MethodDecorator;
export function MethodDecorator(options: Dictionary<any>): MethodDecorator;
export function MethodDecorator(arg?: string | Dictionary<any>): MethodDecorator {
	return ((target: Object, methodName: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
		let obj: Dictionary<any> = { methodName, target, descriptor, };
		if (isString(arg))
			obj = { ...obj, name: arg, };
		else if (arg)
			obj = { ...obj, ...arg, };
		DecoratorsService.addAttributes(target, { [METHOD_KEY]: obj, }, methodName);
		//DecoratorsService.setClassMethodMetadata(METHOD_KEY, methodName, target, obj);
	});
}
//#endregion

//#region PropertyDecorator
export function PropertyDecorator(name?: string): PropertyDecorator;
export function PropertyDecorator(options: Dictionary<any>): PropertyDecorator;
export function PropertyDecorator(arg?: string | Dictionary<any>): PropertyDecorator {
	return ((target: Object, propertyKey: string | symbol): void => {
		let obj: Dictionary<any> = { propertyName: propertyKey, target, };
		if (isString(arg))
			obj = { ...obj, name: arg, };
		else if (arg)
			obj = { ...obj, ...arg, };
		DecoratorsService.addAttributes(target, { [PROPERTY_KEY]: obj, }, propertyKey);
		// DecoratorsService.setClassPropertyMetadata(PROPERTY_KEY, propertyKey, target, obj);
	});
}

export function PropertyDecoratorExt(name?: string): PropertyDecorator;
export function PropertyDecoratorExt(options: Dictionary<any>): PropertyDecorator;
export function PropertyDecoratorExt(arg?: string | Dictionary<any>): PropertyDecorator {
	return ((target: Object, propertyKey: string | symbol): void => {
		let obj: Dictionary<any> = { propertyName: propertyKey, target, };
		if (isString(arg))
			obj = { ...obj, name: arg, };
		else if (arg)
			obj = { ...obj, ...arg, };
		DecoratorsService.addAttributes(target, { [PROPERTY_KEY]: obj, }, propertyKey);
		// DecoratorsService.setClassPropertyMetadata(PROPERTY_KEY, propertyKey, target, obj);

		const data: Dictionary<any>[] = Reflect.getMetadata(DESIGN_PROPERTIES, target.constructor) || [];
		const type: any = Reflect.getMetadata('design:type', target, propertyKey);
		data.push({
			name: propertyKey,
			type: type.name,
			//access: 'public' / 'protected' / 'private' - not available in TypeScript metadata
			//defaultValue: undefined, // default value can only be retrieved at runtime
			options: obj,
			target: target.constructor.name,
		});
		DecoratorsService.addAttributes(target.constructor, { [DESIGN_PROPERTIES]: data, });
	});
}
//#endregion

//#region ParameterDecorator
export function ParameterDecorator(name?: string): ParameterDecorator;
export function ParameterDecorator(options: Dictionary<any>): ParameterDecorator;
export function ParameterDecorator(arg?: string | Dictionary<any>): ParameterDecorator {
	return ((target: Object, parameterKey: string | symbol | undefined, parameterIndex: number): void => {
		let obj: Dictionary<any> = { parameterKey, target, parameterIndex, };
		if (isString(arg))
			obj = { ...obj, name: arg, };
		else if (arg)
			obj = { ...obj, ...arg, };
		DecoratorsService.addAttributes(target, { [PARAMETER_KEY]: obj, }, parameterKey);
		//DecoratorsService.addAttributes(target, { [PROPERTY_KEY]: { ...obj, cyrille: propertyKey, }, });
	});
}
//#endregion

@ClassDecorator('TestClass')
class TestClass {

	@PropertyDecoratorExt('property')
	public property: string = 'propertyValue';

	@PropertyDecoratorExt('property2')
	public property2: number = 3.14;

	@PropertyDecorator('staticProperty')
	public static staticProperty: string = 'staticProperty';

	constructor() {
		//this.testProperty = 'propertyValue2';
	}

	@PropertyDecorator('getter')
	public get propertyGetter(): string {
		return ('propertyGetter');
	}

	public set propertyGetter(value: string) {
	}

	@PropertyDecorator('staticGetter')
	public static get staticPropertyGetter(): string {
		return ('propertyStaticGetter');
	}

	public static set staticPropertyGetter(value: string) {
	}

	@MethodDecorator('method')
	public method(testParam: string): string {
		return ('methodValue');
	}

	public withParams(@ParameterDecorator('testParam') param: string): string {
		return ('paramValue');
	}

	@MethodDecorator('staticMethod')
	public static staticMethod(): string {
		return ('staticMethod');
	}

}

describe('decorator-service.test.ts', () => {

	//let agent: InstanceType<typeof TestAgent>;
	const key: string = 'test:class2';

	beforeAll(async (): Promise<void> => {
	});

	//#region Inspecting Decorators
	test('Class Metadata', async (): Promise<void> => {
		const ds: DecoratorsService = new DecoratorsService(TestClass);
		const test: Dictionary<any> | undefined = ds.inspect();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test));
		// _fs.writeFileSync('/Users/cyrille/Developer/ADN/adndata/src/__tests__/server/decorators/test.json', DecoratorsService.formatToJson(test, 4));
		expect(json).toBeDefined();
		expect(json).toMatchObject(result);
	});

	test('Instance Metadata', async (): Promise<void> => {
		const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = ds.inspect();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test));
		// _fs.writeFileSync('/Users/cyrille/Developer/ADN/adndata/src/__tests__/server/decorators/test.json', DecoratorsService.formatToJson(test, 4));
		expect(json).toBeDefined();
		expect(json).toMatchObject(result);
	});
	//#endregion

	//#region getClassMetadata / setClassMetadata
	test('getClassMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMetadata(CLASS_KEY, TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[CLASS_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['class'] as any)[CLASS_KEY]);
	});

	test('getClassMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMetadata(CLASS_KEY, new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[CLASS_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['class'] as any)[CLASS_KEY]);
	});

	test('setClassMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { className: 'TestClass2', constructor: TestClass, };
		DecoratorsService.setClassMetadata(key, TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMetadata(key, TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMetadata(key, TestClass, undefined);
	});

	test('setClassMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { className: 'TestClass2', instance, };
		DecoratorsService.setClassMetadata(key, instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMetadata(key, instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMetadata(key, instance, undefined);
	});
	//#endregion

	//#region getClassMethodMetadata / setClassMethodMetadata for Static
	test('getClassMethodMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(METHOD_KEY, 'staticMethod', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[METHOD_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticMethods'] as any)['staticMethod'][METHOD_KEY]);
	});

	test('getClassMethodMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(METHOD_KEY, 'staticMethod', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[METHOD_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticMethods'] as any)['staticMethod'][METHOD_KEY]);
	});

	test('setClassMethodMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { methodName: 'staticMethod2', target: TestClass, descriptor: Object.getOwnPropertyDescriptor(TestClass.prototype, 'staticMethod') };
		DecoratorsService.setClassMethodMetadata(key, 'staticMethod', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(key, 'staticMethod', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMethodMetadata(key, 'staticMethod', TestClass, undefined);
	});

	test('setClassMethodMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { methodName: 'staticMethod2', target: instance, descriptor: Object.getOwnPropertyDescriptor(instance, 'staticMethod') };
		DecoratorsService.setClassMethodMetadata(key, 'staticMethod', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(key, 'staticMethod', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMethodMetadata(key, 'staticMethod', instance, undefined);
	});
	//#endregion

	//#region getClassMethodMetadata / setClassMethodMetadata
	test('getClassMethodMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(METHOD_KEY, 'method', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[METHOD_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['methods'] as any)['method'][METHOD_KEY]);
	});

	test('getClassMethodMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(METHOD_KEY, 'method', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[METHOD_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['methods'] as any)['method'][METHOD_KEY]);
	});

	test('setClassMethodMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { methodName: 'method2', target: TestClass, descriptor: Object.getOwnPropertyDescriptor(TestClass.prototype, 'method') };
		DecoratorsService.setClassMethodMetadata(key, 'method', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(key, 'method', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMethodMetadata(key, 'method', TestClass, undefined);
	});

	test('setClassMethodMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { methodName: 'method2', target: instance, descriptor: Object.getOwnPropertyDescriptor(instance, 'method') };
		DecoratorsService.setClassMethodMetadata(key, 'method', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassMethodMetadata(key, 'method', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassMethodMetadata(key, 'method', instance, undefined);
	});
	//#endregion

	//#region getClassPropertyMetadata / setClassPropertyMetadata for Static
	test('getClassPropertyMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(PROPERTY_KEY, 'staticProperty', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticProperties'] as any)['staticProperty'][PROPERTY_KEY]);
	});

	test('getClassPropertyMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(PROPERTY_KEY, 'staticProperty', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticProperties'] as any)['staticProperty'][PROPERTY_KEY]);
	});

	test('setClassPropertyMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { propertyName: 'staticProperty2', target: TestClass, };
		DecoratorsService.setClassPropertyMetadata(key, 'staticProperty', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(key, 'staticProperty', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassPropertyMetadata(key, 'staticProperty', TestClass, undefined);
	});

	test('setClassPropertyMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { propertyName: 'staticProperty2', target: instance, };
		DecoratorsService.setClassPropertyMetadata(key, 'staticProperty', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(key, 'staticProperty', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassPropertyMetadata(key, 'staticProperty', instance, undefined);
	});
	//#endregion

	//#region getClassPropertyMetadata / setClassPropertyMetadata
	test('getClassPropertyMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(PROPERTY_KEY, 'property', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['properties'] as any)['property'][PROPERTY_KEY]);
	});

	test('getClassPropertyMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(PROPERTY_KEY, 'property', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['properties'] as any)['property'][PROPERTY_KEY]);
	});

	test('setClassPropertyMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { propertyName: 'property2', target: TestClass, };
		DecoratorsService.setClassPropertyMetadata(key, 'property', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(key, 'property', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json?.options).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassPropertyMetadata(key, 'property', TestClass, undefined);
	});

	test('setClassPropertyMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { propertyName: 'property2', target: instance, };
		DecoratorsService.setClassPropertyMetadata(key, 'property', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassPropertyMetadata(key, 'property', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassPropertyMetadata(key, 'property', instance, undefined);
	});
	//#endregion

	//#region getClassAccessorMetadata / setClassAccessorMetadata for Static
	test('getClassAccessorMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(PROPERTY_KEY, 'staticPropertyGetter', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticAccessors'] as any)['staticPropertyGetter'][PROPERTY_KEY]);
	});

	test('getClassAccessorMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(PROPERTY_KEY, 'staticPropertyGetter', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['staticAccessors'] as any)['staticPropertyGetter'][PROPERTY_KEY]);
	});

	test('setClassAccessorMetadata metadata for Static [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { propertyName: 'staticPropertyGetter2', target: TestClass, };
		DecoratorsService.setClassAccessorMetadata(key, 'staticPropertyGetter', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(key, 'staticPropertyGetter', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassAccessorMetadata(key, 'staticPropertyGetter', TestClass, undefined);
	});

	test('setClassAccessorMetadata metadata for Static [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { propertyName: 'staticPropertyGetter2', target: instance, };
		DecoratorsService.setClassAccessorMetadata(key, 'staticPropertyGetter', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(key, 'staticPropertyGetter', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassAccessorMetadata(key, 'staticPropertyGetter', instance, undefined);
	});
	//#endregion

	//#region getClassAccessorMetadata / setClassAccessorMetadata
	test('getClassAccessorMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(PROPERTY_KEY, 'propertyGetter', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['accessors'] as any)['propertyGetter'][PROPERTY_KEY]);
	});

	test('getClassAccessorMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(PROPERTY_KEY, 'propertyGetter', new TestClass());
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[PROPERTY_KEY]));
		expect(json).toBeDefined();
		expect(json).toMatchObject((result['accessors'] as any)['propertyGetter'][PROPERTY_KEY]);
	});

	test('setClassAccessorMetadata metadata [Class]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const value: Dictionary<any> = { methodName: 'propertyGetter2', target: TestClass, descriptor: Object.getOwnPropertyDescriptor(TestClass.prototype, 'method') };
		DecoratorsService.setClassAccessorMetadata(key, 'propertyGetter', TestClass, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(key, 'propertyGetter', TestClass);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassAccessorMetadata(key, 'propertyGetter', TestClass, undefined);
	});

	test('setClassAccessorMetadata metadata [Instance]', async (): Promise<void> => {
		//const ds: DecoratorsService = new DecoratorsService(new TestClass());
		const instance: TestClass = new TestClass();
		const value: Dictionary<any> = { methodName: 'propertyGetter2', target: instance, descriptor: Object.getOwnPropertyDescriptor(instance, 'method') };
		DecoratorsService.setClassAccessorMetadata(key, 'propertyGetter', instance, value);
		const test: Dictionary<any> | undefined = DecoratorsService.getClassAccessorMetadata(key, 'propertyGetter', instance);
		expect(test).toBeDefined();
		const json: Dictionary<any> | undefined = JSON.parse(DecoratorsService.formatToJson(test && test[key]));
		expect(json).toBeDefined();
		expect(json).toMatchObject(JSON.parse(DecoratorsService.formatToJson(value)));
		// Clean up
		DecoratorsService.setClassAccessorMetadata(key, 'propertyGetter', instance, undefined);
	});
	//#endregion

});
