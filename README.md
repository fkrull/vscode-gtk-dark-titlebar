# Match the GNOME title bar to your VS Code theme

[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=fkrull.gtk-dark-titlebar) <br>
[Open VSX Registry](https://open-vsx.org/extension/fkrull/gtk-dark-titlebar)

![GTK Dark Title Bar](images/screenshot.png)

This extension for Visual Studio Code can set the
[dark GTK theme variant](https://developer.gnome.org/gtk3/3.0/GtkSettings.html#GtkSettings--gtk-application-prefer-dark-theme)
for your VS Code windows. When using a dark editor theme, this leads to a more
attractive UI on systems that select the title bar colour based on the
application GTK theme, most commonly GNOME. For best results, you should also
turn off the (unthemable) menu bar using the `window.menuBarVisibility` setting.

**This extension does not work on Windows or Mac.**

**This extension does not work with Wayland builds of VS Code (see below).**

By default, whether to use the light or dark theme variant is determined
automatically from the editor theme. When changing the editor theme, the title
bar is also changed to match the theme (light or dark). The information on
whether a given theme is light or dark is pulled directly
[from the theme definition](https://code.visualstudio.com/docs/extensionAPI/extension-points#_contributesthemes)
giving it a high level of accuracy.

This extension is heavily based on the
[GTKDarkThemeVariantSetter plugin](https://github.com/p-e-w/GTKDarkThemeVariantSetter)
for Sublime Text. The magic juice to make this feature work was adapted from
there.

## Configuration
The theme variant can also be overridden using the `gtkTitleBar.mode` setting.
Setting it to either `light` or `dark` fixes the title bar regardless of the
selected editor theme. Setting it to `auto` selects the variant based on the
editor theme as described above. This is the default.

Any changes to either this setting or when changing the editor theme take effect
immediately. Note however that when launching VS Code or opening a new window,
it will take a few seconds for the title bar setting to be applied. This is due
to VS Code's delayed extension loading.

## (Lack of) Wayland Support
This extension *does* work when running on the Wayland display server *so long as*
the VS Code window is still an X11 window. However, it does *not* work when the
VS Code window is a native Wayland window. In that case, the extension will show
an error like `unable to open display ''`.

Currently (November 2022), the official VS Code builds still use X11 by default.
However, [VSCodium on Flathub](https://flathub.org/apps/details/com.vscodium.codium)
uses native Wayland windows.

Unfortunately, there doesn't seem to be a Wayland equivalent to the per-window
dark mode configuration toggle that GTK has for X11 windows. I wasn't able to come
up with an alternative way to set the theme or theme variant from the outside. Possible
workarounds include:
* Setting the environment variable `GTK_THEME` to the dark variant of your theme,
  e.g. `GTK_THEME=Adwaita:dark`. This doesn't dynamically change the titlebar when
  switching themes in VS Code however.
* Forcing VS Code/Electron to use an X11 window, possibly using the `--ozone-platform`
  flag ([docs](https://chromium.googlesource.com/chromium/src/+/HEAD/docs/ozone_overview.md#x11)).
  I wasn't able to get this to work with the VSCodium Flatpak however.

## License
See the accompanying `LICENSE` file.
