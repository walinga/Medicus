import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  
  createDb() {
    let doctors = [
      {first: "Lee", last:"Ting", contact: "9056732770", location:"Canada", speciality: "Cardiologist" },
      {first: "big", last:"v", contact: "1235323", location:"Canada", speciality: "Family Doc" },
      {first: "Lizzy", last:"Ting", contact: "905673das2770", location:"Canada", speciality: "CANCER RESEARCHER" },

    ];
    return {doctors};
  }
}


