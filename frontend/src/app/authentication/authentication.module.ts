import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './pages/signin/signin.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
