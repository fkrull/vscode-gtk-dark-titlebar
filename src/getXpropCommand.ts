import * as fs from 'fs-extra';
import * as path from 'path';
import { WorkspaceConfiguration } from 'vscode';

const Default: string = 'xprop';

export default async function getXpropCommand(
    extensionPath: string,
): Promise<string> {
    const binary = path.join(extensionPath, 'bin', `xprop-${process.platform}-${process.arch}`);
    return await executable(binary) ? binary : Default;
}

async function executable(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath, fs.constants.X_OK);
        return true;
    } catch {
        return false;
    }
}
