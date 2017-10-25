import * as vscode from 'vscode';

import { GtkThemeVariant, setGtkThemeVariant } from './gtk-theme-variant';
import processOutput from './process-output';

function getThemeVariant(): GtkThemeVariant {
    const config = vscode.workspace.getConfiguration('gtkTitleBar');
    switch (config.get('mode')) {
        case 'dark': return GtkThemeVariant.Dark;
        case 'light': return GtkThemeVariant.Light;
        default: return GtkThemeVariant.Light;
    }
}

function updateGtkThemeVariant(): Promise<void> {
    return setGtkThemeVariant(getThemeVariant())
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
