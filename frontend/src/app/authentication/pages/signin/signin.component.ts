import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin() {
    const user = this.buildUser()
    this.authService.signin(user)
    .pipe(
      tap(() => {
        this.snackbar.open('Logado com sucesso', 'Ok', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        })

        this.router.navigateByUrl('/clients')
      })
    )
    .subscribe()
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
