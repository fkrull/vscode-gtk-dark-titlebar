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

(deftest should-get-wid-to-pid-command
    (is (=
         (extension.title-bar/window-pid-command "0xdeadbeef")
         ["xprop" "-id" "0xdeadbeef" "_NET_WM_PID"])))

(deftest should-get-gtk-dark-theme-command
    (is (=
         (extension.title-bar/gtk-theme-variant-command "0xdeadbeef" :dark)
         ["xprop" "-id" "0xdeadbeef" "-f" "_GTK_THEME_VARIANT" "8u" "-set" "_GTK_THEME_VARIANT" "dark"])))

(deftest should-get-gtk-light-theme-command
    (is (=
         (extension.title-bar/gtk-theme-variant-command "0xdeadbeef" :light)
         ["xprop" "-id" "0xdeadbeef" "-f" "_GTK_THEME_VARIANT" "8u" "-set" "_GTK_THEME_VARIANT" "light"])))
