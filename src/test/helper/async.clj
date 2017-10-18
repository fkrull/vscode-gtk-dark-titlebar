(ns test.helper.async
    (:require [test.helper.timeout-helper :refer [async-timeout-helper]]))

(defmacro timeout
    [timeout done & body]
    `(async-timeout-helper ~timeout (fn [~done] ~@body)))
