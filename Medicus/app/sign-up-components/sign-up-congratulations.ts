import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';


@Component({
  moduleId: module.id,
  selector: 'sign-up-doctor',
  template: 
  `
  <h2> Thank you for signing up to Medicus! </h2>
  
  <button (click)="goToLogin()"> Return to Login </button>
  `,
  
  styleUrls: [ 'main.css' ]
})


export class SignUpCongratulationsComponent {
  
  constructor(
    private router: Router) { }

  goToLogin(): void {
    let link = ['/login'];
    this.router.navigate(link);
  }
}