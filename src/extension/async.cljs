(ns extension.async)

(defn waterfall-internal
    ([values action]
     (apply action values))
    ([values action & actions]
     (let [callback (fn [error & values]
                        (apply waterfall-internal (cons (vec values) actions)))]
          (apply action (conj values callback)))))

(defn waterfall
    ([actions]
     (apply waterfall-internal (cons [] (list* actions))))
    ([value actions]
     (apply waterfall-internal (cons [value] (list* actions)))))
