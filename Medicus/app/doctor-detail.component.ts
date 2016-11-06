import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Doctor }        from './models/doctor';
import { MedicusService } from './services/medicus-service';

@Component({
  moduleId: module.id,
  selector: 'my-doctor-detail',
  template: 
  `
  <nav>
  <a routerLink="/home" routerLinkActive="active">Home</a>
  <a routerLink="/search" routerLinkActive="active">Search</a>
  </nav>
  <div *ngIf="doctor">
  <h2>{{doctor.first}} details!</h2>
  <div>
    <label>id: </label>{{doctor.contact}}</div>
  <div>
    <label>name: </label>
   </div>
  <button (click)="goBack()">Back</button>
  </div>
  
  `,
  styleUrls: [ 'main.css' ]
})

export class DoctorDetailComponent implements OnInit {
  
  //comments: string[];
  doctor: Doctor;
  

  constructor(
    private medicusService: MedicusService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id:string = params['contact'];
      this.medicusService.getDoctor(id)
        .subscribe(res => this.doctor = res.json() as Doctor);
    });
  }
/*
  getComments(): void {
    this.medicusService.getComments(this.doctor.contact)
      .then(comments => this.comments = comments);
  }
*/
  goBack(): void {
    this.location.back();
  }
}


