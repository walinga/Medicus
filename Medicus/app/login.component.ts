import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MedicusService } from './services/medicus-service';

@Component({
  moduleId: module.id,
  selector: 'login',
  template: 
  `
<h2>Login</h2>
<div>
  <label>Username:  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
  </label> <input type="text" #username />
  <br />
  <br />
  <label>Password:  &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp; 
  </label> <input type="password" #password />
  <br />
  <br />
  <button (click)="login(username.value, password.value)">
    Login
  </button>
  <button (click)="goToSignUp()">
    Sign Up
  </button>
</div> 
  `,
  styleUrls: [ 'main.css' ]
})

export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private medicusService: MedicusService,
    private router: Router) { }

  
  login(username: string, password: string): void {
    this.username = username;
    this.password = password;
    console.log(username + ' ' + password);
    this.goToMain();
  }


  goToMain(): void {
    let link = ['/home'];
    this.router.navigate(link);
  }

  goToSignUp(): void {
    let link = ['/signUpUser']
    this.router.navigate(link);
  }

}


