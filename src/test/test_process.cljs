(ns test.test-process
    (:require [cljs.test :refer-macros [async deftest is]]
              [extension.process])
    (:require-macros [test.helper.async :as async]))

(deftest error-callback
    (async/timeout 500 done
        (extension.process/get-output "non-existing-binary" []
            (fn [error code output]
                (is (not (nil? error)))
                (done)))))

(deftest get-output-from-command
    (async/timeout 500 done
        (extension.process/get-output process.execPath ["-e" "(println \"test output\")"]
            (fn [error code output]
                (is (nil? error))
                (is (= code 0))
                (is (= output "test output\n"))
                (done)))))
