import { WorkspaceConfiguration } from 'vscode';

function isThemeVariant(s: any): s is Extension.ThemeVariant {
    return ['light', 'dark'].includes(s);
}

export default function getActiveThemeVariant(
        config: WorkspaceConfiguration,
        themeInfos: Extension.ThemeInfo[]): Extension.ThemeVariant {
    const mode = config.get('gtkTitleBar.mode');
    if (isThemeVariant(mode)) {
        return mode;
    } else if (mode === 'auto') {
        const theme = config.get('workbench.colorTheme');
        const themeInfo = themeInfos.find((v) => v.name === theme);
        if (themeInfo !== undefined) {
            return themeInfo.variant;
        } else {
            return 'dark';
        }
    } else {
        return 'light';
    }
}
