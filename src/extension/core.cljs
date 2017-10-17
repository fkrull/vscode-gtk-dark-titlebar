(ns extension.core
    (:require [cljs.nodejs]
              [vscode.core]
              [vscode.workspace]
              [extension.title-bar]))

(def *disposables* [])

(defn add-disposable! [& additional]
    (set! *disposables* (apply conj [*disposables* additional])))

(defn ^:export activate [context]
    (cljs.nodejs/enable-util-print!)
    (add-disposable! (vscode.workspace/on-did-change-configuration update-title-bar!)))

(defn ^:export deactivate []
    (map vscode.core/dispose *disposables*)
    (set! *disposables* []))
