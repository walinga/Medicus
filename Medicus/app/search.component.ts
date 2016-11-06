import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Doctor }                from './models/doctor';
import { MedicusService }         from './services/medicus-service';

@Component({
  moduleId: module.id,
  selector: 'doctor-search',
  template: 
  `
  <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/search" routerLinkActive="active">Search</a>
  </nav>
<br />
<ul class="doctors">
  <li *ngFor="let doctor of doctors" (click)="onSelect(doctor)"
      [class.selected]="doctor === selectedHero">
    <span class="badge">{{doctor.first}}</span>
    <span>{{doctor.first}}</span>
  </li>
</ul>

  `,
  styleUrls: [ 'main.css' ]
})
/*
<h2> Doctors Available </h2>
<div>
  <label>Doctor name:</label> <input #doctorName />
  <button (click)="searchDoctor(doctorName.value)">
    Search
  </button>
</div>
<ul class="doctors">
  <li *ngFor="let doctor of doctors" (click)="onSelect(doctor)"
      [class.selected]="doctor === selectedHero">
    <span class="badge">{{doctor.first}}</span>
    <span>{{doctor.first}}</span>
  </li>
</ul>
<div *ngIf="selectedDoctor">
  <h2>
    {{selectedDoctor.name | uppercase}} 
  </h2>
  <button (click)="goToDetail()">View Details</button>
</div> 

*/


export class SearchComponent implements OnInit {
  doctors: Doctor[];
  selectedDoctor: Doctor;

  constructor(
    private medicusService: MedicusService,
    private router: Router) { }

  getDoctors(): void {
    this.medicusService
        .getDoctors()
        .subscribe( function(res) {res => this.doctors = res.json() as Doctor[];
            console.log(res);

          
        } );
  }
/*
  search(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.doctors = this.medicusService.getDoctors()
*/


    /*

    for(var i = 0; i < restaurants.length; i++)
{
  if(restaurants[i].restaurant.food == 'chicken')
  {
    return restaurants[i].restaurant.name;
  }
}
    
   
  }
*/

  ngOnInit(): void {
    this.getDoctors();
  }

  onSelect(doctor: Doctor): void {
    this.selectedDoctor = doctor;
  }

  goToDetail(): void {
    this.router.navigate(['/detail', this.selectedDoctor.contact]);
  }
}


