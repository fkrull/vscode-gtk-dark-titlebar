import * as assert from 'assert';

import processOutput from '../src/processOutput';

function fail(message: string) {
    assert.fail(undefined, undefined, message);
}

suite('processOutput', function() {

    this.timeout(2000);
    this.slow(500);

    test('should get output from command', async () => {
        const output = await processOutput([process.execPath, '-e', 'console.log("test output")']);

        assert.equal(output, 'test output\n');
    });

    test('should reject if command is missing', () => {
        return processOutput([`/nonexisting command/${Math.random()}`])
            .then(() => {
                fail('Promise should be rejected');
            })
            .catch((error: Error) => {
                assert.notEqual(error.message, '');
            });
    });

    test('should reject and get stderr output if command fails', () => {
        return processOutput([process.execPath, '-e', 'console.error("error message"); process.exit(8)'])
            .then(() => {
                assert.fail(undefined, undefined, 'Promise should be rejected');
            },
            (error: Error) => {
                assert.equal(error.message, 'error message\n');
            });
    });

});
