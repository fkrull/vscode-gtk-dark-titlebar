(ns extension.title-bar
    (:require [extension.util :refer [parse-int]]))

(defn update-title-bar! [mode]
    ())

(defn parse-pids [output]
    (map parse-int (re-seq #"\d+" output)))

(defn parse-window-ids [output]
    (re-seq #"0x[\da-fA-F]+" output))

(defn parse-window-pid [output]
    (parse-int (re-find #"\d+" output)))
