import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { DoctorSearchService } from './services/doctor-search.service'
import { Doctor } from './models/doctor';

@Component({
  moduleId: module.id,
  selector: 'doctor-search',
  template: 
  `
   <div id="search-component">
  <h4>Doctor Search</h4>
  <input #searchBox id="search-box" (keyup)="search(searchBox.value)" />
  <div>
    <div *ngFor="let doctor of doctors | async"
         (click)="gotoDetail(doctor)" class="search-result" >
      {{hero.name}}
    </div>
  </div>
</div>
 
  `,
  styleUrls: [ 'main.css' ],
  providers: [DoctorSearchService]
})
export class DoctorSearchComponent implements OnInit {
  doctors: Observable<Doctor[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private doctorSearchService: DoctorSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.doctors = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.doctorSearchService.search(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Doctor[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Doctor[]>([]);
      });
  }

  gotoDetail(doctor: Doctor): void {
    let link = ['/detail', doctor];
    this.router.navigate(link);
  }
}

