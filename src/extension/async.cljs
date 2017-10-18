(ns extension.async)

(defn waterfall-internal
    ([values callback]
     (apply callback values)))

(defn waterfall [& callbacks] (apply waterfall-internal (cons [] callbacks)))
