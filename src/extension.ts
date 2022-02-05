// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import path = require("path");
import * as vscode from "vscode";
import * as fs from "fs";
import * as readdirp from "readdirp";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "camelcase-refactor" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "camelcase-refactor.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const wrksFolders = vscode.workspace.workspaceFolders;
      if (wrksFolders) {
        const basePath =
          wrksFolders?.length > 0 ? wrksFolders[0].uri.fsPath : null;
        if (!basePath) return null;
        const files = [];
        const isModule = new RegExp(/(.*module\.(scss|css|sass))/);
		const data =readdirp(basePath, {
			fileFilter: ["*.module.scss", "*.module.css", "*.module.css"],
			directoryFilter: ["!.git", "!*modules"],
		  })
        for await (const entry of data) {
          const { path } = entry;
          files.push(path);
          console.log(`${JSON.stringify({ path })}`);
        }
      }

      vscode.window.showInformationMessage(
        "Hello World from CamelCase Refactor!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
