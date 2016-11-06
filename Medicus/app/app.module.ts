import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-medicus-data.service';

import { AppComponent }         from './app.component';
import { HomeComponent }   from './home.component';
import { DoctorDetailComponent }      from './doctor-detail.component';
import { DoctorSearchComponent }  from './doctor-search.component';
import { LoginComponent } from './login.component';

import { MedicusService } from './services/medicus-service'
import { SearchComponent } from './search.component';

import { SignUpUserComponent } from './sign-up-components/sign-up-user.component';
import { SignUpDoctorComponent } from './sign-up-components/sign-up-doctor.component'
import { SignUpCongratulationsComponent } from './sign-up-components/sign-up-congratulations'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorDetailComponent,
    SearchComponent,
    DoctorSearchComponent,
    LoginComponent,
    SignUpUserComponent,
    SignUpDoctorComponent,
    SignUpCongratulationsComponent
  ],
  providers: [ MedicusService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


