# Change Log for GTK Dark Title Bar

## [1.2.0] - 2018-05-16
- Bundle xprop binary with the extension. This is useful for
  [VS Code packaged as Flatpak][vscode-flatpak] which doesn't have the xprop
  binary in its userland.

[vscode-flatpak]: https://flathub.org/apps/details/com.visualstudio.code

## [1.1.0] - 2017-10-28
- The title bar mode can now be automatically determined from the selected
  editor theme. This is the default behaviour now, but can be overridden using
  the configuration setting.
- Improved the marketplace presentation.

## [1.0.0] - 2017-10-26
- Initial release.
  * Set either a light or dark title bar based on the configuration setting.
