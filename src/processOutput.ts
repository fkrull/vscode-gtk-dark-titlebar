import { spawn } from 'child_process';

export default function(args: string[]): Promise<string> {
    const stdoutChunks: string[] = [];
    const stderrChunks: string[] = [];

    return new Promise((resolve, reject) => {
        const proc = spawn(args[0], args.slice(1));

        proc.stdout.on('data', (chunk) => {
            stdoutChunks.push(chunk.toString());
        });
        proc.stderr.on('data', (chunk) => {
            stderrChunks.push(chunk.toString());
        });
        proc.on('error', (error) => {
            reject(error);
        });
        proc.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(stderrChunks.join('')));
            } else {
                resolve(stdoutChunks.join(''));
            }
        });

    });
}
