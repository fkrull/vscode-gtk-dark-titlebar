import * as assert from 'assert';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import { WorkspaceConfiguration } from 'vscode';

import getXpropCommand from '../src/getXpropCommand';

suite('getXpropCommand', () => {

    const tempDir: string = path.join(os.tmpdir(), `gtk-dark-titlebar-${Math.random()}`);

    setup(async () => {
        await fs.mkdirs(tempDir);
    });

    teardown(async () => {
        await fs.remove(tempDir);
    });

    test('should return path to bundled command if appropriate bundled command exists', async () => {
        const binDir = path.join(tempDir, 'bin');
        const binary = path.join(binDir, `xprop-${process.platform}-${process.arch}`);
        await fs.mkdirs(binDir);
        await fs.writeFile(binary, 'binary');
        await fs.chmod(binary, 0o755);

        const result = await getXpropCommand(tempDir);

        assert.equal(result, binary);
    });

    test('should return "xprop" if bundled command doesn\'t exist', async () => {
        const binDir = path.join(tempDir, 'bin');
        await fs.mkdirs(binDir);

        const result = await getXpropCommand(tempDir);

        assert.equal(result, 'xprop');
    });

    test('should return "xprop" if "bin" directory doesn\'t exist', async () => {
        const result = await getXpropCommand(tempDir);

        assert.equal(result, 'xprop');
    });

});
