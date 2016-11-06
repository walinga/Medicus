import { Component }          from '@angular/core';
import { LoginComponent } from './login.component'

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['main.css'],
})

export class AppComponent {
  title = 'Medicus';
}



