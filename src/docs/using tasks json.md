Yes, you can use `tasks.json` in VSCode to automate tasks such as running scripts whenever a file is modified. While `tasks.json` doesn't directly support file watching, you can use external tools like `chokidar-cli` to watch for file changes and trigger a task.

Here's how you can set it up:

### Step 1: Install `chokidar-cli`

First, install `chokidar-cli` globally:

```bash
npm install -g chokidar-cli
```

### Step 2: Create a Script to Parse and Generate `.d.ts` Files

Create a script that will parse the TypeScript files and generate `.d.ts` files if the `@Final` decorator is present. Save this script as `generate-dts.js`:

```javascript
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function handleFileChange(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

  let containsFinalDecorator = false;

  function visit(node) {
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

function createDtsFile(filePath) {
  const dtsFilePath = filePath.replace(/\.ts$/, '.d.ts');
  const content = `// This file was generated because the original file contains the @Final decorator.\n`;
  fs.writeFileSync(dtsFilePath, content);
}

const filePath = process.argv[2];
if (filePath) {
  handleFileChange(filePath);
}
```

### Step 3: Configure `tasks.json`

Create or update the `tasks.json` file in the `.vscode` folder of your project to use `chokidar-cli` to watch for file changes and run the script:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Watch and Generate .d.ts",
      "type": "shell",
      "command": "chokidar '**/*.ts' -c 'node generate-dts.js {path}'",
      "problemMatcher": []
    }
  ]
}
```

### Step 4: Run the Task

1. Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type `Tasks: Run Task` and select it.
3. Choose `Watch and Generate .d.ts`.

This setup will watch for changes in TypeScript files and run the `generate-dts.js` script whenever a file is modified. The script will parse the file and generate a `.d.ts` file if the `@Final` decorator is present.

If you have any questions or need further assistance, feel free to ask!


----


You're right! `ts.Node` itself doesn't have a `decorators` property. Instead, you need to check for decorators on specific node types like `ts.ClassDeclaration`, `ts.MethodDeclaration`, etc. Here's an updated script that correctly checks for decorators on class declarations:

1. **Install Dependencies**:
   Ensure you have `typescript` and `ts-node` installed:
   ```bash
   npm install --save-dev typescript ts-node
   ```

2. **Create `tsconfig.json`**:
   If you don't have a `tsconfig.json` file, create one by running:
   ```bash
   tsc --init
   ```
   Then, add `"sourceMap": true` to the `compilerOptions` section:
   ```json
   {
     "compilerOptions": {
       "target": "ES6",
       "module": "commonjs",
       "sourceMap": true,
       "experimentalDecorators": true
     }
   }
   ```

3. **Write the TypeScript Script**:
   Create a TypeScript script (`your-script.ts`) that detects if a class has a decorator and performs an action. Here's an example:
   ```typescript
   import * as fs from 'fs';
   import * as path from 'path';
   import * as ts from 'typescript';

   const directoryPath = path.join(__dirname, 'src'); // Adjust the path to your TypeScript files

   function hasDecorator(node: ts.Node): boolean {
     if (ts.isClassDeclaration(node) && node.decorators) {
       return true;
     }
     return false;
   }

   function visit(node: ts.Node) {
     if (hasDecorator(node)) {
       console.log('Class with decorator found:', node);
       // Perform your action here
     }
     ts.forEachChild(node, visit);
   }

   function processFile(filePath: string) {
     const fileContent = fs.readFileSync(filePath, 'utf8');
     const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);
     visit(sourceFile);
   }

   function watchFiles(directory: string) {
     fs.watch(directory, (eventType, filename) => {
       if (filename && filename.endsWith('.ts')) {
         const filePath = path.join(directory, filename);
         processFile(filePath);
       }
     });
   }

   watchFiles(directoryPath);
   ```

4. **Configure Tasks**:
   Create or update the `.vscode/tasks.json` file in your project with the following configuration:
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "Watch and Run Script",
         "type": "shell",
         "command": "ts-node ./your-script.ts",
         "problemMatcher": [],
         "isBackground": true,
         "watching": {
           "filePattern": "**/*.ts",
           "beginsPattern": ".",
           "endsPattern": "."
         }
       }
     ]
   }
   ```
   Replace `"./your-script.ts"` with the path to your TypeScript script.

5. **Run the Task**:
   Open the Command Palette (⇧⌘P or Ctrl+Shift+P) and run the task by selecting `Tasks: Run Task` and choosing `Watch and Run Script`.

This setup will watch for changes in `.ts` files, detect if a class has a decorator, and perform the specified action[1](https://www.typescriptlang.org/docs/handbook/decorators.html)[2](https://techsparx.com/nodejs/typescript/decorators/properties.html)[3](https://blog.logrocket.com/practical-guide-typescript-decorators/). If you need further customization or run into any issues, feel free to ask!