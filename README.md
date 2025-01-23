# Partial Class Experimental Library

TypeScript does not support partial classes in the same way that .NET does. In .NET, partial classes allow you to split the definition of a class across multiple files, which can be useful for organizing large classes or separating auto-generated code from manually written code.

However, you can achieve similar functionality in TypeScript using other techniques, such as class inheritance, mixins, or module augmentation. 

None of these are practicle, as it adds complexity on chaining partial classes, and maintain the code. However, combining these techniques can greatly helps.

## Installation

```bash
npm install partial-class --save
```

## Example

partials/partial-1.ts
```ts
import { Partial } from 'partial-class';

@Partial('MyClass')
export class MyClassPartial1 {
	/// ...
}

// or

@Partial
export class MyClass {
	/// ...
}
```

partials/partial-2.ts
```ts
import { Partial } from 'partial-class';

@Partial('MyClass')
export class MyClassPartial2 {
	/// ...
}

// or

@Partial
export class MyClass {
	/// ...
}
```

and more if you'd like.

MyClass.ts
```ts
import { Final } from 'partial-class';
export * from './partials/partial-1';
export * from './partials/partial-2';

@Final
export class MyClass {
	/// ...
}
```

## Limitations

All instance properties must be implemented in MyClass. Due to the nature of Javascript, it is impossible to create instance properties in partial classes. This is ok for static properties.

How to deal with this limitation:

partials/partial-1.ts
```ts
@Partial('MyClass')
export class MyClassPartial1 {
	// public myVar!: string; // Do not do this
	declare public myVar: string; // Do this only if you need it in MyClassPartial1 class
	/// ...
}
```

MyClass.ts
```ts
@Final
export class MyClass {
	public myVar: string = ''; // This is where it needs to be
	/// ...
}
```

## Need to Know

If you implement twice the same property (static), accessoror or method into two different partial class, the latest overrides the previous version.

## Make TS and VSCode happy

The easiest way is to augment your class with the public properties, accessors and methods. There is a script to create those augmentation file automatically. The sample provide uses it, but you can also call it manually.

```bash
cd ./src/sample
ts-node ../lib/scripts/dts-build.ts -P . ./final.ts ./tsconfig.json
# will output ./final.d.ts
```

# Installing the automatic augmentation file generation

In VSCode,

Install the ['Trigger Task on Save'](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.triggertaskonsave) extenstion.

.vscode/settings.json
```json
{
	...
	"triggerTaskOnSave.tasks": {
		"create_dts": [
			"!**/*.d.ts",
			"!**/*.d.tsx",
			"**/*.ts",
			"**/*.tsx",
		],
	},
	...
}
```

.vscode/tasks.json
```json
{
	...
	{
		"label": "create_dts",
		"type": "shell",
		"isBackground": true,
		"command": "ts-node",
		"args": [
			"-P",
			"${workspaceFolder}/src/sample",
			"${workspaceFolder}/src/lib/scripts/dts-build.ts",
			"${file}",
			"${workspaceFolder}/src/sample/tsconfig.json"
		],
		"problemMatcher": [],
		"group": {
			"kind": "build",
			"isDefault": true
		},
		"presentation": {
			"echo": false,
			"reveal": "never",
			"focus": false,
			"panel": "dedicated",
		},
	},
	...
}
```

# License
[MIT License](LICENSE)
