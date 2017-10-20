(ns test.main
    (:require [cljs.nodejs]
              [cljs.test :refer-macros [run-tests]]
              [test.test-process]
              [test.test-async]
              [test.test-title-bar]
              [test.test-util]))

(defn main []
    (cljs.nodejs/enable-util-print!)
    (cljs.test/run-tests
        'test.test-process
        'test.test-async
        'test.test-title-bar
        'test.test-util))

(main)
