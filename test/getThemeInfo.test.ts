import * as assert from 'assert';
import { Mock } from 'typemoq';
import { Extension } from 'vscode';

import getThemeInfo from '../src/getThemeInfo';

function ext(themes: any): Extension<null> {
    return extWithPkgJson({ contributes: { themes } });
}

function extWithPkgJson(packageJSON: any): Extension<null> {
    return {
        id: 'some.extension',
        extensionPath: '/',
        isActive: false,
        exports: null,
        activate: () => Promise.resolve(null),
        packageJSON,
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
        const exts = [
            ext(null),
            ext(undefined),
            ext([]),
            extWithPkgJson(undefined),
            extWithPkgJson({ contributes: null }),
            extWithPkgJson({ contributes: [] }),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepEqual(themeInfo, []);
    });

    test('should not include themes without label', () => {
        const exts = [
            ext([{ label: 'Monokai', uiTheme: 'vs-dark' }]),
            ext([{ notLabel: 'Theme', uiTheme: 'vs' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepEqual(themeInfo, [{ name: 'Monokai', variant: 'dark' }]);
    });

    test('should not include themes without uiTheme', () => {
        const exts = [
            ext([{ label: 'Monokai' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepEqual(themeInfo, []);
    });

    test('should not include themes with invalid uiTheme', () => {
        const exts = [
            ext([{ label: 'Monokai', uiTheme: 'vs-light' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepEqual(themeInfo, []);
    });

});
