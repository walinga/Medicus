import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Doctor }        from './models/doctor';
import { User }          from './models/user'
import { MedicusService } from './services/medicus-service';


@Component({
  moduleId: module.id,
  selector: 'my-home',
  templateUrl: 'home.component.html',
  styleUrls: [ 'main.css' ]
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private medicusService: MedicusService) {
  
      this.user = new User("Harman", "fook");
  }


  ngOnInit(): void {
   // this.medicusService.getUser()
   //   .then(user => this.user = user);
  }


  gotoDetail(doctor: Doctor): void {
    let link = ['/detail', doctor.contact];
    this.router.navigate(link);
  }

}

