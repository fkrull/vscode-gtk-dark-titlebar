(ns extension.core
    (:require [cljs.nodejs]))

(defn ^:export activate [context]
    (cljs.nodejs/enable-util-print!)
    (println "activate extension"))

(defn ^:export deactivate []
    (println "deactivate extension"))
