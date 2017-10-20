(ns test.test-async
    (:require [cljs.test :refer-macros [async deftest is]]
              [extension.async])
    (:require-macros [test.helper.async :as async]))

(deftest waterfall-should-call-one-function
    (async/timeout 0 done
        (extension.async/waterfall [done])))

(deftest waterfall-should-call-two-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            [(fn [done] (done nil "some value"))
             (fn [some-value]
                 (is (= some-value "some value"))
                 (all-done))])))

(deftest waterfall-should-call-many-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            [(fn [done] (done nil 1))
             (fn [arg done] (done nil (+ arg 1)))
             (fn [arg done] (done nil (+ arg 1)))
             (fn [arg done]
                 (is (= arg 3))
                 (done))
             all-done])))

(deftest waterfall-should-throw-error-if-error-is-passed
    (async/timeout 0 all-done
        (try
            (extension.async/waterfall
                [(fn [done] (done "error"))
                 (fn []
                     (is false "shouldn't reach this")
                     (all-done))])
            (catch :default error
                (is (= error "error"))
                (all-done)))))

(deftest waterfall-should-call-catch-handler-if-specified
    (async/timeout 0 all-done
        (extension.async/waterfall
            [(fn [done] (done "error"))
             (fn []
                 (is false "shouldn't reach this")
                 (all-done))]
            :catch (fn [error]
                       (is (= error "error"))
                       (all-done)))))

(deftest parallel-should-call-functions-in-parallel-and-pass-results-to-callback-in-order
    (async/timeout 100 all-done
        (extension.async/parallel
            [(fn [done] (js/setTimeout (partial done nil "value 1") 75))
             (fn [done] (js/setTimeout (partial done nil "value 2") 50))]
            (fn [error values]
                (is (= values ["value 1" "value 2"]))
                (all-done)))))
