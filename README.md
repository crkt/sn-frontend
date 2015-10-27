# How ro run
You need to install [leiningen](http://leiningen.org/)
You will also need to install [Clojure](http://clojure.org/getting_started)

Once you have installed both of them you will run the server by doing:
```
lein repl
user=> (use 'ring.adapter.jetty)
user=> (use 'sn-backend.core)
user=> (run-jetty #'app {:port 3000})
```

You can then test to go to http://localhost:3000 and see that the server is running.

You did it!