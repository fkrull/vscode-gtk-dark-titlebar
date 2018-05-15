import { WorkspaceConfiguration } from 'vscode';

export default async function getXpropCommand(
        extensionPath: string,
        config: WorkspaceConfiguration): Promise<string> {
    return 'xprop';
}
