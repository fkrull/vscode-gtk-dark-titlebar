(ns test.test-title-bar
    (:require [cljs.test :refer-macros [deftest is]]
              [extension.title-bar]))

(deftest should-get-pids-from-pidof-output
    (is (=
         (extension.title-bar/parse-pids "3394 3393 3328 3325 3286 3283")
         [3394 3393 3328 3325 3286 3283])))

(deftest should-get-window-ids-from-xprop-window-list
    (is (=
         (extension.title-bar/parse-window-ids "_NET_CLIENT_LIST(WINDOW): window id # 0x260000a, 0x260000a")
         ["0x260000a" "0x260000a"])))

(deftest should-get-pids-from-xprop-output
    (is (=
         (extension.title-bar/parse-window-pid "_NET_WM_PID(CARDINAL) = 1564")
         1564)))
