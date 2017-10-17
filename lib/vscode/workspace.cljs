(ns vscode.workspace)
(def workspace (.-workspace (js/require "vscode")))

(defn get-configuration [section resource]
    (.getConfiguration workspace section resource))

(defn get-setting [setting]
    (.get (get-configuration nil nil) setting))

(defn on-did-change-configuration [listener]
    (.onDidChangeConfiguration workspace listener))
