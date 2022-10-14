import * as path from 'path';
import * as Mocha from 'mocha';

const FILES = [
  "getActiveThemeVariant.test.js",
  "getThemeInfo.test.js",
  "getXpropCommand.test.js",
  "processOutput.test.js",
  "setGtkThemeVariant.test.js",
]

export function run(): Promise<void> {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
    color: true,
  });

  const testsRoot = __dirname;

  return new Promise((c, e) => {
    // Add files to the test suite
    FILES.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

    try {
      // Run the mocha test
      mocha.run(failures => {
        if (failures > 0) {
          e(new Error(`${failures} tests failed.`));
        } else {
          c();
        }
      });
    } catch (err) {
      console.error(err);
      e(err);
    }
  });
}
