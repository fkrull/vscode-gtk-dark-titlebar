(ns extension.title-bar
    (:require [extension.util :refer [parse-int]]))

(defn update-title-bar! [])

(defn parse-pids [output]
    (map parse-int (re-seq #"\d+" output)))

(defn parse-window-ids [output]
    (re-seq #"0x[\da-fA-F]+" output))
