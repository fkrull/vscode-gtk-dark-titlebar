# Match the GNOME title bar to your VS Code theme

This extension for Visual Studio Code can set the
[dark GTK theme variant](https://developer.gnome.org/gtk3/3.0/GtkSettings.html#GtkSettings--gtk-application-prefer-dark-theme)
for your VS Code windows. When using a dark editor theme, this leads to a more
attractive UI on systems that select the title bar color based on the
application GTK theme, most commonly GNOME 3. For best results, you should also
turn off the (unthemable) menu bar using the `window.menuBarVisibility` setting.

This extension is heavily based on the
[GTKDarkThemeVariantSetter plugin](https://github.com/p-e-w/GTKDarkThemeVariantSetter)
for Sublime Text. The magic juice to make this feature work was adapted from
there.

## Configuration
The theme variant can be configured by setting the `gtkTitleBar.mode` setting
to either `light` or `dark`.

## License
See the accompanying `LICENSE` file.
