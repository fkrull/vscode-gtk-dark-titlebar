# Dev notes
## Testing
```
$ npm test
```
Works on Windows.

## Updating dependencies
Like other npm stuff? `npm outdated` will list outdated dependencies and their
newest version; can be bumped by hand in `package.json`.

## Bundled xprop binaries
xprop binaries are extracted from a (Debian-based) Docker image; the image is
set in `Makefile`, for compatibility reasons it should be an older image. Run
`make xprop-binaries` to extract the binaries for local use.

## CI
CI is Travis, see `.travis.yml`.

The VS marketplace access token is configured in Travis. It may be expired; in
that case, generate a new one as per https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token.
READ INSTRUCTIONS CAREFULLY, there's some stupid pitfalls.

## Releasing
Releases are published via CI. Release steps:

* add or extend changelog entry in `CHANGELOG.md`
* bump version in `package.json` to match the changelog entry version
* (commit and push main to see if it builds)
* tag with `release-X.Y.Z` and push tag
