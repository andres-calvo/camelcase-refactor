// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as readdirp from "readdirp";
const camelCase = require("lodash/camelCase");
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
  const CSS_FILE_FILTER = ["*.module.scss", "*.module.sass", "*.module.css"];
  const JSX_TSX_FILE_FILTER = ["*.tsx", "*.jsx"];
  const CSS_CLASS_RegExp = new RegExp(/(?<=(\.))([_a-zA-Z]+[_a-zA-Z0-9-]*)/g);
  const CLASSNAME_RegExp = new RegExp(
    /(?<=(styles\.))([_a-zA-Z]+[_a-zA-Z0-9-]*)/g
  );
    const isCamelCase = (string:string)=>{
      return /^[a-z][A-Za-z]+\d*$/.test(string)
    }
  const refactor = async (type: "CSS" | "REACT") => {
    const wrksFolders = vscode.workspace.workspaceFolders;

    if (!wrksFolders) return [];
    const basePath = wrksFolders?.length > 0 ? wrksFolders[0].uri.fsPath : null;
    if (!basePath) return [];
    const data = readdirp(basePath, {
      fileFilter: type == "CSS" ? CSS_FILE_FILTER : JSX_TSX_FILE_FILTER,
      directoryFilter: ["!.git", "!*modules"],
    });
    const regexp = type == "CSS" ? CSS_CLASS_RegExp : CLASSNAME_RegExp;
    for await (const entry of data) {
      const { fullPath } = entry;
      const fileData = await fs.promises.readFile(fullPath, "utf-8");
      const newFile = fileData.replace(regexp, (match) => {
        if(isCamelCase(match)) return match
        const string = match.toLocaleLowerCase();
        return camelCase(string);
      });
      await fs.promises.writeFile(fullPath, newFile);
    }
  };
  let CSSClasses = vscode.commands.registerCommand(
    "camelcase-refactor.camelCaseCSS",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      await refactor("CSS");

      vscode.window.showInformationMessage(
        "All Classes converted to camelCase"
      );
    }
  );

  let ReactClassName = vscode.commands.registerCommand(
    "camelcase-refactor.camelCaseJSX|TSX",
    async () => {
      await refactor("REACT");
      vscode.window.showInformationMessage(
        "All ClassNames converted to camelCase"
      );
    }
  );

  context.subscriptions.push(CSSClasses, ReactClassName);
}

// this method is called when your extension is deactivated
export function deactivate() {}
