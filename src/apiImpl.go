package main

import (
	"fmt"
	"net/http"
	//"github.com/melvinmt/firebase"
)

type Name struct {
    First string
    Last  string
}

type User struct {
    name Name
}

func ping (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Working well!")
}

func login(w http.ResponseWriter, r *http.Request) {
	ref := firebase.NewReference(url)
}

func getUsers(w http.ResponseWriter, r *http.Request) {

}
