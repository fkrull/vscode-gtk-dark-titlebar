(ns vscode.commands)
(def commands (.-commands (js/require "vscode")))

(defn register-command [& args]
    (apply (.-registerCommand commands) args))
