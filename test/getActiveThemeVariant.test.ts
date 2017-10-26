import * as assert from 'assert';
import { Mock } from 'typemoq';
import { WorkspaceConfiguration } from 'vscode';

import getActiveThemeVariant from '../src/getActiveThemeVariant';

suite('getActiveThemeVariant', () => {

    const configMock = Mock.ofType<WorkspaceConfiguration>();

    setup(() => {
        configMock.reset();
    });

    test('should return "light" if setting is "light"', () => {
        configMock
            .setup((x) => x.get('gtkTitleBar.mode'))
            .returns(() => 'light');

        const activeThemeVariant = getActiveThemeVariant(configMock.object);

        assert.equal(activeThemeVariant, 'light');
    });

    test('should return "dark" if setting is "dark"', () => {
        configMock
            .setup((x) => x.get('gtkTitleBar.mode'))
            .returns(() => 'dark');

        const activeThemeVariant = getActiveThemeVariant(configMock.object);

        assert.equal(activeThemeVariant, 'dark');
    });

});
