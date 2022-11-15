import { HttpErrorResponse } from '@angular/common/http';
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

  saving: boolean = false

  constructor(
    private builder: FormBuilder,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin() {
    this.toggleSaving()
    const user = this.buildUser()
    this.authService.signin(user)
    .pipe(
      tap(() => {
        this.snackbar.open('Logado com sucesso', 'Ok', { duration: 5000 })
        this.router.navigateByUrl('/clients')
      })
    )
    .subscribe({
      error: (error) => {
        this.toggleSaving()
        if (error instanceof HttpErrorResponse) {
          this.snackbar.open(error.error.message, 'Ok', { duration: 5000 })
        } else {
          this.snackbar.open('Ocorreu um erro ao entrar', 'Ok', { duration: 5000 })
        }
      },
      complete: () => {
        this.toggleSaving()
      }
    })
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

  private toggleSaving() {
    this.saving = !this.saving
  }
}
