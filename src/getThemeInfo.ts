import { Extension } from 'vscode';

class UiThemeMapping {
    public readonly 'vs' = 'light';
    public readonly 'vs-dark' = 'dark';
    public readonly 'hc-black' = 'dark';
}
type UiTheme = keyof UiThemeMapping;
const UiThemeValues = new UiThemeMapping();

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
           UiThemeValues.hasOwnProperty(v.uiTheme);
}

function uiThemeToVariant(uiTheme: UiTheme): Extension.ThemeVariant {
    return UiThemeValues[uiTheme];
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
