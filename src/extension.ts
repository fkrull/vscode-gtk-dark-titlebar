import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('hello world');
}

export function deactivate() {
    console.log('deactivate');
}
