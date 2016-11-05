package main

import (
	"fmt"
	"net/http"
	"github.com/melvinmt/firebase"
)

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

func login(w http.ResponseWriter, r *http.Request) {
	var err error

	url := "https://testing-86363.firebaseio.com/users/test"
	ref := firebase.NewReference(url)

	doctor := DoctorName{
		First: "Dr",
		Last: "Pepper",
	}

	if err = ref.Write(doctor); err != nil {
		panic(err)
	}

}

func getUsers(w http.ResponseWriter, r *http.Request) {
	var err error

	personUrl := "https://testing-86363.firebaseio.com/users"
	personRef := firebase.NewReference(personUrl).Export(false)

	dr := User{}

	if err = personRef.Value(dr); err != nil {
		panic(err)
	}

	fmt.Println(dr.Name.First, dr.Name.Last) 

}
