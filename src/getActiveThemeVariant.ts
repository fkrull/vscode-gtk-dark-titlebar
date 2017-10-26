import { WorkspaceConfiguration } from 'vscode';

function isThemeVariant(s: any): s is Extension.ThemeVariant {
    return ['light', 'dark'].includes(s);
}

export default function getActiveThemeVariant(config: WorkspaceConfiguration): Extension.ThemeVariant {
    const mode = config.get('gtkTitleBar.mode');
    if (isThemeVariant(mode)) {
        return mode;
    } else if (mode === 'auto') {
        // TODO
        return 'light';
    } else {
        return 'light';
    }
}
