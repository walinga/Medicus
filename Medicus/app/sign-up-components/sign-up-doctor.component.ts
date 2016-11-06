import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MedicusService } from '../services/medicus-service';

@Component({
  moduleId: module.id,
  selector: 'sign-up-doctor',
  template: 
  `
  <nav>
      <a routerLink="/signUpUser" routerLinkActive="active">User</a>
      <a routerLink="/signUpDoctor" routerLinkActive="active">Doctor</a>
  </nav>
  <br />
  <h2> Sign Up Doctor </h2>
  <br />
  <label> First: <input type="text" #first/> </label>
  <br />
  <label> Last: <input type="text" #last/> </label>
  <br />
  <label> Contact: <input type="text" #contact/> </label>
  <br />
  <label> Location: <input type="text" #location/> </label>
  <br />
  <label> Specialty: <input type="text" #specialty/> </label>
  <br />
  <button (click)="signUp(username.value, password.value)">
    Complete
  </button>
  `,
  styleUrls: [ 'main.css' ]
})
/*


  <button (click)="signUp(first.value, last.value, contact.value, location.value, specialty.value)" > 
  Sign Up </button>
*/
export class SignUpDoctorComponent {
    first: string;
    last:  string;
    contact: string;
    location: string;
    specialty: string;
  

  constructor(
    private medicusService: MedicusService,
    private router: Router) { }

  
  signUp( first: string,
          last:  string,
          contact: string,
          location: string,
          specialty: string): void {

   this.first = first; 
   this.last = last; 
   this.contact = contact; 
   this.location = location;
   this.specialty = specialty;

    console.log(first + ' ' + specialty);
    this.goToSignUpCongratulations();
  }


  goToSignUpCongratulations(): void {
    let link = ['/signUpCongratulations'];
    this.router.navigate(link);
  }
}