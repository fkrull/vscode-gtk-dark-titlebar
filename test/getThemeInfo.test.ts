import * as assert from 'assert';
import { Extension, ExtensionKind, Uri } from 'vscode';

import getThemeInfo from '../src/getThemeInfo';

function ext(themes: any): Extension<null> {
    return extWithPkgJson({ contributes: { themes } });
}

function extWithPkgJson(packageJSON: any): Extension<null> {
    return {
        id: 'some.extension',
        extensionUri: Uri.parse('file:///'),
        extensionKind: ExtensionKind.UI,
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

        assert.deepStrictEqual(themeInfo, []);
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

        assert.deepStrictEqual(themeInfo, [
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

        assert.deepStrictEqual(themeInfo, []);
    });

    test('should not include themes without label', () => {
        const exts = [
            ext([{ label: 'Monokai', uiTheme: 'vs-dark' }]),
            ext([{ notLabel: 'Theme', uiTheme: 'vs' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, [{ name: 'Monokai', variant: 'dark' }]);
    });

    test('should not include themes without uiTheme', () => {
        const exts = [
            ext([{ label: 'Monokai' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, []);
    });

    test('should not include themes with invalid uiTheme', () => {
        const exts = [
            ext([{ label: 'Monokai', uiTheme: 'invalid' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, []);
    });

    test('should map "hc-black" to dark variant', () => {
        const exts = [
            ext([{ label: 'High Contrast', uiTheme: 'hc-black' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, [{ name: 'High Contrast', variant: 'dark' }]);
    });

    test('should include themes with id but no label', () => {
        const exts = [
            ext([{ id: 'Visual Studio Light', uiTheme: 'vs' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, [{ name: 'Visual Studio Light', variant: 'light' }]);
    });

    test('should prefer id if both id and label are specified', () => {
        const exts = [
            ext([{ id: 'Visual Studio Light', label: 'Light (Visual Studio)', uiTheme: 'vs' }]),
        ];

        const themeInfo = getThemeInfo(exts);

        assert.deepStrictEqual(themeInfo, [{ name: 'Visual Studio Light', variant: 'light' }]);
    });

});
