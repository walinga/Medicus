import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home.component';
import { SearchComponent }      from './search.component';
import { DoctorDetailComponent }  from './doctor-detail.component';

import { LoginComponent } from './login.component';
import { SignUpUserComponent } from './sign-up-components/sign-up-user.component';
import { SignUpDoctorComponent } from './sign-up-components/sign-up-doctor.component'
import { SignUpCongratulationsComponent } from './sign-up-components/sign-up-congratulations'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'detail/:id', component: DoctorDetailComponent },
  { path: 'search',     component: SearchComponent },
  { path: 'signUpUser', component: SignUpUserComponent},
  { path: 'signUpDoctor', component: SignUpDoctorComponent},
  { path: 'signUpCongratulations', component: SignUpCongratulationsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

