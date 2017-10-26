import * as assert from 'assert';
import { Mock } from 'typemoq';
import { Extension } from 'vscode';

import getThemeInfo from '../src/getThemeInfo';

function ext(themes: any): Extension<null> {
    return {
        id: 'some.extension',
        extensionPath: '/',
        isActive: false,
        exports: null,
        activate: () => Promise.resolve(null),
        packageJSON: {
            contributes: { themes },
        },
    };
}

suite('getThemeInfo', () => {

    test('should return empty list for no extensions', () => {
        const themeInfo = getThemeInfo([]);

        assert.deepEqual(themeInfo, []);
    });

    test('should return theme info from extensions', () => {
        const exts = [
            ext([{
                label: 'Monokai',
                uiTheme: 'vs-dark',
            }]),
            ext([
                {
                    label: 'Tomorrow',
                    uiTheme: 'vs',
                },
                {
                    label: 'Solarized Dark',
                    uiTheme: 'vs-dark',
                },
            ]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepEqual(themeInfo, [
            { name: 'Monokai', variant: 'dark' },
            { name: 'Tomorrow', variant: 'light' },
            { name: 'Solarized Dark', variant: 'dark' },
        ]);
    });

    test('should return empty list if no extensions with themes', () => {
        const themeInfo = getThemeInfo([ext(null), ext(undefined), ext([])]);

        assert.deepEqual(themeInfo, []);
    });

    //test('should not ')

});
