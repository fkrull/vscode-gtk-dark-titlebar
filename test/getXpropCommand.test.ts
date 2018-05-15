import * as assert from 'assert';
import { Mock } from 'typemoq';
import { WorkspaceConfiguration } from 'vscode';

import getXpropCommand from '../src/getXpropCommand';

suite('getXpropCommand', () => {

    const configMock = Mock.ofType<WorkspaceConfiguration>();

    function givenSetting(key: string, value: string) {
        configMock
        .setup((x) => x.get(key))
        .returns(() => value);
    }

    setup(() => {
        configMock.reset();
    });

    test('should return "xprop"', async () => {
        const result = await getXpropCommand('', configMock.object);

        assert.equal(result, 'xprop');
    });

});
