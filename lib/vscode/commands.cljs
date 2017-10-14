(ns vscode.commands)
(def commands (.-commands (js/require "vscode")))

(defn registerCommand [& args]
    (apply (.-registerCommand commands) args))
