# Dev notes
## Testing
```
$ npm ci
$ npm test
```
Works on Windows.

## Updating dependencies
Bump versions in lockfile with `npm update`. Show outdated major versions with
`npm outdated`.

## Bundled xprop binaries
The bundled xprop binaries are extracted from Debian packages. The accompanying
.info file contains the package's metadata. To update, change the version in
`update-xprop-binaries.sh` and rerun it. This requires the `dpkg-deb` tool to be
installed.

## CI
https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token.
READ INSTRUCTIONS CAREFULLY, there's some stupid pitfalls.

## Releasing
Releases are published via CI. Release steps:

* add or extend changelog entry in `CHANGELOG.md`
* bump version in `package.json` to match the changelog entry version
* commit and push main
* create a Github release with version tag
