import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Doctor }           from '../models/doctor';

@Injectable()
export class DoctorSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Doctor[]> {
    return this.http
               .get(`doctors/?first=${term}`)
               .map((r: Response) => r.json().data as Doctor[]);
  }
}

