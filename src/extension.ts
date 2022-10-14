import * as vscode from 'vscode';

import getActiveThemeVariant from './getActiveThemeVariant';
import getThemeInfo from './getThemeInfo';
import getXpropCommand from './getXpropCommand';
import processOutput from './processOutput';
import setGtkThemeVariant from './setGtkThemeVariant';

async function updateGtkThemeVariant(
    extensionPath: string,
    themeInfo: Extension.ThemeInfo[],
): Promise<void> {
    const config = vscode.workspace.getConfiguration();
    const xprop = await getXpropCommand(extensionPath);
    try {
        await setGtkThemeVariant(
            getActiveThemeVariant(config, themeInfo),
            xprop,
            processOutput,
        );
    } catch (error) {
        if (error instanceof Error) {
            vscode.window.showErrorMessage(error.message);
        } else {
            vscode.window.showErrorMessage(`An error occurred: ${error}`);
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    const themeInfo = getThemeInfo(vscode.extensions.all);
    updateGtkThemeVariant(context.extensionPath, themeInfo);
    vscode.workspace.onDidChangeConfiguration(updateGtkThemeVariant.bind(undefined, context.extensionPath, themeInfo));
}
