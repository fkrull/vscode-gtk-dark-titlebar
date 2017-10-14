require('./out/goog/bootstrap/nodejs')
require('./out/main');
goog.require('extension.core');

function activate(context) {
    extension.core.activate(context);
}

function deactivate() {
    extension.core.deactivate();
}

module.exports = { activate, deactivate }
