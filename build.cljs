(require '[lumo.build.api :as build])

(build/build
    (build/inputs "lib" "src" "test")
    {:output-to "out/main.js"
        :optimizations :none
        :process-shim false
        :hashbang false
        :verbose true
        :target :nodejs
        :static-fns true
        :fn-invoke-direct true})
