package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/melvinmt/firebase"
)

const URL string = "https://medicus-24749.firebaseio.com/"

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
		First: "Dr",
		Last: "Pepper",
	}

	return json.MarshalIndent(doctor, "", "  ")
}




func login(w http.ResponseWriter, r *http.Request) {
	var err error

	url := URL
	ref := firebase.NewReference(url)

	doctor := DoctorName{
		First: "Dr",
		Last: "Pepper",
	}

	if err = ref.Write(doctor); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(doctor)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	var err error
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576))
	if err {
		panic(err)
	}

	personUrl := URL
	personRef := firebase.NewReference(personUrl).Export(false)

	dr := User{}

	if err = personRef.Value(dr); err != nil {
		panic(err)
	}

	fmt.Println(dr.Name.First, dr.Name.Last) 

}
