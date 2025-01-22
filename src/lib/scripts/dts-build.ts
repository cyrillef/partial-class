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

import _fs from 'fs/promises';
import _path from 'path';
import _ts from 'typescript';

//#region JSON.stringify circular replacer
type TSReplacer = (key: string, value: any) => any;

const circularReplacer: () => TSReplacer
	= (): TSReplacer => {
		const seen: WeakSet<any> = new WeakSet<any>();
		return ((key: string, value: any): any => {
			if (typeof value === 'object' && value !== null) {
				if (seen.has(value))
					return ('[Circular]');
				seen.add(value);
			}
			if (key === 'kind')
				return (_ts.SyntaxKind[value]);
			if (key === 'flags')
				return (_ts.NodeFlags[value]);
			if (key === 'modifierFlagsCache')
				return (_ts.ModifierFlags[value]);
			//return (_ts.SymbolFlags[value]);
			//InternalSymbolName
			//TypeFlags
			//ObjectFlags
			//ElementFlags
			// SignatureKind

			return (value);
		});
	};
//#endregion

//#region Array extensions
// interface Array<T> {
// 	includesRegex(this: string[], regex: RegExp): boolean;
// }

(Array.prototype as any).includesRegex = function (this: string[], regex: RegExp): boolean {
	return (this.some((item: string): boolean => regex.test(item)));
};
//#endregion

//#region TS creators
type TSConfigParseResult = {
	config?: any;
	error?: _ts.Diagnostic;
}

type TSParserDispatcher = Map<_ts.SyntaxKind, (tsCreator: TSCreator, node: _ts.Node) => void>;
type TSParserStorage = Map<string, any>; // _ts.Statement

class TSCreator {

	//public filePath: string
	//public configPath: string
	public tsconfig: _ts.ParsedCommandLine = undefined as any as _ts.ParsedCommandLine;
	public sourceFile: _ts.SourceFile = undefined as any as _ts.SourceFile;
	public targetFile: _ts.SourceFile = undefined as any as _ts.SourceFile;
	public dispatcher: TSParserDispatcher = new Map<_ts.SyntaxKind, (tsCreator: TSCreator, node: _ts.Node) => Promise<void>>();
	public interface: TSParserStorage = new Map<string, any>(); // _ts.Statement
	public namespace: TSParserStorage = new Map<string, any>(); // _ts.Statement

	//#region constructor
	protected constructor(public filePath: string, public configPath: string) {
		try {
			const configFile: TSConfigParseResult = _ts.readConfigFile(configPath, _ts.sys.readFile);
			this.tsconfig = _ts.parseJsonConfigFileContent(configFile.config, _ts.sys, _path.dirname(configPath));
		} catch (error: any) {
			console.error('Cannot find tsconfig.json file', configPath, error);
			process.exit(0);
		}
	}

	public static async create(filePath: string, configPath: string): Promise<TSCreator> {
		try {
			const tsCreate: TSCreator = new TSCreator(filePath, configPath);
			const fileContent: string = await _fs.readFile(filePath, 'utf8');
			tsCreate.sourceFile = _ts.createSourceFile(filePath, fileContent, _ts.ScriptTarget.Latest, true);
			return (tsCreate);
		} catch (error: any) {
			console.error('Cannot find source file', filePath, error);
			process.exit(0);
		}
	}
	//#endregion

	//#region Aliases
	public getAliasEquivalent(absolutePath: string): string | null {
		absolutePath = _path.resolve(absolutePath);
		const baseUrl: string = this.tsconfig.options.rootDir || '';
		const paths: _ts.MapLike<string[]> = this.tsconfig.options.paths || {};

		let returnedPath: string | null = null;
		Object.entries(paths).forEach(([alias, aliasPaths]: [string, string[]]): void => {
			for (const aliasPath of aliasPaths) {
				const resolvedAliasPath: string = _path.resolve(baseUrl, aliasPath.replace('*', ''));
				if (absolutePath.startsWith(resolvedAliasPath)) {
					const relativePath: string = _path.relative(resolvedAliasPath, absolutePath);
					returnedPath = alias.replace('*', relativePath.replace(/\\/g, '/'));
					break;
				}
			}
		});
		return (returnedPath);
	}

	public resolveAlias(aliasPath: string): string | undefined {
		const baseUrl: string = this.tsconfig.options.baseUrl || '';
		const paths: _ts.MapLike<string[]> | undefined = this.tsconfig.options.paths || {};

		for (const alias in paths) {
			const aliasPattern: RegExp = new RegExp(`^${alias.replace('*', '(.*)')}$`);
			const match: RegExpMatchArray | null = aliasPath.match(aliasPattern);
			if (match) {
				const resolvedPath: string = paths[alias][0].replace('*', match[1]);
				return (_path.resolve(baseUrl, resolvedPath));
			}
		}
		return (_path.resolve(baseUrl, aliasPath));
	}
	//#endregion

	//#region TS parsing
	public async visit(dispatcher: TSParserDispatcher): Promise<void> {
		const tsCreator: TSCreator = this;

		const _visit: (node: _ts.Node) => Promise<void>
			= async (node: _ts.Node): Promise<void> => {
				if (this.dispatcher.has(node.kind))
					await this.dispatcher.get(node.kind)!(tsCreator, node);
				for (let i = 0; i < node.getChildCount(); i++)
					await _visit(node.getChildAt(i));
			};

		this.dispatcher = dispatcher;
		await _visit(this.sourceFile);
	}

	public iterateClassMembers(classDeclaration: _ts.ClassDeclaration) {
		classDeclaration.members.forEach((member: _ts.ClassElement): void => {
			if (_ts.isPropertyDeclaration(member)) {
				//console.log(`Property: ${member.name.getText()}`);
				if (this.isPublic(member) && this.isStatic(member))
					this.namespace.set(member.name.getText(), this.createVariableStatement(member));
				// Ignore properties, they do not propagate to the Final class - Javascript limitation
			} else if (_ts.isMethodDeclaration(member)) {
				if (this.isPublic(member) && this.isStatic(member))
					this.namespace.set(member.name.getText(), this.createMethod(member));
				else if (this.isPublic(member) && !this.isStatic(member))
					this.interface.set(member.name.getText(), this.createMethod(member));
			} else if (_ts.isConstructorDeclaration(member)) {
				// Do Nothing
			} else {
				// Not supported
				console.warn(`Unsupported member: ${member.getText()}`);
			}
		});
	}
	//#endregion

	//#region TS creators
	public createComment(comments: string): _ts.NotEmittedStatement {
		const comment: _ts.NotEmittedStatement = _ts.factory.createNotEmittedStatement(_ts.factory.createIdentifier(comments));
		return (comment);
	}

	public createImportElement(node: _ts.ClassDeclaration): _ts.ImportDeclaration {
		const importSpecifier: _ts.ImportSpecifier = _ts.factory.createImportSpecifier(
			false,
			undefined,
			_ts.factory.createIdentifier(node.name?.text || 'unknown')
		);
		const namedImports: _ts.NamedImports = _ts.factory.createNamedImports([importSpecifier]);
		const importClause: _ts.ImportClause = _ts.factory.createImportClause(false, undefined, namedImports);

		//console.log(node.getSourceFile().fileName);
		const alias: string | null = this.getAliasEquivalent(node.getSourceFile().fileName);
		//console.log(alias);
		const importDeclaration: _ts.ImportDeclaration = _ts.factory.createImportDeclaration(
			undefined,
			importClause,
			_ts.factory.createStringLiteral(alias || node.getSourceFile().fileName),
		);
		return (importDeclaration);
	}

	public createModuleDeclaration(path: string, children: _ts.Statement[]): _ts.ModuleDeclaration {
		const alias: string | null = this.getAliasEquivalent(path);
		const moduleName: _ts.StringLiteral = _ts.factory.createStringLiteral(alias || path);
		const moduleBlock: _ts.ModuleBlock = _ts.factory.createModuleBlock(children);
		const moduleDeclaration: _ts.ModuleDeclaration = _ts.factory.createModuleDeclaration(
			//undefined,
			[_ts.factory.createModifier(_ts.SyntaxKind.DeclareKeyword)],
			moduleName,
			moduleBlock,
			_ts.NodeFlags.None
		);
		return (moduleDeclaration);
	}

	public createNamespace(nsName: string, statements: _ts.Statement[]): _ts.ModuleDeclaration {
		const namespaceDeclaration: _ts.ModuleDeclaration = _ts.factory.createModuleDeclaration(
			undefined, //[_ts.factory.createModifier(_ts.SyntaxKind.DeclareKeyword)],
			_ts.factory.createIdentifier(nsName),
			_ts.factory.createModuleBlock(statements),
			_ts.NodeFlags.Namespace
		);
		return (namespaceDeclaration);
	}

	public createInterface(interfaceName: string, members: _ts.TypeElement[]): _ts.InterfaceDeclaration {
		const interfaceDeclaration: _ts.InterfaceDeclaration = _ts.factory.createInterfaceDeclaration(
			undefined,
			_ts.factory.createIdentifier(interfaceName),
			undefined,
			undefined,
			members
		);
		return (interfaceDeclaration);
	}

	public createVariable(member: _ts.PropertyDeclaration): _ts.VariableDeclaration {
		// const property: _ts.PropertyDeclaration = _ts.factory.createPropertyDeclaration(
		// 	undefined, // [_ts.factory.createModifier(_ts.SyntaxKind.PublicKeyword)],
		// 	_ts.factory.createIdentifier('property'),
		// 	undefined,
		// 	undefined,
		// 	undefined
		// );
		const property: _ts.VariableDeclaration = _ts.factory.createVariableDeclaration(
			_ts.factory.createIdentifier(member.name.getText()),
			undefined,
			member.type,
			undefined
		);
		return (property);
	}

	public createVariableStatement(member: _ts.PropertyDeclaration): _ts.VariableStatement {
		const property: _ts.VariableDeclaration = this.createVariable(member);
		const variableDeclarationList: _ts.VariableDeclarationList = _ts.factory.createVariableDeclarationList(
			[property],
			_ts.NodeFlags.Let
		);
		const variableStatement: _ts.VariableStatement = _ts.factory.createVariableStatement(
			undefined, // Modifiers (optional)
			variableDeclarationList
		);
		return (variableStatement);
	}

	public createMethod(member: _ts.MethodDeclaration): _ts.MethodDeclaration | _ts.FunctionDeclaration {
		if (!this.isStatic(member)) {
			const method: _ts.MethodDeclaration = _ts.factory.createMethodDeclaration(
				undefined,
				undefined,
				member.name,
				undefined,
				undefined,
				member.parameters,
				member.type,
				undefined
			);
			return (method);
		}

		const fct: _ts.FunctionDeclaration = _ts.factory.createFunctionDeclaration(
			undefined,
			undefined,
			member.name.getText(),
			undefined,
			member.parameters,
			member.type,
			undefined
		);
		return (fct);
	}

	//#endregion

	//#region TS injectors
	public createTargetSource(): _ts.SourceFile {
		const dtsFilePath: string = this.filePath.replace(/\.ts$/, '.d.ts');
		const comments: string = '// Do not modify this file. It is auto-generated from the original file.\n/*jshint esversion: 9 */\nexport const version: string\n';
		// const comments: string = '// Do not modify this file. It is auto-generated from the original file.\n/*jshint esversion: 9 */\n\n';
		this.targetFile = _ts.createSourceFile(dtsFilePath, comments, _ts.ScriptTarget.Latest, false, _ts.ScriptKind.TS);
		// const comments: string = '// Do not modify this file. It is auto-generated from the original file.\nconst _version: string = \'1.0.0.0\'\n';
		// targetSource = createComment(targetSource, comments);
		return (this.targetFile);
	}

	public inject(statements: _ts.Statement[]): _ts.SourceFile {
		if (!this.targetFile)
			this.createTargetSource();
		this.targetFile = _ts.factory.updateSourceFile(this.targetFile, [...this.targetFile.statements, ...statements]);
		return (this.targetFile);
	}
	//#endregion

	//#region Utilities
	public hasDecorator(node: _ts.HasDecorators): string[] | false {
		const decorators: string[] = [];
		for (let i = 0; node.modifiers && i < node.modifiers.length; i++) {
			if (_ts.isDecorator(node.modifiers[i])) { // node.modifiers[i].kind === _ts.SyntaxKind.Decorator
				const decoratorName: string = (node.modifiers[i] as _ts.Decorator).expression.getFullText(); // .expression.text
				decorators.push(decoratorName);
			}
		}
		return (decorators.length ? decorators : false);
	}

	public isPublic(property: _ts.PropertyDeclaration | _ts.MethodDeclaration): boolean {
		const modifiers: _ts.NodeArray<_ts.ModifierLike> | undefined = property.modifiers;
		const isPrivate: boolean | undefined = modifiers?.some((modifier: _ts.ModifierLike): boolean => modifier.kind === _ts.SyntaxKind.PrivateKeyword);
		const isProtected: boolean | undefined = modifiers?.some((modifier: _ts.ModifierLike): boolean => modifier.kind === _ts.SyntaxKind.ProtectedKeyword);
		return (!isPrivate && !isProtected);
	}

	public isStatic(property: _ts.PropertyDeclaration | _ts.MethodDeclaration): boolean {
		const modifiers: _ts.NodeArray<_ts.ModifierLike> | undefined = property.modifiers;
		const isStatic: boolean | undefined = modifiers?.some((modifier: _ts.ModifierLike): boolean => modifier.kind === _ts.SyntaxKind.StaticKeyword);
		return (!!isStatic);
	}
	//#endregion

	//#region toJson
	public toJson(): string {
		const jsonString = JSON.stringify(this.sourceFile, circularReplacer(), 4);
		return (jsonString);
	}

	public async saveJsonFile(): Promise<string> {
		const jsonString: string = this.toJson();
		const jsonFilePath: string = this.filePath.replace(/\.ts$/, '.json');
		await _fs.writeFile(jsonFilePath, jsonString);
		return (jsonString);
	}
	//#endregion

	//#region DTS file
	public async saveDtsFile(): Promise<void> {
		const printer: _ts.Printer = _ts.createPrinter({
			removeComments: false,
			newLine: _ts.NewLineKind.LineFeed,
			omitTrailingSemicolon: false,
			noEmitHelpers: false,
		});
		//const st = printer.printNode(_ts.EmitHint.Unspecified, targetSource, _ts.createSourceFile('temp.ts', '', _ts.ScriptTarget.Latest, true));
		const content: string = printer.printFile(this.targetFile);
		const dtsFilePath: string = this.filePath.replace(/\.ts$/, '.d.ts');
		await _fs.writeFile(dtsFilePath, content);
	}
	//#endregion

}

//#endregion

const onFinalClassDefinition: (tsCreator: TSCreator, node: _ts.Node) => Promise<void>
	= async (tsCreator: TSCreator, node: _ts.Node): Promise<void> => {
		const item: _ts.ClassDeclaration = node as _ts.ClassDeclaration;
		const decorators: string[] | false = tsCreator.hasDecorator(item);
		if (decorators && decorators.includes('Final')) {
			//console.log(`ClassDeclaration: ${item.getText()}`);
			const importDeclaration: _ts.ImportDeclaration = tsCreator.createImportElement(item);

			const interfaceDeclaration: _ts.InterfaceDeclaration = tsCreator.createInterface(
				item.name?.text || 'unknown',
				Array.from(tsCreator.interface.values()) // []
			);

			const namespaceDeclaration: _ts.ModuleDeclaration = tsCreator.createNamespace(
				item.name?.text || 'unknown',
				Array.from(tsCreator.namespace.values()) // []
			);

			const moduleDeclaration: _ts.ModuleDeclaration = tsCreator.createModuleDeclaration(
				item.getSourceFile().fileName,
				[interfaceDeclaration, namespaceDeclaration]
			);

			tsCreator.inject([importDeclaration, moduleDeclaration]);
			tsCreator.saveDtsFile();

			//tsCreator.iterateClassMembers(item);
		}
	};

const onPartialClassDefinition: (tsCreator: TSCreator, node: _ts.Node) => Promise<void>
	= async (tsCreator: TSCreator, node: _ts.Node): Promise<void> => {
		const item: _ts.ClassDeclaration = node as _ts.ClassDeclaration;
		const decorators: string[] | false = tsCreator.hasDecorator(item);
		const regex: RegExp = /Partial(\(\'\w+\'\))?/;
		if (decorators && (decorators as any).includesRegex(regex)) {
			// let finalName: string = '';
			// for (let i = 0; i < decorators.length; i++) {
			// 	const result: RegExpMatchArray | null = decorators[0].match(regex);
			// 	if ( result) {
			// 		finalName = result[1];
			// 		break;
			// 	}
			// }
			tsCreator.iterateClassMembers(item);
			//console.log(tsCreator);
		}
	};

const onExportDeclaration: (tsCreator: TSCreator, node: _ts.Node) => Promise<void>
	= async (tsCreator: TSCreator, node: _ts.Node): Promise<void> => {
		const item: _ts.ExportDeclaration = node as _ts.ExportDeclaration;
		const litteral: _ts.StringLiteral = item.moduleSpecifier as _ts.StringLiteral;
		if (litteral.getText()) {
			//console.log(`ExportDeclaration: ${litteral.getText()}`);

			const filePath2: string | undefined = tsCreator.resolveAlias(litteral.text + '.ts');
			// const tsCreator2: TSCreator = await TSCreator.create(filePath2 || '', tsCreator.configPath);
			// if (process.env.NODE_ENV === 'development')
			// 	await tsCreator2.saveJsonFile();

			const tsCreator2: TSCreator = await includeDependency(filePath2 || '', tsCreator.configPath);
			//console.log(tsCreator2);
			tsCreator2.interface.forEach((value: any, key: string): void => {
				tsCreator.interface.set(key, value);
			});
			tsCreator2.namespace.forEach((value: any, key: string): void => {
				tsCreator.namespace.set(key, value);
			});
		}
		// item.exportClause?.forEachChild((node: _ts.Node) => {
		// });
		//console.log(`ExportDeclaration: ${item.getText()}`);
	};

const includeDependency: (filePath: string, configPath: string) => Promise<TSCreator>
	= async (filePath: string, configPath: string): Promise<TSCreator> => {

		const tsCreator: TSCreator = await TSCreator.create(filePath, configPath);
		// if (process.env.NODE_ENV === 'development')
		// 	await tsCreator.saveJsonFile();

		await tsCreator.visit(
			new Map<_ts.SyntaxKind, (tsCreator: TSCreator, node: _ts.Node) => void>([
				[_ts.SyntaxKind.ClassDeclaration, onPartialClassDefinition],
			])
		);

		return (tsCreator);
	};

const onFileChange: (filePath: string, configPath: string) => Promise<void>
	= async (filePath: string, configPath: string): Promise<void> => {

		const tsCreator: TSCreator = await TSCreator.create(filePath, configPath);
		// if (process.env.NODE_ENV === 'development')
		// 	await tsCreator.saveJsonFile();

		await tsCreator.visit(
			new Map<_ts.SyntaxKind, (tsCreator: TSCreator, node: _ts.Node) => void>([
				[_ts.SyntaxKind.ClassDeclaration, onFinalClassDefinition],
				[_ts.SyntaxKind.ExportDeclaration, onExportDeclaration],
			])
		);

		//console.log(tsCreator);

		//if (containsFinalDecorator)
		//	tsCreator.saveDtsFile();
	};

(async () => {

	const filePath: string = process.argv[2];
	if (!filePath || filePath.endsWith('.d.ts') || !filePath.endsWith('.ts'))
		process.exit(0);

	const configPath: string = process.argv[3];
	console.log(`tsconfig.json = ${configPath}`);
	console.log(`source file = ${filePath}`);
	if (filePath && configPath)
		onFileChange(filePath, configPath);

})();
