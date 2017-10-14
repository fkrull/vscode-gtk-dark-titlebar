(ns test.main
    (:require [cljs.nodejs]
              [cljs.test :refer-macros [run-tests]]))

(defn main []
    (cljs.nodejs/enable-util-print!)
    (cljs.test/run-tests))

(main)
