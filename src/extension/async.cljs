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
    [actions & { :keys [catch] :or {catch nil}}]
    (apply waterfall-internal (list* [] (or catch throw-helper) actions))
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
    (let [state (ParallelState. [] (count actions) callback)]
         (doall (invoke-all-async state actions)))
    nil)
