import * as vscode from 'vscode';

import getActiveThemeVariant from './getActiveThemeVariant';
import getThemeInfo from './getThemeInfo';
import processOutput from './processOutput';
import setGtkThemeVariant from './setGtkThemeVariant';

function updateGtkThemeVariant(
        config: vscode.WorkspaceConfiguration,
        themeInfo: Extension.ThemeInfo[]): Promise<void> {
    return setGtkThemeVariant(
        getActiveThemeVariant(config, themeInfo),
        processOutput,
    ).catch((error) => {
        vscode.window.showErrorMessage(error.message);
    });
}

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration();
    const themeInfo = getThemeInfo(vscode.extensions.all);

    updateGtkThemeVariant(config, themeInfo);
    vscode.workspace.onDidChangeConfiguration(() => {
        updateGtkThemeVariant(config, themeInfo);
    });
}
