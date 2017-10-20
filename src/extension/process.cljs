(ns extension.process
    (:require [child_process]
              [clojure.string :as string]))

(defn get-output [args callback]
    (let [output (atom [])
          callback-called (atom false)
          proc (child_process/spawn (first args) (apply array (rest args)))]
         (.on (.-stdout proc) "data" (fn [data]
                                         (reset! output (conj @output (.toString data)))))
         (.on proc "exit" (fn [code]
                            (when (not @callback-called)
                                (callback nil code (string/join @output))
                                (reset! callback-called true))))
         (.on proc "error" (fn [error]
                            (when (not @callback-called)
                                (callback error nil nil)
                                (reset! callback-called true))))
         nil))
