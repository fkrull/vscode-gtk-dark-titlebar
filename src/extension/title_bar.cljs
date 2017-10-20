(ns extension.title-bar
    (:require [clojure.set :refer [intersection]]
              [extension.async :as async]
              [extension.process :refer [get-output]]
              [extension.util :refer [parse-int]]))

(defn parse-pids [output]
    (map parse-int (re-seq #"\d+" output)))

(defn parse-window-ids [output]
    (re-seq #"0x[\da-fA-F]+" output))

(defn parse-window-pid [output]
    (parse-int (re-find #"\d+" output)))

(def pidof-command ["pidof" process.execPath])
(def xprop-list-clients-command ["xprop" "-root" "_NET_CLIENT_LIST"])

(defn window-pid-command [window-id]
    ["xprop" "-id" window-id "_NET_WM_PID"])

(defn variant-string [variant]
    (case variant
        :light "light"
        :dark "dark"))

(defn gtk-theme-variant-command [window-id variant]
    ["xprop" "-id" window-id "-f" "_GTK_THEME_VARIANT" "8u" "-set" "_GTK_THEME_VARIANT" (variant-string variant)])


(defn set-title-bar-variant! [variant callback]
    (async/waterfall
        [(partial async/parallel
            [(partial get-output pidof-command)
             (partial get-output xprop-list-clients-command)])
         (fn [[_ pidof-output] [_ clients-output] done]
            (async/parallel
                (map #(partial get-output (window-pid-command %)) (parse-window-ids clients-output))
                (fn [error outputs]
                    (done
                        error
                        (map parse-window-pid outputs)
                        (parse-pids pidof-output)))))
         (fn [window-pids vscode-pids done]
             (async/parallel
                 (map #(partial get-output (gtk-theme-variant-command % variant))
                      (intersection (set window-pids) (set vscode-pids)))
                 done))]
        #(callback %1)))
