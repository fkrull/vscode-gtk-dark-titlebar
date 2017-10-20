(ns test.test-util
    (:require [cljs.test :refer-macros [deftest is]]
              [extension.util :refer [parse-int]]))

(deftest should-parse-int
    (is (parse-int "1") 1)
    (is (parse-int "0") 0)
    (is (parse-int "0000") 0)
    (is (parse-int "0001") 1)
    (is (parse-int "  123456789  ") 123456789))
