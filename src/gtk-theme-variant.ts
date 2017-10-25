import defaultProcessOutput from './process-output';

export enum GtkThemeVariant {
    Light,
    Dark,
}

export async function setGtkThemeVariant(
        variant: GtkThemeVariant,
        processOutput: typeof defaultProcessOutput = defaultProcessOutput): Promise<void> {
    const pids = await processOutput(['pidof', process.execPath]);
    const windowIds = (await processOutput(['xprop', '-root', '_NET_CLIENT_LIST'])).match(/0x[\da-fA-F]+/g);
    if (windowIds === null) {
        return;
    }
    const windowPids = await Promise.all(windowIds.map(async (match): Promise<[string, string | null]> => {
        const pid = (await processOutput(['xprop', '-id', match, '_NET_WM_PID'])).match(/\d+/);
        if (pid === null) {
            return [match, null];
        } else {
            return [match, pid[0]];
        }
    }));

    const setters: Array<Promise<string>> = [];
    for (const [wid, pid] of windowPids) {
        if (pid === null) {
            continue;
        }
        setters.push(processOutput(['xprop', '-id', wid, '-f', '_GTK_THEME_VARIANT', '8u', '-set', '_GTK_THEME_VARIANT', variant === GtkThemeVariant.Dark ? 'dark' : 'light']));
    }
    await Promise.all(setters);
}
