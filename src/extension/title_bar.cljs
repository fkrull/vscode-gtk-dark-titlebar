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

(def pidof-command ["pidof" process.execPath])
(def xprop-list-clients-command ["xprop" "-root" "_NET_CLIENT_LIST"])

(defn get-window-pid-command [window-id]
    ["xprop" "-id" window-id "_NET_WM_PID"])

(defn variant-string [variant]
    (case variant
        :light "light"
        :dark "dark"))

(defn gtk-theme-variant-command [window-id variant]
    ["xprop" "-id" window-id "-f" "_GTK_THEME_VARIANT" "8u" "-set" "_GTK_THEME_VARIANT" (variant-string variant)])
