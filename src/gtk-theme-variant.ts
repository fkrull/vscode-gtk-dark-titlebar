import defaultProcessOutput from './process-output';

type ProcessOutput = typeof defaultProcessOutput;
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

async function getEditorPIDs(processOutput: ProcessOutput): Promise<ProcessID[]> {
    const output = await processOutput(['pidof', process.execPath]);
    return match(output, /\d+/g)
        .map((s) => parseInt(s, 10));
}

async function getWindowIDs(processOutput: ProcessOutput): Promise<WindowID[]> {
    const output = await processOutput(['xprop', '-root', '_NET_CLIENT_LIST']);
    return match(output, /0x[\da-fA-F]+/g);
}

async function getProcessIDsForWindowIDs(wids: WindowID[], processOutput: ProcessOutput): Promise<PIDtoWID[]> {
    return await Promise.all(
        wids.map(async (wid) => {
            const output = await processOutput(['xprop', '-id', wid, '_NET_WM_PID']);
            const pidString = match(output, /\d+/)[0] || '0';
            return { wid, pid: parseInt(pidString, 10) };
        }),
    );
}

async function setThemeVariantOnWindow(
        windowID: WindowID,
        variant: ThemeVariant,
        processOutput: ProcessOutput): Promise<void> {
    await processOutput(['xprop', '-id', windowID,
                         '-f', '_GTK_THEME_VARIANT', '8u',
                         '-set', '_GTK_THEME_VARIANT', variant]);
}

export async function setGtkThemeVariant(
        variant: ThemeVariant,
        processOutput: ProcessOutput = defaultProcessOutput): Promise<void> {
    const editorPIDs = await getEditorPIDs(processOutput);
    const allWindows = await getProcessIDsForWindowIDs(await getWindowIDs(processOutput), processOutput);

    await Promise.all(allWindows
        .filter(({ wid, pid }) => editorPIDs.includes(pid))
        .map(({ wid }) => setThemeVariantOnWindow(wid, variant, processOutput)));
}
