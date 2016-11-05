package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/melvinmt/firebase"
	"io"
	"io/ioutil"
	"github.com/gorilla/mux"
	"log"
)

const URL string = "https://medicus-24749.firebaseio.com/"

type Doctor struct {
    First string `json:"first"`
    Last  string `json:"last"`
    Contact string `json:"contact"`
    Location string `json:"location"`
    NumRatings int `json:"numRatings"`
    TotalSum int `json:"totalSum"`
    Rating int `json:"rating"`
    Specialty string `json:"specialty"`
}


type User struct {
    Name string `json:"name"`
    Password string `json:"password"` // This will be sent as an encrypted str
    RatedDocs []string
}


func ping (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Working well!")
}



func verifyBody(r *http.Request) []byte {
	var user User
	body, err := ioutil.ReadAll(io.LimitReader(r.Body, 1048576)) // big #
	if err != nil {
		panic(err)
	}
	if err := r.Body.Close(); err != nil {
        panic(err)
    }
    return body
}

func ReadUser(w http.ResponseWriter, r *http.Request) User {
	var user User
	body := verifyBody(r)
	if err := json.Unmarshal(body, &user); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    }
    return user
}



/*func login(w http.ResponseWriter, r *http.Request) {
	var err error
	var user User
	body := verifyBody(r)
	if err := json.Unmarshal(body, &user); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    }
    return user
}*/

func login(w http.ResponseWriter, r *http.Request) {
	var err error
	user := ReadUser(w, r)
	
	url := URL + "users/" + user.Name
	ref := firebase.NewReference(url)

	if err = ref.Write(user); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(user)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	username := vars["username"]
	dr := getUserHelp(username)

	json.NewEncoder(w).Encode(dr)
}

func getUserHelp(username string) User {
	personUrl := URL + "users/" + username
	personRef := firebase.NewReference(personUrl).Export(false)

	dr := User{}

	if err := personRef.Value(&dr); err != nil {
		panic(err)
	}
	return dr
}

func addDoctor(w http.ResponseWriter, r *http.Request){

	var err error
	var doctor Doctor
	body := verifyBody(r)

	if err := json.Unmarshal(body, &doctor); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    }

	url := URL + "doctors/" + doctor.First + doctor.Last
	ref := firebase.NewReference(url)

	if err = ref.Write(doctor); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(doctor)


}


/*
First string `json:"first"`
    Last  string `json:"last"`
    Contact string `json:"contact"`
    Location string `json:"location"`
    Rating string `json:"rating"`
    Specialty string `json:"specialty"`

*/

/*
func serveRest(w http.ResponseWriter, r *http.Request){
	response, err := getJsonResponse()
	if err != nil {
		panic(err)
	}

	fmt.Fprintf(w, string(response))

}

func getJsonResponse() ([]byte, error){
	doctor := Doctor {
		First: "Dr",
		Last: "Pepper",
	}

	return json.MarshalIndent(doctor, "", "  ")
}
*/
func rateDoctor(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	docConc := vars["contact"]
	rating := vars["rating"]

	user := ReadUser(w, r)
	curDoc := getDoctor(docConc)

	for _, doc := range user.RatedDocs {
		if (curDoc == doc) {
			log.Printf("Doctor already rated!")
			return
		}
	}
	curDoc.numRatings ++
	curDoc.totalSum += rating
	newRating := curDoc.totalSum / curDoc.numRatings
}

func getDoctor(contactInfo string) {

}

func match(w http.ResponseWriter, r *http.Request) {

}