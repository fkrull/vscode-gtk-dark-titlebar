declare module Extension {
    type ThemeVariant = 'light' | 'dark';
    type ProcessOutput = (args: string[]) => Promise<string>;

    interface ThemeInfo {
        readonly name: string;
        readonly variant: ThemeVariant;
    }
}
