type ProcessID = number;
type WindowID = string;

interface PIDtoWID {
    readonly pid: ProcessID;
    readonly wid: WindowID;
}

function match(text: string, term: string | RegExp): string[] {
    const matches = text.match(term);
    return matches != null ? matches : [];
}

class SetGtkThemeVariant {
    constructor(
        private readonly processOutput: Extension.ProcessOutput,
    ) { }

    public async setGtkThemeVariant(variant: Extension.ThemeVariant): Promise<void> {
        const editorPIDs = await this.getEditorPIDs();
        const allWindows = await this.getProcessIDsForWindowIDs(await this.getWindowIDs());

        await Promise.all(allWindows
            .filter(({ wid, pid }) => editorPIDs.includes(pid))
            .map(({ wid }) => this.setThemeVariantOnWindow(wid, variant)));
}

    private async getEditorPIDs(): Promise<ProcessID[]> {
        const output = await this.processOutput(['pidof', process.execPath]);
        return match(output, /\d+/g)
            .map((s) => parseInt(s, 10));
    }

    private async getWindowIDs(): Promise<WindowID[]> {
        const output = await this.processOutput(['xprop', '-root', '_NET_CLIENT_LIST']);
        return match(output, /0x[\da-fA-F]+/g);
    }

    private async getProcessIDsForWindowIDs(wids: WindowID[]): Promise<PIDtoWID[]> {
        return await Promise.all(
            wids.map(async (wid) => {
                const output = await this.processOutput(['xprop', '-id', wid, '_NET_WM_PID']);
                const pidString = match(output, /\d+/)[0] || '0';
                return { wid, pid: parseInt(pidString, 10) };
            }),
        );
    }

    private async setThemeVariantOnWindow(
            windowID: WindowID,
            variant: Extension.ThemeVariant): Promise<void> {
        await this.processOutput(['xprop', '-id', windowID,
                                  '-f', '_GTK_THEME_VARIANT', '8u',
                                  '-set', '_GTK_THEME_VARIANT', variant]);
    }
}

export default function setGtkThemeVariant(
        variant: Extension.ThemeVariant,
        processOutput: Extension.ProcessOutput): Promise<void> {
    return new SetGtkThemeVariant(processOutput).setGtkThemeVariant(variant);
}
