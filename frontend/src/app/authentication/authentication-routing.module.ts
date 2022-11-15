import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectAccessGuard } from '../globals/guards/direct-access.guard';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [
      DirectAccessGuard
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }
