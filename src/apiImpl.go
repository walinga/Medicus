package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/melvinmt/firebase"
	"io"
	"strconv"
	"io/ioutil"
	"github.com/gorilla/mux"
	"log"
	"time"
	"crypto/sha256"
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

type myCookie struct {
	CookieData string `json:"cookieData"`
}

type User struct {
    Name string `json:"name"`
    Password string `json:"password"` // This will be sent as an encrypted str
    RatedDocs []string
    Cookie string
}

func createCookie(username string) string {
	h := sha256.New()
	var b [] byte
	io.WriteString(h, username)
	io.WriteString(h, time.Now().Format(time.UnixDate))
	return string(h.Sum(b))
}


func ping (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Working well!")
}



func verifyBody(r *http.Request) []byte {
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


func login(w http.ResponseWriter, r *http.Request) {
	var err error
	user := ReadUser(w, r)
	
	c := myCookie{createCookie(user.Name)}
	user.Cookie = c.CookieData
	url := URL + "users/" + user.Name
	ref := firebase.NewReference(url)

	if err = ref.Write(user); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(c)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	// We need to use the Authorization header cookie to look up user
	c := r.Header.Get("Authorization")

	username := vars["username"]
	usr := getUserHelp(username)
	if (usr.Cookie == c) { // Make sure user's cookie is correct
		json.NewEncoder(w).Encode(usr)
	} else {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(400) // Bad cookie
        if err := json.NewEncoder(w).Encode(c); err != nil {
            panic(err)
        }
	}
}

func getUserHelp(username string) User {
	personUrl := URL + "users/" + username
	personRef := firebase.NewReference(personUrl).Export(false)

	usr := User{}

	if err := personRef.Value(&usr); err != nil {
		panic(err)
	}
	return usr
}



func ReadDoctor(w http.ResponseWriter, r *http.Request) Doctor {
	var dr Doctor
	body := verifyBody(r)

	if err := json.Unmarshal(body, &dr); err != nil {
        w.Header().Set("Content-Type", "application/json; charset=UTF-8")
        w.WriteHeader(422) // unprocessable entity
        if err := json.NewEncoder(w).Encode(err); err != nil {
            panic(err)
        }
    }
    return dr
}


func addDoctor(w http.ResponseWriter, r *http.Request){

	var err error
	dr := ReadDoctor(w, r)
	
	url := URL + "doctors/" + dr.Contact
	ref := firebase.NewReference(url)

	if err = ref.Write(dr); err != nil {
		panic(err)
	}

	json.NewEncoder(w).Encode(dr)
}

	


func rateDoctor(w http.ResponseWriter, r *http.Request) {
	
	vars := mux.Vars(r)
	docConc := vars["contact"]
	rating := vars["rating"]

	user := ReadUser(w, r)
	curDoc := getDoctorHelp(docConc)

	for _, doc := range user.RatedDocs {
		if (docConc == doc) {
			log.Printf("Doctor already rated!")
			return
		}
	}
	user.RatedDocs = append(user.RatedDocs, docConc)
	curDoc.NumRatings ++
	newStr, _ := strconv.Atoi(rating)
	curDoc.TotalSum += newStr
	newRating := curDoc.TotalSum / curDoc.NumRatings
	curDoc.Rating = newRating
	fmt.Println(w, "Rated Doctor")
}


func getDoctor(w http.ResponseWriter, r *http.Request) {
	
	vars := mux.Vars(r)
	cntct := vars["contact"]

	dr := getDoctorHelp(cntct)

	json.NewEncoder(w).Encode(dr)
}

func getDoctorHelp(cntct string) Doctor {
	personUrl := URL + "doctors/" + cntct
	personRef := firebase.NewReference(personUrl).Export(false)

	dr := Doctor{}

	if err := personRef.Value(&dr); err != nil {
		panic(err)
	}
	return dr
}


// Machine learning
func match(w http.ResponseWriter, r *http.Request) {
	// Find top 5 highest-rated doctors who are closest to the user
	matchFookinRef := firebase.NewReference(URL + "doctors")
	json.NewEncoder(w).Encode(matchFookinRef)
    	//.startAt(5)
    	//.endAt(0.1)
    log.Printf("accounts matching email address")//, snap.val())
}