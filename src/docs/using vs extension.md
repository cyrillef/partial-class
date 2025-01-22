To achieve this, you can create a VSCode extension that listens for file changes, parses the TypeScript files, and generates a `.d.ts` file if the `@Final` decorator is present. Here's a step-by-step guide:

### Step 1: Set Up Your Extension

1. **Install `yo` and `generator-code`**:
   ```bash
   npm install -g yo generator-code
   ```

2. **Generate a new extension**:
   ```bash
   yo code
   ```
   Follow the prompts to set up your extension.

### Step 2: Modify the Extension

1. **Open the generated extension folder** in VSCode.

2. **Install necessary dependencies**:
   ```bash
   npm install typescript @types/node
   ```

3. **Edit `src/extension.ts`** to add the file change listener, parse the TypeScript files, and generate the `.d.ts` file:

   ```typescript
   import * as vscode from 'vscode';
   import * as ts from 'typescript';
   import * as fs from 'fs';
   import * as path from 'path';

   export function activate(context: vscode.ExtensionContext) {
     console.log('Extension "final-decorator-watcher" is now active!');

     const watcher = vscode.workspace.createFileSystemWatcher('**/*.ts', false, false, false);

     watcher.onDidChange(uri => {
       handleFileChange(uri);
     });

     watcher.onDidCreate(uri => {
       handleFileChange(uri);
     });

     context.subscriptions.push(watcher);
   }

   function handleFileChange(uri: vscode.Uri) {
     const filePath = uri.fsPath;
     const fileContent = fs.readFileSync(filePath, 'utf8');
     const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

     let containsFinalDecorator = false;

     function visit(node: ts.Node) {
       if (ts.isClassDeclaration(node) && node.decorators) {
         for (const decorator of node.decorators) {
           if (ts.isCallExpression(decorator.expression) && ts.isIdentifier(decorator.expression.expression)) {
             if (decorator.expression.expression.text === 'Final') {
               containsFinalDecorator = true;
               break;
             }
           }
         }
       }
       ts.forEachChild(node, visit);
     }

     visit(sourceFile);

     if (containsFinalDecorator) {
       createDtsFile(filePath);
     }
   }

   function createDtsFile(filePath: string) {
     const dtsFilePath = filePath.replace(/\.ts$/, '.d.ts');
     const content = `// This file was generated because the original file contains the @Final decorator.\n`;
     fs.writeFileSync(dtsFilePath, content);
   }

   export function deactivate() {}
   ```

### Step 3: Test Your Extension

1. **Run the extension**:
   - Press `F5` to open a new VSCode window with your extension loaded.

2. **Modify any TypeScript file** in the workspace to trigger the creation of a `.d.ts` file if it contains the `@Final` decorator.

### Step 4: Package and Publish (Optional)

If you want to share your extension, you can package and publish it to the VSCode marketplace.

1. **Install `vsce`**:
   ```bash
   npm install -g vsce
   ```

2. **Package your extension**:
   ```bash
   vsce package
   ```

3. **Publish your extension**:
   Follow the publishing instructions on the VSCode website.

This extension will listen for changes in TypeScript files, parse them to check for the `@Final` decorator, and create a `.d.ts` file at the same location if the decorator is present. If you have any questions or need further assistance, feel free to ask!