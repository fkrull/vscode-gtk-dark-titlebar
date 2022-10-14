import * as assert from 'assert';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import getXpropCommand from '../src/getXpropCommand';

suite('getXpropCommand', () => {

    const tempDir: string = path.join(os.tmpdir(), `gtk-dark-titlebar-${Math.random()}`);

    setup(async () => {
        await fs.promises.mkdir(tempDir, { recursive: true });
    });

    teardown(async () => {
        await fs.promises.rm(tempDir, { recursive: true });
    });

    test('should return path to bundled command if appropriate bundled command exists', async () => {
        const binDir = path.join(tempDir, 'bin');
        const binary = path.join(binDir, `xprop-${process.platform}-${process.arch}`);
        await fs.promises.mkdir(binDir, { recursive: true });
        await fs.promises.writeFile(binary, 'binary');
        await fs.promises.chmod(binary, 0o755);

        const result = await getXpropCommand(tempDir);

        assert.strictEqual(result, binary);
    });

    test('should return "xprop" if bundled command doesn\'t exist', async () => {
        const binDir = path.join(tempDir, 'bin');
        await fs.promises.mkdir(binDir, { recursive: true });

        const result = await getXpropCommand(tempDir);

        assert.strictEqual(result, 'xprop');
    });

    test('should return "xprop" if "bin" directory doesn\'t exist', async () => {
        const result = await getXpropCommand(tempDir);

        assert.strictEqual(result, 'xprop');
    });
});
