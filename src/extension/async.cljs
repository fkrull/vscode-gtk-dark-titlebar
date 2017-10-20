(ns extension.async)

(defn waterfall-internal
    ([values callback]
     (apply callback nil values))
    ([values callback action & actions]
     (let [next (fn [error & values]
                    (if (nil? error)
                        (apply waterfall-internal (list* (vec values) callback actions))
                        (callback error)))]
        (apply action (conj values next)))))

(defn waterfall
    [actions callback]
    (apply waterfall-internal (list* [] callback actions))
    nil)


(deftype ParallelState [^:mutable results num-actions callback])

(deftype ParallelResult [index value])

(defn callback-with-results [results callback]
    (callback nil (map #(.-value %) (sort-by #(.-index %) results))))

(defn add-result [state index value]
    (set! (.-results state) (conj (.-results state) (ParallelResult. index value)))
    (when (= (count (.-results state)) (.-num-actions state))
        (callback-with-results (.-results state) (.-callback state))))

(defn action-callback [state index error value]
    (if (nil? error)
        (add-result state index value)
        (.callback state error nil)))

(defn invoke-all-async [state actions]
    (map-indexed
        (fn [index item] (item (partial action-callback state index)))
        actions))

(defn parallel
    [actions callback]
    (doall (invoke-all-async (ParallelState. [] (count actions) callback) actions))
    nil)
