import * as vscode from 'vscode';

import getActiveThemeVariant from './getActiveThemeVariant';
import getThemeInfo from './getThemeInfo';
import processOutput from './processOutput';
import setGtkThemeVariant from './setGtkThemeVariant';

function updateGtkThemeVariant(themeInfo: Extension.ThemeInfo[]): Promise<void> {
    const config = vscode.workspace.getConfiguration();
    return setGtkThemeVariant(
        getActiveThemeVariant(config, themeInfo),
        'xprop',
        processOutput,
    ).catch((error) => {
        vscode.window.showErrorMessage(error.message);
    });
}

export function activate(context: vscode.ExtensionContext) {
    const themeInfo = getThemeInfo(vscode.extensions.all);
    updateGtkThemeVariant(themeInfo);
    vscode.workspace.onDidChangeConfiguration(updateGtkThemeVariant.bind(undefined, themeInfo));
}
