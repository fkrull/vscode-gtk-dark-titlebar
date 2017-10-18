(ns test.test-async
    (:require [cljs.test :refer-macros [async deftest is]]
              [extension.async])
    (:require-macros [test.helper.async :as async]))

(deftest waterfall-should-call-one-function
    (async/timeout 0 done
        (extension.async/waterfall done)))

; (deftest waterfall-should-call-functions-in-seq
;     (async test-done
;         (extension.async/waterfall
;             (fn [done] (done nil 1))
;             (fn [arg done] (done nil (+ arg 1)))
;             (fn [arg done] (done nil (+ arg 1)))
;             (fn [arg done]
;                 (is (= arg 3))
;                 (done))
;             test-done)))
