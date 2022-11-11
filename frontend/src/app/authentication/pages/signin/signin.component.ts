import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { User } from 'src/app/globals/models/User';
import { AuthenticationService } from 'src/app/globals/services/authentication.service';
import validator from 'validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup = this.builder.group({
    login: ['', [ Validators.required ]],
    password: ['', [ Validators.required, Validators.minLength(10) ]]
  })

  constructor(
    private builder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  signin() {
    const user = this.buildUser()
    this.authService.signin(user)
    .subscribe(
      () => {
        alert('Logado com sucesso')
      }
    )
  }

  private buildUser() {
    const data = this.signinForm.value
    const user: Partial<User> = {
      password: data.password
    }

    if (validator.isEmail(data.login)) {
      user.email = data.login
    } else {
      user.username = data.login
    }

    return user
  }
}
