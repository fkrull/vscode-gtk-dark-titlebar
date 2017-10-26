import { Extension } from 'vscode';

type UiTheme = 'vs' | 'vs-dark';

interface ContributedThemeWithLabel {
    readonly label: string;
    readonly uiTheme: UiTheme;
}

interface ContributedThemeWithId {
    readonly id: string;
    readonly uiTheme: UiTheme;
}

type ContributedTheme = ContributedThemeWithLabel & ContributedThemeWithId;

function isCompleteTheme(v: any): v is ContributedTheme {
    return v != null &&
           (typeof(v.label) === 'string' || typeof(v.id) === 'string') &&
           ['vs', 'vs-dark'].includes(v.uiTheme);
}

function uiThemeToVariant(uiTheme: UiTheme): Extension.ThemeVariant {
    switch (uiTheme) {
        case 'vs': return 'light';
        case 'vs-dark': return 'dark';
    }
}

function getThemeList(ext: Extension<any>): any[] {
    return (ext.packageJSON && ext.packageJSON.contributes && ext.packageJSON.contributes.themes) || [];
}

function* yieldThemeInfo(allExtensions: Array<Extension<any>>): IterableIterator<Extension.ThemeInfo> {
    for (const ext of allExtensions) {
        for (const theme of getThemeList(ext)) {
            if (isCompleteTheme(theme)) {
                const name = theme.id !== undefined ? theme.id : theme.label;
                yield { name, variant: uiThemeToVariant(theme.uiTheme) };
            }
        }
    }
}

export default function getThemeInfo(allExtensions: Array<Extension<any>>): Extension.ThemeInfo[] {
    return Array.from(yieldThemeInfo(allExtensions));
}
