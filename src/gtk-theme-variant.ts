import defaultProcessOutput from './process-output';

export enum GtkThemeVariant {
    Light,
    Dark,
}

function match(text: string, term: string | RegExp): string[] {
    const matches = text.match(term);
    return matches != null ? matches : [];
}

export async function setGtkThemeVariant(
        variant: GtkThemeVariant,
        processOutput: typeof defaultProcessOutput = defaultProcessOutput): Promise<void> {
    const pids = match(await processOutput(['pidof', process.execPath]), /\d+/g).map((s) => parseInt(s, 10));
    const windowIds = match(await processOutput(['xprop', '-root', '_NET_CLIENT_LIST']), /0x[\da-fA-F]+/g);
    const windowPids = await Promise.all(windowIds.map(async (wid): Promise<[string, number]> => {
        const pid = match(await processOutput(['xprop', '-id', wid, '_NET_WM_PID']), /\d+/);
        return [wid, parseInt(pid[0], 10)];
    }));

    const setters: Array<Promise<string>> = [];
    for (const [wid, pid] of windowPids) {
        if (pids.includes(pid)) {
            setters.push(processOutput(['xprop', '-id', wid, '-f', '_GTK_THEME_VARIANT', '8u', '-set', '_GTK_THEME_VARIANT', variant === GtkThemeVariant.Dark ? 'dark' : 'light']));
        }
    }
    await Promise.all(setters);
}
