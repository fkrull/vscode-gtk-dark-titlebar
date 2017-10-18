(ns test.test-async
    (:require [cljs.test :refer-macros [async deftest is]]
              [extension.async])
    (:require-macros [test.helper.async :as async]))

(deftest waterfall-should-call-one-function
    (async/timeout 0 done
        (extension.async/waterfall done)))

(deftest waterfall-should-call-two-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            (fn [done] (done "some value"))
            (fn [some-value]
                (is (= some-value "some value"))
                (all-done)))))

(deftest waterfall-should-call-many-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            (fn [done] (done 1))
            (fn [arg done] (done (+ arg 1)))
            (fn [arg done] (done (+ arg 1)))
            (fn [arg done]
                (is (= arg 3))
                (done))
            all-done)))
