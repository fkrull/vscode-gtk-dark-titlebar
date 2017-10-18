(ns test.helper.timeout-helper
    (:require [cljs.test :refer-macros [async is]]))

(defn perform-test [finished body done]
    (body (fn []
              (reset! finished true)
              (done))))

(defn check-timeout [finished timeout done]
    (js/setTimeout
        (fn [] (when (not @finished)
                    (is false (str "test exceeded timeout of " timeout "ms"))
                    (done)))
        timeout))

(defn async-timeout-helper [timeout body]
    (async done (let [finished (atom false)]
                     (perform-test finished body done)
                     (check-timeout finished timeout done))))
