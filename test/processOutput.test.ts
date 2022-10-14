import * as assert from 'assert';

import processOutput from '../src/processOutput';

suite('processOutput', function () {

    this.timeout(2000);
    this.slow(500);

    test('should get output from command', async () => {
        const output = await processOutput([process.env.NODEJS_BIN!, '-e', 'console.log("test output")']);

        assert.strictEqual(output, 'test output\n');
    });

    test('should reject if command is missing', () => {
        return processOutput([`/nonexisting command/${Math.random()}`])
            .then(() => {
                assert.fail('Promise should be rejected');
            })
            .catch((error: Error) => {
                assert.notStrictEqual(error.message, '');
            });
    });

    test('should reject and get stderr output if command fails', () => {
        return processOutput([process.env.NODEJS_BIN!, '-e', 'console.error("error message"); process.exit(8)'])
            .then(() => {
                assert.fail('Promise should be rejected');
            },
                (error: Error) => {
                    assert.strictEqual(error.message, 'error message\n');
                });
    });

});
