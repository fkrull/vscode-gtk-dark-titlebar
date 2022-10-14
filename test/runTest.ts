import * as path from 'path';
import { runTests } from 'vscode-test';

async function main() {
  const nodejsBin = process.execPath;
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../');

    // The path to the extension test runner script
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './index');

    // Download VS Code, unzip it and run the integration test
    await runTests({ extensionDevelopmentPath, extensionTestsPath, extensionTestsEnv: { NODEJS_BIN: nodejsBin } });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
