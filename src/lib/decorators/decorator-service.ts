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

import 'reflect-metadata';
import Dictionary from '@/libs/types';
import { isFunction } from '@/is/is-function';
import { isDefined } from '@/is/is-defined';
import { isClass, isClassInstance } from '@/is/is-class';
import { isEmpty } from '@/is/is-defined';

export const DESIGN_PROPERTIES: string = 'design:properties';

//#region ** Class Definition for Decorators Service **
/*
@ClassDecorator('TestClass')
class TestClass {

	//@PropertyDecorator('property')
	@PropertyDecoratorExt('property')
	public property: string = 'propertyValue';

	//@PropertyDecoratorExt('property2')
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

	@PropertyDecorator('staticGetter')
	public static get staticPropertyGetter(): string {
		return ('propertyStaticGetter');
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
*/
//#endregion

//#region ** Class Decorators Service ** (Class or instance.constructor)
/*
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
	});
}

Retrieve the metadata from the class definition using:
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass);
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, undefined, [CLASS_KEY]);
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes();
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes(undefined, [CLASS_KEY]);

Retrieve the metadata from a class instance using:
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor);
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor, undefined, [CLASS_KEY]);
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance.constructor);
  const test: Dictionary<any> | undefined = ds.getAttributes();
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance.constructor);
  const test: Dictionary<any> | undefined = ds.getAttributes(undefined, [CLASS_KEY]);
*/
//#endregion

//#region ** Static Method Decorators Service ** (Class or instance.constructor)
/*
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
	});
}

Retrieve the metadata from the class definition using:
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, 'staticMethod');
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, 'staticMethod', [METHOD_KEY]);
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticMethod');
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticMethod', [METHOD_KEY]);

Retrieve the metadata from a class instance using:
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor, 'staticMethod');
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor, 'staticMethod', [METHOD_KEY]);
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance.constructor);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticMethod');
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance.constructor);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticMethod', [METHOD_KEY]);
*/
//#endregion

//#region ** Method Decorators Service ** (Class.prototype or instance)
/*
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
	});
}

Retrieve the metadata from the class definition using:
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass.prototype, 'method');
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass.prototype, 'method', [METHOD_KEY]);
* const ds: DecoratorsService = new DecoratorsService(TestClass.prototype);
  const test: Dictionary<any> | undefined = ds.getAttributes('method');
* const ds: DecoratorsService = new DecoratorsService(TestClass.prototype);
  const test: Dictionary<any> | undefined = ds.getAttributes('method', [METHOD_KEY]);

Retrieve the metadata from a class instance using:
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance, 'method');
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance, 'method', [METHOD_KEY]);
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance);
  const test: Dictionary<any> | undefined = ds.getAttributes('method');
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance);
  const test: Dictionary<any> | undefined = ds.getAttributes('method', [METHOD_KEY]);
*/
//#endregion

//#region ** Static Property Service ** (Class or instance.constructor)
/*
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
	});
}

Retrieve the metadata from the class definition using:
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, 'staticProperty');
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, 'staticProperty', [PROPERTY_KEY]);
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticProperty');
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes('staticProperty', [PROPERTY_KEY]);

Retrieve the metadata from a class instance using:
* const instance: TestClass = new TestClass();
const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor, 'staticProperty');
* const instance: TestClass = new TestClass();
const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance.constructor, 'staticProperty', [PROPERTY_KEY]);
* const instance: TestClass = new TestClass();
const ds: DecoratorsService = new DecoratorsService(instance.constructor);
const test: Dictionary<any> | undefined = ds.getAttributes('staticProperty');
* const instance: TestClass = new TestClass();
const ds: DecoratorsService = new DecoratorsService(instance.constructor);
const test: Dictionary<any> | undefined = ds.getAttributes('staticProperty', [PROPERTY_KEY]);
*/
//#endregion

//#region ** Instance Property Service ** (instance only)
/*
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
	});
}

It is not possble to retrieve the metadata from the class definition

Retrieve the metadata from a class instance using:
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance, 'property');
* const instance: TestClass = new TestClass();
  const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(instance, 'property', [PROPERTY_KEY]);
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance);
  const test: Dictionary<any> | undefined = ds.getAttributes('property');
* const instance: TestClass = new TestClass();
  const ds: DecoratorsService = new DecoratorsService(instance);
  const test: Dictionary<any> | undefined = ds.getAttributes('property', [PROPERTY_KEY]);
*/
//#endregion

//#region ** Static Accessor Service ** (Class or instance.constructor)
//#endregion

//#region ** Instance Accessor Service ** (Class.prototype or instance)
//#endregion

//#region ** Static Parameter Service ** (Class or instance.constructor)
// See MethodDecorator
/*
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
	});
}
*/
//#endregion

//#region ** Instance Parameter Service ** (Class.prototype or instance)
// See MethodDecorator
/*
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
	});
}
*/
//#endregion

//#region ** 'design:properties' **
/*
Since Class Properties can only be retrieved with instances (Javascript limitation), we can store properties metadata on
the class definition.

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

Retrieve the metadata from the class definition using:
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass,);
* const test: Dictionary<any> | undefined = DecoratorsService.getAttributes(TestClass, undefined, [DESIGN_PROPERTIES]);
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes();
* const ds: DecoratorsService = new DecoratorsService(TestClass);
  const test: Dictionary<any> | undefined = ds.getAttributes(undefined, [DESIGN_PROPERTIES]);

*/
//#endregion

//#region Property Decorator
export function Property(): PropertyDecorator {
	return ((target: Object, propertyKey: string | symbol): void => {
		const data: Dictionary<any>[] = Reflect.getMetadata(DESIGN_PROPERTIES, target.constructor) || [];
		const type: any = Reflect.getMetadata('design:type', target, propertyKey);
		data.push({
			name: propertyKey,
			type: type.name,
			//access: 'public' / 'protected' / 'private' - not available in TypeScript metadata
			target: target.constructor.name,
			defaultValue: undefined, // default value can only be retrieved at runtime
		});
		DecoratorsService.addAttributes(target.constructor, { [DESIGN_PROPERTIES]: data, });
	});
}
//#endregion

//#region Service
interface IClassMembers {
	constructors?: string;
	properties: (string | symbol)[];
	accessors: string[];
	methods: string[];
}

export class DecoratorsService {

	public constructor(protected target: Object) {
	}

	//#region Metadata Utils
	public static getAttributes(target: Object, name?: string | symbol, keys?: (string | symbol)[]): Dictionary<any> | undefined {
		const service: DecoratorsService = new DecoratorsService(target);
		return (service.getAttributes(name, keys));
	}

	public getAttributes(name?: string | symbol, keys?: (string | symbol)[]): Dictionary<any> | undefined {
		keys = keys || (name && Reflect.getMetadataKeys(this.target, name)) || Reflect.getMetadataKeys(this.target);

		const metadata: Dictionary<any> = {};
		(keys || []).map((key: string | symbol): void => {
			metadata[key.toString()] = name ?
				Reflect.getMetadata(key, this.target, name)
				: Reflect.getMetadata(key, this.target);
		});

		return (Object.keys(metadata) ? { ...metadata, } : undefined);
		// const attributes: any = Reflect.getMetadata(METHODS_KEY, target);
		// if (attributes)
		// 	return (Object.keys(attributes).reduce((copy: any, key: string): any => {
		// 		copy[key] = { ...attributes[key] };
		// 		return (copy);
		// 	}, {}));
		// return (undefined);
	}

	public static setAttributes(target: Object, attributes: Dictionary<any> = {}, name?: string | symbol): void {
		const service: DecoratorsService = new DecoratorsService(target);
		return (service.setAttributes(attributes, name));
	}

	public setAttributes(attributes: Dictionary<any> = {}, name?: string | symbol): void {
		Object.keys(attributes).map((key: string): void => {
			if (name)
				Reflect.defineMetadata(key, attributes[key], this.target, name);
			else
				Reflect.defineMetadata(key, attributes[key], this.target);
		});
	}

	public static addAttributes(target: Object, attributes: Dictionary<any> = {}, name?: string | symbol): void {
		const service: DecoratorsService = new DecoratorsService(target);
		return (service.addAttributes(attributes, name));
	}

	public addAttributes(attributes: Dictionary<any> = {}, name?: string | symbol): void {
		let current: Dictionary<any> | undefined = this.getAttributes(name);
		current = { ...current, ...attributes, };
		this.setAttributes(current, name);
	}
	//endregion

	//#region Class / Methods / Properties / Accessors / Parameters
	public static setClassMetadata(key: string, target: Function | Object, metadata: Dictionary<any> = {}): void {
		if (isClass(target))
			DecoratorsService.addAttributes(/*constructor*/target, { [key]: metadata, });
		else if (isClassInstance(target))
			DecoratorsService.addAttributes((target as any).constructor, { [key]: metadata, });
		else
			throw (new Error('DecoratorsService.setClassMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static getClassMetadata(key: string, target: Function | Object): Dictionary<any> | undefined {
		if (isClass(target))
			return (DecoratorsService.getAttributes(/*constructor*/target, undefined, [key]));
		else if (isClassInstance(target))
			return (DecoratorsService.getAttributes((target as any).constructor, undefined, [key]));
		else
			throw (new Error('DecoratorsService.getClassMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static setClassMethodMetadata(key: string, methodName: string | symbol, target: Function | Object, metadata: Dictionary<any> = {}): void {
		if (isClass(target) && target.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(/*constructor*/target, { [key]: metadata, }, methodName);
		else if (isClass(target))
			DecoratorsService.addAttributes(/*constructor*/(target as any).prototype, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && target.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(target, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(target.constructor, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && (target as any).__proto__ && (target as any).__proto__.hasOwnProperty(methodName))
			DecoratorsService.addAttributes((target as any).__proto__, { [key]: metadata, }, methodName);
		else
			throw (new Error('DecoratorsService.setClassMethodMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static getClassMethodMetadata(key: string, methodName: string | symbol, target: Function | Object): Dictionary<any> | undefined {
		if (isClass(target) && target.hasOwnProperty(methodName))
			return (DecoratorsService.getAttributes(/*constructor*/target, methodName, [key]));
		else if (isClass(target))
			return (DecoratorsService.getAttributes(/*constructor*/(target as any).prototype, methodName, [key]));
		else if (isClassInstance(target) && target.hasOwnProperty(methodName))
			return (DecoratorsService.getAttributes(target, methodName, [key]));
		else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(methodName))
			return (DecoratorsService.getAttributes(target.constructor, methodName, [key]));
		else if (isClassInstance(target) && (target as any).__proto__ && (target as any).__proto__.hasOwnProperty(methodName))
			return (DecoratorsService.getAttributes((target as any).__proto__, methodName, [key]));
		// else if (isClassInstance(target))
		// 	return (DecoratorsService.getAttributes(target, methodName, [key]));
		else
			throw (new Error('DecoratorsService.getClassMethodMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static setClassPropertyMetadata(key: string, propertyName: string | symbol, target: Function | Object, metadata: Dictionary<any> = {}): void {
		if (isClass(target) && target.hasOwnProperty(propertyName))
			DecoratorsService.addAttributes(/*constructor*/target, { [key]: metadata, }, propertyName);
		else if (isClass(target)) {
			if ((target as any).prototype && (target as any).prototype.hasOwnProperty(propertyName))
				DecoratorsService.addAttributes(/*constructor*/(target as any).prototype, { [key]: metadata, }, propertyName);
			// Try to set the property from the design properties metadata
			const data: Dictionary<any>[] = (Reflect.getMetadata(DESIGN_PROPERTIES, target) || []);
			// .filter((prop: Dictionary<any>): boolean => prop.name !== propertyName.toString());
			const type: any = Reflect.getMetadata('design:type', target, propertyName);
			if (isEmpty(data))
				data.push({
					name: propertyName,
					type: type.name,
					//access: 'public' / 'protected' / 'private' - not available in TypeScript metadata
					//defaultValue: undefined, // default value can only be retrieved at runtime
					options: metadata,
					target: target.name,
				});
			else
				data[0].options = { ...data[0].options, ...metadata, };
			DecoratorsService.addAttributes(target, { [DESIGN_PROPERTIES]: data, });
		} else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(propertyName))
			DecoratorsService.addAttributes(target.constructor, { [key]: metadata, }, propertyName);
		else if (isClassInstance(target))
			DecoratorsService.addAttributes(target, { [key]: metadata, }, propertyName);
		else
			throw (new Error('DecoratorsService.setClassPropertyMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static getClassPropertyMetadata(key: string, propertyName: string | symbol, target: Function | Object): Dictionary<any> | undefined {
		if (isClass(target) && target.hasOwnProperty(propertyName))
			return (DecoratorsService.getAttributes(/*constructor*/target, propertyName, [key]));
		else if (isClass(target)) {
			const result: Dictionary<any> | undefined = DecoratorsService.getAttributes(/*constructor*/(target as any).prototype, propertyName, [key]);
			if (isDefined(result) && isDefined(result[key]))
				return (result);
			// Try to get the property from the design properties metadata
			const data: Dictionary<any>[] = Reflect.getMetadata(DESIGN_PROPERTIES, target) || [];
			const property: Dictionary<any> | undefined = data.find((prop: Dictionary<any>): boolean => prop.name === propertyName.toString());
			if (property) {
				const metadata: Dictionary<any> = {};
				metadata[key] = property;
				return (metadata);
			}
			return (undefined);
		} else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(propertyName))
			return (DecoratorsService.getAttributes(target.constructor, propertyName, [key]));
		else if (isClassInstance(target))
			return (DecoratorsService.getAttributes(target, propertyName, [key]));
		else
			throw (new Error('DecoratorsService.getClassPropertyMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static setClassAccessorMetadata(key: string, methodName: string | symbol, target: Function | Object, metadata: Dictionary<any> = {}): void {
		if (isClass(target) && target.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(/*constructor*/target, { [key]: metadata, }, methodName);
		else if (isClass(target))
			DecoratorsService.addAttributes(/*constructor*/(target as any).prototype, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && target.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(target, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(methodName))
			DecoratorsService.addAttributes(target.constructor, { [key]: metadata, }, methodName);
		else if (isClassInstance(target) && (target as any).__proto__ && (target as any).__proto__.hasOwnProperty(methodName))
			DecoratorsService.addAttributes((target as any).__proto__, { [key]: metadata, }, methodName);
		else
			throw (new Error('DecoratorsService.setClassMethodMetadata: target must be a Class or an Object with a constructor.'));
	}

	public static getClassAccessorMetadata(key: string, accessorName: string | symbol, target: Function | Object): Dictionary<any> | undefined {
		if (isClass(target) && target.hasOwnProperty(accessorName))
			return (DecoratorsService.getAttributes(/*constructor*/target, accessorName, [key]));
		else if (isClass(target))
			return (DecoratorsService.getAttributes(/*constructor*/(target as any).prototype, accessorName, [key]));
		else if (isClassInstance(target) && target.hasOwnProperty(accessorName))
			return (DecoratorsService.getAttributes(target, accessorName, [key]));
		else if (isClassInstance(target) && target.constructor && target.constructor.hasOwnProperty(accessorName))
			return (DecoratorsService.getAttributes(target.constructor, accessorName, [key]));
		else if (isClassInstance(target) && (target as any).__proto__ && (target as any).__proto__.hasOwnProperty(accessorName))
			return (DecoratorsService.getAttributes((target as any).__proto__, accessorName, [key]));
		// else if (isClassInstance(target))
		// 	return (DecoratorsService.getAttributes(target, methodName, [key]));
		else
			throw (new Error('DecoratorsService.getClassMethodMetadata: target must be a Class or an Object with a constructor.'));
	}
	//#endregion

	//#region Debugging Decorators
	public inspect(): Dictionary<any> {
		const staticMembers: IClassMembers = this.listStatics();
		const members: IClassMembers = this.listMembers();

		const result: Dictionary<any> = {
			class: this.classDecorator(),
			staticProperties: this.propertiesDecorator(staticMembers.properties),
			staticAccessors: this.accessorsDecorator(staticMembers.accessors),
			staticMethods: this.methodsDecorator(staticMembers.methods),
			prototype: this.prototypeDecorator(),
			properties: this.propertiesDecorator(members.properties),
			accessors: this.accessorsDecorator(members.accessors),
			methods: this.methodsDecorator(members.methods),
		};

		return (result);
	}

	public static debug(target: Object, space?: string | number): any {
		const debug: DecoratorsService = new DecoratorsService(target);
		const result: Dictionary<any> = debug.inspect();
		if (isDefined(space) && !isEmpty(space))
			console.debug(DecoratorsService.formatToJson(result, space));
		else
			console.debug(result);
		return (result);
	}

	public static formatToJson(value: any, space?: string | number): string {
		const replacer: (_key: string, value: any) => any
			= (_key: string, value: any): any => {
				if (isFunction(value))
					return (`f ${value.name}`);
				return (value);
			};

		return (JSON.stringify(value, replacer, space));
	}

	protected listStatics(): IClassMembers {
		const target: any = isClass(this.target) ? this.target : this.target.constructor;
		const names: string[] = Object.getOwnPropertyNames(target)
			.filter((name: string): boolean => !['length', 'constructor', 'name', 'prototype'].includes(name));
		const accessors: string[] = names.filter((name: string): boolean => {
			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, name);
			return (!!(descriptor && (descriptor.get || descriptor.set)));
		});
		const methods: string[] = names.filter((name: string): boolean =>
			isFunction((target as any)[name]) //|| target.hasOwnProperty(name))
			&& !accessors.includes(name)
		);
		const properties: (string | symbol)[] = Reflect.ownKeys(target)
			.filter((name: string | symbol): boolean =>
				![...accessors, ...methods].includes(name.toString())
				&& !['length', 'constructor', 'name', 'prototype'].includes(name.toString())
			);
		return ({
			properties,
			accessors,
			methods,
		});
	}

	protected listMembers(): IClassMembers {
		const prototype: object = (this.target as any).prototype ?? Reflect.getPrototypeOf(this.target);
		const constructors: string = (this.target as any).name ?? prototype.constructor.name;
		const names: string[] = Object.getOwnPropertyNames(prototype)
		const accessors: string[] = names.filter((name: string): boolean => {
			const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(prototype, name);
			return (!!(descriptor && (descriptor.get || descriptor.set)));
		});
		const methods: string[] = names.filter((name: string): boolean =>
			name !== 'constructor' && isFunction((prototype as any)[name])
		);
		// Properties are invisible from the prototype, can only be fetched from the instance
		//const properties = Object.getOwnPropertyNames((target as any).prototype);
		// Trying to fetch from a Property Decorator
		const designProperties: any = Reflect.getMetadata(DESIGN_PROPERTIES, prototype.constructor) || [];
		const properties: string[] = designProperties.map((property: Dictionary<any>): string => property.name)
			.filter((name: string): boolean => ![...accessors, ...methods].includes(name));
		return ({
			constructors,
			properties,
			accessors,
			methods,
		});
	}

	protected classDecorator(): Dictionary<any> {
		const target: any = isClass(this.target) ? this.target : this.target.constructor;
		const keys: (string | symbol)[] = Reflect.getMetadataKeys(target);

		const metadata: Dictionary<any> = {};
		(keys || []).map((name: string | symbol): void => {
			metadata[name.toString()] = Reflect.getMetadata(name, target);
		});

		return ({
			keys: (keys || []).map((key: string | symbol): string => key.toString()),
			...metadata,
		});
	}

	protected prototypeDecorator(): Dictionary<any> {
		const prototype: object = (this.target as any).prototype ?? Reflect.getPrototypeOf(this.target);
		const keys: (string | symbol)[] = Reflect.getMetadataKeys(prototype);
		const metadata: Dictionary<any> = {};
		(keys || []).map((key: string | symbol): void => {
			metadata[key.toString()] = Reflect.getMetadata(key, prototype);
		});
		return ({
			keys: (keys || []).map((key: string | symbol): string => key.toString()),
			...metadata,
		});
	}

	protected propertiesDecorator(names: (string | symbol)[]): Dictionary<any> {
		const metadata: Dictionary<any> = {};
		(names || []).map((name: string | symbol): void => {
			let target: object = this.target;
			let keys: (string | symbol)[] = Reflect.getMetadataKeys(target, name);
			if (isEmpty(keys)) {
				target = (this.target as any).prototype ?? (Reflect.getPrototypeOf(this.target) as any).constructor;
				keys = Reflect.getOwnMetadataKeys(target, name);
			}
			metadata[name.toString()] = {
				keys: keys.map((key: string | symbol): string => key.toString()),
			};
			(keys || []).map((key: string | symbol): void => {
				metadata[name.toString()] = {
					...metadata[name.toString()],
					[key.toString()]: Reflect.getMetadata(key, target, name),
				};
			});
		});

		return ({
			//keys,
			...metadata,
		});
	}

	protected methodsDecorator(names: string[]): Dictionary<any> {
		const metadata: Dictionary<any> = {};
		(names || []).map((name: string): void => {
			let target: object = this.target;
			let keys: (string | symbol)[] = Reflect.getMetadataKeys(target, name);
			if (isEmpty(keys)) {
				target = (this.target as any).prototype ?? (Reflect.getPrototypeOf(this.target) as any).constructor;
				keys = Reflect.getOwnMetadataKeys(target, name);
			}
			metadata[name] = {
				keys: keys.map((key: string | symbol): string => key.toString()),
			};
			(keys || []).map((key: string | symbol): void => {
				metadata[name] = {
					...metadata[name],
					[key.toString()]: Reflect.getMetadata(key, target, name),
				};
			});
			// Parameters
			// const parameterKeys: (string | symbol)[] = Reflect.getMetadataKeys((instance as any).__proto__, name);
			// parameterKeys
			// 	.filter((key: string | symbol): boolean => !['decoratedMethod', 'decoratedAccessor', 'design:paramtypes', 'design:type', 'design:returntype'].includes(key.toString()))
			// 	.map((key: string | symbol): void => {
			// 		const parameterMetadata: any[] = Reflect.getOwnMetadata(key, (instance as any).__proto__, name);
			// 		if (parameterMetadata && parameterMetadata.length > 0)
			// 			console.log(`Parameter ${name} Metadata ${key.toString()}:`, parameterMetadata);
			// 	});
		});

		return ({
			//keys,
			...metadata,
		});
	}

	protected accessorsDecorator(names: string[]): Dictionary<any> {
		// const prototype: object = (this.target as any).prototype ?? Reflect.getPrototypeOf(this.target);
		const metadata: Dictionary<any> = {};
		(names || []).map((name: string): void => {
			let target: object = this.target;
			let keys: (string | symbol)[] = Reflect.getMetadataKeys(target, name);
			if (isEmpty(keys)) {
				target = (this.target as any).prototype ?? (Reflect.getPrototypeOf(this.target) as any).constructor;
				keys = Reflect.getOwnMetadataKeys(target, name);
			}
			// let descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(prototype.constructor, name);
			// if (isUndefined(descriptor))
			// 	descriptor = Object.getOwnPropertyDescriptor(prototype, name);
			metadata[name] = {
				keys: keys.map((key: string | symbol): string => key.toString()),
			};
			(keys || []).map((key: string | symbol): void => {
				metadata[name] = {
					...metadata[name],
					[key.toString()]: Reflect.getMetadata(key, target, name), //.filter((item: any): boolean => Boolean(item)),
				};
			});
		});

		return ({
			//keys,
			...metadata,
		});
	}
	//#endregion

}
//#endregion

//#region Decorators
export function debugDecorators(target: Function): void /*Function*/ {
	DecoratorsService.debug(target);
	//return (target);
}
//#endregion

export default DecoratorsService;
