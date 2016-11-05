package main

import "net/http"

type Route struct {
    Name        string
    Method      string
    Pattern     string
    HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
    Route{
        "Root",
        "GET",
        "/",
        ping,
    },
    Route{
        "login",
        "POST",
        "/login",
        login,
    },
    Route{
        "getUsers",
        "GET",
        "/users/{username}",
        getUser,
    },
    Route{
        "addDoctor",
        "POST",
        "/addDoctor",
        addDoctor,
    },
}
