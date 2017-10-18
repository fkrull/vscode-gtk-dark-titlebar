(ns extension.async)

(defn waterfall-internal
    ([values catch action]
     (apply action values))
    ([values catch action & actions]
     (let [callback (fn [error & values]
                        (if (not (nil? error))
                            (catch error)
                            (apply waterfall-internal (list* (vec values) catch actions))))]
          (apply action (conj values callback)))))

(defn throw-helper [error] (throw error))

(defn waterfall
    ([actions & { :keys [catch] :or {catch nil}}]
     (apply waterfall-internal (list* [] (or catch throw-helper) actions))))
