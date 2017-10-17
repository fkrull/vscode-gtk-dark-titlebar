(ns test.test-process
    (:require [cljs.test :refer-macros [async deftest is]]
              [child_process]
              [extension.process]))

(deftest error-callback
    (async done
        (extension.process/get-output "non-existing-binary" []
            (fn [error code output]
                (is (not (nil? error)))
                (done)))))

(deftest get-output-from-command
    (async done
        (extension.process/get-output process.execPath ["-e" "(println \"test output\")"]
            (fn [error code output]
                (is (nil? error))
                (is (= code 0))
                (is (= output "test output\n"))
                (done)))))
