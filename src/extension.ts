import * as vscode from 'vscode';

import { GtkThemeVariant, setGtkThemeVariant } from './gtk-theme-variant';
import processOutput from './process-output';

export function activate(context: vscode.ExtensionContext) {
    setGtkThemeVariant(GtkThemeVariant.Dark);
}

export function deactivate() {
    console.log('deactivate');
}
