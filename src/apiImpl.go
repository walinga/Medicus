package main

import (
	"log"
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/melvinmt/firebase"
	"io"
	"io/ioutil"
)

const URL string = "https://testing-86363.firebaseio.com/users/2"
// "https://medicus-24749.firebaseio.com/"

type DoctorName struct {
    First string `json:"first"`
    Last  string `json:"last"`
}

type User struct {
    Name string `json:"name"`
    Password string `json:"password"` // This will be sent as an encrypted str
}

func ping (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Working well!")
}

func serveRest(w http.ResponseWriter, r *http.Request){
	response, err := getJsonResponse()
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, string(response))

}

func getJsonResponse() ([]byte, error){
	doctor := DoctorName{
		First: "Matthew",
		Last: "Walinga",
	}

	return json.MarshalIndent(doctor, "", "  ")
}


func login(w http.ResponseWriter, r *http.Request) {
	var err error
	var user User

	if err := r.Body.Close(); err != nil {
        panic(err)
    }
    if err := json.Unmarshal(body, &user); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    }

	url := URL + "users"
	ref := firebase.NewReference(url)

	if err = ref.Write(user); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(user)
}


func getUser(w http.ResponseWriter, r *http.Request) {

	var err error

	personUrl := URL + "users"
	personRef := firebase.NewReference(personUrl).Export(false)

	dr := User{}
	log.Println("created Dr")

	if err = personRef.Value(&dr); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(dr)

}
