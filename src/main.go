package main

import (
    "log"
    "net/http"
)

func main() {
    router := NewRouter()
    //http.HandleFunc("/", serveRest)
    //http.ListenAndServe("localhost:1337", nil)
    log.Fatal(http.ListenAndServe(":8080", router))
}
