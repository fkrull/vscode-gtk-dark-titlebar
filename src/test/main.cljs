(ns test.main
    (:require [cljs.nodejs]
              [cljs.test :refer-macros [run-tests]]
              [test.test-process]))

(defn main []
    (cljs.nodejs/enable-util-print!)
    (cljs.test/run-tests
        'test.test-process))

(main)
