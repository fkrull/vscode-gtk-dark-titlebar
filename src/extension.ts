import * as vscode from 'vscode';

import getActiveThemeVariant from 'getActiveThemeVariant';
import processOutput from './processOutput';
import setGtkThemeVariant from './setGtkThemeVariant';

function updateGtkThemeVariant(): Promise<void> {
    const config = vscode.workspace.getConfiguration();
    return setGtkThemeVariant(
        getActiveThemeVariant(config),
        processOutput,
    ).catch((error) => {
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
