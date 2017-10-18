(ns extension.async)

(defn waterfall-internal
    ([values callback]
     (apply callback values))
    ([values callback & callbacks]
     ;(println values)
     ;(println callback)
     ;(println callbacks)
     ;(println (conj values (fn [& values] (apply waterfall-internal (cons values callbacks)))))
     (apply callback (conj values (fn [& values] (apply waterfall-internal (cons (vec values) callbacks)))))))

(defn waterfall [& callbacks] (apply waterfall-internal (cons [] callbacks)))
