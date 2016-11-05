package main

import (
	"log"
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/melvinmt/firebase"
)

const URL string = "https://testing-86363.firebaseio.com/users/2"
// "https://medicus-24749.firebaseio.com/"

type DoctorName struct {
    First string
    Last  string
}

type User struct {
    Name DoctorName
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

	url := URL 
	ref := firebase.NewReference(url)

	doctor := DoctorName{
		First: "Matthew",
		Last: "Walinga",
	}

	if err = ref.Write(doctor); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(doctor)
}


func getUser(w http.ResponseWriter, r *http.Request) {

	var err error
	
	/*
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err {
		panic(err)
	}
	*/

	personUrl := URL
	personRef := firebase.NewReference(personUrl)

	dr := User{}
	log.Println("created Dr")

	if err = personRef.Value(&dr); err != nil {
		log.Println("Yo")
		panic(err)
	}

	
	json.NewEncoder(w).Encode(dr)

}
