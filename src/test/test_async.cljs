(ns test.test-async
    (:require [cljs.test :refer-macros [async deftest is]]
              [extension.async])
    (:require-macros [test.helper.async :as async]))

(deftest waterfall-should-call-one-function-and-pass-result-to-callback
    (async/timeout 0 all-done
        (extension.async/waterfall
            [#(% nil 1)]
            (fn [error value]
                (is (nil? error))
                (is (= value 1))
                (all-done)))))

(deftest waterfall-should-call-two-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            [#(% nil "some value") #(%2 nil %1)]
            (fn [error value]
                (is (nil? error))
                (is (= value "some value"))
                (all-done)))))

(deftest waterfall-should-call-many-functions-in-sequence
    (async/timeout 0 all-done
        (extension.async/waterfall
            [#(% nil 1)
             (fn [arg done] (done nil (+ arg 1)))
             (fn [arg done] (done nil (+ arg 1)))]
            (fn [error value]
                (is (nil? error))
                (is (= value 3))
                (all-done)))))

(deftest waterfall-should-pass-through-multiple-values
    (async/timeout 0 all-done
        (extension.async/waterfall
            [#(% nil 1 2 3)
             (fn [arg1 arg2 arg3 done] (done nil (+ arg1 1) (+ arg2 1) (+ arg3 1)))]
            (fn [error value1 value2 value3]
                (is (nil? error))
                (is (= value1 2))
                (is (= value2 3))
                (is (= value3 4))
                (all-done)))))

(deftest waterfall-should-abort-and-pass-error-to-callback-on-error
    (async/timeout 0 all-done
        (extension.async/waterfall
            [(fn [done] (done "error"))
             (fn [done]
                 (is false "shouldn't reach this")
                 (all-done))]
            (fn [error value]
                (is (= error "error"))
                (is (nil? value))
                (all-done)))))

(deftest parallel-should-call-functions-in-parallel-and-pass-results-to-callback-in-order
    (async/timeout 100 all-done
        (extension.async/parallel
            [(fn [done] (js/setTimeout (partial done nil "value 1") 75))
             (fn [done] (js/setTimeout (partial done nil "value 2") 50))]
            (fn [error values]
                (is (= values ["value 1" "value 2"]))
                (all-done)))))

(deftest parallel-should-only-pass-error-to-callback
    (async/timeout 0 all-done
        (extension.async/parallel
            [#(js/setTimeout (partial % nil "success") 0)
             #(js/setTimeout (partial % "error") 0)]
            (fn [error values]
                (is (= error "error"))
                (is (nil? values))
                (all-done)))))
