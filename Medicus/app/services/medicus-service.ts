import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Doctor } from '../models/doctor'
import { User } from '../models/user'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MedicusService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private loginUrl = '/login';  // URL to web api
  private doctorsUrl = '/app/doctors'
  private usersUrl = '/app/users'
  private commentsUrl = ""

  constructor(private http: Http) { }

  getDoctors(): Observable<Response> {
    console.log("Got hit");
    return this.http.get(this.doctorsUrl);
    
}

  getDoctor(id: string): Observable<Response> {//Observable<Doctor> {
    const url = `${this.doctorsUrl}/${id}`;
    return this.http.get(url);
               //.subscribe(doctor => doctor.find(doctor => doctor.contact === id));
            
               
}

  getUser(id: string): Observable<Response> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url);
               //.subscribe(user:User => user.find(user => user.username === id));
               
 }

  getComments(id: string): Observable<Response>{
    const url = `${this.commentsUrl}/${id}`;
    return this.http.get(url);
  }


/*
  deleteDoctor(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  createDoctor(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  updateDoctor(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }
*/

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }

}