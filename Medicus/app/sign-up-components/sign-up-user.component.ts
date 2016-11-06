import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MedicusService } from '../services/medicus-service';

@Component({
  moduleId: module.id,
  selector: 'sign-up-user',
  template: 
  `
  <nav>
      <a routerLink="/signUpUser" routerLinkActive="active">User</a>
      <a routerLink="/signUpDoctor" routerLinkActive="active">Doctor</a>
  </nav>
  <br />
  <h2> Sign Up User </h2>
  <label>Username: &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; </label> <input type="text" #username />
  <br />
  <label>Password: &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; </label> <input type="password" #password />
  <br />
  <button (click)="signUp(username.value, password.value)">
    Complete
  </button>
  `,
  styleUrls: [ 'main.css' ]
})

/*
`
  <h2> Sign Up for User </h2>
  <label>Username:</label> <input type="text" #username />
  <br />
  <label>Password:</label> <input type="password" #password />
  <br />
  <button (click)="signUp(username.value, password.value)">
    Login
  </button>
  `
*/

export class SignUpUserComponent {
    username: string;
    password: string;

  constructor(
    private medicusService: MedicusService,
    private router: Router) { }

  
  signUp( username: string, password: string ): void {

   this.username = username;
   this.password = password;

    console.log(username + ' ' + password);
    this.goToSignUpCongratulations();
  }

  goToSignUpCongratulations(): void {
    let link = ['/signUpCongratulations'];
    this.router.navigate(link);
  }
}