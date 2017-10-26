import * as vscode from 'vscode';

import { setGtkThemeVariant } from './gtk-theme-variant';
import processOutput from './process-output';

function updateGtkThemeVariant(): Promise<void> {
    return setGtkThemeVariant('dark')
        .catch((error) => {
            vscode.window.showErrorMessage(error.message);
        });
}

export function activate(context: vscode.ExtensionContext) {
    updateGtkThemeVariant();
    vscode.workspace.onDidChangeConfiguration(updateGtkThemeVariant);
}

export function deactivate() {
    console.log('deactivate');
}
